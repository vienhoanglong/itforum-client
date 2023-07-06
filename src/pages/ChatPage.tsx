import LayoutChat from "@/layout/LayoutChat";
import React from "react";
import { HiInformationCircle, HiMenu, HiOutlineSearch } from "react-icons/hi";
import { AvatarImage } from "@/components/image";
import ChatBox from "@/modules/chat/ChatBox";
import avt1 from "@/assets/avt1.jpg";
import avt2 from "@/assets/avt2.jpg";
import Avatar from "@/components/image/Avatar";
import { BsFillPlusCircleFill } from "react-icons/bs";
export const ChatPage: React.FC = () => {
  const users = [
    { id: 1, username: "Viên Hoàng Long" },
    { id: 2, username: "ChatGPT" },
  ];
  const [showMenuChat, setShowMenuChat] = React.useState<boolean>(false);
  const handleMenuChat = () => {
    setShowMenuChat(!showMenuChat);
  };
  return (
    <LayoutChat>
      <div className="bg-white p-0 rounded-lg lg:max-w-960 md:max-w-720 sm:max-w-540">
        <div className="mx-0 flex sm:h-[80vh] flex-wrap">
          {/* List Chatbox */}
          <div className="flex flex-col bg-light0 p-[10px_15px] w-full rounded-t-lg sm:hidden">
            <h5 className="text-sm mb-2">Friends</h5>
            <div className="flex flex-row gap-1">
              <div className="relative">
                <img src={avt1} className="h-10 w-10 object-cover border border-dark4 rounded-full" />
                <BsFillPlusCircleFill className="text-xs absolute bottom-0 right-1 text-mainColor"/>
              </div>
              <div className="items-center flex flex-row gap-2 justify-between">
                <Avatar src={avt1} cln="h-10 w-10 object-cover border border-dark4"></Avatar>
                <Avatar src={avt2} cln="h-10 w-10 object-cover border border-dark4"></Avatar>
                <Avatar src={avt1} cln="h-10 w-10 object-cover border border-dark4"></Avatar>
                <Avatar src={avt2} cln="h-10 w-10 object-cover border border-dark4"></Avatar>
              </div>
            </div>
          </div>
          {/* List Chatbox */}
          <div className="px-0 border-solid sm:w-1/4 border-[#dee2e6] border relative w-full overflow-hidden hidden sm:block">
            <div className="bg-[#fafafa] p-[10px_15px] rounded-md flex justify-between items-center">
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
              <HiMenu className="mt-2 text-xl text-gray-500" />
            </div>
            <div className="flex rounded-full justify-start items-center gap-2 px-2 py-1 border m-2">
              <HiOutlineSearch className="cursor-pointer" />
              <input
                className="w-full rounded mr-4 outline-none text-xs p-1"
                type="text"
                placeholder="Search messages..."
              />
            </div>
            {/* Chat List */}
            <div className="flex flex-col overflow-y-auto h-[70vh]">
              <div className="p-[10px_15px] flex align-middle transition-all duration-300 ease w-full border-y-[1px]">
                <AvatarImage
                  name={"tranhoanglong"}
                  size={0}
                  cln={
                    "w-[40px] h-[40px] object-cover border-none align-middle"
                  }
                />
                <div className="flex w-full justify-between">
                  <div className="ml-3 max-w-xs">
                    <span className="mt-1 text-sm">Trần Hoàng Long</span>
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
            } px-0 relative w-full border-solid border-[#dee2e6] border flex flex-col min-h-[62vh] sm:h-auto`}
          >
            <div className="bg-[#fafafa] p-[10px_15px] rounded-md flex justify-between items-center">
              <div className="p-0 flex align-middle transition-all duration-300 ease mx-0 overflow-hidden">
                <Avatar
                  src={avt1}
                  cln={
                    "w-[40px] h-[40px] border-none align-middle object-cover"
                  }
                />
                <div className="ml-3 w-[70%] max-w-xs">
                  <span className="mt-1 text-sm">Tran Hoang Long</span>
                  <p className="m-0 text-dark1 dark:text-light1 text-xs break-words truncate">
                    Viết nội dung tại đây...
                  </p>
                </div>
              </div>
              <HiInformationCircle
                className="text-2xl cursor-pointer"
                onClick={handleMenuChat}
              />
            </div>
            <div className="pt-4 flex-grow">
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
                <form className="bg-[#fafafa] flex items-center p-[10px_15px] mt-5 gap-3">
                  <ChatBox users={users}></ChatBox>
                </form>
              </div>
            </div>
          </div>
          {/* ChatMore */}
          <div
            className={`px-0 sm:w-1/4 border-solid border-[#dee2e6] border w-full ${
              showMenuChat ? "block" : "hidden"
            }`}
          >
            <div className="flex items-center align-middle flex-col">
              <h3 className="mt-5 text-lg">Group Chat</h3>
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
            </div>
          </div>
        </div>
      </div>
    </LayoutChat>
  );
};

export default ChatPage;
