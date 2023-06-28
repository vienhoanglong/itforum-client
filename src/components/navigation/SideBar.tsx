import menus from "@/constants/menu";
import React from "react";
import { HiOutlineCog, HiOutlineLogout } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { Button1 } from "../button";

export const SideBar: React.FC = () => {
  const classNavLink =
    "flex flex-row items-center px-5 py-3 cursor-pointer space-x-5 whitespace-nowrap rounded hover:text-primary transition-all justify-center md:justify-start";
  const active =
    "bg-orange-light dark:bg-transparent text-primary border-l-2 border-primary";
  return (
    <React.Fragment>
      <ul className="flex flex-col h-full space-y-4">
        <li className="pb-3 font-bold text-center md:px-5 md:text-left">
          Menu
        </li>
        {menus.map((menu) => (
          <li key={menu.id} title={menu.name.en}>
            <NavLink
              to={menu.path}
              className={({ isActive }) =>
                isActive ? `${classNavLink} ${active}` : `${classNavLink}`
              }
            >
              <menu.icon size={20} />
              <span className="hidden md:block">{menu.name.en}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <ul className="flex flex-col space-y-4">
        <li
          title="Settings"
          className="flex flex-row items-center justify-center px-5 py-3 rounded cursor-pointer md:justify-start hover:text-primary"
        >
          <HiOutlineCog size={20} />
          <span className="hidden md:block md:pl-5">setting</span>
        </li>
        <li className="flex items-end h-full">
          <Button1 type="button" isDanger isFull start title="Log out">
            <HiOutlineLogout size={20} />
            <span className="hidden md:block md:pl-5">logout</span>
          </Button1>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default SideBar;
