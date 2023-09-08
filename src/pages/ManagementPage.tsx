import React, { useEffect } from "react";
import notification from "../assets/notification.png";
import discussion from "../assets/discussion.png";
import posts from "../assets/post.png";

import LayoutSecondary from "@/layout/LayoutSecondary";
import { useUserStore } from "@/store/userStore";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ManagementPage: React.FC = React.memo(() => {
  const { user, setUser } = useUserStore();
  useEffect(() => {
    setUser();
  }, []);
  const { t } = useTranslation();
  return (
    <LayoutSecondary>
      <div className="flex justify-between items-center">
        <div className=" py-4">
          <h4 className="text-xl font-bold text-darker ">{t("managements")}</h4>
        </div>
      </div>
      <div className="max-w-full p-2 grid gap-4 grid-cols-3 max-sm:grid-cols-1 dark:text-light0">
        <div className=" p-4 justify-between flex flex-col rounded-lg bg-light4 dark:bg-dark1 shadow-md w-full h-auto">
          <div className="flex flex-col w-full space-y-2 ">
            <span className="text-base font-bold block justify-start align-top">
              {t("myPosts")}
            </span>
            <div className="w-full bg-light3 dark:bg-dark0/80 rounded-lg p-4 h-[90px] flex justify-center items-center">
              <img
                src={posts}
                className=" object-fill max-w-full max-h-full"
              ></img>
            </div>
            <span className="block justify-start">{t("myPostDesc")}</span>
          </div>

          <Link
            to={`/managements/posts/${user?._id}`}
            className="w-full p-2 rounded-full text-center bg-mainColor hover:bg-blue-600 text-light0 mt-4 font-semibold"
          >
            {t("detail")}
          </Link>
        </div>

        <div className=" p-4 justify-between flex flex-col rounded-lg bg-light4 dark:bg-dark1 shadow-md w-full h-auto">
          <div className="flex flex-col w-full space-y-2 ">
            <span className="text-base font-bold block justify-start align-top">
              {t("myDiscussion")}
            </span>
            <div className="w-full bg-light3 dark:bg-dark0/80 rounded-lg p-4 h-[90px] flex justify-center items-center">
              <img
                src={discussion}
                className=" object-fill max-w-full max-h-full"
              ></img>
            </div>
            <span className="block justify-start">
              {" "}
              {t("myDiscussionDesc")}
            </span>
          </div>

          <Link
            to={`/managements/discussions/${user?._id}`}
            className="w-full p-2 rounded-full text-center bg-mainColor hover:bg-blue-600 text-light0 mt-4 font-semibold"
          >
            {t("detail")}
          </Link>
        </div>
        {user?.role !== 2 && (
          <div className=" p-4 justify-between flex flex-col rounded-lg bg-light4 dark:bg-dark1 shadow-md w-full h-auto">
            <div className="flex flex-col w-full space-y-2 ">
              <span className="text-base font-bold block justify-start align-top">
                {t("myNotifications")}
              </span>
              <div className="w-full bg-light3 dark:bg-dark0/80 rounded-lg p-4 h-[90px] flex justify-center items-center">
                <img
                  src={notification}
                  className=" object-fill max-w-full max-h-full"
                ></img>
              </div>
              <span className="block justify-start">
                {t("myNotificationsDesc")}
              </span>
            </div>

            <Link
              to={`/managements/notifications/${user?._id}`}
              className="w-full p-2 rounded-full text-center bg-mainColor hover:bg-blue-600 text-light0 mt-4 font-semibold"
            >
              {t("detail")}
            </Link>
          </div>
        )}

        {user?.role === 0 && (
          <>
            <div className=" p-4 justify-between flex flex-col rounded-lg bg-light4 dark:bg-dark1 shadow-md w-full h-auto">
              <div className="flex flex-col w-full space-y-2 ">
                <span className="text-base font-bold block justify-start align-top">
                  {t("dashboard")}
                </span>
                <div className="w-full bg-light3 dark:bg-dark0/80 rounded-lg p-4 h-[90px] flex justify-center items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2936/2936709.png"
                    className=" object-fill max-w-full max-h-full"
                  ></img>
                </div>
                <span className="block justify-start">
                  {" "}
                  {t("dashboardDesc")}
                </span>
              </div>

              <Link
                to="/managements/dashboard"
                className="w-full p-2 rounded-full text-center bg-mainColor hover:bg-blue-600 text-light0 mt-4 font-semibold"
              >
                {t("detail")}
              </Link>
            </div>

            <div className=" p-4 justify-between flex flex-col rounded-lg bg-light4 dark:bg-dark1 shadow-md w-full h-auto">
              <div className="flex flex-col w-full space-y-2 ">
                <span className="text-base font-bold block justify-start align-top">
                  {t("users")}
                </span>
                <div className="w-full bg-light3 dark:bg-dark0/80 rounded-lg p-4 h-[90px] flex justify-center items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/1165/1165674.png"
                    className=" object-fill max-w-full max-h-full"
                  ></img>
                </div>
                <span className="block justify-start">{t("usersDesc")}</span>
              </div>

              <Link
                to="/managements/user"
                className="w-full p-2 rounded-full text-center bg-mainColor hover:bg-blue-600 text-light0 mt-4 font-semibold"
              >
                {t("detail")}
              </Link>
            </div>

            <div className=" p-4 justify-between flex flex-col rounded-lg bg-light4 dark:bg-dark1 shadow-md w-full h-auto">
              <div className="flex flex-col w-full space-y-2 ">
                <span className="text-base font-bold block justify-start align-top">
                  {t("topics")}
                </span>
                <div className="w-full bg-light3 dark:bg-dark0/80 rounded-lg p-4 h-[90px] flex justify-center items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2875/2875807.png"
                    className=" object-fill max-w-full max-h-full"
                  ></img>
                </div>
                <span className="block justify-start"> {t("topicDesc")}</span>
              </div>

              <Link
                to="/managements/topics"
                className="w-full p-2 rounded-full text-center bg-mainColor hover:bg-blue-600 text-light0 mt-4 font-semibold"
              >
                {t("detail")}
              </Link>
            </div>

            <div className=" p-4 justify-between flex flex-col rounded-lg bg-light4 dark:bg-dark1 shadow-md w-full h-auto">
              <div className="flex flex-col w-full space-y-2 ">
                <span className="text-base font-bold block justify-start align-top">
                  {t("approve")}
                </span>
                <div className="w-full bg-light3 dark:bg-dark0/80 rounded-lg p-4 h-[90px] flex justify-center items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/5442/5442020.png"
                    className=" object-fill max-w-full max-h-full"
                  ></img>
                </div>
                <span className="block justify-start">{t("approveDesc")}</span>
              </div>

              <Link
                to="/managements/approve"
                className="w-full p-2 rounded-full text-center bg-mainColor hover:bg-blue-600 text-light0 mt-4 font-semibold"
              >
                {t("detail")}
              </Link>
            </div>

            <div className=" p-4 justify-between flex flex-col rounded-lg bg-light4 dark:bg-dark1 shadow-md w-full h-auto">
              <div className="flex flex-col w-full space-y-2 ">
                <span className="text-base font-bold block justify-start align-top">
                  {t("report")}
                </span>
                <div className="w-full bg-light3 dark:bg-dark0/80 rounded-lg p-4 h-[90px] flex justify-center items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/985/985311.png"
                    className=" object-fill max-w-full max-h-full"
                  ></img>
                </div>
                <span className="block justify-start"> {t("reportDesc")}</span>
              </div>

              <Link
                to="/managements/report"
                className="w-full p-2 rounded-full text-center bg-mainColor hover:bg-blue-600 text-light0 mt-4 font-semibold"
              >
                {t("detail")}
              </Link>
            </div>
          </>
        )}
      </div>
    </LayoutSecondary>
  );
});

export default ManagementPage;
