import { globalScale, setScale, squares } from "./globals.js";

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

  squares.addListener(draw);

  let selectedSquare = null; // 当前被选中的方块

  canvas.addEventListener("mousedown", function (e) {
    const x = (e.offsetX - offsetX) / globalScale;
    const y = (e.offsetY - offsetY) / globalScale;

    const realSqaures = squares.array;

    for (let i = realSqaures.length - 1; i >= 0; i--) {
      if (realSqaures[i].contains(x, y)) {
        selectedSquare = realSqaures[i];
        selectedSquare.setIsDragging(true);
        lastX = e.offsetX;
        lastY = e.offsetY;
        break;
      }
    }

    // console.log(selectedSquare);
  });

  canvas.addEventListener("mousemove", function (e) {
    if (selectedSquare && selectedSquare.isDragging) {
      const dx = (e.offsetX - lastX) / globalScale;
      const dy = (e.offsetY - lastY) / globalScale;
      selectedSquare.translate(dx, dy);
      lastX = e.offsetX;
      lastY = e.offsetY;
      draw();
    }
  });

  canvas.addEventListener("mouseup", function () {
    if (selectedSquare) {
      selectedSquare.setIsDragging(false);
      selectedSquare = null;
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
    squares.array.forEach((square) => {
      square.draw(ctx);
    });
    ctx.restore();
  }

  draw();
});
