import { MenuTypes } from "@/types";
import { HiBell, HiChatAlt2, HiHome, HiUser, HiViewGrid } from "react-icons/hi";
const menus: MenuTypes[] = [
  {
    id: "home",
    name: { en: "home", vn: "Trang chủ" },
    icon: HiHome,
    path: "/",
  },
  {
    id: "chat",
    name: { en: "chat", vn: "Tin nhắn" },
    icon: HiChatAlt2,
    path: "/chat",
  },
  {
    id: "profileUser",
    name: { en: "myProfile", vn: "Hồ sơ" },
    icon: HiUser,
    path: "/profile",
  },
  {
    id: "notice",
    name: { en: "notifications", vn: "Thông báo" },
    icon: HiBell,
    path: "/notifications",
  },
  {
    id: "topic",
    name: { en: "topics", vn: "chủ đề" },
    icon: HiViewGrid,
    path: "/topics",
  },
];
export default menus;
