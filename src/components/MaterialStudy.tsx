/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  RotateCw, 
  Camera, 
  Sliders, 
  Check, 
  Copy, 
  Sparkles, 
  ArrowDown, 
  Volume2, 
  VolumeX, 
  X,
  Info,
  ChevronRight,
  SunMedium,
  Palette,
  Box,
  Lightbulb,
  Maximize2,
  Compass,
  Activity,
  Layers,
  HelpCircle,
  Play,
  Pause
} from 'lucide-react';
import { sound } from '../utils/audio';

export interface MaterialStudyProps {
  onExit?: () => void;
}

export type GeometryType = 'torus-knot' | 'mobius' | 'icosahedron' | 'super-torus';
export type LightingRig = 'studio' | 'cyberpunk' | 'solar' | 'cleanroom';

interface ChapterData {
  index: number;
  eyebrow: string;
  alloy: string;
  title: string;
  subtitle: string;
  lede: string;
  colorHex: string;
  baseColor: number;
  metalness: number;
  roughness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  specs: {
    label: string;
    value: string;
    sub?: string;
  }[];
  details: string;
  formula: string;
}

const CHAPTERS: ChapterData[] = [
  {
    index: 0,
    eyebrow: 'Chapter One / Silver',
    alloy: 'Chrome Alloy 99.9% Ag',
    title: 'Precision, Forged\nin Chrome',
    subtitle: 'HYPER-SPECULAR MIRROR REACTION',
    lede: 'A single form, endlessly reflective — engineered to catch every angle of ambient light with mathematical precision.',
    colorHex: '#e8eaed',
    baseColor: 0xe8eaed,
    metalness: 1.0,
    roughness: 0.08,
    clearcoat: 0.8,
    clearcoatRoughness: 0.15,
    specs: [
      { label: 'Reflectivity', value: '98.4%', sub: 'Specular Peak' },
      { label: 'Surface Finish', value: 'Electro-Mirror', sub: 'Ra < 0.02 µm' },
      { label: 'Refractive Index', value: '1.450', sub: 'Optical IOR' },
      { label: 'Hardness Rating', value: '650 HV', sub: 'Vickers Scale' },
    ],
    details: 'Pure electrolytic chrome deposition on aerospace-grade structural titanium substrate. Engineered for ultra-high specular reflectance under calibrated studio directional illumination.',
    formula: 'Ag + Cr · (NO₃)₂ → Mirror Substrate ΔH = -124 kJ/mol'
  },
  {
    index: 1,
    eyebrow: 'Chapter Two / Sapphire',
    alloy: 'Anodized Sapphire Crystal',
    title: 'Depth, Given\na Surface',
    subtitle: 'SUB-SURFACE PHOTON ABSORPTION',
    lede: 'Cooled to a deep, saturated crystalline blue — the same geometry now resonates as weight, silence, and oceanic serenity.',
    colorHex: '#1c4fd6',
    baseColor: 0x1c4fd6,
    metalness: 0.92,
    roughness: 0.16,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1,
    specs: [
      { label: 'Reflectivity', value: '84.2%', sub: 'Saturated Depth' },
      { label: 'Spectral Peak', value: '450 nm', sub: 'Indigo Resonance' },
      { label: 'Refractive Index', value: '1.768', sub: 'Al₂O₃ Matrix' },
      { label: 'Thermal Limit', value: '1,200 °C', sub: 'Pyrolytic Grade' },
    ],
    details: 'Sapphire-infused micro-crystalline substrate with deep light absorption across red wavelengths, yielding an intense oceanic luminescence across undulating curvatures.',
    formula: 'Al₂O₃:Ti⁴⁺,Fe²⁺ → Sapphire Lattice Bandgap = 8.8 eV'
  },
  {
    index: 2,
    eyebrow: 'Chapter Three / Emerald',
    alloy: 'Bio-Mineral Emerald Patina',
    title: 'Grown, Not\nManufactured',
    subtitle: 'GRADIENT ATMOSPHERIC OXIDATION',
    lede: "A living green settles into the knot's curves, as if the material had weathered centuries of high-altitude alpine atmosphere.",
    colorHex: '#0f7a4c',
    baseColor: 0x0f7a4c,
    metalness: 0.86,
    roughness: 0.22,
    clearcoat: 0.75,
    clearcoatRoughness: 0.22,
    specs: [
      { label: 'Reflectivity', value: '76.8%', sub: 'Velvet Sheen' },
      { label: 'Oxidation Level', value: 'Grade IV', sub: 'Synthetic Patina' },
      { label: 'Refractive Index', value: '1.575', sub: 'Beryl Matrix' },
      { label: 'Micro-Texture', value: '0.08 µm', sub: 'Isotropic Grain' },
    ],
    details: 'Controlled synthetic oxidation mimicking decades of montane weather exposure. Features gradient verdant undertones with velvet specular reflectance along recessed valleys.',
    formula: 'Be₃Al₂Si₆O₁₈:Cr³⁺ → Beryl Silicate Hexagonal Ring'
  },
  {
    index: 3,
    eyebrow: 'Chapter Four / Copper',
    alloy: 'Flame-Annealed Native Copper',
    title: 'Warmth at\nthe Core',
    subtitle: 'RADIANT THERMAL CAPTURE',
    lede: 'The final finish — a warm, flame-annealed copper that holds and nurtures the light instead of abruptly casting it away.',
    colorHex: '#b5622a',
    baseColor: 0xb5622a,
    metalness: 0.96,
    roughness: 0.24,
    clearcoat: 0.6,
    clearcoatRoughness: 0.3,
    specs: [
      { label: 'Reflectivity', value: '89.6%', sub: 'Warm Specular' },
      { label: 'Thermal Flow', value: '401 W/(m·K)', sub: 'Conductance' },
      { label: 'Refractive Index', value: '1.340', sub: 'Native Metal' },
      { label: 'Anneal State', value: '820 °C', sub: 'Micro-Flame Taper' },
    ],
    details: 'High-purity oxygen-free copper subjected to micro-flame thermal annealing. Captures ambient long-wave radiation, imparting an intense radiant glow to surrounding geometry.',
    formula: 'Cu (99.99%) + Micro-Anneal (820°C) → Cubic Close-Packed'
  }
];

const PRESETS = [
  { name: 'Silver Chrome', color: '#e8eaed', metal: 1.0, rough: 0.08, clear: 0.8, chapter: 0 },
  { name: 'Deep Sapphire', color: '#1c4fd6', metal: 0.92, rough: 0.16, clear: 0.9, chapter: 1 },
  { name: 'Verdant Emerald', color: '#0f7a4c', metal: 0.86, rough: 0.22, clear: 0.75, chapter: 2 },
  { name: 'Warm Copper', color: '#b5622a', metal: 0.96, rough: 0.24, clear: 0.6, chapter: 3 },
  { name: '24K Aurum Gold', color: '#f2c037', metal: 1.0, rough: 0.12, clear: 0.85, chapter: null },
  { name: 'Black Obsidian', color: '#141518', metal: 0.98, rough: 0.05, clear: 1.0, chapter: null },
  { name: 'Titanium Slate', color: '#828994', metal: 0.88, rough: 0.32, clear: 0.45, chapter: null },
  { name: 'Crimson Ruby', color: '#c41d3d', metal: 0.92, rough: 0.14, clear: 0.92, chapter: null },
];

export const MaterialStudy: React.FC<MaterialStudyProps> = ({ onExit }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollTrackRef = useRef<HTMLDivElement | null>(null);

  // Studio Interactive State
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(false);
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [activeGeometry, setActiveGeometry] = useState<GeometryType>('torus-knot');
  const [activeLighting, setActiveLighting] = useState<LightingRig>('studio');
  const [showSpecsModal, setShowSpecsModal] = useState<boolean>(false);
  const [showStudioPanel, setShowStudioPanel] = useState<boolean>(false);
  const [showHotkeysModal, setShowHotkeysModal] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [copiedToast, setCopiedToast] = useState<string | null>(null);
  const [liveFps, setLiveFps] = useState<number>(60);
  const [telemetry, setTelemetry] = useState({ rotX: 0, rotY: 0, progress: 0 });

  // Custom Studio Sliders
  const [customRoughness, setCustomRoughness] = useState<number>(0.12);
  const [customMetalness, setCustomMetalness] = useState<number>(0.96);
  const [customClearcoat, setCustomClearcoat] = useState<number>(0.8);
  const [customExposure, setCustomExposure] = useState<number>(1.2);
  const [overrideColor, setOverrideColor] = useState<string | null>(null);

  // References for Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const knotMeshRef = useRef<THREE.Mesh | null>(null);
  const knotMatRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const spotARef = useRef<THREE.SpotLight | null>(null);
  const spotBRef = useRef<THREE.SpotLight | null>(null);
  const rimLightRef = useRef<THREE.PointLight | null>(null);
  const mouseLightRef = useRef<THREE.PointLight | null>(null);
  const pedestalGroupRef = useRef<THREE.Group | null>(null);
  const particleSysRef = useRef<THREE.Points | null>(null);

  // Mouse & Scroll interpolation state
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const mouseNdcRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragRotationRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const userRotationRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Card Mouse Hover Position Refs for liquid-glass radial spotlight
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  // Sound toggle helper
  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  // Scroll to Chapter
  const scrollToChapter = useCallback((index: number) => {
    sound.playClick();
    const track = scrollTrackRef.current;
    if (!track) return;
    const targetScroll = (index / (CHAPTERS.length - 1)) * (track.scrollHeight - window.innerHeight);
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  }, []);

  // Geometry Creator Helper
  const createSculpturalGeometry = (type: GeometryType): THREE.BufferGeometry => {
    switch (type) {
      case 'mobius':
        return new THREE.TorusGeometry(1.6, 0.38, 36, 120);
      case 'icosahedron':
        return new THREE.IcosahedronGeometry(1.75, 1);
      case 'super-torus':
        return new THREE.TorusKnotGeometry(1.3, 0.44, 280, 36, 3, 5);
      case 'torus-knot':
      default:
        return new THREE.TorusKnotGeometry(1.35, 0.42, 260, 32, 2, 3);
    }
  };

  // 3D Scene Initialization
  useEffect(() => {
    const wrap = containerRef.current;
    if (!wrap) return;

    // Clean up existing canvas if any
    while (wrap.firstChild) {
      wrap.removeChild(wrap.firstChild);
    }

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020203);
    scene.fog = new THREE.FogExp2(0x020203, 0.038);
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0.6, 9.2);
    cameraRef.current = camera;

    // 3. WebGL Renderer with ACES Tone Mapping
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance', alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = customExposure;
    wrap.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Fake Studio Reflections Environment Texture (Multi-Stop Gradient with Studio Streaks)
    function buildStudioReflectionMap() {
      const size = 512;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      const grad = ctx.createLinearGradient(0, 0, 0, size);
      grad.addColorStop(0, '#2d3340');
      grad.addColorStop(0.25, '#0a0c10');
      grad.addColorStop(0.48, '#ffffff');
      grad.addColorStop(0.52, '#d4d9e2');
      grad.addColorStop(0.68, '#08090b');
      grad.addColorStop(1, '#1b1d22');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      // Multiple sharp studio overhead softbox streaks
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fillRect(0, size * 0.40, size, size * 0.04);
      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.fillRect(0, size * 0.58, size, size * 0.015);
      ctx.fillStyle = 'rgba(180,210,255,0.3)';
      ctx.fillRect(0, size * 0.22, size, size * 0.02);

      const tex = new THREE.CanvasTexture(canvas);
      tex.mapping = THREE.EquirectangularReflectionMapping;
      return tex;
    }
    const envTex = buildStudioReflectionMap();
    scene.environment = envTex;

    // 5. Torus Knot (Sculptural Subject)
    const geometry = createSculpturalGeometry(activeGeometry);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xe8eaed,
      metalness: customMetalness,
      roughness: customRoughness,
      envMap: envTex,
      envMapIntensity: 1.6,
      clearcoat: customClearcoat,
      clearcoatRoughness: 0.15,
      wireframe: isWireframe
    });
    knotMatRef.current = material;

    const knot = new THREE.Mesh(geometry, material);
    knot.castShadow = true;
    knot.receiveShadow = false;
    knot.position.y = 0.4;
    scene.add(knot);
    knotMeshRef.current = knot;

    // 6. Ground Shadow Catcher + Ambient Stage Sheen
    const groundGeo = new THREE.CircleGeometry(10, 64);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.65 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.55;
    ground.receiveShadow = true;
    scene.add(ground);

    const floorSheenGeo = new THREE.CircleGeometry(10, 64);
    const floorSheenMat = new THREE.MeshStandardMaterial({
      color: 0x090a0d,
      metalness: 0.4,
      roughness: 0.4,
      transparent: true,
      opacity: 0.7
    });
    const floorSheen = new THREE.Mesh(floorSheenGeo, floorSheenMat);
    floorSheen.rotation.x = -Math.PI / 2;
    floorSheen.position.y = -1.551;
    scene.add(floorSheen);

    // 7. Glowing Orbital Museum Pedestal Rings
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.y = -1.54;

    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 });
    const ring1 = new THREE.Mesh(new THREE.RingGeometry(2.4, 2.43, 64), ringMat1);
    ring1.rotation.x = -Math.PI / 2;
    pedestalGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12 });
    const ring2 = new THREE.Mesh(new THREE.RingGeometry(4.2, 4.24, 64), ringMat2);
    ring2.rotation.x = -Math.PI / 2;
    pedestalGroup.add(ring2);

    const ringMat3 = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.06 });
    const ring3 = new THREE.Mesh(new THREE.RingGeometry(6.0, 6.03, 64), ringMat3);
    ring3.rotation.x = -Math.PI / 2;
    pedestalGroup.add(ring3);

    scene.add(pedestalGroup);
    pedestalGroupRef.current = pedestalGroup;

    // 8. Ethereal Drifting Metallic Dust Particles (120 particles)
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 14;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 8 + 0.5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.035,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particleSysRef.current = particles;

    // 9. Dynamic Studio Lights Setup
    const ambient = new THREE.AmbientLight(0x1a1c22, 0.75);
    scene.add(ambient);

    const spotA = new THREE.SpotLight(0xff9955, 60, 32, Math.PI / 5.5, 0.5, 1.2);
    spotA.position.set(-5.5, 6.5, 4.5);
    spotA.castShadow = true;
    spotA.shadow.mapSize.set(1024, 1024);
    spotA.shadow.bias = -0.0002;
    scene.add(spotA);
    scene.add(spotA.target);
    spotA.target.position.set(0, 0.2, 0);
    spotARef.current = spotA;

    const spotB = new THREE.SpotLight(0x44a2ff, 55, 30, Math.PI / 5.5, 0.5, 1.2);
    spotB.position.set(5.5, 4.5, -3.5);
    spotB.castShadow = true;
    spotB.shadow.mapSize.set(1024, 1024);
    spotB.shadow.bias = -0.0002;
    scene.add(spotB);
    scene.add(spotB.target);
    spotB.target.position.set(0, 0.2, 0);
    spotBRef.current = spotB;

    const rimLight = new THREE.PointLight(0xffffff, 10, 22);
    rimLight.position.set(0, 2.5, -6.5);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    // Interactive Mouse Specular Light
    const mouseLight = new THREE.PointLight(0xffffff, 2.2, 14);
    mouseLight.position.set(0, 0, 4.5);
    scene.add(mouseLight);
    mouseLightRef.current = mouseLight;

    // 10. Palette Colors for Chapter Morphing
    const palette = CHAPTERS.map(c => new THREE.Color(c.baseColor));
    const currentColor = palette[0].clone();

    // 11. Resize handler
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // 12. Scroll calculation
    const numSections = CHAPTERS.length;
    const calculateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const track = scrollTrackRef.current;
      const trackHeight = track ? track.scrollHeight - window.innerHeight : window.innerHeight * 3;
      const t = trackHeight > 0 ? scrollTop / trackHeight : 0;
      return THREE.MathUtils.clamp(t, 0, 1) * (numSections - 1);
    };

    const handleScroll = () => {
      targetProgressRef.current = calculateScrollProgress();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    targetProgressRef.current = calculateScrollProgress();
    currentProgressRef.current = targetProgressRef.current;

    // 13. Interactive Raycaster for Hover Telemetry
    const raycaster = new THREE.Raycaster();

    // 14. Main Animation Loop with High-Fidelity Physics & Orbit Easing
    const clock = new THREE.Clock();
    const LERP_SPEED = 3.4;
    let animationFrameId: number;
    let lastActiveChapter = 0;
    let frameCount = 0;
    let lastFpsTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);

      // Live FPS calculation
      frameCount++;
      const now = performance.now();
      if (now - lastFpsTime >= 500) {
        setLiveFps(Math.round((frameCount * 1000) / (now - lastFpsTime)));
        frameCount = 0;
        lastFpsTime = now;
      }

      // Damp scroll progress
      currentProgressRef.current = THREE.MathUtils.damp(
        currentProgressRef.current,
        targetProgressRef.current,
        LERP_SPEED,
        dt
      );

      const t = currentProgressRef.current / (numSections - 1); // 0..1 overall
      const activeIdx = Math.round(currentProgressRef.current);
      if (activeIdx !== lastActiveChapter) {
        lastActiveChapter = activeIdx;
        setActiveChapterIndex(activeIdx);
      }

      // Camera Orbit (360 deg across full scroll range) + Subtle Mouse Parallax
      const angle = t * Math.PI * 2 + (isAutoSpinning ? clock.getElapsedTime() * 0.35 : 0);
      const radius = 9.2;
      const targetCamX = Math.sin(angle) * radius + mouseNdcRef.current.x * 0.9;
      const targetCamZ = Math.cos(angle) * radius;
      const targetCamY = 0.6 + Math.sin(angle * 0.5) * 1.4 + mouseNdcRef.current.y * 0.6;

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.08);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.08);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.08);
      camera.lookAt(0, 0.25, 0);

      // Knot continuous life breathing + user drag rotation
      userRotationRef.current.x = THREE.MathUtils.lerp(userRotationRef.current.x, dragRotationRef.current.x, 0.08);
      userRotationRef.current.y = THREE.MathUtils.lerp(userRotationRef.current.y, dragRotationRef.current.y, 0.08);

      knot.rotation.y += dt * 0.18 + userRotationRef.current.y * 0.02;
      knot.rotation.x = Math.sin(t * Math.PI) * 0.18 + userRotationRef.current.x * 0.02;

      // Update Live Telemetry
      setTelemetry({
        rotX: Math.round(((knot.rotation.x * 180) / Math.PI) % 360),
        rotY: Math.round(((knot.rotation.y * 180) / Math.PI) % 360),
        progress: Math.round(t * 100)
      });

      // Drifting particles rotation
      particles.rotation.y += dt * 0.03;
      particles.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.05;

      // Pedestal Ring Subtle Pulse & Tint
      pedestalGroup.rotation.y -= dt * 0.05;

      // Dynamic Color Interpolation across chapters (unless user selected custom override color)
      if (overrideColor) {
        material.color.set(overrideColor);
        ringMat1.color.set(overrideColor);
      } else {
        const segFloat = currentProgressRef.current;
        const segIndex = Math.min(Math.floor(segFloat), numSections - 2 >= 0 ? numSections - 2 : 0);
        const segT = THREE.MathUtils.clamp(segFloat - segIndex, 0, 1);
        const colorA = palette[Math.min(segIndex, palette.length - 1)];
        const colorB = palette[Math.min(segIndex + 1, palette.length - 1)];
        currentColor.copy(colorA).lerp(colorB, segT);
        material.color.copy(currentColor);
        ringMat1.color.copy(currentColor);
      }

      // Spotlight tracking orbit for consistent rim lighting
      spotA.position.x = -5.5 * Math.cos(angle * 0.5);
      spotA.position.z = 4.5 * Math.sin(angle * 0.5) + 2;
      spotB.position.x = 5.5 * Math.cos(angle * 0.5 + 1.5);
      spotB.position.z = -3.5 * Math.sin(angle * 0.5 + 1.5);

      // Interactive mouse point light
      mouseLight.position.x = mouseNdcRef.current.x * 5.5;
      mouseLight.position.y = mouseNdcRef.current.y * 3.5 + 0.4;
      mouseLight.position.z = 4.5;

      // Raycaster check for hover on knot
      raycaster.setFromCamera(mouseNdcRef.current, camera);
      const intersects = raycaster.intersectObject(knot);
      if (intersects.length > 0) {
        material.emissive.setHex(0x1a2638);
        material.emissiveIntensity = 0.35;
      } else {
        material.emissive.setHex(0x000000);
        material.emissiveIntensity = 0;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', handleScroll);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      envTex.dispose();
    };
  }, [isAutoSpinning, overrideColor, customExposure, activeGeometry]);

  // Sync Material Properties when sliders/toggles change
  useEffect(() => {
    if (!knotMatRef.current) return;
    knotMatRef.current.roughness = customRoughness;
    knotMatRef.current.metalness = customMetalness;
    knotMatRef.current.clearcoat = customClearcoat;
    knotMatRef.current.wireframe = isWireframe;
    knotMatRef.current.needsUpdate = true;
  }, [customRoughness, customMetalness, customClearcoat, isWireframe]);

  // Sync Lighting Rig Colors
  useEffect(() => {
    if (!spotARef.current || !spotBRef.current || !rimLightRef.current) return;

    switch (activeLighting) {
      case 'cyberpunk':
        spotARef.current.color.setHex(0xff0066);
        spotBRef.current.color.setHex(0x00e5ff);
        rimLightRef.current.color.setHex(0x9900ff);
        break;
      case 'solar':
        spotARef.current.color.setHex(0xff7700);
        spotBRef.current.color.setHex(0xffaa22);
        rimLightRef.current.color.setHex(0xffdd66);
        break;
      case 'cleanroom':
        spotARef.current.color.setHex(0xffffff);
        spotBRef.current.color.setHex(0xffffff);
        rimLightRef.current.color.setHex(0xffffff);
        break;
      case 'studio':
      default:
        spotARef.current.color.setHex(0xff9955);
        spotBRef.current.color.setHex(0x44a2ff);
        rimLightRef.current.color.setHex(0xffffff);
        break;
    }
  }, [activeLighting]);

  // Interactive Mouse Move for 3D Parallax & Cursor Spotlight
  const handlePointerMove = (e: React.PointerEvent) => {
    const ndcX = (e.clientX / window.innerWidth) * 2 - 1;
    const ndcY = -(e.clientY / window.innerHeight) * 2 + 1;
    mouseNdcRef.current = { x: ndcX, y: ndcY };

    if (isDraggingRef.current) {
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;
      dragRotationRef.current.y += deltaX * 0.005;
      dragRotationRef.current.x += deltaY * 0.005;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('.interactive-hud')) return;
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Keyboard Navigation & Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1') scrollToChapter(0);
      else if (e.key === '2') scrollToChapter(1);
      else if (e.key === '3') scrollToChapter(2);
      else if (e.key === '4') scrollToChapter(3);
      else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        sound.playClick();
        setIsAutoSpinning(prev => !prev);
      } else if (e.key === 'w' || e.key === 'W') {
        sound.playClick();
        setIsWireframe(prev => !prev);
      } else if (e.key === 'g' || e.key === 'G') {
        sound.playClick();
        const geos: GeometryType[] = ['torus-knot', 'mobius', 'icosahedron', 'super-torus'];
        const nextIdx = (geos.indexOf(activeGeometry) + 1) % geos.length;
        setActiveGeometry(geos[nextIdx]);
      } else if (e.key === 'l' || e.key === 'L') {
        sound.playClick();
        const rigs: LightingRig[] = ['studio', 'cyberpunk', 'solar', 'cleanroom'];
        const nextIdx = (rigs.indexOf(activeLighting) + 1) % rigs.length;
        setActiveLighting(rigs[nextIdx]);
      } else if (e.key === '?' || e.key === '/') {
        setShowHotkeysModal(prev => !prev);
      } else if (e.key === 'Escape') {
        setShowSpecsModal(false);
        setShowStudioPanel(false);
        setShowHotkeysModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollToChapter, activeGeometry, activeLighting]);

  // High-Res Snapshot Exporter
  const handleCaptureSnapshot = () => {
    sound.playClick();
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    const dataUrl = rendererRef.current.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `precision-forged-chapter-${activeChapterIndex + 1}-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();

    setCopiedToast('High-Res Studio Snapshot Saved (.png)');
    setTimeout(() => setCopiedToast(null), 2500);
  };

  // Copy PBR Material Preset Code
  const handleCopyPBRConfig = () => {
    sound.playClick();
    const currentChap = CHAPTERS[activeChapterIndex];
    const pbrData = {
      chapter: currentChap.eyebrow,
      alloyName: currentChap.alloy,
      colorHex: overrideColor || currentChap.colorHex,
      metalness: customMetalness,
      roughness: customRoughness,
      clearcoat: customClearcoat,
      clearcoatRoughness: 0.15,
      opticalIOR: currentChap.specs[2]?.value || '1.450',
      pbrPipeline: 'Three.js MeshPhysicalMaterial ACESFilmic Standard'
    };
    navigator.clipboard.writeText(JSON.stringify(pbrData, null, 2));
    setCopiedToast('PBR Shader JSON Copied to Clipboard');
    setTimeout(() => setCopiedToast(null), 2500);
  };

  // Quick Preset Swatch Click
  const handleSelectPreset = (preset: typeof PRESETS[0]) => {
    sound.playClick();
    setOverrideColor(preset.color);
    setCustomMetalness(preset.metal);
    setCustomRoughness(preset.rough);
    setCustomClearcoat(preset.clear);
    if (preset.chapter !== null) {
      scrollToChapter(preset.chapter);
    }
  };

  const currentChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  return (
    <div 
      className="relative min-h-[400vh] bg-[#020203] text-[#f5f6f7] font-['Space_Grotesk'] selection:bg-white selection:text-black select-none overflow-x-hidden"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      id="material-study-root"
    >
      {/* 0. Top Hairline Scroll Progress Bar with Dynamic Glow */}
      <div 
        className="fixed top-0 left-0 h-[2.5px] z-50 transition-all duration-150 ease-out shadow-[0_0_12px]"
        style={{
          width: `${((activeChapterIndex + (targetProgressRef.current % 1)) / (CHAPTERS.length - 1)) * 100}%`,
          backgroundColor: currentChapter.colorHex,
          boxShadow: `0 0 16px ${currentChapter.colorHex}`
        }}
      />

      {/* 1. Fixed 3D WebGL Canvas Layer */}
      <div 
        id="canvas-wrap" 
        ref={containerRef} 
        className="fixed inset-0 w-full h-full z-1 pointer-events-none cursor-grab active:cursor-grabbing"
      />

      {/* 2. Top Header HUD Bar */}
      <header className="fixed top-0 left-0 right-0 z-30 px-6 py-5 flex items-center justify-between pointer-events-auto backdrop-blur-md bg-black/30 border-b border-white/[0.04]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-2.5 h-2.5 rotate-45 animate-pulse transition-colors duration-500 shadow-sm"
              style={{ backgroundColor: currentChapter.colorHex }}
            />
            <span className="font-['Syne'] font-bold text-xs tracking-[0.28em] uppercase text-white">
              PRECISION, FORGED
            </span>
            <span className="hidden sm:inline-block font-mono text-[10px] tracking-widest text-white/40 uppercase">
              // MATERIAL STUDY
            </span>
          </div>

          <span className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-white/70">
            <span 
              className="w-1.5 h-1.5 rounded-full animate-ping"
              style={{ backgroundColor: currentChapter.colorHex }}
            />
            <span>PBR STAGE: {activeGeometry.toUpperCase()}</span>
          </span>
        </div>

        {/* Action Controls HUD */}
        <div className="flex items-center gap-2 interactive-hud">
          {/* Preset Swatches Quick Bar */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl">
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(p)}
                onMouseEnter={() => sound.playFrameTick()}
                title={`${p.name} (${p.color})`}
                className="group relative w-5 h-5 rounded-full border border-white/20 hover:scale-125 transition-all duration-300 flex items-center justify-center"
                style={{ backgroundColor: p.color }}
              >
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-black/95 text-[9px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-2xl z-50 text-white">
                  {p.name}
                </div>
              </button>
            ))}
          </div>

          {/* Geometry Selector Button */}
          <button
            onClick={() => {
              sound.playClick();
              const geos: GeometryType[] = ['torus-knot', 'mobius', 'icosahedron', 'super-torus'];
              const nextIdx = (geos.indexOf(activeGeometry) + 1) % geos.length;
              setActiveGeometry(geos[nextIdx]);
            }}
            title="Switch 3D Geometry (G)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] text-white/80 border border-white/[0.12] hover:bg-white/10 hover:border-white/30 text-xs font-mono tracking-wider transition-all"
          >
            <Box className="w-3.5 h-3.5" />
            <span className="hidden xl:inline uppercase">{activeGeometry}</span>
          </button>

          {/* Lighting Rig Selector Button */}
          <button
            onClick={() => {
              sound.playClick();
              const rigs: LightingRig[] = ['studio', 'cyberpunk', 'solar', 'cleanroom'];
              const nextIdx = (rigs.indexOf(activeLighting) + 1) % rigs.length;
              setActiveLighting(rigs[nextIdx]);
            }}
            title="Cycle Lighting Setup (L)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] text-white/80 border border-white/[0.12] hover:bg-white/10 hover:border-white/30 text-xs font-mono tracking-wider transition-all"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span className="hidden xl:inline uppercase">{activeLighting}</span>
          </button>

          {/* Studio Tweaker Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setShowStudioPanel(prev => !prev);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all border ${
              showStudioPanel
                ? 'bg-white text-black font-semibold border-white shadow-xl scale-105'
                : 'bg-white/[0.04] text-white/80 border-white/[0.12] hover:bg-white/10 hover:border-white/30'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PBR LAB</span>
          </button>

          {/* 360 Auto-Orbit Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setIsAutoSpinning(prev => !prev);
            }}
            title="Toggle 360° Auto-Orbit Spin (Space)"
            className={`p-2 rounded-full border transition-all ${
              isAutoSpinning
                ? 'bg-white text-black border-white shadow-lg'
                : 'bg-white/[0.04] text-white/80 border-white/[0.12] hover:bg-white/10'
            }`}
          >
            {isAutoSpinning ? <Pause className="w-3.5 h-3.5" /> : <RotateCw className="w-3.5 h-3.5" />}
          </button>

          {/* Snapshot Exporter */}
          <button
            onClick={handleCaptureSnapshot}
            title="Export High-Res 3D Frame"
            className="p-2 rounded-full bg-white/[0.04] text-white/80 border border-white/[0.12] hover:bg-white/10 hover:border-white/30 transition-all"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>

          {/* Hotkeys Modal Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setShowHotkeysModal(true);
            }}
            title="Keyboard Shortcuts (?)"
            className="p-2 rounded-full bg-white/[0.04] text-white/80 border border-white/[0.12] hover:bg-white/10 hover:border-white/30 transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'Unmute Audio Detents' : 'Mute Audio Detents'}
            className="p-2 rounded-full bg-white/[0.04] text-white/80 border border-white/[0.12] hover:bg-white/10 hover:border-white/30 transition-all"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Exit / Return to Portfolio if requested */}
          {onExit && (
            <button
              onClick={() => {
                sound.playClick();
                onExit();
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white hover:text-black border border-white/20 text-xs font-mono tracking-wider transition-all"
            >
              <X className="w-3.5 h-3.5" />
              <span>RETURN</span>
            </button>
          )}
        </div>
      </header>

      {/* 3. Toast Notification Banner */}
      {copiedToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs font-semibold shadow-2xl flex items-center gap-2.5 animate-bounce border border-black/10">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{copiedToast}</span>
        </div>
      )}

      {/* 4. Scroll Track Sections (Chapters 1 to 4) */}
      <div className="scroll-track relative z-2" ref={scrollTrackRef}>
        {CHAPTERS.map((chap, idx) => {
          const isInView = activeChapterIndex === idx;

          return (
            <section
              key={chap.index}
              className={`section min-h-screen flex items-center pointer-events-none transition-all duration-700 ${
                isInView ? 'in-view opacity-100' : 'opacity-30'
              }`}
              data-index={idx}
            >
              <div 
                onMouseMove={handleCardMouseMove}
                className="copy max-w-[700px] px-6 sm:px-12 md:px-18 lg:px-24 pointer-events-auto group/card relative rounded-3xl p-6 sm:p-10 transition-all duration-500 backdrop-blur-md bg-black/40 hover:bg-black/60 border border-white/[0.08] hover:border-white/[0.2] shadow-2xl"
                style={{
                  transform: isInView ? 'translateY(0)' : 'translateY(28px)',
                  opacity: isInView ? 1 : 0.2,
                  transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Dynamic Specular Radial Spotlight */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover/card:opacity-100 pointer-events-none transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(500px circle at var(--mouse-x, 150px) var(--mouse-y, 150px), ${chap.colorHex}22, transparent 65%)`
                  }}
                />

                {/* Chapter Eyebrow Tag */}
                <div className="eyebrow text-xs tracking-[0.28em] uppercase text-white/60 mb-4 font-mono font-medium flex items-center gap-3">
                  <span 
                    className="w-2.5 h-2.5 rounded-full transition-transform group-hover/card:scale-150 duration-300 shadow-[0_0_8px]" 
                    style={{ backgroundColor: chap.colorHex, boxShadow: `0 0 10px ${chap.colorHex}` }}
                  />
                  <span>{chap.eyebrow}</span>
                  <span className="text-white/20">//</span>
                  <span className="text-white/40 text-[11px] font-mono">{chap.alloy}</span>
                </div>

                {/* Main Chapter Title */}
                <h1 className="font-['Syne'] text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.04] tracking-tight mb-3 text-white whitespace-pre-line group-hover/card:text-white transition-colors">
                  {chap.title}
                </h1>

                {/* Chapter Subtitle Badge */}
                <div className="inline-block px-2.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-[10px] font-mono tracking-widest text-white/50 mb-4 uppercase">
                  {chap.subtitle}
                </div>

                {/* Lede Paragraph */}
                <p className="lede text-base sm:text-lg leading-relaxed text-white/70 max-w-[540px] font-light mb-8">
                  {chap.lede}
                </p>

                {/* Chemical Synthesis Formula */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] mb-8 font-mono text-[11px] text-white/40 flex items-center gap-2">
                  <span className="text-white/20">SYNTHESIS:</span>
                  <code className="text-white/70">{chap.formula}</code>
                </div>

                {/* Chapter Interactive Action Cluster */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Inspect Specs Button */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      setShowSpecsModal(true);
                    }}
                    className="px-5 py-2.5 rounded-full bg-white text-black font-mono font-semibold text-xs tracking-wider transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-white/20 hover:scale-105"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>INSPECT PBR SPECS</span>
                  </button>

                  {/* Customize Alloy Swatch Button */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      setOverrideColor(chap.colorHex);
                      setCustomMetalness(chap.metalness);
                      setCustomRoughness(chap.roughness);
                      setCustomClearcoat(chap.clearcoat);
                      setShowStudioPanel(true);
                    }}
                    className="px-4 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/15 border border-white/15 text-xs font-mono tracking-wider text-white transition-all flex items-center gap-2"
                  >
                    <Palette className="w-3.5 h-3.5" />
                    <span>TWEAK ALLOY</span>
                  </button>

                  {/* Next Chapter Button (if not last) */}
                  {idx < CHAPTERS.length - 1 && (
                    <button
                      onClick={() => scrollToChapter(idx + 1)}
                      className="px-4 py-2.5 rounded-full bg-transparent hover:bg-white/[0.06] text-white/60 hover:text-white text-xs font-mono tracking-wider transition-all flex items-center gap-1.5"
                    >
                      <span>NEXT CHAPTER</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Micro PBR Spec Badges on Hover */}
                <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {chap.specs.map((s, sIdx) => (
                    <div key={sIdx} className="flex flex-col">
                      <span className="text-[10px] font-mono uppercase text-white/40 tracking-wider">
                        {s.label}
                      </span>
                      <span className="text-sm font-mono font-medium text-white tracking-wide mt-0.5">
                        {s.value}
                      </span>
                      {s.sub && (
                        <span className="text-[9px] font-mono text-white/30 mt-0.5">
                          {s.sub}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* 5. Bottom Floating Telemetry HUD */}
      <div className="fixed bottom-6 left-6 z-20 flex items-center gap-4 pointer-events-auto">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl text-xs font-mono text-white/70 shadow-xl">
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-white/40" />
            <span>ROT X: {telemetry.rotX}°</span>
            <span className="text-white/20">|</span>
            <span>ROT Y: {telemetry.rotY}°</span>
          </div>

          <span className="text-white/20">/</span>

          <div className="flex items-center gap-1.5 text-white/50">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>{liveFps} FPS</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-white/40">
          <span>DRAG TO ROTATE 3D</span>
          <span className="text-white/20">·</span>
          <span>SCROLL TO TRAVERSE</span>
        </div>
      </div>

      {/* 6. Right Interactive Progress Rail */}
      <div className="progress-rail fixed right-6 sm:right-9 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4 pointer-events-auto">
        {CHAPTERS.map((chap, idx) => {
          const isActive = activeChapterIndex === idx;

          return (
            <button
              key={idx}
              onClick={() => scrollToChapter(idx)}
              onMouseEnter={() => sound.playFrameTick()}
              className="group relative flex items-center justify-end p-1.5 focus:outline-none"
              title={`Jump to ${chap.eyebrow}`}
            >
              {/* Hover Chapter Name Tooltip */}
              <div className="absolute right-8 px-3.5 py-1.5 rounded-xl bg-black/95 text-white text-[11px] font-mono tracking-wider uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 border border-white/15 shadow-2xl flex items-center gap-2.5">
                <span 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: chap.colorHex }}
                />
                <span className="font-semibold">{chap.eyebrow}</span>
                <span className="text-white/40 text-[9px]">{chap.alloy}</span>
              </div>

              {/* Progress Dot */}
              <div
                className={`progress-dot rounded-full transition-all duration-400 ${
                  isActive
                    ? 'w-3 h-3 bg-white scale-125 shadow-[0_0_16px_rgba(255,255,255,1)]'
                    : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/80 hover:scale-150'
                }`}
                style={{
                  backgroundColor: isActive ? chap.colorHex : undefined,
                  boxShadow: isActive ? `0 0 14px ${chap.colorHex}` : undefined
                }}
              />
            </button>
          );
        })}
      </div>

      {/* 7. Slide-Out Studio PBR Controls Panel */}
      {showStudioPanel && (
        <aside className="fixed bottom-6 right-6 z-40 w-[320px] sm:w-[360px] p-6 rounded-3xl bg-[#0b0c0e]/95 border border-white/20 backdrop-blur-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-300">
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <Sliders className="w-4 h-4 text-white/70" />
              <span className="font-mono text-xs uppercase tracking-widest font-semibold text-white">
                STUDIO MATERIAL LAB
              </span>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setShowStudioPanel(false);
              }}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {/* Roughness Slider */}
            <div>
              <div className="flex justify-between text-white/70 mb-1.5">
                <span>Surface Roughness</span>
                <span className="text-white font-bold">{customRoughness.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.01"
                value={customRoughness}
                onChange={(e) => setCustomRoughness(parseFloat(e.target.value))}
                className="w-full accent-white cursor-pointer"
              />
            </div>

            {/* Metalness Slider */}
            <div>
              <div className="flex justify-between text-white/70 mb-1.5">
                <span>Metalness Alloy</span>
                <span className="text-white font-bold">{customMetalness.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.01"
                value={customMetalness}
                onChange={(e) => setCustomMetalness(parseFloat(e.target.value))}
                className="w-full accent-white cursor-pointer"
              />
            </div>

            {/* Clearcoat Slider */}
            <div>
              <div className="flex justify-between text-white/70 mb-1.5">
                <span>Clearcoat Specular</span>
                <span className="text-white font-bold">{customClearcoat.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.01"
                value={customClearcoat}
                onChange={(e) => setCustomClearcoat(parseFloat(e.target.value))}
                className="w-full accent-white cursor-pointer"
              />
            </div>

            {/* Exposure Slider */}
            <div>
              <div className="flex justify-between text-white/70 mb-1.5">
                <span>Photometric Exposure</span>
                <span className="text-white font-bold">{customExposure.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.2"
                step="0.05"
                value={customExposure}
                onChange={(e) => setCustomExposure(parseFloat(e.target.value))}
                className="w-full accent-white cursor-pointer"
              />
            </div>

            {/* Geometry Switching Cluster */}
            <div className="pt-2">
              <span className="text-white/40 text-[10px] uppercase block mb-1.5">Mesh Geometry:</span>
              <div className="grid grid-cols-2 gap-1.5">
                {(['torus-knot', 'mobius', 'icosahedron', 'super-torus'] as GeometryType[]).map((geo) => (
                  <button
                    key={geo}
                    onClick={() => {
                      sound.playClick();
                      setActiveGeometry(geo);
                    }}
                    className={`py-1.5 px-2 rounded-lg border text-[10px] font-mono text-center transition-all ${
                      activeGeometry === geo 
                        ? 'bg-white text-black font-bold border-white' 
                        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {geo.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="pt-3 flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setIsWireframe(prev => !prev);
                }}
                className={`flex-1 py-2.5 px-3 rounded-xl border text-center transition-all ${
                  isWireframe ? 'bg-white text-black font-bold border-white' : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                }`}
              >
                {isWireframe ? 'SHADED' : 'WIREFRAME'}
              </button>

              <button
                onClick={handleCopyPBRConfig}
                className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 hover:text-white transition-all flex items-center justify-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>COPY PBR</span>
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* 8. Deep Material Specs Modal */}
      {showSpecsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl p-6 sm:p-10 rounded-3xl bg-[#0c0d10] border border-white/20 shadow-2xl text-white">
            <button
              onClick={() => {
                sound.playClick();
                setShowSpecsModal(false);
              }}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div 
                className="w-3 h-3 rounded-full shadow-[0_0_10px]" 
                style={{ backgroundColor: currentChapter.colorHex, boxShadow: `0 0 14px ${currentChapter.colorHex}` }}
              />
              <span className="font-mono text-xs uppercase tracking-widest text-white/50">
                {currentChapter.eyebrow}
              </span>
            </div>

            <h2 className="font-['Syne'] text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              {currentChapter.alloy}
            </h2>

            <p className="text-sm text-white/70 leading-relaxed mb-6 font-light">
              {currentChapter.details}
            </p>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] mb-6">
              <div className="font-mono text-[11px] uppercase tracking-wider text-white/40 mb-3 font-semibold">
                PHYSICAL MEASUREMENTS & OPTICAL CONSTANTS
              </div>
              <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                {currentChapter.specs.map((spec, i) => (
                  <div key={i} className="flex flex-col border-b border-white/[0.04] pb-2">
                    <span className="text-white/40 text-[10px] uppercase">{spec.label}</span>
                    <span className="text-white font-medium text-sm mt-0.5">{spec.value}</span>
                    {spec.sub && <span className="text-white/30 text-[9px]">{spec.sub}</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleCopyPBRConfig}
                className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white hover:text-black text-xs font-mono tracking-wider transition-all flex items-center gap-2"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>COPY SPECIFICATION JSON</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setShowSpecsModal(false);
                }}
                className="px-6 py-2.5 rounded-full bg-white text-black font-mono text-xs font-semibold hover:bg-white/90 transition-all"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Keyboard Shortcuts Help Modal */}
      {showHotkeysModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#0c0d10] border border-white/20 shadow-2xl text-white">
            <button
              onClick={() => {
                sound.playClick();
                setShowHotkeysModal(false);
              }}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-['Syne'] text-xl font-bold mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-300" />
              <span>Studio Keyboard Shortcuts</span>
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center py-2 border-b border-white/[0.06]">
                <span className="text-white/60">Chapter 1 — Chrome Silver</span>
                <kbd className="px-2 py-1 rounded bg-white/10 text-white font-bold">1</kbd>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/[0.06]">
                <span className="text-white/60">Chapter 2 — Sapphire</span>
                <kbd className="px-2 py-1 rounded bg-white/10 text-white font-bold">2</kbd>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/[0.06]">
                <span className="text-white/60">Chapter 3 — Emerald</span>
                <kbd className="px-2 py-1 rounded bg-white/10 text-white font-bold">3</kbd>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/[0.06]">
                <span className="text-white/60">Chapter 4 — Copper</span>
                <kbd className="px-2 py-1 rounded bg-white/10 text-white font-bold">4</kbd>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/[0.06]">
                <span className="text-white/60">Toggle 360° Auto-Orbit</span>
                <kbd className="px-2.5 py-1 rounded bg-white/10 text-white font-bold">Space</kbd>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/[0.06]">
                <span className="text-white/60">Cycle 3D Mesh Geometry</span>
                <kbd className="px-2 py-1 rounded bg-white/10 text-white font-bold">G</kbd>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/[0.06]">
                <span className="text-white/60">Cycle Lighting Setup</span>
                <kbd className="px-2 py-1 rounded bg-white/10 text-white font-bold">L</kbd>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/[0.06]">
                <span className="text-white/60">Toggle Wireframe Topology</span>
                <kbd className="px-2 py-1 rounded bg-white/10 text-white font-bold">W</kbd>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setShowHotkeysModal(false);
              }}
              className="mt-6 w-full py-2.5 rounded-full bg-white text-black font-mono text-xs font-semibold hover:bg-white/90 transition-all"
            >
              GOT IT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
