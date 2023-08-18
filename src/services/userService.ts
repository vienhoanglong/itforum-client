import IUserUpdate from "@/interface/API/IUserUpdate";
import IAvatar from "@/interface/listAvatar";
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

export const getUserByListId = async (listId: string[]): Promise<any> => {
  try {
    const response = await axios.get(
      `https://ict-forum-server.onrender.com/user/list-user?listId=${listId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error get list user");
  }
};

export const getListAvatars = async (): Promise<IAvatar[]> => {
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

export const uploadImage = async (file: File): Promise<any> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Access token not found");
    }
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      "https://ict-forum-server.onrender.com/user/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    return response.data.data.link;
  } catch (error) {
    console.error(error);
    throw new Error("Error upload image");
  }
};
