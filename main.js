import * as THREE from "./libs/three.module.js";
import { GLTFLoader } from "./libs/GLTFLoader.js";
import { OrbitControls } from "./libs/OrbitControls.js"; // ✅ 新增

// 建立場景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// 建立 renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(500, 500);
document.body.appendChild(renderer.domElement);

// 建立相機（使用 renderer 寬高比）
const camera = new THREE.PerspectiveCamera(
  45,
  renderer.domElement.width / renderer.domElement.height,
  0.1,
  100
);
camera.position.set(0, 1.5, 3);

// 建立 OrbitControls（相機 + renderer.domElement）
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;   // 慣性效果
controls.dampingFactor = 0.05;
controls.minDistance = 1;        // 最小縮放距離
controls.maxDistance = 10;       // 最大縮放距離

// 燈光
scene.add(new THREE.AmbientLight(0xffffff, 1));
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 3, 4);
scene.add(light);

// ✅ 在這裡加 GUI 面板
const gui = new dat.GUI();
const settings = {
  autoRotate: true,
  ambientIntensity: 1,
  directionalIntensity: 1,
  lightColor: "#ffffff"
};

gui.add(settings, "autoRotate").name("自動旋轉");
gui.add(settings, "ambientIntensity", 0, 2).name("環境光強度").onChange(v => {
  ambientLight.intensity = v;
});
gui.add(settings, "directionalIntensity", 0, 2).name("方向光強度").onChange(v => {
  light.intensity = v;
});
gui.addColor(settings, "lightColor").name("燈光顏色").onChange(v => {
  light.color.set(v);
});

// 載入 GLB 模型
let model;
const loader = new GLTFLoader();
loader.load("./model/model.glb", function (gltf) {
  model = gltf.scene;
  scene.add(model);
});

// ✅ 設定與 GUI 面板（只宣告一次）
const settings = {
  autoRotate: true,
  rotateSpeed: 0.01
};

gui.add(settings, "autoRotate").name("自動旋轉");
gui.add(settings, "rotateSpeed", 0.001, 0.1).name("旋轉速度");

// 動畫函式
function animate() {
  requestAnimationFrame(animate);

  if (model && settings.autoRotate) {
    model.rotation.y += settings.rotateSpeed;
  }

  controls.update();
  renderer.render(scene, camera);
}

animate();
