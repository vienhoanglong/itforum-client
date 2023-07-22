import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { discuss, topicColors } from "@/constants/global";

const SliderDiscuss: React.FC = () => {
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
        {discuss.map((discuss, index) => (
          <div
            key={index}
            className="flex h-full hover:cursor-pointer bg-light4 dark:bg-dark2 shadow-lg hover:shadow-lg p-2 rounded-lg transform transition-all duration-100 hover:scale-105"
          >
            <span className="text-sm font-medium dark:text-light0">
              {discuss.title}
            </span>
            <div className="flex flex-wrap justify-start space-x-2">
              <span className="block text-mainColor font-thin">
                @tranhoanglong
              </span>
              <span className="font-thin block dark:text-light0">
                10 hours ago
              </span>
            </div>
            <div className="mt-2">
              <div
                className={`inline-block border-2 px-2 py-[2px] rounded-full m-[1px] text-[10px]
                                ${topicColors["NodeJs"] || ""}`}
              >
                NodeJs
              </div>
              <div
                className={`inline-block border-2 px-2 py-[2px] rounded-full m-[1px] text-[10px]
                                ${topicColors["JavaScript"] || ""}`}
              >
                JavaScript
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderDiscuss;
