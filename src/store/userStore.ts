import { IUser } from "@/interface/user";
import { getUserById } from "@/services/userService";
import decodeToken from "@/utils/decodeToken";
import { create } from "zustand";
interface UserState {
    user: IUser | null;
    setUser: () => void;
}
export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: async () => {
        try {
          const token = localStorage.getItem('accessToken');
          if (token) {
            const idUser: string = decodeToken(token)['sub'];
            const response = await getUserById(idUser); 
            set(()=> ({ user: response.data }));
          }
        } catch (error) {
          console.error('Error setting user:', error);
        }
      },
}));
  