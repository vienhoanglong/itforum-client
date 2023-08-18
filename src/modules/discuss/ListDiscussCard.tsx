import Avatar from "@/components/image/Avatar";
import React, { useEffect, useState } from "react";
import { colorTopic, colorsAvatar } from "@/constants/global";
import IDiscussion from "@/interface/discussion";
import { useTopicStore } from "@/store/topicStore";
import { useUserStore } from "@/store/userStore";
import { Link } from "react-router-dom";
import convertDateTime from "@/utils/helper";
import { useDiscussionStore } from "@/store/discussionStore";

interface ListDiscussCardProps {
  listTopic: string[] | string;
  numTopicsToShow: number;
}

const ListDiscussCard: React.FC<ListDiscussCardProps> = ({
  numTopicsToShow,
  listTopic,
}) => {
  const { listAllTopic } = useTopicStore();
  const { listUser, getListUser } = useUserStore();
  const formatDate = "MM-DD-YYYY";
  const [currentListUser, setCurrentListUser] = useState<string[]>([]);
  const { listDiscuss, getListDiscussion } = useDiscussionStore();
  const [filter, setFilter] = useState<IDiscussion[]>([]);

  useEffect(() => {
    getListDiscussion(0, 0, "desc");
    const filteredDiscussions = listDiscuss?.filter((discuss) =>
      discuss.topic.some((topic) => {
        if (typeof listTopic === "string") {
          return topic === listTopic;
        } else if (Array.isArray(listTopic)) {
          return listTopic.every((topicToFilter) =>
            discuss.topic.includes(topicToFilter)
          );
        }
        return false;
      })
    );
    setFilter(filteredDiscussions ?? []);
  }, [listTopic, getListDiscussion]);

  useEffect(() => {
    const lisCurrenttUser = filter?.map((user) => user.createBy);
    setCurrentListUser(lisCurrenttUser ? lisCurrenttUser : []);
  }, [filter]);

  useEffect(() => {
    getListUser(currentListUser);
  }, [currentListUser, getListUser]);

  const getColorUser = (color: string): string => {
    const result = colorsAvatar.find((item) => item.color === color);
    return result?.value ?? "bg-white";
  };
  return (
    <div className="w-full  dark:bg-dark1/80 h-auto rounded-lg mt-2 flex pt-4 flex-col space-y-2">
      <div className=" flex justify-between items-center mb-2 px-2">
        <span className="font-bold text-sm text-darker">
          Related discussion
        </span>
        {filter?.length === 0 ? null : (
          <Link
            className=" dark:text-light0 px-4 rounded-full link inline-flex items-center text-xs !text-grey-600 underline font-medium bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0"
            to="/"
          >
            More
          </Link>
        )}
      </div>
      {filter?.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-white py-4">
          Không có thảo luận liên quan
        </div>
      ) : (
        filter?.slice(0, numTopicsToShow).map((discuss, index) =>
          listUser
            ?.filter((e) => e._id === discuss.createBy)
            .map((user) => (
              <div
                key={index}
                className="flex cursor-pointer hover:text-mainColor dark:text-light0 bg-light4 dark:bg-dark2 shadow hover:shadow-md p-2 rounded-lg transform transition-all duration-100 "
              >
                <Link
                  to={`/user/${user._id}`}
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
                <div className="w-2/3 ml-2">
                  <div className=" text-xs w-full max-h-8 font-medium break-words line-clamp-2">
                    <Link
                      to={`/discuss/${discuss._id}`}
                      className=" hover:text-mainColor cursor-pointer"
                    >
                      {discuss.title}
                    </Link>
                  </div>
                  <div className="flex flex-wrap justify-start space-x-2">
                    <span className="block text-mainColor text-[10px] font-thin">
                      {user.fullName ?? user.username}
                    </span>
                    <span className="font-thin text-[10px] block dark:text-light0">
                      {convertDateTime(
                        discuss.createdAt.toString(),
                        formatDate
                      )}
                    </span>
                  </div>

                  <div className="mt-2">
                    {discuss?.topic.map((topicId) => {
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
            ))
        )
      )}
    </div>
  );
};

export default ListDiscussCard;
