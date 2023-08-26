import LayoutSecondary from "@/layout/LayoutSecondary";
import { useNotificationStore } from "@/store/notificationStore";
import { useUserStore } from "@/store/userStore";
import convertDateTime from "@/utils/helper";
import React, { useMemo } from "react";
import { HiArrowCircleLeft, HiBell, HiChevronRight } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
export const NotificationDetailPage: React.FC = () => {
  const formatDate = "MM-DD-YYYY";
  const { notificationId } = useParams<string>();
  const { notifications, getNotification } = useNotificationStore();
  const { getById, userById } = useUserStore();
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };
  useMemo(() => {
    notificationId && getNotification(notificationId);
  }, [getNotification, notificationId]);

  useMemo(() => {
    notifications && getById(notifications.createdBy);
  }, [getById, notifications]);
  return (
    <LayoutSecondary>
      <button
        className="dark:text-light0 bg- rounded-full mb-4 pr-1 link inline-flex items-center text-sm font-medium !text-grey-600 bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark1"
        onClick={handleBackButtonClick}
      >
        <HiArrowCircleLeft className="w-6 h-6 mr-1" />
        Back
      </button>
      <div className=" shadow-sm flex dark:text-light0 space-x-1 items-center p-4 dark:bg-dark1 rounded-lg bg-light4">
        <HiBell></HiBell>
        <Link
          to="/notifications"
          className=" cursor-pointer underline hover:text-mainColor"
        >
          Notification
        </Link>
        <HiChevronRight></HiChevronRight>
        <Link
          to="/notification-list"
          className=" cursor-pointer underline hover:text-mainColor"
        >
          Notification List
        </Link>
        <HiChevronRight></HiChevronRight>
        <span>Notification Detail</span>
      </div>
      <div className=" bg-light4 p-8 dark:bg-dark1 mt-2 rounded-lg shadow-sm">
        <div className="flex justify-center items-center dark:text-light0 mt-4">
          <span className="text-center text-base font-bold">
            {notifications?.titleNotice}
          </span>
        </div>
        <div className="flex justify-between items-center space-x-1 dark:text-light0 mt-8">
          <Link
            to="/"
            className="block cursor-pointer hover:underline hover:text-mainColor px-1 text-[10px] bg-teal0 rounded-full"
          >
            {notifications?.typeNotice}
          </Link>
          <div className="flex justify-center items-center space-x-1">
            <Link
              to={`/user/${userById?._id}`}
              className="block hover:underline cursor-pointer hover:text-mainColor"
            >
              {userById?.fullName ?? userById?.username}
            </Link>
            <span className="block">
              | Published:{" "}
              {notifications?.createdAt &&
                convertDateTime(notifications.createdAt.toString(), formatDate)}
            </span>
          </div>
        </div>
        <div className="dark:text-light0 mt-8 leading-normal">
          <div className="ql-snow">
            {notifications && notifications.descNotice && (
              <div className="ql-editor">{parse(notifications.descNotice)}</div>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col p-2  bg-dark0 mt-2 dark:text-white h-auto rounded-lg">
          <div className=" mb-2">File đính kèm:</div>
          {notifications?.filename != null ? (
            <Link to={`${notifications.file}`}>
              <span className=" hover:text-mainColor cursor-pointer hover:underline">
                {notifications.filename}
              </span>
            </Link>
          ) : (
            <div>Không có</div>
          )}
        </div>
      </div>
    </LayoutSecondary>
  );
};

export default NotificationDetailPage;
