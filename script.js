let pumpOn = false;
let flowRate = 0;
let reservoirVolume = 30;

const togglePumpButton = document.getElementById("togglePump");
const flowDisplay = document.getElementById("flowDisplay");
const pumpBox = document.getElementById("pumpBox");
const pipe = document.getElementById("pipe");
const reservoirLevel = document.getElementById("reservoirLevel");

togglePumpButton.addEventListener("click", function () {
  pumpOn = !pumpOn;

 if (pumpOn) {
    flowRate = 2;
    togglePumpButton.textContent = "Turn Pump Off";
    pumpBox.classList.add("on");
    pipe.classList.add("flow");
  } else {
    flowRate = 0;
    togglePumpButton.textContent = "Turn Pump On";
    pumpBox.classList.remove("on");
    pipe.classList.remove("flow");
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
  }
}, 2000);
