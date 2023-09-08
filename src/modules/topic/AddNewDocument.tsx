import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type DocumentFormProps = {
  onSubmit: (file: File) => void;
};
export const AddNewDocument: React.FC<DocumentFormProps> = ({ onSubmit }) => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitted(true);

    if (file === undefined) {
      console.log("File are required.");
      return;
    }

    file && onSubmit(file);
  };
  return (
    <>
      <div className="flex justify-start">
        <span className="dark:text-light0 font-semibold">
          {t("addNewDocuments")}
        </span>
      </div>
      <form className="text-xs dark:text-light0 lg:w-[600px] max-sm:h-[530px] ">
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
        {submitted && file === undefined && (
          <div className="block text-xs text-red-500 mt-1">
            File is required.
          </div>
        )}
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
