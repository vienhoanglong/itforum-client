import React, { useEffect, useRef, useState } from "react";
import { Container } from "../common";
import { AvatarImage } from "../image";
import {
  HiBell,
  HiDocumentDuplicate,
  HiOutlineLogout,
  HiPlusCircle,
  HiUser,
} from "react-icons/hi";
import logoDark from "assets/LogoDark.png";
import logoLight from "assets/LogoLight.png";

import { Button } from "../button";
import Modal from "../modal/Modal";
import PostAddNewPage from "@/modules/post/PostAddNew";
import { useUserStore } from "@/store/userStore";
import Avatar from "../image/Avatar";
import { useAuthStore } from "@/store/authStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { colorsAvatar } from "@/constants/global";
import notice from "assets/notification.png";
import { BiCheckDouble } from "react-icons/bi";
export const Header: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const { user, setUser, theme } = useUserStore();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [openNotice, setOpenNotice] = useState<boolean>(false);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    setUser();
  }, [setUser]);
  const handleLogout = async () => {
    logout();
    toast.success("Logged out successfully");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    navigate("/sign-in");
  };
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
  const handleShowNotification = () => {
    setOpenNotice(!openNotice);
  };
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        event.target &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setOpenNotice(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleNotificationClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };
  return (
    <header className="z-20 flex flex-row items-center  justify-between w-full py-4 bg-light4 shadow-sm dark:bg-dark0 dark:shadow-xl">
      <Container>
        <div className="flex-row items-center flex-1 md:space-x-3 hidden md:flex">
          <img
            srcSet={`${theme === "dark" ? logoDark : logoLight} 2.5x`}
            alt="ict-forum"
          />
        </div>
        <div className="flex flex-row items-center justify-end flex-1 gap-3">
          <Button
            size="small"
            className="p-1 flex space-x-1 text-[10px]"
            type="button"
            kind="primary"
            handle={handleAddNewPost}
          >
            <span className="text-[10px]">{t("newPost")}</span>
            <HiPlusCircle size={15}></HiPlusCircle>
          </Button>
          <div
            className="relative flex cursor-pointer p-1"
            onClick={handleShowNotification}
          >
            <div className="absolute -top-1 right-0">
              <div className="relative flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-sky-500 justify-center items-center text-white text-[10px] font-semibold">
                  9+
                </span>
              </div>
            </div>
            <HiBell
              className={`block ${openNotice ? "text-mainColor" : ""}`}
              size={30}
            ></HiBell>
            {openNotice && (
              <div
                ref={notificationRef}
                onClick={(e) => handleNotificationClick(e)}
                className="w-[300px] h-auto absolute top-[60px] -right-10 md:left-0 rounded-lg shadow-md p-2 space-y-1 bg-white text-dark2 dark:bg-dark3 dark:text-light0 outline-1 mr-6"
              >
                <div className="flex flex-row border-b-2 justify-between items-center p-2">
                  <div className="text-sm font-bold">Thông báo</div>
                  <div className="flex flex-row gap-1 cursor-pointer">
                    <BiCheckDouble />
                    <div className="text-xs">Đánh dấu đọc tất cả</div>
                  </div>
                </div>
                <div className="border-b-2 p-2">
                  <div className="rounded-lg relative flex flex-row gap-2 p-2 transition-all duration-300 ease dark:text-light0 focus:bg-subtle hover:bg-subtle hover:outline-mainColor dark:focus:bg-darker dark:hover:text-mainColor cursor-pointer ">
                    <span className="absolute inline-flex rounded-full h-2 w-2 bg-mainColor drop-shadow-2xl top-2 right-2"></span>
                    <img
                      src={notice}
                      className="rounded-full object-cover h-8 w-8"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs break-words line-clamp-2 w-11/12 font-semibold">
                        Bạn vừa nhận được một thông báo mới từ Khoa CNTT về việc
                        báo cáo dự án công nghệ thông tin 2 năm học 2022-2023
                      </span>
                      <span className="text-[10px] font-normal">
                        10 phút trước
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-center">Xem tất cả</div>
              </div>
            )}
          </div>
          <div className="relative cursor-pointer group sm:cursor-default">
            {user?.avatar ? (
              <Avatar
                cln={`h-12 w-12 rounded-full ring-2 ring-white dark:ring-dark1 object-cover border ${colorAvatar}`}
                src={user.avatar}
              ></Avatar>
            ) : (
              <AvatarImage
                name={user?.username ? user?.username : "A"}
                size={44}
              />
            )}
            <div className="absolute top-0 right-0 z-10 flex-col hidden group-hover:flex ">
              <div className="h-[58px] bg-transparent"></div>
              <div className=" flex flex-col w-full p-5 space-y-5 bg-white rounded text-dark2 dark:bg-dark3 dark:text-light0">
                <Link
                  className="flex flex-row items-center space-x-5 cursor-pointer hover:text-mainColor"
                  to="/profile"
                >
                  <HiUser size={18} title="Settings" />
                  <span className="text-sm">Profile</span>
                </Link>
                <Link
                  className="flex flex-row items-center space-x-5 cursor-pointer hover:text-mainColor"
                  to="/managements"
                >
                  <HiDocumentDuplicate size={18} title="Manegement" />
                  <span className="text-sm">Managements</span>
                </Link>
                <a
                  className="flex flex-row items-center space-x-5 cursor-pointer hover:text-red2"
                  onClick={handleLogout}
                >
                  <HiOutlineLogout size={18} title="Log out" />
                  <span className="text-sm">Log out</span>
                </a>
              </div>
            </div>
          </div>
          <div className="flex-col hidden md:flex">
            <p className="text-sm font-bold text-primary text-mainColor">
              {user?.fullName ? user?.fullName : user?.username}
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
      <ToastContainer />
    </header>
  );
});

export default Header;
