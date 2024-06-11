import { addSquare } from "../../globals.js";

class SquareButton extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    fetch("/components/square-button/index.html")
      .then((response) => response.text())
      .then((html) => {
        const template = document.createElement("template");
        template.innerHTML = html;
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
      });
  }
}

customElements.define("square-button", SquareButton);
