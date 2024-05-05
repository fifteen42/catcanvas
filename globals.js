import ObservableArray from "./ObservableArray.js";
import Square from "./shapes/Square.js";

export const squares = new ObservableArray();

function addSquare(x, y, size, color) {
  squares.push(new Square(x, y, size, color));
}

export let globalScale = 1;

function setScale(s) {
  globalScale = s;
}

export { addSquare, setScale };
