import BaseShape from "./BaseShape.js";

export default class Cat extends BaseShape {
  constructor(x, y, color) {
    super(x, y, color);
  }

  draw(ctx) {
    // 绘制猫的脸
    ctx.beginPath();
    ctx.arc(200, 200, 100, 0, Math.PI * 2, true); // 脸（一个大圆）
    ctx.fillStyle = "#027B83";
    ctx.fill();

    // 绘制眼睛
    ctx.beginPath();
    ctx.arc(170, 180, 20, 0, Math.PI * 2, true); // 左眼
    ctx.arc(230, 180, 20, 0, Math.PI * 2, true); // 右眼
    ctx.fillStyle = "black";
    ctx.fill();

    // 眼球
    ctx.beginPath();
    ctx.arc(165, 185, 10, 0, Math.PI * 2, true); // 左眼
    ctx.arc(225, 185, 10, 0, Math.PI * 2, true); // 右眼
    ctx.arc(180, 185, 5, 0, Math.PI * 2, true); // 左眼
    ctx.arc(240, 185, 5, 0, Math.PI * 2, true); // 右眼
    ctx.fillStyle = "white";
    ctx.fill();

    // 绘制耳朵
    ctx.beginPath();
    ctx.moveTo(130, 130);
    ctx.lineTo(160, 80);
    ctx.lineTo(190, 120);
    ctx.fillStyle = "#027B83";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(210, 120);
    ctx.lineTo(240, 80);
    ctx.lineTo(270, 130);
    ctx.fill();

    // 绘制嘴巴
    ctx.beginPath();
    ctx.arc(200, 230, 10, 0, Math.PI, false); // 嘴巴中间的小弧形
    ctx.moveTo(190, 230);
    ctx.fillStyle = "black";
    ctx.fill();

    // 绘制胡须
    ctx.beginPath();
    ctx.moveTo(150, 200);
    ctx.lineTo(100, 180);
    ctx.moveTo(150, 210);
    ctx.lineTo(90, 210);
    ctx.moveTo(150, 220);
    ctx.lineTo(100, 240);
    ctx.moveTo(250, 200);
    ctx.lineTo(300, 180);
    ctx.moveTo(250, 210);
    ctx.lineTo(310, 210);
    ctx.moveTo(250, 220);
    ctx.lineTo(300, 240);
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  contains(x, y) {
    const left = this.x + this.offsetX;
    const right = left + this.size;
    const top = this.y + this.offsetY;
    const bottom = top + this.size;

    return x >= left && x <= right && y >= top && y <= bottom;
  }
}
