const togglePumpBtn = document.getElementById("togglePump");
const flowDisplay = document.getElementById("flowDisplay");
const reservoirLevel = document.getElementById("reservoirLevel");

const topPipe = document.getElementById("topPipe");
const rightPipe = document.getElementById("rightPipe");
const bottomPipe = document.getElementById("bottomPipe");
const leftPipe = document.getElementById("leftPipe");

let pumpOn = false;
let flowRate = 0;
let reservoir = 100;

togglePumpBtn.addEventListener("click", () => {
  pumpOn = !pumpOn;

  if (pumpOn && reservoir > 0) {
    flowRate = 20;
    togglePumpBtn.textContent = "Turn Pump Off";

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

setInterval(() => {
  if (pumpOn && reservoir > 0) {
    reservoir--;

    if (reservoir < 0) reservoir = 0;
    reservoirLevel.textContent = `${reservoir} L`;

    if (reservoir === 0) {
      pumpOn = false;
      flowRate = 0;
      togglePumpBtn.textContent = "Turn Pump On";
      flowDisplay.textContent = "Flow: 0 L/min";

      topPipe.classList.remove("flowing");
      rightPipe.classList.remove("flowing");
      bottomPipe.classList.remove("flowing");
      leftPipe.classList.remove("flowing");
    }
  }
}, 1000);
