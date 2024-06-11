import BaseShape from "./BaseShape.js";

export default class Triangle extends BaseShape {
  constructor(x, y, base, height, color) {
    super(x, y, color); // 假设基类BaseShape需要x, y,和color
    this.base = base;
    this.height = height;
  }

  draw(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.x + this.offsetX, this.y + this.offsetY - this.height / 2);
    ctx.lineTo(
      this.x + this.offsetX - this.base / 2,
      this.y + this.offsetY + this.height / 2
    );
    ctx.lineTo(
      this.x + this.offsetX + this.base / 2,
      this.y + this.offsetY + this.height / 2
    );
    ctx.closePath();
    ctx.stroke();
  }

  contains(x, y) {
    // 判断点 (x, y) 是否在三角形内, 使用重心法
    const x1 = this.x;
    const y1 = this.y - this.height / 2;
    const x2 = this.x - this.base / 2;
    const y2 = this.y + this.height / 2;
    const x3 = this.x + this.base / 2;
    const y3 = this.y + this.height / 2;

    const denominator = (y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3);
    const a = ((y2 - y3) * (x - x3) + (x3 - x2) * (y - y3)) / denominator;
    const b = ((y3 - y1) * (x - x3) + (x1 - x3) * (y - y3)) / denominator;
    const c = 1 - a - b;

    return 0 <= a && a <= 1 && 0 <= b && b <= 1 && 0 <= c && c <= 1;
  }

  // 添加三角形特有的方法
  setBase(base) {
    this.base = base;
  }

  getBase() {
    return this.base;
  }

  setHeight(height) {
    this.height = height;
  }

  getHeight() {
    return this.height;
  }
}
