import ICommentCreate from "@/interface/API/ICommentCreate";
import IComment from "@/interface/comment";
import axios from "axios";

export const getListComment = async (
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
