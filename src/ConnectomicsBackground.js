import * as THREE from 'three';

export function createConnectomicsBackground(container) {
  const scene = new THREE.Scene();
  
  // FIXED: Expanded fog range so the network doesn't instantly bleach to white
  scene.fog = new THREE.Fog('#ffffff', 10, 35); 
  
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 15;
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const numNodes = 130;
  const connectionDistance = 3.8;
  const points = [];
  const velocities = [];
  for (let i = 0; i < numNodes; i++) {
    points.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 15
      )
    );
    velocities.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      )
    );
  }

  // Define crisp colors matching your palette
 // Update these strings to change the entire theme instantly
  const baseNodeColor = "#6082B6";     // Muted Sapphire
  const baseLineColor = "#A1B5D0";     // Soft Slate Blue
  const activeNodeColor = "#1D3557";   // Deep Midnight Blue
  const activeLineColor = "#457B9D";   // Steel Blue
  const innerPageNodeColor = "#A1B5D0"; // Subtle blue-gray
  const innerPageLineColor = "#BACADF"; // Visible but light links

  const pointsGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const pointsMaterial = new THREE.PointsMaterial({
    size: 0.12, // Slightly increased node diameter for scaling crispness
    color: new THREE.Color(baseNodeColor),
    transparent: true,
    opacity: 0.25 // Controlled directly here rather than via container
  });
  const pointsObj = new THREE.Points(pointsGeometry, pointsMaterial);
  
  const lineGeometry = new THREE.BufferGeometry();
  const lineMaterial = new THREE.LineBasicMaterial({
    color: new THREE.Color(baseLineColor),
    transparent: true,
    opacity: 0.15
  });
  const linesObj = new THREE.LineSegments(lineGeometry, lineMaterial);

  const group = new THREE.Group();
  group.add(pointsObj);
  group.add(linesObj);
  scene.add(group);

  let isActive = false;
  let isEntryPage = true;

  // FIXED: Keep container opacity high so ThreeJS material details don't get obliterated
  container.style.transition = 'opacity 0.4s ease-in-out';
  container.style.opacity = '1';

  window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'c' && isEntryPage) {
      isActive = !isActive;
      
      // Update Three.js material values dynamically
      pointsMaterial.color.set(isActive ? activeNodeColor : baseNodeColor);
      pointsMaterial.opacity = isActive ? 0.60 : 0.25;
      
      lineMaterial.color.set(isActive ? activeLineColor : baseLineColor);
      lineMaterial.opacity = isActive ? 0.45 : 0.15;
    }
  });

  function animate() {
    requestAnimationFrame(animate);

    const positions = pointsGeometry.attributes.position.array;
    const lineData = [];

    for (let i = 0; i < numNodes; i++) {
      points[i].add(velocities[i]);
      if (points[i].x > 12.5 || points[i].x < -12.5) velocities[i].x *= -1;
      if (points[i].y > 12.5 || points[i].y < -12.5) velocities[i].y *= -1;
      if (points[i].z > 7.5 || points[i].z < -7.5) velocities[i].z *= -1;

      positions[i * 3] = points[i].x;
      positions[i * 3 + 1] = points[i].y;
      positions[i * 3 + 2] = points[i].z;
    }
    pointsGeometry.attributes.position.needsUpdate = true;

    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        const distSq = points[i].distanceToSquared(points[j]);
        if (distSq < connectionDistance * connectionDistance) {
          lineData.push(
            points[i].x, points[i].y, points[i].z,
            points[j].x, points[j].y, points[j].z
          );
        }
      }
    }
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(lineData, 3));

    group.rotation.y += 0.0005;
    group.rotation.x += 0.0002;
    if (isActive && isEntryPage) {
       group.rotation.y += 0.0025;
       group.rotation.x += 0.0015;
    }
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return {
    setIsEntryPage(val) {
      isEntryPage = val;
      if (!isEntryPage) {
        // Internal page state: Muted, clear background that stays clean but visible
        pointsMaterial.color.set(innerPageNodeColor);
        pointsMaterial.opacity = 0.25;
        lineMaterial.color.set(innerPageLineColor);
        lineMaterial.opacity = 0.15;
      } else {
        // Returning back to homepage state
        pointsMaterial.color.set(isActive ? activeNodeColor : baseNodeColor);
        pointsMaterial.opacity = isActive ? 0.60 : 0.25;
        lineMaterial.color.set(isActive ? activeLineColor : baseLineColor);
        lineMaterial.opacity = isActive ? 0.45 : 0.15;
      }
    }
  };
}