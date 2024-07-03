import { globalScale, setScale, shapes } from "./globals.js";

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.scale(dpr, dpr);

  let lastX = 0;
  let lastY = 0;
  let offsetX = 0;
  let offsetY = 0;
  const MIN_SCALE = 0.1;
  const MAX_SCALE = 10;
  const SCALE_FACTOR = 1.1;

  shapes.addListener(draw);

  let selectedShape = null;
  let isPanning = false;

  function screenToVirtual(screenX, screenY) {
    return {
      x: (screenX - offsetX) / globalScale,
      y: (screenY - offsetY) / globalScale,
    };
  }

  canvas.addEventListener("mousedown", function (e) {
    const virtualCoord = screenToVirtual(e.offsetX, e.offsetY);
    const realShapes = shapes.array;

    for (let i = realShapes.length - 1; i >= 0; i--) {
      if (realShapes[i].contains(virtualCoord.x, virtualCoord.y)) {
        selectedShape = realShapes[i];
        selectedShape.setIsDragging(true);
        lastX = e.offsetX;
        lastY = e.offsetY;
        return;
      }
    }

    // 如果没有选中形状，开始平移
    isPanning = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
  });

  canvas.addEventListener("mousemove", function (e) {
    const currentX = e.offsetX;
    const currentY = e.offsetY;

    if (selectedShape && selectedShape.isDragging) {
      const dx = (currentX - lastX) / globalScale;
      const dy = (currentY - lastY) / globalScale;
      selectedShape.translate(dx, dy);
      draw();
    } else if (isPanning) {
      const dx = currentX - lastX;
      const dy = currentY - lastY;
      offsetX += dx;
      offsetY += dy;
      draw();
    }

    // 无论是否在拖拽或平移，都更新lastX和lastY
    lastX = currentX;
    lastY = currentY;
  });

  canvas.addEventListener("mouseup", function () {
    if (selectedShape) {
      selectedShape.setIsDragging(false);
      selectedShape = null;
    }
    isPanning = false;
  });

  canvas.addEventListener("wheel", function (e) {
    e.preventDefault();
    handleTouchpadScroll(e);
  });

  function handleTouchpadScroll(e) {
    // 反转滚动方向
    offsetX -= e.deltaX;
    offsetY -= e.deltaY;
    draw();
  }

  // 添加键盘事件监听器
  document.addEventListener("keydown", handleKeyPress);

  function handleKeyPress(e) {
    if (e.key === "-") {
      zoomCanvas(false);
    } else if (e.key === "=" || e.key === "+") {
      zoomCanvas(true);
    }
  }

  function zoomCanvas(zoomIn) {
    const oldScale = globalScale;
    let newScale = globalScale;

    if (zoomIn) {
      newScale *= SCALE_FACTOR;
    } else {
      newScale /= SCALE_FACTOR;
    }

    newScale = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE);

    const scaleRatio = newScale / oldScale;

    // 使用lastX和lastY作为缩放中心
    offsetX = lastX - scaleRatio * (lastX - offsetX);
    offsetY = lastY - scaleRatio * (lastY - offsetY);

    setScale(newScale);

    if (globalScale !== oldScale) {
      draw();
    }
  }

  function isShapeVisible(
    shape,
    visibleLeft,
    visibleTop,
    visibleRight,
    visibleBottom
  ) {
    // 这个函数需要根据你的 Shape 类的具体实现来编写
    // 这里只是一个示例
    return (
      shape.x >= visibleLeft &&
      shape.x <= visibleRight &&
      shape.y >= visibleTop &&
      shape.y <= visibleBottom
    );
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(globalScale, globalScale);

    // 计算可见区域的虚拟坐标
    const visibleLeft = -offsetX / globalScale;
    const visibleTop = -offsetY / globalScale;
    const visibleRight = visibleLeft + canvas.width / globalScale;
    const visibleBottom = visibleTop + canvas.height / globalScale;

    shapes.array.forEach((shape) => {
      if (
        isShapeVisible(
          shape,
          visibleLeft,
          visibleTop,
          visibleRight,
          visibleBottom
        )
      ) {
        shape.draw(ctx);
      }
    });
    ctx.restore();
  }

  draw();
});
