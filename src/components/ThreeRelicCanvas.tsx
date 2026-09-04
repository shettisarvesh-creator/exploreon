import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Historical3DRelic, RelicHotspot } from '../data/relicsData';

export type RenderMode = 'material' | 'hologram' | 'xray';

interface ThreeRelicCanvasProps {
  relic: Historical3DRelic;
  renderMode?: RenderMode;
  autoRotate?: boolean;
  rotationSpeed?: number;
  selectedHotspotId?: string | null;
  onSelectHotspot?: (hotspot: RelicHotspot) => void;
  showCanvasMarkers?: boolean;
  className?: string;
}

export const ThreeRelicCanvas: React.FC<ThreeRelicCanvasProps> = ({
  relic,
  renderMode = 'material',
  autoRotate = true,
  rotationSpeed = 1.0,
  selectedHotspotId = null,
  onSelectHotspot,
  showCanvasMarkers = false,
  className = 'w-full h-full'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const animObjectsRef = useRef<{ [key: string]: THREE.Object3D | THREE.Object3D[] }>({});
  
  // Drag rotation state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.2, y: 0.5 });
  const currentRotationRef = useRef({ x: 0.2, y: 0.5 });
  const zoomDistanceRef = useRef(14);
  const targetZoomDistanceRef = useRef(14);

  // Screen-projected hotspots for interactive overlay
  const [projectedHotspots, setProjectedHotspots] = useState<{ id: string; x: number; y: number; visible: boolean }[]>([]);

  // 1. Build Procedural 3D Historical Models
  const buildModel = useCallback((type: Historical3DRelic['modelType'], mode: RenderMode): THREE.Group => {
    const group = new THREE.Group();
    animObjectsRef.current = {};

    // Helper material factory based on mode
    const getMat = (params: {
      color: number;
      roughness?: number;
      metalness?: number;
      wireframe?: boolean;
      transparent?: boolean;
      opacity?: number;
      emissive?: number;
    }) => {
      if (mode === 'hologram') {
        return new THREE.MeshStandardMaterial({
          color: relic.accentColor ? parseInt(relic.accentColor.replace('#', '0x')) : 0x38bdf8,
          emissive: 0x1e3a8a,
          wireframe: true,
          transparent: true,
          opacity: 0.85,
        });
      }
      if (mode === 'xray') {
        return new THREE.MeshStandardMaterial({
          color: params.color,
          transparent: true,
          opacity: 0.35,
          roughness: 0.3,
          metalness: 0.2,
          wireframe: false,
          depthWrite: false,
        });
      }
      // Realistic material
      return new THREE.MeshStandardMaterial({
        color: params.color,
        roughness: params.roughness ?? 0.7,
        metalness: params.metalness ?? 0.1,
        wireframe: params.wireframe ?? false,
        transparent: params.transparent ?? false,
        opacity: params.opacity ?? 1.0,
        emissive: params.emissive ?? 0x000000,
      });
    };

    // Shared gold / bronze metal material
    const goldMat = getMat({ color: 0xd4af37, metalness: 0.85, roughness: 0.25 });
    const brassMat = getMat({ color: 0xcd7f32, metalness: 0.8, roughness: 0.3 });
    const darkStoneMat = getMat({ color: 0x2a2a2d, roughness: 0.9, metalness: 0.05 });
    const travertineMat = getMat({ color: 0xdfd2c0, roughness: 0.85, metalness: 0.05 });
    const graniteMat = getMat({ color: 0x8a847e, roughness: 0.8, metalness: 0.1 });
    const vermilionMat = getMat({ color: 0xd9381e, roughness: 0.5, metalness: 0.1 });
    const woodMat = getMat({ color: 0x4a3728, roughness: 0.7, metalness: 0.05 });
    const copperRoofMat = getMat({ color: 0x3b6e5b, roughness: 0.6, metalness: 0.3 });

    // ----------------------------------------------------
    // MODEL 1: COLOSSEUM (Flavian Amphitheatre, Rome 115 AD)
    // ----------------------------------------------------
    if (type === 'colosseum') {
      const colosseumGroup = new THREE.Group();

      // Outer elliptical tier base
      const groundDiscGeo = new THREE.CylinderGeometry(6.5, 6.5, 0.4, 48);
      const groundDisc = new THREE.Mesh(groundDiscGeo, darkStoneMat);
      groundDisc.position.y = -1.5;
      colosseumGroup.add(groundDisc);

      // 3 Tiers of Exterior Wall Arcades
      const tiers = [
        { radius: 5.2, height: 1.2, y: -0.8, arches: 36, scaleX: 1.2 },
        { radius: 5.0, height: 1.2, y: 0.4, arches: 36, scaleX: 1.2 },
        { radius: 4.8, height: 1.2, y: 1.6, arches: 36, scaleX: 1.2 },
      ];

      tiers.forEach((tier) => {
        const ringGroup = new THREE.Group();
        // Ring wall
        const wallGeo = new THREE.CylinderGeometry(tier.radius, tier.radius, tier.height, 48, 1, true);
        const wall = new THREE.Mesh(wallGeo, travertineMat);
        ringGroup.add(wall);

        // Columns / Pillars around arcade
        for (let i = 0; i < tier.arches; i++) {
          const angle = (i / tier.arches) * Math.PI * 2;
          const colX = Math.cos(angle) * tier.radius * tier.scaleX;
          const colZ = Math.sin(angle) * tier.radius;

          const colGeo = new THREE.CylinderGeometry(0.08, 0.08, tier.height, 8);
          const col = new THREE.Mesh(colGeo, travertineMat);
          col.position.set(colX, 0, colZ);
          ringGroup.add(col);

          // Arched lintel over opening
          if (i % 2 === 0) {
            const archTorusGeo = new THREE.TorusGeometry(0.25, 0.04, 8, 12, Math.PI);
            const archMesh = new THREE.Mesh(archTorusGeo, travertineMat);
            archMesh.position.set(colX * 0.98, tier.height * 0.35, colZ * 0.98);
            archMesh.rotation.y = -angle + Math.PI / 2;
            ringGroup.add(archMesh);
          }
        }

        // Entablature cornice ledge
        const ledgeGeo = new THREE.TorusGeometry(tier.radius * 1.01, 0.07, 8, 48);
        const ledge = new THREE.Mesh(ledgeGeo, travertineMat);
        ledge.rotation.x = Math.PI / 2;
        ledge.position.y = tier.height / 2;
        ringGroup.add(ledge);

        ringGroup.position.y = tier.y;
        colosseumGroup.add(ringGroup);
      });

      // Top Attic Wall (4th Tier with velarium mast brackets)
      const atticGeo = new THREE.CylinderGeometry(4.6, 4.6, 1.0, 48, 1, true);
      const attic = new THREE.Mesh(atticGeo, travertineMat);
      attic.position.y = 2.7;
      colosseumGroup.add(attic);

      // Velarium Masts
      for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2;
        const mastX = Math.cos(angle) * 4.65 * 1.2;
        const mastZ = Math.sin(angle) * 4.65;
        const mastGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.3, 6);
        const mast = new THREE.Mesh(mastGeo, woodMat);
        mast.position.set(mastX, 3.2, mastZ);
        colosseumGroup.add(mast);
      }

      // Interior Sloping Cavea Seating
      const caveaGeo = new THREE.ConeGeometry(4.4, 2.0, 36, 4, true);
      const cavea = new THREE.Mesh(caveaGeo, travertineMat);
      cavea.rotation.x = Math.PI;
      cavea.position.y = 0.5;
      colosseumGroup.add(cavea);

      // Central Arena Floor with yellow sand
      const arenaMat = getMat({ color: 0xd9b36d, roughness: 0.95 });
      const arenaGeo = new THREE.CylinderGeometry(2.4, 2.4, 0.15, 32);
      arenaGeo.scale(1.3, 1, 0.85);
      const arena = new THREE.Mesh(arenaGeo, arenaMat);
      arena.position.y = -0.45;
      colosseumGroup.add(arena);

      // Subterranean Hypogeum Wall Grid (visible in cutout or wireframe)
      const hypogeumGroup = new THREE.Group();
      for (let i = -3; i <= 3; i++) {
        const wallGeo = new THREE.BoxGeometry(0.08, 0.6, 3.2);
        const wallMesh = new THREE.Mesh(wallGeo, darkStoneMat);
        wallMesh.position.set(i * 0.5, -0.85, 0);
        hypogeumGroup.add(wallMesh);
      }
      colosseumGroup.add(hypogeumGroup);

      group.add(colosseumGroup);
    }

    // ----------------------------------------------------
    // MODEL 2: STONE CHARIOT (Hampi, Vijayanagara 1500 AD)
    // ----------------------------------------------------
    else if (type === 'stone_chariot') {
      const chariotGroup = new THREE.Group();

      // Granite Plinth Platform
      const plinthGeo = new THREE.BoxGeometry(5.2, 0.6, 6.2);
      const plinth = new THREE.Mesh(plinthGeo, graniteMat);
      plinth.position.y = -1.2;
      chariotGroup.add(plinth);

      // Plinth ornamental step band
      const stepGeo = new THREE.BoxGeometry(5.6, 0.25, 6.6);
      const step = new THREE.Mesh(stepGeo, darkStoneMat);
      step.position.y = -1.55;
      chariotGroup.add(step);

      // 4 Carved Stone Wheels (Rotating in animation!)
      const wheelGroupList: THREE.Group[] = [];
      const wheelOffsets = [
        { x: -2.3, z: -1.8, flip: 1 },
        { x: 2.3, z: -1.8, flip: -1 },
        { x: -2.3, z: 1.8, flip: 1 },
        { x: 2.3, z: 1.8, flip: -1 },
      ];

      wheelOffsets.forEach((pos) => {
        const singleWheelGroup = new THREE.Group();
        singleWheelGroup.position.set(pos.x, -0.6, pos.z);

        // Wheel Rim
        const rimGeo = new THREE.TorusGeometry(0.9, 0.15, 12, 32);
        const rimMesh = new THREE.Mesh(rimGeo, graniteMat);
        rimMesh.rotation.y = Math.PI / 2;
        singleWheelGroup.add(rimMesh);

        // Wheel Hub / Axle Cap
        const hubGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.4, 16);
        hubGeo.rotateZ(Math.PI / 2);
        const hubMesh = new THREE.Mesh(hubGeo, goldMat);
        singleWheelGroup.add(hubMesh);

        // 16 Lotus Spokes
        for (let s = 0; s < 16; s++) {
          const spokeAngle = (s / 16) * Math.PI * 2;
          const spokeGeo = new THREE.CylinderGeometry(0.04, 0.06, 0.8, 8);
          const spokeMesh = new THREE.Mesh(spokeGeo, graniteMat);
          spokeMesh.position.set(0, Math.cos(spokeAngle) * 0.45, Math.sin(spokeAngle) * 0.45);
          spokeMesh.rotation.x = spokeAngle;
          singleWheelGroup.add(spokeMesh);
        }

        chariotGroup.add(singleWheelGroup);
        wheelGroupList.push(singleWheelGroup);
      });
      animObjectsRef.current['wheels'] = wheelGroupList;

      // 2 Guardian Stone Elephants at the frontal ramp
      [-1.0, 1.0].forEach((ex) => {
        const elephantGroup = new THREE.Group();
        elephantGroup.position.set(ex, -0.8, 3.4);

        // Body
        const bodyGeo = new THREE.BoxGeometry(0.7, 0.8, 1.2);
        const body = new THREE.Mesh(bodyGeo, graniteMat);
        elephantGroup.add(body);

        // Head & Trunk
        const headGeo = new THREE.SphereGeometry(0.35, 12, 12);
        headGeo.scale(0.9, 1.1, 1.2);
        const head = new THREE.Mesh(headGeo, graniteMat);
        head.position.set(0, 0.3, 0.6);
        elephantGroup.add(head);

        const trunkGeo = new THREE.CylinderGeometry(0.08, 0.14, 0.7, 8);
        trunkGeo.rotateX(Math.PI / 4);
        const trunk = new THREE.Mesh(trunkGeo, graniteMat);
        trunk.position.set(0, -0.15, 0.9);
        elephantGroup.add(trunk);

        // Tusks
        [-0.15, 0.15].forEach((tx) => {
          const tuskGeo = new THREE.CylinderGeometry(0.02, 0.04, 0.3, 6);
          const tusk = new THREE.Mesh(tuskGeo, goldMat);
          tusk.position.set(tx, 0.1, 0.9);
          tusk.rotation.x = Math.PI / 3;
          elephantGroup.add(tusk);
        });

        chariotGroup.add(elephantGroup);
      });

      // Main Sanctum Chamber (Mandapa)
      const chamberGeo = new THREE.BoxGeometry(3.6, 1.8, 4.0);
      const chamber = new THREE.Mesh(chamberGeo, graniteMat);
      chamber.position.y = 0.2;
      chariotGroup.add(chamber);

      // Carved Corner Pillars
      const pillarOffsets = [
        { x: -1.7, z: -1.9 },
        { x: 1.7, z: -1.9 },
        { x: -1.7, z: 1.9 },
        { x: 1.7, z: 1.9 },
      ];
      pillarOffsets.forEach((pos) => {
        const pillarGeo = new THREE.CylinderGeometry(0.18, 0.22, 2.0, 8);
        const pillar = new THREE.Mesh(pillarGeo, darkStoneMat);
        pillar.position.set(pos.x, 0.2, pos.z);
        chariotGroup.add(pillar);
      });

      // Overhanging Cornice (Chhajja eave)
      const eaveGeo = new THREE.BoxGeometry(4.2, 0.2, 4.6);
      const eave = new THREE.Mesh(eaveGeo, graniteMat);
      eave.position.y = 1.2;
      chariotGroup.add(eave);

      // Dravidian Vimana Superstructure (Stepped 3-Tier Pyramidal Tower)
      const vimanaTiers = [
        { width: 3.4, height: 0.6, y: 1.6 },
        { width: 2.6, height: 0.5, y: 2.15 },
        { width: 1.8, height: 0.5, y: 2.65 },
      ];
      vimanaTiers.forEach((tier) => {
        const tierGeo = new THREE.BoxGeometry(tier.width, tier.height, tier.width * 1.1);
        const tierMesh = new THREE.Mesh(tierGeo, graniteMat);
        tierMesh.position.y = tier.y;
        chariotGroup.add(tierMesh);
      });

      // Dome Roof (Shikhara) & Golden Finial (Kalasha)
      const domeGeo = new THREE.SphereGeometry(0.9, 16, 16);
      domeGeo.scale(1.2, 0.7, 1.2);
      const dome = new THREE.Mesh(domeGeo, graniteMat);
      dome.position.y = 3.1;
      chariotGroup.add(dome);

      const kalashaGeo = new THREE.ConeGeometry(0.3, 0.8, 12);
      const kalasha = new THREE.Mesh(kalashaGeo, goldMat);
      kalasha.position.y = 3.8;
      chariotGroup.add(kalasha);

      group.add(chariotGroup);
    }

    // ----------------------------------------------------
    // MODEL 3: ASTROLABE & ARMILLARY (Baghdad 830 AD / Alexandria)
    // ----------------------------------------------------
    else if (type === 'astrolabe') {
      const astrolabeGroup = new THREE.Group();

      // Outer Heavy Brass Mater Frame
      const materRimGeo = new THREE.TorusGeometry(3.6, 0.22, 16, 64);
      const materRim = new THREE.Mesh(materRimGeo, brassMat);
      astrolabeGroup.add(materRim);

      // Suspension Throne & Shackle at top
      const throneGeo = new THREE.ConeGeometry(0.8, 0.9, 4);
      const throne = new THREE.Mesh(throneGeo, goldMat);
      throne.position.y = 3.9;
      astrolabeGroup.add(throne);

      const shackleGeo = new THREE.TorusGeometry(0.45, 0.08, 12, 24);
      const shackle = new THREE.Mesh(shackleGeo, goldMat);
      shackle.position.y = 4.6;
      astrolabeGroup.add(shackle);

      // Fixed Geographic Tympan Plate (Horizon & altitude circles)
      const tympanGeo = new THREE.CircleGeometry(3.4, 48);
      const tympanMat = getMat({ color: 0xb8860b, metalness: 0.7, roughness: 0.35 });
      const tympan = new THREE.Mesh(tympanGeo, tympanMat);
      tympan.position.z = -0.05;
      astrolabeGroup.add(tympan);

      // Armillary Multi-Axis Concentric Rings (Interactive gyroscopic motion!)
      const armillaryGroup = new THREE.Group();

      // Meridian Ring (Vertical)
      const meridianGeo = new THREE.TorusGeometry(3.3, 0.1, 16, 64);
      const meridian = new THREE.Mesh(meridianGeo, goldMat);
      armillaryGroup.add(meridian);

      // Equator Ring (Horizontal)
      const equatorGeo = new THREE.TorusGeometry(3.3, 0.1, 16, 64);
      const equator = new THREE.Mesh(equatorGeo, brassMat);
      equator.rotation.x = Math.PI / 2;
      armillaryGroup.add(equator);

      // Ecliptic Zodiac Ring (Tilted at 23.5 degrees!)
      const eclipticGeo = new THREE.TorusGeometry(3.2, 0.18, 16, 64);
      const ecliptic = new THREE.Mesh(eclipticGeo, goldMat);
      ecliptic.rotation.x = Math.PI / 2;
      ecliptic.rotation.z = THREE.MathUtils.degToRad(23.5);
      armillaryGroup.add(ecliptic);

      // Solstice Colure Ring
      const colureGeo = new THREE.TorusGeometry(3.25, 0.08, 16, 64);
      const colure = new THREE.Mesh(colureGeo, brassMat);
      colure.rotation.y = Math.PI / 2;
      armillaryGroup.add(colure);

      // Central Terrestrial Globe
      const earthGeo = new THREE.SphereGeometry(0.9, 24, 24);
      const earthMat = getMat({ color: 0x1e3a8a, roughness: 0.5, metalness: 0.2 });
      const earth = new THREE.Mesh(earthGeo, earthMat);
      armillaryGroup.add(earth);

      astrolabeGroup.add(armillaryGroup);
      animObjectsRef.current['armillary'] = armillaryGroup;

      // Rotating Rete (Skeletal Star Pointers)
      const reteGroup = new THREE.Group();
      reteGroup.position.z = 0.08;

      // Off-center Ecliptic Circle on Rete
      const reteRingGeo = new THREE.TorusGeometry(1.6, 0.06, 12, 36);
      const reteRing = new THREE.Mesh(reteRingGeo, goldMat);
      reteRing.position.set(0.4, 0.4, 0);
      reteGroup.add(reteRing);

      // Star Pointer Daggers (Altair, Vega, Sirius)
      for (let s = 0; s < 12; s++) {
        const angle = (s / 12) * Math.PI * 2;
        const rad = 1.2 + (s % 3) * 0.7;
        const ptrGeo = new THREE.ConeGeometry(0.08, 0.5, 3);
        const ptr = new THREE.Mesh(ptrGeo, goldMat);
        ptr.position.set(Math.cos(angle) * rad, Math.sin(angle) * rad, 0);
        ptr.rotation.z = angle + Math.PI / 2;
        reteGroup.add(ptr);
      }
      astrolabeGroup.add(reteGroup);
      animObjectsRef.current['rete'] = reteGroup;

      // Rotating Alidade Sighting Rule (Rule on front)
      const alidadeGroup = new THREE.Group();
      alidadeGroup.position.z = 0.2;
      const alidadeBarGeo = new THREE.BoxGeometry(0.2, 6.8, 0.06);
      const alidadeBar = new THREE.Mesh(alidadeBarGeo, goldMat);
      alidadeGroup.add(alidadeBar);

      // Sight vanes at ends
      [-3.0, 3.0].forEach((vy) => {
        const vaneGeo = new THREE.BoxGeometry(0.24, 0.15, 0.3);
        const vane = new THREE.Mesh(vaneGeo, brassMat);
        vane.position.set(0, vy, 0.12);
        alidadeGroup.add(vane);
      });

      // Central Axis Pivot Pin (Horseshoe / Horse wedge)
      const pivotGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.6, 16);
      pivotGeo.rotateX(Math.PI / 2);
      const pivot = new THREE.Mesh(pivotGeo, goldMat);
      alidadeGroup.add(pivot);

      astrolabeGroup.add(alidadeGroup);
      animObjectsRef.current['alidade'] = alidadeGroup;

      group.add(astrolabeGroup);
    }

    // ----------------------------------------------------
    // MODEL 4: GREAT PYRAMID & OBELISK (Giza / Egypt 2560 BC)
    // ----------------------------------------------------
    else if (type === 'pyramid') {
      const pyramidGroup = new THREE.Group();

      // Desert Sand Base Plinth
      const desertGeo = new THREE.BoxGeometry(10, 0.4, 10);
      const sandMat = getMat({ color: 0xd4a359, roughness: 0.95, metalness: 0.0 });
      const desert = new THREE.Mesh(desertGeo, sandMat);
      desert.position.y = -1.6;
      pyramidGroup.add(desert);

      // Main Great Pyramid (Stepped 4-sided pyramid)
      const pyrHeight = 4.2;
      const pyrWidth = 6.0;
      const pyrGeo = new THREE.ConeGeometry(pyrWidth / Math.SQRT2, pyrHeight, 4);
      pyrGeo.rotateY(Math.PI / 4);
      const limestoneMat = getMat({ color: 0xe8dfcb, roughness: 0.85, metalness: 0.05 });
      const pyramid = new THREE.Mesh(pyrGeo, limestoneMat);
      pyramid.position.set(0.8, 0.5, -0.5);
      pyramidGroup.add(pyramid);

      // Gilded Electrum Pyramidion Capstone (Brilliant metallic gold!)
      const capHeight = 0.9;
      const capWidth = 1.3;
      const capGeo = new THREE.ConeGeometry(capWidth / Math.SQRT2, capHeight, 4);
      capGeo.rotateY(Math.PI / 4);
      const electrumMat = getMat({ color: 0xffd700, roughness: 0.15, metalness: 0.95, emissive: 0x443300 });
      const capstone = new THREE.Mesh(capGeo, electrumMat);
      capstone.position.set(0.8, 0.5 + pyrHeight / 2 - capHeight / 2 + 0.1, -0.5);
      pyramidGroup.add(capstone);
      animObjectsRef.current['capstone'] = capstone;

      // Temple Causeway Approach Path
      const causewayGeo = new THREE.BoxGeometry(1.2, 0.1, 4.5);
      const causeway = new THREE.Mesh(causewayGeo, travertineMat);
      causeway.position.set(0.8, -1.35, 2.5);
      pyramidGroup.add(causeway);

      // Monolithic Rose Granite Obelisk of the Pharaoh
      const obeliskGroup = new THREE.Group();
      obeliskGroup.position.set(-3.0, -1.4, 2.0);

      // Obelisk pedestal
      const pedGeo = new THREE.BoxGeometry(0.9, 0.6, 0.9);
      const obeliskPed = new THREE.Mesh(pedGeo, darkStoneMat);
      obeliskGroup.add(obeliskPed);

      // Tapering Obelisk Shaft
      const shaftGeo = new THREE.CylinderGeometry(0.22, 0.35, 3.8, 4);
      shaftGeo.rotateY(Math.PI / 4);
      const roseGraniteMat = getMat({ color: 0xb56357, roughness: 0.75, metalness: 0.1 });
      const shaft = new THREE.Mesh(shaftGeo, roseGraniteMat);
      shaft.position.y = 2.2;
      obeliskGroup.add(shaft);

      // Golden Obelisk Tip
      const obeliskTipGeo = new THREE.ConeGeometry(0.22 / Math.SQRT2, 0.5, 4);
      obeliskTipGeo.rotateY(Math.PI / 4);
      const obeliskTip = new THREE.Mesh(obeliskTipGeo, goldMat);
      obeliskTip.position.y = 4.35;
      obeliskGroup.add(obeliskTip);

      pyramidGroup.add(obeliskGroup);

      // Ambient Drifting Desert Dust Particles
      const dustCount = 80;
      const dustGeo = new THREE.BufferGeometry();
      const dustPos = new Float32Array(dustCount * 3);
      for (let i = 0; i < dustCount; i++) {
        dustPos[i * 3] = (Math.random() - 0.5) * 8;
        dustPos[i * 3 + 1] = Math.random() * 4 - 1;
        dustPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      }
      dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
      const dustMat = new THREE.PointsMaterial({
        color: 0xfef08a,
        size: 0.1,
        transparent: true,
        opacity: 0.6,
      });
      const dustPoints = new THREE.Points(dustGeo, dustMat);
      pyramidGroup.add(dustPoints);
      animObjectsRef.current['dust'] = dustPoints;

      group.add(pyramidGroup);
    }

    // ----------------------------------------------------
    // MODEL 5: FIVE-TIER PAGODA & TORII (Kyoto Edo 1688)
    // ----------------------------------------------------
    else if (type === 'pagoda') {
      const pagodaGroup = new THREE.Group();

      // Raised Stone Foundation
      const baseGeo = new THREE.BoxGeometry(3.6, 0.5, 3.6);
      const base = new THREE.Mesh(baseGeo, darkStoneMat);
      base.position.y = -1.6;
      pagodaGroup.add(base);

      // 5 Tiered Stack of Sweeping Flared Roofs (Traditional Japanese Tokyō brackets)
      const pagodaTiers = [
        { floorW: 2.2, roofW: 3.4, y: -1.1 },
        { floorW: 1.9, roofW: 3.0, y: -0.2 },
        { floorW: 1.6, roofW: 2.6, y: 0.7 },
        { floorW: 1.3, roofW: 2.2, y: 1.6 },
        { floorW: 1.0, roofW: 1.8, y: 2.5 },
      ];

      pagodaTiers.forEach((tier) => {
        // Floor body
        const floorGeo = new THREE.BoxGeometry(tier.floorW, 0.6, tier.floorW);
        const floorMesh = new THREE.Mesh(floorGeo, woodMat);
        floorMesh.position.y = tier.y;
        pagodaGroup.add(floorMesh);

        // Sweeping flared overhanging roof eave (Pyramidal cone with flared base)
        const roofGeo = new THREE.ConeGeometry(tier.roofW / Math.SQRT2, 0.45, 4);
        roofGeo.rotateY(Math.PI / 4);
        const roofMesh = new THREE.Mesh(roofGeo, copperRoofMat);
        roofMesh.position.y = tier.y + 0.4;
        pagodaGroup.add(roofMesh);

        // Small corner brass wind bells
        [-1, 1].forEach((cx) => {
          [-1, 1].forEach((cz) => {
            const bellGeo = new THREE.SphereGeometry(0.06, 6, 6);
            const bell = new THREE.Mesh(bellGeo, goldMat);
            bell.position.set(cx * (tier.roofW * 0.45), tier.y + 0.18, cz * (tier.roofW * 0.45));
            pagodaGroup.add(bell);
          });
        });
      });

      // Sacred Bronze Sōrin Spire (9 sacred rings, flaming jewel)
      const sorinGroup = new THREE.Group();
      sorinGroup.position.y = 3.0;

      // Central Spire Shaft
      const shaftGeo = new THREE.CylinderGeometry(0.04, 0.08, 1.6, 8);
      const shaft = new THREE.Mesh(shaftGeo, goldMat);
      shaft.position.y = 0.8;
      sorinGroup.add(shaft);

      // 9 Sacred Rings (Kuruma)
      for (let r = 0; r < 9; r++) {
        const ringGeo = new THREE.TorusGeometry(0.18 - r * 0.008, 0.025, 8, 16);
        const ringMesh = new THREE.Mesh(ringGeo, goldMat);
        ringMesh.rotation.x = Math.PI / 2;
        ringMesh.position.y = 0.3 + r * 0.11;
        sorinGroup.add(ringMesh);
      }

      // Flaming Jewel (Hōju)
      const jewelGeo = new THREE.SphereGeometry(0.12, 12, 12);
      jewelGeo.scale(1.0, 1.4, 1.0);
      const jewelMat = getMat({ color: 0xf59e0b, metalness: 0.9, roughness: 0.15, emissive: 0x552200 });
      const jewel = new THREE.Mesh(jewelGeo, jewelMat);
      jewel.position.y = 1.65;
      sorinGroup.add(jewel);

      pagodaGroup.add(sorinGroup);

      // Vermilion Shinto Torii Gate in foreground
      const toriiGroup = new THREE.Group();
      toriiGroup.position.set(-2.8, -1.6, 2.2);

      // 2 Vermilion Pillars
      [-0.9, 0.9].forEach((px) => {
        const pillarGeo = new THREE.CylinderGeometry(0.1, 0.13, 2.2, 12);
        const pillar = new THREE.Mesh(pillarGeo, vermilionMat);
        pillar.position.set(px, 1.1, 0);
        toriiGroup.add(pillar);
      });

      // Kasagi Top Beam (curved upward tips)
      const kasagiGeo = new THREE.BoxGeometry(2.6, 0.16, 0.22);
      const kasagi = new THREE.Mesh(kasagiGeo, vermilionMat);
      kasagi.position.y = 2.25;
      toriiGroup.add(kasagi);

      // Shimaki Second Beam
      const shimakiGeo = new THREE.BoxGeometry(2.2, 0.12, 0.18);
      const shimaki = new THREE.Mesh(shimakiGeo, vermilionMat);
      shimaki.position.y = 1.95;
      toriiGroup.add(shimaki);

      // Torii Black Base Stones (Kamebara)
      [-0.9, 0.9].forEach((px) => {
        const bGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.25, 12);
        const bMesh = new THREE.Mesh(bGeo, darkStoneMat);
        bMesh.position.set(px, 0.12, 0);
        toriiGroup.add(bMesh);
      });

      pagodaGroup.add(toriiGroup);

      // Floating Zen Embers / Petals
      const petalCount = 60;
      const petalGeo = new THREE.BufferGeometry();
      const petalPos = new Float32Array(petalCount * 3);
      for (let i = 0; i < petalCount; i++) {
        petalPos[i * 3] = (Math.random() - 0.5) * 6;
        petalPos[i * 3 + 1] = Math.random() * 4 - 1;
        petalPos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      }
      petalGeo.setAttribute('position', new THREE.BufferAttribute(petalPos, 3));
      const petalMat = new THREE.PointsMaterial({
        color: 0xf472b6,
        size: 0.12,
        transparent: true,
        opacity: 0.7,
      });
      const petalPoints = new THREE.Points(petalGeo, petalMat);
      pagodaGroup.add(petalPoints);
      animObjectsRef.current['petals'] = petalPoints;

      group.add(pagodaGroup);
    }

    // ----------------------------------------------------
    // MODEL 6: VICTORIAN CHRONOMETER (London 1890)
    // ----------------------------------------------------
    else if (type === 'chronometer') {
      const clockGroup = new THREE.Group();

      // Circular Brass Movement Chassis Plates
      const plateGeo = new THREE.CylinderGeometry(3.2, 3.2, 0.15, 48);
      const bottomPlate = new THREE.Mesh(plateGeo, brassMat);
      bottomPlate.position.y = -1.2;
      clockGroup.add(bottomPlate);

      const topPlate = new THREE.Mesh(plateGeo, brassMat);
      topPlate.position.y = 1.0;
      clockGroup.add(topPlate);

      // 4 Turned Brass Standoff Pillars
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const px = Math.cos(angle) * 2.6;
        const pz = Math.sin(angle) * 2.6;
        const pillarGeo = new THREE.CylinderGeometry(0.14, 0.14, 2.2, 12);
        const pillar = new THREE.Mesh(pillarGeo, goldMat);
        pillar.position.set(px, -0.1, pz);
        clockGroup.add(pillar);
      }

      // Interactive Interlocking Cogwheels with authentic tooth cutouts!
      const createGear = (radius: number, teeth: number, thickness: number, mat: THREE.Material) => {
        const gearGroup = new THREE.Group();
        // Central wheel rim
        const rimGeo = new THREE.CylinderGeometry(radius, radius, thickness, 32);
        const rim = new THREE.Mesh(rimGeo, mat);
        gearGroup.add(rim);

        // Gear Teeth
        for (let t = 0; t < teeth; t++) {
          const tAngle = (t / teeth) * Math.PI * 2;
          const toothGeo = new THREE.BoxGeometry(0.12, thickness, 0.22);
          const tooth = new THREE.Mesh(toothGeo, mat);
          tooth.position.set(Math.cos(tAngle) * (radius + 0.08), 0, Math.sin(tAngle) * (radius + 0.08));
          tooth.rotation.y = -tAngle;
          gearGroup.add(tooth);
        }

        // Cutout Spokes
        for (let s = 0; s < 5; s++) {
          const sAngle = (s / 5) * Math.PI * 2;
          const spokeGeo = new THREE.BoxGeometry(0.08, thickness * 1.1, radius * 0.9);
          const spoke = new THREE.Mesh(spokeGeo, mat);
          spoke.position.set(Math.cos(sAngle) * (radius * 0.45), 0, Math.sin(sAngle) * (radius * 0.45));
          spoke.rotation.y = -sAngle;
          gearGroup.add(spoke);
        }

        // Center Arbor Hub
        const arborGeo = new THREE.CylinderGeometry(0.2, 0.2, thickness * 1.6, 12);
        const arbor = new THREE.Mesh(arborGeo, goldMat);
        gearGroup.add(arbor);

        return gearGroup;
      };

      // Gear 1: Great Driving Wheel (Center)
      const gear1 = createGear(1.5, 36, 0.12, goldMat);
      gear1.position.set(0, -0.6, 0);
      clockGroup.add(gear1);
      animObjectsRef.current['gear1'] = gear1;

      // Gear 2: Second Pinion Gear (Right)
      const gear2 = createGear(1.1, 24, 0.1, brassMat);
      gear2.position.set(1.8, -0.4, 0.6);
      clockGroup.add(gear2);
      animObjectsRef.current['gear2'] = gear2;

      // Gear 3: Escapement Wheel (Left, with angled ratchet teeth)
      const escapementGear = createGear(0.9, 15, 0.08, goldMat);
      escapementGear.position.set(-1.6, -0.1, -0.5);
      clockGroup.add(escapementGear);
      animObjectsRef.current['escapement'] = escapementGear;

      // Balance Wheel with Helical Hairspring (Vibrating at 2.5Hz!)
      const balanceGroup = new THREE.Group();
      balanceGroup.position.set(-1.6, 0.5, -0.5);

      const balanceRimGeo = new THREE.TorusGeometry(0.8, 0.06, 8, 32);
      const balanceRim = new THREE.Mesh(balanceRimGeo, goldMat);
      balanceRim.rotation.x = Math.PI / 2;
      balanceGroup.add(balanceRim);

      // Ruby jewel screws on rim
      for (let j = 0; j < 8; j++) {
        const jAngle = (j / 8) * Math.PI * 2;
        const rubyGeo = new THREE.SphereGeometry(0.04, 8, 8);
        const rubyMat = getMat({ color: 0xef4444, metalness: 0.4, roughness: 0.1 });
        const ruby = new THREE.Mesh(rubyGeo, rubyMat);
        ruby.position.set(Math.cos(jAngle) * 0.8, 0, Math.sin(jAngle) * 0.8);
        balanceGroup.add(ruby);
      }

      clockGroup.add(balanceGroup);
      animObjectsRef.current['balance'] = balanceGroup;

      // Upper Enamel Roman Chapter Ring & Dial Face
      const dialGroup = new THREE.Group();
      dialGroup.position.y = 1.25;

      const dialGeo = new THREE.RingGeometry(1.6, 2.8, 48);
      dialGeo.rotateX(-Math.PI / 2);
      const dialMat = getMat({ color: 0xfafafa, roughness: 0.2, metalness: 0.05 });
      const dial = new THREE.Mesh(dialGeo, dialMat);
      dialGroup.add(dial);

      // Hour Marks (XII, III, VI, IX in Roman format)
      for (let h = 0; h < 12; h++) {
        const hAngle = (h / 12) * Math.PI * 2;
        const markerGeo = new THREE.BoxGeometry(0.05, 0.02, 0.35);
        const marker = new THREE.Mesh(markerGeo, darkStoneMat);
        marker.position.set(Math.cos(hAngle) * 2.2, 0.02, Math.sin(hAngle) * 2.2);
        marker.rotation.y = -hAngle;
        dialGroup.add(marker);
      }

      // Blued Steel Hands (Hour & Minute)
      const handsGroup = new THREE.Group();
      handsGroup.position.y = 0.05;

      const hourHandGeo = new THREE.BoxGeometry(0.08, 0.02, 1.1);
      const bluedSteelMat = getMat({ color: 0x2563eb, metalness: 0.85, roughness: 0.2 });
      const hourHand = new THREE.Mesh(hourHandGeo, bluedSteelMat);
      hourHand.position.z = 0.55;
      handsGroup.add(hourHand);

      const minuteHandGeo = new THREE.BoxGeometry(0.05, 0.02, 1.8);
      const minuteHand = new THREE.Mesh(minuteHandGeo, bluedSteelMat);
      minuteHand.position.z = 0.9;
      minuteHand.rotation.y = Math.PI / 3;
      handsGroup.add(minuteHand);

      dialGroup.add(handsGroup);
      animObjectsRef.current['hands'] = handsGroup;

      clockGroup.add(dialGroup);

      group.add(clockGroup);
    }

    return group;
  }, [relic.accentColor]);

  // 2. Initialize Three.js Scene, Camera, Lights, and Renderer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3, zoomDistanceRef.current);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // Cinematic Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Key Directional Sun Light
    const sunLight = new THREE.DirectionalLight(0xfffaed, 2.2);
    sunLight.position.set(8, 12, 8);
    sunLight.castShadow = true;
    scene.add(sunLight);

    // Cool Rim Light
    const rimLight = new THREE.DirectionalLight(0x60a5fa, 1.4);
    rimLight.position.set(-8, -4, -6);
    scene.add(rimLight);

    // Warm Fill Light
    const fillLight = new THREE.PointLight(0xf59e0b, 1.0, 20);
    fillLight.position.set(0, 4, 6);
    scene.add(fillLight);

    // Ambient Ground Shadow Disc
    const groundShadowGeo = new THREE.CircleGeometry(7.0, 32);
    const groundShadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.45,
    });
    const groundShadow = new THREE.Mesh(groundShadowGeo, groundShadowMat);
    groundShadow.rotation.x = -Math.PI / 2;
    groundShadow.position.y = -2.1;
    scene.add(groundShadow);

    // Build the initial 3D Model
    const model = buildModel(relic.modelType, renderMode);
    scene.add(model);
    modelGroupRef.current = model;

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth damping interpolation for manual drag rotation
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;
      zoomDistanceRef.current += (targetZoomDistanceRef.current - zoomDistanceRef.current) * 0.1;

      if (cameraRef.current) {
        cameraRef.current.position.z = zoomDistanceRef.current;
        cameraRef.current.lookAt(0, 0, 0);
      }

      // Auto-rotation when not actively dragging
      if (autoRotate && !isDraggingRef.current) {
        targetRotationRef.current.y += 0.005 * rotationSpeed;
      }

      if (modelGroupRef.current) {
        modelGroupRef.current.rotation.x = currentRotationRef.current.x;
        modelGroupRef.current.rotation.y = currentRotationRef.current.y;
      }

      // Specific Dynamic Component Animations
      const anims = animObjectsRef.current;

      // 1. Astrolabe & Armillary rings gyroscopic spin
      if (anims['armillary']) {
        const arm = anims['armillary'] as THREE.Group;
        arm.rotation.y += 0.015 * rotationSpeed;
        arm.rotation.x = Math.sin(elapsedTime * 0.4) * 0.3;
      }
      if (anims['rete']) {
        (anims['rete'] as THREE.Group).rotation.z += 0.008 * rotationSpeed;
      }
      if (anims['alidade']) {
        (anims['alidade'] as THREE.Group).rotation.z += 0.02 * rotationSpeed;
      }

      // 2. Stone Chariot Wheels spinning
      if (anims['wheels'] && Array.isArray(anims['wheels'])) {
        anims['wheels'].forEach((w) => {
          (w as THREE.Group).rotation.x += 0.02 * rotationSpeed;
        });
      }

      // 3. Chronometer Mechanical Clockwork Gear Ratios
      if (anims['gear1']) {
        (anims['gear1'] as THREE.Group).rotation.y += 0.01 * rotationSpeed;
      }
      if (anims['gear2']) {
        // Counter-rotating gear
        (anims['gear2'] as THREE.Group).rotation.y -= 0.015 * rotationSpeed;
      }
      if (anims['escapement']) {
        (anims['escapement'] as THREE.Group).rotation.y += 0.03 * rotationSpeed;
      }
      if (anims['balance']) {
        // Rhythmic 2.5Hz ticking harmonic balance wheel oscillation
        (anims['balance'] as THREE.Group).rotation.y = Math.sin(elapsedTime * 9) * 0.8;
      }
      if (anims['hands']) {
        (anims['hands'] as THREE.Group).rotation.y -= 0.005 * rotationSpeed;
      }

      // 4. Pyramids / Dust / Petals floating drift
      if (anims['dust']) {
        (anims['dust'] as THREE.Points).rotation.y += 0.003;
      }
      if (anims['petals']) {
        (anims['petals'] as THREE.Points).rotation.y += 0.005;
      }
      if (anims['capstone']) {
        const c = anims['capstone'] as THREE.Mesh;
        const scale = 1.0 + Math.sin(elapsedTime * 2) * 0.02;
        c.scale.set(scale, scale, scale);
      }

      renderer.render(scene, camera);

      // Project 3D Hotspot Coordinates to 2D Screen Space
      if (cameraRef.current && containerRef.current && relic.hotspots) {
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        const projected = relic.hotspots.map((hspot) => {
          const pos = new THREE.Vector3(...hspot.position);
          // Apply current model rotation
          if (modelGroupRef.current) {
            pos.applyEuler(modelGroupRef.current.rotation);
          }
          pos.project(cameraRef.current!);

          const screenX = (pos.x * 0.5 + 0.5) * w;
          const screenY = (-pos.y * 0.5 + 0.5) * h;
          // Only show when in front of camera
          const isVisible = pos.z < 1.0;

          return {
            id: hspot.id,
            x: screenX,
            y: screenY,
            visible: isVisible,
          };
        });
        setProjectedHotspots(projected);
      }
    };

    animate();

    // Resize observer
    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
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
  }, [relic.modelType, buildModel, autoRotate, rotationSpeed, renderMode]);

  // Handle Drag / Orbit Interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    targetRotationRef.current.y += deltaX * 0.008;
    targetRotationRef.current.x = Math.max(-1.2, Math.min(1.2, targetRotationRef.current.x + deltaY * 0.008));

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Touch handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
    const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

    targetRotationRef.current.y += deltaX * 0.008;
    targetRotationRef.current.x = Math.max(-1.2, Math.min(1.2, targetRotationRef.current.x + deltaY * 0.008));

    previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  // Wheel Zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    targetZoomDistanceRef.current = Math.max(7, Math.min(24, targetZoomDistanceRef.current + e.deltaY * 0.015));
  };

  // Reset Camera View
  const handleResetCamera = () => {
    targetRotationRef.current = { x: 0.2, y: 0.5 };
    targetZoomDistanceRef.current = 14;
  };

  // Orient camera toward selected hotspot without cluttering the view with text
  useEffect(() => {
    if (!selectedHotspotId || !relic.hotspots) return;
    const spot = relic.hotspots.find((h) => h.id === selectedHotspotId);
    if (spot) {
      const angle = Math.atan2(spot.position[0], spot.position[2]);
      targetRotationRef.current.y = -angle;
      targetRotationRef.current.x = Math.max(-0.4, Math.min(0.6, spot.position[1] * 0.08));
    }
  }, [selectedHotspotId, relic.hotspots]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      className={`relative select-none cursor-grab active:cursor-grabbing overflow-hidden ${className}`}
    >
      {/* 2D Interactive Hotspot Markers: ONLY rendered if showCanvasMarkers is active, with NO letters/text covering the sculpture */}
      {showCanvasMarkers &&
        projectedHotspots.map((spot, idx) => {
          const hotspotData = relic.hotspots.find((h) => h.id === spot.id);
          if (!hotspotData || !spot.visible) return null;
          const isSelected = selectedHotspotId === spot.id;

          return (
            <button
              key={spot.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectHotspot?.(hotspotData);
              }}
              style={{
                left: `${spot.x}px`,
                top: `${spot.y}px`,
                transform: 'translate(-50%, -50%)',
              }}
              className={`absolute z-20 group flex items-center justify-center transition-transform ${
                isSelected ? 'scale-125 z-30' : 'hover:scale-110'
              }`}
              title={`${idx + 1}. ${hotspotData.name} (view details in side panel)`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shadow-md transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-black ring-2 ring-amber-300 shadow-amber-400/50'
                    : 'bg-black/80 text-amber-300 border border-amber-400/50 hover:bg-amber-500 hover:text-black'
                }`}
              >
                {idx + 1}
              </span>
            </button>
          );
        })}

      {/* Viewport Control Bar Overlay */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 pointer-events-auto">
        <button
          type="button"
          onClick={handleResetCamera}
          className="px-2.5 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-zinc-300 hover:text-white border border-white/10 text-xs font-mono backdrop-blur-md transition-all active:scale-95"
          title="Reset Orbit Camera"
        >
          ↺ Reset View
        </button>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-[11px] font-mono text-zinc-400 backdrop-blur-md">
          <span>🖱 Drag to Orbit</span>
          <span>•</span>
          <span>Scroll to Zoom</span>
        </div>
      </div>
    </div>
  );
};
