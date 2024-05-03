document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  //   定义缩放比例
  let scale = 1;
  //   定义初始化坐标和偏移量
  let lastX = 0,
    lastY = 0,
    offsetX = 0,
    offsetY = 0;

  const MAX_SCALE = 2;
  const MIN_SCALE = 0.5;
  const scaleFactor = 1.02;

  let isDragging = false;

  canvas.addEventListener("mousedown", function (e) {
    isDragging = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
  });

  canvas.addEventListener("mousemove", function (e) {
    if (isDragging) {
      const dx = e.offsetX - lastX;
      const dy = e.offsetY - lastY;
      offsetX += dx;
      offsetY += dy;
      lastX = e.offsetX;
      lastY = e.offsetY;
      draw();
    }
  });

  canvas.addEventListener("mouseup", function (e) {
    isDragging = false;
  });

  canvas.addEventListener("wheel", function (e) {
    e.preventDefault();

    if (scale < MIN_SCALE) {
      scale = MIN_SCALE;
    } else if (scale > MAX_SCALE) {
      scale = MAX_SCALE;
    } else {
      if (e.deltaY > 0) {
        scale /= scaleFactor;
      } else {
        scale *= scaleFactor;
      }
      draw();
    }
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);
    drawCat(ctx);
    ctx.restore();
  }

  draw();
});

function drawCat(ctx) {
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

function drawSquareFrame(ctx) {
  const size = 200; // 正方形框的大小
  const x = 150; // 正方形框左上角的 x 坐标
  const y = 150; // 正方形框左上角的 y 坐标

  ctx.strokeStyle = "black"; // 设置线条颜色
  ctx.lineWidth = 2; // 设置线条宽度
  ctx.strokeRect(x, y, size, size); // 绘制正方形框
}

export { drawCat, drawSquareFrame };
