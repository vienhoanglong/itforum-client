import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Thumbnail from "../assets/header-image-post-detail.png";

import {
  content,
  exampleDataTopic,
  listComment,
  topicColors,
} from "@/constants/global";
import LayoutPostDetail from "@/layout/LayoutPostDetail";
import Carousel from "@/modules/post/Carousel";
import PostHeader from "@/modules/post/PostHeader";
import PostContent from "@/modules/post/PostContent";
import CommentArea from "@/components/comment/CommentArea";
import CommentList from "@/components/comment/CommentList";

export const PostDetailPage: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMenuComment, setMenuComment] = useState(false);
  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };
  const handleMenuComment = () => {
    setMenuComment(!isMenuComment);
  };
  const handleReportClick = () => {
    setReportModalOpen(true);
    setMenuOpen(false);
  };

  const handleCloseModal = () => {
    setReportModalOpen(false);
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
        setMenuOpen(false);
        setMenuComment(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [comment, setComment] = useState<string>("");

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Xử lý logic khi người dùng gửi bình luận
    console.log("Bình luận đã được gửi:", comment);
    setComment("");
  };

  return (
    <LayoutPostDetail>
      <div className=" md:w-full pb-2 bg-light4 dark:bg-dark1 dark:text-light0 rounded-lg p-8">
        <PostHeader
          menuRef={menuRef}
          title="AI Introducing Lary 'Quickdraw' AI"
          author="Tran Hoang Long"
          view={100}
          comment={100}
          datePublish="16/6/2023"
          handleMenuToggle={handleMenuToggle}
          handleCloseModal={handleCloseModal}
          isMenuOpen={isMenuOpen}
          handleReportClick={handleReportClick}
          isReportModalOpen={isReportModalOpen}
          Thumbnail={Thumbnail}
          exampleDataTopic={exampleDataTopic}
          topicColors={topicColors}
        />
        <PostContent content={content}></PostContent>
        <div className="w-full mx-auto mt-16 bg-white dark:bg-dark1 p-4">
          <CommentArea
            avatar="https://via.placeholder.com/50"
            handleCommentChange={handleCommentChange}
            handleCommentSubmit={handleCommentSubmit}
            setComment={setComment}
            menuRef={menuRef}
            comment={comment}
          />

          <CommentList comments={listComment}></CommentList>
        </div>

        <Carousel></Carousel>
      </div>
    </LayoutPostDetail>
  );
};

export default PostDetailPage;
