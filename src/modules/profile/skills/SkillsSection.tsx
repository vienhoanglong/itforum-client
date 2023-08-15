import React, { useEffect, useState } from "react";
import SkillsModal from "./SkillsModal";
import { HiPencil } from "react-icons/hi";
import { colorTopic } from "@/constants/global";
import Modal from "@/components/modal/Modal";
import IUserUpdate from "@/interface/API/IUserUpdate";
import Topic from "@/interface/topic";
import IUser from "@/interface/user";
import { useTopicStore } from "@/store/topicStore";

interface SkillsSectionProps {
  listSkills: Topic[] | null;
  userData: IUser | null;
  isEdit: boolean;
  hanleUpdateSkills: (newskills: IUserUpdate, id: string) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  listSkills,
  userData,
  isEdit,
  hanleUpdateSkills,
}) => {
  const [isUpdateSkills, setIsUpdateSkills] = useState(false);
  const { listUserTopic, getUserTopic } = useTopicStore();

  useEffect(() => {
    getUserTopic(
      userData ? (userData.skill ? userData.skill.toString() : "") : ""
    );
  }, [userData]);
  const handleOpenModalSkill = () => {
    setIsUpdateSkills(true);
  };

  const handleClose = () => {
    setIsUpdateSkills(false);
  };
  const handleSaveSkills = (newSkills: IUserUpdate, id: string) => {
    hanleUpdateSkills(newSkills, id);
    handleClose();
  };

  return (
    <div className="mb-4 dark:bg-dark2 bg-light3 shadow-sm rounded-lg p-4 relative">
      <h2 className="text-base font-bold mb-4">Skills</h2>
      <div className="w-full my-2 flex flex-wrap">
        {listUserTopic?.map((skill, index) => (
          <a
            key={index}
            href={`/topics/detail/${skill?.name
              ?.toLowerCase()
              .replace(/\s+/g, "-")}`}
            className=" cursor-pointer"
          >
            <div
              className={`inline-block border-2 px-2 py-[2px] rounded-full m-[1px] text-[10px] ${
                colorTopic[skill.color as keyof typeof colorTopic] || ""
              }`}
            >
              {skill.name}
            </div>
          </a>
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
