// vikingdev.js
class VikingDev extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Importar model-viewer dentro del componente
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
        shadow.appendChild(script);

        // CSS
        const style = document.createElement('style');
        style.textContent = `
            model-viewer {
                width: 40%;
                height: 500px;
                margin: auto;
                background-position: bottom;
                background-size: cover;
                background-repeat: no-repeat;
            }
            @media (max-width: 992px) {
                model-viewer {
                    width: 75%;
                    height: 900px;
                }
            }
        `;

        // Esperar a que se cargue el script antes de crear model-viewer
        script.onload = () => {
            const mv = document.createElement('model-viewer');
            mv.setAttribute('id', 'reveal');
            mv.setAttribute('loading', 'eager');
            mv.setAttribute('shadow-intensity', '2');
            mv.setAttribute('camera-controls', '');
            mv.setAttribute('camera-orbit', '360deg -360deg 1.5m');
            mv.setAttribute('auto-rotate', '');
            mv.setAttribute('alt', 'element3D');
            mv.setAttribute('exposure', '1');
            mv.setAttribute('environment-image', 'neutral');

            // Tomar atributos personalizados si existen
            const src = this.getAttribute('src') || 'https://vikingantonio.github.io/aetherkairo/assets/scene.gltf';
            const poster = this.getAttribute('poster') || 'https://vikingantonio.github.io/aetherkairo/assets/img/caffe22.png';
            const bg = this.getAttribute('background') || 'https://vikingantonio.github.io/aetherkairo/assets/img/bgtaza3.png';

            mv.setAttribute('src', src);
            mv.setAttribute('poster', poster);
            mv.style.background = `url(${bg})`;
            mv.style.backgroundPosition = 'bottom';
            mv.style.backgroundSize = 'cover';
            mv.style.backgroundRepeat = 'no-repeat';
            mv.style.height = '500px';

            shadow.appendChild(style);
            shadow.appendChild(mv);
        }
    }
}

customElements.define('vikingdev', VikingDev);


// Registrar etiqueta
customElements.define('vikingdev', VikingDev);

