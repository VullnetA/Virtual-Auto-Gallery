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

// Point Light
const pointLight = new THREE.PointLight(0xffffff, 50, 100); // color, intensity, distance
pointLight.position.set(-5, 2, 0); // position the light in the scene (x, y, z)
scene.add(pointLight);

// Helper to visualize the point light position (optional)
const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLightHelper);

// F// Load the floor texture
const floorTexture = textureLoader.load("screen.png"); // Replace with the path to your texture image
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; // Optional: if you want the texture to repeat
floorTexture.repeat.set(8, 8); // Optional: adjust the numbers to set the repeat for the textureloor

const floorGeometry = new THREE.BoxGeometry(20, 1, 30);
const floorMaterial = new THREE.MeshPhongMaterial({ map: floorTexture });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);

floor.position.x = -5.3;
floor.position.y = -5.5;
scene.add(floor);

const windowMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xffffff, // White color for glass
  transmission: 0.9, // High for transparency
  reflectivity: 0.5, // Medium reflectivity for glass-like appearance
  roughness: 0.0, // Low for a smooth surface
});

const points = [
  new THREE.Vector2(4, 0),
  new THREE.Vector2(5, 0),
  new THREE.Vector2(5, 4),
  new THREE.Vector2(4, 4),
  new THREE.Vector2(4, 0),
];

const scaleFactor = 5; // Scale factor for the width (x-coordinate)
const heightScaleFactor = 2; // Scale factor for the height (y-coordinate)

// Scale the points
const scaledPoints = points.map(
  (p) => new THREE.Vector2(p.x * scaleFactor, p.y * heightScaleFactor)
);

let geometry = new THREE.LatheGeometry(scaledPoints, 600, 0, 1.9 * Math.PI);
let material = new THREE.MeshLambertMaterial({
  side: THREE.DoubleSide,
  clipIntersection: true,
});

let mesh = new THREE.Mesh(geometry, material);
mesh.position.y = -4;
mesh.position.z = -50;
scene.add(mesh);

// Walls
const sideWallGeometry = new THREE.BoxGeometry(0.5, 8, 30);
const leftWall = new THREE.Mesh(sideWallGeometry, windowMaterial);
leftWall.position.x = -15;
leftWall.position.y = -1;
scene.add(leftWall);

// Ceiling
const ceilingGeometry = new THREE.BoxGeometry(30, 1, 30); // width, height (thickness), depth
const ceilingMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  emissive: 0x222222,
});

const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceiling.position.y = 2.5;
// ceiling.rotation.x = Math.PI / 2;
scene.add(ceiling);

// Glass Panel
const glassGeometry = new THREE.BoxGeometry(0.1, 4, 10);
const glassMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.5,
});
const glassPanel = new THREE.Mesh(glassGeometry, glassMaterial);
glassPanel.position.x = 15;
glassPanel.position.y = 4;
scene.add(glassPanel);

//Pillars
const pillarGeometry = new THREE.CylinderGeometry(1, 1, 8, 32);
const pillarMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
});
const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
const pillar2 = new THREE.Mesh(pillarGeometry, pillarMaterial);
pillar.position.set(10, -2, 12); // This sets the pillar's base at y = 0
pillar2.position.set(10, -2, -12); // This sets the pillar's base at y = 0
scene.add(pillar, pillar2);

//Steps
const stepWidth = 5;
const stepHeight = 0.5;
const stepDepth = 1;
const numberOfSteps = 2;
const stairsGroup = new THREE.Group(); // Create a group for the stairs

const stepMaterial = new THREE.MeshStandardMaterial({
  color: 0x808080, // Gray color for the steps
  // Add any other material properties you need
});

// Convert -90 degrees to radians for rotation
const rotationAngle = -Math.PI / 2; // Negative for clockwise rotation (to the right)

for (let i = 0; i < numberOfSteps; i++) {
  const stepGeometry = new THREE.BoxGeometry(stepWidth, stepHeight, stepDepth);

  const step = new THREE.Mesh(stepGeometry, stepMaterial);

  // Position each step
  step.position.x = -i * stepDepth; // Steps go to the left on the x-axis, so we use a negative value
  step.position.y = stepHeight / 2 + i * stepHeight; // Each step is a little higher
  step.position.z = 0; // Since we're rotating, this now aligns with where the depth would have been

  // Rotate each step -90 degrees around the Y axis
  step.rotation.y = rotationAngle;

  stairsGroup.add(step); // Add the step to the group instead of the scene
}

// Now you can move the entire group to the desired position
stairsGroup.position.set(6, -6, 0); // Adjust x, y, z values as needed to move the staircase

scene.add(stairsGroup); // Add the group to the scene

const loader = new GLTFLoader(loadingManager);
loader.load(
  "model/scene.gltf", // Ensure this path is correct
  (gltf) => {
    // Adjust the model position and scale
    gltf.scene.position.set(-8, 6, 20); // May need adjustment for new garage size
    gltf.scene.scale.set(1, 1, 1); // Adjust the scale if necessary
    gltf.scene.rotation.y = Math.PI / 2 + Math.PI;

    // Add the model to the scene
    scene.add(gltf.scene);
  },
  undefined,
  (error) => {
    console.error("An error happened while loading the model:", error);
  }
);

loader.load(
  "model2/scene.gltf", // Ensure this path is correct
  (gltf) => {
    // Adjust the model position and scale
    gltf.scene.position.set(10, -5, -5); // May need adjustment for new garage size
    gltf.scene.scale.set(1, 1, 1); // Adjust the scale if necessary
    gltf.scene.rotation.y = Math.PI / 2;

    // Add the model to the scene
    scene.add(gltf.scene);
  },
  undefined,
  (error) => {
    console.error("An error happened while loading the model:", error);
  }
);

loader.load(
  "model3/scene.gltf", // Ensure this path is correct
  (gltf) => {
    // Adjust the model position and scale
    gltf.scene.position.set(-11, -4.7, 7); // May need adjustment for new garage size
    gltf.scene.scale.set(100, 100, 100); // Adjust the scale if necessary
    gltf.scene.rotation.y = Math.PI / 2 + Math.PI;

    // Add the model to the scene
    scene.add(gltf.scene);
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
