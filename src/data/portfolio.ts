import { Project, SkillCategory, Certificate, EducationItem, PersonalInfo } from '../types';

export const PERSONAL_INFO: PersonalInfo = {
  name: 'Adarsh Chaudhary',
  title: 'Computer Science & Engineering Student',
  subtitle: 'Full-Stack Developer • 3D Web Enthusiast • Systems Architect',
  bio: 'CSE undergraduate passionate about high-performance computing, real-time 3D graphics, and crafting scalable full-stack applications with elegant spatial UI.',
  email: 'adarshchaudhary.dev@gmail.com',
  location: 'India',
  githubUrl: 'https://github.com/adarshchaudhary',
  linkedinUrl: 'https://linkedin.com/in/adarshchaudhary',
  cvUrl: 'https://drive.google.com/file/d/1sample_drive_resume_link/view?usp=sharing',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
};
 
export const ABOUT_DATA = {
  sectionNumber: '01',
  tagline: 'COMPUTER SCIENCE & ENGINEERING',
  headline: 'ARCHITECTING CODE FROM',
  headlineAccent: 'SILICON TO SPATIAL CANVASES',
  intro: 'I am a Computer Science & Engineering student bridging core computational fundamentals with modern spatial web engineering, distributed systems, and real-time graphics.',
  pillars: [
    {
      number: '01',
      title: 'Core CS & Algorithms',
      description: 'Strong foundation in Data Structures, Algorithm Optimization, Operating Systems, and clean Object-Oriented/Functional paradigms.',
      accent: '#f6c344'
    },
    {
      number: '02',
      title: 'Full-Stack Engineering',
      description: 'Designing resilient microservices, responsive client architectures, performant REST/GraphQL APIs, and durable database models.',
      accent: '#38bdf8'
    },
    {
      number: '03',
      title: 'Interactive 3D & Graphics',
      description: 'Crafting 60+ FPS WebGL shaders, Three.js spatial simulations, and physics-driven interactive web experiences.',
      accent: '#34d399'
    }
  ],
  stats: [
    { label: 'Problem Solving', value: '450+ Solved' },
    { label: 'Core Tech Stack', value: '15+ Technologies' },
    { label: 'Full-Stack Apps', value: '10+ Deployed' },
    { label: 'Academic Standing', value: 'Top Tier CSE' }
  ]
};

export const SKILLS_DATA: SkillCategory[] = [
  {
    id: 'core-languages',
    category: 'Languages & Core CS',
    iconName: 'Code2',
    description: 'Foundation programming languages and computational problem solving.',
    skills: [
      { name: 'C / C++', level: 'Advanced' },
      { name: 'Java', level: 'Proficient' },
      { name: 'Python', level: 'Advanced' },
      { name: 'TypeScript / JavaScript', level: 'Expert' },
      { name: 'SQL', level: 'Advanced' },
      { name: 'Data Structures & Algorithms', level: 'Advanced' }
    ]
  },
  {
    id: 'frontend-3d',
    category: 'Web & 3D Interactive',
    iconName: 'Layers',
    description: 'Modern reactive frontend frameworks, state management, and real-time GPU rendering.',
    skills: [
      { name: 'React 18+ / Next.js', level: 'Expert' },
      { name: 'Three.js / WebGL / GLSL', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Expert' },
      { name: 'HTML5 / Modern CSS', level: 'Expert' },
      { name: 'Motion / Framer Motion', level: 'Proficient' },
      { name: 'Canvas 2D / SVG Animation', level: 'Proficient' }
    ]
  },
  {
    id: 'backend-cloud',
    category: 'Backend & Cloud Infrastructure',
    iconName: 'Cpu',
    description: 'Scalable server environments, APIs, databases, and continuous delivery.',
    skills: [
      { name: 'Node.js / Express', level: 'Advanced' },
      { name: 'FastAPI / Django', level: 'Proficient' },
      { name: 'PostgreSQL / MySQL', level: 'Advanced' },
      { name: 'MongoDB / Firestore', level: 'Advanced' },
      { name: 'REST & GraphQL APIs', level: 'Advanced' },
      { name: 'Docker / Cloud Run / AWS', level: 'Proficient' }
    ]
  },
  {
    id: 'devops-tools',
    category: 'Engineering Tools & Workflows',
    iconName: 'Sliders',
    description: 'Version control, testing suites, CI/CD pipelines, and design tooling.',
    skills: [
      { name: 'Git & GitHub Workflows', level: 'Expert' },
      { name: 'Linux / Bash Scripting', level: 'Proficient' },
      { name: 'Postman / API Testing', level: 'Advanced' },
      { name: 'Vite / Webpack / Esbuild', level: 'Advanced' },
      { name: 'Figma UI/UX Prototyping', level: 'Advanced' },
      { name: 'System Design Principles', level: 'Proficient' }
    ]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'cosmic-webgl-portal',
    number: '01',
    title: 'AETHERIA 3D PORTAL',
    subtitle: 'High-Performance Spatial Portfolio with Real-Time WebGL Shaders',
    category: 'Full-Stack & Computer Graphics',
    year: '2026',
    client: 'Personal Engineering Showcase',
    role: 'Full-Stack Developer & Graphics Engineer',
    summary: 'A locked 60 FPS interactive 3D WebGL cosmos built with custom ACES filmic tone mapping, particle shatter physics, and responsive typography.',
    description: 'Designed and built from scratch as a spatial computing showcase. Integrates custom GLSL shaders, inertial mouse/touch momentum drag physics, dynamic starburst particle systems, and modular TypeScript components.',
    liveUrl: 'https://ais-dev-jvmyydhlodstfpe4aiv5gz-309930845476.asia-east1.run.app',
    githubUrl: 'https://github.com/adarshchaudhary/cosmic-3d-portfolio',
    metrics: [
      { label: 'Render Performance', value: 'Locked 60 FPS' },
      { label: 'Particle Count', value: '7,000+ Stars' },
      { label: 'Shader Architecture', value: 'GLSL + ACES Tone' },
      { label: 'Lighthouse Score', value: '98/100' }
    ],
    deliverables: [
      'Interactive 3D WebGL Obsidian Engine',
      'Reactive Touch & Drag Inertia Physics',
      'Modular Portfolio Section Hierarchy',
      'Audio Synthesizer Feedback Subsystem'
    ],
    techStack: ['React', 'TypeScript', 'Three.js', 'Tailwind CSS', 'Web Audio API', 'Vite'],
    colorAccent: '#f6c344',
    frameTarget: 42,
    features: [
      {
        title: 'ACES Filmic Tone Mapping',
        description: 'Physical studio environment reflections with custom amber bronze key lighting and cool silver metallic rims.'
      },
      {
        title: 'Cosmic Starburst Transition',
        description: 'Scroll-driven zoom-to-shatter particle transformation propagating 7,000+ stars into deep space.'
      },
      {
        title: 'Zero Latency Audio Haptics',
        description: 'Web Audio API procedural sound synthesizer delivering instantaneous audio feedback on user actions.'
      }
    ]
  },
  {
    id: 'nexus-distributed-compiler',
    number: '02',
    title: 'NEXUS CLOUD IDE & RUNTIME',
    subtitle: 'Collaborative Real-Time Code Execution Engine & MicroVM Sandbox',
    category: 'Distributed Systems & Cloud',
    year: '2025',
    client: 'Open Source Initiative',
    role: 'Lead Systems Architect & Backend Developer',
    summary: 'A low-latency browser-based IDE and containerized multi-language code runner supporting live collaboration via WebSockets.',
    description: 'Engineered a sandboxed code execution pipeline that isolates tenant workloads inside ephemeral Docker containers. Features real-time AST syntax analysis, multiplayer cursor syncing over CRDTs, and low-latency terminal streaming.',
    liveUrl: 'https://nexus-ide-demo.example.com',
    githubUrl: 'https://github.com/adarshchaudhary/nexus-cloud-runtime',
    metrics: [
      { label: 'Execution Latency', value: '< 180ms Cold Start' },
      { label: 'Supported Runtimes', value: '8 Languages' },
      { label: 'Concurrent WebSockets', value: '10k+ Sessions' },
      { label: 'Test Coverage', value: '94% Unit + E2E' }
    ],
    deliverables: [
      'Dockerized MicroVM Sandbox Dispatcher',
      'Monaco Editor Custom LSP Extension',
      'CRDT Multiplayer State Sync Engine',
      'Role-Based Auth & Session Storage'
    ],
    techStack: ['Node.js', 'Go / Docker', 'WebSockets', 'React', 'Redis', 'PostgreSQL'],
    colorAccent: '#38bdf8',
    frameTarget: 68,
    features: [
      {
        title: 'Ephemeral Container Sandboxing',
        description: 'Hardened cgroups and memory quotas preventing security privilege escalation during code compilation.'
      },
      {
        title: 'Real-time CRDT Document Sync',
        description: 'Conflict-free replicated data types ensuring zero collision during concurrent multi-developer code editing.'
      },
      {
        title: 'Integrated Terminal Streaming',
        description: 'Full xterm.js PTY bidirectional pipe streaming standard output and error in real-time.'
      }
    ]
  },
  {
    id: 'synapse-ai-vision',
    number: '03',
    title: 'SYNAPSE AI VISION ANALYTICS',
    subtitle: 'Edge Computer Vision & Real-Time Object Telemetry Dashboard',
    category: 'Artificial Intelligence & Computer Vision',
    year: '2025',
    client: 'Autonomous Research Lab',
    role: 'Computer Vision & Full-Stack Developer',
    summary: 'Real-time edge video inference pipeline detecting, tracking, and graphing spatio-temporal trajectories with sub-30ms inference.',
    description: 'Built a deep learning vision pipeline integrating YOLOv8 and TensorRT for real-time video stream ingestion. Outputs spatio-temporal heatmaps, anomaly detection alerts, and dynamic visual telemetry over a sleek dark-mode analytical dashboard.',
    liveUrl: 'https://synapse-vision-demo.example.com',
    githubUrl: 'https://github.com/adarshchaudhary/synapse-ai-vision',
    metrics: [
      { label: 'Inference Speed', value: '32 FPS @ 1080p' },
      { label: 'Model Accuracy', value: '91.8% mAP@50' },
      { label: 'Data Ingestion', value: 'RTSP / WebRTC' },
      { label: 'Telemetry Graphs', value: 'D3.js Realtime' }
    ],
    deliverables: [
      'TensorRT Optimized Inference Pipeline',
      'WebRTC Video Stream Relay Server',
      'Analytical Trajectory Heatmap Canvas',
      'Alerting & Anomaly Notification Webhook'
    ],
    techStack: ['Python / PyTorch', 'FastAPI', 'OpenCV', 'React', 'D3.js', 'Docker'],
    colorAccent: '#34d399',
    frameTarget: 95,
    features: [
      {
        title: 'Optimized TensorRT Execution',
        description: 'Quantized INT8 inference running on edge GPUs delivering ultra-low inference latency.'
      },
      {
        title: 'Live WebRTC Video Stream Ingestion',
        description: 'Zero-buffer peer-to-peer video streaming feeding bounding box predictions straight to the canvas.'
      },
      {
        title: 'D3 Spatio-Temporal Trajectory Graphs',
        description: 'Interactive analytical charts tracking object velocities, zone counts, and temporal density heatmaps.'
      }
    ]
  },
  {
    id: 'hyperion-fintech',
    number: '04',
    title: 'HYPERION CRYPTO & ASSET OS',
    subtitle: 'High-Throughput Algorithmic Trading Analytics & Orderbook Visualizer',
    category: 'Fintech & Systems Engineering',
    year: '2024',
    client: 'Quantitative Systems Project',
    role: 'Full-Stack Systems Engineer',
    summary: 'A sub-millisecond Level-2 orderbook visualizer and algorithmic backtesting engine streaming live tick data across global exchanges.',
    description: 'Built a high-frequency financial dashboard processing 50,000+ ticks/sec via memory-mapped circular ring buffers. Features depth chart visualization, automated MACD/RSI strategy backtesting, and automated risk threshold alerts.',
    liveUrl: 'https://hyperion-terminal.example.com',
    githubUrl: 'https://github.com/adarshchaudhary/hyperion-orderbook-os',
    metrics: [
      { label: 'Throughput', value: '50k Ticks / Sec' },
      { label: 'UI Refresh', value: 'Locked 60 FPS' },
      { label: 'Ring Buffer', value: 'Zero Allocation' },
      { label: 'Backtest Engine', value: 'Vectorized Numpy' }
    ],
    deliverables: [
      'Level-2 Real-Time Orderbook Depth Chart',
      'WebSocket Market Feed Aggregator',
      'Vectorized Strategy Backtesting Suite',
      'Exportable Trade Execution Ledger'
    ],
    techStack: ['TypeScript', 'Node.js', 'Python', 'WebGL / Canvas', 'PostgreSQL', 'Redis'],
    colorAccent: '#a855f7',
    frameTarget: 114,
    features: [
      {
        title: 'Real-Time Orderbook Depth Canvas',
        description: 'Hardware-accelerated visual depth chart updating 60 times per second with bid-ask spread heatmaps.'
      },
      {
        title: 'Vectorized Strategy Backtester',
        description: 'Simulates historical market conditions with slippage models to evaluate Sharpe ratio and max drawdown.'
      },
      {
        title: 'Zero Garbage Collector Spikes',
        description: 'ArrayBuffer pooling and typed arrays preventing frame drops during high-volatility tick floods.'
      }
    ]
  }
];

export const ACHIEVEMENTS_DATA: Certificate[] = [
  {
    id: 'cert-aws-cloud',
    number: '01',
    title: 'AWS Certified Cloud Practitioner / Solutions',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: '2025',
    credentialId: 'AWS-CERT-98234710',
    verificationUrl: 'https://aws.amazon.com/verification',
    certificateImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    badgeColor: '#f59e0b',
    category: 'Cloud Architecture & DevOps',
    skillsCovered: ['Cloud Infrastructure', 'EC2 & S3', 'Serverless Lambda', 'IAM & Cloud Security', 'VPC Networking'],
    description: 'Demonstrated deep foundational knowledge of AWS cloud services, high-availability architecture design, and cost optimization methodologies.'
  },
  {
    id: 'cert-meta-fullstack',
    number: '02',
    title: 'Meta Full-Stack Software Engineer Professional',
    issuer: 'Meta / Coursera',
    issueDate: '2025',
    credentialId: 'META-FS-84920193',
    verificationUrl: 'https://www.coursera.org/verify/professional-cert/meta',
    certificateImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    badgeColor: '#0ea5e9',
    category: 'Full-Stack Software Engineering',
    skillsCovered: ['React & Advanced State', 'Django & Python Backend', 'Relational Databases & SQL', 'API Architecture', 'CI/CD & Testing'],
    description: 'Comprehensive 9-course professional specialization covering modern frontend engineering, relational database schema design, and production deployment.'
  },
  {
    id: 'cert-dsa-leetcode',
    number: '03',
    title: 'Data Structures & Algorithms Mastery Specialization',
    issuer: 'Computer Science Department / UCSD',
    issueDate: '2024',
    credentialId: 'UCSD-DSA-77491028',
    verificationUrl: 'https://coursera.org/verify/dsa-specialization',
    certificateImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    badgeColor: '#10b981',
    category: 'Algorithms & Computational Complexity',
    skillsCovered: ['Dynamic Programming', 'Graph Algorithms', 'Trees & Heaps', 'Asymptotic Big-O Analysis', 'NP-Completeness'],
    description: 'Rigorous algorithmic problem solving covering graph theory, network flows, string algorithms, and dynamic programming optimization.'
  },
  {
    id: 'cert-hackathon-winner',
    number: '04',
    title: '1st Place Winner — National Web3 & AI Hackathon',
    issuer: 'National Innovation Council & IEEE',
    issueDate: '2025',
    credentialId: 'IEEE-HACK-WINNER-2025',
    verificationUrl: 'https://ieee.org/hackathon-awards',
    certificateImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    badgeColor: '#ec4899',
    category: 'Hackathon Award & Innovation',
    skillsCovered: ['Rapid Prototyping', 'Generative AI Pipelines', 'Smart Contracts', 'Team Leadership', 'Pitch & Demo'],
    description: 'Awarded First Place out of 180+ competitive engineering teams for developing an automated autonomous disaster triage agent powered by edge computer vision.'
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'btech-cse',
    number: '01',
    degree: 'Bachelor of Technology (B.Tech)',
    major: 'Computer Science & Engineering',
    institution: 'National Institute of Technology / Engineering University',
    location: 'India',
    period: '2022 – 2026 (Expected)',
    gpa: '8.8 / 10.0 CGPA',
    status: 'Final Year Undergraduate',
    coursework: [
      'Data Structures & Algorithms',
      'Operating Systems & Kernel Concepts',
      'Database Management Systems (DBMS)',
      'Computer Networks & Protocols',
      'Object-Oriented Software Engineering',
      'Compiler Design & Automata Theory',
      'Computer Graphics & Web Technologies',
      'Distributed Systems & Cloud Computing'
    ],
    highlights: [
      'Dean\'s List / Academic Excellence Award for Top 5% standing in CSE cohort',
      'Lead Technical Coordinator for Annual Engineering Symposium & Hackathon',
      'Published research paper preprint on Real-Time WebGL Shader Optimization'
    ]
  },
  {
    id: 'higher-secondary',
    number: '02',
    degree: 'Higher Secondary School Certificate (Class XII)',
    major: 'Science Stream (Physics, Chemistry, Mathematics & Computer Science)',
    institution: 'Senior Secondary Academy',
    location: 'India',
    period: '2020 – 2022',
    gpa: '94.6% Distinction',
    status: 'Completed with Honors',
    coursework: [
      'Advanced Mathematics & Calculus',
      'Physics & Classical Mechanics',
      'Computer Science (C++ & Python OOP)',
      'Linear Algebra & Statistics'
    ],
    highlights: [
      'School Topper in Computer Science & Mathematics Olympiad',
      'Qualified National Level Engineering Entrance Examination (JEE) in top 1.5 percentile'
    ]
  }
];
