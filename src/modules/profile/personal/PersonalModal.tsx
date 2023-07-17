import { Button } from "@/components/button";
import IUserUpdate from "@/interface/API/IUserUpdate";
import React, { useState } from "react";

interface PersonalModalProps {
  userData: IUserUpdate;
  onSaveChanges: (userDataUpdate: IUserUpdate) => void;
}

const PersonalModal: React.FC<PersonalModalProps> = ({
  userData,
  onSaveChanges,
}) => {
  const [newUserData, setNewUserData] = useState<IUserUpdate>({
    birthday: userData.birthday,
    class: userData.class,
    major: userData.major,
  });

  const handleSaveChanges = () => {
    onSaveChanges(newUserData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <form className="w-auto h-[300px] flex flex-col">
      <div className="mb-4 flex justify-between items-center">
        <label htmlFor="birthday" className="block text-xs font-semibold mr-2">
          Birthday:
        </label>
        <input
          type="text"
          id="birthday"
          name="birthday"
          value={newUserData.birthday}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-2 py-1 text-xs"
        />
      </div>
      <div className="mb-4 flex justify-between items-center">
        <label htmlFor="class" className="block text-xs font-semibold mr-2">
          Class:
        </label>
        <input
          type="text"
          id="class"
          name="class"
          value={newUserData.class}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-2 py-1 text-xs"
        />
      </div>
      <div className="mb-4 flex justify-between items-center">
        <label htmlFor="major" className="block text-xs font-semibold mr-2">
          Major:
        </label>
        <input
          type="text"
          id="major"
          name="major"
          value={newUserData.major}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-2 py-1 text-xs"
        />
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          kind="primary"
          size="small"
          className="bg-mainColor text-xs text-white px-3 py-2 rounded-md"
          handle={handleSaveChanges}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default PersonalModal;
