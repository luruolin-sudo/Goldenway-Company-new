import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

// ✅ 場景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// ✅ 相機
const camera = new THREE.PerspectiveCamera(
  45,
  1,
  0.1,
  100
);
camera.position.set(0, 1.5, 3);

// ✅ Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(500, 500);
document.body.appendChild(renderer.domElement);

// ✅ 燈光
scene.add(new THREE.AmbientLight(0xffffff, 1));
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 3, 4);
scene.add(light);

// ✅ 匯入 GLB 模型
let model;
const loader = new GLTFLoader();
loader.load(
  "./models/model.glb",   // 🔑 路徑相對於 index.html
  function (gltf) {
    model = gltf.scene;
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error("載入 GLB 模型失敗:", error);
  }
);

// ✅ 動畫
function animate() {
  requestAnimationFrame(animate);
  if (model) {
    model.rotation.y += 0.01; // 模型旋轉
  }
  renderer.render(scene, camera);
}
animate();
