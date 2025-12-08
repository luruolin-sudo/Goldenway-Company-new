import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

// ✅ 取得容器
const container = document.getElementById("lamp-3d");

// ✅ 建立場景
const scene = new THREE.Scene();

// ✅ 建立相機
const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 5);

// ✅ Renderer（背景透明）
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// ✅ 燈光（產品展示用）
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

// ✅ 匯入 GLB 模型（替換立方體）
let model;
const loader = new GLTFLoader();
loader.load(
  "./model.glb", // 你的燈具檔案路徑
  function (gltf) {
    model = gltf.scene;
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error("載入 GLB 模型失敗:", error);
  }
);

// ✅ 自動旋轉動畫（360° 核心）
function animate() {
  if (model) {
    model.rotation.y += 0.005; // 模型旋轉
  }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
