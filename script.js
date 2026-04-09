let pumpOn = false;
let flowRate = 0;
let reservoirVolume = 30;

const togglePumpButton = document.getElementById("togglePump");
const flowDisplay = document.getElementById("flowDisplay");
const pumpBox = document.getElementById("pumpBox");
const topPipe = document.getElementById("topPipe");
const rightPipe = document.getElementById("rightPipe");
const bottomPipe = document.getElementById("bottomPipe");
const leftPipe = document.getElementById("leftPipe");
const reservoirLevel = document.getElementById("reservoirLevel");

let pumpOn = false;
let flowRate = 0;
let reservoir = 100;

togglePumpButton.addEventListener("click", function () {
  pumpOn = !pumpOn;

 if (pumpOn) {
    flowRate = 2;
    togglePumpButton.textContent = "Turn Pump Off";
    topPipe.classList.add("flowing");
    rightPipe.classList.add("flowing");
    bottomPipe.classList.add("flowing");
    leftPipe.classList.add("flowing");
  } else {
    pumpOn = false;
    flowRate = 0;
    togglePumpBtn.textContent = "Turn Pump On";

    topPipe.classList.remove("flowing");
    rightPipe.classList.remove("flowing");
    bottomPipe.classList.remove("flowing");
    leftPipe.classList.remove("flowing");
  }

  flowDisplay.textContent = `Flow: ${flowRate} L/min`;
});

setInterval(function () {
  if (pumpOn && reservoirVolume > 0) {
    reservoirVolume -= 1;

    if (reservoirVolume < 0) {
      reservoirVolume = 0;
    }

    reservoirLevel.textContent = `${reservoirVolume} L`;
  }
   // PIPE Animation - if empty, stop flow
  if (reservoirVolume === 0) {
    pipe.classList.remove("flow");
    pumpBox.classList.remove("on");
    pumpOn = false;
    flowRate = 0;
    flowDisplay.textContent = `Flow: 0 L/min`;
    togglePumpButton.textContent = "Turn Pump On";
    topPipe.classList.remove("flowing");
    rightPipe.classList.remove("flowing");
    bottomPipe.classList.remove("flowing");
    leftPipe.classList.remove("flowing");
  }
}, 500);
