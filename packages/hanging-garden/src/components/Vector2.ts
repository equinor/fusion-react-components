/**
 * Helper class for calculating positions when drawing dashed lines
 */
class Vector2 {
  x: number;
  y: number;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  lerpVectors(v1: { x: number; y: number }, v2: { x: number; y: number }, alpha: number) {
    this.x = v1.x + (v2.x - v1.x) * alpha;
    this.y = v1.y + (v2.y - v1.y) * alpha;

    return this;
  }
}
export { Vector2 };
