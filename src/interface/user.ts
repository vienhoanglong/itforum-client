import IContact from "./API/IContact";

export interface IUser {
  color?: string;
  _id?: string;
  email?: string;
  username?: string;
  avatar?: string;
  desc?: string;
  gender?: string;
  followers?: string;
  ban?: boolean;
  createdAt?: string;
  updatedAt?: string;
  googleId?: string;
  __v?: number;
  role?: number;
  fullName?: string;
  birthDay?: Date;
  skill?: string[];
  class?: string;
  address?: string;
  links?: IContact[];
  major?: string;
  phoneNumber?: string;
  refreshToken?: string;
}
export default IUser;
