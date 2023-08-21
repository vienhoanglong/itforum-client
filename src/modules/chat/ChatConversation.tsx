import Avatar from "@/components/image/Avatar";
import React, { Fragment, useState } from "react";
import { HiArrowNarrowLeft, HiInformationCircle } from "react-icons/hi";
import ChatBox from "./ChatBox";
import avt1 from "@/assets/avt1.jpg";
import { Link } from "react-router-dom";
import Modal from "@/components/modal/Modal";
import ChatInformation from "./ChatInformation";
import { useMessageStore } from "@/store/messageStore";
import { useUserStore } from "@/store/userStore";
import { useConversationStore } from "@/store/conversationStore";
import { AvatarImage } from "@/components/image";
import { formatTimeAuto, setColorBackgroundUser } from "@/utils/helper";

interface MessageItemProps {
  content: string;
  isCurrentUser: boolean;
  sender?: string;
  time: string;
  image: string;
  color: string;
}

const MessageItem: React.FC<MessageItemProps> = ({
  content,
  sender,
  time,
  isCurrentUser,
  image,
  color,
}) => {
  return (
    <div
      className={`flex flex-wrap flex-col mx-8 self-end my-5 ${
        isCurrentUser ? "justify-end" : ""
      }`}
    >
      <div
        className={`text-xs flex gap-2 ${
          isCurrentUser
            ? "ml-auto p-2 md:p-2 rounded-tr-xl rounded-bl-xl"
            : "mr-auto p-2 rounded-tr-xl rounded-br-xl"
        } bg-dark4 rounded-tl-xl animate-fadeIn max-w-[60%]`}
      >
        {!isCurrentUser && (
          <Avatar
            cln={`w-6 h-6 object-cover border-none align-middle mx-1 ${setColorBackgroundUser(
              color
            )}`}
            src={image}
          />
        )}
        <p className="cursor-pointer">{content}</p>
        {isCurrentUser && (
          <Avatar
            cln={`w-6 h-6 object-cover border-none align-middle mx-1 ${setColorBackgroundUser(
              color
            )}`}
            src={image}
          />
        )}
      </div>
      <div
        className={`m-1 flex flex-row gap-1 ${
          isCurrentUser ? "justify-end" : ""
        }`}
      >
        <span className="text-[10px]">{formatTimeAuto(time)}</span>
      </div>

      {/* ... Additional components for emojis, etc. ... */}
    </div>
  );
};

interface ChatConversationProps {
  showConversation: boolean;
  chatId: string | null;
}
export const ChatConversation: React.FC<ChatConversationProps> = ({
  showConversation,
  chatId,
}) => {
  const { messages, fetchMessages } = useMessageStore();
  const { conversations, members } = useConversationStore();
  const { user } = useUserStore();
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  React.useEffect(() => {
    const fetchInitialMessages = () => {
      if (showConversation && chatId) {
        fetchMessages(chatId);
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }
    };

    fetchInitialMessages();
  }, [showConversation, chatId, fetchMessages]);
  const users = [
    { id: 1, username: "Viên Hoàng Long" },
    { id: 2, username: "ChatGPT" },
  ];
  const [showModalInformation, setShowModalInformation] =
    useState<boolean>(false);
  const handleCloseModalInformation = () => {
    setShowModalInformation(false);
  };
  const handleShowModalInformation = () => {
    setShowModalInformation(true);
  };

  return (
    <>
      {showConversation ? (
        <div
          className={`sm:w-3/4
          mr-5 md:mr-0 fixed lg:static md:flex md:flex-col px-0 w-[90%] h-full lg:min-h-[100vh] dark:bg-dark1 bg-white`}
        >
          <div className="bg-[#fafafa] dark:bg-dark2 p-3 rounded-tr-md flex justify-between items-center">
            <div className="p-0 flex align-middle transition-all duration-300 ease mx-0 overflow-hidden">
              {showConversation && (
                <Link
                  className="align-middle self-center mr-3 md:hidden"
                  to={""}
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Chats"
                >
                  <HiArrowNarrowLeft className="text-base dark:text-light1 cursor-pointer hover:text-darker" />
                </Link>
              )}
              {conversations.map(
                (conversation) =>
                  conversation._id === chatId && (
                    <Fragment key={conversation._id}>
                      {conversation?.imgConversation ? (
                        <Avatar
                          src={conversation?.imgConversation ?? ""}
                          cln={`w-[40px] h-[40px] object-cover border-none align-middle cursor-pointer`}
                        />
                      ) : (
                        <AvatarImage
                          name={"group"}
                          size={0}
                          cln={
                            "w-[40px] h-[40px] object-cover border-none align-middle"
                          }
                        />
                      )}
                      <div className="ml-3 w-[70%] max-w-xs">
                        <span className="mt-1 text-sm text-dark1 dark:text-light1">
                          {conversation.nameConversation ?? "New Group Chat"}
                        </span>
                        <span className="mt-1 text-sm text-dark1 dark:text-light1"></span>
                        <p className="m-0 text-dark1 dark:text-light1 text-xs break-words truncate">
                          {conversation.descConversation ??
                            "Description group chat"}
                        </p>
                      </div>
                    </Fragment>
                  )
              )}
            </div>
            <HiInformationCircle
              className="text-2xl text-dark1 dark:text-light1 cursor-pointer"
              onClick={handleShowModalInformation}
            />
          </div>
          <div
            className="pt-4 dark:bg-dark1 flex-grow flex-col-reverse h-[58vh] lg:h-[400px] overflow-y-scroll no-scrollbar"
            ref={containerRef}
          >
            {messages.length > 0 ? (
              messages.map((message) =>
                members
                  .filter((member) => member._id === message.senderId)
                  .map((e) => (
                    <MessageItem
                      key={message._id}
                      content={message.contentMessage}
                      isCurrentUser={message.senderId === user?._id}
                      sender={e?.fullName ?? e?.username}
                      time={message.createdAt.toString()}
                      image={e.avatar ?? avt1}
                      color={e.color ?? ""}
                    />
                  ))
              )
            ) : (
              <div className="flex items-center justify-center text-base h-full dark:text-white mt-10">
               Chưa có nội dung cuộc trò chuyện...
              </div>
            )}
          </div>
          <div className="sticky bottom-0 dark:bg-dark2 bg-light1">
            <div className="flex items-center p-3 gap-3 sticky">
              <ChatBox
                users={users}
                chatId={chatId ?? ""}
                sender={user?._id ?? ""}
              ></ChatBox>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-xl m-auto dark:text-white"> 
          Hãy chọn một đoạn chat hoặc bắt đầu cuộc trò chuyện mới
        </div>
      )}
      <Modal
        isOpen={showModalInformation}
        onClose={handleCloseModalInformation}
      >
        <ChatInformation onCancel={handleCloseModalInformation} />
      </Modal>
    </>
  );
};

export default ChatConversation;
