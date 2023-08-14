import IContact from "../API/IContact";

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
  links: IContact[];
}

export default UserModel;
