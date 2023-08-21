import Avatar from "@/components/image/Avatar";
import React from "react";
import {
  BsPinAngle,
  BsFillImageFill,
  BsFileEarmarkFill,
  BsLink45Deg,
} from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { HiOutlineSparkles, HiLogout, HiPencil } from "react-icons/hi";
import avt1 from "@/assets/avt1.jpg";
import avt2 from "@/assets/avt2.jpg";
import { colorsAvatar } from "@/constants/global";
import { Label } from "@/components/label";
interface ChatInformationProps {
  onCancel?: () => void;
}
export const ChatInformation: React.FC<ChatInformationProps> = () => {
  const [activeTabChatInfo, setActiveTabChatInfo] =
    React.useState<string>("file");
  const handleTabChatClick = (tab: string) => {
    setActiveTabChatInfo(tab);
  };

  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const [isUploadClicked, setIsUploadClicked] = React.useState<boolean>(false);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleUploadButtonClick = () => {
    setIsUploadClicked(true);
  };
  return (
    <div
      className={`px-4 w-auto md:w-[500px] h-auto overflow-y-auto left-0 mr-5 bg-dark1 sm:h-auto`}
    >
      <div className="flex rounded-r-lg text-dark1 dark:text-light1 flex-col">
        <div className="mt-5 flex text-dark0 dark:text-light0">
          <h3 className="text-md flex-1 text-center">Group chat information</h3>
        </div>
        <div className="w-24 h-24 relative mx-auto my-4">
      <img
        src={selectedImage || avt1}
        className="w-full rounded-xl max-w-full max-h-full object-cover ring-2 ring-white"
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
        <div className={`overflow-hidden transition-all duration-300 ${
              isCollapsed ? 'h-0' : 'h-auto' }`}>
            <div className="grid justify-items-center">
              <Label
                htmlFor="title"
                className="block mb-1 text-xs font-semibold"
              >
                Choose theme
              </Label>
              <div className="flex flex-wrap max-w-[175px] gap-1 w-auto ">
                  <div className={`w-10 h-10 rounded-lg  cursor-pointer bg-gradient-to-r from-blue-200 to-cyan-200`}
                  />
                  <div className={`w-10 h-10 rounded-lg  cursor-pointer bg-gradient-to-r from-violet-200 to-pink-200`}
                  />
                  <div className={`w-10 h-10 rounded-lg  cursor-pointer bg-gradient-to-r from-neutral-300 to-stone-400`}
                  />
                  <div className={`w-10 h-10 rounded-lg  cursor-pointer bg-gradient-to-r from-blue-200 to-cyan-200`}
                  />
                  <div className={`w-10 h-10 rounded-lg  cursor-pointer bg-gradient-to-r from-teal-200 to-teal-500`}
                  />
                  <div className={`w-10 h-10 rounded-lg  cursor-pointer bg-gradient-to-r from-teal-400 to-yellow-200`}
                  />
                  <div className={`w-10 h-10 rounded-lg  cursor-pointer bg-gradient-to-r from-fuchsia-500 to-pink-500`}
                  />
                  <div className={`w-10 h-10 rounded-lg  cursor-pointer bg-gradient-to-r from-slate-900 to-slate-700`}
                  />
              </div>
            </div>
         </div>
        <div className="flex justify-between gap-4 mt-4">
          <div className="flex p-2 border-[1px] items-center flex-col rounded-lg min-w-[30%] bg-light3 dark:bg-dark2 cursor-pointer hover:text-darker hover:font-bold">
            <BsPinAngle />
            <span className="text-xs mt-1 font-medium">Pin</span>
          </div>
          <div className="flex p-2 border-[1px] items-center flex-col rounded-lg min-w-[30%] bg-light3 dark:bg-dark2 cursor-pointer hover:text-darker hover:font-bold" onClick={toggleCollapse}>
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
                activeTabChatInfo === "file" ? "bg-mainColor text-light1" : ""
              }`}
              onClick={() => handleTabChatClick("file")}
            >
              File
            </li>
            <li
              className={`block p-1 text-sm font-medium text-center border min-w-[30%] rounded-lg cursor-pointer hover:font-bold ${
                activeTabChatInfo === "media" ? "bg-mainColor text-light1" : ""
              }`}
              onClick={() => handleTabChatClick("media")}
            >
              Media
            </li>
            <li
              className={`block p-1 text-sm font-medium text-center border min-w-[30%] rounded-lg cursor-pointer hover:font-bold ${
                activeTabChatInfo === "link" ? "bg-mainColor text-light1" : ""
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
  );
};

export default ChatInformation;
