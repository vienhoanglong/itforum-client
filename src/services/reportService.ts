import IReportApprove from "@/interface/API/IReportApprove";
import IReportCreate from "@/interface/API/IReportCreate";
import axios from "axios";

export const ApproveReport = async (approve: IReportApprove): Promise<any> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Access token not found");
    }

    const response = await axios.post(
      `https://ict-forum-server.onrender.com/report/approve`,
      approve,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Approve response:", response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const RejectReport = async (id: string): Promise<any> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Access token not found");
    }

    const response = await axios.patch(
      `https://ict-forum-server.onrender.com/report/${id}`
    );
    console.log("Reject reprt response:", response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const CreateReport = async (report: IReportCreate): Promise<any> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Access token not found");
    }

    const response = await axios.post(
      `https://ict-forum-server.onrender.com/report`,
      report,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Create response:", response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllReport = async (
  skip: number,
  limit: number,
  sort: string,
  hashtag?: string
): Promise<any> => {
  try {
    let apiUrl = `https://ict-forum-server.onrender.com/report?skip=${skip}&limit=${limit}&sort=${sort}`;

    if (hashtag) {
      apiUrl += `&hashtag=${hashtag}`;
    }

    const response = await axios.get(apiUrl);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error get all report: ");
  }
};
