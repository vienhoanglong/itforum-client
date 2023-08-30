import { IAvatar } from "./../interface/listAvatar";
import { IUser } from "@/interface/user";
import { getListAvatars, getUserById } from "@/services/userService";
import decodeToken from "@/utils/decodeToken";
import { create } from "zustand";
interface UserState {
  user: IUser | null;
  listAvatar: IAvatar[] | null;
  setUser: () => void;
  getListAvatar: () => void;
  theme: string;
  setThemeUser: (theme: string) => void
}
export const useUserStore = create<UserState>((set) => ({
  user: null,
  listAvatar: null,
  theme: '',
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
  setThemeUser: (theme: string) => {
    localStorage.setItem("theme", theme);
    set(() => ({ theme }));
  },
}));
