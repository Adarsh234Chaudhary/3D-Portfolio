import { Project, SkillCategory, Certificate, EducationItem, PersonalInfo } from '../types';

export const PERSONAL_INFO: PersonalInfo = {
  name: 'Adarsh Chaudhary',
  title: 'Computer Science & Engineering Student (2nd Year)',
  subtitle: 'Full-Stack Developer • IoT Systems Enthusiast • Cyber Safety Advocate',
  bio: '2nd-year CSE undergraduate at Lovely Professional University passionate about building scalable full-stack web applications, embedded IoT safety hardware, and driving community digital literacy & cybersecurity awareness.',
  email: 'adarshchaudhary.dev@gmail.com',
  location: 'Phagwara, Punjab / Amroha, UP, India',
  githubUrl: 'https://github.com/Adarsh234Chaudhary', // Sample URL - Edit with your GitHub link
  linkedinUrl: 'https://linkedin.com/in/your-linkedin-profile', // Sample URL - Edit with your LinkedIn link
  cvUrl: 'https://drive.google.com/file/d/your_drive_cv_id/view?usp=sharing', // Sample URL - Edit with your CV link
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
};

export const ABOUT_DATA = {
  sectionNumber: '01',
  tagline: 'COMPUTER SCIENCE & ENGINEERING (2ND YEAR)',
  headline: 'BUILDING PRACTICAL SOLUTIONS FROM',
  headlineAccent: 'FULL-STACK TO IOT & CYBER SAFETY',
  intro: 'I am a 2nd-year Computer Science & Engineering student at Lovely Professional University, bridging core programming fundamentals (Python, C/C++, JavaScript, React) with real-world full-stack applications, IoT safety systems, and community cybersecurity education.',
  pillars: [
    {
      number: '01',
      title: 'Languages & Algorithms',
      description: 'Strong foundation in Python, C, C++, Data Structures, Algorithms, Object-Oriented Logic, and fundamental problem solving.',
      accent: '#f6c344'
    },
    {
      number: '02',
      title: 'Full-Stack Web Development',
      description: 'Building dual-interface web platforms and REST APIs using React, JavaScript, Node.js, Express.js, MongoDB, and Tailwind CSS.',
      accent: '#38bdf8'
    },
    {
      number: '03',
      title: 'IoT & Cyber Safety Drive',
      description: 'Engineering ESP32 IoT gas leak detection hardware and leading WNS Cares Foundation CyberSmart awareness drives for 40+ community members.',
      accent: '#34d399'
    }
  ],
  stats: [
    { label: 'Academic Standing', value: '2nd Year B.Tech CSE' },
    { label: 'University', value: 'Lovely Professional Univ' },
    { label: 'Community Learners', value: '40 Educated' },
    { label: 'Core Projects', value: '3 Active Projects' }
  ]
};

export const SKILLS_DATA: SkillCategory[] = [
  {
    id: 'core-languages',
    category: 'Languages & Core CS',
    iconName: 'Code2',
    description: 'Core programming languages, algorithmic logic, and fundamental computer science concepts.',
    skills: [
      { name: 'Python', level: 'Proficient' },
      { name: 'C', level: 'Proficient' },
      { name: 'C++', level: 'Proficient' },
      { name: 'JavaScript', level: 'Proficient' },
      { name: 'React', level: 'Proficient' },
      { name: 'Data Structures & Algorithms', level: 'Intermediate' }
    ]
  },
  {
    id: 'web-technologies',
    category: 'Web Development & Design',
    iconName: 'Layers',
    description: 'Frontend frameworks, responsive web styling, and modern user interface design.',
    skills: [
      { name: 'HTML5', level: 'Advanced' },
      { name: 'CSS3', level: 'Advanced' },
      { name: 'React.js', level: 'Proficient' },
      { name: 'Tailwind CSS', level: 'Proficient' },
      { name: 'TypeScript', level: 'Intermediate' },
      { name: 'Three.js / React Three Fiber', level: 'Basic' }
    ]
  },
  {
    id: 'backend-databases',
    category: 'Databases & Developer Tools',
    iconName: 'Cpu',
    description: 'Relational & NoSQL databases, backend APIs, version control, and dev tools.',
    skills: [
      { name: 'MongoDB', level: 'Proficient' },
      { name: 'MySQL', level: 'Proficient' },
      { name: 'Git & GitHub', level: 'Proficient' },
      { name: 'Node.js', level: 'Intermediate' },
      { name: 'Express.js', level: 'Intermediate' },
      { name: 'Postman / REST APIs', level: 'Intermediate' }
    ]
  },
  {
    id: 'hardware-softskills',
    category: 'IoT, Security & Soft Skills',
    iconName: 'Sliders',
    description: 'Hardware microcontrollers, cyber safety awareness drives, and interpersonal competencies.',
    skills: [
      { name: 'ESP32 & IoT Hardware', level: 'Proficient' },
      { name: 'Cyber Safety & Hygiene Drive', level: 'Advanced' },
      { name: 'Problem Solving', level: 'Advanced' },
      { name: 'Team Collaboration', level: 'Advanced' },
      { name: 'Time Management', level: 'Advanced' },
      { name: 'Adaptability', level: 'Advanced' }
    ]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'premium-restaurant-platform',
    number: '01',
    title: 'PREMIUM RESTAURANT ORDERING & MANAGEMENT PLATFORM',
    subtitle: 'Full-Stack Restaurant Ecosystem with Dual Interfaces, RBAC & 3D Food Model Rendering',
    category: 'Full-Stack Web Development',
    year: 'May 2026 - June 2026',
    client: 'Full-Stack Academic & Portfolio Project',
    role: 'Full-Stack Developer',
    summary: 'Architected a full-stack restaurant ordering & management platform featuring dual interfaces for customers and restaurant admins.',
    description: 'Engineered a complete restaurant management platform with customer ordering/cart/checkout workflows and an admin portal (menu CRUD, order tracking, revenue analytics). Developed 35+ REST APIs and 20+ Mongoose schemas with Node.js, Express, and MongoDB. Implemented RBAC with JWT (Access/Refresh tokens) and Google OAuth 2.0. Built an interactive frontend using React 19, Vite, Tailwind CSS, Framer Motion, and 3D food model rendering via React Three Fiber. Integrated Razorpay payment gateway, Cloudinary image pipelines, and automated invoice generation.',
    liveUrl: 'https://restaurant-app-sample.vercel.app', // Sample URL - Edit with your live project link
    githubUrl: 'https://github.com/Adarsh234Chaudhary/restaurant-ordering-platform', // Sample URL - Edit with your GitHub repo link
    metrics: [
      { label: 'REST APIs', value: '35+ Endpoints' },
      { label: 'Mongoose Schemas', value: '20+ Models' },
      { label: '3D Graphics', value: 'React Three Fiber' },
      { label: 'Authentication', value: 'JWT + Google OAuth' }
    ],
    deliverables: [
      'Customer Ordering, Cart & Live Checkout Interface',
      'Admin CRUD Menu Management & Revenue Dashboard',
      'Razorpay Payment Gateway & Automated Invoice System',
      'React Three Fiber Interactive 3D Food Model Viewer'
    ],
    techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'TypeScript', 'Three.js', 'Cloudinary API', 'Razorpay API', 'JWT', 'Google OAuth 2.0'],
    colorAccent: '#f6c344',
    frameTarget: 42,
    features: [
      {
        title: 'Dual Interface & RBAC Security',
        description: 'Enforced role-based access control protecting admin endpoints (menu CRUD, order tracking, revenue analytics) alongside customer checkout flows.'
      },
      {
        title: '3D Food Model Canvas',
        description: 'Interactive spatial food visualization built with React Three Fiber to allow customers to preview menu items in 3D.'
      },
      {
        title: 'Payment Gateway & Cloud Pipelines',
        description: 'Integrated Razorpay transaction validation, Cloudinary image upload workflows, and automated PDF invoice generation.'
      }
    ]
  },
  {
    id: 'iot-lpg-leak-detector',
    number: '02',
    title: 'IOT LPG LEAK DETECTOR SYSTEM',
    subtitle: 'ESP32-Based Safety System with Real-Time Web Dashboard, Auto Valve Shutoff & SMTP Alerts',
    category: 'IoT & Embedded Systems',
    year: 'Jan 2026 - April 2026',
    client: 'IoT Hardware Engineering Project',
    role: 'Embedded Hardware Developer',
    summary: 'Developed an ESP32-based gas detection system with live web dashboard monitoring, servo shutoff valve, relay exhaust fan, and email alerts.',
    description: 'Built an ESP32-based IoT LPG leak detection system utilizing an MQ-series gas sensor for continuous safety monitoring. Developed a responsive web dashboard using HTML, CSS, JavaScript, ESPAsyncWebServer, and ArduinoJson for live status visualization. Implemented configurable gas thresholds, automatic LPG valve shutoff via servo motor, and exhaust fan activation via relay during leak conditions. Configured visual/aural alerts (blinking red RGB LED + buzzer) and non-blocking SMTP email notifications with a 5-minute cooldown.',
    liveUrl: 'https://iot-lpg-dashboard-sample.vercel.app', // Sample URL - Edit with your live demo link
    githubUrl: 'https://github.com/Adarsh234Chaudhary/iot-lpg-leak-detector', // Sample URL - Edit with your GitHub repo link
    metrics: [
      { label: 'Gas Sensor', value: 'MQ-Series LPG' },
      { label: 'Auto Interventions', value: 'Servo + Relay' },
      { label: 'Web Server', value: 'ESPAsyncWebServer' },
      { label: 'Alert Cooldown', value: '5-Min Cooldown' }
    ],
    deliverables: [
      'ESP32 C/C++ Hardware Firmware & Logic',
      'Embedded HTML/CSS/JS Responsive Status Dashboard',
      'Automated Servo Valve & Relay Fan Hardware Control',
      'Non-Blocking SMTP Email Notification Pipeline'
    ],
    techStack: ['ESP32', 'C/C++', 'MQ Gas Sensor', 'HTML', 'CSS', 'JavaScript', 'ESPAsyncWebServer', 'ArduinoJson', 'Servo Motor', 'Relay', 'SMTP Email'],
    colorAccent: '#38bdf8',
    frameTarget: 68,
    features: [
      {
        title: 'Automated Hardware Emergency Intervention',
        description: 'Triggers instant servo motor valve closure and relay-driven exhaust fan activation when gas threshold is exceeded.'
      },
      {
        title: 'Embedded Web Dashboard',
        description: 'Hosted directly on the ESP32 via ESPAsyncWebServer for local Wi-Fi monitoring and remote manual override.'
      },
      {
        title: 'Non-Blocking SMTP Alert System',
        description: 'Dispatches automated email notifications containing gas level, timestamp, IP address, and status with 5-minute anti-spam cooldown.'
      }
    ]
  },
  {
    id: 'wns-cyber-safety-cdp',
    number: '03',
    title: 'COMMUNITY CYBER SAFETY & DIGITAL LITERACY DRIVE',
    subtitle: 'WNS Cares Foundation (WCF) Collaborative Social Impact Project Educating 40 Community Learners',
    category: 'Social Impact & Cyber Security',
    year: '2026',
    client: 'WNS Cares Foundation (WCF) & Lovely Professional University',
    role: 'Community Project Lead & Student Facilitator',
    summary: 'Led a community development project addressing digital literacy and cyber safety for 40 participants across different age groups.',
    description: 'Collaborated with WNS Cares Foundation (WCF) to combat digital illiteracy, phishing scams, OTP frauds, and data privacy threats. Conducted hands-on sessions for 40 learners—ranging from primary school children to university students and community elders. Guided participants through WCF CyberSmart e-learning video modules, conducted interactive practical scenarios (identifying phishing links, setting strong passwords, securing accounts), facilitated assessments, and issued official unique certificates.',
    liveUrl: 'https://cybersmart.wnscaresfoundation.org', // Sample URL - Edit with your certificate/organization link
    githubUrl: 'https://github.com/Adarsh234Chaudhary/cdp-cyber-safety-drive', // Sample URL - Edit with your project report/slides link
    metrics: [
      { label: 'Learners Educated', value: '40 Certified' },
      { label: 'Completion Rate', value: '100% Passed' },
      { label: 'Age Group Diversity', value: 'Kids to Elders' },
      { label: 'Reference IDs Tracked', value: '40 Certificates' }
    ],
    deliverables: [
      '11-Phase Structured Community Learning Framework',
      'WCF CyberSmart Video Guidance & Practical Sessions',
      'Bilingual (Hindi/English) Glossary Cards & Visual Posters',
      'Complete Certificate Excel Register & Geo-Tagged Documentation'
    ],
    techStack: ['WCF CyberSmart Portal', 'Digital Literacy', 'Cyber Hygiene', 'Phishing Awareness', 'Community Outreach', 'Documentation'],
    colorAccent: '#34d399',
    frameTarget: 95,
    features: [
      {
        title: '100% Certified Learner Outcome',
        description: 'Empowered 40 diverse individuals to successfully finish CyberSmart modules, clear assessments, and obtain digital certificates.'
      },
      {
        title: 'Practical Cyber Safety Training',
        description: 'Educated learners on identifying phishing messages, protecting OTPs, creating robust passwords, and avoiding online scams.'
      },
      {
        title: 'Bilingual Educational Materials',
        description: 'Distributed glossary cards with common cyber terms in Hindi and English alongside visual posters for lasting impact.'
      }
    ]
  }
];

export const ACHIEVEMENTS_DATA: Certificate[] = [
  {
    id: 'cert-wns-cybersmart',
    number: '01',
    title: 'Cyber Safety & Digital Literacy Facilitator Certificate',
    issuer: 'WNS Cares Foundation (WCF) & LPU',
    issueDate: '2026',
    credentialId: ' ADAINDUTT6050DFSONOTH', // Sample ID - Edit with your actual certificate ID
    certificateImage: 'https://lh3.googleusercontent.com/d/12xqAGKNMhpPP8uoMb2CowxXFQGMVMYv0',
    badgeColor: '#34d399',
    category: 'Community Impact & Cyber Safety',
    skillsCovered: ['Cyber Hygiene', 'Phishing Prevention', 'Digital Literacy', 'Community Leadership', 'Data Privacy'],
    description: 'Awarded for conducting a 40-learner cyber safety awareness drive in collaboration with WNS Cares Foundation, empowering community members with online safety skills.'
  },
  {
    id: 'cert-gfg-cpp',
    number: '02',
    title: 'C++ Skill Up Certification',
    issuer: 'GeeksforGeeks',
    issueDate: 'June 2026',
    credentialId: 'GFG-CPP-SKILLUP-2026-SAMPLE', // Sample ID - Edit with your actual certificate ID
    certificateImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
    badgeColor: '#f59e0b',
    category: 'Programming Languages',
    skillsCovered: ['C++ Fundamentals', 'Object-Oriented Programming', 'Pointers & Memory', 'Data Structures', 'Problem Solving'],
    description: 'Successfully completed the GFG C++ Skill Up certification validating proficiency in C++ syntax, object-oriented concepts, memory management, and data structures.'
  },
  {
    id: 'cert-iamneo-programming',
    number: '03',
    title: 'Certificate in Computer Programming (150 Hours Course)',
    issuer: 'iamNeo',
    issueDate: 'May 2026',
    credentialId: 'IAMNEO-CP150-2026-SAMPLE', // Sample ID - Edit with your actual certificate ID
    certificateImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    badgeColor: '#38bdf8',
    category: 'Software Engineering',
    skillsCovered: ['Algorithmic Logic', 'Data Structures', 'C / C++ Programming', 'Code Optimization', 'Hands-on Coding'],
    description: 'Completed an intensive 150-hour computer programming course covering foundational algorithms, problem-solving techniques, and coding practice.'
  },
  {
    id: 'cert-infosys-ml-python',
    number: '04',
    title: 'Explore Machine Learning using Python',
    issuer: 'Infosys Springboard',
    issueDate: 'Mar 2026',
    credentialId: 'INFYS-ML-PY-2026-SAMPLE', // Sample ID - Edit with your actual certificate ID
    certificateImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    badgeColor: '#a855f7',
    category: 'Artificial Intelligence & Data Science',
    skillsCovered: ['Python for Data Science', 'NumPy & Pandas', 'Supervised Learning', 'Scikit-Learn', 'Data Preprocessing'],
    description: 'Gained foundational knowledge in Machine Learning algorithms, data analysis, and predictive modeling using Python and Scikit-Learn.'
  },
  {
    id: 'cert-gfg-c',
    number: '05',
    title: 'C Skill Up Certification',
    issuer: 'GeeksforGeeks',
    issueDate: 'Feb 2026',
    credentialId: 'GFG-C-SKILLUP-2026-SAMPLE', // Sample ID - Edit with your actual certificate ID
    certificateImage: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80',
    badgeColor: '#ec4899',
    category: 'Core Programming',
    skillsCovered: ['C Fundamentals', 'Pointers & Dynamic Memory', 'Structures', 'File Handling', 'Logic Building'],
    description: 'Certified in C programming fundamentals, procedural logic, array manipulations, and dynamic memory allocations.'
  },
  {
    id: 'achievement-actopia-3rd',
    number: '06',
    title: '3rd Position — Actopia Role Play Competition',
    issuer: 'University Competition',
    issueDate: '2026',
    credentialId: 'ACTOPIA-3RD-POS-2026',
    certificateImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    badgeColor: '#eab308',
    category: 'Extracurricular Achievement',
    skillsCovered: ['Public Speaking', 'Role Play', 'Creative Expression', 'Team Collaboration', 'Communication'],
    description: 'Achieved 3rd position in Actopia, a university-level role play competition demonstrating strong creative performance, teamwork, and presentation skills.'
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'btech-cse-lpu',
    number: '01',
    degree: 'Bachelor of Technology (B.Tech)',
    major: 'Computer Science and Engineering',
    institution: 'Lovely Professional University',
    location: 'Phagwara, Punjab, India',
    period: 'Aug 2024 – Present (2nd Year)',
    gpa: 'Pursuing (2nd Year)',
    status: '2nd Year Undergraduate',
    coursework: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming (C++ / Python)',
      'Database Management Systems (MySQL / MongoDB)',
      'Web Technologies (HTML, CSS, JavaScript, React)',
      'Computer Networks & Operating Systems',
      'IoT & Microcontroller Systems'
    ],
    highlights: [
      '2nd-year CSE student building full-stack web platforms and IoT hardware devices',
      'Collaborated with WNS Cares Foundation to lead CyberSmart drive educating 40 learners',
      'Achieved 3rd position in Actopia university role play competition'
    ]
  },
  {
    id: 'higher-secondary-ms',
    number: '02',
    degree: 'Higher Secondary Education (Class XII)',
    major: 'Science Stream (Physics, Chemistry, Mathematics & CS)',
    institution: 'M S Senior Secondary Public School',
    location: 'Amroha, Uttar Pradesh, India',
    period: 'May 2024 – Mar 2025',
    gpa: 'Completed',
    status: 'Higher Secondary Certificate',
    coursework: [
      'Physics & Mechanics',
      'Chemistry',
      'Advanced Mathematics',
      'Computer Science Fundamentals'
    ],
    highlights: [
      'Developed strong analytical and computational foundations in mathematics and science',
      'Participated in school technical activities and academic exhibitions'
    ]
  },
  {
    id: 'secondary-ms',
    number: '03',
    degree: 'Secondary Education (Class X)',
    major: 'General Science & Mathematics',
    institution: 'M S Senior Secondary Public School',
    location: 'Amroha, Uttar Pradesh, India',
    period: 'Jun 2023 – Mar 2024',
    gpa: 'Completed',
    status: 'Secondary Education Certificate',
    coursework: [
      'Mathematics',
      'General Science',
      'Social Sciences',
      'English & Languages'
    ],
    highlights: [
      'Actively participated in school academic events and extracurricular competitions'
    ]
  }
];

