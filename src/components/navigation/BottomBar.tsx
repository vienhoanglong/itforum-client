import menus from "@/constants/menu";
import React from "react";
import { NavLink } from "react-router-dom";

export const BottomBar: React.FC = React.memo(() => {
  const classNavLink =
    "flex justify-center py-5 cursor-pointer hover:text-mainColor transition-all";
  const active =
    "bg-subtle dark:bg-transparent text-mainColor border-t-2 border-mainColor";
  return (
    <ul className="relative flex flex-row items-center w-full shadow-md">
      {menus.map((menu) => (
        <li key={menu.id} title={menu.name.en} className="flex-1">
          <NavLink
            to={menu.path}
            className={({ isActive }) =>
              isActive ? `${classNavLink} ${active}` : `${classNavLink}`
            }
          >
            <menu.icon size={20} />
          </NavLink>
        </li>
      ))}
    </ul>
  );
});

export default BottomBar;
