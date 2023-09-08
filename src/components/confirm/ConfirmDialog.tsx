import React, { useState } from "react";
import { Button } from "../button";
import { Label } from "@/components/label";
import { useTranslation } from "react-i18next";

interface ConfirmDialogProps {
  message: string;
  onConfirm: (reason?: string) => void;
  onCancel: () => void;

  isReject?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isReject,
  message,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();
  const [reason, setReason] = useState<string>("");
  const handleChangeReason = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value);
  };
  const handleSubmit = () => {
    if (isReject === true) {
      onConfirm(reason);
    } else {
      onConfirm();
    }
  };

  return (
    <div className=" mt-8">
      <div className="text-sm font-semibold dark:text-light0">{message}</div>
      {isReject === true && (
        <>
          <Label htmlFor="reason" className="block mt-4 text-xs font-semibold">
            {t("reason")}: ({t("optional")})
          </Label>
          <div className="flex justify-start w-full items-center">
            <input
              type="text"
              id="reason"
              name="reason"
              onChange={handleChangeReason}
              className={`border rounded-md w-full px-2 py-1 text-xs border-gray-300
          }`}
            />
          </div>
        </>
      )}
      <div className="flex space-x-8 justify-center mt-4">
        <Button
          size="small"
          className="text-xs w-14 bg-red-400 hover:bg-red-500"
          kind="primary"
          handle={handleSubmit}
        >
          {t("yes")}
        </Button>
        <Button
          size="small"
          className="text-xs w-14 bg-teal-400 hover:bg-teal-500"
          kind="primary"
          handle={onCancel}
        >
          {t("no")}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmDialog;
