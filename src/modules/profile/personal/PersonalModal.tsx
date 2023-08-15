import { Button } from "@/components/button";
import { Label } from "@/components/label";
import IUserUpdate from "@/interface/API/IUserUpdate";
import IUser from "@/interface/user";
import convertDateTime from "@/utils/helper";
import React, { useEffect, useState } from "react";

interface PersonalModalProps {
  userData: IUser | null;
  onSaveChanges: (userDataUpdate: IUserUpdate, id: string) => void;
}
interface InputErrors {
  birthDay: string;
  class: string;
  major: string;
  fullName: string;
}
const PersonalModal: React.FC<PersonalModalProps> = ({
  userData,
  onSaveChanges,
}) => {
  const [newUserData, setNewUserData] = useState<IUserUpdate>({
    birthDay: userData?.birthDay,
    class: userData?.class,
    major: userData?.major,
    fullName: userData?.fullName,
  });

  const [inputErrors, setInputErrors] = useState<InputErrors>({
    birthDay: "",
    class: "",
    major: "",
    fullName: "",
  });

  useEffect(() => {
    const newInputErrors: InputErrors = {
      birthDay: "",
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
    onSaveChanges(
      newUserData,
      userData ? (userData._id ? userData._id : "") : ""
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <form className="w-auto h-auto flex flex-col">
      <div className="mb-4 flex flex-col gap-1 justify-start">
        <Label
          htmlFor="fullName"
          className="block text-xs dark:text-white font-semibold mr-2"
        >
          Full Name:
        </Label>
        <div className="flex justify-start items-center">
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
        </div>
        {inputErrors.fullName && (
          <div className="text-red-500 text-xs w-full h-auto text-left">
            Full name is {inputErrors.fullName}
          </div>
        )}
      </div>

      <div className="mb-4 flex flex-col justify-start gap-1  w-full">
        <Label
          htmlFor="birthDay"
          className="block text-xs dark:text-white font-semibold mr-2"
        >
          Birthday:
        </Label>
        <div className="flex justify-start items-center">
          <input
            type="date"
            id="birthDay"
            name="birthDay"
            value={
              newUserData.birthDay &&
              convertDateTime(newUserData.birthDay.toString())
            }
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-2 py-1 text-xs"
          />
        </div>

        {inputErrors.birthDay && (
          <div className="text-red-500 text-xs w-full h-auto text-left">
            Birthday is {inputErrors.birthDay}
          </div>
        )}
      </div>
      <div className="mb-4 flex  flex-col  justify-start gap-1 ">
        <Label
          htmlFor="class"
          className="block text-xs dark:text-white font-semibold mr-2"
        >
          Class:
        </Label>
        <div className="flex justify-start items-center">
          <input
            type="text"
            id="class"
            name="class"
            value={newUserData.class}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-2 py-1 text-xs"
          />
        </div>
        {inputErrors.class && (
          <div className="text-red-500 text-xs w-full h-auto text-left">
            Class is {inputErrors.class}
          </div>
        )}
      </div>
      <div className="mb-4 flex  flex-col  justify-start gap-1">
        <Label
          htmlFor="major"
          className="block text-xs dark:text-white font-semibold mr-2"
        >
          Major:
        </Label>
        <div className="flex justify-start items-center">
          <input
            type="text"
            id="major"
            name="major"
            value={newUserData.major}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-2 py-1 text-xs"
          />
        </div>
        {inputErrors.major && (
          <div className="text-red-500 text-xs w-full h-auto text-left">
            Major is {inputErrors.major}
          </div>
        )}
      </div>
      <div className="flex justify-end">
        {Object.values(inputErrors).some((error) => error) ? (
          <Button
            type="submit"
            kind="primary"
            size="small"
            className="dark:bg-dark4 bg-dark4 text-xs text-white px-3 py-2 rounded-md"
            handle={handleSaveChanges}
            disable
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
