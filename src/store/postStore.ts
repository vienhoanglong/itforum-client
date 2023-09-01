import { create } from "zustand";
import { getAllPost, getPostById } from "@/services/postService";
import IPost from "@/interface/post";
interface PostState {
  listAllPost: IPost[] | null;
  post: IPost | null;
  getListPost: (
    skip: number,
    limit: number,
    sort: string,
    hastag?: string
  ) => void;
  getPostByPostId: (id: string) => void;
}
export const usePostStore = create<PostState>((set) => ({
  listAllPost: null,
  post: null,
  getListPost: async (
    skip: number,
    limit: number,
    sort: string,
    hastag?: string
  ) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getAllPost(skip, limit, sort, hastag);
        set(() => ({ listAllPost: response }));
      }
    } catch (error) {
      console.error("Error getting posts:", error);
    }
  },

  getPostByPostId: async (id: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getPostById(id);
        set(() => ({ post: response }));
      }
    } catch (error) {
      console.error("Error getting posts:", error);
    }
  },
}));
