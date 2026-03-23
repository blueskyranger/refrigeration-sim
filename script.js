let pumpOn = false;
let flowRate = 0;

const togglePumpButton = document.getElementById("togglePump");
const flowDisplay = document.getElementById("flowDisplay");

togglePumpButton.addEventListener("click", function () {
  pumpOn = !pumpOn;

  if (pumpOn) {
    flowRate = 20;
    togglePumpButton.textContent = "Turn Pump Off";
  } else {
    flowRate = 0;
    togglePumpButton.textContent = "Turn Pump On";
  }

  flowDisplay.textContent = `Flow: ${flowRate} L/min`;
});
