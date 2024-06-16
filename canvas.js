import { globalScale, setScale, shapes } from "./globals.js";

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let lastX = 0;
  let lastY = 0;
  let offsetX = 0;
  let offsetY = 0;
  const MIN_SCALE = 0.5;
  const MAX_SCALE = 2;
  const SCALE_FACTOR = 1.1;

  shapes.addListener(draw);

  let selectedShape = null;

  canvas.addEventListener("mousedown", function (e) {
    const x = (e.offsetX - offsetX) / globalScale;
    const y = (e.offsetY - offsetY) / globalScale;

    const realShapes = shapes.array;

    for (let i = realShapes.length - 1; i >= 0; i--) {
      if (realShapes[i].contains(x, y)) {
        selectedShape = realShapes[i];
        selectedShape.setIsDragging(true);
        lastX = e.offsetX;
        lastY = e.offsetY;
        break;
      }
    }
  });

  canvas.addEventListener("mousemove", function (e) {
    if (selectedShape && selectedShape.isDragging) {
      const dx = (e.offsetX - lastX) / globalScale;
      const dy = (e.offsetY - lastY) / globalScale;
      selectedShape.translate(dx, dy);
      lastX = e.offsetX;
      lastY = e.offsetY;
      draw();
    }
  });

  canvas.addEventListener("mouseup", function () {
    if (selectedShape) {
      selectedShape.setIsDragging(false);
      selectedShape = null;
    }
  });

  canvas.addEventListener("wheel", function (e) {
    e.preventDefault();

    const mouseX = e.offsetX;
    // console.log(`mouseX:${mouseX}`);
    const mouseY = e.offsetY;
    // console.log(`mouseY:${mouseY}`);

    const oldScale = globalScale;
    let newScale = globalScale;

    if (e.deltaY < 0) {
      newScale *= SCALE_FACTOR;
    } else {
      newScale /= SCALE_FACTOR;
    }

    newScale = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE);

    // 调整 offsetX 和 offsetY 以确保缩放中心为鼠标位置
    const scaleRatio = newScale / oldScale;
    offsetX = mouseX - scaleRatio * (mouseX - offsetX);
    offsetY = mouseY - scaleRatio * (mouseY - offsetY);

    setScale(newScale);

    if (globalScale !== oldScale) {
      draw();
    }
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(globalScale, globalScale);
    shapes.array.forEach((shape) => {
      shape.draw(ctx);
    });
    ctx.restore();
  }

  draw();
});
