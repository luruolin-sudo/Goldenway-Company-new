import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

// 🔴 關鍵修正（告訴 loader THREE 在哪）
import * as THREE_NAMESPACE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const container = document.getElementById("lamp-3d");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 1.5, 4);

// Renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Light
scene.add(new THREE.AmbientLight(0xffffff, 0.7));

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// ✅ Load local GLB
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
  (err) => {
    console.error("模型載入失敗", err);
  }
);

// Animate
function animate() {
  if (model) {
    model.rotation.y += 0.005;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
