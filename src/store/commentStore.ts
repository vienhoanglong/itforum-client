import ICommentCreate from "@/interface/API/ICommentCreate";
import IComment from "@/interface/comment";
import { CreateNewComment, getListComment } from "@/services/commentService";
import { create } from "zustand";

interface CommentState {
  listComment: IComment[] | null;
  comment: ICommentCreate | null;
  getListComment: (
    discussionId: string,
    skip: number,
    limit: number,
    commentParentId?: string
  ) => void;
  createComment: (comment: ICommentCreate) => void;
}
export const useCommentStore = create<CommentState>((set) => ({
  listComment: null,
  comment: null,
  getListComment: async (
    discussionId: string,
    skip: number,
    limit: number,
    commentParentId?: string
  ) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getListComment(
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
        set(() => ({ comment: response }));
      }
    } catch (error) {
      console.error("Error create new comment:", error);
    }
  },
}));
