let pumpOn = false;
let flowRate = 0;
let reservoirVolume = 100;

const togglePumpButton = document.getElementById("togglePump");
const flowDisplay = document.getElementById("flowDisplay");
const pumpBox = document.getElementById("pumpBox");
const pipe = document.getElementById("pipe");
const reservoirLevel = document.getElementById("reservoirLevel");

//------Button and pump logic-----
togglePumpButton.addEventListener("click", function () {
  pumpOn = !pumpOn;

 if (pumpOn) {
    flowRate = 20;
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
}, 1000);
