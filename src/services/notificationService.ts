import INotificationCreate from "@/interface/API/INotificationCreate";
import INotification from "@/interface/notification";
import axios from "axios";

export const getNotificationById = async (
  id: string
): Promise<INotification> => {
  try {
    const response = await axios.get(
      `https://ict-forum-server.onrender.com/notification/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error get notification: ");
  }
};

export const getNotificationByLevel = async (level: string): Promise<any> => {
  try {
    const response = await axios.get(
      `https://ict-forum-server.onrender.com/notification/find-by-level?level=${level}`
    );
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error get notification: ");
  }
};

export const getNotificationBySearch = async (search: string): Promise<any> => {
  try {
    const response = await axios.get(
      `https://ict-forum-server.onrender.com/notification/search?titleNotice=${search}`
    );
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error get notification: ");
  }
};

export const getNotificationByType = async (type: string): Promise<any> => {
  try {
    const response = await axios.get(
      `https://ict-forum-server.onrender.com/notification/find-by-type?typeNotice=${type}`
    );
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error get notification: ");
  }
};

export const CreateNewNotification = async (
  notification: INotificationCreate,
  file?: File
): Promise<any> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Access token not found");
    }
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("titleNotice", notification.titleNotice);
    formData.append("descNotice", notification.descNotice);
    formData.append("createdBy", notification.createdBy);
    formData.append("typeNotice", notification.typeNotice);
    formData.append("level", notification.level);
    const response = await axios.post(
      `https://ict-forum-server.onrender.com/notification`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Create response:", response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllNotification = async (
  skip: number,
  limit: number,
  sort?: string
): Promise<any> => {
  try {
    let apiUrl = `https://ict-forum-server.onrender.com/notification?skip=${skip}&limit=${limit}`;

    if (sort) {
      apiUrl += `&sort=${sort}`;
    }

    const response = await axios.get(apiUrl);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error get all notification: ");
  }
};
