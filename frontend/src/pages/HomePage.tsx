import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Cloud-Native MERN Stack</h1>
      <p className="mb-8 text-gray-600">
        MongoDB • Express • React • Node.js — TypeScript end-to-end, 12-Factor compliant.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/register"
          className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
        >
          Get Started
        </Link>
        <Link
          to="/dashboard"
          className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
