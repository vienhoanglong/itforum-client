import { AvatarImage } from "@/components/image";
import Avatar from "@/components/image/Avatar";
import React from "react";
import { BiAddToQueue } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import avt2 from "@/assets/avt2.jpg";
interface ListChatProps {
  onDataChat: (data: boolean) => void;
}
export const ListChat: React.FC<ListChatProps> = ({ onDataChat }) => {
  const [showConversationChat, setShowConversationChat] =
    React.useState<boolean>(false);
  const handleShowConversation = () => {
    setShowConversationChat(true);
  };
  React.useEffect(() => {
    onDataChat(showConversationChat);
  }, [onDataChat, showConversationChat]);
  return (
    <div className="px-0 relative w-full lg:w-1/4 sm:block mb-3 dark:bg-dark2 rounded-tl-lg">
      <div className="dark:bg-dark2 p-3 rounded-tl-md flex justify-between items-center">
        <div className="flex justify-between items-center gap-2">
          <Avatar
            src={avt2}
            cln={
              "w-[40px] h-[40px] object-cover border-none align-middle cursor-pointer"
            }
          />
          <div className="flex flex-col">
            <span className="text-sm">Viên Hoàng Long</span>
            <span className="text-xs">@vienlongdev</span>
          </div>
        </div>
        <div className="bg-light0 cursor-pointer dark:bg-dark1 p-[6px] rounded-full text-dark1 dark:text-light1">
          <BiAddToQueue className="text-xl hover:text-mainColor" />
        </div>
      </div>
      <div className="mx-2 rounded-lg">
        <form
          className="flex items-center  p-4  h-10 w-full rounded-lg text-dark1 dark:bg-dark1"
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
          <Link
            className="p-3 w-full mb-3 flex align-middle transition-all duration-300 ease  dark:text-light0 focus:bg-blue-100 rounded-md hover:bg-blue-100 hover:outline-mainColor dark:focus:bg-darker"
            to={""}
            onClick={handleShowConversation}
          >
            <AvatarImage
              name={"tranhoanglong"}
              size={0}
              cln={"w-[40px] h-[40px] object-cover border-none align-middle"}
            />
            <div className="flex w-full justify-between">
              <div className="ml-3 max-w-xs">
                <span className="mt-1 text-sm dark:text-light0">
                  Trần Hoàng Long
                </span>
                <p className="m-0 text-dark3 dark:text-light1 text-xs break-words truncate">
                  Khi nào nộp dự án
                </p>
              </div>
              <span className="text-[10px] text-mainColor font-bold mt-1">
                11:00
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListChat;
