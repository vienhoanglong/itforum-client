import axios from "axios";

export const getHistoryNotificationByUserId = async (userId: string): Promise<any> => {
    try {
      const response = await axios.get(
        `https://ict-forum-server.onrender.com/history-notifications/user/${userId}`
      );
      return response.data.data;
    } catch (error) {
      throw new Error("Error get list user");
    }
};

export const markAsReadHistory = async (id: string, userId:string): Promise<any> => {
  try {
    const response = await axios.get(
      `https://ict-forum-server.onrender.com/history-notifications/${id}/mark-as-read/${userId}`
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error get list user");
  }
}