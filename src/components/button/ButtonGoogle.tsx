import React from "react";
import logoGoogle from "assets/icon-google.png";
interface ButtonGoogleProps {
  text?: string;
  onClick?: () => void;
}

const ButtonGoogle: React.FC<ButtonGoogleProps> = ({
  text = "Sign up with google",
  onClick,
}) => {
  return (
    <button
      className="flex items-center justify-center w-full py-4 mb-5 text-xs font-semibold border gap-x-3 border-strock rounded-xl text-text2 dark:text-white dark:border-darkStroke"
      onClick={onClick}
    >
      <img srcSet={`${logoGoogle} 2x`} alt="icon-google" />
      <span>{text}</span>
    </button>
  );
};

export default ButtonGoogle;
