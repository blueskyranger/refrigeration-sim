// ── DOM references ───────────────────────────────────────────────
const togglePumpBtn        = document.getElementById("togglePump");
const flowDisplay          = document.getElementById("flowDisplay");
const reservoirLevel       = document.getElementById("reservoirLevel");
const reservoirFill        = document.getElementById("reservoirFill");
const pumpBox              = document.getElementById("pumpBox");
const condenserBox         = document.getElementById("condenserBox");
const indoorUnitBox        = document.getElementById("indoorUnitBox");
const meteringDevice       = document.getElementById("meteringDevice");
const coolAirZone          = document.getElementById("coolAirZone");

const highPressureDisplay  = document.getElementById("highPressureDisplay");
const lowPressureDisplay   = document.getElementById("lowPressureDisplay");
const condenserTempDisplay = document.getElementById("condenserTempDisplay");
const indoorTempDisplay    = document.getElementById("indoorTempDisplay");
const reservoirStatusDisplay = document.getElementById("reservoirStatusDisplay");

const topPipe         = document.getElementById("topPipe");
const rightPipe       = document.getElementById("rightPipe");
const bottomPipeLeft  = document.getElementById("bottomPipeLeft");
const bottomPipeRight = document.getElementById("bottomPipeRight");
const leftPipe        = document.getElementById("leftPipe");

// ── Refrigerant system constants ─────────────────────────────────
const AMBIENT        = 22;    // °C  — ambient / resting temperature
const HIGH_TARGET    = 16.0;  // bar — high-side pressure at steady state
const LOW_TARGET     = 3.5;   // bar — low-side pressure at steady state
const EQUIL_PRESSURE = 5.5;   // bar — equalised pressure when stopped
const COND_TARGET    = 58;    // °C  — condenser outlet temperature
const INDOOR_TARGET  = 6;     // °C  — evaporator coil temperature
const FILL_RATE_MAX  = 2.2;   // L/s — max condenser output to reservoir
const DRAIN_RATE     = 2.0;   // L/s — evaporator demand from reservoir

// ── System state ─────────────────────────────────────────────────
let pumpOn       = false;
let reservoir    = 70;          // L   — starts at 70%; dips on startup then recovers
let highPressure = EQUIL_PRESSURE;
let lowPressure  = EQUIL_PRESSURE;
let condTemp     = AMBIENT;
let indoorTemp   = AMBIENT;

// ── Helpers ───────────────────────────────────────────────────────
function lerp(a, b, t) {
  return a + (b - a) * t;
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

// ── Initial display ───────────────────────────────────────────────
function updateDisplays(netFlow) {
  highPressureDisplay.textContent  = highPressure.toFixed(1) + " bar";
  lowPressureDisplay.textContent   = lowPressure.toFixed(1)  + " bar";
  condenserTempDisplay.textContent = Math.round(condTemp)    + "°C";
  indoorTempDisplay.textContent    = Math.round(indoorTemp)  + "°C";
  reservoirLevel.textContent       = Math.round(reservoir)   + " L";
  reservoirFill.style.height       = reservoir + "%";

  if (!pumpOn) {
    reservoirStatusDisplay.textContent = "IDLE";
    reservoirStatusDisplay.style.color = "";
  } else if (netFlow < -0.15) {
    reservoirStatusDisplay.textContent = "DRAINING";
    reservoirStatusDisplay.style.color = "#ffb74d";
  } else if (netFlow > 0.15) {
    reservoirStatusDisplay.textContent = "FILLING";
    reservoirStatusDisplay.style.color = "#81c784";
  } else {
    reservoirStatusDisplay.textContent = "STABLE";
    reservoirStatusDisplay.style.color = "#4fc3f7";
  }
}

updateDisplays(0);

// ── Pipe / component state helpers ────────────────────────────────
function setPipesFlowing(on) {
  const m = on ? "add" : "remove";
  topPipe.classList[m]("flowing");
  rightPipe.classList[m]("flowing");
  bottomPipeLeft.classList[m]("flowing");
  bottomPipeRight.classList[m]("flowing");
  leftPipe.classList[m]("flowing");
}

function setComponentsActive(on) {
  const m = on ? "add" : "remove";
  pumpBox.classList[m]("active");
  condenserBox.classList[m]("active");
  indoorUnitBox.classList[m]("active");
  meteringDevice.classList[m]("active");
  coolAirZone.classList[m]("active");
  togglePumpBtn.classList[m]("active");
}

function stopPump() {
  pumpOn = false;
  togglePumpBtn.textContent = "Start Compressor";
  flowDisplay.textContent   = "Flow: 0 L/min";
  setPipesFlowing(false);
  setComponentsActive(false);
}

// ── Button ────────────────────────────────────────────────────────
togglePumpBtn.addEventListener("click", () => {
  pumpOn = !pumpOn;
  if (pumpOn) {
    togglePumpBtn.textContent = "Stop Compressor";
    flowDisplay.textContent   = "Flow: 20 L/min";
    setPipesFlowing(true);
    setComponentsActive(true);
  } else {
    stopPump();
  }
});

// ── Simulation tick (1 s) ─────────────────────────────────────────
setInterval(() => {
  let netFlow = 0;

  if (pumpOn) {
    // Pressures ramp toward their running targets
    highPressure = lerp(highPressure, HIGH_TARGET, 0.09);
    lowPressure  = lerp(lowPressure,  LOW_TARGET,  0.09);

    // Temperatures ramp toward their running targets
    condTemp   = lerp(condTemp,   COND_TARGET,   0.05);
    indoorTemp = lerp(indoorTemp, INDOOR_TARGET, 0.05);

    // Reservoir fill rate is proportional to high-side pressure:
    // at startup pressure is low → condenser output is low → reservoir drains.
    // As pressure builds, fill rate catches drain rate and the level stabilises.
    const fillRate = FILL_RATE_MAX * (highPressure / HIGH_TARGET);
    netFlow   = fillRate - DRAIN_RATE;
    reservoir = clamp(reservoir + netFlow, 0, 100);

  } else {
    // Pressures equalise slowly when the compressor is off
    highPressure = lerp(highPressure, EQUIL_PRESSURE, 0.06);
    lowPressure  = lerp(lowPressure,  EQUIL_PRESSURE, 0.06);

    // Temperatures drift back toward ambient
    condTemp   = lerp(condTemp,   AMBIENT, 0.03);
    indoorTemp = lerp(indoorTemp, AMBIENT, 0.03);
  }

  updateDisplays(netFlow);
}, 1000);
