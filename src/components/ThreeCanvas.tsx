/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { sound } from '../utils/audio';

interface ThreeCanvasProps {
  scrollProgress: number;
  onExplosionTrigger?: (isExploded: boolean) => void;
}
 
export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ scrollProgress, onExplosionTrigger }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollProgressRef = useRef(scrollProgress);
  scrollProgressRef.current = scrollProgress;

  const hasExplodedRef = useRef<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Remove any existing canvas elements to prevent duplicate stacked canvases
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x040406);
    scene.fog = new THREE.FogExp2(0x040406, 0.007);

    // 2. Perspective Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5.0);

    // 3. WebGL Renderer with High-Precision ACES Filmic Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // 4. Custom Obsidian & Warm Bronze Studio Environment Texture
    // Gives the exact dark obsidian metallic body with warm amber/bronze and cool silver specular reflections
    function createObsidianStudioEnvTexture() {
      const size = 1024;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      // Deep dark charcoal studio background
      const grad = ctx.createLinearGradient(0, 0, size, size);
      grad.addColorStop(0, '#0a0c10');
      grad.addColorStop(0.3, '#181b22');
      grad.addColorStop(0.5, '#050608');
      grad.addColorStop(0.7, '#12151c');
      grad.addColorStop(1, '#08090d');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      // Warm Golden / Bronze Light Box (matches the warm highlight on the knot's left crest)
      const warmGrad = ctx.createRadialGradient(size * 0.35, size * 0.35, 10, size * 0.35, size * 0.35, size * 0.4);
      warmGrad.addColorStop(0, 'rgba(255, 180, 110, 1.0)');
      warmGrad.addColorStop(0.4, 'rgba(210, 130, 60, 0.8)');
      warmGrad.addColorStop(0.8, 'rgba(120, 60, 20, 0.3)');
      warmGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = warmGrad;
      ctx.fillRect(0, 0, size, size);

      // Bright Overhead Softbox Strip
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.fillRect(0, size * 0.22, size, size * 0.08);

      // Cool Ice-Silver Edge Highlight
      const coolGrad = ctx.createRadialGradient(size * 0.8, size * 0.6, 20, size * 0.8, size * 0.6, size * 0.35);
      coolGrad.addColorStop(0, 'rgba(220, 235, 255, 0.85)');
      coolGrad.addColorStop(0.5, 'rgba(140, 170, 210, 0.4)');
      coolGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coolGrad;
      ctx.fillRect(0, 0, size, size);

      const tex = new THREE.CanvasTexture(canvas);
      tex.mapping = THREE.EquirectangularReflectionMapping;
      return tex;
    }
    const envTexture = createObsidianStudioEnvTexture();
    scene.environment = envTexture;

    // 5. OBSIDIAN 3D TORUS KNOT MESH (Matching the exact gunmetal/dark chrome with warm bronze highlights)
    const knotGroup = new THREE.Group();
    // Center knot nicely in viewport
    knotGroup.position.set(width > 768 ? 0.38 : 0, 0.05, 0);
    scene.add(knotGroup);

    const knotGeometry = new THREE.TorusKnotGeometry(1.08, 0.38, 280, 56, 2, 3);
    const knotMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1a1d24, // Dark Obsidian / Gunmetal Core
      metalness: 0.96,
      roughness: 0.12, // Smooth, glossy metallic surface
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 1.0,
      envMap: envTexture,
      envMapIntensity: 2.6,
    });

    const knotMesh = new THREE.Mesh(knotGeometry, knotMaterial);
    knotMesh.castShadow = true;
    knotMesh.receiveShadow = false;
    knotGroup.add(knotMesh);

    // Thin Orbital Ellipse Wire Rings (Matching the delicate lines in the screenshot)
    const ringMat = new THREE.LineBasicMaterial({
      color: 0x8892b0,
      transparent: true,
      opacity: 0.35
    });

    const createEllipseCurve = (xR: number, yR: number) => {
      const curve = new THREE.EllipseCurve(0, 0, xR, yR, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(140);
      const geom = new THREE.BufferGeometry().setFromPoints(points);
      return new THREE.LineLoop(geom, ringMat);
    };

    const orbitRing1 = createEllipseCurve(2.3, 1.45);
    orbitRing1.rotation.x = Math.PI / 3.2;
    orbitRing1.rotation.y = Math.PI / 6;
    knotGroup.add(orbitRing1);

    const orbitRing2 = createEllipseCurve(2.5, 1.55);
    orbitRing2.rotation.x = -Math.PI / 3.6;
    orbitRing2.rotation.y = -Math.PI / 4.2;
    knotGroup.add(orbitRing2);

    // Floor Platform & Soft Contact Shadow Disk (Matching the ground disc in the screenshot)
    const floorGroup = new THREE.Group();
    floorGroup.position.y = -1.72;
    knotGroup.add(floorGroup);

    const groundGeo = new THREE.CircleGeometry(5.2, 64);
    const groundMat = new THREE.MeshBasicMaterial({
      color: 0x101217,
      transparent: true,
      opacity: 0.88
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    floorGroup.add(groundMesh);

    // Soft dark contact shadow disc beneath knot
    const shadowGeo = new THREE.CircleGeometry(2.2, 64);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x020203,
      transparent: true,
      opacity: 0.95
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.01;
    floorGroup.add(shadowMesh);

    // Subtle Ambient Floating Dust Motes (As seen in the dark background of the screenshot)
    const dustCount = 180;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPos[i] = (Math.random() - 0.5) * 12;
      dustPos[i + 1] = (Math.random() - 0.5) * 8;
      dustPos[i + 2] = (Math.random() - 0.5) * 8;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.025,
      color: 0x8fa3bf,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    scene.add(dustParticles);

    // 6. SHATTER / BURST PARTICLES & MASSIVE DEEP SPACE STARFIELD
    const STAR_COUNT = 7000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(STAR_COUNT * 3);
    const starOrigins = new Float32Array(STAR_COUNT * 3);
    const starVelocities = new Float32Array(STAR_COUNT * 3);
    const starColors = new Float32Array(STAR_COUNT * 3);
    const starSizes = new Float32Array(STAR_COUNT);
    const starBaseSizes = new Float32Array(STAR_COUNT);

    function createStarSprite() {
      const size = 64;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.2, 'rgba(255, 240, 200, 0.95)');
      grad.addColorStop(0.55, 'rgba(120, 200, 255, 0.5)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      const tex = new THREE.CanvasTexture(canvas);
      return tex;
    }
    const starSprite = createStarSprite();

    const knotPositions = knotGeometry.attributes.position.array;
    const knotPosCount = knotPositions.length / 3;

    for (let i = 0; i < STAR_COUNT; i++) {
      const idx3 = i * 3;
      const knotSampleIdx = (i % knotPosCount) * 3;

      const kX = knotPositions[knotSampleIdx] + (Math.random() - 0.5) * 0.15;
      const kY = knotPositions[knotSampleIdx + 1] + (Math.random() - 0.5) * 0.15;
      const kZ = knotPositions[knotSampleIdx + 2] + (Math.random() - 0.5) * 0.15;

      starOrigins[idx3] = kX;
      starOrigins[idx3 + 1] = kY;
      starOrigins[idx3 + 2] = kZ;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const speed = 3.0 + Math.random() * 8.0;

      starVelocities[idx3] = Math.sin(phi) * Math.cos(theta) * speed;
      starVelocities[idx3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
      starVelocities[idx3 + 2] = (Math.cos(phi) * speed) - (Math.random() * 10.0);

      starPositions[idx3] = kX;
      starPositions[idx3 + 1] = kY;
      starPositions[idx3 + 2] = kZ;

      const distFromCenter = Math.sqrt(starVelocities[idx3] ** 2 + starVelocities[idx3 + 1] ** 2);
      const isCore = distFromCenter < 3.5 || Math.random() < 0.28;

      if (isCore) {
        // Golden / Amber / Radiant Core
        const coreT = Math.random();
        starColors[idx3] = 1.0;
        starColors[idx3 + 1] = 0.55 + coreT * 0.35;
        starColors[idx3 + 2] = 0.12 + coreT * 0.2;
      } else {
        // Cyan / Sapphire / Diamond Outer Field
        const rand = Math.random();
        if (rand < 0.55) {
          starColors[idx3] = 0.2 + rand * 0.25;
          starColors[idx3 + 1] = 0.75 + rand * 0.25;
          starColors[idx3 + 2] = 0.98;
        } else if (rand < 0.85) {
          starColors[idx3] = 0.15;
          starColors[idx3 + 1] = 0.45;
          starColors[idx3 + 2] = 0.98;
        } else {
          starColors[idx3] = 0.98;
          starColors[idx3 + 1] = 0.98;
          starColors[idx3 + 2] = 1.0;
        }
      }

      const baseSize = 0.05 + Math.random() * 0.14;
      starSizes[i] = baseSize;
      starBaseSizes[i] = baseSize;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.09,
      map: starSprite,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });

    const starSystem = new THREE.Points(starGeometry, starMaterial);
    scene.add(starSystem);

    // 7. CENTRAL NEBULA GLOW
    const nebulaGeo = new THREE.PlaneGeometry(14, 9.0);
    function createNebulaTexture() {
      const size = 512;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grad.addColorStop(0, 'rgba(255, 140, 40, 0.55)');
      grad.addColorStop(0.28, 'rgba(230, 90, 20, 0.32)');
      grad.addColorStop(0.60, 'rgba(10, 40, 100, 0.15)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      return new THREE.CanvasTexture(canvas);
    }
    const nebulaTexture = createNebulaTexture();
    const nebulaMat = new THREE.MeshBasicMaterial({
      map: nebulaTexture,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const nebulaMesh = new THREE.Mesh(nebulaGeo, nebulaMat);
    nebulaMesh.position.set(0, 0, -6);
    scene.add(nebulaMesh);

    // 8. DYNAMIC LIGHTING RIG (Warm Bronze Key Light + Cool Metallic Rim Lights)
    const ambientLight = new THREE.AmbientLight(0x222630, 1.8);
    scene.add(ambientLight);

    // Warm Bronze/Amber Key Spotlight (gives the exact warm highlight from the image)
    const warmBronzeSpot = new THREE.SpotLight(0xffb266, 140, 40, Math.PI / 3.2, 0.35, 1.0);
    warmBronzeSpot.position.set(-3.5, 4.5, 4.5);
    warmBronzeSpot.castShadow = true;
    warmBronzeSpot.shadow.mapSize.set(2048, 2048);
    warmBronzeSpot.shadow.bias = -0.0001;
    scene.add(warmBronzeSpot);

    // Cool White/Silver Fill Spotlight (gives crisp top & right chrome contours)
    const coolWhiteSpot = new THREE.SpotLight(0xffffff, 110, 35, Math.PI / 3.5, 0.35, 1.0);
    coolWhiteSpot.position.set(4.5, 6.0, 4.5);
    scene.add(coolWhiteSpot);

    // Blue-tinted Back Rim Light
    const rimSpot = new THREE.SpotLight(0x7dd3fc, 85, 35, Math.PI / 3.5, 0.4, 1.0);
    rimSpot.position.set(-4.0, 4.0, -4.5);
    scene.add(rimSpot);

    const warmCoreLight = new THREE.PointLight(0xff9922, 0, 20);
    warmCoreLight.position.set(0, 0, 0);
    scene.add(warmCoreLight);

    // 9. INTERACTIVE HOVER, PARALLAX & DIRECT DRAG-ROTATION PHYSICS
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    // Direct drag rotation state
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let dragRotationX = 0;
    let dragRotationY = 0;
    let dragVelocityX = 0;
    let dragVelocityY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        dragVelocityX = deltaX * 0.006;
        dragVelocityY = deltaY * 0.006;

        dragRotationY += dragVelocityX;
        dragRotationX += dragVelocityY;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      // Only drag if not clicking on interactive buttons/links
      if ((e.target as HTMLElement)?.closest('button, a, input, textarea')) return;
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
      sound.playClick(true);
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch support for mobile dragging
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;

        dragVelocityX = deltaX * 0.006;
        dragVelocityY = deltaY * 0.006;

        dragRotationY += dragVelocityX;
        dragRotationX += dragVelocityY;

        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 10. Resize handler
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      knotGroup.position.set(w > 768 ? 0.38 : 0, 0.05, 0);
    };
    window.addEventListener('resize', onResize);

    // 11. Animation Loop with Zoom -> Shatter/Burst -> Deep Space Warp Flight
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse tilt interpolation
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // Inertia damping for direct drag rotation
      if (!isDragging) {
        dragVelocityX *= 0.94;
        dragVelocityY *= 0.94;
        dragRotationY += dragVelocityX;
        dragRotationX += dragVelocityY;
      }

      // Animate background dust motes gently
      dustParticles.rotation.y = elapsed * 0.02;
      dustParticles.rotation.x = Math.sin(elapsed * 0.01) * 0.1;

      const progress = scrollProgressRef.current; // 0.0 to 1.0

      // =========================================================================
      // PHASE 1: HERO STATE & SMOOTH ZOOM-IN (0.00 to 0.16)
      // =========================================================================
      if (progress < 0.16) {
        hasExplodedRef.current = false;
        if (onExplosionTrigger) onExplosionTrigger(false);

        knotMesh.visible = true;
        orbitRing1.visible = true;
        orbitRing2.visible = true;
        floorGroup.visible = true;
        knotMaterial.opacity = 1.0;
        knotMaterial.transparent = false;

        // Dynamic Zooming based on scroll
        const zoomFactor = 1.0 + (progress / 0.16) * 3.0;
        knotGroup.scale.set(zoomFactor, zoomFactor, zoomFactor);

        // Combined Rotation: Auto idle float + interactive drag rotation + mouse hover parallax + scroll twist
        knotMesh.rotation.y = elapsed * 0.35 + dragRotationY + mouseX * 0.4 + (progress * Math.PI * 2);
        knotMesh.rotation.x = Math.sin(elapsed * 0.25) * 0.15 + dragRotationX + mouseY * 0.3;
        knotMesh.rotation.z = Math.cos(elapsed * 0.2) * 0.1;

        orbitRing1.rotation.z += 0.003;
        orbitRing2.rotation.z -= 0.004;

        camera.position.set(mouseX * 0.25, mouseY * 0.15, 5.0 - progress * 8.5);
        camera.lookAt(knotGroup.position.x * 0.4, 0, 0);

        starMaterial.opacity = 0;
        nebulaMat.opacity = 0;
        warmCoreLight.intensity = 0;
      }
      // =========================================================================
      // PHASE 2: SHATTER / BURST INTO STARS (0.16 to 0.28)
      // =========================================================================
      else if (progress >= 0.16 && progress < 0.28) {
        const burstT = (progress - 0.16) / (0.28 - 0.16);

        if (!hasExplodedRef.current) {
          hasExplodedRef.current = true;
          sound.playCosmicBurst();
          if (onExplosionTrigger) onExplosionTrigger(true);
        }

        const meshFade = Math.max(1.0 - burstT * 1.5, 0);
        knotMaterial.transparent = true;
        knotMaterial.opacity = meshFade;
        knotMesh.visible = meshFade > 0.01;
        orbitRing1.visible = meshFade > 0.01;
        orbitRing2.visible = meshFade > 0.01;
        floorGroup.visible = meshFade > 0.01;

        const zoomFactor = 4.0 + burstT * 4.8;
        knotGroup.scale.set(zoomFactor, zoomFactor, zoomFactor);

        starMaterial.opacity = Math.min(burstT * 1.5, 1.0);
        nebulaMat.opacity = burstT * 0.85;
        warmCoreLight.intensity = burstT * 30.0;

        const posAttr = starGeometry.attributes.position;
        const sizeAttr = starGeometry.attributes.size;
        const posArray = posAttr.array as Float32Array;
        const sizeArray = sizeAttr.array as Float32Array;

        for (let i = 0; i < STAR_COUNT; i++) {
          const idx3 = i * 3;
          const burstDist = burstT * 3.2;

          posArray[idx3] = (starOrigins[idx3] + knotGroup.position.x) * zoomFactor + starVelocities[idx3] * burstDist + (Math.sin(elapsed + i) * 0.05);
          posArray[idx3 + 1] = starOrigins[idx3 + 1] * zoomFactor + starVelocities[idx3 + 1] * burstDist + (Math.cos(elapsed + i) * 0.05);
          posArray[idx3 + 2] = starOrigins[idx3 + 2] * zoomFactor + starVelocities[idx3 + 2] * burstDist - burstT * 10.0;

          sizeArray[i] = starBaseSizes[i] * (1.0 + burstT * 2.4);
        }
        posAttr.needsUpdate = true;
        sizeAttr.needsUpdate = true;

        camera.position.set(mouseX * 0.4, mouseY * 0.25, 3.6 - burstT * 3.5);
        camera.lookAt(0, 0, -10);
      }
      // =========================================================================
      // PHASE 3: DEEP SPACE WARP FLIGHT — DEEPER & DEEPER WITH INCREASING STAR SIZE (0.28 to 1.00)
      // =========================================================================
      else {
        hasExplodedRef.current = true;
        if (onExplosionTrigger) onExplosionTrigger(true);

        knotMesh.visible = false;
        orbitRing1.visible = false;
        orbitRing2.visible = false;
        floorGroup.visible = false;

        starMaterial.opacity = 1.0;
        nebulaMat.opacity = 0.9;
        warmCoreLight.intensity = 22.0;

        const deepT = (progress - 0.28) / (1.0 - 0.28);
        const warpSpeed = 1.0 + deepT * 7.5;

        const targetCamZ = 0.1 - deepT * 48.0;
        camera.position.z = targetCamZ;
        camera.position.x = mouseX * (1.2 + deepT * 2.0);
        camera.position.y = mouseY * (0.8 + deepT * 1.5);
        camera.lookAt(mouseX * 0.5, mouseY * 0.3, targetCamZ - 15);

        const posAttr = starGeometry.attributes.position;
        const sizeAttr = starGeometry.attributes.size;
        const posArray = posAttr.array as Float32Array;
        const sizeArray = sizeAttr.array as Float32Array;

        const tunnelLength = 72.0;
        const currentCamZ = camera.position.z;

        for (let i = 0; i < STAR_COUNT; i++) {
          const idx3 = i * 3;
          let relZ = posArray[idx3 + 2] - currentCamZ;

          if (relZ > 2.0) {
            posArray[idx3 + 2] -= tunnelLength;
            relZ -= tunnelLength;
          } else if (relZ < -tunnelLength + 2.0) {
            posArray[idx3 + 2] += tunnelLength;
            relZ += tunnelLength;
          }

          posArray[idx3] += (Math.sin(elapsed * 0.5 + i * 0.1) * 0.002);
          posArray[idx3 + 1] += (Math.cos(elapsed * 0.5 + i * 0.1) * 0.002);

          const proximityToCam = Math.max(1.0 - Math.abs(relZ) / 35.0, 0.1);
          const depthMultiplier = 1.0 + deepT * 3.8;
          const speedStretch = Math.min(warpSpeed * 0.18, 3.0);

          sizeArray[i] = starBaseSizes[i] * proximityToCam * depthMultiplier * (1.0 + speedStretch);
        }

        posAttr.needsUpdate = true;
        sizeAttr.needsUpdate = true;

        starSystem.rotation.z = elapsed * 0.04 + progress * Math.PI * 0.6;
        nebulaMesh.position.z = currentCamZ - 8.0;
        nebulaMesh.rotation.z = -elapsed * 0.02;
        warmCoreLight.position.set(0, 0, currentCamZ - 5);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      knotGeometry.dispose();
      knotMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      envTexture.dispose();
      starSprite.dispose();
      nebulaTexture.dispose();
    };
  }, [onExplosionTrigger]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-0 cursor-grab active:cursor-grabbing"
      id="cosmic-webgl-canvas"
    />
  );
};
