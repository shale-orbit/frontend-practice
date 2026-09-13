// 搭建场景 
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xc8e8f7);   // 淡蓝天空色背景
scene.fog = new THREE.Fog(0xc8e8f7, 15, 35);    // 远处渐隐，增加空间感

// 添加相机 
const camera = new THREE.PerspectiveCamera(
  45, window.innerWidth / window.innerHeight, 0.1, 100
);
camera.position.set(6, 4.5, 8);

//  添加渲染器 
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//  鼠标交互：左键环绕、滚轮缩放、右键平移 
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1, -1);   // 视线落在花园中心偏上
controls.update();

//  光源：环境光打底 + 方向光当太阳 
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const sun = new THREE.DirectionalLight(0xffffff, 0.9);
sun.position.set(5, 8, 5);
scene.add(sun);

//  草地：平面绕x轴躺平 
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.MeshStandardMaterial({ color: 0x7cb342 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

//  渲染循环 
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

//  窗口自适应三件套 
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});