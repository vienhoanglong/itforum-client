import { colorTopic } from "@/constants/global";
import IPost from "@/interface/post";
import { getAllPost } from "@/services/postService";
import { useTopicStore } from "@/store/topicStore";
import convertDateTime from "@/utils/helper";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ListPostCardProps {
  listTopic: string[] | string;
  numTopicsToShow: number;
  postId?: string;
}

const ListPostCard: React.FC<ListPostCardProps> = ({
  listTopic,
  numTopicsToShow,
  postId,
}) => {
  const { listAllTopic, getTopic } = useTopicStore();
  const formatDate = "MM-DD-YYYY";
  const [filter, setFilter] = useState<IPost[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllPost(0, 0, "desc");
      if (response) {
        const filteredPost = response?.data?.data.filter((post: IPost) =>
          post.hashtag.some((topic) => {
            if (typeof listTopic === "string") {
              return post.hashtag.includes(listTopic);
            } else if (Array.isArray(listTopic)) {
              return listTopic.includes(topic);
            }
            return false;
          })
        );
        if (filteredPost) {
          const listPostRelated = filteredPost?.filter(
            (post: IPost) =>
              post.status === 1 && post.isDraft === false && post._id !== postId
          );
          setFilter(listPostRelated);
          if (listPostRelated && listPostRelated.length > 0) {
            const userInListDiscuss = listPostRelated?.map(
              (user: IPost) => user.createdBy
            );
            if (userInListDiscuss !== null && userInListDiscuss.length > 0) {
              getTopic();
            }
          }
        }
      }
    };
    fetchData();
  }, [postId, getTopic, listTopic]);

  return (
    <div className="w-full h-auto  dark:bg-dark1/80 rounded-lg mt-2 flex pt-4 flex-col space-y-2">
      <div className=" flex justify-between items-center mb-2 px-2">
        <span className="font-bold text-sm text-darker">Related posts</span>
        {filter.length === 0 ? null : (
          <Link
            className=" dark:text-light0 px-4 rounded-full link inline-flex items-center text-xs !text-grey-600 underline font-medium bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0"
            to="/"
          >
            More
          </Link>
        )}
      </div>
      {filter.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-white py-4">
          Không có bài viết liên quan
        </div>
      ) : (
        filter.slice(0, numTopicsToShow).map((post, index) => (
          <Link
            to={`/post/${post._id}`}
            key={index}
            className="flex hover:cursor-pointer hover:text-mainColor dark:text-light0 bg-light4 dark:bg-dark2 shadow hover:shadow-md p-2 rounded-lg transform transition-all duration-100 "
          >
            <div className="w-1/2 rounded-lg">
              <img
                src={post.thumbnail}
                className="w-full rounded-xl max-w-full max-h-[300px] object-cover"
              ></img>
            </div>
            <div className="w-1/2 ml-2">
              <span className="text-xs font-medium break-words line-clamp-2">
                {post.title}
              </span>
              <span className="font-thin text-[10px] block dark:text-light0">
                {convertDateTime(post.createdAt.toString(), formatDate)}
              </span>
              <div className="mt-2">
                {post?.hashtag.map((topicId) => {
                  const topic = listAllTopic?.find(
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
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default ListPostCard;
