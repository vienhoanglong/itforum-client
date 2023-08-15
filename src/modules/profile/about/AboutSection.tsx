import React, { useEffect, useState } from "react";
import { HiPencil } from "react-icons/hi";
import Modal from "@/components/modal/Modal";
import { Label } from "@/components/label";
import { Button } from "@/components/button";
import { BsEyeFill } from "react-icons/bs";
import UploadImage from "@/components/uploadImage/UploadImage";
import IUserUpdate from "@/interface/API/IUserUpdate";
import { IUser } from "@/interface/user";
import { useUserStore } from "@/store/userStore";
import { colorsAvatar } from "@/constants/global";
import { uploadImage } from "@/services/userService";
import { coverDefault } from "@/utils/helper";

interface AboutSectionProps {
  userData: IUser | null;
  onUpdateAbout: (newAbout: IUserUpdate, id: string) => void;
  onUpdateCoverImage: (newCoverImage: IUserUpdate, id: string) => void;
  onUpdateAvatar: (newAvatar: IUserUpdate, id: string) => void;
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
  const [uploadImg, setNewUploadImg] = useState<File | null>(null);
  const [newCoverImg, setNewCoverImg] = useState("A");

  const [uploadComplete, setUploadComplete] = useState(false);

  const [newAbout, setNewAbout] = useState(userData ? userData.desc : "");
  const { listAvatar, getListAvatar } = useUserStore();
  const getColorAvatar = userData
    ? colorsAvatar.find((item) => item.color === userData.color)
    : null;
  const colorAvatar = getColorAvatar ? getColorAvatar.value : "";
  const [selectedAvatar, setSelectedAvatar] = useState(
    userData ? userData.avatar : null
  );
  const [selectedColor, setSelectedColor] = useState(
    userData ? userData.color : null
  );

  const handleSelectAvatar = (avatar: string) => {
    if (selectedAvatar === avatar) {
      setSelectedAvatar(null);
    } else {
      setSelectedAvatar(avatar);
    }
  };

  useEffect(() => {
    setNewAbout(userData ? userData.desc : "");
  }, [userData]);

  const handleSelectColor = (color: string) => {
    if (selectedColor === color) {
      setSelectedColor(null);
    } else {
      setSelectedColor(color);
    }
  };

  const handleDeleteImage = () => {
    setUploadComplete(false);
  };
  const handleOpenModalAbout = () => {
    setIsUpdatingAbout(true);
    console.log("newAbout", newAbout);
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
    setSelectedColor(null);
    setSelectedAvatar(null);
  };

  const handleAboutChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewAbout(e.target.value);
  };
  const handleCoverImageUpload = (file: File) => {
    setNewUploadImg(file ? file : null);
    setUploadComplete(true);
  };

  //Update Cover Img to firebase
  const handleUpload = async () => {
    try {
      if (uploadImg != null) {
        const response = await uploadImage(uploadImg);
        const newCoverImage: IUserUpdate = {
          coverImg: response,
        };

        onUpdateCoverImage(
          newCoverImage,
          userData ? (userData._id ? userData._id : "") : ""
        );
        handleCloseModal();
        return setNewCoverImg(response);
      }
      throw new Error("Upload failed");
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  //Update avatar
  const handleUpdateAvatar = () => {
    const newAvatarUpdate: IUserUpdate = {
      avatar: selectedAvatar ? selectedAvatar : userData ? userData.avatar : "",
      color: selectedColor ? selectedColor : userData ? userData.color : "",
      //role:2
    };
    onUpdateAvatar(
      newAvatarUpdate,
      userData ? (userData._id ? userData._id : "") : ""
    );
    handleCloseModal();
  };

  //update new about & full name
  const handleUpdateAbout = () => {
    const newAboutUpdate: IUserUpdate = {};
    if (newAbout !== "") {
      newAboutUpdate.desc = newAbout;
    }

    onUpdateAbout(
      newAboutUpdate,
      userData ? (userData._id ? userData._id : "") : ""
    );
    handleCloseModal();
  };

  return (
    <div className="dark:bg-dark2 bg-light3 shadow-sm flex flex-col rounded-t-xl rounded-b-lg mb-4">
      <div className="w-full h-[150px] relative">
        <img
          src={
            userData && userData?.coverImg ? userData.coverImg : coverDefault
          }
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
                handle={handleUpload}
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
            className={`relative ${colorAvatar}  w-full h-full dark:brightness-90 object-cover border-solid border-4 dark:border-dark2 align-middle rounded-full`}
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
              <div className="flex flex-wrap max-w-[340px] gap-2">
                {listAvatar &&
                  listAvatar.map((avatar, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectAvatar(avatar.url)}
                      className="inline-flex justify-center items-center rounded-lg border-[1px] border-dark3 cursor-pointer"
                      style={{ width: "50px", height: "50px" }}
                    >
                      <img
                        src={avatar.url}
                        alt={avatar.name}
                        className={`object-cover rounded-lg ${
                          selectedAvatar === avatar.url
                            ? "border-2 border-blue-500"
                            : ""
                        }`}
                        style={{ width: "100%", height: "100%" }}
                      />
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
              <div className=" flex flex-wrap max-w-[300px] gap-1 w-auto ">
                {colorsAvatar.map((colorInfo, index) => (
                  <div
                    key={index}
                    className={`w-[30px] h-[30px] rounded-lg ${
                      colorInfo.value
                    } cursor-pointer ${
                      selectedColor === colorInfo.color
                        ? "border-2 border-blue-800"
                        : ""
                    }`}
                    onClick={() => handleSelectColor(colorInfo.color)}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              {selectedAvatar || selectedColor ? (
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
            <h1 className="text-base font-bold mt-4">
              {userData
                ? userData.fullName
                  ? userData.fullName
                  : userData.username
                : ""}
            </h1>
            <p className="">
              {userData
                ? (() => {
                    switch (userData.role) {
                      case 0:
                        return "Admin";
                      case 1:
                        return "Teacher";
                      case 2:
                        return "Student";
                      case 3:
                        return "Company";
                      default:
                        return "";
                    }
                  })()
                : ""}
            </p>
          </div>
          <div className="flex items-center mx-4 mt-2">
            <BsEyeFill />
            <span className="ml-1">
              {userData
                ? userData.followers?.length != 0
                  ? userData.followers
                  : "0"
                : ""}{" "}
              follower
            </span>
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
            <div className="flex flex-col">
              <Label
                htmlFor="about"
                className="block text-xs font-semibold mb-2"
              >
                About me:
              </Label>
              <textarea
                id="about"
                className="text-xs sm:w-[400px] sm:h-[200px] w-[250px] h-[100px] overflow-y-hidden p-2 break-words border rounded dark:bg-dark2 dark:text-light0"
                placeholder="Typing about you..."
                value={newAbout}
                onChange={handleAboutChange}
              ></textarea>
            </div>
            <div className="flex justify-end">
              {newAbout && (
                <Button
                  size="small"
                  kind="primary"
                  className="text-xs mt-2"
                  handle={handleUpdateAbout}
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AboutSection;
