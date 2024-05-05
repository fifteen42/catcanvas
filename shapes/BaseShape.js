export default class BaseShape {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.offsetX = 0;
    this.offsetY = 0;
    this.isDragging = false;
  }

  draw(ctx) {
    // 在子类中实现具体的绘制方法
  }

  setIsDragging(i) {
    this.isDragging = i;
  }

  getIsDragging() {
    return this.isDragging;
  }

  contains(x, y) {
    // 在子类中实现具体的判断坐标是否在图形内部的方法
    return false;
  }

  translate(dx, dy) {
    this.offsetX += dx;
    this.offsetY += dy;
  }

  handleMouseDown(e) {
    this.isDragging = true;
    this.lastX = e.offsetX;
    this.lastY = e.offsetY;
  }

  handleMouseMove(e) {
    if (this.isDragging) {
      const dx = e.offsetX - this.lastX;
      const dy = e.offsetY - this.lastY;
      this.translate(dx, dy);
      this.lastX = e.offsetX;
      this.lastY = e.offsetY;
    }
  }

  handleMouseUp() {
    this.isDragging = false;
  }
}
