import LayoutSecondary from "@/layout/LayoutSecondary";
import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ContactSection from "@/modules/profile/contacts/ContactSection";
import SkillsSection from "@/modules/profile/skills/SkillsSection";
import PersonalSection from "@/modules/profile/personal/PersonalSection";
import AboutSection from "@/modules/profile/about/AboutSection";
import IUserUpdate from "@/interface/API/IUserUpdate";
import { useUserStore } from "@/store/userStore";
import { UpdateDataUser } from "@/services/userService";
import { useTopicStore } from "@/store/topicStore";
import { useNavigate, useParams } from "react-router-dom";
import { HiArrowCircleLeft } from "react-icons/hi";

const UserPage: React.FC = () => {
  //data from api
  const { setUser, getById, userById } = useUserStore();
  //get list skill topic
  const { listAllTopic, getTopic } = useTopicStore();

  const { userId } = useParams<string>();

  const navigate = useNavigate();
  useEffect(() => {
    getTopic();
    userId && getById(userId);
  }, [getById, getTopic, userById, userId]);

  const handleBackButtonClick = () => {
    navigate(-1);
  };
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
        <button
          className="dark:text-light0 bg- rounded-full mb-4 pr-1 link inline-flex items-center text-sm font-medium !text-grey-600 bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark1"
          onClick={handleBackButtonClick}
        >
          <HiArrowCircleLeft className="w-6 h-6 mr-1" />
          Back
        </button>
        <AboutSection
          userData={userById}
          onUpdateAbout={handleUpdateAbout}
          onUpdateAvatar={handleUpdateAvatar}
          onUpdateCoverImage={handleUpdateCoverImg}
          isEdit={false}
        ></AboutSection>

        <PersonalSection
          userData={userById}
          isEdit={false}
          hanldeUpdatePersonal={handleUpdatePersonal}
        />

        {/* is student */}
        {userById ? (
          userById.role === 2 ? (
            <SkillsSection
              isEdit={false}
              hanleUpdateSkills={handleUpdateSkills}
              listSkills={listAllTopic}
              userData={userById}
            />
          ) : null
        ) : null}
        <ContactSection
          handleUpdateContact={handleUpdateContact}
          userData={userById}
          isEdit={false}
        />
      </div>
    </LayoutSecondary>
  );
};

export default UserPage;
