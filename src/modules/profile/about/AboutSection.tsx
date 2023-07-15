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
  onUpdateCoverImage?: (newCoverImage: IUserUpdate) => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  userData,
  onUpdateAbout,
}) => {
  const [isUpdatingAbout, setIsUpdatingAbout] = useState(false);
  const [isUpdatingImg, setIsUpdatingImg] = useState(false);
  const [newAbout, setNewAbout] = useState(userData.about);

  const handleOpenUpdateModal = () => {
    setIsUpdatingAbout(true);
  };

  const handleCloseModal = () => {
    setIsUpdatingAbout(false);
    setIsUpdatingImg(false);
  };

  const handleAboutChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewAbout(e.target.value);
  };

  //update new about
  const handleUpdateAbout = () => {
    const newAboutUpdate: IUserUpdate = {
      about: newAbout,
    };
    onUpdateAbout(newAboutUpdate);
    handleCloseModal();
  };

  const handleImageUpload = (imageUrl: string) => {
    // handle upload image
    console.log("Image uploaded:", imageUrl);
  };

  const handleUpdateImg = () => {
    setIsUpdatingImg(true);
  };

  return (
    <div className="dark:bg-dark2 bg-light3 shadow-sm flex flex-col rounded-t-xl rounded-b-lg mb-4">
      <div className="w-full h-[150px] relative">
        <img
          src={userData.coverImage}
          className="w-full rounded-t-xl max-w-full max-h-full object-cover"
          loading="lazy"
        />
        <button
          className=" flex space-x-1 items-center absolute top-2 right-2 bg-mainColor hover:bg-darker text-white px-2  py-2 rounded-full"
          onClick={handleUpdateImg}
        >
          <HiPencil></HiPencil>
          <span className="max-md:hidden">Edit</span>
        </button>
        <Modal isOpen={isUpdatingImg} onClose={handleCloseModal}>
          <Label htmlFor="title" className="block text-xs font-semibold">
            Choose your image:
          </Label>
          <UploadImage onImageUpload={handleImageUpload}></UploadImage>
          <div className="flex justify-end">
            <Button
              size="small"
              kind="primary"
              className="text-xs mt-2"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </Modal>
      </div>

      <div className="text-left mb-4 relative">
        <a
          href=""
          className=" mb-1 absolute bottom-[50%] left-[3%] z-0 flex items-center w-[100px] h-[100px] "
        >
          <img
            src={userData.avatar}
            alt="Avatar"
            className="w-full h-full dark:brightness-90 object-cover border-solid border-4 dark:border-dark2 align-middle rounded-full"
          />
          <button className="absolute top-[50%] inset-0 rounded-b-full h-[50%] flex items-center justify-center bg-dark0 text-white opacity-0 transition-opacity duration-300 hover:opacity-50">
            <HiPencil />
          </button>

          {/* <button className="absolute bottom-0 left-0 w-[50%] h-full rounded-r-full flex items-center justify-center bg-blue-500 text-white">
      <HiPencil />
    </button> */}
        </a>
        {/* <div className="relative w-[100px] h-[100px]">
              <img
                src={userData.avatar}
                alt="Avatar"
                className="w-full h-full object-cover rounded-full"
              />
              <button className="absolute inset-0 h-[50%] flex items-center justify-center bg-blue-500 text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
                <HiPencil />
              </button>
            </div>
                 */}

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
        <button
          className="flex space-x-1 items-center absolute top-2 right-2 bg-mainColor hover:bg-darker text-white px-2 py-2 rounded-full"
          onClick={handleOpenUpdateModal}
        >
          <HiPencil />
          <span className="max-md:hidden">Edit</span>
        </button>
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
