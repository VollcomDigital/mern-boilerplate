# MERN Boilerplate

A **cloud-native** MERN stack (MongoDB, Express.js, React, Node.js) boilerplate with end-to-end TypeScript, 12-Factor App methodology, and production-ready DevOps setup.

## Tech Stack

| Layer    | Technology                                 |
| -------- | ------------------------------------------ |
| Database | MongoDB + Mongoose                         |
| Backend  | Node.js 20+ • Express.js • TypeScript      |
| Frontend | React 18 • Vite • TailwindCSS • TypeScript |
| State    | Zustand (client) • React Query (server)    |
| Auth     | JWT (HttpOnly cookies)                     |

## Quick Start

```bash
# Install dependencies
npm install

# Development (requires MongoDB)
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm run dev:backend   # Terminal 1
npm run dev:frontend  # Terminal 2

# Or use Docker Compose
docker-compose up -d
```

## Project Structure

```
/
├── frontend/     # React + Vite + Tailwind
├── backend/      # Express + Mongoose
├── shared/       # Shared types
├── .github/      # CI/CD workflows
└── .husky/       # Git hooks (lint-staged, commitlint)
```

## Scripts

| Command                | Description               |
| ---------------------- | ------------------------- |
| `npm run dev:backend`  | Start backend dev server  |
| `npm run dev:frontend` | Start frontend dev server |
| `npm run build`        | Build both apps           |
| `npm run lint`         | Lint all packages         |
| `npm run test`         | Run all tests             |

## API Endpoints

| Method | Path                 | Description                  |
| ------ | -------------------- | ---------------------------- |
| GET    | `/health/liveness`   | Kubernetes liveness probe    |
| GET    | `/health/readiness`  | Kubernetes readiness probe   |
| POST   | `/api/auth/register` | Register user                |
| POST   | `/api/auth/login`    | Login (sets HttpOnly cookie) |
| POST   | `/api/auth/logout`   | Logout                       |
| GET    | `/api/users/me`      | Current user (auth required) |

## Environment Variables

See `.env.example` and `backend/.env.example` for required configuration. Backend uses **Zod** for startup validation.

## Docker

```bash
docker-compose up -d
```

- **Backend**: `http://localhost:4000`
- **Frontend**: `http://localhost:80` (Nginx)
- **MongoDB**: `localhost:27017` (persistent volume)

## Conventions

- **Commits**: Conventional Commits (`feat:`, `fix:`, `chore:`, etc.)
- **Linting**: ESLint (flat config) + Prettier
- **Tests**: Jest (backend) • Vitest + RTL (frontend)
