(function () {
  // 1. Level Data built directly into the script to prevent timing errors
  const MODULE_LEVELS = [
    { id: 1, title: "శ్రీరామ జననం (Birth of Rama)", difficulty: "Easy", size: "3×3" },
    { id: 2, title: "బాల కృష్ణుడు (Baby Krishna Leelas)", difficulty: "Easy", size: "3×3" },
    { id: 3, title: "బాల హనుమంతుడు (Young Hanuman)", difficulty: "Easy", size: "3×3" },
    { id: 4, title: "シーతా కళ్యాణం (Sita Rama Kalyanam)", difficulty: "Easy", size: "3×3" },
    { id: 5, title: "కాళీయ మర్దనం (Krishna & Kaliya)", difficulty: "Medium", size: "4×4" },
    { id: 6, title: "సంజీవని పర్వతం (Hanuman Carrying Mountain)", difficulty: "Medium", size: "4×4" },
    { id: 7, title: "గీతోపదేశం (Krishna Guiding Arjuna)", difficulty: "Medium", size: "4×4" },
    { id: 8, title: "లంకా దహనం (Hanuman's Trail in Lanka)", difficulty: "Medium", size: "4×4" },
    { id: 9, title: "విశ్వరూప ప్రదర్శన (Vishwaroopa Darshanam)", difficulty: "Hard", size: "4×4" },
    { id: 10, title: "సముద్ర లంఘనం (Hanuman Crossing Ocean)", difficulty: "Hard", size: "4×4" },
    { id: 11, title: "గోవర్ధన గిరిధారి (Krishna Lifting Mountain)", difficulty: "Hard", size: "4×4" },
    { id: 12, title: "శ్రీరామ పట్టాభిషేకం (The Grand Coronation)", difficulty: "Hard", size: "4×4" }
  ];

  function renderGrid() {
    const gridEl = document.getElementById("levelGrid");
    if (!gridEl) return;

    gridEl.innerHTML = "";

    MODULE_LEVELS.forEach((level) => {
      const isUnlocked = typeof window.Progress?.isUnlocked === "function" 
        ? window.Progress.isUnlocked(level.id) 
        : (level.id === 1);

      const progress = typeof window.Progress?.getLevelProgress === "function"
        ? window.Progress.getLevelProgress(level.id)
        : { completed: false, bestMoves: null };

      const card = document.createElement(isUnlocked ? "a" : "div");
      card.className = `level-card ${isUnlocked ? "" : "locked"}`;
      
      if (isUnlocked) {
        card.href = `puzzle.html?level=${level.id}`;
      }

      let innerHTML = `
        <div class="level-number">CHAPTER ${level.id}</div>
        <div class="level-title" style="font-weight: 600; font-size: 1.25rem; margin-bottom: 6px; color: #fff;">${level.title.split(' (')[0]}</div>
        <div class="level-subtitle" style="font-family: 'Cinzel', serif; font-size: 0.9rem; color: var(--gold); opacity: 0.85; margin-bottom: 12px;">(${level.title.split(' (')[1] || 'Puzzle'}</div>
        <div class="level-meta" style="font-size: 0.85rem; opacity: 0.75;">
          <span>Grid: ${level.size} · ${level.difficulty}</span>
      `;

      if (progress.completed && progress.bestMoves) {
        innerHTML += `<span> · Moves: ${progress.bestMoves}</span>`;
      }

      innerHTML += `</div>`;

      if (!isUnlocked) {
        innerHTML += `<div class="level-lock-icon" style="position: absolute; top: 20px; right: 20px;">🔒</div>`;
      }

      card.innerHTML = innerHTML;
      gridEl.appendChild(card);
    });
  }

  renderGrid();
  setInterval(renderGrid, 500);
})();
