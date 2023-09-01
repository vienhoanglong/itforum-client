import Topic from "@/interface/topic";
import { create } from "zustand";
import {
  getAllTopic,
  getListTopicByListTopicId,
  getListTopicByType,
  getTopicById,
} from "@/services/topicService";
interface TopicState {
  listAllTopic: Topic[] | null;
  listTopicByType: Topic[] | null;
  listUserTopic: Topic[] | null;
  listTopicByListId: Topic[] | null;
  topic: Topic | null;
  getTopic: () => void;
  getUserTopic: (listId: string) => void;
  getByTypeTopic: (type: string) => void;
  getById: (id: string) => void;
  getListByListTopicId: (listId: string) => void;
  reset: () => void;
}
export const useTopicStore = create<TopicState>((set) => ({
  listAllTopic: null,
  listTopicByListId: null,
  listUserTopic: null,
  listTopicByType: null,
  topic: null,
  getTopic: async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getAllTopic();
        set(() => ({ listAllTopic: response }));
      }
    } catch (error) {
      console.error("Error getting topic:", error);
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
      console.error("Error getting topic:", error);
    }
  },
  getListByListTopicId: async (listId: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getListTopicByListTopicId(listId);
        set(() => ({ listTopicByListId: response }));
      }
    } catch (error) {
      console.error("Error getting topic:", error);
    }
  },
  getByTypeTopic: async (type: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getListTopicByType(type);
        set(() => ({ listTopicByType: response }));
      }
    } catch (error) {
      console.error("Error getting topic:", error);
    }
  },
  getById: async (type: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getTopicById(type);
        set(() => ({ topic: response }));
      }
    } catch (error) {
      console.error("Error getting topic:", error);
    }
  },
  reset: () => {
    set(() => ({ listUserTopic: null }));
  },
}));
