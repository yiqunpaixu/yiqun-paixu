(() => {
  const levels = ['overview', 'standard', 'fine', 'micro'];
  const isObject = value => value && typeof value === 'object' && !Array.isArray(value);
  const count = value => Number.isFinite(value) ? Math.max(0, value) : 0;
  const rank = level => levels.indexOf(level);

  function copyEntry(source) {
    const entry = isObject(source) ? {...source} : {};
    entry.levels = Object.fromEntries(levels.filter(level => isObject(source?.levels?.[level]))
      .map(level => [level, {...source.levels[level]}]));
    entry.pendingLevels = [...new Set((Array.isArray(source?.pendingLevels) ? source.pendingLevels : [])
      .filter(level => levels.includes(level)))];
    if (isObject(source?.activeRound)) {
      entry.activeRound = {...source.activeRound,
        levels: [...new Set((Array.isArray(source.activeRound.levels) ? source.activeRound.levels : [])
          .filter(level => levels.includes(level)))]};
    }
    return entry;
  }

  function beginRound(source, context) {
    const entry = copyEntry(source);
    const previous = entry.activeRound;
    const resume = previous && (context.preserve ||
      (!previous.completed && previous.reviewMode === context.reviewMode));
    entry.activeRound = resume ? previous : {
      id: context.id, reviewMode: !!context.reviewMode,
      wrong: 0, assisted: 0, completed: false, levels: [],
    };
    if (levels.includes(context.level)) {
      entry.activeRound.levels = [...new Set([...entry.activeRound.levels, context.level])];
      entry.lastLevel = context.level;
      // Legacy records identify no cut level. Bind only at the first sortable review.
      if (entry.pending && !entry.pendingLevels.length && context.reviewMode && context.chunkCount > 1) {
        entry.pendingLevels = [context.level];
      }
    }
    return entry;
  }

  function applyEvent(source, kind, context) {
    const entry = copyEntry(source);
    const level = context.level;
    if (!levels.includes(level)) throw new Error('Unknown cut level');
    if (!entry.activeRound) {
      entry.activeRound = {reviewMode: !!context.reviewMode, wrong: 0, assisted: 0, completed: false, levels: []};
    }
    const round = entry.activeRound;
    round.levels = [...new Set([...round.levels, level])];
    if (kind === 'level-change') {
      entry.levelSwitches = count(entry.levelSwitches) + 1;
      entry.lastLevelChange = {from: entry.lastLevel || null, to: level, at: context.now};
      entry.lastLevel = level;
      round.completed = false;
      return entry;
    }
    const result = {...entry.levels[level]};
    for (const field of ['heard', 'wrong', 'assisted', 'correct', 'completed']) result[field] = count(result[field]);
    result.chunkCount = context.chunkCount;
    result.lastAt = context.now;
    entry.attempted = true;
    entry.lastAt = context.now;
    entry.lastLevel = level;
    if (kind === 'heard') {
      entry.heard = true;
      result.heard++;
    } else if (kind === 'wrong' || kind === 'assisted') {
      entry[kind] = count(entry[kind]) + 1;
      result[kind]++;
      round[kind] = count(round[kind]) + 1;
      entry.pending = true;
      entry.pendingLevels = [...new Set([...entry.pendingLevels, level])];
      if (kind === 'assisted') round.completed = true;
    } else if (kind === 'correct' && context.chunkCount > 1) {
      result.completed++;
      if (count(round.assisted) === 0) {
        entry.correct = count(entry.correct) + 1;
        result.correct++;
      }
      const requiredRank = Math.max(rank(level), ...entry.pendingLevels.map(rank));
      if (context.reviewMode && count(round.wrong) === 0 && count(round.assisted) === 0 && rank(level) >= requiredRank) {
        entry.pending = false;
        entry.pendingLevels = [];
      }
      round.completed = true;
    } else if (kind === 'listened' || (kind === 'correct' && context.chunkCount === 1)) {
      // Listening does not close the assessment round; returning from a single card must retain earlier errors.
    } else {
      throw new Error('Unknown learning event');
    }
    result.lastOutcome = kind === 'correct' && context.chunkCount === 1 ? 'listened' : kind;
    entry.levels[level] = result;
    return entry;
  }

  function shuffle(size, random = Math.random) {
    const order = Array.from({length: size}, (_, index) => index);
    for (let index = size - 1; index > 0; index--) {
      const other = Math.floor(random() * (index + 1));
      [order[index], order[other]] = [order[other], order[index]];
    }
    return order;
  }

  function articleMastery(tasks, records) {
    const recordCount = value => Math.min(count(value), Number.MAX_SAFE_INTEGER);
    // Only sortable sentences can provide evidence of independent mastery.
    const assessable = [...new Map((Array.isArray(tasks) ? tasks : [])
      .filter(task => isObject(task) && typeof task.id === 'string' &&
        (task.assessable === true || (Array.isArray(task.chunks) && task.chunks.length > 1) || Object.values(isObject(task.variants) ? task.variants : {})
          .some(chunks => Array.isArray(chunks) && chunks.length > 1)))
      .map(task => [task.id, task])).values()];
    const totals = {correct: 0, wrong: 0, assisted: 0};
    let mastered = 0;
    for (const task of assessable) {
      const entry = isObject(records?.[task.id]) ? records[task.id] : {};
      const counts = {};
      for (const field of ['correct', 'wrong', 'assisted']) {
        const byLevel = levels.map(level => entry.levels?.[level])
          .filter(isObject).reduce((sum, result) => sum + recordCount(result[field]), 0);
        // Aggregate totals include legacy history; level counters are not added twice.
        counts[field] = Math.max(recordCount(entry[field]), byLevel);
        totals[field] += counts[field];
      }
      if (counts.correct > 0) mastered++;
    }
    const evidence = totals.correct + totals.wrong + totals.assisted;
    const coverage = assessable.length ? mastered / assessable.length : 0;
    const accuracy = (totals.correct + 1) / (totals.correct + totals.wrong + 2 * totals.assisted + 2);
    const mastery = evidence ? coverage * accuracy : null;
    // Unknown articles retain a neutral chance. Even mastered articles remain eligible.
    const weight = mastery === null ? 3 : 1 + 4 * (1 - mastery);
    return {mastery, weight, coverage, ...totals, total: assessable.length};
  }

  function chooseArticle(articleIds, practice, review, excludeId, random = Math.random) {
    const available = [...new Set(Array.isArray(articleIds) ? articleIds : [])]
      .filter(id => Array.isArray(practice?.[id]) && practice[id].length);
    const other = available.filter(id => id !== excludeId);
    const candidates = other.length ? other : available;
    if (!candidates.length) return null;
    const weighted = candidates.map(id => ({id, weight: articleMastery(practice[id], review?.[id]).weight}));
    const total = weighted.reduce((sum, item) => sum + item.weight, 0);
    const sample = random();
    let point = (Number.isFinite(sample) ? Math.max(0, Math.min(1, sample)) : 0) * total;
    for (const item of weighted) {
      point -= item.weight;
      if (point < 0) return item.id;
    }
    return weighted.at(-1).id;
  }

  const canAutoAdvance = (auto, chunkCount) => !!auto && chunkCount >= 1;
  const api = {levels, beginRound, applyEvent, shuffle, articleMastery, chooseArticle, canAutoAdvance};
  globalThis.TINGXU_LEARNING = api;
  if (typeof module !== 'undefined') module.exports = api;
})();
