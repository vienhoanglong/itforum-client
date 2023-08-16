import Avatar from "@/components/image/Avatar";
import React from "react";
import avt from "assets/avt1.jpg";
import { colorTopic, sampleTopics } from "@/constants/global";
import IDiscussion from "@/interface/discussion";
import { useTopicStore } from "@/store/topicStore";

interface DiscussCard {
  title: string;
  topic: string[];
}
interface ListDiscussCardProps {
  listTopic: string[] | "" | string;
  listDiscuss: IDiscussion[] | null;
  numTopicsToShow: number;
}

const ListDiscussCard: React.FC<ListDiscussCardProps> = ({
  listDiscuss,
  numTopicsToShow,
  listTopic,
}) => {
  const { listAllTopic } = useTopicStore();
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

  return (
    <div className="w-full  dark:bg-dark1/80 h-auto rounded-lg mt-2 flex pt-4 flex-col space-y-2">
      <div className=" flex justify-between items-center mb-2 px-2">
        <span className="font-bold text-sm text-darker">
          Related discussion
        </span>
        {filteredDiscussions?.length === 0 ? null : (
          <a
            className=" dark:text-light0 px-4 rounded-full link inline-flex items-center text-xs !text-grey-600 underline font-medium bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0"
            href="/"
          >
            More
          </a>
        )}
      </div>
      {filteredDiscussions?.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-white py-4">
          Không có thảo luận liên quan
        </div>
      ) : (
        filteredDiscussions?.slice(0, numTopicsToShow).map((discuss, index) => (
          <div
            key={index}
            className="flex cursor-pointer hover:text-mainColor dark:text-light0 bg-light4 dark:bg-dark2 shadow hover:shadow-md p-2 rounded-lg transform transition-all duration-100 "
          >
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
            <div className="w-2/3 ml-2">
              <div className=" text-xs w-full max-h-8 font-medium break-words line-clamp-2">
                {discuss.title}
              </div>
              <div className="flex flex-wrap justify-start space-x-2">
                <span className="block text-mainColor text-[10px] font-thin">
                  @tranhoanglong
                </span>
                <span className="font-thin text-[10px] block dark:text-light0">
                  10 hours ago
                </span>
              </div>

              <div className="mt-2">
                {discuss?.topic.map((topicId) => {
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
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ListDiscussCard;
