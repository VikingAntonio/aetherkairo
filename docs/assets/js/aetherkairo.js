// aetherkairo.js - vikingdev (light-DOM wrapper, minimal)
const MV_TAG = 'model-viewer';

class VikingDev extends HTMLElement {
  static get observedAttributes() {
    return [
      'src','alt','poster','ios-src',
      'camera-orbit','camera-target',
      'auto-rotate','camera-controls','ar',
      'seamless-poster','shadow-intensity','exposure'
    ];
  }

  constructor() {
    super();
    this._mv = null;
    this._onError = this._onError.bind(this);
  }

  connectedCallback() {
    // avoid double-creating
    if (this._mv) return;

    const createInner = () => {
      if (this._mv) return;

      // If user already placed a <model-viewer> inside <vikingdev> in markup,
      // prefer that instance. Otherwise create one.
      let mv = this.querySelector(MV_TAG);
      if (!mv) {
        mv = document.createElement(MV_TAG);
        // copy observed attributes from host to inner model-viewer
        for (const name of this.constructor.observedAttributes) {
          if (this.hasAttribute(name)) {
            const val = this.getAttribute(name);
            // treat some attrs as booleans
            if (['auto-rotate','camera-controls','ar','seamless-poster'].includes(name)) {
              // if attribute present and not explicitly "false"/"0", set it
              if (val === '' || val === 'true' || val === '1' || val === null) {
                mv.setAttribute(name, '');
              }
            } else if (val !== null) {
              mv.setAttribute(name, val);
            }
          }
        }
        this.appendChild(mv);
      }

      mv.addEventListener('error', this._onError);
      this._mv = mv;
    };

    // Wait for model-viewer definition if necessary (best practice).
    if (customElements.get(MV_TAG)) {
      createInner();
    } else if (customElements.whenDefined) {
      customElements.whenDefined(MV_TAG).then(createInner).catch(() => {
        // fallback: try to create anyway after a tiny delay
        setTimeout(createInner, 200);
      });
    } else {
      createInner();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // reflect host attributes to the internal <model-viewer> if already created
    if (!this._mv) return;

    if (['auto-rotate','camera-controls','ar','seamless-poster'].includes(name)) {
      if (newValue === null || newValue === 'false' || newValue === '0') {
        this._mv.removeAttribute(name);
      } else {
        this._mv.setAttribute(name, '');
      }
    } else {
      if (newValue === null) this._mv.removeAttribute(name);
      else this._mv.setAttribute(name, newValue);
    }
  }

  disconnectedCallback() {
    if (this._mv) {
      this._mv.removeEventListener('error', this._onError);
      // keep inner element in DOM (so repros persist) — do not forcibly remove.
      this._mv = null;
    }
  }

  _onError(e) {
    // visible, actionable error for dev
    console.error('vikingdev: model-viewer error', e);
  }
}

if (!customElements.get('vikingdev')) {
  customElements.define('vikingdev', VikingDev);
}
