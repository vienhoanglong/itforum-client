import { Button } from "@/components/button";
import { Label } from "@/components/label";
import IUserUpdate from "@/interface/API/IUserUpdate";
import IUser from "@/interface/user";
import convertDateTime from "@/utils/helper";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface PersonalModalProps {
  userData: IUser | null;
  onSaveChanges: (userDataUpdate: IUserUpdate, id: string) => void;
}
interface InputErrors {
  birthDay: string;
  class: string;
  major: string;
  fullName: string;
  gender: string;
}
const PersonalModal: React.FC<PersonalModalProps> = ({
  userData,
  onSaveChanges,
}) => {
  const { t } = useTranslation();
  const [newUserData, setNewUserData] = useState<IUserUpdate>({
    birthDay: userData?.birthDay,
    class: userData?.class,
    major: userData?.major,
    fullName: userData?.fullName,
    gender: userData?.gender || "",
  });

  const [inputErrors, setInputErrors] = useState<InputErrors>({
    birthDay: "",
    class: "",
    major: "",
    fullName: "",
    gender: "",
  });

  useEffect(() => {
    const newInputErrors: InputErrors = {
      birthDay: "",
      class: "",
      major: "",
      fullName: "",
      gender: "",
    };
    if (!newUserData.gender) {
      newInputErrors.gender = "Required";
    }
    if (!newUserData.fullName) {
      newInputErrors.fullName = "Required";
    }

    if (!newUserData.birthDay) {
      newInputErrors.birthDay = "Required";
    }
    if (userData?.role === 2) {
      // If the user's role is 2, check for empty class and major
      if (!newUserData.class) {
        newInputErrors.class = "Required";
      }
      if (!newUserData.major) {
        newInputErrors.major = "Required";
      }
    }

    setInputErrors(newInputErrors);
  }, [newUserData, userData]);

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
          {t("fullName")}:
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
          {t("birthday")}:
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
      <div className="mb-4 flex flex-col justify-start gap-1  w-full">
        <Label
          htmlFor="gender"
          className="block text-xs dark:text-white font-semibold mr-2"
        >
          {t("gender")}:
        </Label>
        <div className="flex text-xs dark:text-white justify-start gap-2 flex-wrap items-center">
          <label>
            <input
              type="radio"
              id="genderMale"
              name="gender"
              value="Male"
              checked={newUserData.gender === "Male"}
              onChange={handleChange}
            />
            {t("male")}
          </label>
          <label>
            <input
              type="radio"
              id="genderFemale"
              name="gender"
              value="Female"
              checked={newUserData.gender === "Female"}
              onChange={handleChange}
            />
            {t("female")}
          </label>
          <label>
            <input
              type="radio"
              id="genderOther"
              name="gender"
              value="Other"
              checked={newUserData.gender === "Other"}
              onChange={handleChange}
            />
            {t("Other")}
          </label>
        </div>

        {inputErrors.gender && (
          <div className="text-red-500 text-xs w-full h-auto text-left">
            Gender is {inputErrors.gender}
          </div>
        )}
      </div>
      {userData?.role === 2 && (
        <>
          <div className="mb-4 flex  flex-col  justify-start gap-1 ">
            <Label
              htmlFor="class"
              className="block text-xs dark:text-white font-semibold mr-2"
            >
              {t("class")}:
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
              {t("major")}:
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
        </>
      )}

      <div className="flex justify-end">
        {Object.values(inputErrors).some((error) => error) ? (
          <Button
            type="submit"
            kind="primary"
            size="small"
            className="dark:bg-dark3 bg-dark3 text-xs text-white px-3 py-2 rounded-md"
            handle={handleSaveChanges}
            disable
          >
            {t("save")}
          </Button>
        ) : (
          <Button
            type="submit"
            kind="primary"
            size="small"
            className="bg-mainColor text-xs text-white px-3 py-2 rounded-md"
            handle={handleSaveChanges}
          >
            {t("save")}
          </Button>
        )}
      </div>
    </form>
  );
};

export default PersonalModal;
