import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

// ✅ 容器
const container = document.getElementById("lamp-3d");

// ✅ 場景
const scene = new THREE.Scene();

// ✅ 相機
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

// ✅ 打光（展示型）
scene.add(new THREE.AmbientLight(0xffffff, 0.7));

const keyLight = new THREE.DirectionalLight(0xffffff, 1);
keyLight.position.set(5, 10, 5);
scene.add(keyLight);

// ✅ 載入測試 GLB
const loader = new GLTFLoader();
let model = null;

loader.load(
  "https://threejs.org/examples/models/gltf/DamagedHelmet/glTF-Binary/DamagedHelmet.glb",
  (gltf) => {
    model = gltf.scene;
    model.scale.set(2, 2, 2);
    scene.add(model);
  }
);

// ✅ 動畫（自動 360°）
function animate() {
  if (model) {
    model.rotation.y += 0.005;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
