import React, { useState } from "react";
import { Container } from "../common";
import { AvatarImage } from "../image";
import {
  HiDocumentDuplicate,
  HiOutlineLogout,
  HiPlusCircle,
  HiUser,
} from "react-icons/hi";
import logo from "assets/logo-text.png";
import { Button } from "../button";
import Modal from "../modal/Modal";
import PostAddNewPage from "@/modules/post/PostAddNew";
export const Header: React.FC = () => {
  const [isModalOpenAddPost, setIsModalOpenAddPost] = useState(false); // config modal add
  const handleAddNewPost = () => {
    setIsModalOpenAddPost(true);
  };

  const handleCloseModalAdd = () => {
    setIsModalOpenAddPost(false);
  };
  return (
    <header className="z-20 flex flex-row items-center  justify-between w-full py-4 bg-light4 shadow-sm dark:bg-dark0 dark:shadow-xl">
      <Container>
        <div className="flex flex-row items-center flex-1 md:space-x-3">
          <img srcSet={`${logo} 3.5x`} alt="ict-forum" />
        </div>
        <div className="flex flex-row items-center justify-end flex-1 space-x-3">
          <Button
            size="small"
            className="p-1 flex space-x-1"
            type="button"
            kind="primary"
            handle={handleAddNewPost}
          >
            <span className="text-[12px]">New post</span>
            <HiPlusCircle size={15}></HiPlusCircle>
          </Button>

          <div className="relative cursor-pointer group sm:cursor-default">
            <AvatarImage name="long" size={44} />
            <div className="absolute top-0 right-0 z-10 flex-col hidden group-hover:flex ">
              <div className="h-[58px] bg-transparent"></div>
              <div className=" flex flex-col w-full p-5 space-y-5 bg-white rounded text-dark2 dark:bg-dark3 dark:text-light0">
                <a
                  className="flex flex-row items-center space-x-5 cursor-pointer hover:text-mainColor"
                  href="/profile"
                >
                  <HiUser size={18} title="Settings" />
                  <span className="text-sm">Profile</span>
                </a>
                <a
                  className="flex flex-row items-center space-x-5 cursor-pointer hover:text-mainColor"
                  href="/managements"
                >
                  <HiDocumentDuplicate size={18} title="Manegement" />
                  <span className="text-sm">Managements</span>
                </a>
                <a className="flex flex-row items-center space-x-5 cursor-pointer hover:text-red2">
                  <HiOutlineLogout size={18} title="Log out" />
                  <span className="text-sm">Log out</span>
                </a>
              </div>
            </div>
          </div>
          <div className="flex-col hidden md:flex">
            <p className="text-sm font-bold text-primary text-mainColor">
              Viên Hoàng Long
            </p>
            <p className="text-xs font-light text-dark1 dark:text-light0 ">
              vienlongdev@gmail.com
            </p>
          </div>
        </div>
      </Container>
      <Modal isOpen={isModalOpenAddPost} onClose={handleCloseModalAdd}>
        <PostAddNewPage onCancel={handleCloseModalAdd}></PostAddNewPage>
      </Modal>
    </header>
  );
};

export default Header;
