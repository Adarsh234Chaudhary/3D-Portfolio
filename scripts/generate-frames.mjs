import fs from 'node:fs';
import path from 'node:path';
import jpeg from 'jpeg-js';

const OUT_DIR = path.resolve(process.cwd(), 'public/animation-frames');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const WIDTH = 960;
const HEIGHT = 960;
const TOTAL_FRAMES = 120;

console.log(`Generating ${TOTAL_FRAMES} high-end 3D sculptural keyframes (${WIDTH}x${HEIGHT})...`);

// Raymarching / mathematical 3D signed distance field rendering for high precision chrome sculpture
function renderFrame(frameIndex) {
  const t = frameIndex / TOTAL_FRAMES; // 0 to 1
  const rawData = Buffer.alloc(WIDTH * HEIGHT * 4);

  // Dynamic parameters for the 3D sculpture
  const rotY = t * Math.PI * 2;
  const rotX = Math.sin(t * Math.PI * 2) * 0.45 + 0.25;
  const rotZ = Math.cos(t * Math.PI * 2) * 0.35;
  const morph = 0.5 + 0.5 * Math.sin(t * Math.PI * 4);

  const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
  const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
  const cosZ = Math.cos(rotZ), sinZ = Math.sin(rotZ);

  // Precompute constants
  const cx = WIDTH / 2;
  const cy = HEIGHT / 2;
  const scale = 320;

  for (let y = 0; y < HEIGHT; y++) {
    const ny = (y - cy) / scale;
    for (let x = 0; x < WIDTH; x++) {
      const nx = (x - cx) / scale;
      const idx = (y * WIDTH + x) * 4;

      // Primary Ray origin and direction
      let roX = 0, roY = 0, roZ = -3.2;
      let rdX = nx, rdY = ny, rdZ = 1.6;
      const len = Math.hypot(rdX, rdY, rdZ);
      rdX /= len; rdY /= len; rdZ /= len;

      // Raymarching loop
      let distTraveled = 0.0;
      let hit = false;
      let hitDist = 0;

      for (let step = 0; step < 48; step++) {
        const px = roX + rdX * distTraveled;
        const py = roY + rdY * distTraveled;
        const pz = roZ + rdZ * distTraveled;

        // Rotate point (Inverse rotation)
        // 1. rotY
        let rx1 = px * cosY + pz * sinY;
        let ry1 = py;
        let rz1 = -px * sinY + pz * cosY;

        // 2. rotX
        let rx2 = rx1;
        let ry2 = ry1 * cosX - rz1 * sinX;
        let rz2 = ry1 * sinX + rz1 * cosX;

        // 3. rotZ
        let rx = rx2 * cosZ - ry2 * sinZ;
        let ry = rx2 * sinZ + ry2 * cosZ;
        let rz = rz2;

        // Torus knot SDF / Kinetic Sculpture SDF
        // Modulate with twisting ribbon
        const r1 = 0.82 + 0.12 * Math.sin(t * Math.PI * 2 + rx * 2.0);
        const r2 = 0.26 + 0.06 * Math.cos(t * Math.PI * 4 + ry * 3.0);
        
        // Torus distance:
        const qx = Math.hypot(rx, rz) - r1;
        const qy = ry;
        
        // Twist angle
        const angle = Math.atan2(rz, rx);
        const twist = angle * 2.5 + t * Math.PI * 2;
        const cosTw = Math.cos(twist), sinTw = Math.sin(twist);
        
        const ribX = qx * cosTw - qy * sinTw;
        const ribY = qx * sinTw + qy * cosTw;
        
        // Rounded box / slice profile
        const bx = Math.abs(ribX) - r2 * 0.9;
        const by = Math.abs(ribY) - r2 * 0.35;
        const dInner = Math.hypot(Math.max(bx, 0), Math.max(by, 0)) + Math.min(Math.max(bx, by), 0) - 0.04;

        // Inner Core Ring
        const coreR1 = 0.38 + 0.05 * Math.sin(t * Math.PI * 4);
        const coreR2 = 0.07;
        const dCore = Math.hypot(Math.hypot(rx, ry) - coreR1, rz) - coreR2;

        const d = Math.min(dInner, dCore);

        if (d < 0.003) {
          hit = true;
          hitDist = distTraveled;
          break;
        }

        distTraveled += d * 0.85;
        if (distTraveled > 6.0) break;
      }

      if (hit) {
        // Compute Normal via finite differences
        const h = 0.003;
        const hitX = roX + rdX * hitDist;
        const hitY = roY + rdY * hitDist;
        const hitZ = roZ + rdZ * hitDist;

        // Sample SDF around hit point
        const getSdf = (px, py, pz) => {
          let rx1 = px * cosY + pz * sinY;
          let ry1 = py;
          let rz1 = -px * sinY + pz * cosY;
          let rx2 = rx1;
          let ry2 = ry1 * cosX - rz1 * sinX;
          let rz2 = ry1 * sinX + rz1 * cosX;
          let rx = rx2 * cosZ - ry2 * sinZ;
          let ry = rx2 * sinZ + ry2 * cosZ;
          let rz = rz2;
          const r1 = 0.82 + 0.12 * Math.sin(t * Math.PI * 2 + rx * 2.0);
          const r2 = 0.26 + 0.06 * Math.cos(t * Math.PI * 4 + ry * 3.0);
          const qx = Math.hypot(rx, rz) - r1;
          const qy = ry;
          const angle = Math.atan2(rz, rx);
          const twist = angle * 2.5 + t * Math.PI * 2;
          const cosTw = Math.cos(twist), sinTw = Math.sin(twist);
          const ribX = qx * cosTw - qy * sinTw;
          const ribY = qx * sinTw + qy * cosTw;
          const bx = Math.abs(ribX) - r2 * 0.9;
          const by = Math.abs(ribY) - r2 * 0.35;
          const dInner = Math.hypot(Math.max(bx, 0), Math.max(by, 0)) + Math.min(Math.max(bx, by), 0) - 0.04;
          const coreR1 = 0.38 + 0.05 * Math.sin(t * Math.PI * 4);
          const coreR2 = 0.07;
          const dCore = Math.hypot(Math.hypot(rx, ry) - coreR1, rz) - coreR2;
          return Math.min(dInner, dCore);
        };

        const normalX = getSdf(hitX + h, hitY, hitZ) - getSdf(hitX - h, hitY, hitZ);
        const normalY = getSdf(hitX, hitY + h, hitZ) - getSdf(hitX, hitY - h, hitZ);
        const normalZ = getSdf(hitX, hitY, hitZ + h) - getSdf(hitX, hitY, hitZ - h);
        const nLen = Math.hypot(normalX, normalY, normalZ) || 1;
        const nxNorm = normalX / nLen;
        const nyNorm = normalY / nLen;
        const nzNorm = normalZ / nLen;

        // Lighting model (Chrome Obsidian + Fresnel + Studio Keylights)
        // Key light from top right
        const l1x = 0.577, l1y = -0.577, l1z = -0.577;
        const dot1 = Math.max(0, -(nxNorm * l1x + nyNorm * l1y + nzNorm * l1z));

        // Rim light from bottom left
        const l2x = -0.707, l2y = 0.707, l2z = 0.3;
        const dot2 = Math.max(0, -(nxNorm * l2x + nyNorm * l2y + nzNorm * l2z));

        // View vector dot normal (Fresnel)
        const vDotN = Math.max(0, -(rdX * nxNorm + rdY * nyNorm + rdZ * nzNorm));
        const fresnel = Math.pow(1.0 - vDotN, 3.5);

        // Specular highlight
        // Reflect vector: R = D - 2*(D.N)*N
        const dDotN = rdX * nxNorm + rdY * nyNorm + rdZ * nzNorm;
        const rxDir = rdX - 2 * dDotN * nxNorm;
        const ryDir = rdY - 2 * dDotN * nyNorm;
        const rzDir = rdZ - 2 * dDotN * nzNorm;
        const spec1 = Math.pow(Math.max(0, -(rxDir * l1x + ryDir * l1y + rzDir * l1z)), 32);
        const spec2 = Math.pow(Math.max(0, -(rxDir * l2x + ryDir * l2y + rzDir * l2z)), 24);

        // Iridescent chromatic dispersion based on normal and angle
        const iridHue = (Math.atan2(nyNorm, nxNorm) + t * Math.PI * 2) / (Math.PI * 2);
        const rChr = Math.sin(iridHue * Math.PI * 2) * 0.5 + 0.5;
        const gChr = Math.sin(iridHue * Math.PI * 2 + 2.09) * 0.5 + 0.5;
        const bChr = Math.sin(iridHue * Math.PI * 2 + 4.18) * 0.5 + 0.5;

        // Dark obsidian base + metallic sheen
        const baseDark = 18;
        const r = Math.min(255, Math.floor(baseDark + dot1 * 80 + dot2 * 30 + fresnel * (110 + rChr * 90) + spec1 * 230 + spec2 * 140));
        const g = Math.min(255, Math.floor(baseDark + dot1 * 85 + dot2 * 35 + fresnel * (115 + gChr * 95) + spec1 * 235 + spec2 * 150));
        const b = Math.min(255, Math.floor(baseDark + dot1 * 95 + dot2 * 45 + fresnel * (130 + bChr * 110) + spec1 * 255 + spec2 * 170));

        rawData[idx] = r;
        rawData[idx + 1] = g;
        rawData[idx + 2] = b;
        rawData[idx + 3] = 255;
      } else {
        // Deep Obsidian Background with subtle radial vignette
        const distFromCenter = Math.hypot(nx, ny);
        const bgGrad = Math.max(0, 1.0 - distFromCenter * 0.7);
        const bgR = Math.floor(11 + bgGrad * 6);
        const bgG = Math.floor(11 + bgGrad * 6);
        const bgB = Math.floor(13 + bgGrad * 9);

        rawData[idx] = bgR;
        rawData[idx + 1] = bgG;
        rawData[idx + 2] = bgB;
        rawData[idx + 3] = 255;
      }
    }
  }

  const jpegData = jpeg.encode({ data: rawData, width: WIDTH, height: HEIGHT }, 92);
  const frameNum = (frameIndex + 1).toString().padStart(3, '0');
  const filePath = path.join(OUT_DIR, `frame_${frameNum}.jpg`);
  fs.writeFileSync(filePath, jpegData.data);
}

// Generate all frames in batches
const start = Date.now();
for (let i = 0; i < TOTAL_FRAMES; i++) {
  renderFrame(i);
  if ((i + 1) % 20 === 0 || i === TOTAL_FRAMES - 1) {
    console.log(`Rendered frame ${i + 1}/${TOTAL_FRAMES} in ${((Date.now() - start) / 1000).toFixed(1)}s`);
  }
}

console.log(`Successfully generated all ${TOTAL_FRAMES} frames in /public/animation-frames/!`);
