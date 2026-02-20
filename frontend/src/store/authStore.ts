import { create } from "zustand";
import type { UserPublic } from "@mern-boilerplate/shared";

interface AuthState {
  user: UserPublic | null;
  setUser: (user: UserPublic | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
