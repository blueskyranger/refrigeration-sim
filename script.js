const togglePumpBtn  = document.getElementById("togglePump");
const flowDisplay    = document.getElementById("flowDisplay");
const reservoirLevel = document.getElementById("reservoirLevel");
const reservoirFill  = document.getElementById("reservoirFill");
const pumpBox        = document.getElementById("pumpBox");
const condenserBox   = document.getElementById("condenserBox");
const evaporatorBox  = document.getElementById("evaporatorBox");

const topPipe    = document.getElementById("topPipe");
const rightPipe  = document.getElementById("rightPipe");
const bottomPipe = document.getElementById("bottomPipe");
const leftPipe   = document.getElementById("leftPipe");

let pumpOn   = false;
let flowRate  = 0;
let reservoir = 100;

reservoirFill.style.height = "100%";

function setPipesFlowing(on) {
  const method = on ? "add" : "remove";
  topPipe.classList[method]("flowing");
  rightPipe.classList[method]("flowing");
  bottomPipe.classList[method]("flowing");
  leftPipe.classList[method]("flowing");
}

function setComponentsActive(on) {
  const method = on ? "add" : "remove";
  pumpBox.classList[method]("active");
  condenserBox.classList[method]("active");
  evaporatorBox.classList[method]("active");
  togglePumpBtn.classList[method]("active");
}

function stopPump() {
  pumpOn   = false;
  flowRate = 0;
  togglePumpBtn.textContent = "Start Compressor";
  flowDisplay.textContent   = "Flow: 0 L/min";
  setPipesFlowing(false);
  setComponentsActive(false);
}

togglePumpBtn.addEventListener("click", () => {
  pumpOn = !pumpOn;

  if (pumpOn) {
    flowRate = 20;
    togglePumpBtn.textContent = "Stop Compressor";
    flowDisplay.textContent   = `Flow: ${flowRate} L/min`;
    setPipesFlowing(true);
    setComponentsActive(true);
  } else {
    stopPump();
  }
});

setInterval(() => {
  if (pumpOn) {
    if (reservoir > 0) {
      reservoir--;
    } else {
      // Closed loop — reservoir refills as refrigerant returns
      reservoir = 100;
    }

    reservoirLevel.textContent    = `${reservoir} L`;
    reservoirFill.style.height    = `${reservoir}%`;
  }
}, 1000);
