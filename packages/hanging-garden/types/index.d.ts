/**
 * Method for drawing dashed lines
 * @param toX x-coordinate you want to draw the dashed lines to
 * @param toY y-coordinate you want to draw the dashed lines to
 * @param dash length of the dashed lines
 * @param gap the gap between the dashed lines
 */
interface drawDashLine {
  (toX: number, toY: number, dash?: number, gap?: number): void;
}

declare namespace PIXI {
  export interface Graphics {
    drawDashLine: drawDashLine;
  }
}
