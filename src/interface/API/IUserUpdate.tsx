import SkillModel from "../model/SkillModel";
import Topic from "../topic";
import IContact from "./IContact";

interface IUserUpdate {
  id?: string;
  follower?: number;
  fullName?: string;
  avatar?: string;
  color?: string;
  birthDay?: Date;
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
