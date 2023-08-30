import IDiscussion from "@/interface/discussion";
import {
  getAllDiscussion,
  getDiscussionById,
  getDiscussionByStatus,
} from "@/services/discussionService";
import { create } from "zustand";

interface DiscussionState {
  listDiscuss: IDiscussion[] | null;
  listDiscussForSearch: IDiscussion[] | null;
  discussion: IDiscussion | null;
  listDiscussByStatus: IDiscussion[] | null;
  getDiscussById: (id: string) => void;
  getDiscussByStatus: (
    status: number,
    isDraft: boolean,
    skip: number,
    limit: number,
    sort: string,
    topicId?: string
  ) => void;
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
export const useDiscussionStore = create<DiscussionState>((set) => ({
  listDiscuss: null,
  discussion: null,
  listDiscussForSearch: null,
  listDiscussByStatus: null,
  getListDiscussion: async (
    skip: number,
    limit: number,
    sort?: string,
    topicId?: string
  ) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getAllDiscussion(skip, limit, sort, topicId);
        set(() => ({ listDiscuss: response.data.data }));
      }
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
  getDiscussByStatus: async (
    status: number,
    isDraft: boolean,
    skip: number,
    limit: number,
    sort: string,
    topicId?: string
  ) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getDiscussionByStatus(
          status,
          isDraft,
          skip,
          limit,
          sort,
          topicId
        );
        set(() => ({ listDiscussByStatus: response }));
      }
    } catch (error) {
      console.error("Error setting discuss:", error);
    }
  },
}));
