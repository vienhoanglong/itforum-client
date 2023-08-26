import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNotificationStore } from "@/store/notificationStore";
import convertDateTime from "@/utils/helper";
import { useUserStore } from "@/store/userStore";
import { Link } from "react-router-dom";

const SliderNotification: React.FC = () => {
  const { listNotificationLevel, getListNotificationLevel } =
    useNotificationStore();
  const { getListUserNotifiLevel, listUserNotifiLevel } = useUserStore();
  const formatDate = "MM-DD-YYYY";
  useEffect(() => {
    getListNotificationLevel("important");
  }, [listNotificationLevel]);

  useEffect(() => {
    if (listNotificationLevel && listNotificationLevel.length > 0) {
      const userIDs = listNotificationLevel.map((user) => user.createdBy);

      if (userIDs.length > 0) {
        getListUserNotifiLevel(userIDs);
      }
    }
  }, [listNotificationLevel]);

  //  useMemo(() => {
  //   if (currentListUser && currentListUser.length > 0) {
  //     getListUserNotifiLevel(currentListUser);
  //   }
  // }, [currentListUser, getListUserNotifiLevel]);
  // getListUserNotifiLevel(currentListUser);
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
        breakpoint: 1024,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
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
    <div className=" slider-container bg-light2 dark:bg-dark1 rounded-lg">
      <h1 className="text-sm font-bold mb-2 text-red2">Important</h1>
      <Slider {...settings}>
        {listNotificationLevel?.map((notifi, index) =>
          listUserNotifiLevel
            ?.filter((e) => e._id === notifi.createdBy)
            .map((user) => (
              <Link
                to={`/notifications-detail/${notifi._id}`}
                key={index}
                className="flex h-full hover:cursor-pointer bg-light4 dark:bg-dark2 shadow-lg hover:shadow-lg p-2 rounded-lg transform transition-all duration-100 hover:scale-105"
              >
                <span className="text-sm font-medium break-words line-clamp-2 dark:text-light0">
                  {notifi.titleNotice}
                </span>

                <div className="flex flex-wrap justify-start space-x-2">
                  <span className="block text-mainColor font-thin">
                    {user.fullName ?? user.username}
                  </span>
                  <span className="font-thin block dark:text-light0">
                    {notifi?.createdAt &&
                      convertDateTime(notifi.createdAt.toString(), formatDate)}
                  </span>
                </div>
              </Link>
            ))
        )}
      </Slider>
    </div>
  );
};

export default SliderNotification;
