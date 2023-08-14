import SkillModel from "../model/SkillModel";
import IContactLink from "./IContactLinks";

interface IUserUpdate {
  id?: string;
  follower?: number;
  fullName?: string;
  avatar?: string;
  color?: string;
  birthday?: string;
  class?: string;
  major?: string;
  coverImage?: string;
  googleId?: string;
  desc?: string;
  skills?: SkillModel[];
  email?: string;
  address?: string;
  phone?: string;
  role?: number;
  ban?: boolean;
  links?: IContactLink[];
}

export default IUserUpdate;
