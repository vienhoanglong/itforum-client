import React from "react"
import { Container } from "../common";
import { AvatarImage } from "../image";
import { HiOutlineCog, HiOutlineLogout } from "react-icons/hi";

export const Header: React.FC = () => {
    return (
        <header className="flex flex-row items-center justify-between w-full py-4 bg-white shadow-sm dark:bg-bg-dark dark:shadow-xl">
            <Container>
            <div className="flex flex-row items-center flex-1 md:space-x-3">
                <span className="font-bold text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#EFAE63]">
                    IT→_→FORUM
                </span>
            </div>
            <div className="flex flex-row items-center justify-end flex-1 space-x-3">
          <div className="relative cursor-pointer group sm:cursor-default">
            <AvatarImage name="long" size={44} />
            <div className="absolute top-0 right-0 z-10 flex-col hidden group-hover:flex group-hover:sm:hidden">
              <div className="h-[58px] bg-transparent"></div>
              <div className="flex flex-col w-full p-5 space-y-5 bg-white rounded dark:bg-bg-dark">
                <div
                  className="flex flex-row items-center space-x-5 cursor-pointer hover:text-primary"
                >
                  <HiOutlineCog size={18} title="Settings" />
                  <span className="text-sm">Settings</span>
                </div>
                <div
                  className="flex flex-row items-center space-x-5 cursor-pointer hover:text-red"
                >
                  <HiOutlineLogout size={18} title="Log out" />
                  <span className="text-sm">Log out</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-col hidden md:flex">
            <p className="text-sm font-bold text-primary">Long</p>
            <p className="text-xs font-light text-grey-dark dark:text-white text-text1">
              vienlongdev@gmail.com
            </p>
          </div>
        </div>
            </Container>
        </header>
    );
};

export default Header;