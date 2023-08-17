import IUser from "@/interface/user";
import React from "react";
import { HiFlag, HiTrash, HiEyeOff } from "react-icons/hi";

interface ActionMenuProps {
  handleReportClick?: () => void;
  userCurrentId?: IUser | null;
  userOwnerId?: IUser | null;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  handleReportClick,
  userCurrentId,
  userOwnerId,
}) => {
  return (
    <div className="bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 absolute top-full right-0 rounded-md shadow-lg z-10">
      <button
        className="flex items-center bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 w-full text-left py-2 px-4"
        onClick={handleReportClick}
      >
        <HiFlag className="mr-2" />
        Report
      </button>
      {userCurrentId?.role === 0 ||
        (userCurrentId?.role === userOwnerId?.role && (
          <>
            <button className="flex items-center bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 w-full text-left py-2 px-4">
              <HiTrash className="mr-2" />
              Delete
            </button>
            <button className="flex items-center bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 w-full text-left py-2 px-4">
              <HiEyeOff className="mr-2" />
              Hide
            </button>
          </>
        ))}
    </div>
  );
};

export default ActionMenu;
