import IDiscussion from "@/interface/discussion";
import {
  getAllDisscussion,
  getAllDisscussionFromTrash,
  getDiscussionById,
} from "@/services/discussionService";
import { create } from "zustand";

interface ManagementState {
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
}
export const useManagementStore = create<ManagementState>((set) => ({
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
      const response = await getAllDisscussion(skip, limit, sort, topicId);
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
        const response = await getAllDisscussion(skip, limit, sort, topicId);
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
        const response = await getAllDisscussionFromTrash();
        set(() => ({ discussTrash: response.data.data }));
      }
    } catch (error) {
      console.error("Error setting discuss:", error);
    }
  },
}));
