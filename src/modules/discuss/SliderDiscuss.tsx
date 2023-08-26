import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  colorTopic,
  colorsAvatar,
} from "@/constants/global";
import { useUserStore } from "@/store/userStore";
import { useTopicStore } from "@/store/topicStore";
import { useDiscussionStore } from "@/store/discussionStore";
import IDiscussion from "@/interface/discussion";
import convertDateTime from "@/utils/helper";
import { Link } from "react-router-dom";
import Avatar from "@/components/image/Avatar";

interface SliderDiscussProps {
  listTopic: string[] | string;
  discussId?: string;
  listDiscussion: IDiscussion[] | null;
}
const SliderDiscuss: React.FC<SliderDiscussProps> = ({
  listTopic,
  discussId,
}) => {
  const { listUser } = useUserStore();
  const { listDiscuss } = useDiscussionStore();
  const { listAllTopic } = useTopicStore();
  const [filter, setFilter] = useState<IDiscussion[]>([]);
  const formatDate = "MM-DD-YYYY";

  useEffect(() => {
    const filteredDiscussions =
      listDiscuss != null &&
      listDiscuss?.filter((discuss) =>
        discuss.topic.some((topic) => {
          if (typeof listTopic === "string") {
            return discuss.topic.includes(listTopic);
          } else if (Array.isArray(listTopic)) {
            return listTopic.includes(topic);
          }
          return false;
        })
      );
    filteredDiscussions &&
      setFilter(
        filteredDiscussions?.filter(
          (discuss) => discuss.statusDiscuss === 1 && discuss._id != discussId
        ) ?? []
      );
  }, [listTopic, discussId, listDiscuss]);

  const getColorUser = (color: string): string => {
    const result = colorsAvatar.find((item) => item.color === color);
    return result?.value ?? "bg-white";
  };

  const settings = {
    dots: true,
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
      <h1 className="text-sm font-bold mb-2 text-darker">Realated discuss</h1>
      <Slider {...settings}>
        {filter.map((discuss, index) =>
          listUser
            ?.filter((e) => e._id === discuss.createBy)
            .map((user) => (
              <div
                key={index}
                className="flex h-full hover:cursor-pointer bg-light4 dark:bg-dark2 shadow-lg hover:shadow-lg p-2 rounded-lg transform transition-all duration-100 hover:scale-105"
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
                <div className="w-full">
                  <span className="text-sm break-words line-clamp-1 font-medium dark:text-light0">
                    {discuss.title}
                  </span>
                  <div className="flex flex-wrap justify-start space-x-2">
                    <span className="block text-mainColor font-thin">
                      {user.fullName && user.username}
                    </span>
                    <span className="font-thin block dark:text-light0">
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
        )}
      </Slider>
    </div>
  );
};

export default SliderDiscuss;
