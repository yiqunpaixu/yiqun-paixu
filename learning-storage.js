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

  const api = {version, migrateProgress, migrateReview, read, save};
  globalThis.TINGXU_STORAGE = api;
  if (typeof module !== 'undefined') module.exports = api;
})();
