import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { RootLayout } from './components/layout/RootLayout';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route
          index
          element={
            <SuspenseWrapper>
              <HomePage />
            </SuspenseWrapper>
          }
        />
        <Route
          path="login"
          element={
            <SuspenseWrapper>
              <LoginPage />
            </SuspenseWrapper>
          }
        />
        <Route
          path="register"
          element={
            <SuspenseWrapper>
              <RegisterPage />
            </SuspenseWrapper>
          }
        />
        <Route
          path="dashboard"
          element={
            <SuspenseWrapper>
              <DashboardPage />
            </SuspenseWrapper>
          }
        />
        <Route
          path="*"
          element={
            <SuspenseWrapper>
              <NotFoundPage />
            </SuspenseWrapper>
          }
        />
      </Route>
    </Routes>
  );
}
