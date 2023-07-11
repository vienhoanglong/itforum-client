import Avatar from "@/components/image/Avatar";
import LayoutSecondary from "@/layout/LayoutSecondary";
import React, { useEffect, useState } from "react";
import { HiDocument, HiPencil } from "react-icons/hi";
import avt1 from "@/assets/avt1.jpg";
import { dataUser, exampleDataTopic, topicColors } from "@/constants/global";
import Thumbnail from "../assets/header-image-post-detail.png";
import { Label } from "@/components/label";
import { BsEyeFill, BsFillChatQuoteFill, BsMessenger } from "react-icons/bs";

const ProfilePage: React.FC = () => {
  const [fullName, setFulltName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [classValue, setClassValue] = useState("");
  const [major, setMajor] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const userInfo = dataUser[0];
    setFulltName(userInfo.fullname);
    setBirthday(userInfo.birthday);
    setClassValue(userInfo.class);
    setMajor(userInfo.major);
    setId(userInfo.id);
  }, []);
  return (
    <LayoutSecondary>
      <div className="max-w-4xl mx-auto p-8 bg-light4 shadow-sm dark:bg-dark1 rounded-lg dark:text-light0">
        <h4 className="text-xl font-bold text-darker mb-4 ">Profile</h4>

        <div className="dark:bg-dark2 bg-light3 shadow-sm flex flex-col rounded-t-xl rounded-b-lg mb-4">
          <div className="w-full h-[150px]">
            <img
              src="https://i.pinimg.com/originals/25/e1/4d/25e14d756f86b34a3bd12d65f329d03a.jpg"
              className="w-full rounded-t-xl max-w-full max-h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="text-left mb-4 relative">
            <a
              href=""
              className=" absolute bottom-[60%] left-[5%] flex items-center mr-3 w-28 h-28 "
            >
              <img
                src={avt1}
                alt="Avatar"
                className="w-[100px] h-[100px] object-cover border-solid border-4 dark:border-dark2 align-middle cursor-pointer rounded-full"
              />
            </a>
            <div className="flex justify-between flex-wrap">
              <div className=" mt-10 px-4 min-w-[170px]">
                <h1 className=" text-base font-bold mt-4">{fullName}</h1>
                <p className="">Software developer</p>
                <div className="flex items-start flex-col space-x-2 mt-2">
                  <div className="flex items-center mr-4">
                    <BsEyeFill />
                    <span className="ml-1">100 follower</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <HiDocument />
                      <span className="ml-1">100</span>
                    </div>
                    <div className="flex items-center mr-2">
                      <BsFillChatQuoteFill />
                      <span className="ml-1">100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 relative">
            <h2 className="text-base font-bold mb-4">About</h2>
            <p className="">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              eget est ac turpis placerat malesuada a nec sem. Morbi quis diam
              sit amet mi malesuada malesuada. Nulla pharetra neque id nunc
              aliquam, et pulvinar nisl eleifend. Aenean commodo dolor id
              eleifend pellentesque. Nunc non urna id felis luctus semper a ut
              nisi.
            </p>
            <button className=" flex space-x-1 items-center absolute top-2 right-2 bg-blue-500 text-white px-2  py-2 rounded-full">
              <HiPencil></HiPencil>
              <span className="max-md:hidden">Edit</span>
            </button>
          </div>
        </div>

        <div className="mb-4 dark:bg-dark2 bg-light3 shadow-sm w-auto rounded-lg p-4 relative">
          <h2 className="text-base font-bold mb-4">Personal Information</h2>

          <div className="flex flex-wrap">
            <div className="w-1/2 flex flex-col space-y-4 min-w-[120px] mb-4">
              <div className="">
                <Label htmlFor="title" className="block text-xs font-semibold">
                  Full name:
                </Label>
                <div className="">{fullName}</div>
              </div>
              <div className="">
                <Label htmlFor="title" className="block text-xs font-semibold">
                  Birthday:
                </Label>
                <div>{birthday}</div>
              </div>
              <div className="">
                <Label htmlFor="title" className="block text-xs font-semibold">
                  Class:
                </Label>
                <div>{classValue}</div>
              </div>
            </div>
            <div className="w-1/2 flex flex-col space-y-4 min-w-[120px]">
              <div className="">
                <Label htmlFor="title" className="block text-xs font-semibold">
                  ID:
                </Label>
                <div>{id}</div>
              </div>
              <div className="">
                <Label htmlFor="title" className="block text-xs font-semibold">
                  Major:
                </Label>
                <div>{major}</div>
              </div>
            </div>
          </div>

          <button className=" flex space-x-1 items-center absolute top-2 right-2 bg-blue-500 text-white px-2 py-2 rounded-full">
            <HiPencil></HiPencil>
            <span className="max-md:hidden">Edit</span>
          </button>
        </div>

        <div className="mb-4 dark:bg-dark2 bg-light3 shadow-sm rounded-lg p-4 relative">
          <h2 className="text-base font-bold mb-4">Skills</h2>
          <div className="w-full my-2 flex flex-wrap">
            {exampleDataTopic.map((topic) => (
              <div
                key={topic.id}
                className={`cursor-pointer inline-block text-xs border-2 px-2 py-1 rounded-full m-[1px] ${
                  topicColors[topic.name] || ""
                }`}
              >
                {topic.name}
              </div>
            ))}
          </div>
          <button className=" flex space-x-1 items-center absolute top-2 right-2 bg-blue-500 text-white px-2 py-2 rounded-full">
            <HiPencil></HiPencil>
            <span className="max-md:hidden">Edit</span>
          </button>
        </div>

        <div className="dark:bg-dark2 bg-light3 shadow-sm rounded-lg p-4 relative">
          <h2 className="text-base font-bold mb-4">Contact</h2>
          <ul className="">
            <li>
              Email:{" "}
              <a href="https://example.com" className="text-blue-500">
                hoanglong.com
              </a>
            </li>
            <li>
              Github:{" "}
              <a href="https://hoanglong.com" className="text-blue-500">
                hoanglong.com
              </a>
            </li>
            <li>
              Linkedin:{" "}
              <a href="https://hoanglong.com" className="text-blue-500">
                hoanglong.com
              </a>
            </li>
            <li>
              FB:{" "}
              <a href="https://hoanglong.com" className="text-blue-500">
                hoanglong.com
              </a>
            </li>
            <li>Phone: 123-456-7890</li>
            <li>
              Website:{" "}
              <a href="https://hoanglong.com" className="text-blue-500">
                hoanglong.com
              </a>
            </li>
          </ul>
          <button className="flex space-x-1 items-center absolute top-2 right-2 bg-blue-500 text-white px-2 py-2 rounded-full">
            <HiPencil></HiPencil>
            <span className="max-md:hidden">Edit</span>
          </button>
        </div>
      </div>
    </LayoutSecondary>
  );
};

export default ProfilePage;
