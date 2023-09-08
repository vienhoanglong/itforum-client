import LayoutSecondary from "@/layout/LayoutSecondary";
import { useNotificationStore } from "@/store/notificationStore";
import { useUserStore } from "@/store/userStore";
import convertDateTime from "@/utils/helper";
import React, { useMemo } from "react";
import { HiBell, HiChevronRight } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import Navigation from "@/components/navigation/Navigation";
import { useTranslation } from "react-i18next";
export const NotificationDetailPage: React.FC = () => {
  const formatDate = "MM-DD-YYYY";
  const { notificationId } = useParams<string>();
  const { notifications, getNotification } = useNotificationStore();
  const { getById, userById } = useUserStore();
  const { t } = useTranslation();
  useMemo(() => {
    notificationId && getNotification(notificationId);
  }, [getNotification, notificationId]);

  useMemo(() => {
    notifications && getById(notifications.createdBy);
  }, [getById, notifications]);
  return (
    <LayoutSecondary>
      <Navigation></Navigation>
      <div className=" shadow-sm flex dark:text-light0 space-x-1 items-center p-4 dark:bg-dark1 rounded-lg bg-light4">
        <HiBell></HiBell>
        <Link
          to="/notifications"
          className=" cursor-pointer underline hover:text-mainColor"
        >
          {t("notifications")}
        </Link>
        <HiChevronRight></HiChevronRight>
        <Link
          to={`/notification/${notifications?.typeNotice}`}
          className=" cursor-pointer underline hover:text-mainColor"
        >
          {t("notificationsList")}
        </Link>
        <HiChevronRight></HiChevronRight>
        <span>{t("notificationsDetail")}</span>
      </div>
      <div className=" bg-light4 p-8 dark:bg-dark1 mt-2 rounded-lg shadow-sm">
        <div className="flex justify-center items-center dark:text-light0 mt-4">
          <span className="text-center text-base font-bold">
            {notifications?.titleNotice}
          </span>
        </div>
        <div className="flex justify-between items-center space-x-1 dark:text-light0 mt-8">
          <Link
            to={`/notification/${notifications?.typeNotice}`}
            className="block cursor-pointer hover:underline hover:text-mainColor px-1 text-[10px] bg-teal0 rounded-full"
          >
            {notifications?.typeNotice}
          </Link>
          <div className="flex underline justify-center items-center space-x-1">
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
        <div className="w-full flex flex-col p-2  bg-dark0 mt-2 text-white h-auto rounded-lg">
          <div className=" mb-2">{t("attachedFiles")}:</div>
          {notifications?.filename != null ? (
            <Link to={`${notifications.file}`}>
              <span className=" hover:text-mainColor cursor-pointer hover:underline">
                {notifications.filename}
              </span>
            </Link>
          ) : (
            <div>{t("nothing")}</div>
          )}
        </div>
      </div>
    </LayoutSecondary>
  );
};

export default NotificationDetailPage;
