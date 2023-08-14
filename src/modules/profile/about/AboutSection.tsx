import React, { useState } from "react";
import { HiPencil } from "react-icons/hi";
import Modal from "@/components/modal/Modal";
import { Label } from "@/components/label";
import { Button } from "@/components/button";
import { BsEyeFill } from "react-icons/bs";
import UploadImage from "@/components/uploadImage/UploadImage";
import IUserUpdate from "@/interface/API/IUserUpdate";
import { IUser } from "@/interface/user";
import { useUserStore } from "@/store/userStore";

const colors = [
  { color: "bg-yellow-500", value: "Value 1" },
  { color: "bg-blue-500", value: "Value 2" },
  { color: "bg-orange-500", value: "Value 3" },
  { color: "bg-red-500", value: "Value 3" },
  { color: "bg-green-500", value: "Value 3" },
  { color: "bg-violet-500", value: "Value 3" },
  { color: "bg-purple-500", value: "Value 1" },
  { color: "bg-cyan-500", value: "Value 2" },
  { color: "bg-emerald-500", value: "Value 3" },
  { color: "bg-lime-500", value: "Value 3" },
  { color: "bg-teal-500", value: "Value 3" },
  { color: "bg-amber-500", value: "Value 3" },
  { color: "bg-sky-500", value: "Value 3" },
];
interface AboutSectionProps {
  userData: IUser | null;
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
  const [newAbout, setNewAbout] = useState("");
  const [newCoverImg, setNewCoverImg] = useState("");
  const [newAvatar, setNewAvatar] = useState("");
  const [uploadComplete, setUploadComplete] = useState(false);

  const { listAvatar, getListAvatar } = useUserStore();

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
    getListAvatar();
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
          src="https://i.pinimg.com/originals/25/e1/4d/25e14d756f86b34a3bd12d65f329d03a.jpg"
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
            src={userData ? userData.avatar : ""}
            alt="Avatar"
            className="relative bg-white  w-full h-full dark:brightness-90 object-cover border-solid border-4 dark:border-dark2 align-middle rounded-full"
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
            <div className=" mb-4">
              <Label
                htmlFor="updateAvatar"
                className="block text-xs font-semibold mb-4 mr-8"
              >
                Choose your avatar:
              </Label>
              <div className="flex flex-wrap max-w-[300px] gap-2">
                {listAvatar &&
                  listAvatar.map((avatar, index) => (
                    <div
                      key={index}
                      className=" inline-block rounded-lg border-[1px] border-dark3 cursor-pointer"
                    >
                      <img
                        src={avatar.url}
                        alt={avatar.name}
                        width={50}
                        height={50}
                        className=" object-cover rounded-lg"
                      ></img>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <Label
                htmlFor="title"
                className="block mb-1 text-xs font-semibold"
              >
                Choose color
              </Label>
              <div className=" flex flex-wrap max-w-[300px] gap-1 w-auto cursor-pointer ">
                {colors.map((colorInfo, index) => (
                  <div
                    key={index}
                    className={`w-[30px] h-[30px] rounded-lg  ${colorInfo.color}`}
                  />
                ))}
              </div>
            </div>

            {/* <UploadImage
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
            </div> */}
          </Modal>
        </div>
        <div className="flex justify-between items-center flex-wrap mt-10">
          <div className=" px-4 min-w-[170px]">
            <h1 className=" text-base font-bold mt-4">Tran Hoang Long</h1>
            <p className="">Student</p>
          </div>
          <div className="flex items-center mx-4 mt-2">
            <BsEyeFill />
            <span className="ml-1">1000 follower</span>
          </div>
        </div>
      </div>
      <div className="p-4 relative">
        <h2 className="text-base font-bold mb-4">About</h2>
        <p className="">{userData ? userData.desc : ""}</p>
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
