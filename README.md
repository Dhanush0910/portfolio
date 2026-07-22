# Dhanush T — Developer Portfolio

A premium, interactive developer portfolio built with React 19, Vite, and Framer Motion. Features a cinematic full-screen section scroller, custom WebGL backgrounds, dark/light mode, and rich micro-animations.

---

## ✨ Features

- **Full-screen section scroller** — Smooth wheel & touch navigation between sections with spring animations
- **WebGL backgrounds** — Custom OGL-powered animated slat background and ferrofluid hero effect
- **Orbital Core** — Canvas-based animated centerpiece on the hero section
- **HUD Nodes** — Ambient floating node overlay across the whole page
- **Dark / Light mode** — Persistent theme toggle
- **Terminal section** — Interactive typed-text terminal component
- **Timeline** — Animated experience / education timeline
- **Project Showcase** — Filterable project cards with live demo & repo links
- **Contact card** — Social links and direct contact info
- **Keyboard navigation** — `↑` / `↓` or `PageUp` / `PageDown` to move between sections

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build tool | Vite 6 |
| Styling | Tailwind CSS v4 + Vanilla CSS |
| Animations | Motion (Framer Motion) |
| WebGL | OGL |
| Icons | Lucide React |
| Language | TypeScript |

---

## 📁 Project Structure

```
Dhanush_Portfolio/
├── public/              # Static assets
├── src/
│   ├── components/      # All UI components
│   │   ├── Header.tsx
│   │   ├── SectionScroller.tsx
│   │   ├── SlatBackground.tsx
│   │   ├── HUDNodes.tsx
│   │   ├── OrbitalCore.tsx
│   │   ├── Ferrofluid.tsx
│   │   ├── AboutSection.tsx
│   │   ├── Timeline.tsx
│   │   ├── ProjectShowcase.tsx
│   │   ├── Terminal.tsx
│   │   └── ContactCard.tsx
│   ├── App.tsx          # Root component & section composition
│   ├── main.tsx         # Entry point
│   ├── index.css        # Global styles & design tokens
│   └── types.ts         # Shared TypeScript types
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later

### Install & Run

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/Dhanush_Portfolio.git
cd Dhanush_Portfolio

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The production-ready files will be output to the `dist/` folder.

### Preview Production Build Locally

```bash
npm run preview
```

---

## ☁️ Deploying to Vercel

### Option A — Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from the project root:**
   ```bash
   vercel
   ```
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`

4. **To deploy to production:**
   ```bash
   vercel --prod
   ```

---

### Option B — Vercel Dashboard (GitHub Integration)

1. Push your code to a **GitHub repository**.

2. Go to [vercel.com](https://vercel.com) → **Add New Project**.

3. Import your GitHub repository.

4. Vercel auto-detects **Vite** — confirm these settings:
   | Setting | Value |
   |---|---|
   | Framework Preset | Vite |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |

5. Click **Deploy**. ✅

Every future push to `main` will automatically trigger a new deployment.

---

## 🔧 Customization

To update the portfolio content, edit these files:

| What to change | File |
|---|---|
| Personal info, hero text | `src/App.tsx` |
| Navigation links | `src/components/Header.tsx` |
| Skills & about text | `src/components/AboutSection.tsx` |
| Work & education history | `src/components/Timeline.tsx` |
| Projects list | `src/components/ProjectShowcase.tsx` |
| Contact links | `src/components/ContactCard.tsx` |
| Global colors / fonts | `src/index.css` |

---

## 📄 License

MIT © Dhanush T
