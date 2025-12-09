import * as THREE from "./libs/three.module.js";
import { GLTFLoader } from "./libs/GLTFLoader.js";

// 建立場景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// 建立相機
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.set(0, 1.5, 3);

// 建立 renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(500, 500);
document.body.appendChild(renderer.domElement);

// 燈光
scene.add(new THREE.AmbientLight(0xffffff, 1));
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 3, 4);
scene.add(light);

// 載入 GLB 模型
let model;
const loader = new GLTFLoader();
loader.load(
  "./models/model.glb", // ✅ 相對於 index.html
  function (gltf) {
    model = gltf.scene;
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error("載入 GLB 模型失敗:", error);
  }
);

// 動畫
function animate() {
  requestAnimationFrame(animate);
  if (model) {
    model.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
}
animate();
