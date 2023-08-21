import { IMessageRequest } from "@/interface/message";
import { createMessage } from "@/services/messageService";
import { useConversationStore } from "@/store/conversationStore";
import { useMessageStore } from "@/store/messageStore";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import React, { useState, ChangeEvent } from "react";
import {
  HiOutlinePaperClip,
  HiOutlineEmojiHappy,
  HiPaperAirplane,
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
    setInputText(value);

    if (value.length > 0 && value[value.length - 1] === "@") {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }

    // Filter suggestions based on input
    const filtered = users.filter((mention) =>
      mention.username.toLowerCase().includes(value.toLowerCase().slice(1))
    );
    setFilteredSuggestions(filtered);
  };

  const handleSuggestionClick = (mention: Mention) => {
    setInputText(`@${mention.username} `);
    setShowSuggestions(false);
  };
  const handleSubmitMessage = async() => {
    if (inputText.trim() !== '') {
      // Thực hiện xử lý gửi tin nhắn tại đây, ví dụ:
      // Gửi tin nhắn thông qua API, lưu vào state, hoặc thực hiện các tác vụ khác
      const payload: IMessageRequest = {
        contentMessage: inputText,
        senderId: sender,
        conversationId: chatId,
      }
      console.log(payload)
      const response = await createMessage(payload)
      if(response){
        setMessages([...messages, response])
      }
      // Clear input text
      setInputText('');
  
      // Hide suggestions and emoji picker (nếu cần)
      setShowSuggestions(false);
      setShowEmoji(false);
    }
  };
  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmitMessage();
    }
  };
  
  return (
    <>
      <HiOutlinePaperClip className="text-xl cursor-pointer hover:text-mainColor" />
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
      <HiPaperAirplane className="text-xl cursor-pointer  hover:text-mainColor" onClick={handleSubmitMessage}/>
    </>
  );
};

export default ChatBox;
