import LayoutDefault from "@/layout/LayoutDefault";
import { Notification } from "@/modules/home/Notification";
import React, { useState } from "react";
import notification from "../assets/notifications.png";
import event from "../assets/event.png";
import other from "../assets/other.png";
import subject from "../assets/subject.png";
import job from "../assets/job.png";
import { Button } from "@/components/button";
import { HiPlusCircle } from "react-icons/hi";
import SliderNotification from "@/modules/notification/SliderNotification";
import Modal from "@/components/modal/Modal";
import { AddNewNotifications } from "@/modules/notification/AddNewNotifications";
import INotificationCreate from "@/interface/API/INotificationCreate";
import { CreateNewNotification } from "@/services/notificationService";
import { toast } from "react-toastify";
import { useNotificationStore } from "@/store/notificationStore";
import { useUserStore } from "@/store/userStore";
import { Link } from "react-router-dom";
import NotificationRecruit from "@/modules/home/NotificationRecruit";
import { useTranslation } from "react-i18next";

const NotificationPage: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const { getListNotificationNav } = useNotificationStore();
  const { user } = useUserStore();
  const [isModalOpenAddNotifi, setIsModalOpenAddNotifi] = useState(false); // config modal add
  const [update, setUpdate] = useState(true);
  const [updateNotification, setUpdateNotification] = useState(true);
  const handleAddNewNotifi = () => {
    setIsModalOpenAddNotifi(true);
  };

  const handleCloseModalAdd = () => {
    setIsModalOpenAddNotifi(false);
  };
  const handleFormSubmit = async (notice: INotificationCreate, file?: File) => {
    try {
      if (file) {
        await CreateNewNotification(notice, file);
      } else {
        await CreateNewNotification(notice);
      }
      if (notice.level === "important") {
        setUpdate(!update);
      }
      await getListNotificationNav(0, 4, "desc");
      setUpdateNotification(!updateNotification);
      setIsModalOpenAddNotifi(false);
      toast.success(" Create notification successfully! ", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (err) {
      if (err) {
        toast.error(" Create notification failed! ", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <LayoutDefault
      childrenOther={
        user?.role !== 3 ? (
          <Notification newUpdate={updateNotification} />
        ) : (
          <NotificationRecruit
            newUpdate={updateNotification}
          ></NotificationRecruit>
        )
      }
    >
      <div className="flex flex-wrap justify-between items-center">
        <div className=" py-4">
          <h4 className="text-xl font-bold text-darker ">
            {t("notifications")}
          </h4>
        </div>
        {user?.role !== 2 && (
          <Button
            size="small"
            className="p-1 max-sm:mb-2 flex space-x-1"
            type="button"
            kind="secondary"
            handle={handleAddNewNotifi}
          >
            <span className="text-[12px]">{t("newNotifications")}</span>
            <HiPlusCircle size={15}></HiPlusCircle>
          </Button>
        )}
        <Modal isOpen={isModalOpenAddNotifi} onClose={handleCloseModalAdd}>
          <AddNewNotifications
            onSubmit={handleFormSubmit}
          ></AddNewNotifications>
        </Modal>
      </div>
      {user?.role !== 3 && (
        <div className="">
          <SliderNotification newUpdate={update}></SliderNotification>
        </div>
      )}
      <div className="w-full p-2 grid gap-4 grid-cols-2 max-sm:grid-cols-1 dark:text-light0">
        {user?.role !== 3 && (
          <div className=" p-4 justify-between flex flex-col rounded-lg bg-light4 dark:bg-dark1 shadow-md w-full h-auto">
            <div className="flex flex-col w-full space-y-2 ">
              <span className="text-base font-bold block justify-start align-top">
                {t("all")}
              </span>
              <div className="w-full bg-light3 dark:bg-dark0/80 rounded-lg p-4 h-[90px] flex justify-center items-center">
                <img
                  src={notification}
                  className=" object-fill max-w-full max-h-full"
                ></img>
              </div>
              <span className="block justify-start">{t("allTypeDesc")}</span>
            </div>

            <Link
              to="/notification/all"
              className="w-full p-2 rounded-full text-center bg-mainColor hover:bg-blue-600 text-light0 mt-4 font-semibold"
            >
              {t("viewAll")}
            </Link>
          </div>
        )}
        <div className=" p-4 justify-between flex flex-col rounded-lg bg-light4 dark:bg-dark1 shadow-md w-full h-auto">
          <div className="flex flex-col w-full space-y-2 ">
            <span className="text-base font-bold block justify-start align-top">
              {t("recruitment")}
            </span>
            <div className="w-full bg-light3 dark:bg-dark0/80 rounded-lg p-4 h-[90px] flex justify-center items-center">
              <img
                src={job}
                className=" object-fill max-w-full max-h-full"
              ></img>
            </div>
            <span className="block justify-start"> {t("recuitTypeDesc")}</span>
          </div>

          <Link
            to="/notification/recruitment"
            className="w-full p-2 rounded-full text-center bg-mainColor hover:bg-blue-600 text-light0 mt-4 font-semibold"
          >
            {t("viewAll")}
          </Link>
        </div>
        {user?.role !== 3 && (
          <>
            <div className=" p-4 justify-between flex flex-col rounded-lg bg-light4 dark:bg-dark1 shadow-md w-full h-auto">
              <div className="flex flex-col w-full space-y-2 ">
                <span className="text-base font-bold block justify-start align-top">
                  {t("event")}
                </span>
                <div className="w-full bg-light3 dark:bg-dark0/80 rounded-lg p-4 h-[90px] flex justify-center items-center">
                  <img
                    src={event}
                    className=" object-fill max-w-full max-h-full"
                  ></img>
                </div>
                <span className="block justify-start">
                  {t("eventTypeDesc")}
                </span>
              </div>

              <Link
                to="/notification/event"
                className="w-full p-2 rounded-full text-center bg-mainColor hover:bg-blue-600 text-light0 mt-4 font-semibold"
              >
                {t("viewAll")}
              </Link>
            </div>

            <div className=" p-4 justify-between flex flex-col rounded-lg bg-light4 dark:bg-dark1 shadow-md w-full h-auto">
              <div className="flex flex-col space-y-2 w-full ">
                <span className="text-base font-bold block justify-start align-top">
                  {t("subject")}
                </span>
                <div className="w-full bg-light3 dark:bg-dark0/80 rounded-lg p-4 h-[90px] flex justify-center items-center">
                  <img
                    src={subject}
                    className=" object-fill max-w-full max-h-full"
                  ></img>
                </div>
                <span className="block justify-start">
                  {t("subjectTypeDesc")}
                </span>
              </div>

              <Link
                to="/notification/subject"
                className="w-full p-2 rounded-full text-center bg-mainColor hover:bg-blue-600 text-light0 mt-4 font-semibold"
              >
                {t("viewAll")}
              </Link>
            </div>
            <div className=" p-4 justify-between flex flex-col rounded-lg bg-light4 dark:bg-dark1 shadow-md w-full h-auto">
              <div className="flex flex-col space-y-2 w-full ">
                <span className="text-base font-bold block justify-start align-top">
                  {t("others")}
                </span>
                <div className="w-full bg-light3 dark:bg-dark0/80 rounded-lg p-4 h-[90px] flex justify-center items-center">
                  <img
                    src={other}
                    className=" object-fill max-w-full max-h-full"
                  ></img>
                </div>
                <span className="block justify-start">
                  {t("otherTypeDesc")}
                </span>
              </div>

              <Link
                to="/notification/other"
                className="w-full p-2 rounded-full text-center bg-mainColor hover:bg-blue-600 text-light0 mt-4 font-semibold"
              >
                {t("viewAll")}
              </Link>
            </div>
          </>
        )}
      </div>
    </LayoutDefault>
  );
});

export default NotificationPage;
