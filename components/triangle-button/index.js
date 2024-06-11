import { addTriangle } from "../../globals.js";

class TriangleButton extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    // 加载模板内容
    fetch("/components/triangle-button/index.html")
      .then((response) => response.text())
      .then((html) => {
        const template = document.createElement("template");
        template.innerHTML = html;
        shadowRoot.appendChild(template.content.cloneNode(true));

        // 获取按钮并添加点击事件处理
        const button = shadowRoot.getElementById("triangleButton");
        button.addEventListener("click", () => {
          const x = Math.random() * window.innerWidth;
          const y = Math.random() * window.innerHeight;
          const base = Math.random() * 30 + 5;
          const height = Math.random() * 30 + 5;
          addTriangle(x, y, base, height, "black");
          this.dispatchEvent(
            new CustomEvent("button-click", { detail: "Button was clicked!" })
          );
        });
      });
  }
}

customElements.define("triangle-button", TriangleButton);
