import ActionMenu from "@/modules/post/ActionMenu";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsFillChatRightDotsFill } from "react-icons/bs";
import { HiDotsVertical, HiMinusCircle, HiPlusCircle } from "react-icons/hi";
import ReplyArea from "./ReplyArea";
import IUser from "@/interface/user";
import ICommentCreate from "@/interface/API/ICommentCreate";
import IComment from "@/interface/comment";
import { getListComment } from "@/services/commentService";

interface CommentListProps {
  onSaveChanges?: (comment: ICommentCreate) => void;
  discussionId?: string;
  commentList: IComment[] | null;
  userData: IUser | null;
}

const CommentList: React.FC<CommentListProps> = ({
  onSaveChanges,
  discussionId,
  commentList,
  userData,
}) => {
  const [childComments, setChildComments] = useState<{
    [parentId: string]: IComment[];
  }>({});
  const [selectedCommentIndex, setSelectedCommentIndex] = useState<
    number | null
  >(null);
  const [commentId, setCommentId] = useState("");
  const [listComment, setListCommentId] = useState<IComment[] | null>(null);
  const [activeComment, setActiveComment] = useState<number | null>(null);
  const [activeReply, setActiveReply] = useState<{
    commentIndex: number;
    replyIndex: number;
  } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleReplyArea = (commentIndex: number) => {
    setSelectedCommentIndex(commentIndex);
  };
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

  const handleGetIdComment = async (commentIndex: number, id: string) => {
    setCommentId(id);
    const existingChildComments = childComments[commentIndex] || [];
    const response = await getListComment(discussionId || "", 0, 0, id);
    const updatedChildComments = [...existingChildComments, ...response.data];
    setChildComments((prevChildComments) => ({
      ...prevChildComments,
      [commentIndex]: updatedChildComments,
    }));
  };

  return (
    <div>
      {commentList?.map((comment, commentIndex) => (
        <div
          key={commentIndex}
          className="comment mb-1 dark:text-light0 bg-light3 dark:bg-dark1 rounded-lg p-2 ml-4 "
        >
          <div className="flex items-start dark:bg-dark0 rounded-lg p-2 ">
            <div className="ml-1">
              <div className="flex items-center space-x-1">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full brightness-90"
                    src={userData?.avatar}
                    alt="User Avatar"
                  />
                </div>
                <div className="font-bold">{userData?.fullName}</div>
                <div className="text-xs text-gray-500 dark:text-light0">
                  18-8-2023
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
                before:border-light1
                dark:before:border-dark2 

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
                <button
                  onClick={() =>
                    handleGetIdComment(commentIndex, comment._id || "")
                  }
                  className="flex items-center space-x-1 hover:underline hover:text-mainColor"
                >
                  <HiMinusCircle />
                  <span className="text-xs italic font-thin text-mainColor">
                    more
                  </span>
                </button>
                <button
                  onClick={() => handleReplyArea(commentIndex)}
                  className="hover:underline hover:text-mainColor flex items-center space-x-1"
                >
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
              className="ml-auto relative bg-light2 hover:bg-light0 dark:bg-dark0 dark:hover:bg-dark2 dark:text-light0 rounded-full py-2"
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
          after:border-light1
          dark:after:border-dark2
          after:border-tone-4
          after:border-solid
          after:top-[-17px]
          after:left-[26.5px]
          xs:after:left-[15.5px]
          after:h-[calc(100%-36px)]"
          >
            {comment?._id &&
              childComments[commentIndex]?.map((reply, replyIndex) => (
                <div
                  key={replyIndex}
                  className="ml-10 mt-2 relative after:content-['']
            after:absolute
            after:border-l-[1px]
            after:border-r-[0px]
            after:border-y-0
            after:border-tone-4
            after:border-solid
            after:border-light1
            dark:after:border-dark2
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
                            src={userData?.avatar}
                            alt="User Avatar"
                          />
                        </div>
                        <div className="font-bold">{userData?.fullName}</div>
                        <div className="text-xs text-gray-500 dark:text-light0">
                          18-8-2023
                        </div>
                      </div>
                      <div
                        className="md pl-[28px] xs:pl-xl text-xs
                    relative  before:content-['']
                    before:absolute
                    before:border-l-[1px]
                    before:border-r-[0px]
                    before:border-y-0
                    before:border-light1
                    dark:before:border-dark2
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
                      <div
                        onClick={() =>
                          handleGetIdComment(commentIndex, reply._id || "")
                        }
                        className="text-xs mt-1 flex space-x-4 pl-[0.6rem] w-full "
                      >
                        <button
                          onClick={() =>
                            handleGetIdComment(commentIndex, comment._id || "")
                          }
                          className="flex items-center space-x-1 hover:underline hover:text-mainColor"
                        >
                          <HiMinusCircle />
                          <span className="text-xs italic font-thin text-mainColor">
                            100 more
                          </span>
                        </button>

                        <button
                          onClick={() => handleReplyArea(commentIndex)}
                          className="hover:underline hover:text-mainColor flex items-center space-x-1"
                        >
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
                      className="ml-auto relative bg-light2 hover:bg-light0 dark:bg-dark0 dark:hover:bg-dark2 dark:text-light0 rounded-full py-2"
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
          {/* {selectedCommentIndex === commentIndex && 
          <ReplyArea menuRef={menuRef} handleCommentChange={handleCommentChange} handleCommentSubmit={handleCommentSubmit} comment={cmt} setComment={setComment} ></ReplyArea>
          } */}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
