import LayoutSecondary from "@/layout/LayoutSecondary";
import React, { useEffect, useState } from "react";
import { dataUser, sampleTopics } from "@/constants/global";
import "react-datepicker/dist/react-datepicker.css";
import ContactSection from "@/modules/profile/contacts/ContactSection";
import SkillsSection from "@/modules/profile/skills/SkillsSection";
import AccountSection from "@/modules/profile/account/AccountSection";
import PersonalSection from "@/modules/profile/personal/PersonalSection";
import AboutSection from "@/modules/profile/about/AboutSection";
import {
  getUser,
  updateContact,
  updatePersonal,
  updateSkill,
  updateAbout,
  updateCoverImage,
  updateAvatar,
} from "@/services/profileService";
import IUserUpdate from "@/interface/API/IUserUpdate";
import UserModel from "@/interface/model/UserModel";

const ProfilePage: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);

  const handleToggle = () => {
    setIsEdit(!isEdit);
  };
  //example data user
  const [user, setUser] = useState<UserModel>(dataUser[0]);
  //Get user
  useEffect(() => {
    const fetchData = async (userId: string) => {
      try {
        const user: UserModel = await getUser(userId);
        console.log(user);
        // hanldle data
      } catch (error) {
        console.error(error);
      }
    };
    fetchData("idUser");
  }, []);

  const handleUpdateAvatar = async (updatedAvatar: IUserUpdate) => {
    try {
      const response = await updateAvatar(updatedAvatar);
      //get new data user after updated
      const updatedUser: UserModel = await getUser(user.id);
      setUser(updatedUser);

      console.log("Avatar image  updated:", response);
    } catch (error) {
      console.error("Failed to update Avatar image:", error);
    }
    console.log("Avatar image updated:", updatedAvatar);
  };

  const handleUpdateCoverImg = async (updatedCoverImg: IUserUpdate) => {
    try {
      const response = await updateCoverImage(updatedCoverImg);
      //get new data user after updated
      const updatedUser: UserModel = await getUser(user.id);
      setUser(updatedUser);

      console.log("Cover image  updated:", response);
    } catch (error) {
      console.error("Failed to update Cover image:", error);
    }
    console.log("Cover image updated:", updatedCoverImg);
  };
  const handleUpdateAbout = async (updatedAbout: IUserUpdate) => {
    try {
      const response = await updateAbout(updatedAbout);
      //get new data user after updated
      const updatedUser: UserModel = await getUser(user.id);
      setUser(updatedUser);

      console.log("About info updated:", response);
    } catch (error) {
      console.error("Failed to update About info:", error);
    }
    console.log("About info updated:", updatedAbout);
  };

  const handleUpdatePersonal = async (updatedPersonal: IUserUpdate) => {
    try {
      const response = await updatePersonal(updatedPersonal);

      //get new data user after updated
      const updatedUser: UserModel = await getUser(user.id);
      setUser(updatedUser);

      console.log("Personal info updated:", response);
    } catch (error) {
      console.error("Failed to update Personal info:", error);
    }
    console.log("Personal info updated:", updatedPersonal);
  };

  const handleUpdateSkills = async (updatedSkills: IUserUpdate) => {
    try {
      const response = await updateSkill(updatedSkills);
      //get new data user after updated
      const updatedUser: UserModel = await getUser(user.id);
      setUser(updatedUser);
      console.log("Skill updated:", response);
    } catch (error) {
      console.error("Failed to update skill:", error);
    }
  };

  const handleUpdateContact = async (updatedContact: IUserUpdate) => {
    try {
      const response = await updateContact(updatedContact);
      //get new data user after updated
      const updatedUser: UserModel = await getUser(user.id);
      setUser(updatedUser);
      console.log("Contact updated:", response);
    } catch (error) {
      console.error("Failed to update contact:", error);
    }
  };

  return (
    <LayoutSecondary>
      <div className="max-w-4xl mx-auto md:p-8 p-4 bg-light4 shadow-sm dark:bg-dark1 rounded-lg dark:text-light0 relative">
        <h4 className="text-xl font-bold text-darker mb-4 ">Profile</h4>
        <div className="flex space-x-2 items-center absolute top-2 right-2">
          <span className=" text-sm font-bold">Edit</span>
          <div
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
              isEdit ? "bg-blue-600" : "bg-gray-400"
            }`}
            onClick={handleToggle}
          >
            <div
              className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-300 transform ${
                isEdit ? "translate-x-6 bg-white" : "bg-gray-300"
              }`}
            ></div>
          </div>
        </div>

        <AboutSection
          userData={user}
          onUpdateAbout={handleUpdateAbout}
          onUpdateAvatar={handleUpdateAvatar}
          onUpdateCoverImage={handleUpdateCoverImg}
          isEdit={isEdit}
        ></AboutSection>

        <PersonalSection
          userData={user}
          isEdit={isEdit}
          hanldeUpdatePersonal={handleUpdatePersonal}
        />

        {/* is company */}
        <AccountSection isEdit={isEdit} />

        {/* is student */}
        <SkillsSection
          isEdit={isEdit}
          hanleUpdateSkills={handleUpdateSkills}
          listSkills={sampleTopics}
          userData={user}
        />

        <ContactSection
          handleUpdateContact={handleUpdateContact}
          userData={user}
          isEdit={isEdit}
        />
      </div>
    </LayoutSecondary>
  );
};

export default ProfilePage;
