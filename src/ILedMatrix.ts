import { Color } from "./Color";

export default interface ILedMatrix {
  setDot(x: number, y: number, color: Color): void;
  drawRect(x: number, y: number, width: number, height: number, color: Color): void;
  drawRectBorder(x: number, y: number, width: number, height: number, borderWidth: number, color: Color): void;
  drawNineSegment3_5(x: number, y: number, digit: number, color: Color);
  drawNineSegment5_7(x: number, y: number, digit: number, color: Color);
  sync(): void;
}

export type LedMatrixOption = {
  width: number;
  height: number;
};
