import Avatar from "@/components/image/Avatar";
import { colorTopic, colorsAvatar } from "@/constants/global";
import LayoutDetail from "@/layout/LayoutDetail";
import React, { useEffect, useRef, useState } from "react";
import { BsEyeFill, BsFillChatFill } from "react-icons/bs";
import CommentArea from "@/components/comment/CommentArea";
import ActionMenu from "@/modules/post/ActionMenu";
import { HiArrowCircleLeft, HiDotsHorizontal } from "react-icons/hi";
import ReportModal from "@/components/report/ReportModal";
import ListDiscussCard from "@/modules/discuss/ListDiscussCard";
import SliderDiscuss from "@/modules/discuss/SliderDiscuss";
import { useDiscussionStore } from "@/store/discussionStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import convertDateTime from "@/utils/helper";
import { useTopicStore } from "@/store/topicStore";
import { useUserStore } from "@/store/userStore";
import {
  getDiscussionById,
  incrementView,
  moveTrashOrRestore,
  updateStatusDiscussion,
} from "@/services/discussionService";
import ICommentCreate from "@/interface/API/ICommentCreate";
import IComment from "@/interface/comment";
import Topic from "@/interface/topic";
import {
  CreateNewComment,
  UpdatedComment,
  deleteComment,
  getListCommentById,
} from "@/services/commentService";
import { toast } from "react-toastify";
import ConfirmDialog from "@/components/confirm/ConfirmDialog";
import Modal from "@/components/modal/Modal";
import IDiscussion from "@/interface/discussion";
import LayoutSecondary from "@/layout/LayoutSecondary";
import Comments from "@/components/comment/Comments";
import { useCommentStore } from "@/store/commentStore";
import Navigation from "@/components/navigation/Navigation";

const DiscussDetailPage: React.FC = React.memo(() => {
  const { discussId } = useParams<{ discussId: string }>();
  const navigate = useNavigate();
  const { listDiscuss, getListDiscussion } = useDiscussionStore();
  const [discussion, setDiscussion] = useState<IDiscussion | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { listAllTopic, getTopic } = useTopicStore();
  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const { user, userById, getById } = useUserStore();
  const [state, setState] = useState(false);
  const [isModalOpenDialog, setIsModalOpenDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [confirmMessage, setConfirmMessage] = useState("");

  const handleBack = () => {
    navigate(-1);
  };
  const formatDate = "MM-DD-YYYY";

  const viewedDiscussionIdsKey = user?._id
    ? `viewedDiscussionIds_${user._id}`
    : "";
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

  const handleReportClick = () => {
    setReportModalOpen(true);
    setMenuOpen(false);
  };
  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleCloseModal = () => {
    setReportModalOpen(false);
    setIsModalOpenDialog(false);
  };

  useEffect(() => {
    const fectData = async () => {
      const response = discussId && (await getListCommentById(discussId, 0, 0));
      if (response) {
        setParentComment(response.data);
      }
    };
    fectData();
  }, []);

  useEffect(() => {
    getTopic();
    getListDiscussion(0, 0, "desc");
    const fetchData = async () => {
      const response = discussId && (await getDiscussionById(discussId));
      if (response) {
        getById(response?.createBy);
        setDiscussion(response);
        if (viewedDiscussionIdsKey !== "") {
          const viewedDiscussionIdsString = localStorage.getItem(
            viewedDiscussionIdsKey
          );
          if (viewedDiscussionIdsString === null) {
            discussId && incrementView(discussId);
            discussId &&
              localStorage.setItem(
                `viewedDiscussionIds_${user?._id}`,
                JSON.stringify([discussId])
              );
            setIncrement(!increment);
          } else {
            const initialViewedDiscussionIds =
              viewedDiscussionIdsString != null
                ? JSON.parse(viewedDiscussionIdsString)
                : [];
            if (
              !initialViewedDiscussionIds.includes(discussId ? discussId : "")
            ) {
              discussId && incrementView(discussId);
              localStorage.setItem(
                `viewedDiscussionIds_${user?._id}`,
                JSON.stringify([...initialViewedDiscussionIds, discussId])
              );
              setIncrement(!increment);
            }
          }
        }
      }
    };
    fetchData();
  }, [discussId, user?._id, increment, state]);

  //Menu
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

  //Create a new comment
  const handleCommentSubmit = async (data: ICommentCreate) => {
    const reponse = await CreateNewComment(data);
    if (data.commentParentId === undefined) {
      setParentComment([reponse.data, ...parentComment]);
    }
  };
  //Delete comment
  const handleDeleteCmt = async (commentId: string) => {
    handleConfirm(async () => {
      try {
        discussId && (await deleteComment(discussId, commentId));
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

  const getColorAvatar = userById
    ? colorsAvatar.find((item) => item.color === userById.color)
    : null;
  const colorAvatar = getColorAvatar ? getColorAvatar.value : "";

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
  const handleDelete = async () => {
    handleConfirm(async () => {
      try {
        discussId && (await moveTrashOrRestore(discussId));
        setState(!state);
        toast.success(" Deleted discuss successfully! ", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } catch (err) {
        console.log("error delete discussion");
      }
    }, "Bạn có chắc muốn xoá không?");
  };
  const handleRestore = async () => {
    handleConfirm(async () => {
      try {
        discussId && (await moveTrashOrRestore(discussId));
        setState(!state);
        toast.success(" Restore discuss successfully! ", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } catch (err) {
        console.log("error restore discussion");
      }
    }, "Bạn có chắc muốn khôi phục không?");
  };
  const handleHidden = async () => {
    handleConfirm(async () => {
      try {
        discussId && (await updateStatusDiscussion(discussId, 3));
        setState(!state);
        toast.success(" Discussion is hidden! ", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } catch (err) {
        console.log("error hidden discussion");
      }
    }, "Bạn có chắc muốn ẩn không?");
  };
  const handlePublish = async () => {
    handleConfirm(async () => {
      try {
        discussId && (await updateStatusDiscussion(discussId, 1));
        setState(!state);
        toast.success(" Discussion is published! ", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } catch (err) {
        console.log("error publish discussion");
      }
    }, "Bạn có chắc muốn ẩn không?");
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

  if (
    !discussion ||
    (discussion.statusDiscuss === 3 && user?._id != discussion.createBy) ||
    (discussion.statusDiscuss === 2 && user?._id != discussion.createBy) ||
    (discussion.statusDiscuss === 0 && user?._id != discussion.createBy) ||
    (discussion.isDraft === true && user?._id != discussion.createBy) ||
    (discussion.statusDiscuss === 3 && user?.role !== 0) ||
    (discussion.statusDiscuss === 2 && user?.role !== 0) ||
    (discussion.statusDiscuss === 0 && user?.role !== 0) ||
    (discussion.isDraft === true && user?.role !== 0)
  ) {
    return (
      <LayoutSecondary>
        <div className="w-full h-full text-center flex flex-col text-lg font-bold p-10 gap-4">
          <span>Discussion not found!</span>
          <div>
            <button
              className="dark:text-light0 rounded-full mb-4 pr-1 link inline-flex items-center text-sm font-medium !text-grey-600 bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark1"
              onClick={handleBack}
            >
              <HiArrowCircleLeft className="w-6 h-6 mr-1" />
              Back
            </button>
          </div>
        </div>
      </LayoutSecondary>
    );
  }
  return (
    <LayoutDetail
      otherChildren={
        <ListDiscussCard
          listTopic={discussion ? discussion.topic : ""}
          numTopicsToShow={5}
          discussId={discussId != undefined ? discussId : ""}
        />
      }
    >
      <Navigation></Navigation>
      <div className="relative flex flex-col px-4 py-4 mb-3 duration-300 rounded-xl md:flex-row bg-light4 dark:bg-dark1">
        <div className="flex items-center self-start w-full mb-4 md:mr-5 md:mb-0 md:block md:w-auto">
          <div className="flex items-center">
            <Link
              to={`/user/${userById}`}
              className="flex items-center mr-3 brightness-90 w-14 h-14"
            >
              <Avatar
                src={userById?.avatar ?? ""}
                alt=""
                cln={`rounded-[10px_!important] w-14 h-14 p-[1px] object-cover ${colorAvatar}`}
              />
            </Link>
            <div className="flex flex-col">
              <strong className="block uppercase md:hidden text-xs dark:text-light0 ">
                <Link
                  to={`/user/${userById}`}
                  className=" hover:text-mainColor cursor-pointer"
                >
                  By: {userById?.fullName ?? userById?.username}
                </Link>
              </strong>
              <span className="block md:hidden text-[10px] dark:text-light0 ">
                Published:{" "}
                {discussion?.createdAt
                  ? convertDateTime(discussion.createdAt.toString(), formatDate)
                  : ""}
              </span>
              <div className="text-xs md:hidden font-normal text-grey-600">
                {discussion.isDraft === true ? (
                  <div className=" inline-block bg-red-500 text-[10px] px-[2px] text-white rounded-md">
                    deleted
                  </div>
                ) : (
                  (() => {
                    switch (discussion?.statusDiscuss) {
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
                {discussion?.totalView}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full md:mb-0 lg:mt-1">
          <div className="flex flex-col justify-between">
            <div className=" flex justify-between">
              <div className=" mb-2 dark:text-light0 max-md:hidden">
                <div className=" text-xs font-bold text-grey-600">
                  <Link
                    to={`/user/${userById}`}
                    className=" hover:text-mainColor cursor-pointer"
                  >
                    By: {userById?.fullName ?? userById?.username}
                  </Link>
                </div>
                <div className="text-[10px] font-normal text-grey-600">
                  Published:{" "}
                  {discussion?.createdAt
                    ? convertDateTime(
                        discussion.createdAt.toString(),
                        formatDate
                      )
                    : ""}
                </div>
                <div className="text-xs font-normal text-grey-600">
                  {discussion.isDraft === true ? (
                    <div className=" inline-block bg-red-500 text-[10px] px-[2px] text-white rounded-md">
                      deleted
                    </div>
                  ) : (
                    (() => {
                      switch (discussion?.statusDiscuss) {
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
                    {discussion?.totalView}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-1 mb-3 dark:bg-dark0/80 bg-light2/80 p-4 rounded-lg md:flex md:items-start">
              <h3 className="tracking-normal md:pr-6 lg:mb-0 dark:text-light0">
                <div className=" text-sm font-semibold">
                  {discussion?.title}
                </div>
              </h3>
            </div>
            <div className=" text-black/90 dark:text-light0 lg:mb-0 lg:pr-8 text-xs">
              {discussion?.content}
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex justify-start items-center">
                {discussion?.topic.map((topicId) => {
                  const topic: Topic | undefined = listAllTopic?.find(
                    (topic) => topic._id === topicId
                  );
                  if (topic) {
                    return (
                      <Link key={topic._id} to={`/topics/detail/${topic._id}`}>
                        <div
                          className={`inline-block border-2 px-2 py-[2px] rounded-full m-[1px] text-[10px] ${
                            colorTopic[
                              topic.color as keyof typeof colorTopic
                            ] || ""
                          }`}
                        >
                          {topic.name}
                        </div>
                      </Link>
                    );
                  }
                  return null;
                })}
              </div>

              <div ref={menuRef}>
                <button
                  className="bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 rounded-full px-2 py-1"
                  onClick={handleMenuToggle}
                >
                  <HiDotsHorizontal size={10} className="w-4 h-4" />
                </button>
                {isMenuOpen && discussion.statusDiscuss !== 0 && (
                  <ActionMenu
                    handleReportClick={handleReportClick}
                    handleHidden={handleHidden}
                    handleDeleted={handleDelete}
                    userCurrentId={user}
                    userOwnerId={userById}
                    handlePublish={handlePublish}
                    handleRestore={handleRestore}
                    status={discussion.statusDiscuss}
                    isDraft={discussion.isDraft}
                  ></ActionMenu>
                )}
                {isReportModalOpen && (
                  <ReportModal
                    idRefer={discussion._id}
                    userId={
                      user !== undefined && user !== null ? user._id || "" : ""
                    }
                    reportFor={"Discuss"}
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
          </div>
        </div>
      </div>
      <div className="w-full mx-auto mt-2 rounded-lg bg-white dark:bg-dark1 p-4">
        <CommentArea
          onSaveChanges={handleCommentSubmit}
          menuRef={menuRef}
          discussionId={discussId ? discussId : ""}
          parentId={null}
          postsId={null}
        />
        {parentComment.map((comment) => (
          <Comments
            postsId={null}
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
            discussId={discussId ? discussId : ""}
            comment={comment}
          ></Comments>
        ))}
      </div>

      <SliderDiscuss
        listTopic={discussion ? discussion.topic : ""}
        listDiscussion={listDiscuss}
        discussId={discussId != undefined ? discussId : ""}
      ></SliderDiscuss>
    </LayoutDetail>
  );
});
export default DiscussDetailPage;
