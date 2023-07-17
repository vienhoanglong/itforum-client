import ActionMenu from "@/modules/post/ActionMenu";
import React, { useEffect, useRef, useState } from "react";
import { BsFillChatRightDotsFill } from "react-icons/bs";
import { HiDotsVertical, HiMinusCircle, HiPlusCircle } from "react-icons/hi";

interface Comment {
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  replies: Reply[];
}

interface Reply {
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const [activeComment, setActiveComment] = useState<number | null>(null);
  const [activeReply, setActiveReply] = useState<{
    commentIndex: number;
    replyIndex: number;
  } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuComment = (commentIndex: number) => {
    if (activeComment === commentIndex) {
      setActiveComment(null);
    } else {
      setActiveComment(commentIndex);
      setActiveReply(null);
    }
  };

  const handleMenuReply = (commentIndex: number, replyIndex: number) => {
    if (
      activeReply?.commentIndex === commentIndex &&
      activeReply?.replyIndex === replyIndex
    ) {
      setActiveReply(null);
    } else {
      setActiveReply({ commentIndex, replyIndex });
      setActiveComment(null);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !(
          menuRef.current instanceof Node &&
          menuRef.current.contains(event.target as Node)
        )
      ) {
        setActiveReply(null);
        setActiveComment(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {comments.map((comment, commentIndex) => (
        <div
          key={commentIndex}
          className="comment mb-4 dark:text-light0 bg-light1 dark:bg-dark1 rounded-lg p-2 ml-4 "
        >
          <div className="flex items-start dark:bg-dark0 rounded-lg p-2 ">
            <div className="ml-1">
              <div className="flex items-center space-x-1">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full brightness-90"
                    src={comment.avatar}
                    alt="User Avatar"
                  />
                </div>
                <div className="font-bold">{comment.author}</div>
                <div className="text-xs text-gray-500 dark:text-light0">
                  {comment.timestamp}
                </div>
              </div>
              <div
                className="md pl-[28px] xs:pl-xl text-xs
                relative  before:content-['']
                before:absolute
                before:border-l-[1px]
                before:border-r-[0px]
                before:border-y-0
                before:border-tone-4
                before:border-solid
                before:border-dark2
                before:top-0
                before:left-[15.5px]
                xs:before:left-[15.5px]
                before:h-[calc(100%+6px)]"
              >
                <div className="text-gray-600 dark:text-light0">
                  {comment.content}
                </div>
              </div>
              <div
                className="text-xs mt-1 w-full flex space-x-4 pl-[0.6rem]
              "
              >
                <button className="flex items-center space-x-1 hover:underline hover:text-mainColor">
                  <HiMinusCircle />
                  <span className="text-xs italic font-thin text-mainColor">
                    100 more
                  </span>
                </button>
                <button className="hover:underline hover:text-mainColor flex items-center space-x-1">
                  <BsFillChatRightDotsFill />
                  <span className="text-xs italic font-thin text-mainColor">
                    Reply
                  </span>
                </button>
              </div>
            </div>
            <div
              ref={menuRef}
              onClick={() => handleMenuComment(commentIndex)}
              className="ml-auto relative bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 rounded-full py-2"
            >
              <HiDotsVertical size={15}></HiDotsVertical>
              {activeComment === commentIndex && <ActionMenu></ActionMenu>}
            </div>
          </div>
          <div
            className="relative  after:content-['']
          after:absolute
          after:border-l-[1px]
          after:border-r-[0px]
          after:border-y-0
          after:border-dark2
          after:border-tone-4
          after:border-solid
          after:top-[-17px]
          after:left-[26.5px]
          xs:after:left-[15.5px]
          after:h-[calc(100%-36px)]"
          >
            {comment.replies.map((reply, replyIndex) => (
              <div
                key={replyIndex}
                className="ml-10 mt-2 relative after:content-['']
            after:absolute
            after:border-l-[1px]
            after:border-r-[0px]
            after:border-y-0
            after:border-tone-4
            after:border-solid
            after:border-dark2
            after:rounded-bl-[12px]
            after:border-b-[1px]
            after:bottom-[14px] xs:after:bottom-[70px]
            after:-left-[13.5px] xs:after:left-[3.5px]
            after:w-[34px] xs:after:w-[23px]
            after:h-[calc(100%-36px)] xs:after:h-[calc(100%-52px)]"
              >
                <div className="flex items-start  dark:bg-dark0 rounded-lg p-2 ">
                  <div className="ml-1">
                    <div className="flex items-center space-x-1">
                      <div className="flex-shrink-0">
                        <img
                          className="w-8 h-8 rounded-full brightness-90"
                          src={reply.avatar}
                          alt="User Avatar"
                        />
                      </div>
                      <div className="font-bold">{reply.author}</div>
                      <div className="text-xs text-gray-500 dark:text-light0">
                        {reply.timestamp}
                      </div>
                    </div>
                    <div
                      className="md pl-[28px] xs:pl-xl text-xs
                    relative  before:content-['']
                    before:absolute
                    before:border-l-[1px]
                    before:border-r-[0px]
                    before:border-y-0
                    before:border-dark2
                    before:border-tone-4
                    before:border-solid
                    before:top-0
                    before:left-[15.5px]
                    xs:before:left-[15.5px]
                    before:h-[calc(100%+6px)]"
                    >
                      <div className="text-gray-600 dark:text-light0">
                        {reply.content}
                      </div>
                    </div>
                    <div className="text-xs mt-1 flex space-x-4 pl-[0.6rem] w-full ">
                      <button className="flex items-center space-x-1 hover:underline hover:text-mainColor">
                        <HiPlusCircle />
                        <span className="text-xs italic font-thin text-mainColor">
                          100 more
                        </span>
                      </button>
                      <button className="hover:underline hover:text-mainColor flex items-center space-x-1">
                        <BsFillChatRightDotsFill />
                        <span className=" text-xs italic font-thin text-mainColor">
                          Reply
                        </span>
                      </button>
                    </div>
                  </div>
                  <div
                    ref={menuRef}
                    onClick={() => handleMenuReply(commentIndex, replyIndex)}
                    className="ml-auto relative bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 rounded-full py-2"
                  >
                    <HiDotsVertical size={15}></HiDotsVertical>
                    {activeReply?.commentIndex === commentIndex &&
                      activeReply?.replyIndex === replyIndex && (
                        <ActionMenu></ActionMenu>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
