import React from "react";

type TopicListProps = {
  exampleDataTopic: { id: number; name: string }[];
  topicColors: Record<string, string>;
};

const TopicList: React.FC<TopicListProps> = ({
  exampleDataTopic,
  topicColors,
}) => {
  return (
    <div className="w-full my-2 flex flex-wrap">
      {exampleDataTopic.map((topic) => (
        <div
          key={topic.id}
          className={`cursor-pointer inline-block text-xs border-2 px-2 py-1 rounded-full m-[1px] ${
            topicColors[topic.name] || ""
          }`}
        >
          {topic.name}
        </div>
      ))}
    </div>
  );
};

export default TopicList;
