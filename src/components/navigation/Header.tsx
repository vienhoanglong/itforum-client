import React, { useEffect, useMemo, useState } from "react";
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
import { useUserStore } from "@/store/userStore";
import Avatar from "../image/Avatar";
import { colorsAvatar } from "@/constants/global";
export const Header: React.FC = () => {
  const { user, setUser } = useUserStore();

  useMemo(() => {
    setUser();
    console.log(user);
  }, [setUser]);

  const [isModalOpenAddPost, setIsModalOpenAddPost] = useState(false); // config modal add
  const handleAddNewPost = () => {
    setIsModalOpenAddPost(true);
  };

  const handleCloseModalAdd = () => {
    setIsModalOpenAddPost(false);
  };
  const getColorAvatar = user
    ? colorsAvatar.find((item) => item.color === user.color)
    : null;
  const colorAvatar = getColorAvatar ? getColorAvatar.value : "";
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
            {user?.avatar ? (
              <Avatar
                cln={`h-12 w-12 rounded-full ring-2 ring-white dark:ring-dark1 object-cover border ${colorAvatar}`}
                src={user.avatar}
              ></Avatar>
            ) : (
              <AvatarImage
                name={
                  user ? (user.fullName ? user.fullName : user.username) : ""
                }
                size={44}
              />
            )}
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
              {user ? (user.fullName ? user.fullName : user.username) : ""}
            </p>
            <p className="text-xs font-light text-dark1 dark:text-light0 ">
              {user?.email}
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
