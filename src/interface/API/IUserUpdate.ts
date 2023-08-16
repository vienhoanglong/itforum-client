import IContact from "./IContact";

interface IUserUpdate {
  id?: string;
  follower?: number;
  fullName?: string;
  username?: string;
  avatar?: string;
  color?: string;
  birthDay?: Date;
  coverImg?: string;
  class?: string;
  major?: string;
  coverImage?: string;
  googleId?: string;
  desc?: string;
  skill?: string[];
  email?: string;
  phoneNumber?: string;
  role?: number;
  ban?: boolean;
  address?: string;
  links?: IContact[];
}

export default IUserUpdate;
