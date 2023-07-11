import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { posts } from "@/constants/global";

const Carousel: React.FC = () => {
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
      <h1 className="text-sm font-bold mb-2 text-darker">Realated posts</h1>
      <Slider {...settings}>
        {posts.map((post, index) => (
          <div
            key={index}
            className="flex h-auto items-center flex-col-1 hover:cursor-pointer bg-light4 dark:bg-dark2 shadow-lg hover:shadow-lg p-2 rounded-lg transform transition-all duration-100 hover:scale-105"
          >
            <div className="w-full h-1/2 rounded-lg mb-2">
              <img
                src={post.img}
                className=" rounded-xl max-w-full max-h-[300px] object-cover"
                alt="Thumbnail"
              />
            </div>
            <div className="w-full h-1/2">
              <span className="text-sm font-medium dark:text-light0">
                {post.title}
              </span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
