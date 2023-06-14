// Initialize the score, high score, and timer variables
let score = 0;
let highScoreSpeedrun = 0;
let highScoreIdle = 0;
let timeLeft = 30;
let timer;
let idleClicks = 0;
let isIdleMode = false;

// Get references to the score and high score elements, click button, timer element, and game mode buttons
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("high-score");
const clickButton = document.getElementById("click-button");
const timerElement = document.getElementById("timer");
const speedrunButton = document.getElementById("speedrun-button");
const idleButton = document.getElementById("idle-button");

// Update the score display
function updateScore() {
  scoreElement.textContent = `Score: ${score}`;
}

// Update the high score display based on the current game mode
function updateHighScore() {
  if (isIdleMode) {
    highScoreElement.textContent = `Idle High Score: ${highScoreIdle}`;
  } else {
    highScoreElement.textContent = `Speedrun High Score: ${highScoreSpeedrun}`;
  }
}

// Start the game in Speedrun mode
function startSpeedrunGame() {
  score = 0;
  updateScore();

  // Disable the click button during the game
  clickButton.disabled = true;

  // Start the timer countdown
  timeLeft = 30;
  timerElement.textContent = `Time Left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

// Start the game in Idle mode
function startIdleGame() {
  score = idleClicks;
  updateScore();

  // Enable the click button
  clickButton.disabled = false;

  // Remove the timer display
  timerElement.textContent = "";

  timer = null;
}

// Switch the game mode to Speedrun mode
function switchToSpeedrunMode() {
  // Store the current clicks as idle clicks
  idleClicks = score;

  // Update the high score if the current score is higher
  if (score > highScoreSpeedrun) {
    highScoreSpeedrun = score;
  }

  // Reset the score and update the display
  score = 0;
  updateScore();

// Update the game mode flag
isIdleMode = false;

// Enable the click button
clickButton.disabled = false;

// Start the Speedrun game
startSpeedrunGame();
}

// Switch the game mode to Idle mode
function switchToIdleMode() {
// Update the high score if the current score is higher
if (score > highScoreIdle) {
highScoreIdle = score;
}

// Reset the score and update the display
score = 0;
updateScore();

// Update the game mode flag
isIdleMode = true;

// Disable the click button during Idle mode
clickButton.disabled = true;

// Start the Idle game
startIdleGame();
}

// Attach event listeners to the game mode buttons
speedrunButton.addEventListener("click", switchToSpeedrunMode);
idleButton.addEventListener("click", switchToIdleMode);

// Update the score and high score display initially
updateScore();
updateHighScore();

// Update the cloud animation speed based on the number of clicks
function updateCloudAnimation() {
    const cloudsElement = document.querySelector(".clouds");
    const clickCount = Math.min(score, 100); // Limit the click count for animation speed

    // Calculate the animation duration based on the click count
    const animationDuration = 60 - clickCount * 0.5;

    // Set the animation duration for the clouds element
    cloudsElement.style.animationDuration = `${animationDuration}s`;
  }

  // Increment the score when the button is clicked
  clickButton.addEventListener("click", function() {
    score++;
    updateScore();
    updateCloudAnimation();

    // Start the game if the timer is not running
    if (!timer) {
      startGame();
    }
  });
