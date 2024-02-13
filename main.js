import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xadd8e6); // Light grey color

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
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.BasicShadowMap;

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
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(-5, 20, 7.5);
scene.add(directionalLight);

// Point Light
// const pointLight = new THREE.PointLight(0xffffff, 50, 50); // color, intensity, distance
// pointLight.position.set(-5, 2, 0); // position the light in the scene (x, y, z)
// pointLight.castShadow = true;
// scene.add(pointLight);

// // Helper to visualize the point light position (optional)
// const pointLightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(pointLightHelper);

// -- UNDERGROUND GARAGE
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
mesh.position.x = 40;
mesh.position.y = -20;
mesh.position.z = -40;
scene.add(mesh);

// -- TEXTURES AND MATERIALS
// Brick Wall Material
const brickWallTexture = textureLoader.load("brickwall.jpg"); // Replace with the path to your texture image
brickWallTexture.wrapS = brickWallTexture.wrapT = THREE.RepeatWrapping; // Optional: if you want the texture to repeat
brickWallTexture.repeat.set(4, 1); // Optional: adjust the numbers to set the repeat for the texture
const brickWallMaterial = new THREE.MeshStandardMaterial({
  map: brickWallTexture,
});

// Floor Material
const floorTexture = textureLoader.load("screen.png"); // Replace with the path to your texture image
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; // Optional: if you want the texture to repeat
floorTexture.repeat.set(8, 8); // Optional: adjust the numbers to set the repeat for the texture floor
const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });

// Panel Material
const panelTexture = textureLoader.load("panel.jpg"); // Replace with the path to your texture image
panelTexture.wrapS = panelTexture.wrapT = THREE.RepeatWrapping; // Optional: if you want the texture to repeat
panelTexture.repeat.set(2, 1); // Optional: adjust the numbers to set the repeat for the texture
const panelMaterial = new THREE.MeshStandardMaterial({ map: panelTexture });

// Plaster Material
const plasterTexture = textureLoader.load("plasterwall.jpg"); // Replace with the path to your texture image
plasterTexture.wrapS = plasterTexture.wrapT = THREE.RepeatWrapping; // Optional: if you want the texture to repeat
plasterTexture.repeat.set(4, 1); // Optional: adjust the numbers to set the repeat for the texture
const plasterMaterial = new THREE.MeshStandardMaterial({
  map: plasterTexture,
});

// Roof Material
const roofTexture = textureLoader.load("roof.jpg"); // Replace with the path to your texture image
roofTexture.wrapS = roofTexture.wrapT = THREE.RepeatWrapping; // Optional: if you want the texture to repeat
roofTexture.repeat.set(2, 2); // Optional: adjust the numbers to set the repeat for the texture floor
const roofMaterial = new THREE.MeshStandardMaterial({ map: roofTexture });

// Logo Material
const logoTexture = textureLoader.load("VA.png"); // Replace with the path to your texture image
logoTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; // Optional: if you want the texture to repeat
logoTexture.repeat.set(1, 1); // Optional: adjust the numbers to set the repeat for the textureloor
const logoMaterial = new THREE.MeshStandardMaterial({ map: logoTexture });

// Door Material
const doorTexture = textureLoader.load("door.png"); // Replace with the path to your texture image
doorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; // Optional: if you want the texture to repeat
doorTexture.repeat.set(1, 1); // Optional: adjust the numbers to set the repeat for the textureloor
const doorMaterial = new THREE.MeshStandardMaterial({ map: doorTexture });

// Pillar Material
const pillarTexture = textureLoader.load("pillar.jpg"); // Replace with the path to your texture image
pillarTexture.wrapS = pillarTexture.wrapT = THREE.RepeatWrapping; // Optional: if you want the texture to repeat
pillarTexture.repeat.set(1, 1); // Optional: adjust the numbers to set the repeat for the textureloor
const insidePillarMaterial = new THREE.MeshStandardMaterial({
  map: pillarTexture,
});

// Window Material
const windowMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xffffff, // White color for glass
  transmission: 0.9, // High for transparency
  reflectivity: 0.5, // Medium reflectivity for glass-like appearance
  roughness: 0.0, // Low for a smooth surface
});

// Parking Material
const parkingTexture = textureLoader.load("parking.jpg"); // Replace with the path to your texture image
parkingTexture.wrapS = parkingTexture.wrapT = THREE.RepeatWrapping; // Optional: if you want the texture to repeat
parkingTexture.repeat.set(2, 2); // Optional: adjust the numbers to set the repeat for the texture floor
const parkingMaterial = new THREE.MeshStandardMaterial({ map: parkingTexture });

// Grass Material
const grassTexture = textureLoader.load("grass.jpg"); // Replace with the path to your grass texture image
grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
grassTexture.repeat.set(50, 50); // Adjust the numbers to set the repeat for the texture
const groundMaterial = new THREE.MeshStandardMaterial({ map: grassTexture });

// -- MATERIAL ARRAYS
// Bottom Platforms
const bottomPlatformMaterial = [
  plasterMaterial, // right side
  plasterMaterial, // left side
  floorMaterial, // top side
  plasterMaterial, // bottom side
  plasterMaterial, // front side
  plasterMaterial, // back side
];

// Middle Platforms
const middlePlatformMaterial = [
  plasterMaterial, // right side
  panelMaterial, // left side
  floorMaterial, // top side
  plasterMaterial, // bottom side
  panelMaterial, // front side
  plasterMaterial, // back side
];

// Top Platforms
const topPlatformMaterials = [
  plasterMaterial, // right side
  panelMaterial, // left side
  roofMaterial, // top side
  plasterMaterial, // bottom side
  panelMaterial, // front side
  plasterMaterial, // back side
];

// Outside Brick Walls
const outsideWallMaterial = [
  brickWallMaterial, // right side
  plasterMaterial, // left side
  plasterMaterial, // top side
  plasterMaterial, // bottom side
  plasterMaterial, // front side
  plasterMaterial, // back side
];

const buildingGroup = new THREE.Group();

// OBJECT 1
// Platform 1
const platform1Geometry = new THREE.BoxGeometry(21, 1, 50);
const platform1 = new THREE.Mesh(platform1Geometry, bottomPlatformMaterial);
platform1.position.x = -5.3;
platform1.position.y = -5.5;
platform1.receiveShadow = true;
//platform1.castShadow = true;
buildingGroup.add(platform1);

// Back Wall 1F
const backWall1Geometry = new THREE.BoxGeometry(1, 9, 50);
const backWall1 = new THREE.Mesh(backWall1Geometry, outsideWallMaterial);
backWall1.position.set(5, -2, 0);
backWall1.receiveShadow = true;
//backWall1.castShadow = true;
buildingGroup.add(backWall1);

// Front Wall 1F
const frontWall1Geometry = new THREE.BoxGeometry(0.5, 8, 50);
const frontWall1 = new THREE.Mesh(frontWall1Geometry, windowMaterial);
frontWall1.position.x = -15;
frontWall1.position.y = -1;
//frontWall1.castShadow = true;
frontWall1.receiveShadow = true;
buildingGroup.add(frontWall1);

// Left Wall 1F
const leftWall1Geometry = new THREE.BoxGeometry(0.5, 8, 20);
const leftWall1 = new THREE.Mesh(leftWall1Geometry, windowMaterial);
leftWall1.position.set(-5, -1, 25);
leftWall1.rotation.y = 90 * (Math.PI / 180);
leftWall1.castShadow = true;
leftWall1.receiveShadow = true;
buildingGroup.add(leftWall1);

// Logo
const logoGeometry = new THREE.BoxGeometry(0.1, 3, 5);
const logo = new THREE.Mesh(logoGeometry, logoMaterial);
logo.position.x = 5.5;
logo.position.y = 0;
logo.castShadow = true;
logo.receiveShadow = true;
buildingGroup.add(logo);

// Door
const doorGeometry = new THREE.BoxGeometry(0.1, 3, 5);
const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.position.x = 5.6;
door.position.y = -4;
door.castShadow = true;
door.receiveShadow = true;
buildingGroup.add(door);

// Outside Pillars
const pillarGeometry = new THREE.CylinderGeometry(1, 1, 8, 32);
const pillarMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const pillarPositions = [12, -12, -36];
pillarPositions.forEach((zPosition) => {
  const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
  pillar.position.set(10, -2, zPosition); // Adjust position with base at y = 0
  // pillar.castShadow = true;
  pillar.receiveShadow = true;
  buildingGroup.add(pillar);
});

// Inside Pillars
const insidePillarGeometry = new THREE.CylinderGeometry(1, 1, 8, 32);
// Function to create and position a pillar
function createAndPositionPillar(x, y, z) {
  const pillar = new THREE.Mesh(insidePillarGeometry, insidePillarMaterial);
  pillar.position.set(x, y, z);
  // pillar.castShadow = true;
  pillar.receiveShadow = true;
  buildingGroup.add(pillar);
}

// Positions for the first set of pillars
const positionsSet1 = [
  { x: 0, y: 6, z: 14 },
  { x: 0, y: 6, z: -12 },
  { x: 0, y: 6, z: -36 },
  { x: -20, y: 6, z: -36 },
  { x: -40, y: 6, z: -36 },
  { x: -60, y: 6, z: -36 },
];

// Positions for the second set of pillars
const positionsSet2 = [
  { x: 0, y: -2, z: 14 },
  { x: 0, y: -2, z: -12 },
  { x: 0, y: -2, z: -36 },
  { x: -20, y: -2, z: -36 },
  { x: -40, y: -2, z: -36 },
  { x: -60, y: -2, z: -36 },
];

// Create and position the first set of pillars
positionsSet1.forEach((pos) => createAndPositionPillar(pos.x, pos.y, pos.z));

// Create and position the second set of pillars
positionsSet2.forEach((pos) => createAndPositionPillar(pos.x, pos.y, pos.z));

// Steps
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
  // step.castShadow = true;
  // step.receiveShadow = true;
  stairsGroup.add(step); // Add the step to the group instead of the scene
}
stairsGroup.position.set(6, -6, 0); // Adjust x, y, z values as needed to move the staircase
buildingGroup.add(stairsGroup);

// Platform 2
const platform2Geometry = new THREE.BoxGeometry(30, 2, 50); // width, height (thickness), depth
const platform2 = new THREE.Mesh(platform2Geometry, middlePlatformMaterial);
platform2.position.y = 2.5;
platform2.receiveShadow = true;
buildingGroup.add(platform2);

// Back Wall 2F
const backWall2Geometry = new THREE.BoxGeometry(0.5, 7, 50);
const backWall2 = new THREE.Mesh(backWall2Geometry, windowMaterial);
backWall2.position.set(14.7, 6, 0);
backWall2.receiveShadow = true;
buildingGroup.add(backWall2);

// Front Wall 2F
const frontWall2Geometry = new THREE.BoxGeometry(0.5, 7, 50);
const frontWall2 = new THREE.Mesh(frontWall2Geometry, windowMaterial);
frontWall2.position.x = -14.7;
frontWall2.position.y = 6;
frontWall2.receiveShadow = true;
buildingGroup.add(frontWall2);

// Left Wall 2F
const leftWall2Geometry = new THREE.BoxGeometry(0.5, 7, 29);
const leftWall2 = new THREE.Mesh(leftWall2Geometry, windowMaterial);
leftWall2.position.set(-0.1, 6, 24.8);
leftWall2.rotation.y = 90 * (Math.PI / 180);
leftWall2.receiveShadow = true;
buildingGroup.add(leftWall2);

// Platform 3
const platform3 = new THREE.Mesh(platform2Geometry, topPlatformMaterials);
platform3.position.y = 10.5;
platform3.receiveShadow = true;
buildingGroup.add(platform3);

// OBJECT 2
// Platform 4
const platform4Geometry = new THREE.BoxGeometry(70, 1, 20);
const platform4 = new THREE.Mesh(platform4Geometry, bottomPlatformMaterial);
platform4.position.x = -30;
platform4.position.y = -5.5;
platform4.position.z = -35;
platform4.receiveShadow = true;
buildingGroup.add(platform4);

// Left Wall 1F
const leftWall3Geometry = new THREE.BoxGeometry(1, 9, 20);
const leftWall3 = new THREE.Mesh(leftWall3Geometry, outsideWallMaterial);
leftWall3.position.set(5, -2, -35);
leftWall3.receiveShadow = true;
buildingGroup.add(leftWall3);

// Back Wall 1F
const backWall3Geometry = new THREE.BoxGeometry(0.5, 7, 70);
const backWall3 = new THREE.Mesh(backWall3Geometry, outsideWallMaterial);
backWall3.position.set(-30, -1.5, -44.8);
backWall3.rotation.y = 90 * (Math.PI / 180);
backWall3.receiveShadow = true;
buildingGroup.add(backWall3);

// Front Wall 1F
const frontWall3Geometry = new THREE.BoxGeometry(0.5, 8, 50);
const frontWall3 = new THREE.Mesh(frontWall3Geometry, windowMaterial);
frontWall3.position.x = -40;
frontWall3.position.y = -1;
frontWall3.position.z = -25.2;
frontWall3.rotation.y = 90 * (Math.PI / 180);
frontWall3.receiveShadow = true;
buildingGroup.add(frontWall3);

// Right Wall 1F
const rightWall1Geometry = new THREE.BoxGeometry(0.5, 7, 19.5);
const rightWall1 = new THREE.Mesh(rightWall1Geometry, windowMaterial);
rightWall1.position.x = -65;
rightWall1.position.y = -1.5;
rightWall1.position.z = -35;
rightWall1.receiveShadow = true;
buildingGroup.add(rightWall1);

// Platform 5
const platform5Geometry = new THREE.BoxGeometry(80, 2, 20); // width, height (thickness), depth
const platform5 = new THREE.Mesh(platform5Geometry, middlePlatformMaterial);
platform5.position.x = -25;
platform5.position.y = 2.5;
platform5.position.z = -35;
platform5.receiveShadow = true;
buildingGroup.add(platform5);

// Left Wall 2F
const leftWall4Geometry = new THREE.BoxGeometry(0.5, 7, 20);
const leftWall4 = new THREE.Mesh(leftWall4Geometry, windowMaterial);
leftWall4.position.set(14.7, 6, -35);
leftWall4.receiveShadow = true;
buildingGroup.add(leftWall4);

// Front Wall 2F
const frontWall4Geometry = new THREE.BoxGeometry(0.5, 7, 50);
const frontWall4 = new THREE.Mesh(frontWall4Geometry, windowMaterial);
frontWall4.position.x = -40;
frontWall4.position.y = 6;
frontWall4.position.z = -25;
frontWall4.rotation.y = 90 * (Math.PI / 180);
frontWall4.receiveShadow = true;
buildingGroup.add(frontWall4);

// Right Wall 2F
const rightWall2Geometry = new THREE.BoxGeometry(0.5, 7, 19.5);
const rightWall2 = new THREE.Mesh(rightWall2Geometry, windowMaterial);
rightWall2.position.x = -65;
rightWall2.position.y = 6;
rightWall2.position.z = -35;
rightWall2.receiveShadow = true;
buildingGroup.add(rightWall2);

// Back Wall 2F
const backWall4Geometry = new THREE.BoxGeometry(0.5, 7, 80);
const backWall4 = new THREE.Mesh(backWall4Geometry, windowMaterial);
backWall4.position.set(-25, 6, -45);
backWall4.rotation.y = 90 * (Math.PI / 180);
backWall4.receiveShadow = true;
buildingGroup.add(backWall4);

// Platform 6
const platform6 = new THREE.Mesh(platform5Geometry, topPlatformMaterials);
platform6.position.x = -25;
platform6.position.y = 10.5;
platform6.position.z = -35;
platform6.receiveShadow = true;
buildingGroup.add(platform6);

// Parking
const parkingGeometry = new THREE.BoxGeometry(50, 1, 50);
const parking = new THREE.Mesh(parkingGeometry, parkingMaterial);
parking.position.x = -40.9;
parking.position.y = -5.5;
parking.position.z = 0;
parking.receiveShadow = true;
buildingGroup.add(parking);

// Moving the entire building all together
buildingGroup.position.set(30, -0.7, 20);

scene.add(buildingGroup);

//Ground
const groundGeometry = new THREE.PlaneGeometry(200, 200); // Size of the ground
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Rotate the ground to lie flat
ground.position.y = -6; // Adjust the position to be just below your stairs and other objects
ground.receiveShadow = true;
scene.add(ground);

const loader = new GLTFLoader(loadingManager);

let lampModel; // This will hold the loaded model

// Function to initialize the lamp model
function loadModelOnce(modelPath, callback) {
  loader.load(
    modelPath,
    (gltf) => {
      lampModel = gltf.scene;
      callback(); // Proceed to use the model after it's loaded
    },
    undefined,
    (error) => {
      console.error("An error happened while loading the model:", error);
    }
  );
}

// Function to create and add a lamp clone and its light to the scene
function addLampAndLight(
  position,
  scale,
  rotationY,
  lightIntensity,
  lightDistance
) {
  const lampClone = lampModel.clone(); // Clone the model
  lampClone.position.set(...position);
  lampClone.scale.set(...scale);
  if (rotationY !== undefined) lampClone.rotation.y = rotationY;

  scene.add(lampClone);

  const pointLight = new THREE.PointLight(
    0xffffff,
    lightIntensity,
    lightDistance
  );
  pointLight.position.set(...position);
  pointLight.castShadow = true;
  scene.add(pointLight);
}

// Load the model once, then use it multiple times
loadModelOnce("ceiling_lamp_673/scene2.gltf", () => {
  const lampPositions = [
    [25, 8.6, 17],
    [25, 8.6, 0],
    [20, 8.6, -15],
    [0, 8.6, -15],
    [-20, 8.6, -15],
    [25, 0.6, 17],
    [25, 0.6, 0],
    [20, 0.6, -15],
    [0, 0.6, -15],
    [-20, 0.6, -15],
  ];
  const scale = [0.1, 0.1, 0.1];
  const lightIntensity = 50;
  const lightDistance = 50;

  lampPositions.forEach((position) => {
    // Adjust rotation for specific lamps if necessary
    addLampAndLight(position, scale, lightIntensity, lightDistance);
  });
});

function loadModel(modelDetails) {
  const { path, position, scale, rotationY } = modelDetails;
  loader.load(
    path,
    (gltf) => {
      const model = gltf.scene;
      model.position.set(...position);
      model.scale.set(...scale);
      model.rotation.y = rotationY;
      scene.add(model);
    },
    undefined,
    (error) => {
      console.error(
        `An error happened while loading the model: ${path}`,
        error
      );
    }
  );
}

const models = [
  {
    path: "lamborghini_gallardo/scene.gltf",
    position: [-15, -5.5, -10],
    scale: [1.1, 1.1, 1.1],
    rotationY: Math.PI / 6,
  },
  {
    path: "g500/scene.gltf",
    position: [4, -4, -10],
    scale: [0.6, 0.6, 0.6],
    rotationY: Math.PI / 6,
  },
  {
    path: "mclaren/scene.gltf",
    position: [-23, -5.5, -7],
    scale: [130, 130, 130],
    rotationY: -Math.PI / 6,
  },
  {
    path: "gls_580/scene.gltf",
    position: [-10, -5.5, -7],
    scale: [1.5, 1.5, 1.5],
    rotationY: -Math.PI / 6,
  },
  {
    path: "chiron/scene.gltf",
    position: [20, -5.5, 15],
    scale: [2.8, 2.8, 2.8],
    rotationY: Math.PI,
  },
  {
    path: "jesko/scene.gltf",
    position: [20, -5.5, 25],
    scale: [0.024, 0.024, 0.024],
    rotationY: -Math.PI / 2,
  },
  {
    path: "911/scene.gltf",
    position: [19, -5.5, 35],
    scale: [1.8, 1.8, 1.8],
    rotationY: -Math.PI / 2,
  },
  {
    path: "r8/scene.gltf",
    position: [-47, -2.2, 113],
    scale: [0.5, 0.5, 0.5],
    rotationY: -Math.PI / 2,
  },
  {
    path: "pagani/scene.gltf",
    position: [20, -5.5, 3],
    scale: [200, 200, 200],
    rotationY: -Math.PI / 2,
  },
  {
    path: "bmw/scene.gltf",
    position: [27, 3, 17],
    scale: [0.45, 0.45, 0.45],
    rotationY: Math.PI / 2,
  },
  {
    path: "mazda/scene.gltf",
    position: [19, 3, 35],
    scale: [200, 200, 200],
    rotationY: 0,
  },
  {
    path: "mustang/scene.gltf",
    position: [-12, 2.8, -10],
    scale: [1.7, 1.7, 1.7],
    rotationY: Math.PI / 3,
  },
  {
    path: "shelby/scene.gltf",
    position: [-28, 2.8, -13],
    scale: [1.6, 1.6, 1.6],
    rotationY: Math.PI / 3,
  },
  {
    path: "nfs/scene.gltf",
    position: [2, 2.8, -10],
    scale: [0.08, 0.08, 0.08],
    rotationY: Math.PI / 2,
  },
];

models.forEach(loadModel);

// let model2Original; // This will hold the original loaded model

// // Function to load the model once
// loader.load(
//   "model2/scene.gltf", // Ensure this path is correct
//   (gltf) => {
//     model2Original = gltf.scene;
//     // model2Original.traverse(function (node) {
//     //   if (node.isMesh) {
//     //     node.castShadow = true;
//     //     node.receiveShadow = true;
//     //   }
//     // });

//     // After loading, clone and add the model 50 times to the scene
//     for (let i = 0; i < 20; i++) {
//       const modelClone = model2Original.clone();

//       // Adjust the clone's position, scale, and rotation
//       modelClone.position.set(10 + i, -5, -5); // Example: modifying x position for each clone
//       modelClone.scale.set(1, 1, 1);
//       modelClone.rotation.y = Math.PI / 2;

//       // Add the clone to the scene
//       scene.add(modelClone);
//     }
//   },
//   undefined,
//   (error) => {
//     console.error("An error happened while loading the model:", error);
//   }
// );

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
