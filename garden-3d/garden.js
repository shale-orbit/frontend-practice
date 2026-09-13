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
//  添加花朵 
const flowers = [];
const flowerColors = [0xf06292,0xfff176,0xba68c8,0xff8a65];
const flowerSpots = [[-2,-1],[-1.2,-2.2],[-0.3,-1.3],[0.8,-2.1]];
flowerSpots.forEach(([x,z],i) => {
    const flower = new THREE.Group();
    const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03,0.03,0.7,8),
        new THREE.MeshStandardMaterial({color:flowerColors[i]})
    );
    stem.position.y = 0.35;
    const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 16, 16),
        new THREE.MeshStandardMaterial({color:flowerColors[i]})
    );
    head.position.y = 0.78;
    flower.add(stem,head);
    flower.position.set(x,0,z);
    scene.add(flower);
    flowers.push(flower);
});
//添加树干
function createTree(x, z, scale) {
  const tree = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.16, 1, 10),
    new THREE.MeshStandardMaterial({ color: 0x8d6e63 })
  );
  trunk.position.y = 0.5;
  const crown = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 20, 20),
    new THREE.MeshStandardMaterial({ color: 0x43a047 })
  );
  crown.position.y = 1.5;
  const crown2 = crown.clone();                // 复制一个小球让树冠更饱满
  crown2.position.set(0.35, 1.25, 0.1);
  crown2.scale.setScalar(0.55);
  tree.add(trunk, crown, crown2);
  tree.position.set(x, 0, z);
  tree.scale.setScalar(scale);                 // 整体缩放：大小两棵树
  scene.add(tree);
}
createTree(3, -4, 1.1);
createTree(-3.5, -4.5, 0.9);

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
