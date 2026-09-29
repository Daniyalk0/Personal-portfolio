// types/project.ts
export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Greenova",
    category: "Full-Stack E-Commerce",
    year: "2026",
    description: "A high-performance digital storefront focusing on sustainable lifestyle goods and seamless checkout flows.",
    image: "/greenova.jpg",
    technologies: ["Next.js", "TypeScript", "Prisma", "Supabase (PostgreSQL)", "Auth.js"],
    liveUrl: "https://greenova-pi.vercel.app",
    githubUrl: "#",
  },
{
  id: "02",
  title: "Sprintflow",
  category: "Productivity Dashboard",
  year: "2026",
  description:
    "A sprint management dashboard with authentication, Kanban workflows, drag-and-drop task management, analytics, notifications, and persistent state.",
  technologies: [
    "React",
    "TypeScript",
    "Zustand",
    "TanStack Query",
  ],
  image: "/sprintflow.png",
  liveUrl: "https://sprintfloww.vercel.app/",
},
  {
    id: "03",
    title: "WriteWise AI",
    category: "AI Content Generator",
    year: "2025",
    description: "WriteWise AI helps you quickly generate clear, engaging, and error-free content for emails, reports, social media, and more.",
    image: "/writewiseAi.jpg",
    technologies: ["Next.js", "Firebase", "OpenRouter", "TypeScript"],
    liveUrl: "https://writewise-ai.vercel.app/",
    githubUrl: "#",
  },
];