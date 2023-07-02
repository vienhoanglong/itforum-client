import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import classNames from "utils/classNames";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  href?: string;
  kind?: "primary" | "secondary" | "ghost";
}

export const Button: React.FC<ButtonProps> = ({
  type = "button",
  children,
  className = "",
  isLoading = false,
  ...rest
}: ButtonProps) => {
  const child = isLoading ? (
    <div className="w-10 h-10 border-4 border-white rounded-full border-t-transparent border-b-transparent animate-spin"></div>
  ) : (
    children
  );
  let defaultClassName =
    "flex items-center justify-center p-2 text-base font-semibold rounded-xl min-h-[35px]";
  switch (rest.kind) {
    case "primary":
      defaultClassName = defaultClassName + " bg-primary text-white";
      break;
    case "secondary":
      defaultClassName = defaultClassName + " bg-secondary text-white";
      break;
    case "ghost":
      defaultClassName =
        defaultClassName + " bg-secondary bg-opacity-10 text-secondary";
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
        isLoading ? "opacity-50 pointer-events-none" : "",
        className
      )}
      type={type}
      {...rest}
    >
      {child}
    </button>
  );
};

export default Button;
