import IConversation from "@/interface/conversation";
import IUser from "@/interface/user";
import { getListUserByListUserId } from "@/services/userService";
import { create } from "zustand";

interface ConversationState {
  selectedChatId: string | null;
  members: IUser[];
  conversations: IConversation[];
  setSelectedChatId: (chatId: string | null) => void;
  setConversations: (conversations: IConversation[] | []) => void;
  setMembers: (member: string[]) => void;
}

export const useConversationStore = create<ConversationState>((set) => ({
  conversations: [],
  members: [],
  selectedChatId: null,
  setSelectedChatId: (chatId) => set({ selectedChatId: chatId }),
  setConversations: (conversations) => set({ conversations }),
  setMembers: async (member: string[]) => {
    try {
      if(member.length > 0) {
        const response = await getListUserByListUserId(member);
        set({ members: response });
      }
    } catch (error) {
      return error;
    }
  },
}));
