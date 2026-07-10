(function () {
  const gridEl = document.getElementById("levelGrid");
  if (!gridEl) return;

  gridEl.innerHTML = "";

  LEVELS.forEach((level) => {
    const isUnlocked = Progress.isUnlocked(level.id);
    const progress = Progress.getLevelProgress(level.id);

    const card = document.createElement(isUnlocked ? "a" : "div");
    card.className = `level-card ${isUnlocked ? "" : "locked"}`;
    
    if (isUnlocked) {
      card.href = `puzzle.html?level=${level.id}`;
    }

    let innerHTML = `
      <div class="level-number">చాప్టర్ ${level.id}</div>
      <div class="level-title">${level.title}</div>
      <div class="level-meta">
        <span><strong>కఠినత్వం:</strong> ${level.difficulty}</span>
        <span><strong>గడులు:</strong> ${level.gridSize}×${level.gridSize}</span>
    `;

    if (progress.completed && progress.bestMoves !== null) {
      innerHTML += `<span><strong>ఉత్తమ మూవ్స్:</strong> ${progress.bestMoves}</span>`;
    }

    innerHTML += `</div>`;

    if (!isUnlocked) {
      innerHTML += `<div class="level-lock-icon">🔒</div>`;
    }

    card.innerHTML = innerHTML;
    gridEl.appendChild(card);
  });
})();
