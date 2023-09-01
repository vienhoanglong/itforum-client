import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTopicStore } from "@/store/topicStore";
import { getAllPost } from "@/services/postService";
import IPost from "@/interface/post";
import { Link } from "react-router-dom";
import convertDateTime from "@/utils/helper";

interface ListPostCardProps {
  listTopic: string[] | string;
  postId?: string;
}

const Carousel: React.FC<ListPostCardProps> = ({ listTopic, postId }) => {
  const { getTopic } = useTopicStore();
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    Accessibility: true,
    rows: 1,
    Swipe: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className=" slider-container bg-light2 dark:bg-dark0 rounded-lg">
      <h1 className="text-sm font-bold mb-2 text-darker">Realated posts</h1>
      {filter?.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-white py-4">
          Không có bài viết liên quan
        </div>
      ) : (
        <Slider {...settings}>
          {filter?.map((post, index) => (
            <Link
              to={`/post/${post._id}`}
              key={index}
              className="flex h-auto items-center flex-col-1 hover:cursor-pointer bg-light4 dark:bg-dark2 shadow-lg hover:shadow-lg p-2 rounded-lg transform transition-all duration-100 hover:scale-105"
            >
              <div className="w-full h-1/2 rounded-lg mb-2">
                <img
                  src={post.thumbnail}
                  className=" rounded-xl max-w-full max-h-[300px] object-cover"
                  alt="Thumbnail"
                />
              </div>
              <div className="w-full h-1/2">
                <span className="font-thin text-[10px] block dark:text-light0">
                  {convertDateTime(post.createdAt.toString(), formatDate)}
                </span>
                <span className="text-sm break-words line-clamp-2 font-medium dark:text-light0">
                  {post.title}
                </span>
              </div>
            </Link>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Carousel;
