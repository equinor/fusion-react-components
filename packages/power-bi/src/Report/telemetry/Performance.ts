/**
 * measure time between marks
 */
export class Performance<M extends string = any> {
  readonly marks: Record<string, number> = {};
  readonly stamp = Date.now();

  mark(name: M) {
    this.marks[name] = Date.now();
  }

  hasMark(mark: string): boolean {
    return mark in this.marks;
  }

  measure(markA?: M, markB?: M) {
    const stampA = markA ? this.marks[markA] : undefined;
    const stampB = markB ? this.marks[markB] : undefined;
    if (stampA && stampB) {
      return stampB - stampA;
    } else if (stampA) {
      return Date.now() - stampA;
    } else if (stampB) {
      return stampB - this.stamp;
    }
    return Date.now() - this.stamp;
  }
}

export default Performance;
