import { colorsAvatar } from "@/constants/global";
import IComment from "@/interface/comment";
import {
  CreateNewComment,
  getListCommentById,
  getListCommentPostsById,
} from "@/services/commentService";
import React, { useEffect, useRef, useState } from "react";
import { BsFillChatRightDotsFill, BsTrashFill } from "react-icons/bs";
import { HiPencil } from "react-icons/hi";
import CommentArea from "./CommentArea";
import ICommentCreate from "@/interface/API/ICommentCreate";
import { useCommentStore } from "@/store/commentStore";
import { getUserById } from "@/services/userService";
import IUser from "@/interface/user";
interface ActiveCommentType {
  id: string;
  type: string;
}

interface updateType {
  id: string;
  content: string;
}
interface CommentsProps {
  postsId: string | null;
  idDelete: string;
  idUpdate: updateType | null;
  nestedLevel: number;
  isDeleted: boolean;
  comment: IComment;
  discussId: string | null;
  currentUserId: string;
  handleDelete: (commentId: string) => void;
  activeComment: ActiveCommentType | null;
  handleUpdated: (data: ICommentCreate, id: string) => void;
  setActiveComment: React.Dispatch<
    React.SetStateAction<ActiveCommentType | null>
  >;
}
const Comments: React.FC<CommentsProps> = ({
  comment,
  idUpdate,
  idDelete,
  nestedLevel,
  postsId,
  isDeleted,
  discussId,
  currentUserId,
  handleDelete,
  activeComment,
  setActiveComment,
  handleUpdated,
}) => {
  const { setIsDeleted } = useCommentStore();
  const [repliesComment, setRepliesComment] = useState<IComment[]>([]);
  const [user, setUser] = useState<IUser | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  //const fiveMinutes = 300000;
  //const timePassed = comment.createdAt && new Date().getTime() - new Date(comment.createdAt).getTime() > fiveMinutes;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.createBy;
  const canDelete = currentUserId === comment.createBy;
  const createdAt =
    comment.createdAt && new Date(comment.createdAt).toLocaleDateString();
  const isReplying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment.id === comment._id;
  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment._id;

  useEffect(() => {
    if (isDeleted === true && idDelete !== undefined) {
      const updateComment = repliesComment.filter((c) => c._id !== idDelete);
      setRepliesComment(updateComment);
      setIsDeleted(false);
    }
  }, [idDelete]);

  useEffect(() => {
    if (idUpdate !== undefined) {
      const newUpdate = repliesComment.map((comment) => {
        if (comment._id === idUpdate?.id) {
          return { ...comment, content: idUpdate?.content };
        }
        return comment;
      });
      setRepliesComment(newUpdate);
    }
  }, [idUpdate]);

  useEffect(() => {
    const fectData = async () => {
      if (comment.countChildComments !== 0 && discussId != null) {
        const response =
          comment._id != null &&
          discussId &&
          (await getListCommentById(discussId, 0, 0, comment._id));
        if (response) {
          setRepliesComment(response.data);
        }
      } else if (comment.countChildComments !== 0 && postsId != null) {
        const response =
          comment._id != null &&
          postsId &&
          (await getListCommentPostsById(postsId, 0, 0, comment._id));
        if (response) {
          setRepliesComment(response.data);
        }
      }
    };
    fectData();
  }, []);
  useEffect(() => {
    const fectData = async () => {
      if (comment.createBy) {
        const response = await getUserById(comment.createBy);
        if (response) {
          setUser(response.data);
        }
      }
    };
    fectData();
  }, []);

  const handleUpdate = (data: ICommentCreate) => {
    if (data && activeComment) {
      handleUpdated(data, activeComment?.id);
    }
  };
  const hanldeSubmit = async (data: ICommentCreate) => {
    const response = await CreateNewComment(data);
    if (response) {
      setRepliesComment([...repliesComment, response.data]);
      setActiveComment(null);
    }
  };
  const handleCancel = () => {
    setActiveComment(null);
  };

  const getColorUser = (color: string): string => {
    const result = colorsAvatar.find((item) => item.color === color);
    return result?.value ?? "bg-white";
  };

  return (
    <div>
      <div
        key={comment._id}
        className="comment mb-1 dark:text-light0  bg-light4 dark:bg-dark1 rounded-lg p-2 ml-4 "
      >
        {!isEditing && (
          <div className="flex items-start bg-light3 shadow-sm dark:bg-dark0 rounded-lg p-2 ">
            <div className="ml-1">
              <div className="flex items-center space-x-1">
                <div className="flex-shrink-0">
                  <img
                    className={`w-8 h-8 rounded-full brightness-90 ${getColorUser(
                      user?.color ?? ""
                    )}`}
                    src={user?.avatar ?? ""}
                    alt="User Avatar"
                  />
                </div>
                <div className="font-bold">
                  {user?.fullName ?? user?.username} -
                </div>
                <div className="text-[10px] text-gray-500 dark:text-light0">
                  {createdAt}
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
                {canReply && nestedLevel < 2 && (
                  <button
                    onClick={() =>
                      setActiveComment({
                        id: comment._id ? comment._id : "",
                        type: "replying",
                      })
                    }
                    className="hover:underline hover:text-mainColor flex items-center space-x-1"
                  >
                    <BsFillChatRightDotsFill />
                    <span className="text-[10px] italic font-thin text-mainColor">
                      Reply
                    </span>
                  </button>
                )}

                {canEdit && (
                  <button
                    onClick={() =>
                      setActiveComment({
                        id: comment._id ? comment._id : "",
                        type: "editing",
                      })
                    }
                    className="hover:underline hover:text-mainColor flex items-center space-x-1"
                  >
                    <HiPencil />
                    <span className="text-[10px] italic font-thin text-mainColor">
                      Edit
                    </span>
                  </button>
                )}

                {canDelete && (
                  <button
                    onClick={() => {
                      if (comment._id) {
                        handleDelete(comment._id);
                      }
                    }}
                    className="hover:underline  flex items-center  hover:text-red-400 space-x-1"
                  >
                    <BsTrashFill />
                    <span className="text-[10px] italic font-thin text-mainColor hover:text-red-400 ">
                      Delete
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        {isEditing && (
          <CommentArea
            postsId={postsId}
            menuRef={menuRef}
            content={comment.content}
            isEditing={isEditing}
            parentId={comment.commentParentId ? comment.commentParentId : ""}
            discussionId={discussId}
            handleCancel={handleCancel}
            onSaveChanges={handleUpdate}
          ></CommentArea>
        )}

        {isReplying && (
          <CommentArea
            postsId={postsId}
            menuRef={menuRef}
            parentId={comment._id ? comment._id : ""}
            discussionId={discussId}
            onSaveChanges={hanldeSubmit}
          ></CommentArea>
        )}
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
          {repliesComment.length > 0 && (
            <div
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
              {repliesComment.map((reply) => (
                <Comments
                  postsId={postsId}
                  idUpdate={idUpdate}
                  handleUpdated={handleUpdated}
                  idDelete={idDelete}
                  nestedLevel={nestedLevel + 1}
                  isDeleted={isDeleted}
                  activeComment={activeComment}
                  setActiveComment={setActiveComment}
                  handleDelete={handleDelete}
                  currentUserId={currentUserId}
                  key={reply._id}
                  discussId={discussId ? discussId : ""}
                  comment={reply}
                ></Comments>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
