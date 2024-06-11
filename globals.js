import ObservableArray from "./ObservableArray.js";
import Square from "./shapes/Square.js";
import Circle from "./shapes/Circle.js";
import Triangle from "./shapes/Triangle.js";

export const shapes = new ObservableArray();

function addSquare(x, y, size, color) {
  shapes.push(new Square(x, y, size, color));
}

function addCircle(x, y, radius, color) {
  shapes.push(new Circle(x, y, radius, color));
}

function addTriangle(x, y, base, height, color) {
  shapes.push(new Triangle(x, y, base, height, color));
}

export let globalScale = 1;

function setScale(s) {
  globalScale = s;
}

export { addSquare, setScale, addCircle, addTriangle };
