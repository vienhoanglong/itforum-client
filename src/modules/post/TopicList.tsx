import React from "react";

type TopicListProps = {
  exampleDataTopic: { id: string; name: string }[];
  topicColors: Record<string, string>;
};

const TopicList: React.FC<TopicListProps> = ({
  exampleDataTopic,
  topicColors,
}) => {
  return (
    <>
      {exampleDataTopic.map((topic) => (
        <div
          key={topic.id}
          className={`cursor-pointer 
          inline-block border-2 px-2 py-[2px] rounded-full m-[1px] text-[10px]
          
          ${topicColors[topic.name.toLocaleLowerCase()] || ""}`}
        >
          {topic.name}
        </div>
      ))}
    </>
  );
};

export default TopicList;
