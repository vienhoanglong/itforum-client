import { IconType } from "react-icons";
export interface LangTypes {
    en: string;
    vn: string;
  }
export interface MenuTypes {
    id: string;
    name: LangTypes;
    icon: IconType;
    path: string;
}