import { HistoryNotification } from "@/interface/history";
import { getHistoryNotificationByUserId } from "@/services/historyNotificationService";
import create from "zustand";

interface HistoryStoreState {
  historyNotification: HistoryNotification[];
  setHistory: (history: HistoryNotification[]) => void;
  fetchHistory: (userId: string) => void;
  updateHistory: (updatedHistory: HistoryNotification)=> void;
}

export const useHistoryStore = create<HistoryStoreState>((set) => ({
  historyNotification: [],
  setHistory: (notification) => {
    set((state) => ({
      historyNotification: [...state.historyNotification, ...notification],
    }));
  },
  updateHistory: (updatedHistory) =>
    set((state) => ({
        historyNotification: state.historyNotification.map((c) =>
        c._id === updatedHistory._id ? updatedHistory : c
      ),
    })),
  fetchHistory: async (userId) => {
    try {
      const response = await getHistoryNotificationByUserId(userId);
      set({ historyNotification: response });
    } catch (error) {
      console.error(error);
    }
  },
}));
