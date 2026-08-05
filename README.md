# 🛣️ InfraTwin AI — Autonomous Road Infrastructure Digital Twin & GenAI Platform

[![Next.js](https://img.shields.io/badge/Next.js-14%20(App%20Router)-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Groq Llama-3](https://img.shields.io/badge/Groq-Llama--3.3--70B--versatile-f97316?style=flat-square)](https://console.groq.com/)
[![IRC Standard](https://img.shields.io/badge/IRC:82--2023-Compliant-10b981?style=flat-square)](https://irc.nic.in/)

> **InfraTwin AI** is a state-of-the-art road infrastructure digital twin and GenAI copilot engineered for municipal authorities (NDMC, NHAI, PWD), highway contractors, and infrastructure audit teams across India.

---

## ✨ Core Features & Modules

### 1. 🔍 AI Volumetric Inspection & 3D Depth Heatmap (`/audit`)
- **Multi-Camera Telemetry Viewports**: Switch between `RGB Drone Scan`, `Thermal IR`, `Oblique 45°`, and `Close-up Macro` views.
- **Custom Image Upload**: Drop custom road photos to generate instant AI volumetric segmentations.
- **Sub-Centimeter Precision**: Calculates distress area ($m^2$), max/avg depth ($cm$), volume ($m^3$), and perimeter ($m$).
- **Dynamic Severity Badges**: Automatically calculates distress severity (`Low`, `Moderate`, `High`, `Critical`).
- **Work Order Management**: One-click **"Add to Work Order"** with local WO generation and inline confirmations.

### 2. 🤖 Nirman Copilot & GenAI BOQ Engine (`/copilot`)
- **Powered by Groq `llama-3.3-70b-versatile`**: Ultra-fast LLM inference returning structured JSON Bill of Quantities (BOQ).
- **IRC Grounding (RAG)**: Grounded in **IRC:82-2023**, **IRC:37-2018**, and **MoRTH Section 3000** specifications.
- **Live vs Simulated Detection**: Real-time header indicator showing `Llama-3 70B Live` (cyan) when connected or `Simulated Engine Mode` (amber) on fallback.
- **Context-Aware Voice Commands**: Instant voice simulation tailored to selected distress type and road location.

### 3. 🗺️ Spatial Digital Twin & Temporal Simulator (`/map`)
- **MapLibre GL Integration**: Vector rendering with cartographic dark/light/OSM map styles.
- **GeoJSON API Integration**: Fetches dynamic road networks from `/api/roads`.
- **Temporal Degradation Simulator**: Interactive timeline slider simulating 6-month monsoon road wear and PCI degradation.

### 4. 🛡️ Contractor SLA & Real-Time Fraud Verification (`/fraud-detection`)
- **Draggable Split-Screen Drone Viewer**: Compare **Before Repair (Red Outline)** vs **After Repair (Green Outline)** scans with an interactive split slider.
- **Real-Time Telemetry Controls**: Adjust material deficit sliders, sub-base compaction density, and allowed SLA tolerance in real-time.
- **Automated Payment Freeze Engine**: Automatically toggles between `APPROVED • PAYMENT CLEARED` and `FRAUD ALERT • PAYMENT FROZEN`.

### 5. 📊 Executive Operations Dashboard (`/dashboard`)
- Financial tickers, active inspection fleet maps, live alert feeds, and overall Pavement Condition Index (PCI) gauges.

### 6. 📈 AI Pavement Degradation Forecasting (`/predictive`)
- Predictive maintenance modeling projecting distress propagation over 12–36 month horizons.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS, Glassmorphism, Custom Cyan-Glow Utilities
- **AI Inference & LLM**: Groq SDK (`llama-3.3-70b-versatile`), Indian Road Congress RAG Base
- **GIS & Mapping**: MapLibre GL Vector Engine
- **Icons**: Lucide React

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Varun-Khandelwal31/Infra-Twin-AI-.git
cd Infra-Twin-AI-
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory (refer to `.env.example`):
```env
# Optional: Get your free API key from https://console.groq.com/keys
GROQ_API_KEY=your_groq_api_key_here
```

### 4. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🏗️ Production Build

To test the optimized production build:
```bash
npm run build
npm run start -p 3000
```

---

## 📡 API Endpoints

- `GET /api/roads` — Returns GeoJSON FeatureCollection of road networks, health scores, and historical degradation scores.
- `POST /api/copilot` — Accepts prompt and inspection context to return IRC-grounded BOQ calculations via Groq LLM.
- `GET /api/audit` — Returns mock inspection samples and multi-camera viewport assets.

---

## 📜 Standards & Compliance
- **IRC:82-2023** — Code of Practice for Maintenance of Bituminous Surfaces
- **IRC:37-2018** — Guidelines for Design of Flexible Pavements
- **MoRTH Section 3000** — Ministry of Road Transport & Highways Specifications

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for details.
