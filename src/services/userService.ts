import axios from "axios";

export const getUserById = async (id: string): Promise<any> => {
    try {
        const response = await axios.get(`https://ict-forum-server.onrender.com/user/${id}`);
         return response.data;
     } catch (error) {
         console.error(error);
         throw new Error("Error get profile");
     }
}