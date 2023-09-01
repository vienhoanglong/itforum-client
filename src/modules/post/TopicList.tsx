import { colorTopic } from "@/constants/global";
import Topic from "@/interface/topic";
import React from "react";
import { Link } from "react-router-dom";

type TopicListProps = {
  listTopic: Topic[] | null;
};

const TopicList: React.FC<TopicListProps> = ({ listTopic }) => {
  return (
    <>
      {listTopic?.map((topic, index) => (
        <Link key={index} to={`/topics/detail/${topic._id}`}>
          <div
            className={`inline-block border-2 px-2 py-[2px] rounded-full m-[1px] text-[10px] ${
              colorTopic[topic.color as keyof typeof colorTopic] || ""
            }`}
          >
            {topic.name}
          </div>
        </Link>
      ))}
    </>
  );
};

export default TopicList;
