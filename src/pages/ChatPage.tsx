import LayoutChat from "@/layout/LayoutChat";
import React, { useEffect } from "react";
import { Tooltip } from "react-tooltip";
import ListChat from "@/modules/chat/ListChat";
import ChatConversation from "@/modules/chat/ChatConversation";
import { useConversationStore } from "@/store/conversationStore";
import { useParams } from "react-router-dom";
export const ChatPage: React.FC = () => {
  const { selectedChatId, setSelectedChatId, conversations, setMembers } = useConversationStore();
  const { id } = useParams();
  useEffect(() => {
    id && setSelectedChatId(id);
    const members = conversations.find(conversation =>(conversation._id === id))?.members 
    setMembers(members??[]);
  }, [conversations, id, setMembers, setSelectedChatId]);
  return (
    <LayoutChat>
    <div className="bg-white dark:bg-dark1 p-0 rounded-lg lg:max-w-960 md:max-w-720 sm:max-w-540">
      <div className="mx-0 flex flex-wrap">
        {/* List Chatbox */}
        <ListChat/>
        {/* Chatcontent */}
        <ChatConversation
          showConversation={selectedChatId !== null}
          chatId={selectedChatId}
        />
        {/* ChatMore */}
      </div>
    </div>
    <Tooltip id="tooltip" place="right" />
  </LayoutChat>
  );
};

export default ChatPage;
