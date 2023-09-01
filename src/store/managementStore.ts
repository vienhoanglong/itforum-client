import IDiscussion from "@/interface/discussion";
import INotification from "@/interface/notification";
import Topic from "@/interface/topic";
import {
  getAllDiscussion,
  getAllDiscussionFromTrash,
  getDiscussionById,
} from "@/services/discussionService";
import {
  getAllNotification,
  getAllNotificationWithIsDelete,
} from "@/services/notificationService";
import { getAllTopic, getTopicFromTrash } from "@/services/topicService";
import { create } from "zustand";

interface ManagementState {
  listTopic: Topic[] | null;
  listTopicFromTrash: Topic[] | null;
  listNotification: INotification[] | null;
  listNotificationWithIsDeleted: INotification[] | null;
  listDiscuss: IDiscussion[] | null;
  listDiscussForSearch: IDiscussion[] | null;
  discussTrash: IDiscussion[] | null;
  discussion: IDiscussion | null;
  getDiscussFromTrash: () => void;
  getDiscussById: (id: string) => void;
  getListDiscussion: (
    skip: number,
    limit: number,
    sort?: string,
    topicId?: string
  ) => void;
  getListDiscussionForSearch: (
    skip: number,
    limit: number,
    sort?: string,
    topicId?: string
  ) => void;
  getListNotification: (skip: number, limit: number, sort: string) => void;
  getListNotificationWithIsDeleted: (isDeleted: boolean) => void;
  getListTopic: () => void;
  getListTopicFromTrash: () => void;
}
export const useManagementStore = create<ManagementState>((set) => ({
  listTopic: null,
  listTopicFromTrash: null,
  listNotification: null,
  listNotificationWithIsDeleted: null,
  listDiscuss: null,
  discussion: null,
  listDiscussForSearch: null,
  discussTrash: null,
  getListDiscussion: async (
    skip: number,
    limit: number,
    sort?: string,
    topicId?: string
  ) => {
    try {
      const response = await getAllDiscussion(skip, limit, sort, topicId);
      set(() => ({ listDiscuss: response.data.data }));
    } catch (error) {
      console.error("Error get list discuss:", error);
    }
  },
  getListDiscussionForSearch: async (
    skip: number,
    limit: number,
    sort?: string,
    topicId?: string
  ) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getAllDiscussion(skip, limit, sort, topicId);
        set(() => ({ listDiscussForSearch: response.data.data }));
      }
    } catch (error) {
      console.error("Error get list discuss:", error);
    }
  },
  getDiscussById: async (id: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getDiscussionById(id);
        set(() => ({ discussion: response }));
      }
    } catch (error) {
      console.error("Error setting discuss:", error);
    }
  },
  getDiscussFromTrash: async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getAllDiscussionFromTrash();
        set(() => ({ discussTrash: response.data.data }));
      }
    } catch (error) {
      console.error("Error setting discuss:", error);
    }
  },
  getListNotification: async (skip: number, limit: number, sort: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getAllNotification(skip, limit, sort);
        set(() => ({ listNotification: response.data.data }));
      }
    } catch (error) {
      console.error("Error setting notification:", error);
    }
  },
  getListNotificationWithIsDeleted: async (isDeleted: boolean) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getAllNotificationWithIsDelete(isDeleted);
        set(() => ({ listNotificationWithIsDeleted: response.data.data }));
      }
    } catch (error) {
      console.error("Error setting notification:", error);
    }
  },

  getListTopic: async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getAllTopic();
        set(() => ({ listTopic: response }));
      }
    } catch (error) {
      console.error("Error get list topic:", error);
    }
  },
  getListTopicFromTrash: async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getTopicFromTrash();
        set(() => ({ listTopicFromTrash: response }));
      }
    } catch (error) {
      console.error("Error get list topic:", error);
    }
  },
}));
