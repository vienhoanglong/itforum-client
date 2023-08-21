import { IMessage } from '@/interface/message';
import { getAllMessagesInConversation } from '@/services/messageService';
import create from 'zustand';

interface MessageStoreState {
  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;
  fetchMessages: (chatId: string) => void;
}

export const useMessageStore = create<MessageStoreState>((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
  fetchMessages: async (chatId) => {
    try {
      const response = await getAllMessagesInConversation(chatId);
      set({ messages: response });
    } catch (error) {
      console.error(error);
    }
  }
}));
