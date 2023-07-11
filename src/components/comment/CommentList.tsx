import ActionMenu from "@/modules/post/ActionMenu";
import React, { useEffect, useRef, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

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
          className="comment mb-4 dark:text-light0 dark:bg-dark2 rounded-lg p-2 ml-4"
        >
          <div className="flex items-start border-b-2 pb-2 dark:border-b-dark1 border-b-light0">
            <div className="flex-shrink-0">
              <img
                className="w-8 h-8 rounded-full brightness-90"
                src={comment.avatar}
                alt="User Avatar"
              />
            </div>
            <div className="ml-2">
              <div className="font-bold">{comment.author}</div>
              <div className="text-gray-600 dark:text-light0">
                {comment.content}
              </div>
              <div className="text-xs text-gray-500 dark:text-light0">
                {comment.timestamp}
              </div>
              <div className="text-xs text-blue-500 cursor-pointer mt-2">
                Reply
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

          {comment.replies.map((reply, replyIndex) => (
            <div key={replyIndex} className="ml-10 mt-2">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full brightness-90"
                    src={reply.avatar}
                    alt="User Avatar"
                  />
                </div>
                <div className="ml-2">
                  <div className="font-bold">{reply.author}</div>
                  <div className="text-gray-600 dark:text-light0">
                    {reply.content}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-light0">
                    {reply.timestamp}
                  </div>
                  <div className="text-xs text-blue-500 cursor-pointer mt-2">
                    Reply
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
      ))}
    </div>
  );
};

export default CommentList;
