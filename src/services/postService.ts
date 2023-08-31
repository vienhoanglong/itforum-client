import IPostCreate from "@/interface/API/IPostCreate";
import IPost from "@/interface/post";
import axios from "axios";

export const CreateNewPost = async (
  post: IPostCreate,
  thumbnail: File
): Promise<any> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Access token not found");
    }
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", post.content);
    formData.append("createdBy", post.createdBy);
    post.hashtag.forEach((hashtag) => {
      formData.append("hashtag", hashtag);
    });

    formData.append("thumbnail", thumbnail);

    const response = await axios.post(
      `https://ict-forum-server.onrender.com/posts`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Create response:", response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllPost = async (
  skip: number,
  limit: number,
  sort: string,
  hashtag?: string
): Promise<any> => {
  try {
    let apiUrl = `https://ict-forum-server.onrender.com/posts?skip=${skip}&limit=${limit}&sort=${sort}`;

    if (hashtag) {
      apiUrl += `&hashtag=${hashtag}`;
    }

    const response = await axios.get(apiUrl);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error get all post: ");
  }
};

export const getPostFromTrash = async (): Promise<any> => {
  try {
    const response = await axios.get(
      `https://ict-forum-server.onrender.com/posts/trash`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error get posts");
  }
};
export const getPostById = async (id: string): Promise<any> => {
  try {
    const response = await axios.get(
      `https://ict-forum-server.onrender.com/posts/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error get posts");
  }
};

export const deletePost = async (id: string): Promise<any> => {
  try {
    const response = await axios.delete(
      `https://ict-forum-server.onrender.com/posts/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error delete post: ");
  }
};

export const UpdatePost = async (
  post: IPostCreate,
  id: string,
  thumbnail?: File
): Promise<any> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Access token not found");
    }
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", post.content);
    formData.append("createdBy", post.createdBy);
    post.hashtag.forEach((hashtag) => {
      formData.append("hashtag", hashtag);
    });
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
    const response = await axios.patch(
      `https://ict-forum-server.onrender.com/posts/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Create response:", response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const incrementViewPost = async (id: string): Promise<IPost> => {
  try {
    const response = await axios.get(
      `https://ict-forum-server.onrender.com/posts/${id}/increment-view`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error incrementView: ");
  }
};

export const changeStatusPost = async (
  id: string,
  status: number
): Promise<IPost> => {
  try {
    const response = await axios.patch(
      `https://ict-forum-server.onrender.com/posts/change-status/${id}/status/${status}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error change status post");
  }
};

export const moveTrashOrRestorePost = async (id: string): Promise<any> => {
  try {
    const response = await axios.patch(
      `https://ict-forum-server.onrender.com/posts/trash-or-restore/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error change status posts");
  }
};
