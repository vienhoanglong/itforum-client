import { notifications } from "@/constants/global";
import LayoutDefault from "@/layout/LayoutDefault";
import { Notification } from "@/modules/home/Notification";
import React from "react";
import notification from "../assets/notification.png";
import event from "../assets/event.png";
import subject from "../assets/subject.png";
import job from "../assets/job.png";
import { Button } from "@/components/button";
import { HiPlusCircle } from "react-icons/hi";
import SliderNotification from "@/modules/notification/SliderNotification";

const NotificationPage: React.FC = () => {
  return (
    <LayoutDefault
      childrenOther={<Notification notifications={notifications} />}
    >
      <div className="flex justify-between items-center">
        <div className=" py-4">
          <h4 className="text-xl font-bold text-darker ">Notifications</h4>
        </div>
        <Button
          size="small"
          className="p-1 flex space-x-1"
          type="button"
          kind="secondary"
        >
          <span className="text-[12px]">New notification</span>
          <HiPlusCircle size={15}></HiPlusCircle>
        </Button>
      </div>
      <div className=" min-[768px]:hidden">
        <SliderNotification></SliderNotification>
      </div>

      <div className="w-full p-2 grid gap-4 grid-cols-2 max-sm:grid-cols-1 dark:text-light0">
        <div className=" p-4 justify-between flex flex-col rounded-lg bg-light4 dark:bg-dark1 shadow-md w-full h-auto">
          <div className="flex flex-col w-full space-y-2 ">
            <span className="text-base font-bold block justify-start align-top">
              Tất cả
            </span>
            <div className="w-full bg-light3 dark:bg-dark0/80 rounded-lg p-4 h-[90px] flex justify-center items-center">
              <img
                src={notification}
                className=" object-fill max-w-full max-h-full"
              ></img>
            </div>
            <span className="block justify-start">
              Tất cả thông báo của Khoa, bao gồm các hoạt động, học tập, quy
              định,...
            </span>
          </div>

          <a
            href="/notification-detail"
            className="w-full p-2 rounded-full text-center bg-mainColor hover:bg-blue-600 text-light0 mt-4 font-semibold"
          >
            Xem tất cả
          </a>
        </div>
        <div className=" p-4 justify-between flex flex-col rounded-lg bg-light4 dark:bg-dark1 shadow-md w-full h-auto">
          <div className="flex flex-col w-full space-y-2 ">
            <span className="text-base font-bold block justify-start align-top">
              Tuyển dụng
            </span>
            <div className="w-full bg-light3 dark:bg-dark0/80 rounded-lg p-4 h-[90px] flex justify-center items-center">
              <img
                src={job}
                className=" object-fill max-w-full max-h-full"
              ></img>
            </div>
            <span className="block justify-start">
              {" "}
              Các thông tin về tuyển dụng, cơ hội việc làm, và các chương trình
              hỗ trợ sinh viên
            </span>
          </div>

          <a
            href="/notification-detail"
            className="w-full p-2 rounded-full text-center bg-mainColor hover:bg-blue-600 text-light0 mt-4 font-semibold"
          >
            Xem tất cả
          </a>
        </div>

        <div className=" p-4 justify-between flex flex-col rounded-lg bg-light4 dark:bg-dark1 shadow-md w-full h-auto">
          <div className="flex flex-col w-full space-y-2 ">
            <span className="text-base font-bold block justify-start align-top">
              Sự kiện
            </span>
            <div className="w-full bg-light3 dark:bg-dark0/80 rounded-lg p-4 h-[90px] flex justify-center items-center">
              <img
                src={event}
                className=" object-fill max-w-full max-h-full"
              ></img>
            </div>
            <span className="block justify-start">
              Các sự kiện sắp tới, bao gồm các buổi hội thảo, cuộc thi, và các
              hoạt động thú vị{" "}
            </span>
          </div>

          <a
            href="/notification-detail"
            className="w-full p-2 rounded-full text-center bg-mainColor hover:bg-blue-600 text-light0 mt-4 font-semibold"
          >
            Xem tất cả
          </a>
        </div>

        <div className=" p-4 justify-between flex flex-col rounded-lg bg-light4 dark:bg-dark1 shadow-md w-full h-auto">
          <div className="flex flex-col space-y-2 w-full ">
            <span className="text-base font-bold block justify-start align-top">
              Môn học
            </span>
            <div className="w-full bg-light3 dark:bg-dark0/80 rounded-lg p-4 h-[90px] flex justify-center items-center">
              <img
                src={subject}
                className=" object-fill max-w-full max-h-full"
              ></img>
            </div>
            <span className="block justify-start">
              Thông tin về các môn học, lịch học và giảng viên
            </span>
          </div>

          <a
            href="/notification-detail"
            className="w-full p-2 rounded-full text-center bg-mainColor hover:bg-blue-600 text-light0 mt-4 font-semibold"
          >
            Xem tất cả
          </a>
        </div>
      </div>
    </LayoutDefault>
  );
};

export default NotificationPage;
