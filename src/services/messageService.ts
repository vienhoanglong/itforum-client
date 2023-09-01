import { IMessage, IMessageRequest } from "@/interface/message";
import axios from "axios";

export const getAllMessagesInConversation = async (
  conversationId: string,
  page?: number,
  pageSize?: number,
  oldestMessageTimestamp?: Date
): Promise<IMessage[] | []> => {
  try {
    const pagination =
      page && pageSize ? `&page=${page}&pageSize=${pageSize}` : "";
    const oldestMessage = oldestMessageTimestamp
      ? `&oldestMessageTimestamp=${oldestMessageTimestamp}`
      : "";
    const response = await axios.get(
      `https://ict-forum-server.onrender.com/message/conversation?conversationId=${conversationId}${pagination}${oldestMessage}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error get message in conversation");
  }
};
export const createMessage = async (
  payload: IMessageRequest
): Promise<IMessage> => {
  try {
    const response = await axios.post(
      `https://ict-forum-server.onrender.com/message`,
      {
        contentMessage: payload.contentMessage,
        senderId: payload.senderId,
        conversationId: payload.conversationId,
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error create message in conversation");
  }
};

export const createMessageFile = async (
  payload: IMessageRequest,
  file: File
): Promise<IMessage> => {
  try {
    const formData = new FormData();
    formData.append("contentMessage", payload.contentMessage);
    formData.append("senderId", payload.senderId);
    formData.append("conversationId", payload.conversationId);
    formData.append("file", file);
    const response = await axios.post(
      `https://ict-forum-server.onrender.com/message/message-file`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error create message in conversation");
  }
};

export const createMessageChatGPT = async (
  payload: IMessageRequest
): Promise<IMessage> => {
  try {
    const response = await axios.post(
      `https://ict-forum-server.onrender.com/message/chat-gpt`,
      {
        contentMessage: payload.contentMessage,
        senderId: payload.senderId,
        conversationId: payload.conversationId,
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error create message in conversation");
  }
};
