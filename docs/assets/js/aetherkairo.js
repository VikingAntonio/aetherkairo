class VikingDev extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const render = () => {
      this.shadowRoot.innerHTML = `
        <model-viewer
          src="https://vikingantonio.github.io/aetherkairo/assets/scene.gltf"
          alt="Modelo 3D"
          camera-controls
          auto-rotate
          ar>
        </model-viewer>
      `;
    };

    // Si ya está definido <model-viewer>, renderiza
    if (customElements.get("model-viewer")) {
      render();
    } else {
      // Si todavía no, espera a que se cargue
      customElements.whenDefined("model-viewer").then(render);
    }
  }
}

if (!customElements.get("vikingdev")) {
  customElements.define("vikingdev", VikingDev);
}











