import React, { useEffect, useRef, useState } from "react";

import LayoutDetail from "@/layout/LayoutDetail";
import Carousel from "@/modules/post/Carousel";
import PostHeader from "@/modules/post/PostHeader";
import PostContent from "@/modules/post/PostContent";
import ListPostCard from "@/modules/post/ListPostCard";
import { useParams } from "react-router-dom";
import { usePostStore } from "@/store/postStore";
import { useTopicStore } from "@/store/topicStore";
import { useUserStore } from "@/store/userStore";
import CommentArea from "@/components/comment/CommentArea";
import {
  CreateNewComment,
  UpdatedComment,
  deleteCommentPost,
  getListCommentPostsById,
} from "@/services/commentService";
import ICommentCreate from "@/interface/API/ICommentCreate";
import IComment from "@/interface/comment";
import { getPostById, incrementViewPost } from "@/services/postService";
import IPost from "@/interface/post";
import { useCommentStore } from "@/store/commentStore";
import Comments from "@/components/comment/Comments";
import Modal from "@/components/modal/Modal";
import ConfirmDialog from "@/components/confirm/ConfirmDialog";
import { toast } from "react-toastify";

export const PostDetailPage: React.FC = () => {
  const { postId } = useParams();
  const { getById, userById, user } = useUserStore();
  const { post, getPostByPostId } = usePostStore();
  const { getListByListTopicId, listTopicByListId } = useTopicStore();

  const [postIncrement, setPostIncrement] = useState<IPost | null>(null);
  const viewedPostIdsKey = user?._id ? `viewedPostIds_${user._id}` : "";
  const [increment, setIncrement] = useState(false);

  const [parentComment, setParentComment] = useState<IComment[]>([]);
  const [activeComment, setActiveComment] = useState<{
    type: string;
    id: string;
  } | null>(null);
  const { isDeleted, setIsDeleted } = useCommentStore();
  const [idDelete, setIdDelete] = useState("");
  const [idUpdate, setIdUpdate] = useState<{
    content: string;
    id: string;
  } | null>(null);
  const [isModalOpenDialog, setIsModalOpenDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [confirmMessage, setConfirmMessage] = useState("");

  useEffect(() => {
    postId && getPostByPostId(postId);
  }, [getPostByPostId, postId]);

  useEffect(() => {
    const fetchData = async () => {
      const response = postId && (await getPostById(postId));
      if (response) {
        setPostIncrement(response);
        if (viewedPostIdsKey !== "") {
          const viewedPostIdsString = localStorage.getItem(viewedPostIdsKey);
          if (viewedPostIdsString === null) {
            postId && incrementViewPost(postId);
            postId &&
              localStorage.setItem(
                `viewedPostIds_${user?._id}`,
                JSON.stringify([postId])
              );
            setIncrement(!increment);
          } else {
            const initialViewedPostIds =
              viewedPostIdsString != null
                ? JSON.parse(viewedPostIdsString)
                : [];
            if (!initialViewedPostIds.includes(postId ? postId : "")) {
              postId && incrementViewPost(postId);
              localStorage.setItem(
                `viewedPostIds_${user?._id}`,
                JSON.stringify([...initialViewedPostIds, postId])
              );
              setIncrement(!increment);
            }
          }
        }
      }
    };
    fetchData();
  }, [postId, user?._id, increment]);

  useEffect(() => {
    post && getListByListTopicId(post.hashtag.toString());
    post && getById(post.createdBy);
  }, [post, getListByListTopicId, getById]);

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };
  const handleReportClick = () => {
    setReportModalOpen(true);
    setMenuOpen(false);
  };

  const handleCloseModal = () => {
    setReportModalOpen(false);
  };
  useEffect(() => {
    const fectData = async () => {
      const response = postId && (await getListCommentPostsById(postId, 0, 0));
      if (response) {
        setParentComment(response.data);
      }
    };
    fectData();
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !(
          menuRef.current instanceof Node &&
          menuRef.current.contains(event.target as Node)
        )
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleConfirm = (action: () => void, message: string) => {
    setConfirmAction(() => action);
    setConfirmMessage(message);
    setIsModalOpenDialog(true);
  };
  const handleConfirmAction = () => {
    if (confirmAction) {
      confirmAction();
    }
    setIsModalOpenDialog(false);
  };

  const handleCommentSubmit = async (data: ICommentCreate) => {
    const reponse = await CreateNewComment(data);
    if (data.commentParentId === undefined) {
      setParentComment([reponse.data, ...parentComment]);
    }
  };
  const handleDeleteCmt = async (commentId: string) => {
    handleConfirm(async () => {
      try {
        postId && (await deleteCommentPost(postId, commentId));
        const updateComment = parentComment.filter((c) => c._id !== commentId);
        setParentComment(updateComment);
        setIsDeleted(true);
        setIdDelete(commentId);
        toast.success(" Deleted comment successfully! ", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } catch (err) {
        console.log("error hidden comment");
      }
    }, "Bạn có chắc muốn xoá không?");
  };
  const handleUpdate = async (data: ICommentCreate, id: string) => {
    try {
      const dataUpdate: ICommentCreate = { content: data.content };
      const response = await UpdatedComment(dataUpdate, id);
      if (response) {
        if (data.content) {
          setIdUpdate({ id: id, content: data.content });
        }
        const newUpdate = parentComment.map((comment) => {
          if (comment._id === id) {
            return { ...comment, content: data.content };
          }
          return comment;
        });
        setParentComment(newUpdate);
      }
    } catch (e) {
      console.log("fail to update comment");
    }
  };
  return (
    <LayoutDetail
      otherChildren={
        <ListPostCard
          listTopic={post ? post.hashtag : ""}
          numTopicsToShow={5}
          postId={post?._id}
        ></ListPostCard>
      }
    >
      <div className="z-10 md:w-full pb-2 bg-light4 dark:bg-dark1 dark:text-light0 rounded-lg p-8">
        <PostHeader
          post={postIncrement && postIncrement}
          user={userById && userById}
          menuRef={menuRef}
          handleMenuToggle={handleMenuToggle}
          handleCloseModal={handleCloseModal}
          isMenuOpen={isMenuOpen}
          handleReportClick={handleReportClick}
          isReportModalOpen={isReportModalOpen}
          listTopic={listTopicByListId != null ? listTopicByListId : []}
        />
        <PostContent content={post ? post.content : ""}></PostContent>
        {isModalOpenDialog && (
          <Modal isOpen={isModalOpenDialog} onClose={handleCloseModal}>
            <ConfirmDialog
              message={confirmMessage}
              onConfirm={handleConfirmAction}
              onCancel={handleCloseModal}
            />
          </Modal>
        )}
        <div className="w-full mx-auto mt-16 bg-white dark:bg-dark1 p-4">
          <CommentArea
            onSaveChanges={handleCommentSubmit}
            menuRef={menuRef}
            discussionId={null}
            parentId={null}
            postsId={post?._id ? post?._id : ""}
          />
          {parentComment.map((comment) => (
            <Comments
              postsId={post?._id ? post?._id : ""}
              idUpdate={idUpdate}
              handleUpdated={handleUpdate}
              nestedLevel={0}
              idDelete={idDelete}
              isDeleted={isDeleted}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              handleDelete={handleDeleteCmt}
              currentUserId={user && user._id ? user._id : ""}
              key={comment._id}
              discussId={null}
              comment={comment}
            ></Comments>
          ))}
        </div>

        <Carousel
          listTopic={post ? post.hashtag : ""}
          postId={post?._id}
        ></Carousel>
      </div>
    </LayoutDetail>
  );
};

export default PostDetailPage;
