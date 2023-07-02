import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import classNames from "utils/classNames";

interface ButtonSecondaryProps {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  href?: string;
  kind?: "primary" | "secondary" | "ghost";
  size?: "small" | "medium" | "large";
}

export const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  type = "button",
  children,
  className = "",
  isLoading = false,
  ...rest
}: ButtonSecondaryProps) => {
  const child = isLoading ? (
    <div className="w-10 h-10 border-4 border-light0 rounded-full border-t-transparent border-b-transparent animate-spin"></div>
  ) : (
    children
  );
  let defaultClassName =
    "flex items-center justify-center p-4 text-base font-semibold rounded-xl border border-2";
  switch (rest.kind) {
    case "primary":
      defaultClassName = defaultClassName + " border-darker text-darker";
      break;
    case "secondary":
      defaultClassName = defaultClassName + " text-teal0 border-teal0";
      break;
    case "ghost":
      defaultClassName =
        defaultClassName + " border-orange0 text-orange0";
      break;
    default:
      break;
  }
  switch (rest.size) {
    case "small":
      defaultClassName = defaultClassName + " max-h-[40px] ";
      break;
    case "medium":
      defaultClassName = defaultClassName + " max-h-[48px] ";
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

export default ButtonSecondary;
