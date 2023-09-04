import { create } from "zustand";
import {
  getAllPost,
  getPostById,
  getPostFromTrash,
  getPostsBySearch,
} from "@/services/postService";
import IPost from "@/interface/post";
import IUser from "@/interface/user";
import { getUserByListId } from "@/services/userService";
interface PostState {
  listAllPost: IPost[] | null;
  listPostsFromTrash: IPost[] | null;
  listPostFromSearch: IPost[] | null;
  listUserPosts: IUser[] | null;
  post: IPost | null;
  getListPost: (
    skip: number,
    limit: number,
    sort: string,
    hastag?: string
  ) => void;
  getPostByPostId: (id: string) => void;
  getListPostsFromTrash: () => void;
  getListPostBySearch: (search: string) => void;
  getListUserPost: (listId: string[]) => void;
  change: boolean;
  setChange: (newChange: boolean) => void;
}
export const usePostStore = create<PostState>((set) => ({
  change: false,
  listPostsFromTrash: null,
  listPostFromSearch: null,
  listUserPosts: null,
  listAllPost: null,
  post: null,
  setChange: (newChange: boolean) => {
    set(() => ({ change: newChange }));
  },
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
        set(() => ({ listAllPost: response.data.data }));
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
  getListPostsFromTrash: async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getPostFromTrash();
        set(() => ({ listPostsFromTrash: response }));
      }
    } catch (error) {
      console.error("Error getting posts:", error);
    }
  },
  getListPostBySearch: async (search: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getPostsBySearch(search);
        set(() => ({ listPostFromSearch: response.data.data }));
      }
    } catch (error) {
      console.error("Error get posts:", error);
    }
  },
  getListUserPost: async (listId: string[]) => {
    try {
      const reponse = await getUserByListId(listId);
      set(() => ({ listUserPosts: reponse.data }));
    } catch (err) {
      return;
    }
  },
}));
