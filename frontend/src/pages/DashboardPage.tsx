import { useAuthStore } from '../stores/authStore';
import { Navigate } from 'react-router-dom';

export default function DashboardPage() {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back, {user.name}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard title="Profile" value={user.email} subtitle={`Role: ${user.role}`} />
        <DashboardCard
          title="Member Since"
          value={new Date(user.createdAt).toLocaleDateString()}
          subtitle="Account creation date"
        />
        <DashboardCard title="Status" value="Active" subtitle="Your account is active" />
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="mt-2 text-lg font-semibold text-gray-900">{value}</p>
      <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
    </div>
  );
}
