import ICommentCreate from "@/interface/API/ICommentCreate";
import axios from "axios";

export const getListCommentById = async (
  discussionId: string,
  skip: number,
  limit: number,
  commentParentId?: string
): Promise<any> => {
  try {
    let apiUrl = `https://ict-forum-server.onrender.com/comment?discussId=${discussionId}&skip=${skip}&limit=${limit}`;

    if (commentParentId) {
      apiUrl += `&commentParentId=${commentParentId}`;
    }
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error get comment: ");
  }
};

export const getListCommentPostsById = async (
  postsId: string,
  skip: number,
  limit: number,
  commentParentId?: string
): Promise<any> => {
  try {
    let apiUrl = `https://ict-forum-server.onrender.com/comment?postsId=${postsId}&skip=${skip}&limit=${limit}`;

    if (commentParentId) {
      apiUrl += `&commentParentId=${commentParentId}`;
    }
    const response = await axios.get(apiUrl);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error get comment: ");
  }
};
export const CreateNewComment = async (
  comment: ICommentCreate
): Promise<any> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Access token not found");
    }
    const response = await axios.post(
      `https://ict-forum-server.onrender.com/comment`,
      comment,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Create comment response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error Create:", error);
  }
};

export const deleteComment = async (
  discussId: string,
  commentId: string
): Promise<any> => {
  try {
    const response = await axios.delete(
      `https://ict-forum-server.onrender.com/comment?discussId=${discussId}&commentId=${commentId}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error delete comment: ");
  }
};

export const deleteCommentPost = async (
  postsId: string,
  commentId: string
): Promise<any> => {
  try {
    const response = await axios.delete(
      `https://ict-forum-server.onrender.com/comment?postsId=${postsId}&commentId=${commentId}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error delete comment: ");
  }
};

export const UpdatedComment = async (
  comment: ICommentCreate,
  id: string
): Promise<any> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Access token not found");
    }
    const response = await axios.put(
      `https://ict-forum-server.onrender.com/comment/${id}`,
      comment,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
    console.log("Create response:", response.data);
  } catch (error) {
    console.error("Error update:", error);
  }
};
