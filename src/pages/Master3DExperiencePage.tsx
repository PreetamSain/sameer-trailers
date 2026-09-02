import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Truck,
  Layers,
  Scale,
  Flame,
  Phone,
  MessageCircle,
  FileText,
  ChevronRight,
  Eye,
  Maximize2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../data/trailers';

interface ActData {
  actNumber: string;
  badge: string;
  title: string;
  subtitle: string;
  statValue: string;
  statLabel: string;
  description: string;
  bullets: string[];
}

const ACTS: ActData[] = [
  {
    actNumber: '01',
    badge: 'ACT 01 — HERO ARCHITECTURE',
    title: 'Built for the Heaviest Haul',
    subtitle: 'High-Tensile DOMEX 700 Steel Commercial Trailer',
    statValue: '700 MPa',
    statLabel: 'Tensile Yield Strength',
    description: 'Engineered from ultra-high-yield European DOMEX 700 steel to reduce dead weight by 1.8 tons while maximizing legal revenue payload across national logistics corridors.',
    bullets: [
      'Robotic Submerged Arc Welded (SAW) main longitudinal I-beams',
      'Aerodynamic low-drag headboard & chassis profile',
      '100% ARAI & CMVR AIS-113 certified manufacturing'
    ]
  },
  {
    actNumber: '02',
    badge: 'ACT 02 — EXPLODED ENGINEERING',
    title: 'Dissecting Unyielding Strength',
    subtitle: 'Chassis, Tridem Axles & Multi-Leaf Suspension Anatomy',
    statValue: '100%',
    statLabel: 'Robotic SAW Precision',
    description: 'Inspect every millimeter of structural integrity. The frame separates to reveal continuous robotic double-sided welding, bronze-bushed tridem equalizer suspension, and reinforced axle mounts.',
    bullets: [
      'Chassis Frame: Zero longitudinal sagging under 55T+ load',
      'Tridem Axles: 3x14 Ton capacity with automatic slack adjusters',
      'Suspension: Heavy-duty multi-leaf spring equalizer pack'
    ]
  },
  {
    actNumber: '03',
    badge: 'ACT 03 — MODULAR CONFIGURATION',
    title: 'Single Platform. Endless Applications.',
    subtitle: 'Morphing Between Flatbed, Low-Bed, Tipper & Sidewall',
    statValue: '4-IN-1',
    statLabel: 'Modular Platform Flexibility',
    description: 'One master high-tensile chassis adapts dynamically to diverse commercial freight demands — from container transport and earthmoving machinery to aggregate tipping and bulk cargo.',
    bullets: [
      'Flatbed: 40ft ISO Twist-Lock container platform',
      'Low-Bed: Dropped well & heavy-duty gooseneck deck',
      'Tip Trailer: 48° rapid telescopic hydraulic gravity unload',
      'Side Wall: Multi-hinged locking gates for FMCG & agricultural bulk'
    ]
  },
  {
    actNumber: '04',
    badge: 'ACT 04 — LOAD & SUSPENSION PROOF',
    title: '55T+ Certified Dynamic Payload',
    subtitle: 'Real-World Multi-Leaf Spring Compression Under Load',
    statValue: '55T+',
    statLabel: 'Certified Bulk Payload',
    description: 'Watch the suspension react under maximum commercial freight. As 55+ tons of cargo stack onto the deck, the multi-leaf springs compress progressively while the main beam maintains zero deflection.',
    bullets: [
      'Dynamic suspension compression with zero chassis yield',
      'Optimal axle load distribution prevents uneven tire scrubbing',
      'WABCO dual-line air brake pneumatic fail-safe braking'
    ]
  },
  {
    actNumber: '05',
    badge: 'ACT 05 — READY FOR YOUR FLEET',
    title: 'Maximize Your Fleet ROI',
    subtitle: 'Direct Factory Quotation & Rapid Nationwide Delivery',
    statValue: '15+ YRS',
    statLabel: 'Proven Chassis Lifespan',
    description: 'Join hundreds of fleet operators and logistics leaders who trust Sameer Trailers for uncompromised durability, lower fuel consumption, and maximum payload profitability.',
    bullets: [
      'Customized engineering to your exact cargo specifications',
      'Nationwide warranty & OEM spare parts support',
      'Express factory delivery from Kotputli, Rajasthan'
    ]
  }
];

export const Master3DExperiencePage: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentActIndex, setCurrentActIndex] = useState<number>(0);
  const [selectedMorphState, setSelectedMorphState] = useState<'flatbed' | 'lowbed' | 'tipper' | 'sidewall'>('flatbed');
  const [isManualOrbit, setIsManualOrbit] = useState<boolean>(false);
  const [is3DReady, setIs3DReady] = useState<boolean>(false);

  // References for Three.js state updates
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    masterGroup: THREE.Group;
    chassisGroup: THREE.Group;
    deckGroup: THREE.Group;
    flatbedMesh: THREE.Mesh;
    lowbedMesh: THREE.Group;
    tipperGroup: THREE.Group;
    pistonMesh: THREE.Mesh;
    sidewallGroup: THREE.Group;
    axleGroup: THREE.Group;
    suspensionGroup: THREE.Group;
    wheels: THREE.Mesh[];
    cargoGroup: THREE.Group;
    hotspotPoints: THREE.Sprite[];
    targetCameraPos: THREE.Vector3;
    targetLookAt: THREE.Vector3;
    currentCameraPos: THREE.Vector3;
    currentLookAt: THREE.Vector3;
    animationFrameId: number;
  } | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0E0F12);
    scene.fog = new THREE.FogExp2(0x0E0F12, 0.035);

    // 2. CAMERA SETUP
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    const initialCamPos = new THREE.Vector3(12, 3, 0);
    const initialLookAt = new THREE.Vector3(0, 1.2, 0);
    camera.position.copy(initialCamPos);
    camera.lookAt(initialLookAt);

    // 3. RENDERER SETUP
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 4. LIGHTING SETUP
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 3.2);
    keyLight.position.set(10, 15, 12);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 40;
    keyLight.shadow.camera.left = -12;
    keyLight.shadow.camera.right = 12;
    keyLight.shadow.camera.top = 12;
    keyLight.shadow.camera.bottom = -12;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const rimLightOrange = new THREE.DirectionalLight(0xF68722, 2.5);
    rimLightOrange.position.set(-12, 8, -10);
    scene.add(rimLightOrange);

    const fillLightBlue = new THREE.DirectionalLight(0x4A6B82, 1.4);
    fillLightBlue.position.set(0, -5, 10);
    scene.add(fillLightBlue);

    // 5. GROUND GRID PLANE
    const gridHelper = new THREE.GridHelper(40, 40, 0xF68722, 0x242830);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    const groundGeo = new THREE.PlaneGeometry(60, 60);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x0A0B0D,
      roughness: 0.9,
      metalness: 0.1
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // 6. HIGH-PERFORMANCE PROCEDURAL MASTER TRAILER MESH BUILDER
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Materials
    const domexSteelMat = new THREE.MeshStandardMaterial({
      color: 0x222428,
      metalness: 0.85,
      roughness: 0.35
    });

    const orangeAccentMat = new THREE.MeshStandardMaterial({
      color: 0xF68722,
      metalness: 0.4,
      roughness: 0.3
    });

    const chromePistonMat = new THREE.MeshStandardMaterial({
      color: 0xF0F4F8,
      metalness: 0.98,
      roughness: 0.05
    });

    const darkDeckMat = new THREE.MeshStandardMaterial({
      color: 0x1E2024,
      metalness: 0.75,
      roughness: 0.5
    });

    const rubberTireMat = new THREE.MeshStandardMaterial({
      color: 0x121315,
      metalness: 0.05,
      roughness: 0.9
    });

    const alloyRimMat = new THREE.MeshStandardMaterial({
      color: 0xCCCCCC,
      metalness: 0.9,
      roughness: 0.2
    });

    // 6A. MAIN CHASSIS (Dual I-Beams & Crossmembers)
    const chassisGroup = new THREE.Group();
    masterGroup.add(chassisGroup);

    // Dual Longitudinal Heavy I-Beams (Length: 10m)
    [-0.55, 0.55].forEach((zPos) => {
      const beamGeo = new THREE.BoxGeometry(9.6, 0.32, 0.08);
      const beamMesh = new THREE.Mesh(beamGeo, domexSteelMat);
      beamMesh.position.set(-0.5, 0.95, zPos);
      beamMesh.castShadow = true;
      beamMesh.receiveShadow = true;
      chassisGroup.add(beamMesh);

      // Top flange
      const topFlange = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.03, 0.22), domexSteelMat);
      topFlange.position.set(-0.5, 1.11, zPos);
      topFlange.castShadow = true;
      chassisGroup.add(topFlange);

      // Bottom flange
      const botFlange = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.03, 0.22), domexSteelMat);
      botFlange.position.set(-0.5, 0.79, zPos);
      botFlange.castShadow = true;
      chassisGroup.add(botFlange);
    });

    // Crossmembers
    for (let x = -4.5; x <= 3.8; x += 0.8) {
      const crossMember = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.26, 1.1), domexSteelMat);
      crossMember.position.set(x, 0.95, 0);
      crossMember.castShadow = true;
      chassisGroup.add(crossMember);
    }

    // Kingpin & Coupler Box (Front)
    const kingpinBox = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.35, 1.2), orangeAccentMat);
    kingpinBox.position.set(-4.6, 0.95, 0);
    kingpinBox.castShadow = true;
    chassisGroup.add(kingpinBox);

    // Landing Gear Legs (Front)
    [-0.5, 0.5].forEach((zPos) => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.7, 0.12), orangeAccentMat);
      leg.position.set(-3.2, 0.45, zPos);
      leg.castShadow = true;
      chassisGroup.add(leg);

      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.06, 0.24), domexSteelMat);
      foot.position.set(-3.2, 0.1, zPos);
      chassisGroup.add(foot);
    });

    // Rear Under-Ride Bumper Guard
    const bumper = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.18, 2.2), orangeAccentMat);
    bumper.position.set(4.35, 0.55, 0);
    bumper.castShadow = true;
    chassisGroup.add(bumper);

    // 6B. TRIDEM AXLES & SUSPENSION
    const axleGroup = new THREE.Group();
    const suspensionGroup = new THREE.Group();
    masterGroup.add(axleGroup);
    masterGroup.add(suspensionGroup);

    const wheels: THREE.Mesh[] = [];
    const axlePositions = [1.6, 2.7, 3.8];

    axlePositions.forEach((xPos) => {
      // Axle Beam
      const axleBeam = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 2.2, 16), domexSteelMat);
      axleBeam.rotation.x = Math.PI / 2;
      axleBeam.position.set(xPos, 0.45, 0);
      axleBeam.castShadow = true;
      axleGroup.add(axleBeam);

      // Multi-leaf Springs
      [-0.65, 0.65].forEach((zPos) => {
        const leafSpring = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.12, 0.08), orangeAccentMat);
        leafSpring.position.set(xPos, 0.62, zPos);
        leafSpring.castShadow = true;
        suspensionGroup.add(leafSpring);
      });

      // Dual Wheel Assemblies (Left & Right)
      [-1.1, 1.1].forEach((zPos) => {
        const wheelAssembly = new THREE.Group();
        wheelAssembly.position.set(xPos, 0.45, zPos);

        // Outer Tire
        const tireGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.24, 24);
        const tire = new THREE.Mesh(tireGeo, rubberTireMat);
        tire.rotation.x = Math.PI / 2;
        tire.castShadow = true;
        wheelAssembly.add(tire);
        wheels.push(tire);

        // Aluminum Rim
        const rimGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.25, 18);
        const rim = new THREE.Mesh(rimGeo, alloyRimMat);
        rim.rotation.x = Math.PI / 2;
        wheelAssembly.add(rim);

        // Center Hub Cap (Orange)
        const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.27, 12), orangeAccentMat);
        hub.rotation.x = Math.PI / 2;
        wheelAssembly.add(hub);

        axleGroup.add(wheelAssembly);
      });
    });

    // 6C. MODULAR DECKS & CONFIGURATIONS
    const deckGroup = new THREE.Group();
    masterGroup.add(deckGroup);

    // 1. Flatbed Deck Mesh
    const flatbedMesh = new THREE.Mesh(new THREE.BoxGeometry(9.8, 0.1, 2.45), darkDeckMat);
    flatbedMesh.position.set(-0.4, 1.18, 0);
    flatbedMesh.castShadow = true;
    flatbedMesh.receiveShadow = true;
    deckGroup.add(flatbedMesh);

    // Headboard at Front
    const headboard = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.5, 2.45), orangeAccentMat);
    headboard.position.set(-5.25, 1.9, 0);
    headboard.castShadow = true;
    deckGroup.add(headboard);

    // 2. Low-Bed Deck Attachment Group
    const lowbedMesh = new THREE.Group();
    const lowbedWell = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.22, 2.7), darkDeckMat);
    lowbedWell.position.set(-0.8, 0.65, 0);
    lowbedWell.castShadow = true;
    lowbedMesh.add(lowbedWell);

    const gooseneckRamp = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.2, 2.5), orangeAccentMat);
    gooseneckRamp.position.set(-4.4, 0.95, 0);
    gooseneckRamp.rotation.z = -0.3;
    lowbedMesh.add(gooseneckRamp);
    lowbedMesh.visible = false;
    deckGroup.add(lowbedMesh);

    // 3. Tip Trailer Body & Hydraulic Piston Group
    const tipperGroup = new THREE.Group();
    tipperGroup.position.set(3.8, 1.25, 0); // Pivot hinge at rear
    deckGroup.add(tipperGroup);

    const tipperBucket = new THREE.Mesh(new THREE.BoxGeometry(8.8, 1.6, 2.4), darkDeckMat);
    tipperBucket.position.set(-4.4, 0.8, 0);
    tipperBucket.castShadow = true;
    tipperGroup.add(tipperBucket);

    const tipperTrim = new THREE.Mesh(new THREE.BoxGeometry(8.9, 0.08, 2.45), orangeAccentMat);
    tipperTrim.position.set(-4.4, 1.6, 0);
    tipperGroup.add(tipperTrim);

    // Telescopic Hydraulic Chrome Cylinder
    const pistonGeo = new THREE.CylinderGeometry(0.09, 0.09, 1.8, 16);
    const pistonMesh = new THREE.Mesh(pistonGeo, chromePistonMat);
    pistonMesh.position.set(-4.6, 1.0, 0);
    pistonMesh.rotation.z = -0.15;
    pistonMesh.castShadow = true;
    pistonMesh.visible = false;
    chassisGroup.add(pistonMesh);
    tipperGroup.visible = false;

    // 4. Side Wall Panels Group
    const sidewallGroup = new THREE.Group();
    [-1.23, 1.23].forEach((zPos) => {
      for (let x = -4.4; x <= 3.8; x += 1.8) {
        const sideGate = new THREE.Mesh(new THREE.BoxGeometry(1.65, 1.1, 0.05), orangeAccentMat);
        sideGate.position.set(x, 1.75, zPos);
        sideGate.castShadow = true;
        sidewallGroup.add(sideGate);
      }
    });
    sidewallGroup.visible = false;
    deckGroup.add(sidewallGroup);

    // 6D. CARGO FREIGHT BLOCKS (For Act 4 Payload Proof)
    const cargoGroup = new THREE.Group();
    masterGroup.add(cargoGroup);

    const containerMat = new THREE.MeshStandardMaterial({
      color: 0x1A4068,
      metalness: 0.6,
      roughness: 0.4
    });

    const cargoBlock1 = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.2, 2.2), containerMat);
    cargoBlock1.position.set(-2.4, 2.35, 0);
    cargoBlock1.castShadow = true;
    cargoGroup.add(cargoBlock1);

    const cargoBlock2 = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.2, 2.2), containerMat);
    cargoBlock2.position.set(2.0, 2.35, 0);
    cargoBlock2.castShadow = true;
    cargoGroup.add(cargoBlock2);
    cargoGroup.visible = false;

    // 7. SAVE STATE REFS FOR SMOOTH ANIMATION
    sceneRef.current = {
      scene,
      camera,
      renderer,
      masterGroup,
      chassisGroup,
      deckGroup,
      flatbedMesh,
      lowbedMesh,
      tipperGroup,
      pistonMesh,
      sidewallGroup,
      axleGroup,
      suspensionGroup,
      wheels,
      cargoGroup,
      hotspotPoints: [],
      targetCameraPos: initialCamPos.clone(),
      targetLookAt: initialLookAt.clone(),
      currentCameraPos: initialCamPos.clone(),
      currentLookAt: initialLookAt.clone(),
      animationFrameId: 0
    };

    setIs3DReady(true);

    // 8. ANIMATION RENDER LOOP (Buttery 60fps with Camera Matrix Lerp)
    let clock = new THREE.Clock();

    const animate = () => {
      const refs = sceneRef.current;
      if (!refs) return;

      const delta = clock.getDelta();

      // Smooth Camera LERP
      refs.currentCameraPos.lerp(refs.targetCameraPos, 0.08);
      refs.currentLookAt.lerp(refs.targetLookAt, 0.08);

      refs.camera.position.copy(refs.currentCameraPos);
      refs.camera.lookAt(refs.currentLookAt);

      refs.renderer.render(refs.scene, refs.camera);
      refs.animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container || !sceneRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      sceneRef.current.camera.aspect = w / h;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationFrameId);
        sceneRef.current.renderer.dispose();
      }
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // MASTER SCROLL TIMELINE INTERPOLATION CONTROLLER
  const update3DSceneForScroll = (p: number) => {
    const refs = sceneRef.current;
    if (!refs) return;

    // Determine Active Act (0 to 4)
    if (p < 0.2) setCurrentActIndex(0);
    else if (p < 0.42) setCurrentActIndex(1);
    else if (p < 0.68) setCurrentActIndex(2);
    else if (p < 0.88) setCurrentActIndex(3);
    else setCurrentActIndex(4);

    // ==========================================
    // ACT 01: HERO REVEAL (0.0 to 0.20)
    // ==========================================
    if (p <= 0.2) {
      const actP = p / 0.2; // 0 to 1
      // Camera orbits from side profile (12, 2.5, 0) to 3/4 front angle (9, 3.2, 8)
      refs.targetCameraPos.set(
        THREE.MathUtils.lerp(12, 9, actP),
        THREE.MathUtils.lerp(2.5, 3.2, actP),
        THREE.MathUtils.lerp(0, 8, actP)
      );
      refs.targetLookAt.set(0, 1.2, 0);

      // Reset exploded offsets
      refs.deckGroup.position.y = 0;
      refs.axleGroup.position.y = 0;
      refs.suspensionGroup.position.y = 0;

      // Visibility: Default Flatbed
      refs.flatbedMesh.visible = true;
      refs.lowbedMesh.visible = false;
      refs.tipperGroup.visible = false;
      refs.pistonMesh.visible = false;
      refs.sidewallGroup.visible = false;
      refs.cargoGroup.visible = false;
    }

    // ==========================================
    // ACT 02: EXPLODED ENGINEERING VIEW (0.20 to 0.42)
    // ==========================================
    else if (p <= 0.42) {
      const actP = (p - 0.2) / 0.22; // 0 to 1
      // Camera focuses closer onto the chassis
      refs.targetCameraPos.set(
        THREE.MathUtils.lerp(9, 6.5, actP),
        THREE.MathUtils.lerp(3.2, 2.2, actP),
        THREE.MathUtils.lerp(8, 5.5, actP)
      );
      refs.targetLookAt.set(0.5, 1.1, 0);

      // Smooth Exploded Separation
      const explodeFactor = Math.sin(actP * Math.PI); // peak explosion in middle
      refs.deckGroup.position.y = explodeFactor * 1.8;
      refs.axleGroup.position.y = -explodeFactor * 0.8;
      refs.suspensionGroup.position.y = -explodeFactor * 0.4;

      refs.flatbedMesh.visible = true;
      refs.lowbedMesh.visible = false;
      refs.tipperGroup.visible = false;
      refs.pistonMesh.visible = false;
      refs.sidewallGroup.visible = false;
      refs.cargoGroup.visible = false;
    }

    // ==========================================
    // ACT 03: PRODUCT CONFIGURATION MORPH (0.42 to 0.68)
    // ==========================================
    else if (p <= 0.68) {
      const actP = (p - 0.42) / 0.26; // 0 to 1
      refs.targetCameraPos.set(8.5, 3.5, 7.5);
      refs.targetLookAt.set(0, 1.2, 0);

      refs.deckGroup.position.y = 0;
      refs.axleGroup.position.y = 0;
      refs.suspensionGroup.position.y = 0;
      refs.cargoGroup.visible = false;

      // Morphing Stages based on sub-progress
      if (actP < 0.25) {
        // Flatbed
        refs.flatbedMesh.visible = true;
        refs.lowbedMesh.visible = false;
        refs.tipperGroup.visible = false;
        refs.pistonMesh.visible = false;
        refs.sidewallGroup.visible = false;
        setSelectedMorphState('flatbed');
      } else if (actP < 0.5) {
        // Low Bed
        refs.flatbedMesh.visible = false;
        refs.lowbedMesh.visible = true;
        refs.tipperGroup.visible = false;
        refs.pistonMesh.visible = false;
        refs.sidewallGroup.visible = false;
        setSelectedMorphState('lowbed');
      } else if (actP < 0.78) {
        // Tip Trailer with 48° Elevation
        refs.flatbedMesh.visible = false;
        refs.lowbedMesh.visible = false;
        refs.tipperGroup.visible = true;
        refs.pistonMesh.visible = true;
        refs.sidewallGroup.visible = false;

        const tipProgress = (actP - 0.5) / 0.28;
        refs.tipperGroup.rotation.z = THREE.MathUtils.lerp(0, 0.78, tipProgress); // 0 to 48 deg (0.78 rad)
        refs.pistonMesh.scale.y = THREE.MathUtils.lerp(1.0, 2.2, tipProgress);
        setSelectedMorphState('tipper');
      } else {
        // Side Wall
        refs.flatbedMesh.visible = true;
        refs.lowbedMesh.visible = false;
        refs.tipperGroup.visible = false;
        refs.pistonMesh.visible = false;
        refs.sidewallGroup.visible = true;
        setSelectedMorphState('sidewall');
      }
    }

    // ==========================================
    // ACT 04: LOAD & SUSPENSION DYNAMICS (0.68 to 0.88)
    // ==========================================
    else if (p <= 0.88) {
      const actP = (p - 0.68) / 0.20; // 0 to 1
      refs.targetCameraPos.set(7.2, 1.8, 6.2);
      refs.targetLookAt.set(1.5, 0.8, 0);

      // Reassemble to standard Flatbed
      refs.flatbedMesh.visible = true;
      refs.lowbedMesh.visible = false;
      refs.tipperGroup.visible = false;
      refs.pistonMesh.visible = false;
      refs.sidewallGroup.visible = false;

      // Cargo Container Drops onto deck
      refs.cargoGroup.visible = true;
      refs.cargoGroup.position.y = THREE.MathUtils.lerp(3.5, 0, actP);

      // Suspension micro-compression (wheels stay grounded at y=0)
      const springCompression = -actP * 0.08;
      refs.chassisGroup.position.y = springCompression;
      refs.deckGroup.position.y = springCompression;
      refs.suspensionGroup.position.y = springCompression;
    }

    // ==========================================
    // ACT 05: FINAL CINEMATIC CTA PULLBACK (0.88 to 1.0)
    // ==========================================
    else {
      const actP = (p - 0.88) / 0.12;
      // Wide cinematic pullback
      refs.targetCameraPos.set(
        THREE.MathUtils.lerp(7.2, 14.5, actP),
        THREE.MathUtils.lerp(1.8, 5.5, actP),
        THREE.MathUtils.lerp(6.2, 13.5, actP)
      );
      refs.targetLookAt.set(0, 1.0, 0);

      refs.flatbedMesh.visible = true;
      refs.cargoGroup.visible = true;
      refs.cargoGroup.position.y = 0;
    }
  };

  // Listen to Window Scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const currentScroll = window.scrollY;
      const progress = Math.min(Math.max(currentScroll / scrollHeight, 0), 1);
      setScrollProgress(progress);
      update3DSceneForScroll(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const jumpToAct = (index: number) => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = (index / 4) * scrollHeight;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const currentAct = ACTS[currentActIndex];

  return (
    <div className="relative bg-[#0E0F12] text-white min-h-[500vh]">
      
      {/* 1. FIXED 3D VIEWPORT CANVAS */}
      <div className="fixed inset-0 w-full h-screen z-0">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
        
        {/* Subtle Vignette Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0E0F12] via-transparent to-[#0E0F12]/60" />
      </div>

      {/* 2. TOP FLOATING ACT NAVIGATOR & HUD */}
      <header className="fixed top-20 inset-x-0 z-30 pointer-events-none px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          
          {/* Logo / Title Tag */}
          <div className="bg-[#181A1F]/90 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-2xl">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F68722] animate-pulse" />
            <span className="text-xs font-black text-[#F68722] uppercase tracking-widest font-mono-specs">
              3D MASTER TRAILER ENGINE
            </span>
            <span className="hidden sm:inline text-xs text-white/40 font-mono-specs">|</span>
            <span className="hidden sm:inline text-xs text-white/70 font-mono-specs">
              SCROLL DRIVEN {Math.round(scrollProgress * 100)}%
            </span>
          </div>

          {/* Act Jump Pills */}
          <div className="flex items-center gap-1.5 bg-[#181A1F]/90 backdrop-blur-md border border-white/10 p-1 rounded-2xl shadow-2xl">
            {ACTS.map((act, idx) => {
              const isActive = currentActIndex === idx;
              return (
                <button
                  key={act.actNumber}
                  onClick={() => jumpToAct(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono-specs uppercase transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#F68722] text-[#0E0F12] shadow-lg shadow-[#F68722]/30 scale-105 font-black'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{act.actNumber}</span>
                  <span className="hidden md:inline">{act.badge.split('—')[1]?.trim()}</span>
                </button>
              );
            })}
          </div>

        </div>
      </header>

      {/* 3. SCROLL-SYNCED EDITORIAL OVERLAYS (Pinned Content) */}
      <div className="fixed bottom-8 left-4 right-4 sm:left-8 sm:right-auto sm:max-w-xl z-20 pointer-events-none">
        <div className="pointer-events-auto bg-[#181A1F]/90 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAct.actNumber}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="space-y-4"
            >
              {/* Act Header */}
              <div className="space-y-1">
                <span className="text-[11px] font-black text-[#F68722] uppercase tracking-wider font-mono-specs">
                  {currentAct.badge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-heading leading-tight">
                  {currentAct.title}
                </h2>
                <p className="text-xs font-mono-specs text-white/60">
                  {currentAct.subtitle}
                </p>
              </div>

              {/* Stat Pill */}
              <div className="flex items-baseline gap-3 py-2 border-y border-white/10">
                <span className="text-3xl sm:text-4xl font-black text-[#F68722] font-mono-specs">
                  {currentAct.statValue}
                </span>
                <span className="text-xs font-bold text-white/70 uppercase font-mono-specs">
                  {currentAct.statLabel}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                {currentAct.description}
              </p>

              {/* Bullets */}
              <div className="space-y-2 pt-1">
                {currentAct.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-medium text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-[#F68722] shrink-0" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Act 5 Specific Action Buttons */}
              {currentActIndex === 4 && (
                <div className="pt-3 flex flex-wrap gap-3">
                  <Link
                    to="/contact"
                    className="flex-1 bg-[#F68722] hover:bg-[#ff9534] text-[#0E0F12] px-4 py-2.5 rounded-xl text-xs font-black font-mono-specs uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#F68722]/20 transition-all cursor-pointer"
                  >
                    <span>REQUEST DIRECT QUOTE</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-bold font-mono-specs uppercase flex items-center justify-center gap-2 border border-white/20 transition-all cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-[#F68722]" />
                    <span>CALL DIRECT</span>
                  </a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Bottom Progress Bar */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono-specs text-white/50">
            <span>ACT {currentActIndex + 1} OF 5</span>
            <div className="flex-1 mx-4 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#F68722] transition-all duration-150"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
            <span className="text-[#F68722] animate-bounce">↓ SCROLL TO EXPLORE</span>
          </div>

        </div>
      </div>

      {/* 4. FLOATING RIGHT TELEMETRY HUD (Visible on Desktop) */}
      <aside className="fixed bottom-8 right-8 z-20 hidden lg:flex flex-col gap-3 pointer-events-none">
        <div className="bg-[#181A1F]/90 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-2xl space-y-2 pointer-events-auto w-64">
          <span className="text-[10px] font-bold text-[#F68722] uppercase tracking-wider font-mono-specs block">
            LIVE 3D TELEMETRY
          </span>
          <div className="space-y-1.5 text-[11px] font-mono-specs text-white/70">
            <div className="flex justify-between">
              <span>ACTIVE CHASSIS:</span>
              <span className="text-white font-bold">DOMEX 700</span>
            </div>
            <div className="flex justify-between">
              <span>AXLE RATING:</span>
              <span className="text-white font-bold">3 x 14 TON</span>
            </div>
            <div className="flex justify-between">
              <span>SUSPENSION:</span>
              <span className="text-white font-bold">MULTI-LEAF</span>
            </div>
            <div className="flex justify-between">
              <span>RENDER FPS:</span>
              <span className="text-emerald-400 font-bold">60.0 FPS</span>
            </div>
          </div>
        </div>

        <Link
          to="/"
          className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold font-mono-specs uppercase border border-white/10 text-center pointer-events-auto transition-all"
        >
          ← BACK TO MAIN SITE
        </Link>
      </aside>

    </div>
  );
};
