import { Project, Capability } from '../types';
 
export const PROJECTS: Project[] = [
  {
    id: 'aetheria-audio',
    number: '01',
    title: 'AETHERIA AUDIO',
    subtitle: 'Spatial Acoustic Sculpture & Lossless Haptic Driver',
    category: 'Industrial Design & Spatial UI',
    year: '2026',
    client: 'Aetheria Soundworks Switzerland',
    role: 'Lead Spatial Architect & Creative Engineering',
    summary: 'A monolithic titanium acoustic sphere equipped with 360-degree beamforming planar transducers and a reactive liquid-crystal physical crown interface.',
    description: 'Designed in collaboration with Swiss acoustic engineers, Aetheria Audio redefines high-end acoustic reproduction. We created both the physical computational geometry and the companion spatial neuromorphic interface that calculates room acoustics in real-time using ray-traced wavefield synthesis.',
    metrics: [
      { label: 'Acoustic Precision', value: '0.002% THD' },
      { label: 'Spatial Latency', value: '< 1.4ms' },
      { label: 'Materials', value: 'Grade 5 Ti + Obsidian Glass' },
      { label: 'Awards', value: 'Red Dot: Luminary 2026' }
    ],
    deliverables: [
      'Parametric 3D CAD & Surface Modeling',
      'Real-time WebGL Configuration Tool',
      'Spatial UI & Micro-interactions',
      'Custom Audio DSP Visualizer'
    ],
    techStack: ['WebGL / GLSL', 'Three.js', 'Rust / WebAssembly', 'Custom Raymarching', 'Figma Tokens'],
    colorAccent: '#e2e8f0',
    frameTarget: 42,
    features: [
      {
        title: 'Monolithic Titanium Chassis',
        description: 'Single-piece 5-axis CNC machined acoustic enclosure minimizing internal resonance down to sub-audible thresholds.'
      },
      {
        title: 'Wavefield Synthesis Engine',
        description: 'Custom WebAssembly audio engine reproducing hyper-localized 3D sound stages in browser and native hardware.'
      },
      {
        title: 'Haptic Liquid Glass UI',
        description: 'Sub-millimeter tactile glass dial providing micro-vibrational feedback corresponding to audio frequencies.'
      }
    ]
  },
  {
    id: 'chronos-chronograph',
    number: '02',
    title: 'CHRONOS HOROLOGY',
    subtitle: 'Haute Horlogerie Digital Twin & Astronomical Complication',
    category: '3D Simulation & WebGL Experience',
    year: '2026',
    client: 'Atelier Chronos Geneva',
    role: 'Creative Director & WebGL Shader Developer',
    summary: 'A sub-micron mechanical digital twin of a 540-component tourbillon chronograph with real-time astronomical gear-train kinematics.',
    description: 'Commissioned by one of the oldest independent Swiss manufactures, Chronos Horology bridges centuries of mechanical watchmaking with cutting-edge real-time 3D shaders. Collectors inspect hand-beveled bridges, ruby bearings, and balance spring elasticity in true 60fps WebGL with physically accurate brushed metallic reflections.',
    metrics: [
      { label: 'Component Count', value: '540 Individual Parts' },
      { label: 'Geometry LODs', value: '4 Tiers / 2.8M Poly' },
      { label: 'Shader Pass', value: 'Anisotropic Brushed Metal' },
      { label: 'FPS Target', value: 'Locked 60 FPS' }
    ],
    deliverables: [
      'Reverse Engineering & CAD Cleanse',
      'Custom PBR GLSL Shaders',
      'Interactive Complication Disassembly Mode',
      'Digital Ownership Certificate (Spatial 3D)'
    ],
    techStack: ['Custom GLSL Shaders', 'Three.js / WebGL', 'React Three Fiber', 'Post-processing Pipeline'],
    colorAccent: '#cbd5e1',
    frameTarget: 68,
    features: [
      {
        title: 'Anisotropic Hairline Metal Shading',
        description: 'Bespoke fragment shaders capturing light reflection on circular and linear brushed Geneva stripes.'
      },
      {
        title: 'Astronomical Gear Train Kinematics',
        description: 'Mathematically exact gear ratios driving lunar phase, sidereal time, and perpetual calendar mechanics.'
      },
      {
        title: 'Exploded Micro-Assembly View',
        description: 'Seamless scroll-driven layer peeling allowing collectors to inspect escapement mechanics at 50x magnification.'
      }
    ]
  },
  {
    id: 'verve-mobility',
    number: '03',
    title: 'VERVE MOBILITY',
    subtitle: 'Autonomous eVTOL Cockpit Interface & Trajectory HUD',
    category: 'Aviation Interface & Spatial OS',
    year: '2025',
    client: 'Verve Aerospace Munich',
    role: 'Principal Spatial Systems Designer',
    summary: 'Next-generation panoramic flight deck OS for autonomous vertical takeoff craft, utilizing synthetic vision systems and predictive flight corridors.',
    description: 'Verve Mobility is pioneering urban air mobility. We designed the human-machine interface for next-gen electric aviation, combining augmented reality flight tunnels, weather radar volumetrics, and emergency intervention protocols into a calm, obsidian-themed cockpit interface.',
    metrics: [
      { label: 'Response Horizon', value: '120Hz Refresh' },
      { label: 'Cognitive Load', value: '-38% Pilot Fatigue' },
      { label: 'Safety Rating', value: 'DO-178C Level A' },
      { label: 'Testing Hours', value: '1,400+ Flight Sim' }
    ],
    deliverables: [
      'Synthetic Vision 3D HUD',
      'Augmented Flight Path Corridors',
      'Multi-Touch Obsidian Console Interface',
      'Real-time Telemetry Glass Panels'
    ],
    techStack: ['WebGL / WebGPU', 'TypeScript', 'Vector Geometry Engine', 'Canvas 2D HUD Layers'],
    colorAccent: '#94a3b8',
    frameTarget: 95,
    features: [
      {
        title: 'Synthetic 3D Terrain & Weather',
        description: 'Volumetric cloud density and terrain hazard mapping projected directly into pilot focal plane.'
      },
      {
        title: 'Predictive Trajectory Tunnels',
        description: 'Real-time kinematic splines displaying safe aerodynamic energy envelopes and collision-free vectors.'
      },
      {
        title: 'Minimalist Alert Priority Matrix',
        description: 'Strict color-coded typography hierarchy eliminating visual clutter during complex flight phases.'
      }
    ]
  },
  {
    id: 'lumina-os',
    number: '04',
    title: 'LUMINA NEUROMORPHIC',
    subtitle: 'Bio-Responsive Spatial Operating Environment',
    category: 'Spatial Computing & Neural Interface',
    year: '2025',
    client: 'Lumina Research Labs Tokyo',
    role: 'Creative Technologist & Interface Architect',
    summary: 'An adaptive spatial computing environment that calibrates typography, contrast, and depth layers based on user cognitive attention and eye saccades.',
    description: 'Lumina reimagines how humans collaborate with artificial intelligence across multi-dimensional canvases. By reading ambient physiological telemetry, the interface gently rearranges spatial nodes, compresses idle tools into liquid-glass micro-prisms, and elevates high-priority generative synthesis.',
    metrics: [
      { label: 'Gaze Prediction', value: '99.4% Accuracy' },
      { label: 'Interface Latency', value: '2.1ms Render Loop' },
      { label: 'Layer Depth', value: '8 Spatial Tiers' },
      { label: 'Patent Filings', value: '3 Granted Patents' }
    ],
    deliverables: [
      'Adaptive Layout Engine',
      'Micro-Prism Shader System',
      'Gesture & Saccade Interaction Model',
      'Generative Canvas Spatial Bridge'
    ],
    techStack: ['WebXR', 'Three.js / WebGL', 'Neural Net JS Bridge', 'Custom Matrix Transformers'],
    colorAccent: '#f8fafc',
    frameTarget: 114,
    features: [
      {
        title: 'Cognitive Density Adaptation',
        description: 'Dynamic typographic scale and contrast that adjusts in real time based on eye fixations and focus span.'
      },
      {
        title: 'Liquid Glass Spatial Windows',
        description: 'Layered refractive glass containers with realistic dispersion and ambient occlusion.'
      },
      {
        title: 'Spatial Canvas Orchestration',
        description: 'Infinite 3D node graphing allowing seamless semantic zooming from micro-code snippets to macro architectures.'
      }
    ]
  }
];

export const CAPABILITIES: Capability[] = [
  {
    id: 'spatial-3d',
    index: '01',
    title: 'Parametric 3D & WebGL Shaders',
    tagline: 'Computational geometry & physically accurate shaders',
    description: 'Engineering interactive 3D sculptures, procedural materials, volumetric lighting, and high-performance WebGL/WebGPU pipelines that run at locked 60 FPS.',
    tools: ['Three.js', 'Custom GLSL / WGSL', 'Blender / Houdini', 'Raymarching / SDF'],
    deliverables: ['Custom 3D Engines', 'Interactive Configurators', 'Material Shaders', 'Keyframe Scrubbers']
  },
  {
    id: 'spatial-systems',
    index: '02',
    title: 'Haute Spatial UI & Design Systems',
    tagline: 'Precision typography & liquid-glass architectures',
    description: 'Crafting minimalist, high-contrast digital products and spatial interfaces. Strict typography scales, mathematical padding ratios, and zero visual friction.',
    tools: ['Figma Design Systems', 'Liquid Glass CSS/GLSL', 'Kinetic Splines', 'Design Tokens'],
    deliverables: ['Design Systems', 'Spatial Operating Systems', 'Hardware Companion Apps', 'Web Portals']
  },
  {
    id: 'creative-eng',
    index: '03',
    title: 'Creative Engineering & Architecture',
    tagline: 'Sub-millisecond latency & zero-compromise code',
    description: 'Building full-stack digital flagships, WebAssembly physics pipelines, and inertial momentum engines crafted with artisanal TypeScript and modern standards.',
    tools: ['TypeScript', 'React / Next.js', 'WebAssembly / Rust', 'Vite / Motion'],
    deliverables: ['Bespoke Web Platforms', 'Interactive Portfolios', 'Realtime Systems', 'WebGL Showcases']
  },
  {
    id: 'art-direction',
    index: '04',
    title: 'Art Direction & Computational Art',
    tagline: 'Bridging physical craftsmanship with synthetic digital luxury',
    description: 'Directing visual identities, brand films, kinetic typography, and bespoke interactive installations for luxury, mobility, horology, and high-tech founders.',
    tools: ['Cinema 4D / Octane', 'Generative Algorithms', 'Audio Synthesis', 'Creative Strategy'],
    deliverables: ['Brand Identity Systems', 'CGI Art Direction', 'Interactive Installations', 'Film & Motion']
  }
];

export const CLIENT_ROSTER = [
  { name: 'Polestar Automotive', location: 'Gothenburg', discipline: 'Spatial Cockpit Systems' },
  { name: 'Teenage Engineering', location: 'Stockholm', discipline: 'Synthesizer UI & WebGL' },
  { name: 'Bang & Olufsen', location: 'Struer', discipline: 'Acoustic Visualizers' },
  { name: 'Rimowa', location: 'Cologne', discipline: 'Luggage Configurator 3D' },
  { name: 'Balenciaga', location: 'Paris', discipline: 'Synthetic Runway Canvas' },
  { name: 'Leica Camera', location: 'Wetzlar', discipline: 'Optical Calibration OS' }
];
