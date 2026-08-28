# 🌌 Kairos — High-End 3D Interactive Design Portfolio

An immersive, futuristic, scroll-driven 3D web experience built with **React 19**, **TypeScript**, **Three.js (WebGL)**, and **Tailwind CSS**. *Kairos* features a continuous 3D torus knot transformation engine, starfield particle system, interactive project showcase, material study sandbox, synthesized spatial sound effects, and HUD control center.

---

## ✨ Features

- **🌀 Dynamic 3D WebGL Engine**: Real-time rendering of a shiny glass torus knot with dynamic lighting, smooth camera track zooming, structural shatter physics, and cosmic starfield particle animations.
- **🎛️ Multi-View Rendering Modes**:
  - **WebGL 3D Mode**: GPU-accelerated interactive 3D scene driven by smooth scroll progress.
  - **Canvas Scrubber Mode**: Frame-by-frame 2D image sequence scrubber fallback with real-time FPS & buffer load HUD monitoring.
  - **Material Study Sandbox**: Dedicated interactive 3D shader and material inspection workbench with custom physics, lighting, and geometric controls.
- **🪐 Work Constellation Showcase**: Interactive portfolio case studies featuring deep modal inspection, project statistics, tech stack badges, and visual previews.
- **🍱 Capabilities Bento Grid**: Modern grid highlighting UX/UI Architecture, WebGL & 3D Shaders, Spatial Audio Design, and AI Integration.
- **📡 Contact Terminal & Singularity**: High-contrast contact screen with interactive feedback and back-to-top navigation.
- **🎵 Synthesized Web Audio FX**: Custom Web Audio API sound effects for interactive clicks, frame ticks, modal toggles, and ambient UI cues.
- **⌨️ Keyboard Controlled Navigation**: Use directional arrows to step through animation frames and `Space` to toggle continuous auto-warp mode.

---

## 🛠️ Tech Stack

- **Framework**: React 19, Vite 6
- **Language**: TypeScript
- **3D Graphics & Physics**: Three.js, `@types/three`
- **Styling & Fonts**: Tailwind CSS v4, Google Fonts (*Space Grotesk*)
- **Animations & Icons**: Motion (Framer Motion), Lucide React
- **Audio Engine**: Custom Web Audio API Synthesizer
- **Visual Utilities**: Canvas Confetti

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/kairos-design-portfolio.git
   cd "Kairos_Design Portfolio"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| --- | --- |
| `→` / `↓` | Advance 3D animation frame |
| `←` / `↑` | Reverse 3D animation frame |
| `Space` | Toggle Auto-Warp / Continuous Animation Loop |
| `Esc` | Close Project Modal / Exit Material Study |

---

## 📁 Project Structure

```
Kairos_Design Portfolio/
├── public/                # Static public assets
├── scripts/               # Frame generation & build utility scripts
├── src/
│   ├── components/        # React & WebGL UI components
│   │   ├── ThreeCanvas.tsx         # WebGL 3D Torus Knot & Starfield Engine
│   │   ├── CanvasScrubber.tsx      # 2D frame-by-frame fallback engine
│   │   ├── MaterialStudy.tsx       # 3D material inspection sandbox
│   │   ├── Navigation.tsx          # Top HUD navigation bar & mode toggles
│   │   ├── HeroOverlay.tsx         # Section 1: Hero title & entry CTA
│   │   ├── ManifestoOverlay.tsx    # Section 2: Interactive studio manifesto
│   │   ├── CaseStudiesOverlay.tsx  # Section 3: Work showcase grid
│   │   ├── CaseStudyModal.tsx      # Detailed project inspection modal
│   │   ├── CapabilitiesOverlay.tsx # Section 4: Bento grid capabilities
│   │   └── ContactOverlay.tsx      # Section 5: Deep singularity contact form
│   ├── data/              # Projects, case studies, and studio metadata
│   ├── hooks/             # Smooth scroll & frame calculation custom hooks
│   ├── utils/             # Web Audio synthesizer & utility functions
│   ├── types.ts           # TypeScript type definitions
│   ├── App.tsx            # Main application layout & view state controller
│   └── main.tsx           # React DOM root entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 📄 License

Apache-2.0 License. Designed & Developed for **Kairos Studio**.
