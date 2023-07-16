import React, { useState } from "react";
import Select from "react-select";
import { Label } from "@/components/label";
import { customStyles } from "@/constants/styleReactSelect";
import { Button } from "@/components/button";
import SkillModel from "@/interface/model/SkillModel";
import UserModel from "@/interface/model/UserModel";
import IUserUpdate from "@/interface/API/IUserUpdate";

interface SkillsModalProps {
  listSkills: SkillModel[];
  userData: UserModel;
  onSaveChanges: (newSkills: IUserUpdate) => void;
}

const SkillsModal: React.FC<SkillsModalProps> = ({
  listSkills,
  userData,
  onSaveChanges,
}) => {
  const [newSelectedSkills, setNewSelectedSkills] =
    useState<UserModel>(userData);

  const handleSaveChanges = () => {
    const newSkills: IUserUpdate = {
      skills: newSelectedSkills.skills,
    };
    onSaveChanges(newSkills);
    console.log(newSkills);
  };

  const handleSkillChange = (selectedOptions: any) => {
    const newSkills = selectedOptions.map((option: any) => ({
      id: option.value,
      name: option.label,
      description: option.description,
      color: option.color,
    }));
    const updatedUserData: UserModel = {
      ...newSelectedSkills,
      skills: newSkills,
    };

    setNewSelectedSkills(updatedUserData);
  };

  const selectOptions = listSkills.map((skill) => ({
    value: skill.id,
    label: skill.name,
    description: skill.description,
    color: skill.color,
  }));
  const isDarkMode = true;
  return (
    <div className="container sm:w-[400px] sm:h-[200px] w-[200px] h-[200px]">
      <Label htmlFor="skills" className="block text-xs font-semibold mb-8">
        Skills:
      </Label>
      <div>
        <Select
          isMulti
          placeholder="Choose skill..."
          options={selectOptions}
          styles={customStyles(isDarkMode)}
          value={newSelectedSkills.skills.map((skill) => ({
            value: skill.id,
            label: skill.name,
            description: skill.description,
            color: skill.color,
          }))}
          onChange={handleSkillChange}
          className=" rounded-[12px] text-xs dark:bg-dark0 shadow-inner"
        />
      </div>

      <div className="flex justify-end mt-16">
        <Button
          handle={handleSaveChanges}
          type="submit"
          kind="primary"
          size="small"
          className="bg-mainColor text-xs text-white px-3 py-2 rounded-md"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default SkillsModal;
