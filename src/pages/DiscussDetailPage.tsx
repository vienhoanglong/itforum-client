import Avatar from "@/components/image/Avatar";
import { colorTopic, colorsAvatar } from "@/constants/global";
import LayoutDetail from "@/layout/LayoutDetail";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsEyeFill, BsFillChatFill } from "react-icons/bs";
import CommentArea from "@/components/comment/CommentArea";
import CommentList from "@/components/comment/CommentList";
import ActionMenu from "@/modules/post/ActionMenu";
import { HiArrowCircleLeft, HiDotsHorizontal } from "react-icons/hi";
import ReportModal from "@/components/report/ReportModal";
import ListDiscussCard from "@/modules/discuss/ListDiscussCard";
import SliderDiscuss from "@/modules/discuss/SliderDiscuss";
import { useDiscussionStore } from "@/store/discussionStore";
import { Link, useParams } from "react-router-dom";
import convertDateTime from "@/utils/helper";
import { useTopicStore } from "@/store/topicStore";
import { useUserStore } from "@/store/userStore";
import { incrementView } from "@/services/discussionService";
import ICommentCreate from "@/interface/API/ICommentCreate";
import { useCommentStore } from "@/store/commentStore";

const DiscussDetailPage: React.FC = () => {
  const { discussId } = useParams<{ discussId: string }>();
  const { discussion, listDiscuss, getDiscussById, getListDiscussion } =
    useDiscussionStore();
  const [cmt, setComment] = useState<string>("");
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { listAllTopic, getTopic } = useTopicStore();
  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const { user, userById, getById } = useUserStore();
  const viewedDiscussionIdsString = localStorage.getItem(
    `viewedDiscussionIds_${user?._id}`
  );
  const initialViewedDiscussionIds = viewedDiscussionIdsString
    ? JSON.parse(viewedDiscussionIdsString)
    : [];
  const [viewedDiscussionIds, setViewedDiscussionIds] = useState<string[]>(
    initialViewedDiscussionIds
  );
  const [commentCreate, setCommentCreate] = useState<ICommentCreate | null>(
    null
  );
  const { listComment, getListComment } = useCommentStore();
  const { createComment } = useCommentStore();
  const formatDate = "MM-DD-YYYY";
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

  //Get information discuss, list discuss, user own discussion
  useEffect(() => {
    const fetchData = async () => {
      await getTopic();
      await getListDiscussion(0, 0, "desc");
      await getDiscussById(discussId ? discussId : "");
      await getById(discussion?.createBy ?? "");
    };
    fetchData();
  }, [
    getTopic,
    getListDiscussion,
    discussId,
    getDiscussById,
    getById,
    discussion,
  ]);

  //Increment view count
  useEffect(() => {
    if (discussion) {
      if (!viewedDiscussionIds.includes(discussId ? discussId : "")) {
        incrementView(discussId ? discussId : "");
        const updatedIds = [
          ...viewedDiscussionIds,
          discussId ? discussId : "",
        ].filter((id) => id !== undefined);
        setViewedDiscussionIds((prevIds) => [...prevIds, ...updatedIds]);
        localStorage.setItem(
          `viewedDiscussionIds_${user?._id}`,
          JSON.stringify([...viewedDiscussionIds, discussId])
        );
      }
    }
  }, [discussId, discussion, getDiscussById, viewedDiscussionIds, user?._id]);

  useEffect(() => {
    getListComment(discussId ? discussId : "", 0, 0);
  }, [getListComment, discussId]);
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

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  //Create a new comment
  const handleCommentSubmit = async (data: ICommentCreate) => {
    try {
      await createComment(data);
      getListComment(discussId ? discussId : "", 0, 0);
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
    }
  };

  const getColorAvatar = userById
    ? colorsAvatar.find((item) => item.color === userById.color)
    : null;
  const colorAvatar = getColorAvatar ? getColorAvatar.value : "";
  return (
    <LayoutDetail
      otherChildren={
        <ListDiscussCard
          listTopic={discussion ? discussion.topic : ""}
          numTopicsToShow={5}
          listDiscuss={listDiscuss}
        />
      }
    >
      <Link
        className="dark:text-light0 rounded-full pr-1 link inline-flex items-center text-sm font-medium !text-grey-600 bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark1"
        to="/"
      >
        <HiArrowCircleLeft className="w-6 h-6 mr-1" />
        Back to discussion
      </Link>
      <div className="relative flex flex-col px-4 py-4 mb-3 duration-300 rounded-xl md:flex-row bg-light4 dark:bg-dark1">
        <div className="flex items-center self-start w-full mb-4 md:mr-5 md:mb-0 md:block md:w-auto">
          <div className="flex items-center">
            <a
              href=""
              className="flex items-center mr-3 brightness-90 w-14 h-14"
            >
              <Avatar
                src={userById?.avatar ?? ""}
                alt=""
                cln={`rounded-[10px_!important] w-14 h-14 p-[1px] object-cover ${colorAvatar}`}
              />
            </a>
            <div className="flex flex-col">
              <strong className="block uppercase md:hidden text-xs dark:text-light0 ">
                By: {userById?.fullName ?? userById?.username}
              </strong>
              <span className="block md:hidden text-[10px] dark:text-light0 ">
                Published:{" "}
                {discussion?.createdAt
                  ? convertDateTime(discussion.createdAt.toString(), formatDate)
                  : ""}
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
                  By: {userById?.fullName ?? userById?.username}
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
                  const topic = listAllTopic?.find(
                    (topic) => topic._id === topicId
                  );
                  if (topic) {
                    return (
                      <a key={topic._id} href={`/topics/detail/${topic._id}`}>
                        <div
                          className={`inline-block border-2 px-2 py-[2px] rounded-full m-[1px] text-[10px] ${
                            colorTopic[
                              topic.color as keyof typeof colorTopic
                            ] || ""
                          }`}
                        >
                          {topic.name}
                        </div>
                      </a>
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
                {isMenuOpen && (
                  <ActionMenu
                    handleReportClick={handleReportClick}
                    userCurrentId={user}
                    userOwnerId={userById}
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
          onSaveChanges={handleCommentSubmit}
          menuRef={menuRef}
          discussionId={discussId ? discussId : ""}
        />

        <CommentList
          userData={user}
          commentList={listComment}
          discussionId={discussId}
        ></CommentList>
      </div>

      <SliderDiscuss></SliderDiscuss>
    </LayoutDetail>
  );
};
export default DiscussDetailPage;
