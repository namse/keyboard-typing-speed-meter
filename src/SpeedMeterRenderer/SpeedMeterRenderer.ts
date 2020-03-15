import ILedMatrix, { LedMatrixOption } from "../ILedMatrix";
import ISpeedMeterRenderer from "./ISpeedMeterRenderer";
import { Colors } from "../Color";
import ISpeedMeter from '../SpeedMeter/ISpeedMeter';

export default class SpeedMeterRenderer implements ISpeedMeterRenderer {
  private readonly cellCount = 10;
  private readonly cellHeight = 4;
  private readonly cellBorderWidth = 1;
  private readonly countPerCell = 1;
  private cellFillCount = 0; // 0 ~ cellCount

  private readonly outMargin = 1;
  private readonly outBorder = 2;

  private readonly borderInnerWidth = this.ledMatrixOption.width - (2 * this.outMargin);
  private readonly borderInnerHeight = this.ledMatrixOption.height - (2 * this.outMargin);

  private readonly startX = this.outMargin;
  private readonly startY = this.outMargin;
  private readonly cellWidth = this.borderInnerWidth - (2 * this.outMargin);

  private readonly cellStartX = this.startX + this.outMargin;
  private readonly cellsTopY = this.startY + this.outMargin + 10;
  private readonly cellsBottomY = this.cellsTopY + (this.cellCount - 1) * this.cellBorderWidth
    + this.cellCount * this.cellHeight;

  constructor(
    private readonly ledMatrix: ILedMatrix,
    private readonly ledMatrixOption: LedMatrixOption,
    private readonly speedMeter: ISpeedMeter,
  ) {

  }

  public render() {
    this.ledMatrix.drawRect(
      this.outMargin, this.outMargin,
      this.borderInnerWidth, this.borderInnerHeight,
      Colors.WHITE,
    );

    this.renderCells();

    this.ledMatrix.drawRectBorder(2, 2, this.borderInnerWidth - 2, 9, 1, Colors.YELLOW);
    this.ledMatrix.drawRect(3, 3, this.borderInnerWidth - 4, 7, Colors.BLACK);

    const totalCount = this.speedMeter.getTotalCount();
    for (let i = 0; i < 4; i += 1) {
      const x = 5 + i * (5 + 1);
      const y = 3;
      const digit = Math.floor(totalCount / 10 ** (3 - i)) % 10;
      this.ledMatrix.drawNineSegment5_7(x, y, digit, Colors.RED);
    }
  }

  private getCeiledCount() {
    const count = this.speedMeter.getCount();
    return Math.ceil(count / this.countPerCell) * this.countPerCell;
  }

  private renderCells() {
    const ceiledCount = this.getCeiledCount();

    const speedRate = 0.2;
    this.cellFillCount = (1 - speedRate) * this.cellFillCount + speedRate * ceiledCount;

    const normalized = Math.round(this.cellFillCount * this.cellHeight) / this.cellHeight;

    const cellLevels = this.getCellLevels(normalized);

    for (let cellIndex = 0; cellIndex < this.cellCount; cellIndex += 1) {
      const cellLevel = cellLevels[cellIndex]; // 0 ~ 1

      const cellX = this.cellStartX;
      const cellBottomY = this.cellsBottomY - (this.cellHeight + this.cellBorderWidth) * cellIndex;
      const cellTopY = cellBottomY - this.cellHeight;
      const color = Colors.RED;
      // const color: Color = {
      //   r: Math.floor(255 * cellLevel),
      //   g: 0,
      //   b: 0,
      // };

      const redCellHeight = Math.floor(this.cellHeight * cellLevel);
      this.ledMatrix.drawRect(cellX, cellBottomY - redCellHeight, this.cellWidth, redCellHeight, color);

      const blackCellHeight = this.cellHeight - redCellHeight;
      this.ledMatrix.drawRect(cellX, cellTopY, this.cellWidth, blackCellHeight, Colors.BLACK);
    }
  }

  private getCellLevels(count: number): number[] {
    let tempCount = count;
    const levels = [];
    for (let cellIndex = 0; cellIndex < this.cellCount; cellIndex += 1) {
      const countForThisCell = tempCount >= this.countPerCell
        ? this.countPerCell
        : tempCount;

      const level = countForThisCell / this.countPerCell;
      levels[cellIndex] = level;

      tempCount -= countForThisCell;
    }
    return levels;
  }
}
