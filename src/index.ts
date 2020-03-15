import ILedMatrix, { LedMatrixOption } from "./ILedMatrix";
import CanvasLedMatrix from "./CanvasLedMatrix";
import { Colors } from "./Color";
import SpeedMeterRenderer from "./SpeedMeterRenderer/SpeedMeterRenderer";
import ISpeedMeterRenderer from "./SpeedMeterRenderer/ISpeedMeterRenderer";
import ISpeedMeter from "./SpeedMeter/ISpeedMeter";
import SpeedMeter from "./SpeedMeter/SpeedMeter";

const canvas = document.createElement('canvas');
canvas.width = 1024;
canvas.height = 1024;

document.body.append(canvas);

const option: LedMatrixOption = {
  width: 32,
  height: 64,
};

const ledMatrix: ILedMatrix = new CanvasLedMatrix(canvas, option);
const speedMeter: ISpeedMeter = new SpeedMeter(1000);
const speedMeterRenderer: ISpeedMeterRenderer = new SpeedMeterRenderer(ledMatrix, option, speedMeter);

// // Auto Counter

// setInterval(() => {
//   speedMeter.addCount();
// }, 100);

document.addEventListener('keydown', () => {
  speedMeter.addCount();
});

function run() {
  function onAnimationFrame() {
    speedMeterRenderer.render();
    ledMatrix.sync();
    requestAnimationFrame(onAnimationFrame);
  }

  onAnimationFrame();
}

run();