import { Label } from "@/components/label";
import UploadImage from "@/components/uploadImage/UploadImage";
import ITopicCreate from "@/interface/API/ITopicCreate";
import { uploadImage } from "@/services/userService";

import React, { useState } from "react";

const colors = [
  { color: "bg-yellow-500", value: "yellow" },
  { color: "bg-blue-500", value: "blue" },
  { color: "bg-orange-500", value: "orange" },
  { color: "bg-red-500", value: "red" },
  { color: "bg-green-500", value: "green" },
  { color: "bg-violet-500", value: "violet" },
  { color: "bg-purple-500", value: "purple" },
  { color: "bg-cyan-500", value: "cyan" },
  { color: "bg-emerald-500", value: "emerald" },
  { color: "bg-lime-500", value: "lime" },
  { color: "bg-teal-500", value: "teal" },
  { color: "bg-amber-500", value: "amber" },
  { color: "bg-sky-500", value: "sky" },
];

type CreateTopicFormProps = {
  onSubmit: (topic: ITopicCreate) => void;
};
const AddNewTopic: React.FC<CreateTopicFormProps> = ({ onSubmit }) => {
  const [uploadImg, setNewUploadImg] = useState<File | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false);

  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const [newColor, setNewColor] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState<string>("devOps");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleCoverImageUpload = (file: File) => {
    setNewUploadImg(file);
    setUploadComplete(true);
  };
  const handleDeleteImage = () => {
    setUploadComplete(false);
  };

  //new name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };
  //new desc
  const hanldeDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDesc(e.target.value);
  };
  //new color
  const handleColorClick = (value: string) => {
    if (value != "") {
      setNewColor(value);
      if (selectedColor === value) {
        setSelectedColor(null);
      } else {
        setSelectedColor(value);
      }
    }
  };
  //new type
  const hanldeTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewType(e.target.value);
  };
  //new logo
  const handleUpload = async () => {
    try {
      if (uploadImg != null) {
        const response = await uploadImage(uploadImg);
        if (response) {
          return response;
        }
      }
    } catch (error) {
      console.error("Failed to upload image");
      throw error;
    }
  };

  const hanldeCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const newLogoUrl = await handleUpload();
    if (
      newName === "" ||
      newDesc === "" ||
      newColor === "" ||
      newLogoUrl === ""
    ) {
      console.log("Title and content are required.");
      return;
    }

    const newTopic: ITopicCreate = {
      name: newName,
      desc: newDesc,
      img: newLogoUrl,
      color: newColor,
      type: newType,
    };
    onSubmit(newTopic);
  };

  return (
    <>
      <div className="flex justify-start mb-8">
        <span className="dark:text-light0 font-semibold">Create Topic</span>
      </div>
      <form className="text-xs dark:text-light0 max-sm:h-[530px] ">
        <div className="mb-4">
          <div className="mb-4">
            <Label htmlFor="title" className="block mb-1 text-xs font-semibold">
              Name
            </Label>
            <input
              onChange={(e) => handleNameChange(e)}
              name="title"
              placeholder="Name..."
              className=" dark:bg-dark0 border rounded-lg w-[300px] p-2 h-[30px] block dark:border-dark2 border-gray-500 text-xs shadow-inner "
            ></input>
            {submitted && newName === "" && (
              <div className="block text-xs text-red-500 mt-1">
                Name is required.
              </div>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="title" className="block mb-1 text-xs font-semibold">
              Description
            </Label>
            <input
              onChange={(e) => hanldeDescChange(e)}
              name="title"
              placeholder="Description..."
              className=" dark:bg-dark0 border rounded-lg w-[300px] p-2 h-[30px] block dark:border-dark2 border-gray-500 text-xs shadow-inner "
            ></input>
            {submitted && newDesc === "" && (
              <div className="block text-xs text-red-500 mt-1">
                Description is required.
              </div>
            )}
          </div>
          <div className="mb-4">
            {/* <Label htmlFor="title" className="block mb-1 text-xs font-semibold">
              Image
            </Label>
            <input
              name="title"
              placeholder="Image..."
              className=" dark:bg-dark0 border rounded-lg w-[300px] p-2 h-[30px] block dark:border-dark2 border-gray-500 text-xs shadow-inner "
            ></input> */}
            <Label htmlFor="title" className="block text-xs font-semibold">
              Choose topic image:
            </Label>

            <UploadImage
              onImageUpload={handleCoverImageUpload}
              onDeleteImage={handleDeleteImage}
            ></UploadImage>
            {submitted && uploadComplete === false && (
              <div className="block text-xs text-red-500 mt-1">
                Logo is required.
              </div>
            )}
          </div>
          <div className=" mb-4">
            <Label htmlFor="title" className="block mb-1 text-xs font-semibold">
              Type
            </Label>
            <div>
              <select
                id="filterDropdown"
                className="bg-light1 dark:bg-dark2 rounded-md py-1 px-2"
                value={newType}
                onChange={(e) => hanldeTypeChange(e)}
              >
                <option value="devOps">DevOps</option>
                <option value="frameworks">Framework</option>
                <option value="languages">Language</option>
                <option value="subject">Subject</option>
                <option value="tooling">Tooling</option>
                <option value="testing">Testing</option>
              </select>
            </div>
          </div>
          <div>
            <Label htmlFor="title" className="block mb-1 text-xs font-semibold">
              Choose color
            </Label>
            <div className=" flex flex-wrap max-w-[300px] gap-1 w-auto cursor-pointer ">
              {colors.map((colorInfo, index) => (
                <div
                  key={index}
                  className={`w-[30px] h-[30px] rounded-lg  ${
                    colorInfo.color
                  } cursor-pointer ${
                    selectedColor === colorInfo.value
                      ? "border-2 border-blue-800"
                      : ""
                  }`}
                  onClick={() => handleColorClick(colorInfo.value)}
                />
              ))}
            </div>
            {submitted && newColor === "" && (
              <div className="block text-xs text-red-500 mt-1">
                Color is required.
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="p-4 rounded-lg bg-mainColor text-white flex space-x-1 my-2"
            onClick={hanldeCreate}
          >
            <span className="text-[12px]">Submit</span>
          </button>
        </div>
      </form>
    </>
  );
};
export default AddNewTopic;
