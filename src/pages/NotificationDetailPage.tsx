import { notifications } from "@/constants/global";
import LayoutDefault from "@/layout/LayoutDefault";
import FiltersBox from "@/modules/home/FiltersBox";
import { Notification } from "@/modules/home/Notification";
import React from "react";

export const NotificationDetailPage: React.FC = () => {
  return (
    <LayoutDefault
      childrenOther={<Notification notifications={notifications} />}
    >
      <div className=" py-4">
        <h4 className="text-xl font-bold text-darker ">Notifications</h4>
      </div>
      <FiltersBox></FiltersBox>
      {notifications.map((notifi, index) => (
        <div
          key={index}
          className="flex w-full space-x-2 cursor-pointer bg-light4 shadow-sm dark:bg-dark1 rounded-lg py-2 px-4 my-3"
        >
          <div className="w-full h-full flex flex-col">
            <a
              href="/post-detail"
              className="w-full break-words leading-normal text-black/90 dark:text-light0 p-1 text-sm font-semibold line-clamp-3 hover:text-mainColor"
            >
              {notifi.title}
            </a>

            <div className=" break-words line-clamp-3 text-black/90 dark:text-light0 lg:mb-0 lg:pr-8 text-xs">
              {notifi.content}
            </div>
            <div className="flex flex-wrap justify-start space-x-2 mt-1">
              <span className="block text-mainColor font-thin">
                By: {notifi.author}
              </span>
              <span className="mx-2 dark:text-light0">-</span>
              <span className="font-thin block dark:text-light0">
                {notifi.datePosting}
              </span>
            </div>
          </div>
        </div>
      ))}
    </LayoutDefault>
  );
};

export default NotificationDetailPage;
