import { colorsAvatar } from "@/constants/global";
import IPost from "@/interface/post";
import convertDateTime from "@/utils/helper";
import { Link } from "react-router-dom";
import TopicList from "@/modules/post/TopicList";
import PostContent from "@/modules/post/PostContent";
import { usePostStore } from "@/store/postStore";
import { useEffect, useMemo, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useTopicStore } from "@/store/topicStore";

type ReviewPostPageProps = {
  postId: string;
};

const ReviewPostPage: React.FC<ReviewPostPageProps> = ({ postId }) => {
  const { getPostByPostId, post } = usePostStore();
  const { listTopicByListId, getListByListTopicId } = useTopicStore();
  const { userById, getById } = useUserStore();
  const [postData, setPostData] = useState<IPost | null>(null);

  useMemo(() => {
    postId && getPostByPostId(postId);
  }, [postId]);
  useEffect(() => {
    if (post) {
      setPostData(post);
      getById(post.createdBy);
      getListByListTopicId(post.hashtag.toString());
    }
  }, [post]);

  const getColorUser = (color: string): string => {
    const result = colorsAvatar.find((item) => item.color === color);
    return result?.value ?? "bg-white";
  };
  const formatDate = "MM-DD-YYYY";

  return (
    <div className="z-10 md:w-[30vw] md:h-[70vh] pb-2 bg-light4 dark:bg-dark1 dark:text-light0 rounded-lg p-8">
      <div className="header grid grid-cols-1">
        <div className="">
          <h1 className="h-auto mt-4 mb-2 text-2xl font-bold leading-tighter text-dark0 dark:text-light0">
            {post?.title}
          </h1>
        </div>
        <div className="w-full flex flex-col-3 items-center">
          <div className=" w-8 h-8 rounded-full overflow-hidden">
            <img
              src={userById?.avatar}
              alt="Avatar"
              className={`w-full h-full object-cover brightness-90 ${getColorUser(
                userById?.color ?? ""
              )}`}
            />
          </div>
          <div className=" py-2 px-2">
            <div className="text-xs gap-1 flex font-semibold text-grey-600">
              <Link
                to={`/user/${userById?._id}`}
                className=" hover:text-mainColor cursor-pointer"
              >
                <div> {userById?.fullName ?? userById?.username}</div>
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
            className=" rounded-xl w-full max-h-[100px] object-cover"
          />
        </div>
        <div className="w-full my-2 flex flex-wrap">
          <TopicList
            listTopic={listTopicByListId != null ? listTopicByListId : []}
          ></TopicList>
        </div>
      </div>
      <PostContent
        content={postData?.content ? postData.content : ""}
      ></PostContent>
    </div>
  );
};

export default ReviewPostPage;
