import React, { useState } from "react";
import { HiPencil } from "react-icons/hi";
import Modal from "@/components/modal/Modal";
import { Label } from "@/components/label";
import PersonalModal from "./PersonalModal";
import IUserUpdate from "@/interface/API/IUserUpdate";
import IUser from "@/interface/user";
import convertDateTime from "@/utils/helper";
import { useTranslation } from "react-i18next";

interface ProfileSectionProps {
  userData: IUser | null;
  isEdit: boolean;
  hanldeUpdatePersonal: (userDataUpdate: IUserUpdate, id: string) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  userData,
  isEdit,
  hanldeUpdatePersonal,
}) => {
  const { t } = useTranslation();
  const [isUpdatePersonal, setUpdatePersonal] = useState(false);
  const formatDate = "MM-DD-YYYY";
  const handleEditPersonal = () => {
    setUpdatePersonal(true);
  };

  const handleClose = () => {
    setUpdatePersonal(false);
  };
  const hanleSavePersonal = (updatePersonal: IUserUpdate, id: string) => {
    hanldeUpdatePersonal(updatePersonal, id);
    handleClose();
  };

  return (
    <div>
      <div className="mb-4 dark:bg-dark2 bg-light3 shadow-sm w-auto rounded-lg p-4 relative">
        <h2 className="text-base font-bold mb-4">{t("personalInfo")}</h2>
        <div className="flex flex-wrap">
          <div className="w-1/2 flex flex-col space-y-4 min-w-[120px] mb-4">
            <div>
              <label htmlFor="title" className="block text-xs font-semibold">
                {t("fullName")}:
              </label>
              <div>
                {userData
                  ? userData.fullName
                    ? userData.fullName
                    : userData.username
                  : ""}
              </div>
            </div>
            <div>
              <label htmlFor="title" className="block text-xs font-semibold">
                {t("birthday")}:
              </label>
              <div>
                {userData?.birthDay &&
                  convertDateTime(userData.birthDay.toString(), formatDate)}
              </div>
            </div>
            {userData
              ? userData.role === 2 && (
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-xs font-semibold"
                    >
                      {t("class")}:
                    </label>
                    <div>{userData?.class}</div>
                  </div>
                )
              : null}
            <div>
              <label htmlFor="title" className="block text-xs font-semibold">
                {t("gender")}:
              </label>
              <div>
                {userData
                  ? (() => {
                      switch (userData.gender) {
                        case "Male":
                          return `${t("male")}`;
                        case "Female":
                          return `${t("female")}`;
                        case "Other":
                          return `${t("Other")}`;
                        default:
                          return "";
                      }
                    })()
                  : ""}
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col space-y-4 min-w-[120px]">
            {userData
              ? userData.role === 2 && (
                  <>
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-xs font-semibold"
                      >
                        {t("id")}:
                      </label>
                      <div>{userData ? userData.email?.split("@")[0] : ""}</div>
                    </div>
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-xs font-semibold"
                      >
                        {t("major")}:
                      </label>
                      <div>{userData?.major}</div>
                    </div>
                  </>
                )
              : null}

            <div>
              <label htmlFor="title" className="block text-xs font-semibold">
                {t("position")}:
              </label>
              <div>
                {" "}
                {userData
                  ? (() => {
                      switch (userData.role) {
                        case 0:
                          return `${t("admin")}`;
                        case 1:
                          return `${t("teacher")}`;
                        case 2:
                          return `${t("student")}`;
                        case 3:
                          return `${t("company")}`;
                        default:
                          return "";
                      }
                    })()
                  : ""}
              </div>
            </div>
          </div>
        </div>
        {isEdit ? (
          <button
            className="flex space-x-1 items-center absolute top-2 right-2 bg-mainColor hover:bg-darker text-white px-2 py-2 rounded-full"
            onClick={handleEditPersonal}
          >
            <HiPencil />
            <span className="max-md:hidden">{t("edit")}</span>
          </button>
        ) : null}
      </div>
      <Modal isOpen={isUpdatePersonal} onClose={handleClose}>
        <Label htmlFor="title" className="block text-sm font-semibold mb-8">
          {t("personalInfo")}:
        </Label>
        <PersonalModal userData={userData} onSaveChanges={hanleSavePersonal} />
      </Modal>
    </div>
  );
};

export default ProfileSection;
