import INotification from "@/interface/notification";
import { getAllNotification } from "@/services/notificationService";
import { useUserStore } from "@/store/userStore";
import convertDateTime from "@/utils/helper";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface NotificationProps {
  newUpdate?: boolean;
}
export const NotificationRecruit: React.FC<NotificationProps> = React.memo(
  ({ newUpdate }) => {
    const { getListUserNotifi, listUserNotifi } = useUserStore();
    const [listNofiti, setListNofiti] = React.useState<INotification[]>([]);
    const formatDate = "MM-DD-YYYY";
    const [update, SetUpdate] = useState(true);
    useEffect(() => {
      if (newUpdate && newUpdate != update) {
        SetUpdate(newUpdate);
      }
    }, [newUpdate, update]);
    useEffect(() => {
      const fetchData = async () => {
        const response = await getAllNotification(0, 0, "desc");
        if (response) {
          const listUserIdNotification = response.data.data.map(
            (user: INotification) => user.createdBy
          );
          const data: INotification[] = response.data.data;
          setListNofiti(data.filter((e) => e.typeNotice === "recruitment"));
          getListUserNotifi(listUserIdNotification);
        }
      };

      fetchData();
    }, [getListUserNotifi, newUpdate, update]);
    console.log(listNofiti);
    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center mb-2 px-3">
          <h4 className="text-sm font-semibold dark:text-light0">
            New notification
          </h4>
          <Link
            to="/notification/recruitment"
            className="text-xs text-mainColor cursor-pointer hover:scale-105 hover:underline"
          >
            More
          </Link>
        </div>
        <div className="flex flex-col cursor-pointer border-solid border-mainColor border-[1px] border-t-0 border-r-0 rounded-bl-3xl p-3 pt-0">
          {listNofiti
            ?.filter((e) => e.isPublished === true && e.isDeleted === false)
            .map((notifi, index) =>
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
                        convertDateTime(
                          notifi.createdAt.toString(),
                          formatDate
                        )}
                    </span>
                  </div>
                ))
            )}
        </div>
      </div>
    );
  }
);

export default NotificationRecruit;
