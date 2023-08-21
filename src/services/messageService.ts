import { IMessage, IMessageRequest } from "@/interface/message";
import axios from "axios";

export const getAllMessagesInConversation = async (conversationId: string) : Promise<IMessage[] | []> =>{
    try {
        const response = await axios.get(
          `https://ict-forum-server.onrender.com/message/conversation/${conversationId}`
        );
        return response.data.data;
      } catch (error) {
        console.error(error);
        throw new Error("Error get message in conversation");
      }
}
export const createMessage = async (payload: IMessageRequest): Promise<IMessage> =>{
  try {
    const response = await axios.post(`https://ict-forum-server.onrender.com/message`,{
      contentMessage: payload.contentMessage,
      senderId: payload.senderId,
      conversationId: payload.conversationId,
    })
    return response.data.data;
  } catch (error) {
    throw new Error("Error create message in conversation");
  }
}