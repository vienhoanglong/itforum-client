import { MenuTypes } from "@/types";
import { HiBell, HiChatAlt2, HiHome } from "react-icons/hi";
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
    id: "notice",
    name: { en: "Notification", vn: "Thông báo" },
    icon: HiBell,
    path: "/notification",
  },
];
export default menus;
