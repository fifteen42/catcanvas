import Square from "../shapes/Square.js";
import { squares, addSquare } from "../globals.js";

const template = document.createElement("template");

template.innerHTML = `
    <style>
    button {
        background-color: white;
        color: white;
        border: none;
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
        cursor: pointer;
      }
      button:hover {
        box-shadow: 2px 2px 2px black;
      }
      button:active {
        box-shadow: 1px 1px 1px black;
      }
    </style>
    <button id="squareButton">
      <div style="padding: 10px; border: 1px solid black;" >
      </div>
    </button>
`;

class SquareButton extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));

    const button = shadowRoot.getElementById("squareButton");
    button.addEventListener("click", () => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const size = Math.random() * 50 + 20;
      addSquare(x, y, size, "black");
      this.dispatchEvent(
        new CustomEvent("button-click", { detail: "Button was clicked!" })
      );
    });
  }
}

customElements.define("square-button", SquareButton);
