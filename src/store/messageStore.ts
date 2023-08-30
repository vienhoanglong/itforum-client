import { IMessage } from '@/interface/message';
import { getAllMessagesInConversation } from '@/services/messageService';
import create from 'zustand';

interface MessageStoreState {
  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;
  fetchMessages: (chatId: string, page?: number, size?: number) => void;
}

export const useMessageStore = create<MessageStoreState>((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
  fetchMessages: async (chatId, page, size) => {
    try {
      const response = await getAllMessagesInConversation(chatId, page, size);
      set({ messages: response });
    } catch (error) {
      console.error(error);
    }
  },
}));
