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
import { useParams } from "react-router-dom";

const UserPage: React.FC = () => {
  //data from api
  const { setUser, getById, userById } = useUserStore();
  //get list skill topic
  const { listAllTopic, getTopic } = useTopicStore();
  const { userId } = useParams<string>();
  useEffect(() => {
    getTopic();
    userId && getById(userId);
    console.log(userById);
  }, [getById, getTopic, userId]);

  console.log("userById", userId);

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
        <SkillsSection
          isEdit={false}
          hanleUpdateSkills={handleUpdateSkills}
          listSkills={listAllTopic}
          userData={userById}
        />

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
