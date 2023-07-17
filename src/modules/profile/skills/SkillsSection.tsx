import React, { useState } from "react";
import SkillsModal from "./SkillsModal";
import { HiPencil } from "react-icons/hi";
import { topicColors } from "@/constants/global";
import Modal from "@/components/modal/Modal";
import SkillModel from "@/interface/model/SkillModel";
import UserModel from "@/interface/model/UserModel";
import IUserUpdate from "@/interface/API/IUserUpdate";

interface SkillsSectionProps {
  listSkills: SkillModel[];
  userData: UserModel;
  isEdit: boolean;
  hanleUpdateSkills: (newskills: IUserUpdate) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  listSkills,
  userData,
  isEdit,
  hanleUpdateSkills,
}) => {
  const [isUpdateSkills, setIsUpdateSkills] = useState(false);

  const handleOpenModalSkill = () => {
    setIsUpdateSkills(true);
  };

  const handleClose = () => {
    setIsUpdateSkills(false);
  };
  const handleSaveSkills = (newSkills: IUserUpdate) => {
    hanleUpdateSkills(newSkills);
    handleClose();
  };

  return (
    <div className="mb-4 dark:bg-dark2 bg-light3 shadow-sm rounded-lg p-4 relative">
      <h2 className="text-base font-bold mb-4">Skills</h2>
      <div className="w-full my-2 flex flex-wrap">
        {userData.skills.map((skill) => (
          <div
            key={skill.id}
            className={`cursor-pointer inline-block text-xs border-2 px-2 py-1 rounded-full m-[1px] ${
              topicColors[skill.name] || ""
            }`}
          >
            {skill.name}
          </div>
        ))}
      </div>
      {isEdit ? (
        <button
          className=" flex space-x-1 items-center absolute top-2 right-2 bg-mainColor hover:bg-darker text-white px-2 py-2 rounded-full"
          onClick={handleOpenModalSkill}
        >
          <HiPencil></HiPencil>
          <span className="max-md:hidden">Edit</span>
        </button>
      ) : null}

      <Modal isOpen={isUpdateSkills} onClose={handleClose}>
        <SkillsModal
          listSkills={listSkills}
          userData={userData}
          onSaveChanges={handleSaveSkills}
        />
      </Modal>
    </div>
  );
};

export default SkillsSection;
