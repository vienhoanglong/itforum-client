import React, { useState } from "react";
import { HiPencil } from "react-icons/hi";
import Modal from "@/components/modal/Modal";
import { Label } from "@/components/label";
import PersonalModal from "./PersonalModal";
import IUserUpdate from "@/interface/API/IUserUpdate";
import IUser from "@/interface/user";

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
  const [isUpdatePersonal, setUpdatePersonal] = useState(false);

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
        <h2 className="text-base font-bold mb-4">Personal Information</h2>
        <div className="flex flex-wrap">
          <div className="w-1/2 flex flex-col space-y-4 min-w-[120px] mb-4">
            <div>
              <label htmlFor="title" className="block text-xs font-semibold">
                Full name:
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
                Birthday:
              </label>
              <div>{userData?.birthDay}</div>
            </div>
            <div>
              <label htmlFor="title" className="block text-xs font-semibold">
                Class:
              </label>
              <div>{userData?.class}</div>
            </div>
            <div>
              <label htmlFor="title" className="block text-xs font-semibold">
                Gender:
              </label>
              <div>{userData?.gender}</div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col space-y-4 min-w-[120px]">
            {userData
              ? userData.role === 2 && (
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-xs font-semibold"
                    >
                      ID:
                    </label>
                    <div>{userData?.googleId}</div>
                  </div>
                )
              : null}

            <div>
              <label htmlFor="title" className="block text-xs font-semibold">
                Major:
              </label>
              <div>{userData?.major}</div>
            </div>
            <div>
              <label htmlFor="title" className="block text-xs font-semibold">
                Position:
              </label>
              <div>
                {" "}
                {userData
                  ? (() => {
                      switch (userData.role) {
                        case 0:
                          return "Admin";
                        case 1:
                          return "Teacher";
                        case 2:
                          return "Student";
                        case 3:
                          return "Company";
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
            <span className="max-md:hidden">Edit</span>
          </button>
        ) : null}
      </div>
      <Modal isOpen={isUpdatePersonal} onClose={handleClose}>
        <Label htmlFor="title" className="block text-sm font-semibold mb-8">
          Personal Infomation:
        </Label>
        <PersonalModal userData={userData} onSaveChanges={hanleSavePersonal} />
      </Modal>
    </div>
  );
};

export default ProfileSection;
