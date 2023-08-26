import { IMessageRequest } from "@/interface/message";
import { createMessage, createMessageFile } from "@/services/messageService";
import { useMessageStore } from "@/store/messageStore";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import React, { useState, ChangeEvent } from "react";
import { FaPaperPlane } from "react-icons/fa";
import {
  HiOutlinePaperClip,
  HiOutlineEmojiHappy,
  HiX,
} from "react-icons/hi";


interface Mention {
  id: number;
  username: string;
}

interface ChatBoxProps {
  users: Mention[];
  chatId: string;
  sender: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ users, chatId, sender }) => {
  const { messages, setMessages } = useMessageStore();
  const [inputText, setInputText] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Mention[]>([]);
  const [showEmoji, setShowEmoji] = React.useState<boolean>(false);
  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const [showAttachment, setShowAttachment] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Add emoji
  const addEmoji = (e: { unified: string }): void => {
    const sym: string[] = e.unified.split("_");
    const codeArray: number[] = [];
    sym.forEach((el: string) => codeArray.push(parseInt("0x" + el, 16)));
    const emoji: string = String.fromCodePoint(...codeArray);
    setInputText(inputText + emoji);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length > 0 && value[value.length - 1] === "@") {
      setShowSuggestions(true);
      setFilteredSuggestions(users);
    } else {
      setShowSuggestions(false);
    }
    setInputText(value);
  };

  const handleSuggestionClick = (mention: Mention) => {
    setInputText((prevInputText) => `${prevInputText}${mention.username} `);
    setShowSuggestions(false);
  };

  const handleSubmitMessage = async () => {
    if(selectedFile){
      const payload: IMessageRequest = {
        contentMessage: inputText,
        senderId: sender,
        conversationId: chatId,
      };
      const response = await createMessageFile(payload, selectedFile)
      if (response) {
        setMessages([...messages, response]);
      }
      setInputText("");
      setShowSuggestions(false);
      setShowEmoji(false);
      setShowAttachment(false);
    }
    if (inputText.trim() !== "") {
      const payload: IMessageRequest = {
        contentMessage: inputText,
        senderId: sender,
        conversationId: chatId,
      };
      const response = await createMessage(payload);
      if (response) {
        setMessages([...messages, response]);
        console.log(messages);
      }
      setInputText("");
      setShowSuggestions(false);
      setShowEmoji(false);
    }
  };
  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmitMessage();
    }
  };
  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith("image/")) {
        setAttachmentName(null);
        setShowAttachment(true);
      } else {
        setAttachmentName(file.name);
        setShowAttachment(true);
      }
    }
  };
  const resetFileInput = () => {
    if (fileInputRef.current && fileInputRef.current.value) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <div className="flex items-center p-3 gap-3 relative">
      {showAttachment && (
        <div className="w-fit absolute -top-12 left-0 rounded-sm m-1">
          <HiX
            className="absolute right-0 top-0 cursor-pointer text-base text-white hover:text-red-500"
            onClick={() => {
              setSelectedFile(null);
              setAttachmentName(null);
              setShowAttachment(false);
            }}
          />
          {attachmentName ? (
            <div className="p-[14px] gap-1 flex flex-row bg-slate-300 items-center rounded-sm">
              <HiOutlinePaperClip />
              <span>{attachmentName}</span>
            </div>
          ) : (
            selectedFile && (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Attached"
                className="h-10 w-auto object-cover"
              />
            )
          )}
        </div>
      )}

      <HiOutlinePaperClip
        className="text-xl cursor-pointer hover:text-mainColor"
        onClick={() => fileInputRef.current?.click()}
      />
      <input
        type="file"
        accept="*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={(event) => {
          handleFileSelection(event);
          resetFileInput();
        }}
      />
      <input
        className="p-[4px_10px] border rounded-full overflow-wrap w-full border-[#dee2e6] dark:bg-dark0 text-sm outline-none"
        type="text"
        value={inputText}
        placeholder="Nhập @, nhắn tin tới Trần Hoàng Long"
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      {showEmoji && (
        <div className="absolute bottom-[100%] right-2 ">
          <Picker
            data={data}
            emojiSize={20}
            emojiButtonSize={28}
            maxFrequentRows={0}
            onEmojiSelect={addEmoji}
          />
        </div>
      )}
      {showSuggestions && (
        <div className="absolute left-4 bottom-16 bg-slate-300 p-2 rounded-md">
          {filteredSuggestions.map((mention) => (
            <div
              key={mention.id}
              className="suggestion cursor-pointer hover:text-primary"
              onClick={() => handleSuggestionClick(mention)}
            >
              @{mention.username}
            </div>
          ))}
        </div>
      )}
      <span
        className="text-xl cursor-pointer"
        onClick={() => setShowEmoji(!showEmoji)}
      >
        <HiOutlineEmojiHappy className="hover:text-mainColor" />
      </span>
      <FaPaperPlane
        className={`text-xl cursor-pointer ${
          inputText || selectedFile ? 'text-mainColor' : ''
        }`}
        onClick={handleSubmitMessage}
      />
    </div>
  );
};

export default ChatBox;
