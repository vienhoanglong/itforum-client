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

export const getAllDisscussion = async (
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
// export const getListAvatars = async (): Promise<IListAvatar[]> => {
//   try {
//     const response = await axios.get(
//       `https://ict-forum-server.onrender.com/user/list-avatar`
//     );
//     console.log(response.data);
//     return response.data.data;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error get list avatar");
//   }
// };

// export const UpdateDataUser = async (
//   userData: IUserUpdate,
//   id: string
// ): Promise<any> => {
//   try {
//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       throw new Error("Access token not found");
//     }
//     const response = await axios.patch(
//       `https://ict-forum-server.onrender.com/user/${id}`,
//       userData,

//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data;
//     console.log("Update response:", response.data);
//   } catch (error) {
//     console.error("Error sending update:", error);
//   }
// };

// export const uploadImage = async (file: File): Promise<any> => {
//   try {
//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       throw new Error("Access token not found");
//     }
//     const formData = new FormData();
//     formData.append("file", file);
//     const response = await axios.post(
//       "https://ict-forum-server.onrender.com/user/upload",
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     console.log(response.data);
//     return response.data.data.link;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error upload image");
//   }
// };
