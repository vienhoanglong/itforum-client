import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import bg from "../assets/ellipse.png";
import logo from "../assets/Logo.png";
interface LayoutAuthenticationProps {
  children: ReactNode;
  heading: string;
}

export const LayoutAuthentication: React.FC<LayoutAuthenticationProps> = ({
  children,
  heading,
}: LayoutAuthenticationProps) => {
  return (
    <div className="relative w-full min-h-screen p-10 bg-light2 dark:bg-dark0 isolate">
      <img
        srcSet={bg}
        alt="bg"
        className="hidden xl:block absolute w-full bottom-0 left-0 right-0 pointer-events-none z-[-1]"
      />
      <Link to="/" className="inline-block mb-5">
        <img srcSet={`${logo} 3.5x`} alt="forum-it" />
      </Link>
      <div className="w-full max-w-[500px] max-h-[600px] bg-light2 dark:bg-dark2 rounded-xl px-5 py-8 lg:px-16 lg:py-12 mx-auto shadow-sdprimary dark:shadow-md">
        <h1 className="mb-1 text-lg font-semibold text-center lg:text-xl lg:mb-3 text-dark1 dark:text-light1">
          {heading}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default LayoutAuthentication;
