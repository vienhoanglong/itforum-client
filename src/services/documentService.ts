import IDocumentCreate from "@/interface/API/IDocumentCreate";
import IDocument from "@/interface/document";
import axios from "axios";

export const getAllDocument = async (
  topicId: string,
  skip: number,
  limit: number,
  sort: string,
  type?: string
): Promise<IDocument[]> => {
  try {
    let apiUrl = `https://ict-forum-server.onrender.com/document?topicId=${topicId}&skip=${skip}&limit=${limit}&sort=${sort}`;

    if (type) {
      apiUrl += `&type=${type}`;
    }

    const response = await axios.get(apiUrl);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error get all document: ");
  }
};

export const CreateNewDocument = async (
  createdBy: string,
  topicId: string,
  status: number,
  file: File
): Promise<any> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Access token not found");
    }
    const formData = new FormData();
    formData.append("createdBy", createdBy);
    formData.append("topicId", topicId);
    formData.append("file", file);
    formData.append("status", status.toString());

    const response = await axios.post(
      `https://ict-forum-server.onrender.com/document`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error Create:", error);
  }
};

export const deleteDocument = async (id: string): Promise<any> => {
  try {
    const response = await axios.delete(
      `https://ict-forum-server.onrender.com/document/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error delete document: ");
  }
};
