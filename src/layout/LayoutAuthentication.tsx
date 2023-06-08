import React, { ReactNode } from "react"
import { Link } from "react-router-dom";
import bg from "../assets/ellipse.png"
import logo from "../assets/logo.png";
interface LayoutAuthenticationProps {
    children: ReactNode;
    heading: string;
}

export const LayoutAuthentication: React.FC<LayoutAuthenticationProps> = ({children, heading}:LayoutAuthenticationProps) => {
    return (
        <div className="relative w-full min-h-screen p-10 bg-lite dark:bg-darkbg isolate">
        <img
          srcSet={bg}
          alt="bg"
          className="hidden xl:block absolute w-full bottom-0 left-0 right-0 pointer-events-none z-[-1]"
        />
        <Link to="/" className="inline-block mb-5 lg:mb-16">
          <img  srcSet={`${logo} 2x`} alt="forum-it" />
        </Link>
        <div className="w-full max-w-[556px] bg-white dark:bg-darkSecondary rounded-xl px-5 py-8 lg:px-16 lg:py-12 mx-auto">
          <h1 className="mb-1 text-lg font-semibold text-center lg:text-xl lg:mb-3 text-text1 dark:text-white">
            {heading}
          </h1>
          {children}
        </div>
      </div>
    );
};

export default LayoutAuthentication;