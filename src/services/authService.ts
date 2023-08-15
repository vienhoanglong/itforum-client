import axios, { AxiosResponse } from "axios";
export interface VerifyOTPReturn {
  data?: any;
  error?: {
    message: string;
  };
}
export const login = async (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(
      "https://ict-forum-server.onrender.com/auth/login",
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating");
  }
};
export const loginGoogle = async (
  sub: string,
  email: string,
  name: string,
  picture: string
): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(
      "https://ict-forum-server.onrender.com/auth/loginGoogle",
      {
        sub,
        email,
        name,
        picture,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Login fail");
  }
};
// export const logout = async(): Promise<AxiosResponse> =>{
//     try {
//         const response = await axios.get('https://ict-forum-server.onrender.com/auth/logout');
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         throw new Error('Logout fail');
//     }
// }

export const getOTP = async (email: string): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(
      `https://ict-forum-server.onrender.com/auth/sendOTP/{email}?email=${email}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("get fail");
  }
};

export const verifyOTP = async (
  email: string,
  otp: string
): Promise<VerifyOTPReturn> => {
  try {
    const response = await axios.post(
      "https://ict-forum-server.onrender.com/auth/verifyOTP",
      {
        email,
        otp,
      }
    );
    return response.data;
  } catch (error: any) {
    return {
      error: { message: error?.response?.data?.message || "Error verify otp" },
    };
  }
};

export const verifyNewPassword = async (
  email: string,
  password: string,
  repeatPassword: string
): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(
      "https://ict-forum-server.onrender.com/auth/changePassword",
      {
        email,
        password,
        repeatPassword,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error verify new password");
  }
};
