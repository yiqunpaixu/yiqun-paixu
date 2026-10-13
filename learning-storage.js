(() => {
  const version = 'text-review-2026-09-27';
  const validObject = value => value && typeof value === 'object' && !Array.isArray(value);
  const nonnegative = value => Number.isFinite(value) ? Math.max(0, value) : 0;

  function migrateProgress(legacy, practice) {
    const output = {};
    for (const [article, saved] of Object.entries(validObject(legacy) ? legacy : {})) {
      const tasks = practice[article];
      if (!tasks || !Number.isInteger(saved) || saved < 0) continue;
      const index = tasks.findIndex(task => (task.legacyTaskIndices || []).some(i => i >= saved));
      output[article] = index < 0 ? tasks.length : index;
    }
    return output;
  }

  function migrateReview(legacy, practice) {
    const output = {};
    for (const [article, tasks] of Object.entries(practice)) {
      const old = validObject(legacy?.[article]) ? legacy[article] : {};
      const entries = {};
      for (const task of tasks) {
        const ids = task.legacyTaskIds || [task.id];
        const previous = ids.map(id => old[id]).filter(validObject);
        if (!previous.length) continue;
        if (ids.length === 1) {
          entries[task.id] = {...previous[0]};
          continue;
        }
        entries[task.id] = {
          wrong: previous.reduce((sum, entry) => sum + nonnegative(entry.wrong), 0),
          assisted: previous.reduce((sum, entry) => sum + nonnegative(entry.assisted), 0),
          correct: previous.length === ids.length && previous.every(entry => nonnegative(entry.correct) > 0)
            ? Math.min(...previous.map(entry => nonnegative(entry.correct))) : 0,
          historicalCorrect: previous.reduce((sum, entry) => sum + nonnegative(entry.correct), 0),
          pending: previous.some(entry => entry.pending),
          attempted: previous.some(entry => entry.attempted),
          heard: previous.length === ids.length && previous.every(entry => entry.heard),
          lastAt: Math.max(0, ...previous.map(entry => nonnegative(entry.lastAt))),
          sourceTaskIds: ids,
        };
      }
      if (Object.keys(entries).length) output[article] = entries;
    }
    return output;
  }

  function read(kind, practice) {
    const key = `tingxu-corpus-${kind}-v2`;
    try {
      const current = JSON.parse(localStorage.getItem(key));
      if (current?.version === version && validObject(current.data)) return current.data;
      const legacy = JSON.parse(localStorage.getItem(`tingxu-corpus-${kind}-v1`));
      const data = kind === 'progress' ? migrateProgress(legacy, practice) : migrateReview(legacy, practice);
      save(kind, data);
      return data;
    } catch {
      return {};
    }
  }

  function save(kind, data) {
    try {
      localStorage.setItem(`tingxu-corpus-${kind}-v2`, JSON.stringify({version, data}));
      return true;
    } catch {
      return false;
    }
  }

  const listeningPrefix = 'tingxu-listening-time-v1:';
  const listeningPage = Object.create(null);
  let listeningSession;
  const validArticle = id => typeof id === 'string' && /^[a-z0-9-]{1,160}$/.test(id);
  const validDate = value => Number.isFinite(value) && value > 0 && value <= 8640000000000000 ? value : 0;

  function readListeningTimes() {
    const total = Object.create(null);
    const merge = articles => {
      if (!validObject(articles)) return;
      for (const [id, row] of Object.entries(articles)) {
        if (!validArticle(id) || !validObject(row) || !Number.isFinite(row.seconds) || row.seconds <= 0) continue;
        const entry = total[id] || {seconds: 0, lastAt: 0};
        const seconds = entry.seconds + row.seconds;
        if (Number.isFinite(seconds)) total[id] = {seconds, lastAt: Math.max(entry.lastAt, validDate(row.lastAt))};
      }
    };
    try {
      for (let i = 0; i < localStorage.length; i += 1) {
        const key = localStorage.key(i);
        if (!key?.startsWith(listeningPrefix) || key === listeningSession) continue;
        try {
          const session = JSON.parse(localStorage.getItem(key));
          if (session?.version === 1) merge(session.articles);
        } catch { /* A malformed session must not hide other valid sessions. */ }
      }
    } catch { /* The current page still has its in-memory time when storage is unavailable. */ }
    merge(listeningPage);
    return total;
  }

  function addListeningTime(id, seconds, at = Date.now()) {
    if (!validArticle(id) || !Number.isFinite(seconds) || seconds <= 0) return false;
    const previous = listeningPage[id] || {seconds: 0, lastAt: 0};
    if (!Number.isFinite(previous.seconds + seconds)) return false;
    listeningPage[id] = {seconds: previous.seconds + seconds, lastAt: Math.max(previous.lastAt, validDate(at))};
    // Each page writes its own counter; simultaneous tabs cannot overwrite one another.
    if (!listeningSession) {
      let id;
      try { id = globalThis.crypto?.randomUUID?.(); } catch { /* Fall back when crypto is restricted. */ }
      listeningSession = listeningPrefix + (id || Date.now().toString(36) + '-' + Math.random().toString(36).slice(2));
    }
    try {
      localStorage.setItem(listeningSession, JSON.stringify({version: 1, articles: listeningPage}));
      return true;
    } catch { return false; }
  }

  function createPlaybackMeter(audio, record, {start = 0, end = Infinity, now = () => Date.now(), interval = 250} = {}) {
    let pending = 0, closed = false;
    const rate = () => Number.isFinite(audio.playbackRate) && audio.playbackRate > 0 ? audio.playbackRate : 1;
    const audible = () => !audio.paused && !audio.ended && !audio.seeking && !audio.muted && audio.volume !== 0 && audio.readyState >= 2;
    const position = () => Number.isFinite(audio.currentTime) ? Math.max(start, Math.min(end, audio.currentTime)) : null;
    let lastRaw = audio.currentTime, lastPosition = position(), lastWall = now(), lastRate = rate(), lastAudible = false;
    const commit = () => { if (pending > 0) { const seconds = pending; pending = 0; record(seconds); } };
    const reset = () => { commit(); lastRaw = audio.currentTime; lastPosition = position(); lastWall = now(); lastRate = rate(); lastAudible = audible(); };
    const sample = () => {
      if (closed) return;
      const wall = now(), current = position(), rawDelta = audio.currentTime - lastRaw;
      const elapsed = Math.max(0, (wall - lastWall) / 1000);
      // Timeline jumps never represent listening. Wall time only bounds a plausible media advance.
      if (lastAudible && !audio.seeking && current !== null && lastPosition !== null && rawDelta > 0 && rawDelta <= elapsed * lastRate + .25) {
        pending += Math.max(0, current - lastPosition) / lastRate;
      }
      lastRaw = audio.currentTime; lastPosition = current; lastWall = wall; lastRate = rate(); lastAudible = audible();
      if (pending >= 5) commit();
    };
    const events = ['playing', 'canplay', 'timeupdate', 'pause', 'waiting', 'stalled', 'volumechange', 'ratechange', 'ended'];
    const onEvent = event => {
      sample();
      if (['pause', 'waiting', 'stalled', 'ended'].includes(event.type) || (event.type === 'volumechange' && !audible())) commit();
    };
    for (const event of events) audio.addEventListener?.(event, onEvent);
    for (const event of ['seeking', 'seeked']) audio.addEventListener?.(event, reset);
    const timer = interval > 0 ? setInterval(sample, interval) : null;
    return {
      sample,
      flush() { sample(); commit(); },
      finish() {
        if (closed) return;
        sample(); commit(); closed = true;
        if (timer !== null) clearInterval(timer);
        for (const event of events) audio.removeEventListener?.(event, onEvent);
        for (const event of ['seeking', 'seeked']) audio.removeEventListener?.(event, reset);
      },
    };
  }

  const api = {version, migrateProgress, migrateReview, read, save, readListeningTimes, addListeningTime, createPlaybackMeter};
  globalThis.TINGXU_STORAGE = api;
  if (typeof module !== 'undefined') module.exports = api;
})();
