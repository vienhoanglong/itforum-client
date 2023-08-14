import Topic from "@/interface/topic";
import { create } from "zustand";
import {
  getAllTopic,
  getListTopicByListTopicId,
} from "@/services/topicService";
interface TopicState {
  listAllTopic: Topic[] | null;
  listUserTopic: Topic[] | null;
  getTopic: () => void;
  getUserTopic: (listId: string) => void;
}
export const useTopicStore = create<TopicState>((set) => ({
  listAllTopic: null,
  listUserTopic: null,
  getTopic: async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getAllTopic();
        set(() => ({ listAllTopic: response }));
      }
    } catch (error) {
      console.error("Error setting user:", error);
    }
  },

  getUserTopic: async (listId: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getListTopicByListTopicId(listId);
        set(() => ({ listUserTopic: response }));
      }
    } catch (error) {
      console.error("Error setting user:", error);
    }
  },
}));
