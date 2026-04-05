# 📊 FinDash - Executive Financial Auditing Dashboard

**A high-fidelity, modular financial management platform built for automated auditing and capital management.**

---

## 🔗 Live Demo
**[ https://fin-dash-jet.vercel.app ]**

---

## ✨ Key Features

* **Modular Component Architecture**: Engineered with a highly decoupled structure, separating logic into specialized components like `MetricHighlights`, `MovementInsights`, and `SectorConcentration` for maximum maintainability.
* **Role-Based Access Control (RBAC)**: Supports dynamic switching between **Admin** (Full CRUD permissions) and **Viewer** (Read-only) modes, with UI elements adapting in real-time.
* **Intelligent Data Persistence**: Leverages a custom **LocalStorage** sync engine to ensure all transaction logs, edits, and user roles persist across sessions.
* **Advanced Analytics Suite**: Features a dedicated reporting module with monthly variance tracking, automated "Actionable Insights," and historical log comparisons.
* **Audit-Ready JSON Export**: Includes a functional utility to export the current state of financial logs as a formatted JSON file for external auditing.
* **Responsive Mobile Experience**: Fully optimized for mobile devices with a slide-out hamburger navigation menu and adaptive layout grids.
* **One-Click State Reset**: Integrated "Reset Dashboard" utility to instantly clear browser memory and revert to the default 2026 financial roadmap.

## 🛠️ Tech Stack

* **Core Framework**: React 18 with Vite for ultra-fast development and optimized production builds.
* **Styling**: Tailwind CSS utilizing glass-morphism, custom linear gradients, and sophisticated backdrop blurs.
* **State Management**: React Context API for global financial data distribution and role synchronization.
* **Icons**: Custom-built SVG component library.

## 📁 Project Structure

```text
src/
├── components/
│   ├── analytics/      # Monthly Metrics, Sector & Trend components
│   ├── dashboard/      # Table, Modals, Highlight & Insight 
│   ├── layout/         # Sidebar & Navigation
│   └── ui/             # Reusable Icons & GlassCard wrappers
│   └── modal/          # Audit Report & Transaction modal
├── context/            # Global Financial State & Logic (Context API)
├── data/               # Initial 2026 Roadmap Data
├── pages/              # Main Dashboard & Reports views
└── utils/              # Robust Date parsing & formatting helpers
