import React, { useEffect, useRef, useState } from "react";
import Thumbnail from "../assets/header-image-post-detail.png";

import {
  content,
  exampleDataTopic,
  posts,
  topicColors,
} from "@/constants/global";
import LayoutDetail from "@/layout/LayoutDetail";
import Carousel from "@/modules/post/Carousel";
import PostHeader from "@/modules/post/PostHeader";
import PostContent from "@/modules/post/PostContent";
import ListPostCard from "@/modules/post/ListPostCard";

export const PostDetailPage: React.FC = () => {
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

  // const [comment, setComment] = useState<string>("");

  // const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
  //   setComment(event.target.value);
  // };

  // const handleCommentSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // Xử lý logic khi người dùng gửi bình luận
  //   console.log("Bình luận đã được gửi:", comment);
  //   setComment("");
  // };

  return (
    <LayoutDetail
      otherChildren={
        <ListPostCard
          topicName={["nodejs", "javascript"]}
          numTopicsToShow={5}
          posts={posts}
        ></ListPostCard>
      }
    >
      <div className="z-10 md:w-full pb-2 bg-light4 dark:bg-dark1 dark:text-light0 rounded-lg p-8">
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
          {/* <CommentArea
            // avatar="https://via.placeholder.com/50"
            // handleCommentChange={handleCommentChange}
            // handleCommentSubmit={handleCommentSubmit}
            // setComment={setComment}
            menuRef={menuRef}
            // comment={comment}
          /> */}
          {/* 
          <CommentList comments={listComment}></CommentList> */}
        </div>

        <Carousel></Carousel>
      </div>
    </LayoutDetail>
  );
};

export default PostDetailPage;
