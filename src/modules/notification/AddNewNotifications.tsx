import { Button } from "@/components/button";
import QuillEditor from "@/components/editor/QuillEditor";
import React, { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

type NotificationFormProps = {
  onSubmit: () => void;
};
export const AddNewNotifications: React.FC<NotificationFormProps> = ({
  onSubmit,
}) => {
  const [content, setContent] = useState<string>("");

  const handleContentChange = (value: string) => {
    setContent(value);
  };
  return (
    <>
      <div className="flex justify-start">
        <span className="dark:text-light0 font-semibold">
          Add new notification
        </span>
      </div>
      <form className="text-xs dark:text-light0 max-sm:h-[530px] ">
        <div className="flex justify-start flex-wrap my-2 max-sm:space-y-2 min-[410px]:space-x-4">
          <div className=" relative">
            <span className="mb-2">Loại thông báo:</span>
            <select className="appearance-none flex cursor-pointer items-center rounded-lg bg-slate-100 px-4 py-2 text-xs leading-4 text-dark2 dark:bg-dark2 dark:text-light0 w-full mr-5">
              <option value="">Sự kiện</option>
              <option value="">Tuyển dụng</option>
              <option value="">Môn học</option>
              <option value="">Khác</option>
            </select>
            <HiChevronDown className="text-dark1 dark:text-light1 text-base absolute right-4 top-[25px] fill-current pointer-events-none" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="block h-1/3 mb-2">Mức độ:</span>
            <div className="flex space-x-2 items-center justify-center h-full">
              <div className="flex items-center h-full space-x-1">
                <input
                  type="radio"
                  id="normal"
                  name="fav_language"
                  value="normal"
                />
                <label htmlFor="html">Bình thường</label>
              </div>
              <div className="flex items-center h-full space-x-1">
                <input
                  type="radio"
                  id="important"
                  name="fav_language"
                  value="important"
                />
                <label htmlFor="css">Quan trọng</label>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full h-[350px] md:w-[500px] md:h-[350px]">
          <QuillEditor
            value={content}
            onChange={handleContentChange}
          ></QuillEditor>
        </div>
        <div className="flex justify-end">
          <Button
            size="small"
            className="p-1 flex space-x-1 mt-10"
            type="button"
            kind="secondary"
            handle={onSubmit}
          >
            <span className="text-[12px]">Submit</span>
          </Button>
        </div>
      </form>
    </>
  );
};
