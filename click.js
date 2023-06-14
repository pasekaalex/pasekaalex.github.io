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

  // Remove the idle-mode class from the body element
  document.body.classList.remove("idle-mode");

  // Add the speedrun-mode class to the body element
  document.body.classList.add("speedrun-mode");

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

  // Add the idle-mode class to the body element
  document.body.classList.add("idle-mode");
}

// Attach event listeners to the game mode buttons
speedrunButton.addEventListener("click", switchToSpeedrunMode);
idleButton.addEventListener("click", switchToIdleMode);

// Update the score and high score display initially
updateScore();
updateHighScore();

// Increment the score when the button is clicked
clickButton.addEventListener("click", function() {
  score++;
  updateScore();

  // Start the game if the timer is not running
  if (!timer) {
    startSpeedrunGame();
  }
});

// Function to handle the end of the game
function endGame() {
  // Disable the click button
  clickButton.disabled = true;

  // Stop the timer
  clearInterval(timer);

  // Update the high score based on the current game mode
  if (isIdleMode) {
    if (score > highScoreIdle) {
      highScoreIdle = score;
    }
  } else {
    if (score > highScoreSpeedrun) {
      highScoreSpeedrun = score;
    }
  }

  // Update the high score display
  updateHighScore();

  // Reset the game mode flag to Idle mode
  isIdleMode = true;

  // Reset the score and update the display
  score = 0;
  updateScore();

  // Add the idle-mode class to the body element
  document.body.classList.add("idle-mode");
}

// Create the flower elements
function createFlower() {
  const flowerContainer = document.getElementById("flower-container");

  // Create the stem element
  const stem = document.createElement("div");
  stem.classList.add("stem");

  // Create the flower center element
  const flowerCenter = document.createElement("div");
  flowerCenter.classList.add("flower-center");

  // Append the stem and flower center to the flower container
  flowerContainer.appendChild(stem);
  flowerContainer.appendChild(flowerCenter);

  // Create the petal elements
  for (let i = 0; i < 4; i++) {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    flowerContainer.appendChild(petal);
  }
}

// Call the createFlower function to generate the flower elements
createFlower();

// Function to handle the click event on the flower petals
function clickPetal(event) {
    if (event.target.classList.contains("petal")) {
      // Increment the score when a petal is clicked
      score++;
      updateScore();
    }
  }

  // Attach event listener to the flower container to handle click events on petals
  const flowerContainer = document.getElementById("flower-container");
  flowerContainer.addEventListener("click", clickPetal);

  // Function to handle the timer countdown in Idle mode
function idleTimer() {
    setInterval(() => {
      idleClicks++;
      if (idleClicks % 10 === 0) {
        score += idleClicks / 10;
        updateScore();
      }
    }, 1000);
  }

  // Check if the game is in Idle mode and start the idle timer
  if (isIdleMode) {
    idleTimer();
  }

// Function to generate a random position for the flower
function getRandomPosition() {
    const flowerContainer = document.getElementById("flower-container");
    const containerWidth = flowerContainer.offsetWidth;
    const containerHeight = flowerContainer.offsetHeight;
    const flowerWidth = 60; // Width of the flower element
    const flowerHeight = 250; // Height of the flower element

    // Calculate the maximum position values to keep the flower fully visible within the container
    const maxX = containerWidth - flowerWidth;
    const maxY = containerHeight - flowerHeight;

    // Generate random x and y coordinates within the valid range
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);

    return { x, y };
  }

  // Function to create a flower at a random position
  function createRandomFlower() {
    const flowerContainer = document.getElementById("flower-container");

    // Create a new flower element
    const flower = document.createElement("div");
    flower.classList.add("flower");
    const position = getRandomPosition();
    flower.style.left = position.x + "px";
    flower.style.top = position.y + "px";

    // Append the flower element to the flower container
    flowerContainer.appendChild(flower);
  }

  // Call the createRandomFlower function to generate flowers periodically
  setInterval(createRandomFlower, 1000);

// Function to handle the click event on a flower
function handleFlowerClick(event) {
    const flower = event.target;

    // Remove the clicked flower from the DOM
    flower.remove();

    // Increment the score by 1
    score++;

    // Update the score display
    const scoreDisplay = document.getElementById("score");
    scoreDisplay.textContent = score;
  }

  // Add a click event listener to the flower container
  const flowerContainer = document.getElementById("flower-container");
  flowerContainer.addEventListener("click", handleFlowerClick);

// Function to handle the click event on a flower
function handleFlowerClick(event) {
    const flower = event.target;

    // Remove the clicked flower from the DOM
    flower.remove();

    // Increment the score by 1
    score++;

    // Update the score display
    const scoreDisplay = document.getElementById("score");
    scoreDisplay.textContent = score;
  }

  // Add a click event listener to the flower container
  const flowerContainer = document.getElementById("flower-container");
  flowerContainer.addEventListener("click", handleFlowerClick);
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

  // Remove the idle-mode class from the body element
  document.body.classList.remove("idle-mode");

  // Add the speedrun-mode class to the body element
  document.body.classList.add("speedrun-mode");

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

  // Start the idle timer
  idleTimer();
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

  // Add the idle-mode class to the body element
  document.body.classList.add("idle-mode");
}

// Attach event listeners to the game mode buttons
speedrunButton.addEventListener("click", switchToSpeedrunMode);
idleButton.addEventListener("click", switchToIdleMode);

// Update the score and high score display initially
updateScore();
updateHighScore();

// Increment the score when the button is clicked
clickButton.addEventListener("click", function () {
  score++;
  updateScore();

  // Start the game if the timer is not running
  if (!timer) {
    startSpeedrunGame();
  }
});

// Function to handle the end of the game
function endGame() {
  // Disable the click button
  clickButton.disabled = true;

  // Stop the timer
  clearInterval(timer);

  // Update the high score based on the current game mode
  if (isIdleMode) {
    if (score > highScoreIdle) {
      highScoreIdle = score;
    }
  } else {
    if (score > highScoreSpeedrun) {
      highScoreSpeedrun = score;
    }
  }

  // Update the high score display
  updateHighScore();

  // Reset the game mode flag to Idle mode
  isIdleMode = true;

  // Reset the score and update the display
  score = 0;
  updateScore();

  // Add the idle-mode class to the body element
  document.body.classList.add("idle-mode");
}

// Create the flower elements
function createFlower() {
  const flowerContainer = document.getElementById("flower-container");

  // Create the stem element
  const stem = document.createElement("div");
  stem.classList.add("stem");

  // Create the flower center element
  const flowerCenter = document.createElement("div");
  flowerCenter.classList.add("flower-center");

  // Append the stem and flower center to the flower container
  flowerContainer.appendChild(stem);
  flowerContainer.appendChild(flowerCenter);

  // Create the petal elements
  for (let i = 0; i < 4; i++) {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    flowerContainer.appendChild(petal);
  }
}

// Function to handle the click event on the flower petals
function clickPetal(event) {
  if (event.target.classList.contains("petal")) {
    // Increment the score when a petal is clicked
    score++;
    updateScore();
  }
}

// Attach event listener to the flower container to handle click events on petals
const flowerContainer = document.getElementById("flower-container");
flowerContainer.addEventListener("click", clickPetal);

// Function to handle the timer countdown in Idle mode
function idleTimer() {
  setInterval(() => {
    idleClicks++;
    if (idleClicks % 10 === 0) {
      score += idleClicks / 10;
      updateScore();
    }
  }, 1000);
}

// Function to generate a random position for the flower
function getRandomPosition() {
  const flowerContainer = document.getElementById("flower-container");
  const containerWidth = flowerContainer.offsetWidth;
  const containerHeight = flowerContainer.offsetHeight;
  const flowerWidth = 60; // Width of the flower element
  const flowerHeight = 250; // Height of the flower element

  const maxX = containerWidth - flowerWidth;
  const maxY = containerHeight - flowerHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  return { x: randomX, y: randomY };
}

// Function to move the flower to a random position
function moveFlower() {
  const flowerContainer = document.getElementById("flower-container");
  const flower = document.getElementById("flower");

  const position = getRandomPosition();

  flower.style.left = `${position.x}px`;
  flower.style.top = `${position.y}px`;

  flowerContainer.appendChild(flower);
}

// Call the createFlower() function to create the initial flower
createFlower();

// Move the flower every 3 seconds
setInterval(moveFlower, 3000);
