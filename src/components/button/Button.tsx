import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import classNames from "utils/classNames";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  href?: string;
  handle?: (() => void) | undefined;
  kind?: "primary" | "secondary" | "ghost" | "custom";
  size?: "small" | "medium" | "large";
  disable?: true;
}

export const Button: React.FC<ButtonProps> = ({
  type = "button",
  children,
  className = "",
  isLoading = false,
  handle,
  ...rest
}: ButtonProps) => {
  const child = isLoading ? (
    <div className="w-10 h-10 border-4 border-white rounded-full border-t-transparent border-b-transparent animate-spin"></div>
  ) : (
    children
  );
  let defaultClassName =
    "flex items-center justify-center p-4 text-base font-semibold rounded-xl";
  switch (rest.kind) {
    case "primary":
      defaultClassName = defaultClassName + " bg-darker text-white";
      break;
    case "secondary":
      defaultClassName = defaultClassName + " bg-teal0 text-white";
      break;
    case "ghost":
      defaultClassName =
        defaultClassName + " bg-orange0 bg-opacity-10 text-white";
      break;
    case "custom":
      defaultClassName;
      break;
    default:
      break;
  }
  switch (rest.size) {
    case "small":
      defaultClassName = defaultClassName + " max-h-[40px]";
      break;
    case "medium":
      defaultClassName = defaultClassName + " max-h-[48px]";
      break;
    case "large":
      defaultClassName = defaultClassName + " max-h-[60px]";
      break;
    default:
      break;
  }
  if (rest.href)
    return (
      <Link to={rest.href} className={classNames(defaultClassName, className)}>
        {child}
      </Link>
    );
  return (
    <button
      className={classNames(
        defaultClassName,
        isLoading ? " opacity-50 pointer-events-none" : "",
        className
      )}
      type={type}
      onClick={handle}
      {...rest}
      disabled={rest.disable ? true : false}
    >
      {child}
    </button>
  );
};

export default Button;
