import React, { ReactNode } from "react";
import classNames from "utils/classNames";

export interface LabelProps {
  children?: ReactNode;
  htmlFor?: string;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  className = "",
}: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={classNames(
        "inline-block self-start text-sm font-medium cursor-pointer text-text2 dark:text-text3",
        className
      )}
    >
      {children}
    </label>
  );
};

export default Label;
