import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/axios";
import { useAuthStore } from "../store/authStore";
import type { ApiResponse } from "../types";
import type { UserPublic } from "@mern-boilerplate/shared";

export default function DashboardPage() {
  const { user, setUser } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data: res } = await apiClient.get<ApiResponse<UserPublic>>("/api/users/me");
      if (!res.success || !res.data) throw new Error(res.error ?? "Failed to fetch");
      setUser(res.data);
      return res.data;
    },
  });

  const displayUser = data ?? user;

  if (isLoading) {
    return <div className="text-gray-600">Loading profile...</div>;
  }

  return (
    <div className="mx-auto max-w-lg">
      <h2 className="mb-6 text-2xl font-semibold text-gray-900">Dashboard</h2>
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-gray-700">Welcome, {displayUser?.email ?? "Guest"}!</p>
        {displayUser && <p className="mt-2 text-sm text-gray-500">ID: {displayUser.id}</p>}
      </div>
    </div>
  );
}
