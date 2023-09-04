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
import { useUserStore } from "@/store/userStore";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  changeStatusPost,
  moveTrashOrRestorePost,
} from "@/services/postService";
import Modal from "@/components/modal/Modal";
import ConfirmDialog from "@/components/confirm/ConfirmDialog";

type PostHeaderProps = {
  menuRef: React.RefObject<HTMLDivElement>;
  handleMenuToggle: () => void;
  isMenuOpen: boolean;
  handleReportClick: () => void;
  handleCloseModal: () => void;
  isReportModalOpen: boolean;
  postStatus: boolean;
  setPostStatus: React.Dispatch<React.SetStateAction<boolean>>;
  listTopic: Topic[] | null;
  post: IPost | null;
  userOwner: IUser | null;
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
  userOwner,
  setPostStatus,
  postStatus,
}) => {
  const { user } = useUserStore();
  const getColorUser = (color: string): string => {
    const result = colorsAvatar.find((item) => item.color === color);
    return result?.value ?? "bg-white";
  };
  const formatDate = "MM-DD-YYYY";
  const [isModalOpenDialog, setIsModalOpenDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [confirmMessage, setConfirmMessage] = useState("");
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
  const handleHidden = async () => {
    handleConfirm(async () => {
      try {
        post && (await changeStatusPost(post._id, 3));
        setPostStatus(!postStatus);
        toast.success(" Post is hidden! ", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } catch (err) {
        console.log("error hidden posts");
      }
    }, "Bạn có chắc muốn ẩn không?");
  };
  const handlePublish = async () => {
    handleConfirm(async () => {
      try {
        post && (await changeStatusPost(post._id, 1));
        setPostStatus(!postStatus);
        toast.success(" Post is published! ", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } catch (err) {
        console.log("error publish posts");
      }
    }, "Bạn có chắc muốn công khai không?");
  };
  const handleDelete = async () => {
    handleConfirm(async () => {
      try {
        post && (await moveTrashOrRestorePost(post._id));
        setPostStatus(!postStatus);
        toast.success(" Deleted post successfully! ", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } catch (err) {
        console.log("error delete posts");
      }
    }, "Bạn có chắc muốn xoá không?");
  };
  const handleRestore = async () => {
    handleConfirm(async () => {
      try {
        post && (await moveTrashOrRestorePost(post._id));
        setPostStatus(!postStatus);
        toast.success(" Restore post successfully! ", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } catch (err) {
        console.log("error restore posts");
      }
    }, "Bạn có chắc muốn khôi phục không?");
  };
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
          {post?.status !== 0 && (
            <button
              className="bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 rounded-full px-2 py-1"
              onClick={handleMenuToggle}
            >
              <HiDotsHorizontal size={10} className="w-5 h-5" />
            </button>
          )}

          {isMenuOpen && (
            <ActionMenu
              handleRestore={handleRestore}
              isDraft={post?.isDraft}
              status={post?.status}
              handlePublish={handlePublish}
              handleDeleted={handleDelete}
              handleHidden={handleHidden}
              userCurrentId={user}
              userOwnerId={userOwner}
              handleReportClick={handleReportClick}
            ></ActionMenu>
          )}
          {isReportModalOpen && (
            <ReportModal
              idRefer={post != null ? post._id : ""}
              reportFor={"Posts"}
              userId={user !== undefined && user !== null ? user._id || "" : ""}
              closeModal={handleCloseModal}
            />
          )}
          {isModalOpenDialog && (
            <Modal isOpen={isModalOpenDialog} onClose={handleCloseModal}>
              <ConfirmDialog
                message={confirmMessage}
                onConfirm={handleConfirmAction}
                onCancel={handleCloseModal}
              />
            </Modal>
          )}
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
            src={userOwner?.avatar}
            alt="Avatar"
            className={`w-full h-full object-cover brightness-90 ${getColorUser(
              userOwner?.color ?? ""
            )}`}
          />
        </div>
        <div className=" py-2 px-2">
          <div className="text-xs gap-1 flex font-semibold text-grey-600">
            <Link
              to={`/user/${userOwner?._id}`}
              className=" hover:text-mainColor cursor-pointer"
            >
              <div> {userOwner?.fullName ?? userOwner?.username}</div>
            </Link>
            <span>:</span>
            <span>
              {" "}
              {post && convertDateTime(post.createdAt.toString(), formatDate)}
            </span>
          </div>
          <div className="text-xs font-normal text-grey-600">
            {post?.isDraft === true ? (
              <div className=" inline-block bg-red-500 text-[10px] px-[2px] text-white rounded-md">
                Deleted
              </div>
            ) : (
              (() => {
                switch (post?.status) {
                  case 0:
                    return (
                      <div className=" inline-block bg-amber-500 text-[10px] px-[2px] text-white rounded-md">
                        Pending
                      </div>
                    );
                  case 1:
                    return (
                      <div className="inline-block bg-green-400 text-white text-[10px] px-[2px] rounded-md">
                        Publish
                      </div>
                    );
                  case 2:
                    return (
                      <div className=" inline-block bg-red-400 text-white text-[10px] px-[2px] rounded-md">
                        Rejected
                      </div>
                    );
                  case 3:
                    return (
                      <div className="inline-block bg-cyan-400 text-white text-[10px] px-[2px] rounded-md">
                        Hidden
                      </div>
                    );
                  default:
                    return null;
                }
              })()
            )}
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
