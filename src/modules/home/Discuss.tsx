import React, { useEffect, useState } from "react";
import { colorTopic, colorsAvatar } from "constants/global";
import { BsEyeFill, BsFillChatFill } from "react-icons/bs";
import Avatar from "@/components/image/Avatar";
import FiltersBox from "./FiltersBox";
import Modal from "@/components/modal/Modal";
import AddNewDiscussion from "../discuss/AddNewDiscussion";
import IDiscussion from "@/interface/discussion";
import convertDateTime from "@/utils/helper";
import { useTopicStore } from "@/store/topicStore";
import IDiscussionCreate from "@/interface/API/IDiscussionCreate";
import {
  CreateNewDiscussion,
  getDiscussionByStatus,
} from "@/services/discussionService";
import { useDiscussionStore } from "@/store/discussionStore";
import { toast } from "react-toastify";
import { useUserStore } from "@/store/userStore";
import { Link } from "react-router-dom";
import IUser from "@/interface/user";

interface ListDiscussProps {
  currentLimit: number;
  discuss: IDiscussion[] | null;
  currentUser: IUser[] | null;
  handleFilter: (filterOptions: { sort: string; topic: string }) => void;
}
export const Discuss: React.FC<ListDiscussProps> = ({
  discuss,
  currentUser,
  handleFilter,
  currentLimit,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const { listAllTopic, getTopic } = useTopicStore();
  const [sort, setSort] = useState("desc");
  const [topicId, setTopicId] = useState("");
  const { user } = useUserStore();
  const { getDiscussByStatus, listDiscussByStatus } = useDiscussionStore();
  const [listDiscussion, setListDiscussion] = useState<IDiscussion[] | null>(
    listDiscussByStatus
  );
  const [listDiscussionDefault, setListDiscussionDefault] = useState<
    IDiscussion[] | null
  >([]);

  useEffect(() => {
    getTopic();
    if (discuss && discuss != null) {
      setListDiscussionDefault(discuss);
    }
  }, [getTopic, discuss]);

  const formatDate = "MM-DD-YYYY";
  const handleInputClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleFiltered = (filterOptions: { sort: string; topic: string }) => {
    handleFilter(filterOptions);
    setSort(filterOptions.sort);
    setTopicId(filterOptions.topic);
  };
  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleCreate = async (data: IDiscussionCreate) => {
    try {
      await CreateNewDiscussion(data);
      if (search && search !== "") {
        getDiscussByStatus(1, false, 0, currentLimit, sort, topicId);
      } else {
        const response = await getDiscussionByStatus(
          1,
          false,
          0,
          currentLimit,
          sort,
          topicId
        );
        if (response) {
          setListDiscussionDefault(response);
        }
      }
      toast.success(" Post discuss successfully! ", {
        position: "bottom-right",
        autoClose: 3000,
      });
      setShowModal(false);
    } catch (err) {
      setShowModal(false);
      throw new Error(" Error creating discussion");
    }
  };
  useEffect(() => {
    getDiscussByStatus(1, false, 0, 0, "desc");
  }, [getDiscussByStatus]);

  useEffect(() => {
    getDiscussByStatus(1, false, 0, 0, sort, topicId);
  }, [sort, topicId, getDiscussByStatus]);
  useEffect(() => {
    setListDiscussion(listDiscussByStatus);
  }, [listDiscussByStatus]);

  const getColorUser = (color: string): string => {
    const result = colorsAvatar.find((item) => item.color === color);
    return result?.value ?? "bg-white";
  };

  return (
    <>
      <div className=" bg-light4 dark:bg-dark1 p-4 rounded-lg shadow-sm dark:text-white mb-4 flex items-center">
        <div className="flex items-center mr-3 brightness-90 w-1/6 h-1/6">
          <Avatar
            src={user?.avatar ?? ""}
            alt=""
            cln={`rounded-[10px_!important] w-14 h-14 p-[1px] object-cover ${getColorUser(
              user?.color ?? ""
            )}`}
          />
        </div>
        <button
          onClick={handleInputClick}
          className="w-full text-left justify-center rounded-3xl h-full py-2 px-4 bg-light3/70 shadow-inner dark:bg-dark0/80"
        >
          {" "}
          What do you think?
        </button>

        <Modal isOpen={showModal} onClose={handleCloseModal}>
          <AddNewDiscussion onSaveChanges={handleCreate}></AddNewDiscussion>
        </Modal>
      </div>
      <FiltersBox
        handleSearch={handleSearch}
        listTopic={listAllTopic}
        handleFilter={handleFiltered}
      ></FiltersBox>
      {search && listDiscussion ? (
        listDiscussion
          .filter(
            (discuss) =>
              discuss.title.toLowerCase().includes(search) &&
              discuss.isDraft == false &&
              discuss.statusDiscuss === 1
          )
          .map((discuss, index) =>
            currentUser
              ?.filter((e) => e._id === discuss.createBy)
              .map((user) => (
                <div
                  key={index}
                  className="relative flex flex-col shadow-sm px-4 py-4 mb-3 duration-300 cursor-pointer rounded-xl md:flex-row bg-light4 dark:bg-dark1"
                >
                  <div className="flex items-center self-start w-full mb-4 md:mr-5 md:mb-0 md:block md:w-auto">
                    <div className="flex items-center">
                      <Link
                        to={`/user/${user?._id}`}
                        className="flex items-center mr-3 brightness-90 w-14 h-14"
                      >
                        <Avatar
                          src={user?.avatar ?? ""}
                          alt=""
                          cln={`rounded-[10px_!important] w-14 h-14 p-[1px] object-cover ${getColorUser(
                            user?.color ?? ""
                          )}`}
                        />
                      </Link>
                      <div className="flex flex-col">
                        <strong className="block uppercase md:hidden text-xs dark:text-light0 ">
                          <Link
                            to={`/user/${user?._id}`}
                            className=" hover:text-mainColor cursor-pointer"
                          >
                            {user.fullName ?? user.username}
                          </Link>
                        </strong>

                        <span className="block md:hidden text-[10px] dark:text-light0 ">
                          Publish:{" "}
                          {convertDateTime(
                            discuss.createdAt.toString(),
                            formatDate
                          )}
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
                          {discuss.totalView}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:mb-0 lg:mt-1">
                    <div className="flex flex-col justify-between">
                      <div className=" flex justify-between">
                        <div className=" mb-2 dark:text-light0 max-md:hidden">
                          <div className="text-xs font-bold text-grey-600">
                            <Link
                              to={`/user/${user?._id}`}
                              className=" hover:text-mainColor cursor-pointer"
                            >
                              {user.fullName ?? user.username}
                            </Link>
                          </div>
                          <div className="text-[10px] font-normal text-grey-600">
                            Published:{" "}
                            {convertDateTime(
                              discuss.createdAt.toString(),
                              formatDate
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
                              {discuss.totalView}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="-mt-1  mb-3 dark:bg-dark0 bg-light3 p-2 rounded-lg md:flex md:items-start">
                        <h3 className="tracking-normal md:pr-6 lg:mb-0 dark:text-light0">
                          <Link
                            to={`/discuss/${discuss._id}`}
                            className=" text-sm break-words line-clamp-3 font-semibold hover:text-mainColor"
                          >
                            {discuss.title}
                          </Link>
                        </h3>
                      </div>
                      <div className=" break-words line-clamp-3 text-black/90 dark:text-light0 lg:mb-0 lg:pr-8 text-xs">
                        {discuss.content}
                      </div>
                      <div className="mt-2">
                        {discuss.topic.map((topicId) => {
                          const topic = listAllTopic?.find(
                            (topic) => topic._id === topicId
                          );
                          if (topic) {
                            return (
                              <Link
                                key={topic._id}
                                to={`/topics/detail/${topic._id}`}
                              >
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
                    </div>
                  </div>
                </div>
              ))
          )
      ) : listDiscussionDefault?.length === 0 ? (
        <div className=" dark:text-white text-sm font-semibold">
          Không có thảo luận nào
        </div>
      ) : (
        listDiscussionDefault?.map((discuss, index) =>
          currentUser
            ?.filter((e) => e._id === discuss.createBy)
            .map((user) => (
              <div
                key={index}
                className="relative flex flex-col shadow-sm px-4 py-4 mb-3 duration-300 cursor-pointer rounded-xl md:flex-row bg-light4 dark:bg-dark1"
              >
                <div className="flex items-center self-start w-full mb-4 md:mr-5 md:mb-0 md:block md:w-auto">
                  <div className="flex items-center">
                    <Link
                      to={`/user/${user?._id}`}
                      className="flex items-center mr-3 brightness-90 w-14 h-14"
                    >
                      <Avatar
                        src={user?.avatar ?? ""}
                        alt=""
                        cln={`rounded-[10px_!important] w-14 h-14 p-[1px] object-cover ${getColorUser(
                          user?.color ?? ""
                        )}`}
                      />
                    </Link>
                    <div className="flex flex-col">
                      <strong className="block uppercase md:hidden text-xs dark:text-light0 ">
                        <Link
                          to={`/user/${user?._id}`}
                          className=" hover:text-mainColor cursor-pointer"
                        >
                          {user.fullName ?? user.username}
                        </Link>
                      </strong>
                      <span className="block md:hidden text-[10px] dark:text-light0 ">
                        Publish:{" "}
                        {convertDateTime(
                          discuss.createdAt.toString(),
                          formatDate
                        )}
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
                        {discuss.totalView}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:mb-0 lg:mt-1">
                  <div className="flex flex-col justify-between">
                    <div className=" flex justify-between">
                      <div className=" mb-2 dark:text-light0 max-md:hidden">
                        <div className="text-xs font-bold text-grey-600">
                          <Link
                            to={`/user/${user?._id}`}
                            className=" hover:text-mainColor cursor-pointer"
                          >
                            {user.fullName ?? user.username}
                          </Link>
                        </div>
                        <div className="text-[10px] font-normal text-grey-600">
                          Published:{" "}
                          {convertDateTime(
                            discuss.createdAt.toString(),
                            formatDate
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
                            {discuss.totalView}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="-mt-1 mb-3 dark:bg-dark0 bg-light3 p-2 rounded-lg md:flex md:items-start">
                      <h3 className="tracking-normal md:pr-6 lg:mb-0 dark:text-light0">
                        <Link
                          to={`/discuss/${discuss._id}`}
                          className=" text-sm break-words line-clamp-3 font-semibold hover:text-mainColor"
                        >
                          {discuss.title}
                        </Link>
                      </h3>
                    </div>
                    <div className=" break-words line-clamp-3 text-black/90 dark:text-light0 lg:mb-0 lg:pr-8 text-xs">
                      {discuss.content}
                    </div>
                    <div className="mt-2">
                      {discuss.topic.map((topicId) => {
                        const topic = listAllTopic?.find(
                          (topic) => topic._id === topicId
                        );
                        if (topic) {
                          return (
                            <Link
                              key={topic._id}
                              to={`/topics/detail/${topic._id}`}
                            >
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
                  </div>
                </div>
              </div>
            ))
        )
      )}
    </>
  );
};

export default Discuss;
