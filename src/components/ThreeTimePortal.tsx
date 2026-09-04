import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeTimePortalProps {
  intensity?: number;
  interactive?: boolean;
}

export const ThreeTimePortal: React.FC<ThreeTimePortalProps> = ({ intensity = 1.0, interactive = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // Scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for temporal rings and historical center artifact
    const portalGroup = new THREE.Group();
    scene.add(portalGroup);

    // Subtle lighting for 3D metallic elements
    const portalLight = new THREE.PointLight(0xf59e0b, 2.5, 30);
    portalLight.position.set(0, 0, 8);
    scene.add(portalLight);
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    // 3D Historical Centerpiece: Gyroscopic Armillary Astrolabe
    const armillaryGroup = new THREE.Group();
    portalGroup.add(armillaryGroup);

    // Inner glowing golden orb
    const centerOrbGeo = new THREE.SphereGeometry(1.2, 24, 24);
    const centerOrbMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.8,
      metalness: 0.9,
      roughness: 0.2
    });
    const centerOrb = new THREE.Mesh(centerOrbGeo, centerOrbMat);
    armillaryGroup.add(centerOrb);

    // Armillary Brass Rings (Equator, Meridian, Tilted Zodiac Ecliptic)
    const armillaryRings: THREE.Mesh[] = [];
    const armillaryConfigs = [
      { radius: 2.2, tube: 0.08, rotX: 0, rotY: 0, rotZ: 0, color: 0xfcd34d },
      { radius: 2.5, tube: 0.07, rotX: Math.PI / 2, rotY: 0, rotZ: 0, color: 0xf59e0b },
      { radius: 2.8, tube: 0.09, rotX: Math.PI / 4, rotY: Math.PI / 6, rotZ: 0, color: 0x38bdf8 },
      { radius: 3.1, tube: 0.06, rotX: Math.PI / 3, rotY: Math.PI / 3, rotZ: Math.PI / 4, color: 0xfcd34d },
    ];

    armillaryConfigs.forEach((cfg) => {
      const geo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 12, 48);
      const mat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        metalness: 0.85,
        roughness: 0.25,
      });
      const ring = new THREE.Mesh(geo, mat);
      ring.rotation.set(cfg.rotX, cfg.rotY, cfg.rotZ);
      armillaryGroup.add(ring);
      armillaryRings.push(ring);
    });

    // Create concentric outer temporal rings
    const rings: THREE.Mesh[] = [];
    const ringRadii = [4.2, 6.5, 9, 12, 15];
    const ringColors = [0xf59e0b, 0xd97706, 0x38bdf8, 0x818cf8, 0xf59e0b];

    ringRadii.forEach((radius, i) => {
      const geometry = new THREE.TorusGeometry(radius, 0.08, 16, 100);
      const material = new THREE.MeshBasicMaterial({
        color: ringColors[i % ringColors.length],
        transparent: true,
        opacity: (0.45 + i * 0.1) * intensity,
        wireframe: i % 2 === 1
      });
      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.x = Math.PI / 2 + (i * 0.2);
      ring.rotation.y = (i * 0.3);
      portalGroup.add(ring);
      rings.push(ring);
    });

    // Particle vortex (stars / temporal chronotons)
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleSpeeds: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 2 + Math.random() * 18;
      const angle = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 20;

      particlePos[i * 3] = Math.cos(angle) * radius;
      particlePos[i * 3 + 1] = Math.sin(angle) * radius;
      particlePos[i * 3 + 2] = z;

      particleSpeeds.push(0.01 + Math.random() * 0.03);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xfef08a,
      size: 0.18,
      transparent: true,
      opacity: 0.75 * intensity,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    portalGroup.add(particleSystem);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate armillary celestial sphere and rings gyroscopically
      armillaryGroup.rotation.y += 0.015;
      armillaryGroup.rotation.x = Math.sin(elapsedTime * 0.7) * 0.25;
      armillaryRings.forEach((r, idx) => {
        r.rotation.z += 0.01 * (idx % 2 === 0 ? 1 : -1) * (idx + 1);
        r.rotation.y += 0.008 * (idx + 1);
      });

      // Rotate rings with different speeds and sinusoidal undulating tilt
      rings.forEach((ring, index) => {
        const dir = index % 2 === 0 ? 1 : -1;
        ring.rotation.z += 0.008 * dir * (index + 1) * 0.4;
        ring.rotation.x += Math.sin(elapsedTime * 0.5 + index) * 0.003;
      });

      // Slowly rotate the whole portal group
      portalGroup.rotation.y = Math.sin(elapsedTime * 0.2) * 0.15;
      portalGroup.rotation.z += 0.003;

      // Vortex particle inward drift
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        let x = positions[i * 3];
        let y = positions[i * 3 + 1];
        let z = positions[i * 3 + 2];

        // Slight swirl
        const angle = 0.02 * particleSpeeds[i];
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const newX = x * cos - y * sin;
        const newY = x * sin + y * cos;

        positions[i * 3] = newX;
        positions[i * 3 + 1] = newY;

        // Move along z axis toward center
        positions[i * 3 + 2] += Math.sin(elapsedTime + i) * 0.02;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [intensity, interactive]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative overflow-hidden pointer-events-none" 
      aria-hidden="true"
    />
  );
};
