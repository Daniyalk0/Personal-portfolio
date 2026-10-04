# 🚀 Daniyal — Personal Portfolio

An art-directed, interactive developer portfolio built with **Next.js**, featuring a 3D hero, smooth motion, responsive layouts, selected projects, and an AI-powered portfolio assistant.

## 🌐 Live

**[daniyal-devv.vercel.app](https://daniyal-devv.vercel.app)**

## ✨ Features

* **🎨 Art-directed design** — Editorial-inspired visual system focused on typography, composition, and interaction.
* **🧊 Interactive 3D Hero** — A real-time 3D experience built with Three.js and React Three Fiber.
* **🤖 AI Portfolio Assistant** — Visitors can ask questions about my background, projects, skills, and experience.
* **🎬 Motion & Interactions** — Smooth page transitions, scroll-based animations, reveals, and micro-interactions.
* **📱 Responsive** — Designed and optimized for mobile, tablet, and desktop.
* **🗂️ Project Showcase** — Detailed presentation of selected full-stack and frontend projects.
* **⚡ Next.js App Router** — Built with the modern Next.js architecture and React Server Components.

---

## 🤖 AI Portfolio Assistant

The portfolio includes an AI assistant designed specifically to answer questions about me and my work.

The assistant uses a curated knowledge base containing information about my:

* Background
* Skills
* Projects
* Experience
* Development workflow

The knowledge is provided as context to the AI model so responses remain focused on information relevant to my portfolio rather than acting as a general-purpose chatbot.

---

## 🛠️ Tech Stack

| Category       | Technologies                      |
| -------------- | --------------------------------- |
| **Framework**  | Next.js 16, React                 |
| **Language**   | TypeScript                        |
| **Styling**    | Tailwind CSS                      |
| **Animation**  | Motion / Framer Motion            |
| **3D**         | Three.js, React Three Fiber, Drei |
| **AI**         | Google Gemini / Google GenAI SDK  |
| **Database**   | PostgreSQL                        |
| **ORM**        | Prisma                            |
| **Content**    | Markdown / MDX                    |
| **Deployment** | Vercel                            |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Daniyalk0/Personal-portfolio.git
cd Personal-portfolio
```

### 2. Install dependencies

```bash
npm install
```

Or with pnpm:

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Start the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## 📁 Project Structure

```text
├── app/
│   ├── api/
│   │   └── chat/              # AI assistant API
│   ├── components/            # Reusable UI components
│   │   ├── chatbot/
│   │   ├── sections/
│   │   └── ui/
│   ├── content/               # Portfolio content / knowledge base
│   │   ├── about.md
│   │   └── projects/
│   ├── lib/                   # Utilities and AI logic
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   ├── images/                # Portfolio images
│   └── models/                # 3D assets
├── package.json
└── README.md
```

---

## 📬 Contact

I'm open to interesting projects, collaborations, and developer opportunities.

**GitHub:** [github.com/Daniyalk0](https://github.com/Daniyalk0)

**LinkedIn:** [linkedin.com/in/daniyal-k-648107263](https://www.linkedin.com/in/daniyal-k-648107263/)

**Email:** [getdaniyalkhan@gmail.com](mailto:getdaniyalkhan@gmail.com)
