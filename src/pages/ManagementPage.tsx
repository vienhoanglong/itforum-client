import React from "react";
import notification from "../assets/notification.png";
import discussion from "../assets/discussion.png";
import posts from "../assets/post.png";

import LayoutSecondary from "@/layout/LayoutSecondary";

const ManagementPage: React.FC = () => {
  return (
    <LayoutSecondary>
      <div className="flex justify-between items-center">
        <div className=" py-4">
          <h4 className="text-xl font-bold text-darker ">Management</h4>
        </div>
      </div>
      <div className="max-w-full p-2 grid gap-4 grid-cols-3 max-sm:grid-cols-1 dark:text-light0">
        <div className=" p-4 justify-between flex flex-col rounded-lg bg-light4 dark:bg-dark1 shadow-md w-full h-auto">
          <div className="flex flex-col w-full space-y-2 ">
            <span className="text-base font-bold block justify-start align-top">
              Posts
            </span>
            <div className="w-full bg-light3 dark:bg-dark0/80 rounded-lg p-4 h-[90px] flex justify-center items-center">
              <img
                src={posts}
                className=" object-fill max-w-full max-h-full"
              ></img>
            </div>
            <span className="block justify-start">
              Quản lý tất cả bài viết của bạn.
            </span>
          </div>

          <a
            href="/managements/posts"
            className="w-full p-2 rounded-full text-center bg-mainColor hover:bg-blue-600 text-light0 mt-4 font-semibold"
          >
            Chi tiết
          </a>
        </div>
        <div className=" p-4 justify-between flex flex-col rounded-lg bg-light4 dark:bg-dark1 shadow-md w-full h-auto">
          <div className="flex flex-col w-full space-y-2 ">
            <span className="text-base font-bold block justify-start align-top">
              Discussions
            </span>
            <div className="w-full bg-light3 dark:bg-dark0/80 rounded-lg p-4 h-[90px] flex justify-center items-center">
              <img
                src={discussion}
                className=" object-fill max-w-full max-h-full"
              ></img>
            </div>
            <span className="block justify-start">
              {" "}
              Quản lý tất cả bài thảo luận của bạn.
            </span>
          </div>

          <a
            href="/managements/discussions"
            className="w-full p-2 rounded-full text-center bg-mainColor hover:bg-blue-600 text-light0 mt-4 font-semibold"
          >
            Chi tiết
          </a>
        </div>

        <div className=" p-4 justify-between flex flex-col rounded-lg bg-light4 dark:bg-dark1 shadow-md w-full h-auto">
          <div className="flex flex-col w-full space-y-2 ">
            <span className="text-base font-bold block justify-start align-top">
              Notifications
            </span>
            <div className="w-full bg-light3 dark:bg-dark0/80 rounded-lg p-4 h-[90px] flex justify-center items-center">
              <img
                src={notification}
                className=" object-fill max-w-full max-h-full"
              ></img>
            </div>
            <span className="block justify-start">
              Quản lý tất cả các thông báo của bạn.
            </span>
          </div>

          <a
            href="/managements/notifications"
            className="w-full p-2 rounded-full text-center bg-mainColor hover:bg-blue-600 text-light0 mt-4 font-semibold"
          >
            Chi tiết
          </a>
        </div>
      </div>
    </LayoutSecondary>
  );
};

export default ManagementPage;
