import { useNotificationStore } from "@/store/notificationStore";
import { useUserStore } from "@/store/userStore";
import convertDateTime from "@/utils/helper";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// interface Notification {
//   title: string;
//   content: string;
//   author: string;
//   datePosting: string;
// }

// interface ListNotification {
//   notifications: Notification[];
// }
export const Notification: React.FC = () => {
  const { getListNotificationNav, listNotificationNav } =
    useNotificationStore();
  const { getListUserNotifi, listUserNotifi } = useUserStore();
  const formatDate = "MM-DD-YYYY";
  useEffect(() => {
    getListNotificationNav(0, 4, "desc");
  }, [getListNotificationNav, listNotificationNav]);

  useEffect(() => {
    if (listNotificationNav && listNotificationNav.length > 0) {
      const userIDs = listNotificationNav.map((user) => user.createdBy);
      if (userIDs.length > 0) {
        getListUserNotifi(userIDs);
      }
    }
  }, [listNotificationNav]);
  console.log("hello");

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
        {listNotificationNav?.map((notifi, index) =>
          listUserNotifi
            ?.filter((e) => e._id === notifi.createdBy)
            .map((user) => (
              <div
                key={index}
                className="flex gap-1 flex-col dark:text-light0 bg-light4 dark:bg-dark1 p-2 rounded-lg shadow-sm relative mb-2 before:content-[''] before:w-2 before:h-2 before:rounded-full before:-left-4 before:top-[10px] before:absolute before:block before:bg-mainColor"
              >
                <Link
                  to={`/notifications-detail/${notifi._id}`}
                  className="cursor-pointer hover:underline hover:text-mainColor  h-auto max-h-10 break-words line-clamp-2  w-full  leading-normal   text-xs lg:text-sm"
                >
                  {notifi.titleNotice}
                </Link>
                <Link
                  to={`/user/${user._id}`}
                  className="hover:underline hover:text-mainColor  block w-full "
                >
                  {user.fullName ?? user.username}
                </Link>
                <span className="block w-full ">
                  {notifi?.createdAt &&
                    convertDateTime(notifi.createdAt.toString(), formatDate)}
                </span>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Notification;
