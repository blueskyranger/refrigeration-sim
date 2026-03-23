let pumpOn = false;
let flowRate = 0;

const togglePumpButton = document.getElementById("togglePump");
const flowDisplay = document.getElementById("flowDisplay");
const pumpBox = document.getElementById("pumpBox");

togglePumpButton.addEventListener("click", function () {
  pumpOn = !pumpOn;

  if (pumpOn) {
    flowRate = 20;
    togglePumpButton.textContent = "Turn Pump Off";
    pumpBox.classList.add("on");
  } else {
    flowRate = 0;
    togglePumpButton.textContent = "Turn Pump On";
    pumpBox.classList.remove("on");
  }

  flowDisplay.textContent = `Flow: ${flowRate} L/min`;
});
