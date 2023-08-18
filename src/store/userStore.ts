import { IAvatar } from "./../interface/listAvatar";
import { IUser } from "@/interface/user";
import {
  getListAvatars,
  getUserById,
  getUserByListId,
} from "@/services/userService";
import decodeToken from "@/utils/decodeToken";
import { create } from "zustand";
interface UserState {
  user: IUser | null;
  userById: IUser | null;
  listAvatar: IAvatar[] | null;
  listUser: IUser[] | null;
  setUser: () => void;
  getListAvatar: () => void;
  getById: (id: string) => void;
  getListUser: (id: string[]) => void;
}
export const useUserStore = create<UserState>((set) => ({
  user: null,
  userById: [],
  listAvatar: null,
  listUser: null,
  setUser: async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const idUser: string = decodeToken(token)["sub"];
        const response = await getUserById(idUser);
        set(() => ({ user: response.data }));
      }
    } catch (error) {
      console.error("Error setting user:", error);
    }
  },
  getById: async (id: string) => {
    try {
      // const token = localStorage.getItem("accessToken");
      // if (token) {
      const response = await getUserById(id);
      set({ userById: response.data });
      // }
    } catch (error) {
      console.error("Error setting user:", error);
    }
  },
  getListAvatar: async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getListAvatars();
        set(() => ({ listAvatar: response }));
      }
    } catch (error) {
      console.error("Error get list avatar:", error);
    }
  },

  getListUser: async (listId: string[]) => {
    try {
      const reponse = await getUserByListId(listId);
      set(() => ({ listUser: reponse.data }));
    } catch (err) {
      console.error("Error get list user:", err);
    }
  },
}));
