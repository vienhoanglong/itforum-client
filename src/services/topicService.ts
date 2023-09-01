import ITopicCreate from "@/interface/API/ITopicCreate";
import Topic from "@/interface/topic";
import axios from "axios";

export const getAllTopic = async (): Promise<Topic[]> => {
  try {
    const response = await axios.get(
      `https://ict-forum-server.onrender.com/topic`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error get list topic");
  }
};

export const getListTopicByListTopicId = async (
  listId: string
): Promise<Topic[]> => {
  try {
    const response = await axios.get(
      `https://ict-forum-server.onrender.com/topic/list-topic?listId=${listId}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error get list topic");
  }
};

export const getListTopicByType = async (type: string): Promise<Topic[]> => {
  try {
    const response = await axios.get(
      `https://ict-forum-server.onrender.com/topic/find-by-type?type=${type}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error get list topic");
  }
};

export const getTopicById = async (id: string): Promise<Topic> => {
  try {
    const response = await axios.get(
      `https://ict-forum-server.onrender.com/topic/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error get topic");
  }
};
export const changeStatusTopic = async (
  id: string,
  hide: boolean
): Promise<Topic> => {
  try {
    const response = await axios.patch(
      `https://ict-forum-server.onrender.com/topic?id=${id}&hide=${hide}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error change status topic");
  }
};

export const moveTrashOrRestoreTopic = async (id: string): Promise<Topic> => {
  try {
    const response = await axios.patch(
      `https://ict-forum-server.onrender.com/topic/trash-or-restore?id=${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error change status topic");
  }
};

export const getTopicFromTrash = async (): Promise<any> => {
  try {
    const response = await axios.get(
      `https://ict-forum-server.onrender.com/topic/trash`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error get topic");
  }
};

export const CreateNewTopic = async (topic: ITopicCreate): Promise<any> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Access token not found");
    }
    const response = await axios.post(
      `https://ict-forum-server.onrender.com/topic`,
      topic,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
    console.log("Create response:", response.data);
  } catch (error) {
    console.error("Error Create:", error);
  }
};

export const deleteTopic = async (id: string): Promise<any> => {
  try {
    const response = await axios.delete(
      `https://ict-forum-server.onrender.com/topic/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error delete topic: ");
  }
};

export const UpdatedTopic = async (
  topic: ITopicCreate,
  id: string
): Promise<any> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Access token not found");
    }
    const response = await axios.put(
      `https://ict-forum-server.onrender.com/topic/${id}`,
      topic,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
    console.log("Create response:", response.data);
  } catch (error) {
    console.error("Error update:", error);
  }
};
