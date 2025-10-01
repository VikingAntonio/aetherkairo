class VikingDev extends HTMLElement {
    constructor() {
        super();

        // Tomar atributos
        const src = this.getAttribute('src') || 'https://vikingantonio.github.io/aetherkairo/assets/scene.gltf';
        const poster = this.getAttribute('poster') || 'https://vikingantonio.github.io/aetherkairo/assets/img/caffe22.png';
        const bg = this.getAttribute('background') || 'https://vikingantonio.github.io/aetherkairo/assets/img/bgtaza3.png';
        const width = this.getAttribute('width') || '40%';
        const height = this.getAttribute('height') || '500px';

        // Crear <model-viewer> en Light DOM
        const mv = document.createElement('model-viewer');
        mv.setAttribute('src', src);
        mv.setAttribute('poster', poster);
        mv.setAttribute('shadow-intensity', '2');
        mv.setAttribute('camera-controls', '');
        mv.setAttribute('camera-orbit', '360deg -360deg 1.5m');
        mv.setAttribute('auto-rotate', '');
        mv.setAttribute('alt', 'element3D');
        mv.setAttribute('exposure', '1');
        mv.setAttribute('environment-image', 'neutral');
        mv.style.width = width;
        mv.style.height = height;
        mv.style.background = `url(${bg})`;
        mv.style.backgroundPosition = 'bottom';
        mv.style.backgroundSize = 'cover';
        mv.style.backgroundRepeat = 'no-repeat';
        mv.style.display = 'block';
        mv.style.margin = 'auto';

        // Limpiar contenido previo y añadir el model-viewer
        this.innerHTML = '';
        this.appendChild(mv);
    }
}

customElements.define('vikingdev', VikingDev);





