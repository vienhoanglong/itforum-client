import { MenuTypes } from "@/types";
import {
  HiBell,
  HiChatAlt2,
  HiHome,
  HiDocumentDuplicate,
  HiUser,
} from "react-icons/hi";
const menus: MenuTypes[] = [
  {
    id: "home",
    name: { en: "Home", vn: "Trang chủ" },
    icon: HiHome,
    path: "/",
  },
  {
    id: "chat",
    name: { en: "Chat", vn: "Tin nhắn" },
    icon: HiChatAlt2,
    path: "/chat",
  },
  {
    id: "profileUser",
    name: { en: "My Profile", vn: "Hồ sơ" },
    icon: HiUser,
    path: "/profile",
  },
  {
    id: "notice",
    name: { en: "Notification", vn: "Thông báo" },
    icon: HiBell,
    path: "/notifications",
  },
  {
    id: "management",
    name: { en: "Management", vn: "Quản lý cá nhân" },
    icon: HiDocumentDuplicate,
    path: "/managements",
  },
];
export default menus;
