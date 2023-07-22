import React from "react";

interface Notification {
  title: string;
  content: string;
  author: string;
  datePosting: string;
}

interface ListNotification {
  notifications: Notification[];
}
export const Notification: React.FC<ListNotification> = ({ notifications }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center mb-2 px-3">
        <h4 className="text-sm font-semibold dark:text-light0">
          New notification
        </h4>
        <a className="text-xs text-mainColor cursor-pointer hover:scale-105 hover:underline">
          More
        </a>
      </div>
      <div className="flex flex-col cursor-pointer border-solid border-mainColor border-[1px] border-t-0 border-r-0 rounded-bl-3xl p-3 pt-0">
        {notifications.map((notifi, index) => (
          <div
            key={index}
            className="flex gap-1 flex-col bg-light4 dark:bg-dark1 p-2 rounded-lg shadow-sm relative mb-2 before:content-[''] before:w-2 before:h-2 before:rounded-full before:-left-4 before:top-[10px] before:absolute before:block before:bg-mainColor"
          >
            <span className="block w-full break-words leading-normal text-black/90 dark:text-light0 p-1 text-xs lg:text-sm line-clamp-3 hover:text-mainColor">
              {notifi.title}
            </span>
            <span className="block w-full dark:text-light0">
              {notifi.author}
            </span>
            <span className="block w-full dark:text-light0">
              {notifi.datePosting}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
