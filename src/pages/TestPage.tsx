import React from "react";
import notice from "assets/notification.png";
export const TestPage: React.FC = () => {
  return (
    <div className="w-[400px] h-auto">
      <div className="flex flex-row border-b-2 justify-between items-center p-4">
        <div className="text-sm">Thông báo</div>
        <div className="text-xs">Đánh dấu đọc tất cả</div>
      </div>
      <div className="border-b-2 p-2">
        <div className="rounded-lg relative flex flex-row gap-2 p-2 transition-all duration-300 ease  dark:text-light0 focus:bg-blue-100 hover:bg-blue-100 hover:outline-mainColor dark:focus:bg-darker cursor-pointer ">
          <span className="absolute inline-flex rounded-full h-2 w-2 bg-mainColor drop-shadow-2xl top-2 right-2"></span>
          <img src={notice} className="rounded-full object-cover h-8 w-8" />
          <div className="flex flex-col">
            <span className="text-xs break-words line-clamp-2 w-11/12 font-semibold">
              Bạn vừa nhận được một thông báo mới từ Khoa CNTT về việc báo cáo
              dự án công nghệ thông tin 2 năm học 2022-2023
            </span>
            <span className="text-[10px] font-normal">10 phút trước</span>
          </div>
        </div>
        <div className="rounded-lg relative flex flex-row gap-2 p-2 transition-all duration-300 ease  dark:text-light0 focus:bg-blue-100 hover:bg-blue-100 hover:outline-mainColor dark:focus:bg-darker cursor-pointer ">
          <span className="absolute inline-flex rounded-full h-2 w-2 bg-mainColor drop-shadow-2xl top-2 right-2"></span>
          <img src={notice} className="rounded-full object-cover h-8 w-8" />
          <div className="flex flex-col">
            <span className="text-xs break-words line-clamp-2 w-11/12 font-semibold">
              Bạn vừa nhận được một thông báo mới từ Khoa CNTT về việc báo cáo
              dự án công nghệ thông tin 2 năm học 2022-2023
            </span>
            <span className="text-[10px] font-normal">10 phút trước</span>
          </div>
        </div>
      </div>
      <div className="text-xs mx-auto mt-2">Xem tất cả</div>
    </div>
  );
};

export default TestPage;
