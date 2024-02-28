import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import gsap from 'gsap';

const modal = document.getElementById("mainModal")

const openModal = () => {
  modal.showModal();
}

const btnCloseModal = document.querySelector("#btn-close-modal")

btnCloseModal.addEventListener("click", () => {
  modal.close()
})

// Canvas
const canvas = document.querySelector('canvas');

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  45, // Field of View
  window.innerWidth / window.innerHeight, // Aspect Ratio
  0.1, // Near
  1000 // Far
);

// Initial position of the camera
camera.position.set(-4.9, 4.4, 1.9);
camera.rotation.set(-0.9, -0.8, -0.8);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);

let position = 0;

// gltf Loader
const gltfLoader = new GLTFLoader();
gltfLoader.load('/model/swedish-royal/scene.gltf', (gltf) => {
  console.log('Our model here!', gltf);
  const model = gltf.scene;
  scene.add(model);

  canvas.addEventListener('mouseup', function () {
    switch (position) {
      case 0:
        cambiarContenidoModal();
        openModal()
        cameraMovement(-6.0, 1.72, 1.34);
        cameraRotation(-2.75, -1.24, -2.77);
        position = 1;
        break;

      case 1:
        cambiarContenidoModal();
        openModal()
        cameraMovement(0.48, 2.09, -2.11);
        cameraRotation(-3.12, 0.22, 3.13);
        position = 2;
        break;

      case 2:
        cambiarContenidoModal();
        openModal()
        cameraMovement(-1.49, 1.7, 0.48);
        cameraRotation(0.44, 1.43, -0.44);
        position = 0;
    }
  });
});

// Functions to move and rotate the camera
function cameraMovement(x, y, z) {
  gsap.to(camera.position, {
    x,
    y,
    z,
    duration: 3,
  });
}

function cameraRotation(x, y, z) {
  gsap.to(camera.rotation, {
    x,
    y,
    z,
    duration: 3,
  });
}

// Animation and loop
const animate = () => {
  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);

animate();

const op = [
  {
    "titulo": "Piano Español",
    "descripcion": "El piano, con su sonido cautivador y su versatilidad incomparable, ha cautivado a los amantes de la música durante siglos. Este instrumento, nacido en Italia, encontró en España un hogar donde su desarrollo y evolución se han visto profundamente influenciados por la rica cultura y tradición del país.",
    "caracteristicas": {
      "origen": "Italia",
      "creador": "Bartolomeo Cristofori de Padua",
      "ano": 1709,
      "fabricacion": "Alemania",
      "fabricantes": ["Gottfried Silbermann", "Johannes Zumpe"],
      "opinion_bach": "Es el futuro de la música",
      "expansion": "Finales del siglo XVIII"
    }
  },
  {
    "titulo": "Cuadros Españoles",
    "descripcion": "Los cuadros españoles traídos a Ecuador son un tesoro cultural que nos permite viajar a través del tiempo y la historia de España. Desde el Renacimiento hasta el siglo XX, estas obras de arte reflejan la evolución del estilo y la técnica pictórica española.",
    "caracteristicas": {
      "origen": "España",
      "epoca": ["Renacimiento", "Barroco", "Rococó", "Romanticismo", "Realismo", "Impresionismo", "Post-impresionismo", "Siglo XX"],
      "estilo": ["Religioso", "mitológico", "retrato", "paisaje", "costumbrista"],
      "artistas": ["Velázquez", "Goya", "El Greco", "Zurbarán", "Murillo", "Sorolla", "Picasso", "Dalí"],
      "material": ["Lienzo", "madera", "óleo", "temple"],
      "temas": ["Religión", "mitología", "historia", "retrato", "paisaje", "costumbres"],
      "valor": "Cultural e histórico",
      "historia": "Testimonio del intercambio cultural entre España y Ecuador"
    }
  },
  {
    "titulo": "Mueblería Española",
    "descripcion": "La mueblería española, ahora presente en Ecuador, es un reflejo de la rica historia y tradición del país ibérico. Desde la época medieval hasta la actualidad, los artesanos españoles han creado muebles de una calidad y belleza incomparables.",
    "caracteristicas": {
      "origen": "España",
      "epoca": "Medieval hasta la actualidad",
      "estilo": ["Clásico", "moderno", "vanguardista"],
      "material": ["Madera noble", "nogal", "caoba", "roble"],
      "tecnicas": ["Talla", "marquetería"],
      "piezas": ["Dormitorios", "comedores", "salones", "cocinas"]
    }
  }
]

const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalList = document.getElementById('modalList');

// Esta función cambia el contenido del modal
let currentIndex = 0;
function cambiarContenidoModal() {
  const obra = op[currentIndex];
  modalTitle.textContent = obra.titulo;
  modalText.textContent = obra.descripcion;
  modalList.innerHTML = '';

  for (const caracteristica in obra.caracteristicas) {
    const caracteristicaItem = document.createElement('li');
    caracteristicaItem.textContent = `${caracteristica}: ${obra.caracteristicas[caracteristica]}`;
    modalList.appendChild(caracteristicaItem);
  }
  currentIndex++
  if (currentIndex === op.length){
    currentIndex = 0;
  }
}

function avanzar() {
  if (currentIndex < op.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  cambiarContenidoModal();
}

