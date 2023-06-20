startButton = document.getElementById("start-button");
var stopButton = document.getElementById("stop-button");
var resetButton = document.getElementById("reset-button");
var display = document.querySelector(".stopwatch-display");

var isRunning = false;
var startTime = 0;
var elapsedTime = 0;
var interval;

function start() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    interval = setInterval(updateTimer, 10);
  }
}

function stop() {
  if (isRunning) {
    isRunning = false;
    clearInterval(interval);
  }
}

function reset() {
  isRunning = false;
  clearInterval(interval);
  elapsedTime = 0;
  display.textContent = "00:00:00:00";
}

function updateTimer() {
  if (isRunning) {
    var currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    var milliseconds = Math.floor(elapsedTime % 1000);
    var seconds = Math.floor((elapsedTime / 1000) % 60);
    var minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
    var hours = Math.floor(elapsedTime / 1000 / 60 / 60);

    var timeString = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds) + ":" + pad(milliseconds, 3);
    display.textContent = timeString;
  }
}

function pad(value, length) {
  length = length || 2;
  return value.toString().padStart(length, "0");
}

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
resetButton.addEventListener("click", reset);
