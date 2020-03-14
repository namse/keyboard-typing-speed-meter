import { Color, Colors } from "./Color";

export default class ColorBuffer {
  private readonly innerBuffer: Color[][]; // x, y

  private static initInnerBuffer(width: number, height: number): Color[][] {
    const buffer: Color[][] = [];
    for (let x = 0; x < width; x += 1) {
      buffer[x] = [];
      for (let y = 0; y < height; y += 1) {
        buffer[x][y] = Colors.BLACK;
      }
    }
    return buffer;
  }

  constructor(
    private readonly width: number,
    private readonly height: number,
  ) {
    this.innerBuffer = ColorBuffer.initInnerBuffer(width, height);
  }

  public getColor(x: number, y: number): Color {
    return this.innerBuffer[x][y];
  }

  public setColor(x: number, y: number, color: Color): void {
    try {
      this.innerBuffer[x][y] = color;
    } catch {
      // ignore
    }
  }
}
