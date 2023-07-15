import IUserUpdate from "@/interface/API/IUserUpdate";
import UserModel from "@/interface/model/UserModel";
import axios from "axios";

//Get user
export const getUser = async (userId: string): Promise<UserModel> => {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    const userData = response.data;
    return userData as UserModel;
  } catch (error) {
    throw new Error("Failed to get user data");
  }
};
//Update contact user
export const updateContact = async (
  updatedContact: IUserUpdate
): Promise<IUserUpdate> => {
  try {
    const response = await axios.put<IUserUpdate>(
      "/api/contact",
      updatedContact
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update contact");
  }
};

//Update skill user
export const updateSkill = async (
  updatedSkills: IUserUpdate
): Promise<IUserUpdate> => {
  try {
    const response = await axios.put<IUserUpdate>("/api/skill", updatedSkills);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update skill");
  }
};

// Update personal information
export const updatePersonal = async (
  updatedPersonal: IUserUpdate
): Promise<IUserUpdate> => {
  try {
    const response = await axios.put<IUserUpdate>(
      "/api/personal",
      updatedPersonal
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update Personal");
  }
};

// Update about information
export const updateAbout = async (
  updatedAbout: IUserUpdate
): Promise<IUserUpdate> => {
  try {
    const response = await axios.put<IUserUpdate>("/api/about", updatedAbout);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update About");
  }
};

// Update cover image
export const updateCoverImage = async (
  updatedCoverImg: IUserUpdate
): Promise<IUserUpdate> => {
  try {
    const response = await axios.put<IUserUpdate>(
      "/api/cover-img",
      updatedCoverImg
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update cover image");
  }
};

// Update avatar
export const updateAvatar = async (
  updatedAvatar: IUserUpdate
): Promise<IUserUpdate> => {
  try {
    const response = await axios.put<IUserUpdate>("/api/avatar", updatedAvatar);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update avatar");
  }
};
