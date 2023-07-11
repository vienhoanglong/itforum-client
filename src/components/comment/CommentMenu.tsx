import React, { useState } from "react";
import { HiDotsVertical, HiFlag, HiTrash, HiEyeOff } from "react-icons/hi";

interface CommentMenuProps {
  handleMenuComment: () => void;
  isMenuComment: boolean;
}

const CommentMenu: React.FC<CommentMenuProps> = ({
  handleMenuComment,
  isMenuComment,
}) => {
  return (
    <div className="ml-auto relative bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 rounded-full py-2">
      <HiDotsVertical size={20} onClick={handleMenuComment} />
      {isMenuComment && (
        <div className="bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 absolute top-full right-0 shadow-xl z-10">
          <button className="flex items-center bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 w-full text-left py-2 px-4">
            <HiFlag className="mr-2" />
            Report
          </button>
          <button className="flex items-center bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 w-full text-left py-2 px-4">
            <HiTrash className="mr-2" />
            Delete
          </button>
          <button className="flex items-center bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 w-full text-left py-2 px-4">
            <HiEyeOff className="mr-2" />
            Hide
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentMenu;