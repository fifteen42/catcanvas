import BaseShape from "./BaseShape.js";

export default class Square extends BaseShape {
  constructor(x, y, size, color) {
    super(x, y, color);
    this.size = size;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.lineWidth = 1;
    ctx.strokeRect(
      Math.round(this.x + this.offsetX),
      Math.round(this.y + this.offsetY),
      Math.round(this.size),
      Math.round(this.size)
    );
  }

  contains(x, y) {
    const left = this.x + this.offsetX;
    const right = left + this.size;
    const top = this.y + this.offsetY;
    const bottom = top + this.size;

    return x >= left && x <= right && y >= top && y <= bottom;
  }

  // 添加正方形特有的方法
  setSize(size) {
    this.size = size;
  }

  getSize() {
    return this.size;
  }
}
