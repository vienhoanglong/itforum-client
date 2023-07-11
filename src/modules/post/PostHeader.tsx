import {
  HiArrowCircleLeft,
  HiDotsHorizontal,
  HiFlag,
  HiTrash,
  HiEyeOff,
} from "react-icons/hi";
import { BsEyeFill, BsMessenger } from "react-icons/bs";
import ReportModal from "@/components/report/ReportModal";
import TopicList from "./TopicList";
import ActionMenu from "./ActionMenu";

type PostHeaderProps = {
  menuRef: React.RefObject<HTMLDivElement>;
  handleMenuToggle: () => void;
  isMenuOpen: boolean;
  handleReportClick: () => void;
  handleCloseModal: () => void;
  isReportModalOpen: boolean;
  Thumbnail: string;
  exampleDataTopic: { id: number; name: string }[];
  topicColors: Record<string, string>;
  view: number;
  comment: number;
  title: string;
  author: string;
  datePublish: string;
};

const PostHeader: React.FC<PostHeaderProps> = ({
  author,
  datePublish,
  menuRef,
  handleMenuToggle,
  handleCloseModal,
  isMenuOpen,
  handleReportClick,
  isReportModalOpen,
  Thumbnail,
  exampleDataTopic,
  topicColors,
  view,
  comment,
  title,
}) => {
  return (
    <div className="header grid grid-cols-1">
      <div className="mb-4 flex justify-between">
        <a
          className="dark:text-light0 rounded-full pr-1 link inline-flex items-center text-sm font-medium !text-grey-600 bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0"
          href="/"
        >
          <HiArrowCircleLeft className="w-6 h-6 mr-1" />
          Back to Posts
        </a>
        <div className="flex items-center ml-auto mr-2">
          <BsEyeFill />
          <span className="ml-1">{view}</span>
        </div>
        <div className="flex items-center mr-4">
          <BsMessenger />
          <span className="ml-1">{comment}</span>
        </div>
        <div className="w-auto relative" ref={menuRef}>
          <button
            className="bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 rounded-full px-2 py-1"
            onClick={handleMenuToggle}
          >
            <HiDotsHorizontal size={10} className="w-5 h-5" />
          </button>
          {isMenuOpen && (
            <ActionMenu handleReportClick={handleReportClick}></ActionMenu>
          )}
          {isReportModalOpen && <ReportModal closeModal={handleCloseModal} />}
        </div>
      </div>
      <div className="">
        <h1 className="h-auto mt-4 mb-2 text-4xl font-bold leading-tighter text-dark0 dark:text-light0">
          {title}
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
          <div className="text-sm font-bold text-grey-600">By: {author}</div>
          <div className="text-xs font-normal text-grey-600">
            Published {datePublish}
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
      <TopicList
        exampleDataTopic={exampleDataTopic}
        topicColors={topicColors}
      ></TopicList>
    </div>
  );
};

export default PostHeader;
