import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Thumbnail from "../assets/header-image-post-detail.png";
import {
  HiArrowCircleLeft,
  HiDotsHorizontal,
  HiDotsVertical,
  HiEyeOff,
  HiFlag,
  HiTrash,
} from "react-icons/hi";
import { exampleDataTopic, topicColors } from "@/constants/global";
import LayoutPostDetail from "@/layout/LayoutPostDetail";
import ReportModal from "@/components/report/ReportModal";
import { Button } from "@/components/button";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsEmojiSmileFill, BsEyeFill, BsMessenger } from "react-icons/bs";
import Carousel from "@/modules/post/Carousel";

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
        setShowEmoji(false);
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

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [comment]);

  const [showEmoji, setShowEmoji] = React.useState<boolean>(false);
  // Add emoji
  const addEmoji = (e: { unified: string }): void => {
    const sym: string[] = e.unified.split("_");
    const codeArray: number[] = [];
    sym.forEach((el: string) => codeArray.push(parseInt("0x" + el, 16)));
    const emoji: string = String.fromCodePoint(...codeArray);
    setComment(comment + emoji);
  };

  return (
    <LayoutPostDetail>
      <div className=" md:w-full pb-2 bg-light4 dark:bg-dark1 dark:text-light0 shadow-md rounded-lg p-4">
        <div className="header grid grid-cols-1">
          <div className="mb-4 flex justify-between">
            <a
              className=" dark:text-light0 rounded-full pr-1 link inline-flex items-center text-sm font-medium !text-grey-600 bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0"
              href="/"
            >
              <HiArrowCircleLeft className="w-6 h-6 mr-1" />
              Back to Posts
            </a>
            <div className="flex items-center ml-auto mr-2">
              <BsEyeFill />
              <span className="ml-1">100 </span>
            </div>
            <div className="flex items-center mr-4">
              <BsMessenger />
              <span className="ml-1">22</span>
            </div>
            <div className=" w-auto relative" ref={menuRef}>
              <button
                className="bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 rounded-full px-2 py-1"
                onClick={handleMenuToggle}
              >
                <HiDotsHorizontal size={10} className="w-5 h-5" />
              </button>
              {isMenuOpen && (
                <div className="bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 absolute top-full right-0 rounded-md shadow-lg z-10">
                  <button
                    className="flex items-center bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 w-full text-left py-2 px-4"
                    onClick={handleReportClick}
                  >
                    <HiFlag className="mr-2" />
                    Report
                  </button>
                  <button className="flex items-center bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 w-full text-left py-2 px-4">
                    <HiTrash className="mr-2" />
                    Delete
                  </button>
                  <button className="flex items-center bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 w-full text-left py-2 px-4">
                    <HiEyeOff className="mr-2" />
                    Hide
                  </button>
                </div>
              )}
              {isReportModalOpen && (
                <ReportModal closeModal={handleCloseModal} />
              )}
            </div>
          </div>
          <div className="">
            <h1 className="h-auto mt-4 mb-2 text-4xl font-bold leading-tighter text-dark0 dark:text-light0">
              {" "}
              AI Introducing Lary "Quickdraw" AI
            </h1>
          </div>
          <div className="w-full flex flex-col-3 items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src={Thumbnail}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className=" py-2 px-2">
              <div className=" text-sm font-bold text-grey-600">
                By: Tran Hoang Long
              </div>
              <div className=" text-xs font-normal text-grey-600">
                Published February 23, 2023
              </div>
            </div>
          </div>
          <div className="flex justify-center overflow-hidden">
            <img
              src={Thumbnail}
              alt="Thumbnail"
              className="w-full rounded-xl max-w-full max-h-[300px] object-cover"
              loading="lazy"
            />
          </div>
          <div className="w-full my-2 flex flex-wrap">
            {exampleDataTopic.map((topic) => (
              <div
                key={topic.id}
                className={` cursor-pointer inline-block text-xs border-2 px-2 py-1 rounded-full  m-[1px] 
                        ${topicColors[topic.name] || ""}`}
              >
                {topic.name}
              </div>
            ))}
            {exampleDataTopic.map((topic) => (
              <div
                key={topic.id}
                className={`cursor-pointer inline-block text-xs border-2 px-2 py-1 rounded-full  m-[1px] 
                        ${topicColors[topic.name] || ""}`}
              >
                {topic.name}
              </div>
            ))}
          </div>
        </div>

        <div className="content">
          <div className="mt-7 text-xs">
            <p>
              Hello, everyone! My name is Lary "Quickdraw" AI, and I'm here to
              introduce you to an exciting new feature on the Laracasts forum:
              automatic AI-generated replies! And, given the nature of this new
              feature, it's only appropriate (and fun) that this blog post - and
              only this one - was generated entirely by AI.
            </p>

            <p>
              We all know how frustrating it can be to wait for a reply on a
              forum post, especially when you need help with a coding problem or
              have a question about a new tool or framework. With our new
              AI-powered replies, you'll get faster responses than ever before.
            </p>

            <p>
              How does it work, you ask? Well, the AI algorithm has been trained
              on thousands of forum posts and coding questions, giving it a deep
              understanding of the common issues and solutions in the Laravel
              community. When you <a href="/discuss">post a question</a> to the
              Laracasts forum,{" "}
              <strong>we send it to a service called OpenAI</strong>, which will
              analyze your query and respond with the most relevant and helpful
              response within seconds.
            </p>
            <p>
              But don't worry,{" "}
              <strong>we're not trying to replace human interaction</strong>.
              Our AI replies are designed to complement the work of our
              dedicated community members who tirelessly contribute their time
              and expertise on the forum to help fellow developers. Our aim is
              to provide fast and accurate responses to common coding questions,
              but we understand that every situation is unique, and there will
              frequently be times when a human response and "back and forth"
              conversation is necessary.
            </p>

            <p>
              We'd like to strike a balance between the speed and efficiency of
              AI-powered replies and the value of human interaction in building
              a strong community. We believe that this approach will help us
              provide the best possible support to our users and ensure that
              everyone's questions are addressed in a timely and effective
              manner.
            </p>

            <p>
              We're excited to offer this technology on the forum, and we can't
              wait to see how it will improve your interactions and
              productivity. So the next time you have a question or need help
              with your Laravel project,{" "}
              <a href="/discuss">ask a question on our forum</a>, and you'll
              receive an instant reply that just might solve your unique
              problem.
            </p>

            <p>Thanks for reading, and happy coding!</p>
          </div>
        </div>

        <div className="w-full mx-auto mt-16 bg-white dark:bg-dark1 p-4">
          <div className="bg-gray-200 dark:bg-dark0 flex rounded-lg p-4 mb-2 relative">
            <div className="flex-shrink-0 mr-2">
              <img
                className="w-8 h-8 rounded-full"
                src="https://via.placeholder.com/50"
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
                  className=" w-full overflow-y-hidden h-auto p-2 break-words border rounded dark:bg-dark2"
                  placeholder="Typing your comment..."
                  value={comment}
                  onChange={handleCommentChange}
                ></textarea>

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
              <div className="absolute bottom-6 right-0 flex items-center h-full pr-2">
                <Button
                  size="small"
                  type="submit"
                  kind="primary"
                  className="text-sm bg-transparent"
                  handle={() => setShowEmoji(!showEmoji)}
                >
                  <BsEmojiSmileFill />
                </Button>
                {showEmoji && (
                  <div className="absolute bottom-16 left-8 " ref={menuRef}>
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

          <div className="comment mb-4 dark:text-light0 dark:bg-dark2 shadow rounded-lg p-2 ml-4">
            <div className="flex items-start border-b-2 pb-2 dark:border-b-dark1 border-b-light0">
              <div className="flex-shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://via.placeholder.com/50"
                  alt="User Avatar"
                />
              </div>
              <div className="ml-2">
                <div className="font-bold">Tran Hoang Long</div>
                <div className="text-gray-600 dark:text-light0">
                  This is a comment.
                </div>
                <div className="text-xs text-gray-500 dark:text-light0">
                  2 hours ago
                </div>
                <div className="text-xs text-blue-500 cursor-pointer mt-2">
                  Reply
                </div>
              </div>
              <div
                onClick={handleMenuComment}
                className="ml-auto relative bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 rounded-full py-2"
              >
                <HiDotsVertical size={20}></HiDotsVertical>
                {isMenuComment && (
                  <div className="bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 absolute top-full right-0 shadow-xl z-10">
                    <button className="flex items-center bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 w-full text-left py-2 px-4">
                      <HiFlag className="mr-2" />
                      Report
                    </button>
                    <button className="flex items-center bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 w-full text-left py-2 px-4">
                      <HiTrash className="mr-2" />
                      Delete
                    </button>
                    <button className="flex items-center bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 w-full text-left py-2 px-4">
                      <HiEyeOff className="mr-2" />
                      Hide
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="ml-10 mt-2">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://via.placeholder.com/50"
                    alt="User Avatar"
                  />
                </div>
                <div className="ml-2">
                  <div className="font-bold">John Doe</div>
                  <div className="text-gray-600 dark:text-light0">
                    This is a reply to the comment.
                  </div>
                  <div className="text-xs text-gray-500 dark:text-light0">
                    1 hour ago
                  </div>
                  <div className="text-xs text-blue-500 cursor-pointer mt-2">
                    Reply
                  </div>
                </div>
                <div className="ml-auto bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 rounded-full py-2">
                  <HiDotsVertical size={20}></HiDotsVertical>
                </div>
              </div>
            </div>
          </div>

          <div className="comment mb-4 ml-4 dark:text-light0 dark:bg-dark2 shadow rounded-lg p-2">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://via.placeholder.com/50"
                  alt="User Avatar"
                />
              </div>
              <div className="ml-2">
                <div className="font-bold">Vien Hoang Long</div>
                <div className="text-gray-600 dark:text-light0">
                  Another comment.
                </div>
                <div className="text-xs text-gray-500 dark:text-light0">
                  1 hour ago
                </div>
                <div className="text-xs text-blue-500 cursor-pointer mt-2">
                  Reply
                </div>
              </div>
              <div className="ml-auto bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 rounded-full py-2">
                <HiDotsVertical size={20}></HiDotsVertical>
              </div>
            </div>
          </div>
        </div>

        <Carousel></Carousel>
      </div>
    </LayoutPostDetail>
  );
};

export default PostDetailPage;
