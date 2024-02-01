import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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

const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

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

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Floor
const floorTexture = textureLoader.load("path_to_your_floor_texture.jpg"); // Replace with the path to your texture image
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(4, 4);

const floorMaterial = new THREE.MeshPhongMaterial({ map: floorTexture });
const floorGeometry = new THREE.PlaneGeometry(30, 30);
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -5;
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

// Pillars
const pillarGeometry = new THREE.BoxGeometry(1, 8, 1);
const pillarMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 });
const pillarPositions = [
  new THREE.Vector3(-7, 4, -7),
  new THREE.Vector3(-7, 4, 7),
  new THREE.Vector3(7, 4, -7),
  new THREE.Vector3(7, 4, 7),
];

pillarPositions.forEach((position) => {
  const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
  pillar.position.copy(position);
  scene.add(pillar);
});

// Ceiling
const ceilingGeometry = new THREE.PlaneGeometry(30, 30);
const ceilingMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  emissive: 0x222222,
});
const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceiling.position.y = 8;
ceiling.rotation.x = Math.PI / 2;
scene.add(ceiling);

// Glass Panel
const glassGeometry = new THREE.BoxGeometry(0.1, 4, 10);
const glassMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.5,
});
const glassPanel = new THREE.Mesh(glassGeometry, glassMaterial);
glassPanel.position.set(15, 6, 0);
glassPanel.rotation.y = Math.PI / 2;
scene.add(glassPanel);

// Load GLTF model
const loader = new GLTFLoader(loadingManager);
loader.load(
  "model/scene.gltf", // Ensure this path is correct
  (gltf) => {
    // Adjust the model position and scale
    gltf.scene.position.set(0, 0, -5); // Adjust position as necessary
    gltf.scene.scale.set(1, 1, 1); // Adjust scale as necessary
    scene.add(gltf.scene); // Add the model to the scene
  },
  undefined,
  (error) => {
    console.error("An error happened while loading the model:", error);
  }
);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
