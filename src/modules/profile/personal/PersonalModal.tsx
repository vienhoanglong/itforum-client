import { Button } from "@/components/button";
import IUserUpdate from "@/interface/API/IUserUpdate";
import IUser from "@/interface/user";
import React, { useEffect, useState } from "react";

interface PersonalModalProps {
  userData: IUser | null;
  onSaveChanges: (userDataUpdate: IUserUpdate, id: string) => void;
}
interface InputErrors {
  birthday: string;
  class: string;
  major: string;
  fullName: string;
}
const PersonalModal: React.FC<PersonalModalProps> = ({
  userData,
  onSaveChanges,
}) => {
  const [newUserData, setNewUserData] = useState<IUserUpdate>({
    birthday: userData?.birthDay,
    class: userData?.class,
    major: userData?.major,
    fullName: userData?.fullName,
  });

  const [inputErrors, setInputErrors] = useState<InputErrors>({
    birthday: "",
    class: "",
    major: "",
    fullName: "",
  });

  useEffect(() => {
    const newInputErrors: InputErrors = {
      birthday: "",
      class: "",
      major: "",
      fullName: "",
    };
    for (const field in newUserData) {
      if (!newUserData[field as keyof IUserUpdate]) {
        newInputErrors[field as keyof InputErrors] = "Required";
      }
    }
    setInputErrors(newInputErrors);
  }, [newUserData]);
  const handleSaveChanges = () => {
    onSaveChanges(newUserData, userData ? userData._id : "");
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
        <label
          htmlFor="fullName"
          className="block text-xs dark:text-white font-semibold mr-2"
        >
          Full Name:
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={newUserData.fullName}
          onChange={handleChange}
          className={`border rounded-md px-2 py-1 text-xs ${
            inputErrors.fullName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {inputErrors.fullName && (
          <span className="text-red-500 text-xs">{inputErrors.fullName}</span>
        )}
      </div>
      <div className="mb-4 flex justify-between items-center">
        <label
          htmlFor="birthday"
          className="block text-xs dark:text-white font-semibold mr-2"
        >
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
      <div className="mb-4 flex justify-between  items-center">
        <label
          htmlFor="class"
          className="block text-xs dark:text-white font-semibold mr-2"
        >
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
        <label
          htmlFor="major"
          className="block text-xs dark:text-white font-semibold mr-2"
        >
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
        {Object.values(inputErrors).some((error) => error) ? (
          <Button
            type="submit"
            kind="primary"
            size="small"
            className="bg-mainColor text-xs text-white px-3 py-2 rounded-md"
            handle={handleSaveChanges}
          >
            Save Changes
          </Button>
        ) : (
          <Button
            type="submit"
            kind="primary"
            size="small"
            className="bg-mainColor text-xs text-white px-3 py-2 rounded-md"
            handle={handleSaveChanges}
          >
            Save Changes
          </Button>
        )}
      </div>
    </form>
  );
};

export default PersonalModal;
