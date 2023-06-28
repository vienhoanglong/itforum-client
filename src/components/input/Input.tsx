import React from "react";
import { useController, Control } from "react-hook-form";
import classNames from "utils/classNames";

interface InputProps {
  name: string;
  type?: string;
  error?: string;
  control: Control<any>;
  placeholder?: string;
  children?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  name,
  type = "text",
  error = "",
  control,
  placeholder = "",
  children,
  ...rest
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <div className="relative">
      <input
        id={name}
        type={type}
      
        className={classNames(
          "w-full px-4 py-2 text-sm font-medium border rounded-xl placeholder:text-text4 dark:placeholder:text-text2  bg-transparent",
          error.length > 0
            ? "border-error text-error"
            : "border-strock text-text1 dark:border-darkStroke",
          children ? "pr-16" : ""
        )}
        placeholder={error.length <= 0 ? placeholder : ""}
        {...rest}
        {...field}
      />
      {error.length > 0 && (
        <span className="absolute text-sm font-medium pointer-events-none text-error top-2/4 -translate-y-2/4 left-6 error-input">
          {error}
        </span>
      )}
      {children && (
        <span className="absolute cursor-pointer select-none right-6 top-2/4 -translate-y-2/4">
          {children}
        </span>
      )}
    </div>
  );
};
export default Input;
