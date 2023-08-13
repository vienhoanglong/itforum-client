import { create } from "zustand";

type LoadingState = {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
};

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  setLoading: (isLoading: boolean) => set({ isLoading }),
}));
