import React, { useState } from "react";
import { HiPencil } from "react-icons/hi";
import Modal from "@/components/modal/Modal";
import { Label } from "@/components/label";
import { Button } from "@/components/button";
import { BsEyeFill } from "react-icons/bs";
import UploadImage from "@/components/uploadImage/UploadImage";
import UserModel from "@/interface/model/UserModel";
import IUserUpdate from "@/interface/API/IUserUpdate";

interface AboutSectionProps {
  userData: UserModel;
  onUpdateAbout: (newAbout: IUserUpdate) => void;
  onUpdateCoverImage: (newCoverImage: IUserUpdate) => void;
  onUpdateAvatar: (newAvatar: IUserUpdate) => void;
  isEdit: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  userData,
  isEdit,
  onUpdateAbout,
  onUpdateAvatar,
  onUpdateCoverImage,
}) => {
  const [isUpdatingAbout, setIsUpdatingAbout] = useState(false);
  const [isUpdatingImg, setIsUpdatingImg] = useState(false);
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
  const [newAbout, setNewAbout] = useState(userData.about);
  const [newCoverImg, setNewCoverImg] = useState(userData.coverImage);
  const [newAvatar, setNewAvatar] = useState(userData.avatar);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleDeleteImage = () => {
    setUploadComplete(false);
  };
  const handleOpenModalAbout = () => {
    setIsUpdatingAbout(true);
  };
  const handleOpenModalImg = () => {
    setIsUpdatingImg(true);
  };
  const handleOpenModalAvatar = () => {
    setIsUpdatingAvatar(true);
  };
  const handleCloseModal = () => {
    setIsUpdatingAbout(false);
    setIsUpdatingImg(false);
    setIsUpdatingAvatar(false);
    setUploadComplete(false);
  };

  const handleAboutChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewAbout(e.target.value);
  };
  const handleCoverImageUpload = (imageUrl: string) => {
    // handle upload image
    setNewCoverImg(imageUrl);
    setUploadComplete(true);
    console.log("Cover Image uploaded:", imageUrl);
  };
  const handleAvatarUpload = (imageUrl: string) => {
    // handle upload image
    setNewAvatar(imageUrl);
    setUploadComplete(true);
    console.log("Avatar Image uploaded:", imageUrl);
  };

  //update new about
  const handleUpdateAbout = () => {
    const newAboutUpdate: IUserUpdate = {
      about: newAbout,
    };
    onUpdateAbout(newAboutUpdate);
    handleCloseModal();
  };

  //Update Cover Img
  const handleUpdateCoverImg = () => {
    const newCoverImgUpdate: IUserUpdate = {
      coverImage: newCoverImg,
    };
    onUpdateCoverImage(newCoverImgUpdate);
    setUploadComplete(false);
    handleCloseModal();
  };
  //Update avatar
  const handleUpdateAvatar = () => {
    const newAvatarUpdate: IUserUpdate = {
      avatar: newAvatar,
    };
    onUpdateAvatar(newAvatarUpdate);
    setUploadComplete(false);
    handleCloseModal();
  };

  return (
    <div className="dark:bg-dark2 bg-light3 shadow-sm flex flex-col rounded-t-xl rounded-b-lg mb-4">
      <div className="w-full h-[150px] relative">
        <img
          src={userData.coverImage}
          className="w-full rounded-t-xl max-w-full max-h-full object-cover"
          loading="lazy"
        />
        {isEdit ? (
          <button
            className=" flex space-x-1 items-center absolute top-2 right-2 bg-mainColor hover:bg-darker text-white px-2  py-2 rounded-full"
            onClick={handleOpenModalImg}
          >
            <HiPencil></HiPencil>
            <span className="max-md:hidden">Edit</span>
          </button>
        ) : null}

        <Modal isOpen={isUpdatingImg} onClose={handleCloseModal}>
          <Label htmlFor="title" className="block text-xs font-semibold">
            Choose your cover image:
          </Label>

          <UploadImage
            onImageUpload={handleCoverImageUpload}
            onDeleteImage={handleDeleteImage}
          ></UploadImage>

          <div className="flex justify-end">
            {uploadComplete ? (
              <Button
                size="small"
                kind="primary"
                className="text-xs mt-2"
                type="submit"
                handle={handleUpdateCoverImg}
              >
                Submit
              </Button>
            ) : null}
          </div>
        </Modal>
      </div>

      <div className="text-left mb-4 relative">
        <div className=" mb-1 absolute bottom-[50%] left-[3%] z-0 flex items-center w-[100px] h-[100px] ">
          <img
            src={userData.avatar}
            alt="Avatar"
            className="relative w-full h-full dark:brightness-90 object-cover border-solid border-4 dark:border-dark2 align-middle rounded-full"
          />
          {isEdit ? (
            <button
              onClick={handleOpenModalAvatar}
              className="absolute top-[47%] mx-1 inset-0 rounded-b-full h-[50%] flex items-center justify-center bg-dark0 text-white opacity-0 transition-opacity duration-200 hover:opacity-50"
            >
              <HiPencil />
              Edit
            </button>
          ) : null}

          <Modal isOpen={isUpdatingAvatar} onClose={handleCloseModal}>
            <Label
              htmlFor="updateAvatar"
              className="block text-xs font-semibold"
            >
              Choose your avatar:
            </Label>

            <UploadImage
              onImageUpload={handleAvatarUpload}
              onDeleteImage={handleDeleteImage}
            ></UploadImage>
            <div className="flex justify-end">
              {uploadComplete ? (
                <Button
                  size="small"
                  kind="primary"
                  className="text-xs mt-2"
                  type="submit"
                  handle={handleUpdateAvatar}
                >
                  Submit
                </Button>
              ) : null}
            </div>
          </Modal>
        </div>
        <div className="flex justify-between items-center flex-wrap mt-10">
          <div className=" px-4 min-w-[170px]">
            <h1 className=" text-base font-bold mt-4">{userData.fullname}</h1>
            <p className="">{userData.major}</p>
          </div>
          <div className="flex items-center mx-4 mt-2">
            <BsEyeFill />
            <span className="ml-1">{userData.follower} follower</span>
          </div>
        </div>
      </div>
      <div className="p-4 relative">
        <h2 className="text-base font-bold mb-4">About</h2>
        <p className="">{userData.about}</p>
        {isEdit ? (
          <button
            className="flex space-x-1 items-center absolute top-2 right-2 bg-mainColor hover:bg-darker text-white px-2 py-2 rounded-full"
            onClick={handleOpenModalAbout}
          >
            <HiPencil />
            <span className="max-md:hidden">Edit</span>
          </button>
        ) : null}

        <Modal isOpen={isUpdatingAbout} onClose={handleCloseModal}>
          <div className="flex flex-col">
            <Label htmlFor="about" className="block text-xs font-semibold mb-2">
              About me:
            </Label>
            <textarea
              id="about"
              className="text-xs sm:w-[400px] sm:h-[200px] w-[250px] h-[100px] overflow-y-hidden p-2 break-words border rounded dark:bg-dark2 dark:text-light0"
              placeholder="Typing about you..."
              value={newAbout}
              onChange={handleAboutChange}
            ></textarea>
            <div className="flex justify-end">
              <Button
                size="small"
                kind="primary"
                className="text-xs mt-2"
                handle={handleUpdateAbout}
              >
                Submit
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AboutSection;
