import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

const container = document.getElementById("lamp-3d");

// ✅ Scene
const scene = new THREE.Scene();

// ✅ Camera
const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 1.5, 4);

// ✅ Renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// ✅ Light
scene.add(new THREE.AmbientLight(0xffffff, 0.7));

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

// ✅ Load local test model (✅ 不會被擋)
const loader = new GLTFLoader();
let model = null;

loader.load(
  "./model/Duck.glb",
  (gltf) => {
    model = gltf.scene;
    model.scale.set(0.02, 0.02, 0.02);
    scene.add(model);
  },
  undefined,
  (error) => {
    console.error("GLB 載入失敗", error);
  }
);

// ✅ Animate
function animate() {
  if (model) {
    model.rotation.y += 0.005;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
