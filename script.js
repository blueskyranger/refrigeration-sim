const togglePumpBtn = document.getElementById("togglePump");
const flowDisplay = document.getElementById("flowDisplay");
const reservoirLevel = document.getElementById("reservoirLevel");
const reservoirFill = document.getElementById("reservoirFill");
const pumpBox = document.getElementById("pumpBox");

const topPipe = document.getElementById("topPipe");
const rightPipe = document.getElementById("rightPipe");
const bottomPipe = document.getElementById("bottomPipe");
const leftPipe = document.getElementById("leftPipe");

let pumpOn = false;
let flowRate = 0;
let reservoir = 100;

reservoirFill.style.height = "100%";

function setPipesFlowing(on) {
  const method = on ? "add" : "remove";
  topPipe.classList[method]("flowing");
  rightPipe.classList[method]("flowing");
  bottomPipe.classList[method]("flowing");
  leftPipe.classList[method]("flowing");
}

function setPumpActive(on) {
  pumpBox.classList[on ? "add" : "remove"]("active");
  togglePumpBtn.classList[on ? "add" : "remove"]("active");
}

function stopPump() {
  pumpOn = false;
  flowRate = 0;
  togglePumpBtn.textContent = "Turn Pump On";
  flowDisplay.textContent = "Flow: 0 L/min";
  setPipesFlowing(false);
  setPumpActive(false);
}

togglePumpBtn.addEventListener("click", () => {
  pumpOn = !pumpOn;

  if (pumpOn && reservoir > 0) {
    flowRate = 20;
    togglePumpBtn.textContent = "Turn Pump Off";
    flowDisplay.textContent = `Flow: ${flowRate} L/min`;
    setPipesFlowing(true);
    setPumpActive(true);
  } else {
    stopPump();
  }
});

setInterval(() => {
  if (pumpOn && reservoir > 0) {
    reservoir--;
    if (reservoir < 0) reservoir = 0;

    reservoirLevel.textContent = `${reservoir} L`;
    reservoirFill.style.height = `${reservoir}%`;

    if (reservoir === 0) {
      stopPump();
    }
  }
}, 1000);
