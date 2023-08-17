import React from "react";
import FiltersBox from "./FiltersBox";
import { topicColors } from "@/constants/global";
import { BsEyeFill, BsFillChatFill } from "react-icons/bs";

interface Post {
  title: string;
}
interface ListPostProps {
  post: Post[];
}
export const Posts: React.FC<ListPostProps> = ({ post }) => {
  return (
    <>
      {/* <FiltersBox></FiltersBox> */}
      {post.map((post, index) => (
        <div
          key={index}
          className="flex w-full space-x-2 cursor-pointer bg-light4 shadow-sm dark:bg-dark1 rounded-lg p-2 m-2"
        >
          <div className="w-2/5">
            <img
              src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
              alt=""
              className="rounded-lg w-auto h-auto  object-cover"
            />
          </div>
          <div className="w-full h-full flex flex-col">
            <div className="flex">
              <a
                href="/post-detail"
                className="break-words leading-normal text-black/90 dark:text-light0 p-1 text-sm font-semibold line-clamp-3 w-4/5 hover:text-mainColor"
              >
                {post.title}
              </a>
              <div className="flex justify-center items-baseline  dark:text-light0 py-2 ml-auto rounded-xl bg-grey-400 ">
                <div className="flex items-center  px-3">
                  <div className="mr-1">
                    <BsFillChatFill size={12} />
                  </div>
                  <span className="text-xs font-semibold leading-none text-grey-800">
                    3
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <div className="mr-1">
                    <BsEyeFill size={12} />
                  </div>
                  <span className="text-xs font-medium leading-none text-left text-text1">
                    2552
                  </span>
                </div>
              </div>
            </div>
            <div className=" break-words line-clamp-3 text-black/90 dark:text-light0 lg:mb-0 lg:pr-8 text-xs">
              Ở bài viết này mình sẽ hướng dẫn các bạn cách để deploy đơn giản 1
              ứng dụng NodeJS có kết nối với MongoDB lên AWS Ở bài viết này mình
              sẽ hướng dẫn các bạn cách để deploy đơn giản 1 ứng dụng NodeJS có
              kết nối với MongoDB lên AWS Ở bài viết này mình sẽ hướng dẫn các
              bạn cách để deploy đơn giản 1 ứng dụng NodeJS có kết nối với
              MongoDB lên AWS Ở bài viết này mình sẽ hướng dẫn các bạn cách để
              deploy đơn giản 1 ứng dụng NodeJS có kết nối với MongoDB lên AWS Ở
              bài viết này mình sẽ hướng dẫn các bạn cách để deploy đơn giản 1
              ứng dụng NodeJS có kết nối với MongoDB lên AWS
            </div>
            <div className="flex flex-wrap justify-start space-x-2">
              <span className="block text-mainColor font-thin">
                @tranhoanglong
              </span>
              <span className="font-thin block dark:text-light0">
                10 hours ago
              </span>
            </div>
            <div className="flex justify-between">
              <div className="mt-2">
                <div
                  className={`inline-block border-2 px-2 py-[2px] rounded-full m-[1px] text-[10px]
                    ${topicColors["nodejs"] || ""}`}
                >
                  NodeJs
                </div>
                <div
                  className={`inline-block border-2 px-2 py-[2px] rounded-full m-[1px] text-[10px]
                    ${topicColors["javascript"] || ""}`}
                >
                  JavaScript
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Posts;
