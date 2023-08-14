import IUserUpdate from "@/interface/API/IUserUpdate";
import IListAvatar from "@/interface/listAvatar";
import axios from "axios";

export const getUserById = async (id: string): Promise<any> => {
  try {
    const response = await axios.get(
      `https://ict-forum-server.onrender.com/user/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error get profile");
  }
};

export const getListAvatars = async (): Promise<IListAvatar[]> => {
  try {
    const response = await axios.get(
      `https://ict-forum-server.onrender.com/user/list-avatar`
    );
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error get list avatar");
  }
};

export const UpdateDataUser = async (
  userData: IUserUpdate,
  id: string
): Promise<any> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Access token not found");
    }
    const response = await axios.patch(
      `https://ict-forum-server.onrender.com/user/${id}`,
      userData,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
    console.log("Update response:", response.data);
  } catch (error) {
    console.error("Error sending update:", error);
  }
};
