# MERN Boilerplate - Directory Structure

## Proposed Architecture (12-Factor App Compliant)

```
/
├── .github/
│   └── workflows/
│       └── ci.yml                    # CI/CD pipeline (lint, typecheck, test, build)
├── .husky/                           # Git hooks (pre-commit, commit-msg)
│   ├── pre-commit
│   └── commit-msg
├── frontend/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Layout.tsx
│   │   │   └── ui/                   # Reusable UI primitives
│   │   ├── hooks/
│   │   │   └── useApi.ts
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   └── DashboardPage.tsx
│   │   ├── api/
│   │   │   └── axios.ts              # Axios instance + interceptors
│   │   ├── store/
│   │   │   └── authStore.ts          # Zustand store
│   │   ├── types/
│   │   │   └── index.ts              # Shared types (re-export from backend)
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── auth.types.ts
│   │   │   └── users/
│   │   │       ├── user.model.ts
│   │   │       ├── user.controller.ts
│   │   │       ├── user.routes.ts
│   │   │       └── user.service.ts
│   │   ├── middleware/
│   │   │   ├── errorHandler.ts
│   │   │   ├── auth.middleware.ts
│   │   │   └── validateRequest.ts
│   │   ├── config/
│   │   │   ├── env.ts                # Zod-validated env
│   │   │   └── database.ts
│   │   ├── utils/
│   │   │   ├── logger.ts             # Pino logger
│   │   │   ├── AppError.ts           # Custom error classes
│   │   │   └── apiResponse.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example
│   ├── Dockerfile
│   ├── tsconfig.json
│   ├── package.json
│   └── jest.config.js
├── shared/                           # Shared types between frontend/backend
│   └── types/
│       └── index.ts
├── docker-compose.yml
├── .env.example
├── .eslintrc.cjs                     # ESLint flat config
├── .prettierrc
├── .prettierignore
├── package.json                     # Root workspace
├── turbo.json                       # Turborepo config (optional)
└── tsconfig.base.json
```

## Key Design Decisions

- **Monorepo:** NPM workspaces for `frontend`, `backend`, `shared`
- **Shared Types:** Types exported from `shared` or backend, consumed by frontend
- **Domain-Driven Backend:** Each feature has its own module (auth, users)
- **Security:** JWT in HttpOnly cookies, Helmet, CORS, rate limiting
- **Observability:** `/health/liveness` and `/health/readiness` for K8s
