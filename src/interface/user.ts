import IContact from "./contact";

export interface IUser {
  color: string;
  _id: string;
  email: string;
  username: string;
  avatar: string;
  desc: string;
  gender: string;
  followers: string;
  ban: boolean;
  createdAt: string;
  updatedAt: string;
  googleId?: string;
  __v: number;
  role: number;
  fullName: string;
  birthDay?: string;
  skill?: string[];
  class?: string;
  contact?: IContact[];
  major?: string;
  phoneNumber?: string;
  refreshToken: string;
}
export default IUser;
