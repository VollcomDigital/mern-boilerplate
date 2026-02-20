# Cloud-Native MERN Stack Boilerplate

Production-ready monorepo boilerplate built with **MongoDB**, **Express.js**, **React**, and **Node.js** — fully typed with **TypeScript**, containerized with **Docker**, and following the **12-Factor App** methodology.

## Technology Stack

| Layer     | Technology                                       |
| --------- | ------------------------------------------------ |
| Database  | MongoDB 7 + Mongoose ODM                         |
| Backend   | Node.js 22 + Express.js 4                        |
| Frontend  | React 18 + Vite 7                                |
| Language  | TypeScript (strict mode, end-to-end)             |
| Styling   | TailwindCSS 3                                    |
| State     | Zustand (global) + TanStack React Query (server) |
| Auth      | JWT via HttpOnly cookies                         |
| Testing   | Vitest + React Testing Library + Supertest       |
| CI/CD     | GitHub Actions                                   |
| Container | Docker multi-stage builds + Docker Compose       |

## Project Structure

```
├── .github/workflows/ci.yml   # CI pipeline
├── .husky/                     # Git hooks (commitlint, lint-staged)
├── shared/                     # Shared TypeScript types
│   └── types/
├── backend/
│   ├── src/
│   │   ├── config/             # Env validation (Zod), DB, Logger (Pino)
│   │   ├── middleware/         # Auth, error handler, validation
│   │   ├── modules/
│   │   │   ├── auth/           # Register, login, logout
│   │   │   ├── health/         # Liveness & readiness probes
│   │   │   └── users/          # User CRUD
│   │   └── utils/              # AppError, response helpers
│   ├── Dockerfile
│   └── vitest.config.ts
├── frontend/
│   ├── src/
│   │   ├── components/         # Layout + UI components
│   │   ├── hooks/              # Custom hooks (useAuth)
│   │   ├── lib/                # Axios API client
│   │   ├── pages/              # Lazy-loaded route pages
│   │   ├── stores/             # Zustand stores
│   │   └── routes.tsx          # React Router config
│   ├── Dockerfile
│   ├── nginx.conf
│   └── vitest.config.ts
├── docker-compose.yml          # Production compose
├── docker-compose.dev.yml      # Dev MongoDB only
└── tsconfig.base.json          # Shared TS config
```

## Getting Started

### Prerequisites

- Node.js >= 20
- npm >= 10
- Docker & Docker Compose (optional, for containerized development)

### Local Development

```bash
# 1. Clone and install
git clone <repo-url> && cd mern-boilerplate
npm install

# 2. Start MongoDB (via Docker)
docker compose -f docker-compose.dev.yml up -d

# 3. Configure environment
cp backend/.env.example backend/.env
# Edit backend/.env with your MONGODB_URI and JWT_SECRET

# 4. Build shared types
npm run build -w shared

# 5. Start development servers
npm run dev:backend   # Express on :4000
npm run dev:frontend  # Vite on :5173
```

### Docker Compose (Full Stack)

```bash
docker compose up --build
# Frontend: http://localhost
# Backend:  http://localhost:4000
# MongoDB:  localhost:27017
```

## Available Scripts

| Command                | Description                     |
| ---------------------- | ------------------------------- |
| `npm run dev:backend`  | Start backend with hot reload   |
| `npm run dev:frontend` | Start frontend dev server       |
| `npm run build`        | Build all packages              |
| `npm run test`         | Run all tests                   |
| `npm run lint`         | Lint backend and frontend       |
| `npm run typecheck`    | Type-check backend and frontend |
| `npm run format`       | Format all files with Prettier  |

## API Endpoints

| Method | Path                 | Auth  | Description         |
| ------ | -------------------- | ----- | ------------------- |
| GET    | `/health/liveness`   | No    | Liveness probe      |
| GET    | `/health/readiness`  | No    | Readiness probe     |
| POST   | `/api/auth/register` | No    | Create account      |
| POST   | `/api/auth/login`    | No    | Login               |
| POST   | `/api/auth/logout`   | No    | Logout              |
| GET    | `/api/users/me`      | Yes   | Get current user    |
| PATCH  | `/api/users/me`      | Yes   | Update current user |
| DELETE | `/api/users/me`      | Yes   | Delete current user |
| GET    | `/api/users/`        | Admin | List all users      |

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": {},
  "error": null,
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

## Security

- **Helmet** for HTTP security headers
- **CORS** configured strictly per environment
- **Rate limiting** on all `/api` routes (100 req / 15 min)
- **JWT tokens** stored in `HttpOnly`, `Secure`, `SameSite=Strict` cookies
- **Zod** validation on all request bodies
- **bcrypt** password hashing with 12 salt rounds

## Environment Variables

See `backend/.env.example` for the full list. All variables are validated at startup with Zod — the server will not start with invalid or missing configuration.

## Conventional Commits

This repository enforces [Conventional Commits](https://www.conventionalcommits.org/) via Husky + commitlint:

```
feat: add user profile page
fix: correct JWT expiration handling
perf: optimize database queries
chore: update dependencies
```

## License

MIT
