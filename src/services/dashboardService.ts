import axios from "axios";

export const dashboardReport = async (): Promise<any> => {
    try {
      const response = await axios.get(
        `https://ict-forum-server.onrender.com/dashboard/report`
      );
  
      return response.data.data;
    } catch (error) {
      throw new Error("Error get profile");
    }
  };
  export const dashboardUser = async (): Promise<any> => {
    try {
      const response = await axios.get(
        `https://ict-forum-server.onrender.com/dashboard/user`
      );
  
      return response.data.data;
    } catch (error) {
      throw new Error("Error get profile");
    }
  };
  export const dashboardTopic = async (): Promise<any> => {
    try {
      const response = await axios.get(
        `https://ict-forum-server.onrender.com/dashboard/topic`
      );
  
      return response.data.data;
    } catch (error) {
      throw new Error("Error get profile");
    }
  };
  export const dashboardDiscussAndPosts = async (type: string): Promise<any> => {
    try {
        let url = '';
        if(type=== 'week'){
            url = 'week/4';
        }
        else if(type==='month'){
            url = 'month/6';
        }else{
            url='year/3';
        }
      const response = await axios.get(
        `https://ict-forum-server.onrender.com/dashboard/${url}`
      );
  
      return response.data.data;
    } catch (error) {
      throw new Error("Error get profile");
    }
  };