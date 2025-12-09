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

// 載入 GLB 模型
let model;
const loader = new GLTFLoader();
loader.load(
  "./model/model.glb", // ✅ 路徑正確
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

  // 如果想保留自動旋轉，可以加這行
  if (model) {
    model.rotation.y += 0.01;
  }

  controls.update(); // ✅ 更新控制器
  renderer.render(scene, camera);
}
animate();
