import IUser from "@/interface/user";
import React from "react";
import {
  HiFlag,
  HiTrash,
  HiEyeOff,
  HiEye,
  HiArrowCircleUp,
} from "react-icons/hi";

interface ActionMenuProps {
  handleReportClick?: () => void;
  handleRestore?: () => void;
  handleHidden?: () => void;
  handlePublish?: () => void;
  handleDeleted?: () => void;
  userCurrentId?: IUser | null;
  userOwnerId?: IUser | null;
  status?: number;
  isDraft?: boolean;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  handleReportClick,
  userCurrentId,
  userOwnerId,
  handleHidden,
  handleDeleted,
  handlePublish,
  status,
  isDraft,
  handleRestore,
}) => {
  return (
    <div className="bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 absolute top-full right-0 rounded-md shadow-lg z-50">
      <button
        className="flex items-center bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 w-full text-left py-2 px-4"
        onClick={handleReportClick}
      >
        <HiFlag className="mr-2" />
        Report
      </button>
      {(userCurrentId?.role === 0 ||
        userCurrentId?._id === userOwnerId?._id) && (
        <>
          {isDraft === false && (
            <>
              <button
                onClick={handleDeleted}
                className="flex items-center bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 w-full text-left py-2 px-4"
              >
                <HiTrash className="mr-2" />
                Delete
              </button>

              {status === 1 && (
                <button
                  onClick={handleHidden}
                  className="flex items-center bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 w-full text-left py-2 px-4"
                >
                  <HiEyeOff className="mr-2" />
                  Hide
                </button>
              )}
              {status === 3 && (
                <button
                  onClick={handlePublish}
                  className="flex items-center bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 w-full text-left py-2 px-4"
                >
                  <HiEye className="mr-2" />
                  Publish
                </button>
              )}
            </>
          )}
          {isDraft === true && (
            <button
              onClick={handleRestore}
              className="flex items-center bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0 dark:text-light0 w-full text-left py-2 px-4"
            >
              <HiArrowCircleUp className="mr-2" />
              Restore
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ActionMenu;
