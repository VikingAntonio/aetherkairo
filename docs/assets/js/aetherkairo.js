class VikingDev extends HTMLElement {
  constructor() {
    super();

    // Crear Shadow DOM
    const shadow = this.attachShadow({ mode: "open" });

    // Inyectar la librería de model-viewer si aún no está cargada
    if (!window.customElements.get("model-viewer")) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
      document.head.appendChild(script);
    }

    // HTML del componente
    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 600px;
          margin: auto;
          border: 2px solid #444;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }

        model-viewer {
          width: 100%;
          height: 400px;
          background: #111;
        }
      </style>

      <model-viewer
        src="https://vikingantonio.github.io/aetherkairo/assets/scene.gltf"
        alt="cafe"
        camera-controls
        auto-rotate
        ar>
      </model-viewer>
    `;
  }
}

// Registrar la etiqueta <vikingdev>
customElements.define("vikingdev", VikingDev);






