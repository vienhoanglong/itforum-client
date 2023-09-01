import { IConversation, IConversationRequest } from "@/interface/conversation";
import axios from "axios";

export const getListConversationsByUser = async (
  id: string
): Promise<IConversation[] | []> => {
  try {
    const response = await axios.get(
      `https://ict-forum-server.onrender.com/conversation/user/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error get conversation");
  }
};
export const createConversation = async (payload: {
  members: string[];
  createBy: string;
}): Promise<IConversation> => {
  try {
    const response = await axios.post(
      `https://ict-forum-server.onrender.com/conversation`,
      {
        members: payload.members,
        createBy: payload.createBy,
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error create conversation");
  }
};
export const updateConversationChat = async (
  id: string,
  updatedBy: string,
  payload: IConversationRequest
): Promise<IConversation> => {
  try {
    const response = await axios.patch(
      `https://ict-forum-server.onrender.com/conversation/${id}/${updatedBy}`,
      {
        ...payload,
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error update conversation");
  }
};

export const updateImageConversation = async (
  conversationId: string,
  updatedBy: string,
  file: File
): Promise<IConversation> => {
  try {
    const formData = new FormData();
    formData.append("conversationId", conversationId);
    formData.append("updatedBy", updatedBy);
    formData.append("file", file);
    const response = await axios.post(
      "https://ict-forum-server.onrender.com/conversation/update-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error update image conversation");
  }
};
