import ICommentCreate from "@/interface/API/ICommentCreate";
import IComment from "@/interface/comment";
import {
  CreateNewComment,
  getListCommentById,
} from "@/services/commentService";
import { create } from "zustand";

interface CommentState {
  isDeleted: boolean;
  listComment: IComment[] | null;
  comment: IComment | null;
  setIsDeleted: (isDelete: boolean) => void;
  getListComment: (
    discussionId: string,
    skip: number,
    limit: number,
    commentParentId?: string
  ) => void;
  createComment: (comment: ICommentCreate) => void;
}
export const useCommentStore = create<CommentState>((set) => ({
  isDeleted: false,
  listComment: null,
  comment: null,

  setIsDeleted: (isDelete: boolean) => {
    set(() => ({ isDeleted: isDelete }));
  },
  getListComment: async (
    discussionId: string,
    skip: number,
    limit: number,
    commentParentId?: string
  ) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getListCommentById(
          discussionId,
          skip,
          limit,
          commentParentId
        );
        set(() => ({ listComment: response.data }));
      }
    } catch (error) {
      console.error("Error get list comment:", error);
    }
  },

  createComment: async (cmt: ICommentCreate) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await CreateNewComment(cmt);
        set(() => ({ comment: response.data }));
      }
    } catch (error) {
      console.error("Error create new comment:", error);
    }
  },
}));
