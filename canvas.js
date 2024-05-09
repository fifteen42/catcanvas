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

  let selectedShape = null; // 当前被选中的方块

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
    const oldScale = globalScale;
    if (e.deltaY < 0) {
      setScale(globalScale * SCALE_FACTOR);
    } else {
      setScale(globalScale / SCALE_FACTOR);
    }
    setScale(Math.min(Math.max(globalScale, MIN_SCALE), MAX_SCALE));
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
