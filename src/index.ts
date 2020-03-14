import ILedMatrix, { LedMatrixOption } from "./ILedMatrix";
import CanvasLedMatrix from "./CanvasLedMatrix";
import { Colors } from "./Color";

const canvas = document.createElement('canvas');
canvas.width = 1024;
canvas.height = 1024;

document.body.append(canvas);

const option: LedMatrixOption = {
  width: 32,
  height: 64,
};

const ledMatrix: ILedMatrix = new CanvasLedMatrix(canvas, option);

const cellCount = 10;
const cellHeight = 4;
const cellBorderWidth = 1;
const outMargin = 1;
const outBorder = 2;

const borderInnerWidth = option.width - (2 * outMargin);
const borderInnerHeight = option.height - (2 * outMargin);

const startX = outMargin;
const startY = outMargin;
const cellWidth = borderInnerWidth - (2 * outMargin);

const cellStartX = startX + outMargin;
const cellStartY = startY + outMargin + 10;

setInterval(() => {
  ledMatrix.drawRect(
    outMargin, outMargin,
    borderInnerWidth, borderInnerHeight,
    Colors.WHITE,
  );

  for (let cellIndex = 0; cellIndex < cellCount; cellIndex += 1) {
    const cellX = cellStartX;
    const cellY = cellStartY + (cellHeight + cellBorderWidth) * cellIndex;
    const color = Colors.RED;
    ledMatrix.drawRect(cellX, cellY, cellWidth, cellHeight, color);
  }

  ledMatrix.drawRectBorder(2, 2, borderInnerWidth - 2, 9, 1, Colors.YELLOW);
  ledMatrix.drawRect(3, 3, borderInnerWidth - 4, 7, Colors.BLACK);

  for (let i = 0; i < 4; i += 1) {
    const x = 5 + i * (5 + 1);
    const y = 3;
    ledMatrix.drawNineSegment5_7(x, y, i, Colors.RED);
  }
}, 50);


function onAnimationFrame() {
  ledMatrix.sync();
  requestAnimationFrame(onAnimationFrame);
}
onAnimationFrame();
