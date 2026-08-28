export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  client: string;
  role: string;
  summary: string;
  description: string;
  metrics: {
    label: string;
    value: string;
  }[];
  deliverables: string[];
  techStack: string[];
  colorAccent: string;
  frameTarget: number; // 0 to 120
  features: {
    title: string;
    description: string;
  }[];
}

export interface Capability {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  tools: string[];
  deliverables: string[];
}

export type ViewMode = 'keyframes' | 'webgl' | 'wireframe' | 'material-study';

export interface MaterialChapter {
  id: number;
  chapter: string;
  alloy: string;
  title: string;
  subtitle: string;
  lede: string;
  colorHex: string;
  metalness: number;
  roughness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  envMapIntensity: number;
  specs: {
    label: string;
    value: string;
  }[];
  notes: string;
}

export interface ScrollState {
  current: number; // 0.0 to 1.0
  target: number;  // 0.0 to 1.0
  velocity: number;
  direction: 'down' | 'up' | 'idle';
  currentFrame: number; // 1 to 120
}
