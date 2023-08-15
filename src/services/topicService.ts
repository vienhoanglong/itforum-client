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
