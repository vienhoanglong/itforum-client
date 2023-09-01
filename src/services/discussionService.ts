import IDiscussionCreate from "@/interface/API/IDiscussionCreate";
import IDiscussion from "@/interface/discussion";
import axios from "axios";

export const getDiscussionById = async (id: string): Promise<IDiscussion> => {
  try {
    const response = await axios.get(
      `https://ict-forum-server.onrender.com/discuss/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error get discussion: ");
  }
};

export const getDiscussionByStatus = async (
  status: number,
  isDraft: boolean,
  skip: number,
  limit: number,
  sort: string,
  topicId?: string
): Promise<IDiscussion[]> => {
  try {
    let apiUrl = `https://ict-forum-server.onrender.com/discuss/discussions-by-status?skip=${skip}&limit=${limit}&sort=${sort}&statusDiscuss=${status}&isDraft=${isDraft}`;

    if (topicId) {
      apiUrl += `&topicId=${topicId}`;
    }

    const response = await axios.get(apiUrl);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error get discussion: ");
  }
};

export const deleteDiscussion = async (id: string): Promise<any> => {
  try {
    const response = await axios.delete(
      `https://ict-forum-server.onrender.com/discuss/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error delete discussion: ");
  }
};

export const moveTrashOrRestore = async (id: string): Promise<any> => {
  try {
    const response = await axios.patch(
      `https://ict-forum-server.onrender.com/discuss/trash-or-restore/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error ");
  }
};

export const updateStatusDiscussion = async (
  id: string,
  status: number
): Promise<any> => {
  try {
    const response = await axios.patch(
      `https://ict-forum-server.onrender.com/discuss/change-status/${id}/status/${status}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error to update status ");
  }
};

export const incrementView = async (id: string): Promise<IDiscussion> => {
  try {
    const response = await axios.get(
      `https://ict-forum-server.onrender.com/discuss/${id}/increment-view`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error incrementView: ");
  }
};

export const getAllDiscussionFromTrash = async (): Promise<any> => {
  try {
    const response = await axios.get(
      `https://ict-forum-server.onrender.com/discuss/trash`
    );
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error get all discussion: ");
  }
};

export const getAllDiscussion = async (
  skip: number,
  limit: number,
  sort?: string,
  topicId?: string
): Promise<any> => {
  try {
    let apiUrl = `https://ict-forum-server.onrender.com/discuss?skip=${skip}&limit=${limit}`;

    if (sort) {
      apiUrl += `&sort=${sort}`;
    }

    if (topicId) {
      apiUrl += `&topicId=${topicId}`;
    }

    const response = await axios.get(apiUrl);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error get all discussion: ");
  }
};
export const CreateNewDiscussion = async (
  discuss: IDiscussionCreate
): Promise<any> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Access token not found");
    }
    const response = await axios.post(
      `https://ict-forum-server.onrender.com/discuss`,
      discuss,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
    console.log("Create response:", response.data);
  } catch (error) {
    console.error("Error Create:", error);
  }
};

export const UpdatedDiscussion = async (
  discussionData: IDiscussionCreate,
  id: string
): Promise<any> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Access token not found");
    }
    const response = await axios.patch(
      `https://ict-forum-server.onrender.com/discuss/${id}`,
      discussionData,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error update discussion");
  }
};
