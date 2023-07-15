import React, { useState } from "react";
import { HiPencil } from "react-icons/hi";
import Modal from "@/components/modal/Modal";
import { Label } from "@/components/label";
import PersonalModal from "./PersonalModal";
import UserModel from "@/interface/model/UserModel";
import IUserUpdate from "@/interface/API/IUserUpdate";

interface ProfileSectionProps {
  userData: UserModel;
  hanldeUpdatePersonal: (userDataUpdate: IUserUpdate) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  userData,
  hanldeUpdatePersonal,
}) => {
  const [isUpdatePersonal, setUpdatePersonal] = useState(false);

  const handleEditPersonal = () => {
    setUpdatePersonal(true);
  };

  const handleClose = () => {
    setUpdatePersonal(false);
  };
  const hanleSavePersonal = (updatePersonal: IUserUpdate) => {
    hanldeUpdatePersonal(updatePersonal);
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
              <div>{userData.fullname}</div>
            </div>
            <div>
              <label htmlFor="title" className="block text-xs font-semibold">
                Birthday:
              </label>
              <div>{userData.birthday}</div>
            </div>
            <div>
              <label htmlFor="title" className="block text-xs font-semibold">
                Class:
              </label>
              <div>{userData.class}</div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col space-y-4 min-w-[120px]">
            <div>
              <label htmlFor="title" className="block text-xs font-semibold">
                ID:
              </label>
              <div>{userData.id}</div>
            </div>
            <div>
              <label htmlFor="title" className="block text-xs font-semibold">
                Major:
              </label>
              <div>{userData.major}</div>
            </div>
            <div>
              <label htmlFor="title" className="block text-xs font-semibold">
                Position:
              </label>
              <div>Student</div>
            </div>
          </div>
        </div>
        <button
          className="flex space-x-1 items-center absolute top-2 right-2 bg-mainColor hover:bg-darker text-white px-2 py-2 rounded-full"
          onClick={handleEditPersonal}
        >
          <HiPencil />
          <span className="max-md:hidden">Edit</span>
        </button>
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
