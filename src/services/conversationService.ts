import IConversation from "@/interface/conversation";
import axios from "axios";

export const getListConversationsByUser = async (id: string) : Promise<IConversation[] | []> =>{
    try {
        const response = await axios.get(
          `https://ict-forum-server.onrender.com/conversation/user/${id}`
        );
        return response.data.data;
      } catch (error) {
        console.error(error);
        throw new Error("Error get conversation");
      }
}
export const createConversation = async(payload: {members: string[], createBy: string}): Promise<IConversation> => {
  try {
    const response = await axios.post(`https://ict-forum-server.onrender.com/conversation`,{
      members: payload.members,
      createBy: payload.createBy
    })
    return response.data.data;
  } catch (error) {
    throw new Error("Error create conversation");
  }
}