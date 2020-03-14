export type Color = {
  r: number;
  g: number;
  b: number;
};

export namespace Colors {
  export const BLACK: Color = { r: 0, b: 0, g: 0 };
  export const WHITE: Color = { r: 255, b: 255, g: 255 };

  export const RED: Color = { r: 255, b: 0, g: 0 };
  export const BLUE: Color = { r: 0, b: 255, g: 0 };
  export const GREEN: Color = { r: 0, b: 0, g: 255 };

  export const YELLOW: Color = { r: 255, b: 0, g: 255 };
}
