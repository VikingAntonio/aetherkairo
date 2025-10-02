// aetherkairo.js
class VikingDev extends HTMLElement {
  static get observedAttributes() {
    return ['src','alt','poster','camera-orbit','camera-target','auto-rotate','camera-controls','ar'];
  }

  constructor() {
    super();
    this._initialized = false;
    this._root = this.attachShadow({ mode: 'open' });
    this._root.innerHTML = `
      <style>
        :host{
          display:block;
          width:100%;
          max-width:600px;
          margin:auto;
          border:2px solid #444;
          border-radius:12px;
          overflow:hidden;
          box-shadow:0 4px 15px rgba(0,0,0,0.3);
          background:#111;
        }
        .container{ width:100%; height:400px; background:#111; display:flex; align-items:center; justify-content:center; color:#fff; font-family:Inter,system-ui,Arial; }
        model-viewer{ width:100%; height:100%; display:block; }
        .placeholder{ padding:16px; text-align:center; }
        .error{ padding:18px; text-align:center; color:#fff; background:#5b1f1f; width:100%; }
      </style>
      <div id="container" class="container">
        <div class="placeholder">Cargando visor 3D…</div>
      </div>
    `;
    this._container = this._root.querySelector('#container');
    this._modelViewer = null;
  }

  connectedCallback() {
    if (!this._initPromise) this._initPromise = this._init();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (!this._modelViewer) return;
    // boolean attributes handling
    if (['auto-rotate','camera-controls','ar'].includes(name)) {
      if (newVal === null || newVal === 'false' || newVal === '0') {
        this._modelViewer.removeAttribute(name);
      } else {
        this._modelViewer.setAttribute(name, '');
      }
    } else {
      if (newVal === null) this._modelViewer.removeAttribute(name);
      else this._modelViewer.setAttribute(name, newVal);
    }
  }

  async _init() {
    const defaultSrc = 'https://vikingantonio.github.io/aetherkairo/assets/scene.gltf';
    const src = this.getAttribute('src') || defaultSrc;
    const alt = this.getAttribute('alt') || '3D model';
    const poster = this.getAttribute('poster') || '';

    // wait for model-viewer custom element to be defined, with timeout
    try {
      await Promise.race([
        customElements.whenDefined('model-viewer'),
        new Promise((_, reject) => setTimeout(() => reject(new Error('model-viewer not defined within timeout')), 3500))
      ]);
    } catch (err) {
      console.warn('VikingDev: model-viewer not available:', err);
      this._container.innerHTML = `
        <div class="error">Visor 3D no disponible</div>
        ${poster ? `<img src="${poster}" alt="${alt}" style="width:100%;height:auto;display:block;">` : ''}
      `;
      return;
    }

    // create model-viewer programmatically (safer than innerHTML for custom elements)
    const mv = document.createElement('model-viewer');
    mv.setAttribute('src', src);
    mv.setAttribute('alt', alt);
    if (this.hasAttribute('camera-controls')) mv.setAttribute('camera-controls', '');
    if (this.hasAttribute('auto-rotate')) mv.setAttribute('auto-rotate', '');
    if (this.hasAttribute('ar')) mv.setAttribute('ar', '');
    if (poster) mv.setAttribute('poster', poster);
    const cameraOrbit = this.getAttribute('camera-orbit');
    if (cameraOrbit) mv.setAttribute('camera-orbit', cameraOrbit);
    const cameraTarget = this.getAttribute('camera-target');
    if (cameraTarget) mv.setAttribute('camera-target', cameraTarget);

    mv.style.width = '100%';
    mv.style.height = '100%';

    // swap placeholder for the viewer
    this._container.innerHTML = '';
    this._container.appendChild(mv);
    this._modelViewer = mv;

    mv.addEventListener('error', (e) => {
      console.error('model-viewer error event:', e);
      this._container.innerHTML = `<div class="error">Error cargando 3D (ver consola)</div>`;
    });

    // some browsers/firefox may not fire 'load' — keep as optional log
    mv.addEventListener('load', () => console.log('model-viewer: load event'));
  }
}

if (!customElements.get('vikingdev')) {
  customElements.define('vikingdev', VikingDev);
}









