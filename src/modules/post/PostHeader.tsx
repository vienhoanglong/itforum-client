import { HiDotsHorizontal } from "react-icons/hi";
import { BsEyeFill, BsMessenger } from "react-icons/bs";
import ReportModal from "@/components/report/ReportModal";
import TopicList from "./TopicList";
import ActionMenu from "./ActionMenu";
import Topic from "@/interface/topic";
import Navigation from "@/components/navigation/Navigation";
import { colorsAvatar } from "@/constants/global";
import IPost from "@/interface/post";
import IUser from "@/interface/user";
import convertDateTime from "@/utils/helper";
import { Link } from "react-router-dom";

type PostHeaderProps = {
  menuRef: React.RefObject<HTMLDivElement>;
  handleMenuToggle: () => void;
  isMenuOpen: boolean;
  handleReportClick: () => void;
  handleCloseModal: () => void;
  isReportModalOpen: boolean;

  listTopic: Topic[] | null;
  post: IPost | null;
  user: IUser | null;
};

const PostHeader: React.FC<PostHeaderProps> = ({
  menuRef,
  handleMenuToggle,
  handleCloseModal,
  isMenuOpen,
  handleReportClick,
  isReportModalOpen,
  listTopic,
  post,
  user,
}) => {
  const getColorUser = (color: string): string => {
    const result = colorsAvatar.find((item) => item.color === color);
    return result?.value ?? "bg-white";
  };
  const formatDate = "MM-DD-YYYY";
  return (
    <div className="header grid grid-cols-1">
      <div className="mb-4 flex justify-between">
        <Navigation></Navigation>
        <div className="flex items-center ml-auto mr-2">
          <BsEyeFill />
          <span className="ml-1">{post?.totalView}</span>
        </div>
        <div className="flex items-center mr-4">
          <BsMessenger />
          <span className="ml-1">{0}</span>
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
        <h1 className="h-auto mt-4 mb-2 text-2xl font-bold leading-tighter text-dark0 dark:text-light0">
          {post?.title}
        </h1>
      </div>
      <div className="w-full flex flex-col-3 items-center">
        <div className=" w-8 h-8 rounded-full overflow-hidden">
          <img
            src={user?.avatar}
            alt="Avatar"
            className={`w-full h-full object-cover brightness-90 ${getColorUser(
              user?.color ?? ""
            )}`}
          />
        </div>
        <div className=" py-2 px-2">
          <div className="text-sm font-semibold text-grey-600">
            <Link
              to={`/user/${user?._id}`}
              className=" hover:text-mainColor cursor-pointer"
            >
              {user?.fullName ?? user?.username}
            </Link>
          </div>
          <div className="text-xs font-normal text-grey-600">
            Published{" "}
            {post && convertDateTime(post.createdAt.toString(), formatDate)}
          </div>
        </div>
      </div>
      <div className="flex justify-center overflow-hidden">
        <img
          src={post?.thumbnail}
          alt="Thumbnail"
          className="w-full rounded-xl max-w-full max-h-[200px] object-cover"
          loading="lazy"
        />
      </div>
      <div className="w-full my-2 flex flex-wrap">
        <TopicList listTopic={listTopic != null ? listTopic : []}></TopicList>
      </div>
    </div>
  );
};

export default PostHeader;
