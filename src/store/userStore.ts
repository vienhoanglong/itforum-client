import { IAvatar } from "./../interface/listAvatar";
import { IUser } from "@/interface/user";
import {
  GetAllUser,
  getListAvatars,
  getUserById,
  getUserByListId,
  searchUserByUsername,
} from "@/services/userService";
import decodeToken from "@/utils/decodeToken";
import { create } from "zustand";
interface UserState {
  listUserBySearch: IUser[] | null;
  allUser: IUser[] | null;
  user: IUser | null;
  userById: IUser | null;
  listAvatar: IAvatar[] | null;
  listUser: IUser[] | null;
  listUserNotifi: IUser[] | null;
  listUserNotifiLevel: IUser[] | null;
  setUser: () => void;
  getListUserBySearch: (username: string) => void;
  getListAvatar: () => void;
  getListAllUser: () => void;
  theme: string;
  setThemeUser: (theme: string) => void;
  getById: (id: string) => void;
  getListUser: (listId: string[]) => void;
  getListUserNotifi: (listId: string[]) => void;
  getListUserNotifiLevel: (listId: string[]) => void;
}
export const useUserStore = create<UserState>((set) => ({
  user: null,
  listUserBySearch: null,
  allUser: null,
  userById: [],
  listUserNotifi: null,
  listUserNotifiLevel: null,
  listAvatar: null,
  theme: "",
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
      return;
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
      return;
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
      return;
    }
  },

  getListUser: async (listId: string[]) => {
    try {
      const reponse = await getUserByListId(listId);
      set(() => ({ listUser: reponse.data }));
    } catch (err) {
      return;
    }
  },
  getListAllUser: async () => {
    try {
      const reponse = await GetAllUser();
      set(() => ({ allUser: reponse.data }));
    } catch (err) {
      return;
    }
  },
  getListUserNotifi: async (listId: string[]) => {
    try {
      const reponse = await getUserByListId(listId);
      set(() => ({ listUserNotifi: reponse.data }));
    } catch (err) {
      return;
    }
  },

  getListUserBySearch: async (username: string) => {
    try {
      const reponse = await searchUserByUsername(username);
      set(() => ({ listUserBySearch: reponse }));
    } catch (err) {
      return;
    }
  },
  getListUserNotifiLevel: async (listId: string[]) => {
    try {
      const reponse = await getUserByListId(listId);
      set(() => ({ listUserNotifiLevel: reponse.data }));
    } catch (err) {
      return;
    }
  },
  setThemeUser: (theme: string) => {
    localStorage.setItem("theme", theme);
    set(() => ({ theme }));
  },
}));
