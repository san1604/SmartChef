# SmartChef AI - Zero-Waste Culinary Meal Planner

SmartChef AI is a modern, high-fidelity consumer web application designed to help users combat inflation, minimize food waste, and create delicious daily culinary experiences. 

By inputting currently available pantry ingredients, specifying household headcounts, and determining exact daily budget limits, the Gemini 3.5 Flash-powered engine synthesizes custom-paired recipes (Breakfast, Lunch, Dinner) structured to stay within target budgets while reusing core staples across meals to reduce waste.

---

## 🚀 Key Features

- **Personalized 1-Day Cooking Blueprint**: Generates highly satisfying meal plans fitted to exact budgets and pantry states in under 30 seconds.
- **Waste Minimization Algorithm**: Intelligently matches ingredients across meals (e.g. spinach bought for lunch is recycled in a dinner curry).
- **Interactive Checklists & chronological timelines**: Real-time progress tracker assisting step-by-step preparation workflows.
- **Clever Substitutions**: Explains texture/taste workarounds for restricted items.
- **History Tracking & Management**: Persists previous blueprints locally using browser `localStorage` for easy loading.
- **High Fidelity UI/UX**: Supports automatic dark-mode rendering, fluid animations, premium print layouts, and clipboard shopping list copying.

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **React 19**: Responsive view manager and client state controls.
- **Tailwind CSS**: Utility first styling using high contrast display variables.
- **Lucide Icons**: Fluid, visual vector decorations.

### Backend
- **Express.js API Router**: Serves secure, server-side API proxy routes hiding secrets from browser dev tools.
- **Gemini SDK (`@google/genai`)**: Interacts with the `gemini-3.5-flash` model using JSON schemas to guarantee perfect, structured data outputs.

---

## ⚙️ Environment Configuration

Define secrets in your local `.env` file (never commit actual keys to production):

```env
# Server secret for Google Gemini API model authentication
GEMINI_API_KEY="your_api_key_here"

# Public self-referential URL
APP_URL="http://localhost:3000"
```

---

## 📦 Local Installation

To start the local full-stack container on port `3000`:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the production resources:
   ```bash
   npm run build
   ```

3. Spin up the Node development server:
   ```bash
   npm run dev
   ```

---

## 📋 Testing Strategy

1. **Static Analysis & Type Consistency**: Run standard TypeScript linter validation checks:
   ```bash
   npm run lint
   ```
2. **Schema Validation Tests**: Ensure server response schemas align with target structures using sample mock JSON.
3. **Responsive Verification**: Verify touch coordinates on mobile viewports (minimum 44px boundaries) and print layouts using browser print emulations.

---

## 🔮 Future Enhancements

- **Prisma + PostgreSQL Integration**: Migrate from client-side `localStorage` state to secure persistent user accounts.
- **Camera OCR Staples Scanning**: Scan retail supermarket receipts to auto-populate kitchen pantry inventories.
- **Live Prep Cook-Along**: Enable text-to-speech voice steps for hands-free kitchen guidance.
