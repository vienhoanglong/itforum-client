import LayoutSecondary from "@/layout/LayoutSecondary";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ContactSection from "@/modules/profile/contacts/ContactSection";
import SkillsSection from "@/modules/profile/skills/SkillsSection";
import AccountSection from "@/modules/profile/account/AccountSection";
import PersonalSection from "@/modules/profile/personal/PersonalSection";
import AboutSection from "@/modules/profile/about/AboutSection";
import IUserUpdate from "@/interface/API/IUserUpdate";
import { useUserStore } from "@/store/userStore";
import { UpdateDataUser } from "@/services/userService";
import { useTopicStore } from "@/store/topicStore";

const ProfilePage: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);

  const handleToggle = () => {
    setIsEdit(!isEdit);
  };
  // //example data user
  // const [userData, setUserData] = useState<UserModel>(dataUser[0]);

  //data from api
  const { user, setUser } = useUserStore();
  //get list skill topic
  const { listAllTopic, getTopic } = useTopicStore();

  //Get user
  useEffect(() => {
    setUser();
    getTopic();
  }, []);

  const handleUpdateAvatar = async (updatedAvatar: IUserUpdate, id: string) => {
    try {
      await UpdateDataUser(updatedAvatar, id);
      setUser();
    } catch (error) {
      console.error("Failed to update Avatar image:", error);
    }
    console.log("Avatar image updated:", updatedAvatar);
  };

  const handleUpdateAbout = async (updatedAbout: IUserUpdate, id: string) => {
    try {
      await UpdateDataUser(updatedAbout, id);
      setUser();
    } catch (error) {
      console.error("Failed to update About info:", error);
    }
    console.log("About info updated:", updatedAbout);
  };

  const handleUpdatePersonal = async (
    updatedPersonal: IUserUpdate,
    id: string
  ) => {
    try {
      await UpdateDataUser(updatedPersonal, id);
      setUser();
    } catch (error) {
      console.error("Failed to update Personal info:", error);
    }
    console.log("Personal info updated:", updatedPersonal);
  };

  const handleUpdateContact = async (
    updatedContact: IUserUpdate,
    id: string
  ) => {
    try {
      const response = await UpdateDataUser(updatedContact, id);
      setUser();
      console.log("Contact updated:", response);
    } catch (error) {
      console.error("Failed to update contact:", error);
    }
  };

  const handleUpdateSkills = async (updatedSkills: IUserUpdate, id: string) => {
    try {
      const response = await UpdateDataUser(updatedSkills, id);
      setUser();
      console.log("Skill updated:", response);
    } catch (error) {
      console.error("Failed to update skill:", error);
    }
  };

  const handleUpdateCoverImg = async (
    updatedCoverImg: IUserUpdate,
    id: string
  ) => {
    try {
      await UpdateDataUser(updatedCoverImg, id);
      setUser();
    } catch (error) {
      console.error("Failed to update Cover image:", error);
    }
    console.log("Cover image updated:", updatedCoverImg);
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
          userData={user ? user : null}
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

        {/* is company or admin */}
        {user ? (
          user.role === 3 || user.role === 0 ? (
            <AccountSection userData={user} isEdit={isEdit} />
          ) : null
        ) : null}

        {/* is student */}
        <SkillsSection
          isEdit={isEdit}
          hanleUpdateSkills={handleUpdateSkills}
          listSkills={listAllTopic}
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
