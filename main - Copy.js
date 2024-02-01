import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0); // Light grey color

// Camera setup
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 5, 15); // Adjusted for larger garage

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Handle window resize
window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Orbit Controls setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Floor
const floorGeometry = new THREE.PlaneGeometry(30, 30);
const floorMaterial = new THREE.MeshPhongMaterial({ color: 0x999999 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Walls
const wallMaterial = new THREE.MeshPhongMaterial({ color: 0xbbbbbb });
const wallGeometry = new THREE.BoxGeometry(30, 10, 1);
const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
backWall.position.z = -15;
scene.add(backWall);

const sideWallGeometry = new THREE.BoxGeometry(1, 10, 30);
const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
leftWall.position.x = -15;
scene.add(leftWall);

const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
rightWall.position.x = 15;
scene.add(rightWall);

// Ceiling
const ceilingGeometry = new THREE.PlaneGeometry(30, 30);
const ceilingMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  emissive: 0x222222,
});
const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceiling.position.y = 10;
ceiling.rotation.x = Math.PI / 2;
scene.add(ceiling);

// Glass Panel
const glassGeometry = new THREE.PlaneGeometry(15, 8);
const glassMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.5,
});
const glassPanel = new THREE.Mesh(glassGeometry, glassMaterial);
glassPanel.position.set(-15, 4, 0);
glassPanel.rotation.y = Math.PI / 2;
scene.add(glassPanel);

// Furniture
const sofaGeometry = new THREE.BoxGeometry(3, 1, 1);
const sofaMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
const sofa = new THREE.Mesh(sofaGeometry, sofaMaterial);
sofa.position.set(-5, 0.5, -10);
scene.add(sofa);

// Placeholder for car models
const carGeometry = new THREE.BoxGeometry(3, 1, 1);
const carMaterial = new THREE.MeshPhongMaterial({ color: 0x555555 });
const car = new THREE.Mesh(carGeometry, carMaterial);
car.position.set(0, 0.5, -5);
scene.add(car);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
