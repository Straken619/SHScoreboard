const roundsContainer = document.getElementById("roundsContainer");
const scoreDisplay = document.getElementById("scoreDisplay");

let player1Base = 0;
let player2Base = 0;

// Track per-round twist scores
const twistScores = {
  1: { 1: 0, 2: 0 },
  2: { 1: 0, 2: 0 },
  3: { 1: 0, 2: 0 },
  4: { 1: 0, 2: 0 }
};

function getTotalTwist(player) {
  let total = 0;
  for (let r = 1; r <= 4; r++) total += twistScores[r][player];
  return total;
}

function updateScore() {
  const total1 = player1Base + getTotalTwist(1);
  const total2 = player2Base + getTotalTwist(2);
  scoreDisplay.textContent = `${total1} - ${total2}`;
}

function addScore(player, amount) {
  if (player === 1) player1Base += amount;
  else player2Base += amount;
  updateScore();
}

function updateTwistDisplay(round, player) {
  const el = document.getElementById(`twistDisplay${player}_r${round}`);
  el.textContent = twistScores[round][player];
}

// Build 4 rounds dynamically
for (let round = 1; round <= 4; round++) {
  const roundDiv = document.createElement("div");
  roundDiv.classList.add("round-container");
  roundDiv.innerHTML = `
    <div class="round-title">Round ${round}</div>
    <div class="players-row">

      <!-- Player 1 -->
      <div class="player-side">
        <div class="controls">
          <button class="toggle-btn" data-player="1" data-round="${round}">Control 1</button>
          <button class="toggle-btn" data-player="1" data-round="${round}">Control 2</button>
          <button class="toggle-btn" data-player="1" data-round="${round}">Control More</button>
        </div>

        <div class="battle-tactics">
          <label>Battle Tactics:</label>
          <input type="checkbox" class="battle" data-player="1" data-round="${round}">
          <input type="checkbox" class="battle" data-player="1" data-round="${round}">
          <input type="checkbox" class="battle" data-player="1" data-round="${round}">
        </div>

        <div class="twist-controls">
          <span>Twist:</span>
          <button class="twist-btn" data-player="1" data-round="${round}" data-change="1">+</button>
          <span class="twist-score" id="twistDisplay1_r${round}">0</span>
          <button class="twist-btn" data-player="1" data-round="${round}" data-change="-1">−</button>
        </div>
      </div>

      <!-- Player 2 -->
      <div class="player-side">
        <div class="controls">
          <button class="toggle-btn" data-player="2" data-round="${round}">Control 1</button>
          <button class="toggle-btn" data-player="2" data-round="${round}">Control 2</button>
          <button class="toggle-btn" data-player="2" data-round="${round}">Control More</button>
        </div>

        <div class="battle-tactics">
          <label>Battle Tactics:</label>
          <input type="checkbox" class="battle" data-player="2" data-round="${round}">
          <input type="checkbox" class="battle" data-player="2" data-round="${round}">
          <input type="checkbox" class="battle" data-player="2" data-round="${round}">
        </div>

        <div class="twist-controls">
          <span>Twist:</span>
          <button class="twist-btn" data-player="2" data-round="${round}" data-change="1">+</button>
          <span class="twist-score" id="twistDisplay2_r${round}">0</span>
          <button class="twist-btn" data-player="2" data-round="${round}" data-change="-1">−</button>
        </div>
      </div>
    </div>
  `;
  roundsContainer.appendChild(roundDiv);
}

// Handle button clicks
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("toggle-btn")) {
    const btn = e.target;
    const player = parseInt(btn.dataset.player);
    if (!btn.classList.contains("toggled")) {
      btn.classList.add("toggled");
      addScore(player, 1);
    } else {
      btn.classList.remove("toggled");
      addScore(player, -1);
    }
  }

  // Twist buttons
  if (e.target.classList.contains("twist-btn")) {
    const player = parseInt(e.target.dataset.player);
    const round = parseInt(e.target.dataset.round);
    const change = parseInt(e.target.dataset.change);

    twistScores[round][player] = Math.max(0, twistScores[round][player] + change);
    updateTwistDisplay(round, player);
    updateScore();
  }
});

// Handle Battle Tactics checkboxes
document.addEventListener("change", (e) => {
  if (e.target.classList.contains("battle")) {
    const player = parseInt(e.target.dataset.player);
    addScore(player, e.target.checked ? 1 : -1);
  }
});

// Reset All button
document.getElementById("resetAllBtn").addEventListener("click", () => {
  player1Base = 0;
  player2Base = 0;

  for (let r = 1; r <= 4; r++) {
    twistScores[r][1] = 0;
    twistScores[r][2] = 0;
    updateTwistDisplay(r, 1);
    updateTwistDisplay(r, 2);
  }

  document.querySelectorAll(".toggle-btn").forEach(b => b.classList.remove("toggled"));
  document.querySelectorAll(".battle").fo
