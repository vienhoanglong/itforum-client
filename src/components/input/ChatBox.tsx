import React, { useState, ChangeEvent } from 'react';

interface Mention {
  id: number;
  username: string;
}

interface ChatBoxProps {
  users: Mention[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ users }) => {
  const [inputText, setInputText] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Mention[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputText(value);

    if (value.length > 0 && value[value.length - 1] === '@') {
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

  return (
    <>
      <input
        className="p-[4px_10px] border rounded-[30px] overflow-visible w-full border-[#dee2e6]"
        type="text"
        value={inputText}
        onChange={handleInputChange}
      />
      {showSuggestions && (
        <div className='absolute left-4 bottom-16 bg-slate-300 p-2 rounded-md'>
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
    </>
  );
};

export default ChatBox;