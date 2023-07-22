import Avatar from "@/components/image/Avatar";
import React from "react";
import avt from "assets/avt1.jpg";
import { topicColors } from "@/constants/global";

interface DiscussCard {
  title: string;
}
interface ListDiscussCardProps {
  discuss: DiscussCard[];
}

const ListDiscussCard: React.FC<ListDiscussCardProps> = ({ discuss }) => {
  return (
    <div className="w-full h-full  dark:bg-dark0 rounded-lg flex pt-4 flex-col space-y-2">
      <div className=" flex justify-between items-center mb-2">
        <span className="font-bold text-sm text-darker">
          Related discussion
        </span>
        <a
          className=" dark:text-light0 px-4 rounded-full link inline-flex items-center text-sm !text-grey-600 underline font-medium bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0"
          href="/"
        >
          More
        </a>
      </div>
      {discuss.map((discuss, index) => (
        <div
          key={index}
          className="flex hover:cursor-pointer hover:text-mainColor dark:text-light0 bg-light4 dark:bg-dark1 shadow hover:shadow-md p-2 rounded-lg transform transition-all duration-100 "
        >
          <a href="" className="flex items-center mr-3 brightness-90 w-14 h-14">
            <Avatar
              src={avt}
              alt=""
              cln="rounded-[10px_!important] w-14 h-14 p-[1px] object-cover"
            />
          </a>
          <div className="w-2/3 ml-2">
            <span className="text-sm font-medium">{discuss.title}</span>
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
                        ${topicColors["React"] || ""}`}
              >
                React
              </div>
              <div
                className={`inline-block border-2 px-2 py-[2px] rounded-full m-[1px] text-[10px]
                        ${topicColors["C#"] || ""}`}
              >
                C#
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListDiscussCard;
