// Progress storage for Sannivesham Sliding Puzzle
const Progress = (() => {
  const KEY = "sanniveshamSlidingPuzzleProgress";

  function loadAll() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveAll(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  function getLevelProgress(levelId) {
    const all = loadAll();
    return all[levelId] || { completed: false, bestMoves: null };
  }

  function isUnlocked(levelId) {
    // Level 1 is always unlocked by default
    if (Number(levelId) === 1) return true;
    
    // Previous level must be completed to unlock the current one
    const prev = getLevelProgress(Number(levelId) - 1);
    return !!prev.completed;
  }

  function recordCompletion(levelId, moveCount) {
    const all = loadAll();
    const existing = all[levelId] || { completed: false, bestMoves: null };
    
    all[levelId] = {
      completed: true,
      bestMoves: existing.bestMoves
        ? Math.min(existing.bestMoves, moveCount)
        : moveCount
    };
    saveAll(all);
  }

  return { getLevelProgress, isUnlocked, recordCompletion };
})();
