import { Color } from "./Color";
import ILedMatrix, { LedMatrixOption } from "./ILedMatrix";
import ColorBuffer from './ColorBuffer';
import { NineSegments3_5, NineSegments5_7 } from './NineSegments';

const unitSize = 12;
const ledRadius = 4;

export default class CanvasLedMatrix implements ILedMatrix {
  private readonly context: CanvasRenderingContext2D;
  private readonly buffer: ColorBuffer;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly option: LedMatrixOption,
  ) {
    this.context = canvas.getContext('2d');
    this.buffer = new ColorBuffer(option.width, option.height);
  }

  public setDot(x: number, y: number, color: Color) {
    this.buffer.setColor(x, y, color);
  }

  public sync(): void {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.option.width * unitSize, this.option.height * unitSize);

    for (let x = 0; x < this.option.width; x += 1) {
      for (let y = 0; y < this.option.height; y += 1) {
        this.drawUnit(x, y);
      }
    }
  }

  public drawRect(x: number, y: number, width: number, height: number, color: Color): void {
    for (let w = 0; w < width; w += 1) {
      for (let h = 0; h < height; h += 1) {
        this.setDot(x + w, y + h, color);
      }
    }
  }

  public drawRectBorder(x: number, y: number, width: number, height: number, borderWidth: number, color: Color): void {
    this.drawRect(x, y, width, borderWidth, color);
    this.drawRect(x, y, borderWidth, height, color);

    this.drawRect(
      x + width - borderWidth,
      y,
      borderWidth,
      height,
      color);
    this.drawRect(
      x,
      y + height - borderWidth,
      width,
      borderWidth,
      color);
  }

  public drawNineSegment3_5(x: number, y: number, digit: number, color: Color) {
    const buffer = NineSegments3_5[digit];
    if (!buffer) {
      throw new Error(`Unknown digit ${digit} for nine segment 3x5`);
    }

    for (let h = 0; h < 5; h += 1) {
      for (let w = 0; w < 3; w += 1) {
        if (!buffer[w + h * 3]) {
          continue;
        }
        this.setDot(x + w, y + h, color);
      }
    }
  }
  public drawNineSegment5_7(x: number, y: number, digit: number, color: Color) {
    const buffer = NineSegments5_7[digit];
    if (!buffer) {
      throw new Error(`Unknown digit ${digit} for nine segment 3x5`);
    }

    for (let h = 0; h < 7; h += 1) {
      for (let w = 0; w < 5; w += 1) {
        if (!buffer[w + h * 5]) {
          continue;
        }
        this.setDot(x + w, y + h, color);
      }
    }
  }

  private drawUnit(x: number, y: number): void {
    const startX = x * unitSize;
    const startY = y * unitSize;
    const centerX = startX + unitSize / 2;
    const centerY = startY + unitSize / 2;

    this.context.beginPath();
    this.context.arc(centerX, centerY, ledRadius, 0, Math.PI * 2);
    this.context.closePath();

    const { r, g, b } = this.buffer.getColor(x, y);

    this.context.fillStyle = `rgb(${r}, ${g}, ${b})`;
    this.context.fill();
  }
}
