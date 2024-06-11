import { addCircle } from "../../globals.js";

class CircleButton extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    fetch("/components/circle-button/index.html")
      .then((response) => response.text())
      .then((html) => {
        const template = document.createElement("template");
        template.innerHTML = html;
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
      });
  }
}

customElements.define("circle-button", CircleButton);
