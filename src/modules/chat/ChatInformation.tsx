import Avatar from "@/components/image/Avatar";
import React from "react";
import {
  BsFillImageFill,
  BsFileEarmarkFill,
  BsLink45Deg,
} from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { HiOutlineSparkles, HiLogout, HiPencil } from "react-icons/hi";
import avt2 from "@/assets/avt2.jpg";
import { colorThemeChat } from "@/constants/global";
import { Label } from "@/components/label";
import { IConversation } from "@/interface/conversation";
import {
  updateConversationChat,
  updateImageConversation,
} from "@/services/conversationService";
import { useConversationStore } from "@/store/conversationStore";
import { HiPencilSquare } from "react-icons/hi2";
import { MdTitle, MdOutlineDescription } from "react-icons/md";
import { Button } from "@/components/button";
import { setColorBackgroundUser } from "@/utils/helper";
import socket from "@/utils/getSocketIo";
import { useTranslation } from "react-i18next";
interface ChatInformationProps {
  onCancel?: () => void;
  userId: string;
  chatId: string;
  conversation: IConversation[];
}
export const ChatInformation: React.FC<ChatInformationProps> = ({
  userId,
  chatId,
  conversation,
}) => {
  const { t } = useTranslation();
  const { updateConversation, members } = useConversationStore();
  const [conversationUpdate, setConversationUpdate] =
    React.useState<IConversation | null>(null);
  const [desc, setDesc] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [inputEmpty, setInputEmpty] = React.useState(false);
  const [activeTabChatInfo, setActiveTabChatInfo] =
    React.useState<string>("file");
  const handleTabChatClick = (tab: string) => {
    setActiveTabChatInfo(tab);
  };

  const [isCollapsedTheme, setIsCollapsedTheme] = React.useState<boolean>(true);
  const toggleCollapseTheme = () => {
    setIsCollapsedTheme(!isCollapsedTheme);
  };
  const [isCollapsedEdit, setIsCollapsedEdit] = React.useState<boolean>(true);
  const toggleCollapseEdit = () => {
    setIsCollapsedEdit(!isCollapsedEdit);
  };

  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [colorTheme, setColorTheme] = React.useState<string>();
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      const response = await updateImageConversation(chatId, userId, file);
      return setConversationUpdate(response);
    }
  };

  React.useEffect(() => {
    if (conversationUpdate) {
      updateConversation(conversationUpdate);
    }
  }, [conversationUpdate, updateConversation]);

  React.useEffect(() => {
    const data = conversation.find((e) => e._id === chatId);
    if (data) {
      setColorTheme(data.theme);
    } else {
      setColorTheme("");
    }
  }, [conversation, chatId]);
  const handleChangeTheme = async (theme: string) => {
    setColorTheme(theme);
    //goi api change theme conversation
    const response = await updateConversationChat(chatId, userId, {
      theme: theme,
    });
    return setConversationUpdate(response);
  };
  React.useEffect(() => {
    socket.on("conversationUpdated", (updated) => {
      console.log("conversationUpdated", updated);
      if (updated._id === chatId) {
        updateConversation(updated);
      }
    });
    socket.on("conversationUpdatedImage", (updated) => {
      console.log("conversationUpdatedImage", updated);
      if (updated._id === chatId) {
        updateConversation(updated);
      }
    });
  }, [chatId, updateConversation]);
  const handleEditConversation = async () => {
    try {
      if (!desc && !name) {
        setInputEmpty(true);
        return;
      }
      const payload: { [x: string]: string } = {};
      if (name) {
        payload.nameConversation = name;
      }
      if (desc) {
        payload.descConversation = desc;
      }
      const response = await updateConversationChat(chatId, userId, payload);
      response && setIsCollapsedEdit(true);
      return setConversationUpdate(response);
    } catch (error) {
      console.log("Error message:");
    }
  };
  return (
    <div
      className={`px-4 w-auto md:w-[500px] h-auto overflow-y-auto left-0 mr-5 bg-transparent sm:h-auto`}
    >
      {conversation &&
        conversation.map(
          (e) =>
            e._id === chatId && (
              <div
                key={e._id}
                className="flex rounded-r-lg text-dark1 dark:text-light1 flex-col"
              >
                <div className="mt-5 flex text-dark0 dark:text-light0">
                  <h3 className="text-md flex-1 text-center">
                    {e.nameConversation || `Group chat information`}
                  </h3>
                </div>
                <div className="w-24 h-24 relative mx-auto my-4">
                  <img
                    src={selectedImage || e.imgConversation}
                    className="w-full h-full rounded-xl max-w-full max-h-full object-cover ring-2 ring-white"
                    loading="lazy"
                    alt="Profile"
                  />
                  <label className="grid space-x-1 items-center absolute bottom-1 right-1 bg-lighter hover:bg-mainColor text-white px-2 py-2 rounded-full cursor-pointer">
                    <HiPencil className="hover:scale-110" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="opacity-0 h-0 w-0"
                    />
                  </label>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isCollapsedTheme ? "h-0" : "h-auto"
                  }`}
                >
                  <div className="grid justify-items-center">
                    <Label
                      htmlFor="title"
                      className="block mb-1 text-xs font-semibold"
                    >
                      {t("chooseTheme")}
                    </Label>
                    <div className="flex flex-wrap max-w-[175px] gap-1 w-auto ">
                      {colorThemeChat.map((them, index) => (
                        <div
                          key={index}
                          className={`w-10 h-10 rounded-lg  cursor-pointer ${
                            colorTheme === them.color
                              ? "border-4 border-blue-800"
                              : ""
                          } ${them.backgroundColor}`}
                          onClick={() => handleChangeTheme(them.color)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isCollapsedEdit ? "h-0" : "h-auto"
                  }`}
                >
                  <div className="justify-items-center">
                    <label
                      htmlFor="input-group-1"
                      className="block mb-1 text-xs font-semibold dark:text-white"
                    >
                      {t("nameGroupChat")}
                    </label>
                    <div className="relative mb-2">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <MdTitle />
                      </div>
                      <input
                        type="text"
                        id="input-group-1"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={e.nameConversation}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <label
                      htmlFor="input-group-2"
                      className="block mb-1 text-xs font-semibold dark:text-white"
                    >
                      {t("descGroupChat")}
                    </label>
                    <div className="relative mb-2">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <MdOutlineDescription />
                      </div>
                      <input
                        type="text"
                        id="input-group-2"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={e.descConversation}
                        onChange={(e) => setDesc(e.target.value)}
                      />
                    </div>
                    {inputEmpty && (
                      <div className="text-xs text-right mt-2 text-red-500">
                        {t("pleasInputChangeInfo")}
                      </div>
                    )}
                    <div className="flex flex-row gap-2 justify-end mb-6">
                      <Button
                        kind="custom"
                        type="submit"
                        size="small"
                        className="text-xs bg-dark4 rounded-lg"
                        handle={() => toggleCollapseEdit()}
                      >
                        {t("cancel")}
                      </Button>
                      <Button
                        kind="secondary"
                        type="submit"
                        size="small"
                        className="text-xs rounded-lg"
                        handle={handleEditConversation}
                      >
                        {t("save")}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between gap-4 mt-4">
                  <div
                    className="flex p-2 border-[1px] items-center flex-col rounded-lg min-w-[30%] bg-light3 dark:bg-dark2 cursor-pointer hover:text-darker hover:font-bold"
                    onClick={toggleCollapseEdit}
                  >
                    <HiPencilSquare />
                    <span className="text-xs mt-1 font-medium">
                      {t("edit")}
                    </span>
                  </div>
                  <div
                    className="flex p-2 border-[1px] items-center flex-col rounded-lg min-w-[30%] bg-light3 dark:bg-dark2 cursor-pointer hover:text-darker hover:font-bold"
                    onClick={toggleCollapseTheme}
                  >
                    <HiOutlineSparkles />
                    <span className="text-xs mt-1 font-medium">
                      {t("theme")}
                    </span>
                  </div>
                  <div className="flex p-2 border-[1px] items-center flex-col rounded-lg min-w-[30%] bg-light3 dark:bg-dark2 cursor-pointer hover:text-darker hover:font-bold">
                    <HiLogout />
                    <span className="text-xs mt-1 font-medium">
                      {t("leave")}
                    </span>
                  </div>
                </div>
                {members && (
                  <div className="mt-5 border-t-2 w-full p-2">
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row gap-2 items-center">
                        <FaUserFriends className="text-lg" />
                        <div className="flex gap-2">
                          <span className="text-sm">{t("member")}</span>
                          <span className="text-mainColor bg-subtle p-[2px_6px] rounded-md text-xs">
                            {members.length}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mt-3 gap-2">
                      {members.map((member) => (
                        <div className="flex gap-2" key={member._id}>
                          <Avatar
                            src={member.avatar || avt2}
                            cln={`h-10 w-10 object-cover border border-dark4 ${setColorBackgroundUser(
                              member.color ?? ""
                            )}`}
                          ></Avatar>
                          <div>
                            <span className="text-sm">
                              {member.fullName ?? member.username}
                            </span>
                            {member._id === userId ? (
                              <p className="text-xs">{t("admin")}</p>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
                      {t("file")}
                    </li>
                    <li
                      className={`block p-1 text-sm font-medium text-center border min-w-[30%] rounded-lg cursor-pointer hover:font-bold ${
                        activeTabChatInfo === "media"
                          ? "bg-mainColor text-light1"
                          : ""
                      }`}
                      onClick={() => handleTabChatClick("media")}
                    >
                      {t("media")}
                    </li>
                    <li
                      className={`block p-1 text-sm font-medium text-center border min-w-[30%] rounded-lg cursor-pointer hover:font-bold ${
                        activeTabChatInfo === "link"
                          ? "bg-mainColor text-light1"
                          : ""
                      }`}
                      onClick={() => handleTabChatClick("link")}
                    >
                      {t("link")}
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
            )
        )}
    </div>
  );
};

export default ChatInformation;
