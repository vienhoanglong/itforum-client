import React from "react";

const TopicDashboard: React.FC = () => {
  return (
    <div className=" flex flex-col justify-between">
      <div className="text-sm dark:text-white mb-4 font-bold">Top Topics</div>
      <div className="text-xs dark:text-dark3 mb-4 font-normal">
        Post & discussion
      </div>
      <div className="flex flex-col gap-2">
        <div className=" bg-yellow-300 text-yellow-600 font-semibold px-4 py-2 rounded-xl flex justify-between items-center">
          <div className=" bg-yellow-100 rounded-full p-1">#1</div>
          <div>javascript</div>
          <div className="bg-yellow-100 px-4 py-1 rounded-full">100</div>
        </div>
        <div className=" bg-blue-300 text-blue-600 font-semibold px-4 py-2 rounded-xl flex justify-between items-center">
          <div className=" bg-blue-100 rounded-full p-1">#2</div>
          <div>reactjs</div>
          <div className="bg-blue-100 px-4 py-1 rounded-full">76</div>
        </div>
        <div className=" bg-orange-300 text-orange-600 font-semibold px-4 py-2 rounded-xl flex justify-between items-center">
          <div className=" bg-orange-100 rounded-full p-1">#3</div>
          <div>java</div>
          <div className="bg-orange-100 px-4 py-1 rounded-full">62</div>
        </div>
      </div>
    </div>
  );
};

export default TopicDashboard;
