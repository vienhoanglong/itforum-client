import Avatar from "@/components/image/Avatar";
import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { HiArrowNarrowLeft, HiInformationCircle } from "react-icons/hi";
import ChatBox from "./ChatBox";
import avt1 from "@/assets/avt1.jpg";
import { Link } from "react-router-dom";
import Modal from "@/components/modal/Modal";
import ChatInformation from "./ChatInformation";
interface ChatConversationProps {
  showConversation: boolean;
}
export const ChatConversation: React.FC<ChatConversationProps> = ({
  showConversation,
}) => {
  const users = [
    { id: 1, username: "Viên Hoàng Long" },
    { id: 2, username: "ChatGPT" },
  ];
  const [showModalInformation, setShowModalInformation] = useState<boolean>(false);
  const handleCloseModalInformation = () => {
    setShowModalInformation(false);
  }
  const handleShowModalInformation = () => {
    setShowModalInformation(true);
  };
  return (
    <>
      {showConversation && (
        <div
          className={`sm:w-3/4
          mr-5 md:mr-0 fixed lg:static md:flex md:flex-col px-0 w-[90%] h-full lg:min-h-[100vh] dark:bg-dark1 bg-white`}
        >
          <div className="bg-[#fafafa] dark:bg-dark2 p-3 rounded-tr-md flex justify-between items-center">
            <div className="p-0 flex align-middle transition-all duration-300 ease mx-0 overflow-hidden">
              {showConversation && <Link
                className="align-middle self-center mr-3 md:hidden"
                to={""}
                data-tooltip-id="tooltip"
                data-tooltip-content="Chats"
              >
                <HiArrowNarrowLeft className="text-base dark:text-light1 cursor-pointer hover:text-darker"/>
              </Link>}
              <Avatar
                src={avt1}
                cln={"w-[40px] h-[40px] border-none align-middle object-cover"}
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
              className="text-2xl text-dark1 dark:text-light1 cursor-pointer" onClick={handleShowModalInformation}
            />
          </div>
          <div className="pt-4 dark:bg-dark1 flex-grow space-y-2 overflow-y-auto mb-20 min-h-[48vh]">
            <div className="flex flex-wrap flex-col mx-8">
              <div className="m-1 flex flex-row gap-1 justify-end">
                <p className="text-[10px]">Vien Hoang Long</p>
                <span className="text-[10px]">11:31</span>
              </div>
              <div className="text-xs ml-auto p-2 md:p-2 bg-dark4 rounded-tl-xl rounded-tr-xl rounded-bl-xl animate-fadeIn max-w-[60%]">
                <p className="cursor-pointer">
                  Xin chào người anh em thiện lành
                </p>
              </div>
              <div className="mt-2 m-1 flex relative group justify-end">
                <BsEmojiSmile className="text-base cursor-pointer hover:dark:text-light1 mr-2 mt-1" />
                <div className="flex space-x-2">
                  <div className="p-1 text-xs outline rounded-lg">😊 2</div>
                  <div className="p-1 text-xs outline rounded-lg">❤️ 6</div>
                </div>
                <div className="absolute invisible group-hover:visible gap-2 items-center ease-in-out bg-white p-3 rounded-tl-lg rounded-tr-lg rounded-br-lg w-fit -translate-y-full -mt-1">
                  <button className="hover:scale-150">😊</button>
                  <button className="hover:scale-150">👍</button>
                  <button className="hover:scale-150">👎</button>
                  <button className="hover:scale-150">😕</button>
                  <button className="hover:scale-150">🎉</button>
                  <button className="hover:scale-150">❤️</button>
                  <button className="hover:scale-150">🚀</button>
                  <button className="hover:scale-150">👀</button>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap flex-col mx-8">
              <div className="m-1 flex flex-row gap-1">
                <p className="text-[10px]">Vien Hoang Long</p>
                <span className="text-[10px]">11:31</span>
              </div>
              <div className="text-xs mr-auto p-2 md:p-3 bg-dark4 rounded-tl-xl rounded-tr-xl rounded-br-xl animate-fadeIn max-w-[60%]">
                <p className="cursor-pointer">
                  Xin chào người anh em thiện lành
                </p>
              </div>
              <div className="mt-2 m-1 flex relative group">
                <BsEmojiSmile className="text-base cursor-pointer hover:dark:text-light1 mr-2 mt-1" />
                <div className="flex space-x-2">
                  <div className="p-1 text-xs outline rounded-lg">😊 2</div>
                  <div className="p-1 text-xs outline rounded-lg">❤️ 6</div>
                </div>
                <div className="absolute invisible group-hover:visible gap-2 items-center ease-in-out bg-white p-3 rounded-tl-lg rounded-tr-lg rounded-br-lg w-fit -translate-y-full -mt-1">
                  <button className="hover:scale-150">😊</button>
                  <button className="hover:scale-150">👍</button>
                  <button className="hover:scale-150">👎</button>
                  <button className="hover:scale-150">😕</button>
                  <button className="hover:scale-150">🎉</button>
                  <button className="hover:scale-150">❤️</button>
                  <button className="hover:scale-150">🚀</button>
                  <button className="hover:scale-150">👀</button>
                </div>
              </div>
            </div>
          </div>
          <div className="sticky bottom-0 dark:bg-dark2 bg-light1">
            <form className="flex items-center p-3 gap-3 sticky">
              <ChatBox users={users}></ChatBox>
            </form>
          </div>
        </div>
      )}
      <Modal isOpen={showModalInformation} onClose={handleCloseModalInformation}>
        <ChatInformation onCancel={handleCloseModalInformation}/>
      </Modal>
    </>
  );
};

export default ChatConversation;
