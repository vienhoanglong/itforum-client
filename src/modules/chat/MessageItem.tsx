import Avatar from "@/components/image/Avatar";
import { colorThemeChat } from "@/constants/global";
import { formatTimeAuto, setColorBackgroundUser } from "@/utils/helper";
import React from "react";
import fileIcon from 'assets/IconDocumentTopic/archive.png';
import parse from 'html-react-parser';
import { hasCodeBlock } from "@/constants/hasCodeBlock";
interface MessageItemProps {
  content: string;
  isCurrentUser: boolean;
  sender?: string;
  time: string;
  image: string;
  color: string;
  theme: string;
  typeMessage: string;
  fullName?: string;
  file?: string;
  nameFile?: string;
}

const MessageItem: React.FC<MessageItemProps> = ({
  content,
  sender,
  time,
  isCurrentUser,
  image,
  color,
  theme,
  typeMessage,
  fullName,
  file,
  nameFile,
}) => {
  const [colorBackground, setColorBackground] = React.useState<string>();
  React.useEffect(() => {
    const data = colorThemeChat.find((e) => e.color === theme)?.messageColor;
    setColorBackground(data ?? 'bg-slate-400');
  }, [theme]);
  return (
    <>
      {typeMessage === "alert" && (
        <div className="text-center text-white mx-8 my-5 text-[10px]">
          {`${fullName} ${content}`}
        </div>
      )}
      {typeMessage === "text" && (
        <div
          className={`flex flex-wrap flex-col mx-8  my-5 ${
            isCurrentUser ? "justify-end" : ""
          }`}
        >
          <div
            className={`text-xs flex items-center gap-2 ${
              isCurrentUser
                ? "ml-auto p-2 md:p-2 rounded-tr-xl rounded-bl-xl"
                : "mr-auto p-2 rounded-tr-xl rounded-br-xl"
            } ${colorBackground} rounded-tl-xl animate-fadeIn max-w-[60%] text-white`}
          >
            {!isCurrentUser && (
              <Avatar
                cln={`w-8 h-8 object-cover border-none align-middle mx-1 ${setColorBackgroundUser(
                  color
                )}`}
                src={image}
              />
            )}
            <p className="cursor-pointer text-xs">{content}</p>
            {isCurrentUser && (
              <Avatar
                cln={`w-8 h-8 object-cover border-none align-middle mx-1 ${setColorBackgroundUser(
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
            <span className="text-[10px] text-white">{formatTimeAuto(time)}</span>
          </div>

          {/* ... Additional components for emojis, etc. ... */}
        </div>
      )}
      {typeMessage === "image" && (
        <div
          className={`flex flex-wrap flex-col mx-8  my-5 ${
            isCurrentUser ? "justify-end" : ""
          }`}
        >
          <div
            className={`text-xs flex gap-2 ${
              isCurrentUser
                ? "ml-auto p-2 md:p-2 rounded-tr-xl rounded-bl-xl"
                : "mr-auto p-2 rounded-tr-xl rounded-br-xl"
            } ${colorBackground} rounded-tl-xl animate-fadeIn max-w-[60%] text-white`}
          >
            {!isCurrentUser && (
              <Avatar
                cln={`w-8 h-8 object-cover border-none align-middle mx-1 ${setColorBackgroundUser(
                  color
                )}`}
                src={image}
              />
            )}
            <div className="flex flex-col gap-1">
            <a href={file} target="_blank">
            <img src={file} alt="" className="max-w-[200px] max-h-[200px] rounded-xl object-cover brightness-95"/>
            </a>
            <p className="cursor-pointer">{content}</p>
            </div>
            {isCurrentUser && (
              <Avatar
                cln={`w-8 h-8 object-cover border-none align-middle mx-1 ${setColorBackgroundUser(
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
            <span className="text-[10px] text-white">{formatTimeAuto(time)}</span>
          </div>
        </div>
      )}
      {typeMessage === "file" && (
        <div
          className={`flex flex-wrap flex-col mx-8  my-5 ${
            isCurrentUser ? "justify-end" : ""
          }`}
        >
          <div
            className={`text-xs flex gap-2 ${
              isCurrentUser
                ? "ml-auto p-2 md:p-2 rounded-tr-xl rounded-bl-xl"
                : "mr-auto p-2 rounded-tr-xl rounded-br-xl"
            } ${colorBackground} rounded-tl-xl animate-fadeIn max-w-[60%] text-white`}
          >
            {!isCurrentUser && (
              <Avatar
                cln={`w-8 h-8 object-cover border-none align-middle mx-1 ${setColorBackgroundUser(
                  color
                )}`}
                src={image}
              />
            )}
            <div className="flex flex-col gap-1">
            <a className="flex flex-row items-center gap-1 cursor-pointer hover:bg-blue-300 p-2 rounded-xl" target="_black" download={file} href={file}>
          <img src={fileIcon} alt="" className="w-6 h-auto object-cover"/>
          <span>{nameFile}</span>
        </a>
            <p className="cursor-pointer">{content}</p>
            </div>
            {isCurrentUser && (
              <Avatar
                cln={`w-8 h-8 object-cover border-none align-middle mx-1 ${setColorBackgroundUser(
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
            <span className="text-[10px] text-white">{formatTimeAuto(time)}</span>
          </div>
        </div>
      )}
      {typeMessage === "chatgpt" && (
        <div
          className={`flex flex-wrap flex-col mx-8  my-5
          }`}
        >
          <div
            className={`text-xs flex gap-2 mr-auto p-2 rounded-tr-xl rounded-br-xl rounded-tl-xl animate-fadeIn max-w-[60%] text-white ${colorBackground}`}
          >
              <Avatar
                cln={`w-8 h-8 object-cover border-none align-middle mx-1 bg-white`}
                src={file ?? ""}
              />
            <div className="cursor-pointer ql-snow">
              <div className="ql-editor">{parse(hasCodeBlock(content) || content)}</div>
            </div>
          </div>
          <div
            className={`m-1 flex flex-row gap-1`}
          >
            <span className="text-[10px] text-white">{formatTimeAuto(time)}</span>
          </div>
        </div>
      )}
    </>
  );
};
export default MessageItem;
