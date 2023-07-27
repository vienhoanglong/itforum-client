import React, { ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { Button } from "../button";
import { BsEmojiSmileFill } from "react-icons/bs";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

interface CommentAreaProps {
  avatar: string;
  handleCommentSubmit: (event: FormEvent<HTMLFormElement>) => void;
  menuRef: React.RefObject<HTMLDivElement>;
  comment: string;
  handleCommentChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  setComment: React.Dispatch<React.SetStateAction<string>>;
}

export const CommentArea: React.FC<CommentAreaProps> = ({
  avatar,
  handleCommentSubmit,
  menuRef,
  comment,
  handleCommentChange,
  setComment,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [comment]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !(
          menuRef.current instanceof Node &&
          menuRef.current.contains(event.target as Node)
        )
      ) {
        setShowEmoji(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [showEmoji, setShowEmoji] = React.useState<boolean>(false);
  // Add emoji to comment
  const addEmoji = (e: { unified: string }): void => {
    const sym: string[] = e.unified.split("_");
    const codeArray: number[] = [];
    sym.forEach((el: string) => codeArray.push(parseInt("0x" + el, 16)));
    const emoji: string = String.fromCodePoint(...codeArray);
    setComment(comment + emoji);
  };
  return (
    <div className="bg-light3 dark:bg-dark0 flex rounded-lg p-4 mb-2 relative">
      <div className="flex-shrink-0 mr-2">
        <img className="w-8 h-8 rounded-full" src={avatar} alt="User Avatar" />
      </div>
      <div className="w-full h-auto">
        <form
          onSubmit={handleCommentSubmit}
          className="h-auto flex flex-col justify-end"
        >
          <textarea
            rows={1}
            ref={textareaRef}
            className=" w-full overflow-y-hidden h-auto p-2 break-words border rounded dark:bg-dark2 pr-4"
            placeholder="Typing your comment..."
            value={comment}
            onChange={handleCommentChange}
          ></textarea>
          {/* <QuillEditor value={content} onChange={handleContentChange} /> */}
          <div className="flex justify-end mt-2">
            <Button
              size="small"
              type="submit"
              kind="primary"
              className="text-xs"
            >
              Send
            </Button>
          </div>
        </form>
        <div className=" absolute bottom-6 right-0 flex items-center h-full pr-2">
          <Button
            size="small"
            type="submit"
            kind="primary"
            className="text-sm bg-transparent"
            handle={() => setShowEmoji(!showEmoji)}
          >
            <BsEmojiSmileFill style={{ color: "grey" }} />
          </Button>
          {showEmoji && (
            <div
              className="absolute bottom-[5%] -right-[16.5rem] "
              ref={menuRef}
            >
              <Picker
                data={data}
                emojiSize={20}
                emojiButtonSize={28}
                maxFrequentRows={0}
                onEmojiSelect={addEmoji}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CommentArea;
