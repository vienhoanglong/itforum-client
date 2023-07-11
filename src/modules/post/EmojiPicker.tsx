import React from "react";
import Picker from "@emoji-mart/react";
import type EmojiData from "@emoji-mart/react";

interface EmojiPickerProps {
  onSelect: (emoji: typeof EmojiData) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect }) => {
  return (
    <div className="absolute bottom-10 right-0">
      <Picker onSelect={onSelect} />
    </div>
  );
};

export default EmojiPicker;
