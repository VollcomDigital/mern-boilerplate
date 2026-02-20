import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { apiClient } from "../../api/axios";

export function Header() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  async function handleLogout() {
    await apiClient.post("/api/auth/logout");
    logout();
    navigate("/login");
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-semibold text-gray-900">
          MERN Boilerplate
        </Link>
        <nav className="flex gap-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
              <Link to="/register" className="text-gray-600 hover:text-gray-900">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
