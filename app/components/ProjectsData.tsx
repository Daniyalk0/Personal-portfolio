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
  subtitle?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Tailr",
    subtitle:"mvp",
    category: "AI Resume Customizer",
    year: "2026",
    description:
      "An AI resume customizer that adapts your resume to any job description—highlighting what changed and suggesting missing keywords.",
    image: "/tailr.png",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "FastAPI",
      "Groq",
      "PostgreSQL",
    ],
    liveUrl: "https://tailr-reumse-customizer.vercel.app/",
    githubUrl: "#",
  },
  {
    id: "02",
    title: "Greenova",
    category: "Full-Stack E-Commerce",
    year: "2026",
    description:
      "A high-performance digital storefront focusing on sustainable lifestyle goods and seamless checkout flows.",
    image: "/greenova.jpg",
    technologies: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Supabase (PostgreSQL)",
      "Auth.js",
    ],
    liveUrl: "https://greenova-pi.vercel.app",
    githubUrl: "#",
  },
  {
    id: "03",
    title: "Sprintflow",
    category: "Productivity Dashboard",
    year: "2026",
    description:
      "A sprint management dashboard with authentication, Kanban workflows, drag-and-drop task management, analytics, notifications, and persistent state.",
    technologies: ["React", "TypeScript", "Zustand", "TanStack Query"],
    image: "/sprintflow.png",
    liveUrl: "https://sprintfloww.vercel.app/",
  },
];
