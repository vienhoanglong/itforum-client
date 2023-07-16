import LayoutChat from "@/layout/LayoutChat";
import React from "react";
import {
  HiInformationCircle,
  HiLogout,
  HiMenu,
  HiOutlineSearch,
  HiOutlineSparkles,
} from "react-icons/hi";
import { AvatarImage } from "@/components/image";
import ChatBox from "@/modules/chat/ChatBox";
import avt1 from "@/assets/avt1.jpg";
import avt2 from "@/assets/avt2.jpg";
import Avatar from "@/components/image/Avatar";
import {
  BsFileEarmarkFill,
  BsFillImageFill,
  BsFillPlusCircleFill,
  BsLink45Deg,
  BsPinAngle,
} from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
export const ChatPage: React.FC = () => {
  const users = [
    { id: 1, username: "Viên Hoàng Long" },
    { id: 2, username: "ChatGPT" },
  ];
  const [showMenuChat, setShowMenuChat] = React.useState<boolean>(false);
  const handleMenuChat = () => {
    setShowMenuChat(!showMenuChat);
  };
  const [activeTabChatInfo, setActiveTabChatInfo] =
    React.useState<string>("file");
  const handleTabChatClick = (tab: string) => {
    setActiveTabChatInfo(tab);
  };
  return (
    <LayoutChat>
      <div className="bg-white dark:bg-dark1 p-0 rounded-lg lg:max-w-960 md:max-w-720 sm:max-w-540">
        <div className="mx-0 flex sm:h-[90vh] flex-wrap">
          {/* List Chatbox */}
          <div className="flex flex-col bg-light0 dark:bg-dark1 p-[10px_15px] w-full rounded-t-lg sm:hidden">
            <h5 className="text-sm mb-2">Friends</h5>
            <div className="flex flex-row gap-1">
              <div className="relative">
                <img
                  src={avt1}
                  className="h-10 w-10 object-cover border border-dark4 rounded-full"
                />
                <BsFillPlusCircleFill className="text-xs absolute bottom-0 right-1 text-mainColor" />
              </div>
              <div className="items-center flex flex-row gap-2 justify-between">
                <Avatar
                  src={avt1}
                  cln="h-10 w-10 object-cover border border-dark4"
                ></Avatar>
                <Avatar
                  src={avt2}
                  cln="h-10 w-10 object-cover border border-dark4"
                ></Avatar>
                <Avatar
                  src={avt1}
                  cln="h-10 w-10 object-cover border border-dark4"
                ></Avatar>
                <Avatar
                  src={avt2}
                  cln="h-10 w-10 object-cover border border-dark4"
                ></Avatar>
              </div>
            </div>
          </div>
          {/* List Chatbox */}
          <div className="px-0  sm:w-1/4  relative w-full overflow-hidden hidden sm:block">
            <div className="bg-[#fafafa] dark:bg-dark2 p-[10px_15px] rounded-tl-md flex justify-between items-center">
              <div className="flex justify-between items-center gap-2">
                <Avatar
                  src={avt2}
                  cln={
                    "w-[40px] h-[40px] object-cover border-none align-middle cursor-pointer"
                  }
                />
                <div className="flex flex-col custom200:hidden">
                  <span className="text-sm">Viên Hoàng Long</span>
                  <span className="text-xs">@vienlongdev</span>
                </div>
              </div>
              <HiMenu className="mt-2 text-xl  text-dark1 dark:text-light1" />
            </div>
            <div className="flex rounded-full justify-start items-center gap-2 px-2 py-1 border m-2">
              <HiOutlineSearch className="cursor-pointe dark:text-light0" />
              <input
                className="w-full rounded mr-4 outline-none dark:bg-dark1 text-xs p-1"
                type="text"
                placeholder="Search messages..."
              />
            </div>
            {/* Chat List */}
            <div className="flex flex-col overflow-y-auto bg-dark2 h-[100vh]">
              <div className="p-[10px_15px] flex align-middle transition-all duration-300 ease w-full border-y-[1px] dark:border-dark3">
                <AvatarImage
                  name={"tranhoanglong"}
                  size={0}
                  cln={
                    "w-[40px] h-[40px] object-cover border-none align-middle"
                  }
                />
                <div className="flex w-full justify-between">
                  <div className="ml-3 max-w-xs">
                    <span className="mt-1 text-sm dark:text-light0">
                      Trần Hoàng Long
                    </span>
                    <p className="m-0 text-dark1 dark:text-light1 text-xs break-words truncate">
                      Hello 🚀
                    </p>
                  </div>
                  <span className="text-[10px] text-mainColor font-bold mt-[6px]">
                    11:00
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Chatcontent */}
          <div
            className={`${
              showMenuChat ? "sm:w-2/4" : "sm:w-3/4"
            } px-0 relative w-full flex flex-col min-h-[62vh] sm:h-auto`}
          >
            <div className="bg-[#fafafa] dark:bg-dark2 p-[10px_15px] rounded-tr-md flex justify-between items-center">
              <div className="p-0 flex align-middle transition-all duration-300 ease mx-0 overflow-hidden">
                <Avatar
                  src={avt1}
                  cln={
                    "w-[40px] h-[40px] border-none align-middle object-cover"
                  }
                />
                <div className="ml-3 w-[70%] max-w-xs">
                  <span className="mt-1 text-sm text-dark1 dark:text-light1">
                    Tran Hoang Long
                  </span>
                  <p className="m-0 text-dark1 dark:text-light1 text-xs break-words truncate">
                    Viết nội dung tại đây...
                  </p>
                </div>
              </div>
              <HiInformationCircle
                className="text-2xl text-dark1 dark:text-light1 cursor-pointer"
                onClick={handleMenuChat}
              />
            </div>
            <div className="pt-4 bg-dark1 flex-grow space-y-2">
              <div className="flex flex-wrap">
                <div className="text-xs mr-auto p-2 mx-8 md:p-2 bg-dark4 rounded-tl-xl rounded-tr-xl rounded-br-xl  animate-fadeIn max-w-[60%]">
                  Hello nè
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="text-xs ml-auto p-2 mx-8 md:p-2 bg-dark4 rounded-tl-xl rounded-tr-xl rounded-bl-xl animate-fadeIn max-w-[60%]">
                  Xin chào người anh em thiện lành, xin chào người anh em thiện
                  lành, xin chào người anh em thiện lành
                </div>
              </div>
            </div>
            <div className="sticky bottom-0">
              <div className="w-full">
                <form className="bg-[#fafafa] dark:bg-dark2 dark:text-light0 flex items-center p-[10px_15px] mt-5 gap-3">
                  <ChatBox users={users}></ChatBox>
                </form>
              </div>
            </div>
          </div>
          {/* ChatMore */}
          <div
            className={`px-0 sm:w-1/4 dark:bg-dark2 rouded-r-lg w-full ${
              showMenuChat ? "block" : "hidden"
            }`}
          >
            <div className="flex items-center rouded-r-lg text-dark1 dark:text-light1 flex-col">
              <h3 className="mt-5 text-md text-dark0 dark:text-light0">
                Group chat information
              </h3>
              <div className="relative mx-auto w-[80px] h-[80px] mt-2">
                <Avatar
                  src={avt2}
                  alt="Image 1"
                  cln="h-16 w-16 rounded-full ring-2 ring-white object-cover border"
                />
                <Avatar
                  src={avt1}
                  alt="Image 2"
                  cln="h-14 w-14 rounded-full ring-2 ring-white absolute bottom-0 right-0 object-cover border"
                />
              </div>
              <div className="flex justify-between gap-4 mt-4">
                <div className="flex p-2 border-[1px] items-center flex-col rounded-lg min-w-[30%] bg-light3 dark:bg-dark2 cursor-pointer hover:text-darker hover:font-bold">
                  <BsPinAngle />
                  <span className="text-xs mt-1 font-medium">Pin</span>
                </div>
                <div className="flex p-2 border-[1px] items-center flex-col rounded-lg min-w-[30%] bg-light3 dark:bg-dark2 cursor-pointer hover:text-darker hover:font-bold">
                  <HiOutlineSparkles />
                  <span className="text-xs mt-1 font-medium">Theme</span>
                </div>
                <div className="flex p-2 border-[1px] items-center flex-col rounded-lg min-w-[30%] bg-light3 dark:bg-dark2 cursor-pointer hover:text-darker hover:font-bold">
                  <HiLogout />
                  <span className="text-xs mt-1 font-medium">Leave</span>
                </div>
              </div>
              <div className="mt-5 border-t-2 w-full p-2">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-2 items-center">
                    <FaUserFriends className="text-lg" />
                    <div className="flex gap-2">
                      <span className="text-sm">Member</span>
                      <span className="text-mainColor bg-subtle p-[2px_6px] rounded-md text-xs">
                        4
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-medium">Show all</span>
                </div>
                <div className="flex flex-col mt-3 gap-2">
                  <div className="flex gap-2">
                    <Avatar
                      src={avt2}
                      cln="h-10 w-10 object-cover border border-dark4"
                    ></Avatar>
                    <div>
                      <span className="text-sm">Viên Hoàng Long</span>
                      <p className="text-xs">Quản trị viên</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Avatar
                      src={avt1}
                      cln="h-10 w-10 object-cover border border-dark4"
                    ></Avatar>
                    <div>
                      <span className="text-sm">Trần Hoàng Long</span>
                      <p className="text-xs">Thành viên</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Avatar
                      src={avt1}
                      cln="h-10 w-10 object-cover border border-dark4"
                    ></Avatar>
                    <div>
                      <span className="text-sm">Trần Hoàng Long</span>
                      <p className="text-xs">Thành viên</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mt-1">
                <ul className="flex gap-2 justify-center">
                  <li
                    className={`block p-1 text-sm font-medium text-center border min-w-[30%] rounded-lg cursor-pointer hover:font-bold ${
                      activeTabChatInfo === "file"
                        ? "bg-mainColor text-light1"
                        : ""
                    }`}
                    onClick={() => handleTabChatClick("file")}
                  >
                    File
                  </li>
                  <li
                    className={`block p-1 text-sm font-medium text-center border min-w-[30%] rounded-lg cursor-pointer hover:font-bold ${
                      activeTabChatInfo === "media"
                        ? "bg-mainColor text-light1"
                        : ""
                    }`}
                    onClick={() => handleTabChatClick("media")}
                  >
                    Media
                  </li>
                  <li
                    className={`block p-1 text-sm font-medium text-center border min-w-[30%] rounded-lg cursor-pointer hover:font-bold ${
                      activeTabChatInfo === "link"
                        ? "bg-mainColor text-light1"
                        : ""
                    }`}
                    onClick={() => handleTabChatClick("link")}
                  >
                    Link
                  </li>
                </ul>
                <div className="p-2">
                  {activeTabChatInfo === "media" && (
                    <div className="1">
                      <div className="flex gap-2 mb-1">
                        <div className="p-3 border rounded-md bg-[#fafafa] w-fit">
                          <BsFillImageFill className="text-sm text-dark3" />
                        </div>
                        <div className="">
                          <span className="text-xs">Ảnh mẫu.png</span>
                          <p className="text-[10px]">Sun 8 2023</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mb-1">
                        <div className="p-3 border rounded-md bg-[#fafafa] w-fit">
                          <BsFillImageFill className="text-sm text-dark3" />
                        </div>
                        <div className="">
                          <span className="text-xs">Ảnh mẫu.png</span>
                          <p className="text-[10px]">Sun 8 2023</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mb-1">
                        <div className="p-3 border rounded-md bg-[#fafafa] w-fit">
                          <BsFillImageFill className="text-sm text-dark3" />
                        </div>
                        <div className="">
                          <span className="text-xs">Ảnh mẫu.png</span>
                          <p className="text-[10px]">Sun 8 2023</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTabChatInfo === "file" && (
                    <div className="2">
                      <div className="flex gap-2 mb-1">
                        <div className="p-3 border rounded-md bg-[#fafafa] w-fit">
                          <BsFileEarmarkFill className="text-sm text-dark3" />
                        </div>
                        <div className="">
                          <span className="text-xs">Book1.zip</span>
                          <p className="text-[10px]">Sun 8 2023</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mb-1">
                        <div className="p-3 border rounded-md bg-[#fafafa] w-fit">
                          <BsFileEarmarkFill className="text-sm text-dark3" />
                        </div>
                        <div className="">
                          <span className="text-xs">Book1.zip</span>
                          <p className="text-[10px]">Sun 8 2023</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTabChatInfo === "link" && (
                    <div className="2">
                      <div className="flex gap-2 mb-1">
                        <div className="p-3 border rounded-md bg-[#fafafa] w-fit">
                          <BsLink45Deg className="text-sm text-dark3" />
                        </div>
                        <div className="">
                          <span className="text-xs">vienhoanglong.com</span>
                          <p className="text-[10px]">Sun 8 2023</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mb-1">
                        <div className="p-3 border rounded-md bg-[#fafafa] w-fit">
                          <BsLink45Deg className="text-sm text-dark3" />
                        </div>
                        <div className="">
                          <span className="text-xs">vienhoanglong.com</span>
                          <p className="text-[10px]">Sun 8 2023</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutChat>
  );
};

export default ChatPage;
