import { colorTopic, sampleTopics } from "@/constants/global";
import React from "react";

interface PostCard {
  title: string;
  img: string;
  topic: string[];
}
interface ListPostCardProps {
  posts: PostCard[];
  numTopicsToShow: number;
  topicName: string | "" | string[];
}

const ListPostCard: React.FC<ListPostCardProps> = ({
  posts,
  numTopicsToShow,
  topicName,
}) => {
  const filteredPost = posts.filter((post) =>
    post.topic.some((topic) => {
      if (typeof topicName === "string") {
        return topic === topicName;
      } else if (Array.isArray(topicName)) {
        return topicName.every((topicToFilter) =>
          post.topic.includes(topicToFilter)
        );
      }
      return false;
    })
  );
  return (
    <div className="w-full h-auto  dark:bg-dark1/80 rounded-lg mt-2 flex pt-4 flex-col space-y-2">
      <div className=" flex justify-between items-center mb-2 px-2">
        <span className="font-bold text-sm text-darker">Related posts</span>
        {filteredPost.length === 0 ? null : (
          <a
            className=" dark:text-light0 px-4 rounded-full link inline-flex items-center text-xs !text-grey-600 underline font-medium bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0"
            href="/"
          >
            More
          </a>
        )}
      </div>
      {filteredPost.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-white py-4">
          Không có bài viết liên quan
        </div>
      ) : (
        filteredPost.slice(0, numTopicsToShow).map((post, index) => (
          <div
            key={index}
            className="flex hover:cursor-pointer hover:text-mainColor dark:text-light0 bg-light4 dark:bg-dark2 shadow hover:shadow-md p-2 rounded-lg transform transition-all duration-100 "
          >
            <div className="w-1/2 rounded-lg">
              <img
                src={post.img}
                className="w-full rounded-xl max-w-full max-h-[300px] object-cover"
              ></img>
            </div>
            <div className="w-1/2 ml-2">
              <span className="text-sm font-medium">{post.title}</span>
              <div className="mt-2">
                {post.topic.map((topic, index) => (
                  <div
                    key={index}
                    className={`inline-block border-2 px-2 py-[2px] rounded-full m-[1px] text-[10px] ${
                      colorTopic[
                        sampleTopics.find(
                          (t) =>
                            t.name.toLowerCase().replace(/\s+/g, "-") === topic
                        )?.color as keyof typeof colorTopic
                      ] || ""
                    }`}
                  >
                    {topic}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ListPostCard;
