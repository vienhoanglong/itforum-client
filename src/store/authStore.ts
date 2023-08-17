import { create } from "zustand";
import { persist } from "zustand/middleware";
type State = {
  token: string;
  isAuthenticated: boolean;
};

type Actions = {
  setToken: (token: string) => void;
  login: () => void;
  logout: () => void;
};
export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: "",
      isAuthenticated: false,
      setToken: (token: string) => {
        set(() => ({ token })), localStorage.setItem("accessToken", token);
      },
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: "auth",
    }
  )
);
