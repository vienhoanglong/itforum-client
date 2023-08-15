import LayoutChat from "@/layout/LayoutChat";
import React from "react";
import { Tooltip } from "react-tooltip";
import ListChat from "@/modules/chat/ListChat";
import ChatConversation from "@/modules/chat/ChatConversation";
export const ChatPage: React.FC = () => {
  const [showConversation, setShowConversation] =
    React.useState<boolean>(false);
  const handleConversationChat = (show: boolean) => {
    setShowConversation(show);
  };
  return (
    <LayoutChat>
      <div className="bg-white dark:bg-dark1 p-0 rounded-lg lg:max-w-960 md:max-w-720 sm:max-w-540">
        <div className="mx-0 flex flex-wrap">
          {/* List Chatbox */}
          <ListChat onDataChat={handleConversationChat} />
          {/* Chatcontent */}
          <ChatConversation
            showConversation={showConversation}
          ></ChatConversation>
          {/* ChatMore */}
        </div>
      </div>
      <Tooltip id="tooltip" place="right" />
    </LayoutChat>
  );
};

export default ChatPage;
