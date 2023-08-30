import menus from "@/constants/menu";
import React, { useEffect, useState } from "react";
import { HiOutlineCog, HiOutlineLogout } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { Button1 } from "../button";
import Modal from "../modal/Modal";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/store/userStore";

export const SideBar: React.FC = React.memo(() => {
  const {setThemeUser} = useUserStore();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const handleOpenSetting = () => {
    setIsOpenSetting(true);
  };
  const handleCloseSetting = () => {
    setIsOpenSetting(false);
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const handleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setThemeUser(theme === "dark" ? "light" : "dark");
  };
  // bilingual
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(
    () => localStorage.getItem("i18nextLng") ?? "vn"
  );
  const handleLanguage = () => {
    setLanguage(language === "vn" ? "en" : "vn");
  };
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);
  const classNavLink =
    "flex flex-row items-center px-5 py-3 cursor-pointer space-x-5 whitespace-nowrap rounded hover:text-mainColor transition-all justify-center md:justify-start";
  const active =
    "bg-subtle dark:bg-dark1 text-mainColor border-l-2 border-mainColor";
  return (
    <div className="fixed">
      <ul className="flex flex-col h-full space-y-4 dark:text-light1 ">
        <li className="pb-3 font-bold text-sm text-center md:px-5 md:text-left">
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
      <ul className="flex flex-col space-y-4 mt-8">
        <li
          title="Settings"
          className="flex flex-row items-center justify-center px-5 py-3 rounded cursor-pointer md:justify-start hover:text-mainColor dark:text-light0"
        >
          <HiOutlineCog size={20} />
          <button
            onClick={handleOpenSetting}
            className="w-full text-left hidden md:block  md:pl-5"
          >
            Setting
          </button>
          <Modal isOpen={isOpenSetting} onClose={handleCloseSetting}>
            <div className="text-sm font-semibold dark:text-light0">
              Settings
            </div>
            <div className="z-10 flex-col space-y-4 w-[200px] mt-4">
              <div className=" flex flex-col w-full space-y-5 bg-white rounded text-dark2 dark:bg-dark1 dark:text-light0">
                <div className="flex space-x-2 items-center justify-between">
                  <span className=" block text-xs font-bold">Dark mode:</span>
                  <div
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                      theme === "dark" ? "bg-blue-600" : "bg-gray-400"
                    }`}
                    onClick={handleDarkMode}
                  >
                    <div
                      className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-300 transform ${
                        theme === "dark"
                          ? "translate-x-6 bg-white"
                          : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>

              <div className=" flex flex-col w-full space-y-5 bg-white rounded text-dark2 dark:bg-dark1 dark:text-light0">
                <div className="flex space-x-2 items-center justify-between">
                  <span className=" block text-xs font-bold">Language:</span>
                  <div
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                      language === "en" ? "bg-blue-600" : "bg-gray-400"
                    }`}
                    onClick={handleLanguage}
                  >
                    <div
                      className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-300 transform ${
                        language === "en"
                          ? "translate-x-6 bg-white"
                          : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </li>
        <li className="flex items-end h-full">
          <Button1 type="button" isDanger isFull start title="Log out">
            <HiOutlineLogout size={20} />
            <span className="hidden md:block md:pl-5">Logout</span>
          </Button1>
        </li>
      </ul>
    </div>
  );
});

export default SideBar;
