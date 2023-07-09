import React from "react";
import avt from "assets/avt1.jpg";
import { topicColors } from "constants/global";
import { BsEyeFill, BsFillChatFill } from "react-icons/bs";
import Avatar from "@/components/image/Avatar";
export const Discuss: React.FC = () => {
  return (
    <>
      <div className="relative flex flex-col px-4 py-4 mb-3 duration-300 cursor-pointer rounded-xl md:flex-row bg-slate-100 dark:bg-dark2">
        <div className="flex items-center self-start w-full mb-4 md:mr-5 md:mb-0 md:block md:w-auto">
          <div className="flex items-center">
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
            <strong className="uppercase md:hidden text-xs md:text-base">Viên Hoàng Long</strong>
          </div>
          <div className="flex items-center justify-center py-2 ml-auto rounded-xl bg-grey-400 md:hidden">
            <div className="flex items-center px-3">
              <div className="mr-1">
                <BsFillChatFill className="text-lg"/>
              </div>
              <span className="text-xs font-semibold leading-none text-grey-800">
                3
              </span>
            </div>
          </div>
        </div>
        <div className="w-full md:mb-0 lg:mt-1">
          <div className="flex flex-col justify-between">
            <div className="-mt-1 md:flex md:items-start">
              <h3 className="mb-4 tracking-normal md:pr-6 lg:mb-0 dark:text-light0">
                <a href="" className="text-base font-semibold">
                  Deploy ứng dụng NodeJS lên EC2 instance của AWS (Phần 1)
                </a>
              </h3>
              <div className="relative hidden text-center md:ml-auto md:flex md:flex-row-reverse md:items-center gap-2 dark:text-light0">
                <div className="flex items-center justify-center ml-4">
                  <div className="mr-1">
                    <BsFillChatFill className="text-lg"/>
                  </div>
                  <span className="relative text-xs font-medium leading-none text-left text-text1">
                    3
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <div className="mr-1">
                    <BsEyeFill className="text-lg"/>
                  </div>
                  <span className="text-xs font-medium leading-none text-left text-text1">
                    2552
                  </span>
                </div>
              </div>
            </div>
            <div className="break-words leading-normal text-black/90 dark:text-light0 lg:mb-0 lg:pr-8 text-sm line-clamp-3">
              Ở bài viết này mình sẽ hướng dẫn các bạn cách để deploy đơn giản 1
              ứng dụng NodeJS có kết nối với MongoDB lên AWS
            </div>
            <div className="leading-none tracking-tight text-xs text-dark1 dark:text-light0 flex gap-2 align-middle mt-1">
              <a className="text-mainColor font-normal" href="/@vienlongdev">
                @vienhoanglong
              </a>
              <p>14 phút trước</p>
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
        </div>
      </div>
    </>
  );
};

export default Discuss;
