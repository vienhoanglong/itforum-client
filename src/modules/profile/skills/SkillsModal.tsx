import React, { useState } from "react";
import Select from "react-select";
import { Label } from "@/components/label";
import { Button } from "@/components/button";
import IUserUpdate from "@/interface/API/IUserUpdate";
import { colorSelectTopic } from "@/constants/global";
import Topic from "@/interface/topic";
import IUser from "@/interface/user";

interface SkillsModalProps {
  listSkills: Topic[] | null;
  userData: IUser | null;
  onSaveChanges: (newSkills: IUserUpdate, id: string) => void;
}

const SkillsModal: React.FC<SkillsModalProps> = ({
  listSkills,
  userData,
  onSaveChanges,
}) => {
  const [newSelectedSkills, setNewSelectedSkills] = useState<IUser | null>(
    userData || null
  );

  const [isSkillListEmpty, setIsSkillListEmpty] = useState(false);

  const handleSaveChanges = () => {
    onSaveChanges(
      newSelectedSkills ? { skill: newSelectedSkills.skill } : {},
      userData ? (userData._id ? userData._id : "") : ""
    );
    console.log(newSelectedSkills);
  };
  const getSkillLabelById = (skillId: string) => {
    const skill = listSkills?.find((skill) => skill._id === skillId);
    return skill ? skill.name : "";
  };

  const handleSkillChange = (selectedOptions: any) => {
    const newSkills = selectedOptions.map((option: any) => option.value);
    const updatedSkill = newSkills;

    const updatedUserData: IUserUpdate = {
      skill: updatedSkill,
    };

    setNewSelectedSkills(updatedUserData);
    setIsSkillListEmpty(updatedSkill.length === 0);
  };
  const selectOptions = listSkills?.map((skill) => ({
    value: skill._id,
    label: skill.name,
    color: `${colorSelectTopic[skill.color as keyof typeof colorSelectTopic]}`,
  }));

  return (
    <div className="container sm:w-[400px] w-[200px] h-[330px]">
      <Label htmlFor="skills" className="block text-xs font-semibold mb-8">
        Skills:
      </Label>
      {isSkillListEmpty && (
        <p className="text-red-500 text-xs">
          Please select at least one skill.
        </p>
      )}
      <div>
        <Select
          isMulti
          isSearchable
          placeholder="Choose skill..."
          options={selectOptions}
          value={newSelectedSkills?.skill?.map((skill) => ({
            value: skill,
            label: getSkillLabelById(skill),
          }))}
          onChange={handleSkillChange}
          className=" rounded-[12px] text-xs dark:bg-dark0 shadow-inner"
          noOptionsMessage={() => "No skill found..."}
          styles={{
            menu: (provided) => ({
              ...provided,
              height: "200px",
              overflowY: "auto",
            }),
          }}
        />
      </div>

      <div className="flex justify-end mt-16">
        {isSkillListEmpty === true ? (
          <Button
            type="submit"
            kind="primary"
            size="small"
            className="dark:bg-dark3 bg-dark3 text-xs text-white px-3 py-2 rounded-md"
            disable
          >
            Save Changes
          </Button>
        ) : (
          <Button
            handle={handleSaveChanges}
            type="submit"
            kind="primary"
            size="small"
            className="bg-mainColor text-xs text-white px-3 py-2 rounded-md"
          >
            Save Changes
          </Button>
        )}
      </div>
    </div>
  );
};

export default SkillsModal;
