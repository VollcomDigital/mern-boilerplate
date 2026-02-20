import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserDto } from '@mern/shared';

interface AuthState {
  user: UserDto | null;
  setUser: (user: UserDto) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearAuth: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
