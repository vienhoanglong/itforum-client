import React from "react";
import { Button } from "../button";

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className=" mt-6">
      <div className="text-sm dark:text-light0">{message}</div>
      <div className="flex space-x-8 justify-center mt-4">
        <Button
          size="small"
          className="text-xs w-14 bg-red-400 hover:bg-red-500"
          kind="primary"
          handle={onConfirm}
        >
          Yes
        </Button>
        <Button
          size="small"
          className="text-xs w-14 bg-teal-400 hover:bg-teal-500"
          kind="primary"
          handle={onCancel}
        >
          No
        </Button>
      </div>
    </div>
  );
};

export default ConfirmDialog;
