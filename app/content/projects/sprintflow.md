---

title: SprintFlow
description: Frontend Sprint Management Dashboard with Kanban Workflows, Authentication, Analytics, and Notifications
actions:
  - type: live
    label: Live Demo
    url: https://sprintfloww.vercel.app/

  - type: github
    label: GitHub
    url: https://github.com/Daniyalk0/Sprintflow

---

# SprintFlow

SprintFlow is a frontend-only sprint management dashboard built by Daniyal with React, TypeScript, and Vite. It simulates a modern project management workflow with authentication, sprint and task management, Kanban workflows, drag-and-drop interactions, analytics, notifications, and persistent mock backend operations.

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- Zustand
- Tailwind CSS
- @dnd-kit
- Recharts
- Vitest
- React Testing Library

## Highlights

- Authentication using DummyJSON
- Protected routes with session persistence
- Access and refresh token handling with automatic refresh and retry
- Dashboard with sprint and task overview
- Kanban board with Backlog, In Progress, Review, and Done states
- Drag-and-drop task management using `@dnd-kit`
- Task creation, editing, deletion, reordering, and comments
- localStorage` persistence for simulated backend operations
- Analytics dashboard powered by Recharts
- Notification polling using TanStack Query
- Zustand-based global state management
- Responsive UI built with Tailwind CSS
- Route-level code splitting using `React.lazy` and `Suspense`

## Engineering Challenges

- Implemented authentication flows including access/refresh token handling and automatic retry logic.
- Designed a Kanban workflow with drag-and-drop task movement and reordering.
- Combined Zustand and TanStack Query for client-side state and server-like data management.
- Simulated backend persistence using `localStorage` while keeping the application architecture scalable.
- Built reusable components and protected routes for a multi-page dashboard experience.
- Added polling-based notifications and asynchronous data handling using TanStack Query.
- Maintained a responsive interface across desktop, tablet, and mobile screen sizes.

## What I Learned

- Building scalable React applications with TypeScript
- Managing complex client state with Zustand
- Handling asynchronous server-like state with TanStack Query
- Implementing authentication and token refresh flows
- Building interactive drag-and-drop interfaces
- Designing reusable dashboard and Kanban components
- Implementing route-level code splitting with React.lazy and Suspense
- Writing component and UI tests with Vitest and React Testing Library

## Local Development

### Prerequisites

Make sure you have the following installed:

- Git
- Node.js
- npm

### Clone the Repository

```bash
git clone https://github.com/Daniyalk0/Sprintflow
cd sprintflow
```

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm run dev
```
