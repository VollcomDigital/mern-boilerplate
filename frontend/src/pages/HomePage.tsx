import { Link } from 'react-router-dom';

import { Button } from '../components/ui/Button';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Cloud-Native{' '}
          <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            MERN Stack
          </span>{' '}
          Boilerplate
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          Production-ready monorepo with MongoDB, Express, React &amp; Node.js. Fully typed with
          TypeScript, containerized with Docker, and following 12-Factor App methodology.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <Link to="/register">
            <Button variant="primary">Get Started</Button>
          </Link>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary">View on GitHub</Button>
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 text-2xl">{feature.icon}</div>
              <h3 className="text-sm font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: '🔒',
    title: 'Secure by Default',
    description: 'JWT via HttpOnly cookies, Helmet, CORS, rate limiting, and Zod validation.',
  },
  {
    icon: '🐳',
    title: 'Cloud-Native Ready',
    description: 'Multi-stage Dockerfiles, Docker Compose, health checks, and CI/CD pipelines.',
  },
  {
    icon: '⚡',
    title: 'Developer Experience',
    description: 'Hot reload, TypeScript strict mode, ESLint, Prettier, and Husky git hooks.',
  },
];
