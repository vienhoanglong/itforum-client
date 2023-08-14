import React, { useState } from "react";
import avt from "assets/avt1.jpg";
import { topicColors } from "constants/global";
import { BsEyeFill, BsFillChatFill } from "react-icons/bs";
import Avatar from "@/components/image/Avatar";
import FiltersBox from "./FiltersBox";
import Modal from "@/components/modal/Modal";
import AddNewDiscussion from "../discuss/AddNewDiscussion";

interface Discuss {
  title: string;
}
interface ListDiscussProps {
  discuss: Discuss[];
}
export const Discuss: React.FC<ListDiscussProps> = ({ discuss }) => {
  const [showModal, setShowModal] = useState(false);

  const handleInputClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className=" bg-light4 dark:bg-dark1 p-4 rounded-lg shadow-sm dark:text-white mb-4 flex items-center">
        <div className="flex items-center mr-3 brightness-90 w-1/6 h-1/6">
          <Avatar
            src={avt}
            alt=""
            cln="rounded-[10px_!important] w-14 h-14 p-[1px] object-cover"
          />
        </div>
        <button
          onClick={handleInputClick}
          className="w-full text-left justify-center rounded-3xl h-full py-2 px-4 bg-light3/70 shadow-inner dark:bg-dark0/80"
        >
          {" "}
          What do you think?
        </button>

        <Modal isOpen={showModal} onClose={closeModal}>
          <AddNewDiscussion></AddNewDiscussion>
        </Modal>
      </div>
      <FiltersBox></FiltersBox>
      {discuss.map((discuss, index) => (
        <div
          key={index}
          className="relative flex flex-col shadow-sm px-4 py-4 mb-3 duration-300 cursor-pointer rounded-xl md:flex-row bg-light4 dark:bg-dark1"
        >
          <div className="flex items-center self-start w-full mb-4 md:mr-5 md:mb-0 md:block md:w-auto">
            <div className="flex items-center">
              <a
                href="/user/1"
                className="flex items-center mr-3 brightness-90 w-14 h-14"
              >
                <Avatar
                  src={avt}
                  alt=""
                  cln="rounded-[10px_!important] w-14 h-14 p-[1px] object-cover"
                />
              </a>
              <div className="flex flex-col">
                <strong className="block uppercase md:hidden text-xs dark:text-light0 ">
                  Tran Hoang Long
                </strong>
                <span className="block md:hidden text-[10px] dark:text-light0 ">
                  Publish: 10 hours ago
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center dark:text-light0 py-2 ml-auto rounded-xl bg-grey-400 md:hidden">
              <div className="flex items-center  px-3">
                <div className="mr-1">
                  <BsFillChatFill className="text-lg " />
                </div>
                <span className="text-xs font-semibold leading-none text-grey-800">
                  3
                </span>
              </div>
              <div className="flex items-center justify-center">
                <div className="mr-1">
                  <BsEyeFill className="text-lg" />
                </div>
                <span className="text-xs font-medium leading-none text-left text-text1">
                  2552
                </span>
              </div>
            </div>
          </div>
          <div className="w-full md:mb-0 lg:mt-1">
            <div className="flex flex-col justify-between">
              <div className=" flex justify-between">
                <div className=" mb-2 dark:text-light0 max-md:hidden">
                  <div className="text-xs font-bold text-grey-600">
                    By: Tran Hoang Long
                  </div>
                  <div className="text-[10px] font-normal text-grey-600">
                    Published: 10 hours ago
                  </div>
                </div>
                <div className="relative hidden text-center md:ml-auto md:flex md:flex-row-reverse md:items-center gap-2 dark:text-light0">
                  <div className="flex items-center justify-center ml-4">
                    <div className="mr-1">
                      <BsFillChatFill className="text-lg" />
                    </div>
                    <span className="relative text-xs font-medium leading-none text-left text-text1">
                      3
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="mr-1">
                      <BsEyeFill className="text-lg" />
                    </div>
                    <span className="text-xs font-medium leading-none text-left text-text1">
                      2552
                    </span>
                  </div>
                </div>
              </div>
              <div className="-mt-1 mb-3 dark:bg-dark0 bg-light3 p-2 rounded-lg md:flex md:items-start">
                <h3 className="tracking-normal md:pr-6 lg:mb-0 dark:text-light0">
                  <a
                    href="/discuss-detail"
                    className=" text-sm font-semibold hover:text-mainColor"
                  >
                    {discuss.title}
                  </a>
                </h3>
              </div>
              <div className=" break-words line-clamp-3 text-black/90 dark:text-light0 lg:mb-0 lg:pr-8 text-xs">
                Ở bài viết này mình sẽ hướng dẫn các bạn cách để deploy đơn giản
                1 ứng dụng NodeJS có kết nối với MongoDB lên AWS Ở bài viết này
                mình sẽ hướng dẫn các bạn cách để deploy đơn giản 1 ứng dụng
                NodeJS có kết nối với MongoDB lên AWS Ở bài viết này mình sẽ
                hướng dẫn các bạn cách để deploy đơn giản 1 ứng dụng NodeJS có
                kết nối với MongoDB lên AWS Ở bài viết này mình sẽ hướng dẫn các
                bạn cách để deploy đơn giản 1 ứng dụng NodeJS có kết nối với
                MongoDB lên AWS Ở bài viết này mình sẽ hướng dẫn các bạn cách để
                deploy đơn giản 1 ứng dụng NodeJS có kết nối với MongoDB lên AWS
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
        </div>
      ))}
    </>
  );
};

export default Discuss;
