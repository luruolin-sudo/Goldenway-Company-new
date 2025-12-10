import * as THREE from "./libs/three.module.js";
import { GLTFLoader } from "./libs/GLTFLoader.js";
import { OrbitControls } from "./libs/OrbitControls.js";
import { EXRLoader } from "./libs/EXRLoader.js"; // ✅ 載入 EXRLoader

// 建立場景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // ✅ 黑色背景

// 建立 renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(500, 500);
document.body.appendChild(renderer.domElement);

// 建立相機
const camera = new THREE.PerspectiveCamera(
  45,
  renderer.domElement.width / renderer.domElement.height,
  0.1,
  100
);
camera.position.set(0, 1.5, 3);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 1;
controls.maxDistance = 10;

// 燈光
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 3, 4);
scene.add(light);

// ✅ GUI 面板設定
const gui = new dat.GUI();
const settings = {
  autoRotate: true,
  rotateSpeed: 0.01,
  ambientIntensity: 1,
  directionalIntensity: 1,
  lightColor: "#ffffff"
};

gui.add(settings, "autoRotate").name("自動旋轉");
gui.add(settings, "rotateSpeed", 0.0005, 0.1).name("旋轉速度");
gui.add(settings, "ambientIntensity", 0, 2).name("環境光強度").onChange(v => {
  ambientLight.intensity = v;
});
gui.add(settings, "directionalIntensity", 0, 2).name("方向光強度").onChange(v => {
  light.intensity = v;
});
gui.addColor(settings, "lightColor").name("燈光顏色").onChange(v => {
  light.color.set(v);
});

// ✅ 載入 EXR HDRI 環境光
const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

new EXRLoader()
  .setPath("./hdr/") // HDRI 檔案資料夾
  .load("lebombo.exr", function (texture) {
    const envMap = pmremGenerator.fromEquirectangular(texture).texture;

    scene.environment = envMap;   // ✅ 模型反射用
    scene.background = new THREE.Color(0x000000); // 背景保持黑色

    texture.dispose();
    pmremGenerator.dispose();
  });

// 載入 GLB 模型
let model;
const loader = new GLTFLoader();
loader.load("./model/BL-360.glb", function (gltf) {
  model = gltf.scene;
  scene.add(model);
});

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
