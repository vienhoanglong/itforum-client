import { AvatarImage } from "@/components/image";
import Avatar from "@/components/image/Avatar";
import React, { useEffect } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { colorsAvatar } from "@/constants/global";
import { useConversationStore } from "@/store/conversationStore";
import { getListConversationsByUser } from "@/services/conversationService";
import Modal from "@/components/modal/Modal";
import CreateNewConversation from "./CreateNewConversation";
import { IConversation } from "@/interface/conversation";

export const ListChat: React.FC = () => {
  const { user } = useUserStore();
  const { conversations, setConversations, setSelectedChatId } =
    useConversationStore();
  const [showCreateNewConversation, setShowCreateNewConversation] =
    React.useState<boolean>(false);
  const handleCloseModalNewConversation = () => {
    setShowCreateNewConversation(false);
  };
  const handleShowModalNewConversation = () => {
    setShowCreateNewConversation(true);
  };
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        if (user?._id) {
          const response = await getListConversationsByUser(user?._id);
          setConversations(response);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchConversations();
  }, [setConversations, user?._id]);

  const getColorAvatar = user
    ? colorsAvatar.find((item) => item.color === user.color)
    : null;
  const colorAvatar = getColorAvatar ? getColorAvatar.value : "";
  const handleShowConversation = (chatId: string) => {
    setSelectedChatId(chatId);
  };
  const handleConversationUpdated = (conversation: IConversation) => {
    setConversations([...conversations, conversation]);
  };
  return (
    <div className="px-0 relative w-full lg:w-1/4 sm:block mb-3 dark:bg-dark2 rounded-tl-lg">
      <div className="dark:bg-dark2 p-3 rounded-tl-md flex justify-between items-center">
        <div className="flex justify-between items-center gap-2">
          <Avatar
            src={user?.avatar ?? ""}
            cln={`w-[40px] h-[40px] object-cover border-none align-middle cursor-pointer ${colorAvatar}`}
          />
          <div className="flex flex-col dark:text-white">
            <span className="text-sm">{user?.fullName ?? user?.username}</span>
            <span className="text-xs">@{user?.email?.split("@")[0]}</span>
          </div>
        </div>
        <div className="bg-light0 cursor-pointer dark:bg-dark1 p-[6px] rounded-full text-dark1 dark:text-light1">
          <BiAddToQueue
            className="text-xl hover:text-mainColor"
            onClick={handleShowModalNewConversation}
          />
        </div>
      </div>
      <div className="mx-2 rounded-lg">
        <form
          className="flex items-center  p-4  h-10 w-full rounded-lg text-dark1 dark:bg-dark1 dark:text-white"
          autoComplete="off"
        >
          <div className="flex">
            <label htmlFor="q" className="">
              <BsSearch className="text-dark1 dark:text-light1 text-base" />
            </label>
            <input
              id="q"
              className="ml-4 h-full min-w-full pt-0 text-xs bg-transparent outline-none"
              placeholder="Begin your search..."
            />
          </div>
        </form>
      </div>
      {/* Chat List */}
      <div className="flex flex-col dark:bg-dark2 p-2 gap-2">
        <div className="font-semibold text-sm">Recent</div>
        <div className="h-[70vh] no-scrollbar min-w-full overflow-y-scroll">
          {conversations.length > 0 &&
            conversations.map((e) => (
              <Link
                key={e._id}
                className="p-3 w-full mb-3 flex align-middle transition-all duration-300 ease  dark:text-light0 focus:bg-blue-100 rounded-md hover:bg-blue-100 hover:outline-mainColor dark:focus:bg-darker"
                to={`/chat/${e._id}`}
                onClick={() => handleShowConversation(e._id)}
              >
                {e?.imgConversation ? (
                  <Avatar
                    src={e?.imgConversation ?? ""}
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
                <div className="flex w-full justify-between">
                  <div className="ml-3 max-w-xs text-darker">
                    <span className="mt-1 text-sm dark:text-light0">
                      {e.nameConversation}
                    </span>
                    <p className="m-0 text-dark3 dark:text-light1 text-xs break-words truncate">
                      {e.descConversation}
                    </p>
                  </div>
                  <span className="text-[10px] text-mainColor font-bold mt-1">
                    11:00
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </div>
      <Modal
        isOpen={showCreateNewConversation}
        onClose={handleCloseModalNewConversation}
      >
        <CreateNewConversation
          onCloseModal={handleCloseModalNewConversation}
          userId={user?._id ?? ""}
          onSuccess={(data: IConversation) => handleConversationUpdated(data)}
        />
      </Modal>
    </div>
  );
};

export default ListChat;
