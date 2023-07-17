import IContactLink from "../API/IContactLinks";
import SkillModel from "./SkillModel";

interface UserModel {
  id: string;
  follower: number;
  fullname: string;
  avatar: string;
  birthday: string;
  class: string;
  major: string;
  coverImage: string;
  about: string;
  skills: SkillModel[];
  email: string;
  address: string;
  phone: string;
  links: IContactLink[];
}

export default UserModel;
