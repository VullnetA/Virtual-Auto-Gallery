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

const building2Group = new THREE.Group();

const parkingTexture = textureLoader.load("parking.jpg"); // Replace with the path to your texture image
parkingTexture.wrapS = parkingTexture.wrapT = THREE.RepeatWrapping; // Optional: if you want the texture to repeat
parkingTexture.repeat.set(2, 2); // Optional: adjust the numbers to set the repeat for the texture floor
const parkingGeometry = new THREE.BoxGeometry(50, 1, 50);
const parkingMaterial = new THREE.MeshPhongMaterial({ map: parkingTexture });
const parking = new THREE.Mesh(parkingGeometry, parkingMaterial);
parking.position.x = -40.9;
parking.position.y = -5.5;
parking.position.z = 0;
scene.add(parking);

// OBJECT 2
// First-Floor
// Floor
const floor2Texture = textureLoader.load("screen.png"); // Replace with the path to your texture image
floor2Texture.wrapS = floor2Texture.wrapT = THREE.RepeatWrapping; // Optional: if you want the texture to repeat
floor2Texture.repeat.set(8, 8); // Optional: adjust the numbers to set the repeat for the texture floor
const floor2Geometry = new THREE.BoxGeometry(70, 1, 20);
const floor2Material = new THREE.MeshPhongMaterial({ map: floor2Texture });
const floor2 = new THREE.Mesh(floor2Geometry, floor2Material);
floor2.position.x = -30;
floor2.position.y = -5.5;
floor2.position.z = -35;
building2Group.add(floor2);

// Back wall 1F
const wall2Texture = textureLoader.load("wall.jpg"); // Replace with the path to your texture image
wall2Texture.wrapS = wall2Texture.wrapT = THREE.RepeatWrapping; // Optional: if you want the texture to repeat
wall2Texture.repeat.set(4, 1); // Optional: adjust the numbers to set the repeat for the texture
const wall2OutsideMaterial = new THREE.MeshPhongMaterial({ map: wall2Texture });

const inside2WallTexture = textureLoader.load("plasterwall.jpg"); // Replace with the path to your texture image
inside2WallTexture.wrapS = inside2WallTexture.wrapT = THREE.RepeatWrapping; // Optional: if you want the texture to repeat
inside2WallTexture.repeat.set(4, 1); // Optional: adjust the numbers to set the repeat for the texture
const wall2InsideMaterial = new THREE.MeshPhongMaterial({
  map: inside2WallTexture,
});

const materials2 = [
  wall2OutsideMaterial, // right side
  wall2InsideMaterial, // left side
  wall2InsideMaterial, // top side
  wall2OutsideMaterial, // bottom side
  wall2OutsideMaterial, // front side
  wall2OutsideMaterial, // back side
];

const back2WallGeometry = new THREE.BoxGeometry(0.5, 9, 20);
const back2Wall = new THREE.Mesh(back2WallGeometry, materials2);
back2Wall.position.set(5, -2, -35);
building2Group.add(back2Wall);

// Left wall 1F
const left2Wall2Geometry = new THREE.BoxGeometry(0.5, 7, 70);
const left2Wall2 = new THREE.Mesh(left2Wall2Geometry, materials2);
left2Wall2.position.set(-30, -1.5, -45);
left2Wall2.rotation.y = 90 * (Math.PI / 180);
building2Group.add(left2Wall2);

// Front wall 1F
const window2Material = new THREE.MeshPhysicalMaterial({
  color: 0xffffff, // White color for glass
  transmission: 0.9, // High for transparency
  reflectivity: 0.5, // Medium reflectivity for glass-like appearance
  roughness: 0.0, // Low for a smooth surface
});
const front2WallGeometry = new THREE.BoxGeometry(0.5, 8, 50);
const front2Wall = new THREE.Mesh(front2WallGeometry, window2Material);
front2Wall.position.x = -40;
front2Wall.position.y = -1;
front2Wall.position.z = -25.2;
front2Wall.rotation.y = 90 * (Math.PI / 180);
building2Group.add(front2Wall);

// Ceiling 1F
const ceiling2Geometry = new THREE.BoxGeometry(80, 1, 20); // width, height (thickness), depth
const ceiling2Material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  emissive: 0x222222,
});
const ceiling22 = new THREE.Mesh(ceiling2Geometry, ceiling2Material);
ceiling22.position.x = -25;
ceiling22.position.y = 2.5;
ceiling22.position.z = -35;
building2Group.add(ceiling22);

// Second-Floor
// Back Wall 2F
const back2Wall2Geometry = new THREE.BoxGeometry(0.5, 7, 20);
const back2Wall2 = new THREE.Mesh(back2Wall2Geometry, window2Material);
back2Wall2.position.set(14.7, 6, -35);
building2Group.add(back2Wall2);

// Front Wall 2F
const front2Wall2Geometry = new THREE.BoxGeometry(0.5, 7, 50);
const front2Wall2 = new THREE.Mesh(front2Wall2Geometry, window2Material);
front2Wall2.position.x = -40;
front2Wall2.position.y = 6;
front2Wall2.position.z = -25;
front2Wall2.rotation.y = 90 * (Math.PI / 180);
building2Group.add(front2Wall2);

const backWindowGeometry = new THREE.BoxGeometry(0.5, 7, 19.5);
const backWindow = new THREE.Mesh(backWindowGeometry, window2Material);
backWindow.position.x = -65;
backWindow.position.y = 6;
backWindow.position.z = -35;
building2Group.add(backWindow);

const backWindow2Geometry = new THREE.BoxGeometry(0.5, 7, 19.5);
const backWindow2 = new THREE.Mesh(backWindow2Geometry, window2Material);
backWindow2.position.x = -65;
backWindow2.position.y = -1.5;
backWindow2.position.z = -35;
building2Group.add(backWindow2);

// Left wall 2F
const left3Wall2Geometry = new THREE.BoxGeometry(0.5, 7, 80);
const left3Wall2 = new THREE.Mesh(left3Wall2Geometry, window2Material);
left3Wall2.position.set(-25, 6, -45);
left3Wall2.rotation.y = 90 * (Math.PI / 180);
building2Group.add(left3Wall2);

const ceiling23 = new THREE.Mesh(ceiling2Geometry, ceiling2Material);
ceiling23.position.x = -25;
ceiling23.position.y = 9.5;
ceiling23.position.z = -35;

building2Group.add(ceiling23);

building2Group.position.set(0, 0, 0);
scene.add(building2Group);

const buildingGroup = new THREE.Group();

// OBJECT 1
// First-Floor
// Floor
const floorTexture = textureLoader.load("screen.png"); // Replace with the path to your texture image
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; // Optional: if you want the texture to repeat
floorTexture.repeat.set(8, 8); // Optional: adjust the numbers to set the repeat for the texture floor
const floorGeometry = new THREE.BoxGeometry(21, 1, 50);
const floorMaterial = new THREE.MeshPhongMaterial({ map: floorTexture });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.x = -5.3;
floor.position.y = -5.5;
buildingGroup.add(floor);

// Back wall 1F
const wallTexture = textureLoader.load("wall.jpg"); // Replace with the path to your texture image
wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping; // Optional: if you want the texture to repeat
wallTexture.repeat.set(4, 1); // Optional: adjust the numbers to set the repeat for the texture
const wallOutsideMaterial = new THREE.MeshPhongMaterial({ map: wallTexture });

const insideWallTexture = textureLoader.load("plasterwall.jpg"); // Replace with the path to your texture image
insideWallTexture.wrapS = insideWallTexture.wrapT = THREE.RepeatWrapping; // Optional: if you want the texture to repeat
insideWallTexture.repeat.set(4, 1); // Optional: adjust the numbers to set the repeat for the texture
const wallInsideMaterial = new THREE.MeshPhongMaterial({
  map: insideWallTexture,
});

const materials = [
  wallOutsideMaterial, // right side
  wallInsideMaterial, // left side
  wallInsideMaterial, // top side
  wallOutsideMaterial, // bottom side
  wallOutsideMaterial, // front side
  wallOutsideMaterial, // back side
];

const backWallGeometry = new THREE.BoxGeometry(0.5, 9, 50);
const backWall = new THREE.Mesh(backWallGeometry, materials);
backWall.position.set(5, -2, 0);
buildingGroup.add(backWall);

// Front wall 1F
const windowMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xffffff, // White color for glass
  transmission: 0.9, // High for transparency
  reflectivity: 0.5, // Medium reflectivity for glass-like appearance
  roughness: 0.0, // Low for a smooth surface
});
const frontWallGeometry = new THREE.BoxGeometry(0.5, 8, 50);
const frontWall = new THREE.Mesh(frontWallGeometry, windowMaterial);
frontWall.position.x = -15;
frontWall.position.y = -1;
buildingGroup.add(frontWall);

// Left wall 1F
const leftWallGeometry = new THREE.BoxGeometry(0.5, 8, 20);
const leftWall = new THREE.Mesh(leftWallGeometry, windowMaterial);
leftWall.position.set(-5, -1, 25);
leftWall.rotation.y = 90 * (Math.PI / 180);
buildingGroup.add(leftWall);

// Ceiling 1F
const ceilingGeometry = new THREE.BoxGeometry(30, 1, 50); // width, height (thickness), depth
const ceilingMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  emissive: 0x222222,
});
const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceiling.position.y = 2.5;
buildingGroup.add(ceiling);

// Logo
const logoTexture = textureLoader.load("VA.png"); // Replace with the path to your texture image
logoTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; // Optional: if you want the texture to repeat
logoTexture.repeat.set(1, 1); // Optional: adjust the numbers to set the repeat for the textureloor
const logoMaterial = new THREE.MeshPhongMaterial({ map: logoTexture });
const logoGeometry = new THREE.BoxGeometry(0.1, 2, 4);
const logo = new THREE.Mesh(logoGeometry, logoMaterial);
logo.position.x = 5.5;
logo.position.y = 1;
buildingGroup.add(logo);

// Door
const doorTexture = textureLoader.load("door.png"); // Replace with the path to your texture image
doorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; // Optional: if you want the texture to repeat
doorTexture.repeat.set(1, 1); // Optional: adjust the numbers to set the repeat for the textureloor
const doorMaterial = new THREE.MeshPhongMaterial({ map: doorTexture });
const doorGeometry = new THREE.BoxGeometry(0.1, 2, 5);
const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.position.x = 5.6;
door.position.y = -4;
buildingGroup.add(door);

//Pillars
const pillarGeometry = new THREE.CylinderGeometry(1, 1, 8, 32);
const pillarMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
});
const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
const pillar2 = new THREE.Mesh(pillarGeometry, pillarMaterial);
const pillar3 = new THREE.Mesh(pillarGeometry, pillarMaterial);
pillar.position.set(10, -2, 12); // This sets the pillar's base at y = 0
pillar2.position.set(10, -2, -12); // This sets the pillar's base at y = 0
pillar3.position.set(10, -2, -36); // This sets the pillar's base at y = 0
buildingGroup.add(pillar, pillar2, pillar3);

//Pillars
const insidePillarGeometry = new THREE.CylinderGeometry(1, 1, 8, 32);
const insidePillarMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
});
const insidePillar = new THREE.Mesh(insidePillarGeometry, insidePillarMaterial);
const insidePillar2 = new THREE.Mesh(
  insidePillarGeometry,
  insidePillarMaterial
);
const insidePillar3 = new THREE.Mesh(
  insidePillarGeometry,
  insidePillarMaterial
);
const insidePillar4 = new THREE.Mesh(
  insidePillarGeometry,
  insidePillarMaterial
);
const insidePillar5 = new THREE.Mesh(
  insidePillarGeometry,
  insidePillarMaterial
);
const insidePillar6 = new THREE.Mesh(
  insidePillarGeometry,
  insidePillarMaterial
);
insidePillar.position.set(0, 6, 14); // This sets the pillar's base at y = 0
insidePillar2.position.set(0, 6, -12); // This sets the pillar's base at y = 0
insidePillar3.position.set(0, 6, -36); // This sets the pillar's base at y = 0
insidePillar4.position.set(-20, 6, -36); // This sets the pillar's base at y = 0
insidePillar5.position.set(-40, 6, -36); // This sets the pillar's base at y = 0
insidePillar6.position.set(-60, 6, -36); // This sets the pillar's base at y = 0
buildingGroup.add(
  insidePillar,
  insidePillar2,
  insidePillar3,
  insidePillar4,
  insidePillar5,
  insidePillar6
);

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
stairsGroup.position.set(6, -6, 0); // Adjust x, y, z values as needed to move the staircase
buildingGroup.add(stairsGroup);

// Second-Floor
// Back Wall SF
const backWall2Geometry = new THREE.BoxGeometry(0.5, 7, 50);
const backWall2 = new THREE.Mesh(backWall2Geometry, windowMaterial);
backWall2.position.set(14.7, 6, 0);
buildingGroup.add(backWall2);

// Front Wall SF
const frontWall2Geometry = new THREE.BoxGeometry(0.5, 7, 50);
const frontWall2 = new THREE.Mesh(frontWall2Geometry, windowMaterial);
frontWall2.position.x = -14.7;
frontWall2.position.y = 6;
buildingGroup.add(frontWall2);
scene.add(buildingGroup);

// Left wall SF
const leftWall2Geometry = new THREE.BoxGeometry(0.5, 7, 29);
const leftWall2 = new THREE.Mesh(leftWall2Geometry, windowMaterial);
leftWall2.position.set(-0.1, 6, 24.8);
leftWall2.rotation.y = 90 * (Math.PI / 180);
scene.add(leftWall2);
buildingGroup.add(leftWall2);

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
buildingGroup.add(glassPanel);

// Ceiling 2F
const ceiling2 = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceiling2.position.y = 9.5;
scene.add(ceiling2);
buildingGroup.add(ceiling2);

// buildingGroup.position.set(30, 0, 20);
// building2Group.position.set(30, 0, 20);

//Grass
const grassTexture = textureLoader.load("grass.jpg"); // Replace with the path to your grass texture image
grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
grassTexture.repeat.set(50, 50); // Adjust the numbers to set the repeat for the texture
const groundGeometry = new THREE.PlaneGeometry(200, 200); // Size of the ground
const groundMaterial = new THREE.MeshStandardMaterial({ map: grassTexture });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Rotate the ground to lie flat
ground.position.y = -6; // Adjust the position to be just below your stairs and other objects
scene.add(ground);

//Fog
scene.fog = new THREE.Fog(0xf0f0f0, 50, 300); // The color, near plane, and far plane

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
