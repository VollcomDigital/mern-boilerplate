import { Outlet } from 'react-router-dom';

import { Navbar } from './Navbar';

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-gray-200 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} MERN Boilerplate. Built with React, Express, MongoDB
          &amp; TypeScript.
        </div>
      </footer>
    </div>
  );
}
