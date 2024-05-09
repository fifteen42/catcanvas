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
    // 计算点 (x, y) 是否在圆内
    const dx = this.x - x; // 横向距离
    const dy = this.y - y; // 纵向距离
    return dx * dx + dy * dy <= this.radius * this.radius; // 判断点到圆心的距离是否小于等于半径
  }

  // 添加圆形特有的方法
  setRadius(radius) {
    this.radius = radius;
  }

  getRadius() {
    return this.radius;
  }
}
