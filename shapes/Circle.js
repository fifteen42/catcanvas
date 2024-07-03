import BaseShape from "./BaseShape.js";

export default class Circle extends BaseShape {
  constructor(x, y, radius, color) {
    super(x, y, color); // 假设基类Shape需要x, y, 和 color
    this.radius = radius;
  }

  draw(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(
      this.x + this.offsetX,
      this.y + this.offsetY,
      this.radius,
      0,
      2 * Math.PI
    );
    ctx.stroke();
  }

  contains(x, y) {
    // 使用 this.x + this.offsetX 和 this.y + this.offsetY 来获取实际位置
    const dx = this.x + this.offsetX - x;
    const dy = this.y + this.offsetY - y;
    return dx * dx + dy * dy <= this.radius * this.radius;
  }

  // 添加圆形特有的方法
  setRadius(radius) {
    this.radius = radius;
  }

  getRadius() {
    return this.radius;
  }
}
