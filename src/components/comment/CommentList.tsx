import ActionMenu from "@/modules/post/ActionMenu";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { BsFillChatRightDotsFill } from "react-icons/bs";
import {
  HiArrowCircleDown,
  HiDotsVertical,
  HiMinusCircle,
  HiPlusCircle,
} from "react-icons/hi";
import ReplyArea from "./ReplyArea";
import IUser from "@/interface/user";
import ICommentCreate from "@/interface/API/ICommentCreate";
import IComment from "@/interface/comment";
import { getListCommentById } from "@/services/commentService";
import { useCommentStore } from "@/store/commentStore";

interface CommentListProps {
  handleSaveChanges: (comment: ICommentCreate) => void;
  discussionId: string;
  userData: IUser | null;
  newComment: IComment | null;
  newReply: IComment | null;
}

const CommentList: React.FC<CommentListProps> = ({
  handleSaveChanges,
  discussionId,
  userData,
  newComment,
  newReply,
}) => {
  const [childComments, setChildComments] = useState<{
    [commentIndex: string]: IComment[];
  }>({});
  const { listComment, getListComment } = useCommentStore();
  const [newCommentList, setNewCommentList] = useState<IComment[] | null>([]);
  useMemo(() => {
    if (
      discussionId !== null &&
      discussionId !== "" &&
      discussionId !== undefined
    ) {
      discussionId && getListComment(discussionId, 0, 0);
    }
  }, [discussionId, getListComment]);
  useEffect(() => {
    if (listComment != null) {
      setNewCommentList(listComment);
    }
  }, [listComment]);

  const [selectedCommentIndex, setSelectedCommentIndex] = useState<
    number | null
  >(null);
  const [commentId, setCommentId] = useState("");
  const [activeComment, setActiveComment] = useState<number | null>(null);
  const [activeReply, setActiveReply] = useState<{
    commentIndex: number;
    replyIndex: number;
  } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [expandedComments, setExpandedComments] = useState<string[]>([]);

  const handleReplyArea = (commentIndex: number, id: string) => {
    setSelectedCommentIndex(commentIndex);
    setCommentId(id);
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
    if (!expandedComments.includes(id)) {
      setExpandedComments((prevExpandedComments) => [
        ...prevExpandedComments,
        id,
      ]);
    }
    const existingChildComments = childComments[commentIndex] || [];
    const response = await getListCommentById(discussionId || "", 0, 0, id);
    const updatedChildComments = [...existingChildComments, ...response.data];
    setChildComments((prevChildComments) => ({
      ...prevChildComments,
      [commentIndex]: updatedChildComments,
    }));
  };
  useEffect(() => {
    if (newComment) {
      // Thêm comment mới vào đầu commentList
      if (newCommentList !== null) {
        const updatedCommentList = [newComment, ...newCommentList];
        setNewCommentList(updatedCommentList);
      }
      // Tăng key của các phần tử trong childComments lên 1
      const updatedChildComments: { [commentIndex: string]: IComment[] } = {};
      Object.keys(childComments).forEach((commentIndex) => {
        const incrementedCommentIndex = (parseInt(commentIndex) + 1).toString();
        updatedChildComments[incrementedCommentIndex] =
          childComments[commentIndex];
      });
      updatedChildComments["0"] = [];
      setChildComments(updatedChildComments);
    }
    if (newReply) {
      if (
        selectedCommentIndex !== null &&
        childComments[selectedCommentIndex] !== undefined
      ) {
        const updatedCommentList = [
          ...childComments[selectedCommentIndex],
          newReply,
        ];
        setChildComments((prevState) => ({
          ...prevState,
          [selectedCommentIndex]: updatedCommentList,
        }));
        console.log(selectedCommentIndex);
      }
    }
  }, [newComment, newReply]);

  const handleCommentReply = (comment: ICommentCreate) => {
    handleSaveChanges(comment);
  };
  return (
    <div>
      {newCommentList?.map((comment, commentIndex) => (
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
                {comment.countChildComments !== 0 &&
                  !expandedComments.includes(
                    comment._id ? comment._id : ""
                  ) && (
                    <button
                      onClick={() =>
                        handleGetIdComment(commentIndex, comment._id || "")
                      }
                      className="flex items-center space-x-1 hover:underline hover:text-mainColor"
                    >
                      <HiPlusCircle />
                      <span className="text-xs italic font-thin text-mainColor">
                        {comment.countChildComments} more
                      </span>
                    </button>
                  )}

                <button
                  onClick={() =>
                    handleReplyArea(
                      commentIndex,
                      comment._id ? comment._id : ""
                    )
                  }
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
                      <div className="text-xs mt-1 flex space-x-4 pl-[0.6rem] w-full ">
                        {reply.countChildComments !== 0 &&
                          !expandedComments.includes(
                            reply._id ? reply._id : ""
                          ) && (
                            <button
                              onClick={() =>
                                handleGetIdComment(
                                  commentIndex,
                                  reply._id || ""
                                )
                              }
                              className="flex items-center space-x-1 hover:underline hover:text-mainColor"
                            >
                              <HiMinusCircle />
                              <span className="text-xs italic font-thin text-mainColor">
                                {reply.countChildComments} more
                              </span>
                            </button>
                          )}
                        <button
                          onClick={() =>
                            handleReplyArea(
                              commentIndex,
                              reply._id ? reply._id : ""
                            )
                          }
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
          {selectedCommentIndex === commentIndex && (
            <ReplyArea
              onSaveChanges={handleCommentReply}
              menuRef={menuRef}
              parentCommentId={commentId}
              discussionId={discussionId ? discussionId : ""}
            ></ReplyArea>
          )}
        </div>
      ))}

      <button className="hover:underline hover:text-mainColor flex items-center space-x-1">
        <HiArrowCircleDown />
        <span className=" text-xs italic font-thin text-mainColor">
          See more
        </span>
      </button>
    </div>
  );
};

export default CommentList;
