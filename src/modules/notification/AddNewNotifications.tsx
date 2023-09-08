import QuillEditor from "@/components/editor/QuillEditor";
import INotificationCreate from "@/interface/API/INotificationCreate";
import { useUserStore } from "@/store/userStore";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiChevronDown } from "react-icons/hi";

type NotificationFormProps = {
  onSubmit: (notification: INotificationCreate, file?: File) => void;
};
export const AddNewNotifications: React.FC<NotificationFormProps> = ({
  onSubmit,
}) => {
  const { t } = useTranslation();
  const { user } = useUserStore();
  const [title, setTitle] = useState<string>("");
  const [createBy, setCreateBy] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [typeNotice, setTypeNotice] = useState<string>("recruitment");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [selectedLevel, setSelectedLevel] = useState<string>("normal");
  const [submitted, setSubmitted] = useState<boolean>(false);

  useMemo(() => {
    user && user._id && setCreateBy(user._id);
  }, [user]);
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleTypeNoticeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeNotice(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitted(true);

    if (title === "" || content === "" || content === "<p><br></p>") {
      console.log("Title and content are required.");
      return;
    }

    const notification: INotificationCreate = {
      titleNotice: title,
      descNotice: content,
      createdBy: createBy,
      typeNotice: typeNotice,
      level: selectedLevel,
    };
    console.log(notification);
    onSubmit(notification, file ? file : undefined);
  };
  return (
    <>
      <div className="flex justify-start">
        <span className="dark:text-light0 font-semibold">
          {t("addNewNotifications")}
        </span>
      </div>
      <form className="text-xs dark:text-light0 lg:w-[600px] max-sm:h-[530px] ">
        <div className="flex justify-start flex-wrap my-2 max-sm:space-y-2 min-[410px]:space-x-4">
          <div className="mb-3 flex flex-col w-full">
            <div>
              <input
                className="w-full h-full bg-light2/80 text-sm dark:text-light0 px-4 py-2 rounded-2xl dark:bg-dark0/80"
                placeholder={t("addingYourTitle")}
                // value={title}
                onChange={(e) => handleTitleChange(e)}
              />
            </div>
            {submitted && title === "" && (
              <div className="block text-xs text-red-500 mt-1">
                Title is required.
              </div>
            )}
          </div>
          <div className=" w-full h-auto gap-4 flex justify-start flex-wrap items-center">
            <div className=" relative">
              <span className="mb-2">{t("typeNotifications")}:</span>
              <select
                onChange={(e) => handleTypeNoticeChange(e)}
                className="appearance-none -ml-2 flex cursor-pointer items-center rounded-lg bg-slate-100 px-4 py-2 text-xs leading-4 text-dark2 dark:bg-dark2 dark:text-light0 w-full mr-5"
              >
                <option value="recruitment">{t("recruitment")}</option>
                {user?.role !== 3 && (
                  <>
                    <option value="subject">{t("subject")}</option>
                    <option value="event">{t("event")}</option>
                    <option value="other">{t("Other")}</option>
                  </>
                )}
              </select>
              <HiChevronDown className="text-dark1 dark:text-light1 text-base absolute right-4 top-[25px] fill-current pointer-events-none" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="block h-1/3 mb-2">{t("level")}:</span>
              <div className="flex space-x-2 items-center justify-center h-full">
                <div className="flex items-center h-full space-x-1">
                  <input
                    type="radio"
                    id="normal"
                    name="fav_language"
                    value="normal"
                    checked={selectedLevel === "normal"}
                    onChange={() => setSelectedLevel("normal")}
                  />
                  <label htmlFor="normal">{t("normal")}</label>
                </div>
                {user?.role !== 3 && (
                  <div className="flex items-center h-full space-x-1">
                    <input
                      type="radio"
                      id="important"
                      name="fav_language"
                      value="important"
                      checked={selectedLevel === "important"}
                      onChange={() => setSelectedLevel("important")}
                    />
                    <label htmlFor="important">{t("important")}</label>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className=" w-full h-[350px] flex flex-col  md:h-[350px]">
          <QuillEditor
            value={content}
            onChange={handleContentChange}
          ></QuillEditor>

          {submitted && (content === "" || content === "<p><br></p>") && (
            <div className="block text-xs mt-2 text-red-500">
              Content is required.
            </div>
          )}
        </div>
        <div className=" max-sm:mt-20">
          <label
            className="block mb-2 mt-2 text-xs font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            {t("uploadFile")}:
          </label>
          <input
            onChange={(e) => handleFileChange(e)}
            className="block w-full text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
          />
        </div>
        <div className="flex justify-end items-center mt-3">
          <button
            className="p-4 rounded-lg bg-mainColor flex space-x-1 my-2"
            onClick={handleSubmit}
          >
            <span className="text-[12px]">{t("submit")}</span>
          </button>
        </div>
      </form>
    </>
  );
};
