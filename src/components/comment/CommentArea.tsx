import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "../button";
import { BsEmojiSmileFill } from "react-icons/bs";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useUserStore } from "@/store/userStore";
import { colorsAvatar } from "@/constants/global";
import ICommentCreate from "@/interface/API/ICommentCreate";

interface CommentAreaProps {
  onSaveChanges: (comment: ICommentCreate) => void;
  menuRef: React.RefObject<HTMLDivElement>;
  discussionId: string | null;
  postsId: string | null;
  parentId: string | null;
  isEditing?: boolean;
  handleCancel?: () => void;
  content?: string;
}

export const CommentArea: React.FC<CommentAreaProps> = ({
  onSaveChanges,
  handleCancel,
  discussionId,
  menuRef,
  parentId,
  isEditing,
  content,
  postsId,
}) => {
  const { user } = useUserStore();
  const [comment, setComment] = useState(content ? content : "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isTextareaEmpty, setIsTextareaEmpty] = useState<boolean>(true);

  useEffect(() => {
    setIsTextareaEmpty(comment.trim() === "");
  }, [comment]);
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
  const getColorAvatar = user
    ? colorsAvatar.find((item) => item.color === user.color)
    : null;
  const colorAvatar = getColorAvatar ? getColorAvatar.value : "";

  const handleCommentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dataCommentCreate: ICommentCreate = {
      createBy: user ? user._id : "",
      content: comment,
      ...(parentId !== null ? { commentParentId: parentId } : {}),
      ...(discussionId !== null ? { discussId: discussionId } : {}),
      ...(postsId !== null ? { postsId: postsId } : {}),
    };
    handleCancel && handleCancel();
    onSaveChanges(dataCommentCreate);
    setComment("");
  };
  return (
    <div className="bg-light3 dark:bg-dark0 flex rounded-lg p-4 mb-2 mt-2 relative">
      <div className="flex-shrink-0 mr-2">
        <img
          className={`w-8 h-8 ${colorAvatar} rounded-full`}
          src={user?.avatar}
          alt="User Avatar"
        />
      </div>
      <div className="w-full h-auto">
        <form
          onSubmit={handleCommentSubmit}
          className="h-auto flex flex-col justify-end"
        >
          <textarea
            rows={1}
            ref={textareaRef}
            className=" w-full overflow-y-hidden h-auto p-2 break-words border rounded dark:bg-dark2 dark:text-white  pr-4"
            placeholder="Typing your comment..."
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
              setIsTextareaEmpty(event.target.value.trim() === "");
            }}
          ></textarea>
          {/* <QuillEditor value={content} onChange={handleContentChange} /> */}
          <div className="flex justify-end z-10 mt-2">
            {isTextareaEmpty == true ? (
              <Button
                size="small"
                type="submit"
                kind="primary"
                className="text-xs dark:bg-dark3 bg-dark3 hover:cursor-pointer "
                disable
              >
                Send
              </Button>
            ) : (
              <Button
                size="small"
                type="submit"
                kind="primary"
                className="text-xs hover:cursor-pointer"
              >
                Send
              </Button>
            )}
            {isEditing && (
              <button
                type="button"
                onClick={handleCancel}
                className="text-[10px] hover:cursor-pointer font-semibold ml-2 p-2 rounded-xl bg-red-400 text-white"
              >
                Cancel
              </button>
            )}
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
