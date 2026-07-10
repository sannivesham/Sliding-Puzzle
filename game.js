(function () {
  const params = new URLSearchParams(window.location.search);
  const levelId = Number(params.get("level")) || 1;
  const level = getLevel(levelId);

  if (!level) {
    document.body.innerHTML = "<p style='padding:40px;color:#EDE3C8;'>Chapter not found.</p>";
    return;
  }
  if (!Progress.isUnlocked(levelId)) {
    window.location.href = "index.html";
    return;
  }

  const { title, difficulty, gridSize, image } = level;
  
  // State variables
  let tiles = []; // Linear array tracking active positions of tile values (0 to size^2 - 1)
  let moveCount = 0;
  let solved = false;

  // DOM Elements
  document.getElementById("puzzleTitle").textContent = `చాప్టర్ ${level.id}: ${title}`;
  document.getElementById("puzzleSubtitle").textContent = `కఠినత్వం: ${difficulty} · గడులు: ${gridSize}×${gridSize}`;
  document.getElementById("referenceImg").src = image;

  const boardEl = document.getElementById("slidingBoard");
  const moveCountEl = document.getElementById("moveCount");

  // --- Solvability Mechanics Engine ---
  function getInversionCount(arr) {
    let invCount = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        // Exclude the empty tile (represented by the highest value) from calculations
        if (arr[i] !== gridSize * gridSize - 1 && arr[j] !== gridSize * gridSize - 1 && arr[i] > arr[j]) {
          invCount++;
        }
      }
    }
    return invCount;
  }

  function isSolvable(shuffleArr) {
    const inversions = getInversionCount(shuffleArr);
    
    if (gridSize % 2 !== 0) {
      // For odd grid sizes (like 3x3), puzzle is solvable if inversions are even
      return inversions % 2 === 0;
    } else {
      // For even grid sizes (like 4x4), row position of empty tile from bottom matters
      let emptyIdx = shuffleArr.indexOf(gridSize * gridSize - 1);
      let emptyRowFromBottom = gridSize - Math.floor(emptyIdx / gridSize);
      
      if (emptyRowFromBottom % 2 === 0) {
        return inversions % 2 !== 0;
      } else {
        return inversions % 2 === 0;
      }
    }
  }

  // --- Initialize & Shuffle Matrix ---
  function initPuzzle() {
    const totalTiles = gridSize * gridSize;
    
    // Create sequential goal state configuration
    for (let i = 0; i < totalTiles; i++) {
      tiles.push(i);
    }

    // Keep shuffling until a mathematically solvable board orientation is generated
    do {
      for (let i = tiles.length - 2; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
      }
    } while (!isSolvable(tiles) || checkWinState());
  }

  // --- CSS Background Slice Engine Render ---
  function renderBoard() {
    boardEl.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    boardEl.innerHTML = "";

    tiles.forEach((tileValue, currentIndex) => {
      const tileEl = document.createElement("div");
      
      // Determine structural coordinates within matrix grid layouts
      const currentR = Math.floor(currentIndex / gridSize);
      const currentC = currentIndex % gridSize;

      if (tileValue === gridSize * gridSize - 1) {
        // Render empty tile slot component configuration
        tileEl.className = "tile empty";
      } else {
        tileEl.className = "tile";
        tileEl.style.backgroundImage = `url(${image})`;
        tileEl.style.backgroundSize = `${gridSize * 100}% ${gridSize * 100}%`;

        // Calculate origin texture mapping values to extract clip slices dynamically
        const originR = Math.floor(tileValue / gridSize);
        const originC = tileValue % gridSize;
        const posX = (originC / (gridSize - 1)) * 100;
        const posY = (originR / (gridSize - 1)) * 100;
        tileEl.style.backgroundPosition = `${posX}% ${posY}%`;

        // Render reference numbers to guide user operations
        const numHint = document.createElement("span");
        numHint.className = "tile-number";
        numHint.textContent = tileValue + 1;
        tileEl.appendChild(numHint);

        // Bind interactive event handler actions
        tileEl.addEventListener("click", () => handleTileClick(currentIndex));
      }

      boardEl.appendChild(tileEl);
    });
  }

  // --- Slide Movement Evaluation Logic ---
  function handleTileClick(clickedIndex) {
    if (solved) return;

    const emptyIndex = tiles.indexOf(gridSize * gridSize - 1);

    const clickR = Math.floor(clickedIndex / gridSize);
    const clickC = clickedIndex % gridSize;
    const emptyR = Math.floor(emptyIndex / gridSize);
    const emptyC = emptyIndex % gridSize;

    // Check if clicked cell shares a border edge adjacency alongside empty coordinate index positions
    const isAdjacent = (Math.abs(clickR - emptyR) + Math.abs(clickC - emptyC)) === 1;

    if (isAdjacent) {
      // Swap elements within linear data arrays
      [tiles[clickedIndex], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[clickedIndex]];
      
      moveCount++;
      moveCountEl.textContent = moveCount;
      
      renderBoard();
      verifyGameOutcome();
    }
  }

  // --- Win State Assessment Engine ---
  function checkWinState() {
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i] !== i) return false;
    }
    return true;
  }

  function verifyGameOutcome() {
    if (checkWinState()) {
      solved = true;
      Progress.recordCompletion(level.id, moveCount);

      // Reveal full unclipped canvas artwork across the entire dashboard array
      const elements = boardEl.querySelectorAll(".tile");
      elements.forEach(el => {
        el.style.border = "none";
        const label = el.querySelector(".tile-number");
        if (label) label.remove();
      });

      // Display Victory Card Modal Frame Elements
      document.getElementById("finalMoves").textContent = `మొత్తం మూవ్స్: ${moveCount}`;
      document.getElementById("winOverlay").classList.remove("hidden");

      const nextBtn = document.getElementById("nextLevelBtn");
      const nextLevel = getLevel(level.id + 1);
      if (nextLevel) {
        nextBtn.style.display = "inline-block";
        nextBtn.onclick = () => {
          window.location.href = `puzzle.html?level=${nextLevel.id}`;
        };
      } else {
        nextBtn.style.display = "none";
      }
    }
  }

  // Execute on load
  initPuzzle();
  renderBoard();
})();
