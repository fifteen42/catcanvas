import { addCircle } from "../globals.js";

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
    <button id="circleButton">
      <div style="padding: 10px; border: 1px solid black; border-radius: 50%" >
      </div>
    </button>
`;

class CircleButton extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));

    const button = shadowRoot.getElementById("circleButton");
    button.addEventListener("click", () => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const radius = Math.random() * 30 + 5;
      addCircle(x, y, radius, "black");
      this.dispatchEvent(
        new CustomEvent("button-click", { detail: "Button was clicked!" })
      );
    });
  }
}

customElements.define("circle-button", CircleButton);
