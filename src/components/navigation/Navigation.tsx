import React from "react";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const hanldeForward = () => {
    navigate(1);
  };
  return (
    <div className=" flex gap-2 ">
      <button
        className=" w-24 dark:text-light0 rounded-full mb-4 pr-1 link flex justify-start items-center text-sm font-medium !text-grey-600 bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0"
        onClick={handleBack}
      >
        <HiArrowCircleLeft className="w-6 h-6 mr-1" />
        Back
      </button>
      <button
        className=" w-24 dark:text-light0 rounded-full mb-4 link flex justify-end items-center text-sm font-medium !text-grey-600 bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0"
        onClick={hanldeForward}
      >
        Forward
        <HiArrowCircleRight className=" w-6 h-6 ml-1" />
      </button>
    </div>
  );
};
export default Navigation;
