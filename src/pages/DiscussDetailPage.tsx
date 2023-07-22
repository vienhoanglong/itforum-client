import Avatar from "@/components/image/Avatar";
import { discuss, listComment, posts, topicColors } from "@/constants/global";
import LayoutDetail from "@/layout/LayoutDetail";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsEyeFill, BsFillChatFill } from "react-icons/bs";
import avt from "assets/avt1.jpg";
import CommentArea from "@/components/comment/CommentArea";
import CommentList from "@/components/comment/CommentList";
import ActionMenu from "@/modules/post/ActionMenu";
import { HiArrowCircleLeft, HiDotsHorizontal } from "react-icons/hi";
import ReportModal from "@/components/report/ReportModal";
import ListDiscussCard from "@/modules/discuss/ListDiscussCard";
import SliderDiscuss from "@/modules/discuss/SliderDiscuss";

const DiscussDetailPage: React.FC = () => {
  const [comment, setComment] = useState<string>("");
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const handleReportClick = () => {
    setReportModalOpen(true);
    setMenuOpen(false);
  };
  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
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
    <LayoutDetail otherChildren={<ListDiscussCard discuss={discuss} />}>
      <a
        className="dark:text-light0 rounded-full pr-1 link inline-flex items-center text-sm font-medium !text-grey-600 bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark1"
        href="/"
      >
        <HiArrowCircleLeft className="w-6 h-6 mr-1" />
        Back to discussion
      </a>
      <div className="relative flex flex-col px-4 py-4 mb-3 duration-300 cursor-pointer rounded-xl md:flex-row bg-light4 dark:bg-dark1">
        <div className="flex items-center self-start w-full mb-4 md:mr-5 md:mb-0 md:block md:w-auto">
          <div className="flex items-center">
            <a
              href=""
              className="flex items-center mr-3 brightness-90 w-14 h-14"
            >
              <Avatar
                src={avt}
                alt=""
                cln="rounded-[10px_!important] w-14 h-14 p-[1px] object-cover"
              />
            </a>
            <div className="flex flex-col">
              <strong className="block uppercase md:hidden text-xs dark:text-light0 ">
                Tran Hoang Long
              </strong>
              <span className="block md:hidden text-xs dark:text-light0 ">
                Publish: 10 hours ago
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center dark:text-light0 py-2 ml-auto rounded-xl bg-grey-400 md:hidden">
            <div className="flex items-center  px-3">
              <div className="mr-1">
                <BsFillChatFill className="text-lg " />
              </div>
              <span className="text-xs font-semibold leading-none text-grey-800">
                3
              </span>
            </div>
            <div className="flex items-center justify-center">
              <div className="mr-1">
                <BsEyeFill className="text-lg" />
              </div>
              <span className="text-xs font-medium leading-none text-left text-text1">
                2552
              </span>
            </div>
          </div>
        </div>
        <div className="w-full md:mb-0 lg:mt-1">
          <div className="flex flex-col justify-between">
            <div className=" flex justify-between">
              <div className=" mb-2 dark:text-light0 max-md:hidden">
                <div className=" text-xs font-bold text-grey-600">
                  By: Tran Hoang Long
                </div>
                <div className="text-xs font-normal text-grey-600">
                  Published: 10 hours ago
                </div>
              </div>
              <div className="relative hidden text-center md:ml-auto md:flex md:flex-row-reverse md:items-center gap-2 dark:text-light0">
                <div className="flex items-center justify-center ml-4">
                  <div className="mr-1">
                    <BsFillChatFill className="text-lg" />
                  </div>
                  <span className="relative text-xs font-medium leading-none text-left text-text1">
                    3
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <div className="mr-1">
                    <BsEyeFill className="text-lg" />
                  </div>
                  <span className="text-xs font-medium leading-none text-left text-text1">
                    2552
                  </span>
                </div>
              </div>
            </div>
            <div className="-mt-1 mb-2 dark:bg-dark0/80 p-4 rounded-lg md:flex md:items-start">
              <h3 className="tracking-normal md:pr-6 lg:mb-0 dark:text-light0">
                <a href="" className="text-base font-semibold">
                  Deploy ứng dụng NodeJS lên EC2 instance của AWS (Phần 1)
                </a>
              </h3>
            </div>
            <div className=" text-black/90 dark:text-light0 lg:mb-0 lg:pr-8 text-xs">
              Ở bài viết này mình sẽ hướng dẫn các bạn cách để deploy đơn giản 1
              ứng dụng NodeJS có kết nối với MongoDB lên AWS Ở bài viết này mình
              sẽ hướng dẫn các bạn cách để deploy đơn giản 1 ứng dụng NodeJS có
              kết nối với MongoDB lên AWS Ở bài viết này mình sẽ hướng dẫn các
              bạn cách để deploy đơn giản 1 ứng dụng NodeJS có kết nối với
              MongoDB lên AWS Ở bài viết này mình sẽ hướng dẫn các bạn cách để
              deploy đơn giản 1 ứng dụng NodeJS có kết nối với MongoDB lên AWS Ở
              bài viết này mình sẽ hướng dẫn các bạn cách để deploy đơn giản 1
              ứng dụng NodeJS có kết nối với MongoDB lên AWS
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="">
                <div
                  className={`inline-block border-2 px-2 py-[2px] rounded-full m-[1px] text-[10px]
                        ${topicColors["NodeJs"] || ""}`}
                >
                  NodeJs
                </div>
                <div
                  className={`inline-block border-2 px-2 py-[2px] rounded-full m-[1px] text-[10px]
                        ${topicColors["JavaScript"] || ""}`}
                >
                  JavaScript
                </div>
              </div>
              <div ref={menuRef}>
                <button
                  className="bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 rounded-full px-2 py-1"
                  onClick={handleMenuToggle}
                >
                  <HiDotsHorizontal size={10} className="w-4 h-4" />
                </button>
                {isMenuOpen && (
                  <ActionMenu
                    handleReportClick={handleReportClick}
                  ></ActionMenu>
                )}
                {isReportModalOpen && (
                  <ReportModal closeModal={handleCloseModal} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mx-auto mt-2 rounded-lg bg-white dark:bg-dark1 p-4">
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

      <SliderDiscuss></SliderDiscuss>
    </LayoutDetail>
  );
};
export default DiscussDetailPage;
