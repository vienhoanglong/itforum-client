import INotification from "@/interface/notification";
import {
  getAllNotification,
  getNotificationById,
  getNotificationByLevel,
  getNotificationBySearch,
  getNotificationByType,
} from "@/services/notificationService";
import { create } from "zustand";

interface NotificationState {
  listNotification: INotification[] | null;
  listNotificationNav: INotification[] | null;
  listNotificationLevel: INotification[] | null;
  listNotificationSearch: INotification[] | null;
  listNotificationType: INotification[] | null;
  notifications: INotification | null;
  getNotification: (id: string) => void;
  getListNotificationLevel: (level: string) => void;
  getListNotificationSearch: (search: string) => void;
  getListNotificationType: (type: string) => void;
  getListNotification: (skip: number, limit: number, sort?: string) => void;
  getListNotificationNav: (skip: number, limit: number, sort?: string) => void;
}
export const useNotificationStore = create<NotificationState>((set) => ({
  listNotification: null,
  listNotificationNav: null,
  listNotificationLevel: null,
  listNotificationSearch: null,
  listNotificationType: null,
  notifications: null,
  getNotification: async (id: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getNotificationById(id);
        set(() => ({ notifications: response }));
      }
    } catch (error) {
      console.error("Error get notification:", error);
    }
  },
  getListNotificationLevel: async (level: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getNotificationByLevel(level);
        set(() => ({ listNotificationLevel: response.data.data }));
      }
    } catch (error) {
      console.error("Error get notification:", error);
    }
  },
  getListNotificationType: async (type: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getNotificationByType(type);
        set(() => ({ listNotificationType: response.data.data }));
      }
    } catch (error) {
      console.error("Error get notification:", error);
    }
  },
  getListNotificationSearch: async (search: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getNotificationBySearch(search);
        set(() => ({ listNotificationSearch: response.data.data }));
      }
    } catch (error) {
      console.error("Error get notification:", error);
    }
  },
  getListNotification: async (skip: number, limit: number, sort?: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getAllNotification(skip, limit, sort);
        set(() => ({ listNotification: response.data.data }));
      }
    } catch (error) {
      console.error("Error get list notification:", error);
    }
  },
  getListNotificationNav: async (
    skip: number,
    limit: number,
    sort?: string
  ) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getAllNotification(skip, limit, sort);
        set(() => ({ listNotificationNav: response.data.data }));
      }
    } catch (error) {
      console.error("Error get list notification:", error);
    }
  },
}));
