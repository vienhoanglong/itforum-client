import React from "react";
import logo from "assets/logo.png";
import { IconChats, IconEye } from "components/icons";
import { Link } from "react-router-dom";
export const Post: React.FC = () => {
  return (
    <div>
      <div className="relative flex flex-col px-4 py-4 mb-3 duration-300 cursor-pointer rounded-xl md:flex-row bg-slate-100">
        <div className="flex items-center self-start w-full mb-4 md:mr-5 md:mb-0 md:block md:w-auto">
          <div className="flex items-center">
            <a
              href=""
              className="relative flex items-start mr-3 brightness-90 md:mr-0 md:mb-2 w-[56px] h-[56px] p-[2px]"
            >
              <img src={logo} alt="" className="relative w-full lazy lazyloaded rounded-[9px]" />
            </a>
            <strong className="uppercase md:hidden">Vien</strong>
          </div>
          <div className="flex items-center justify-center py-2 ml-auto rounded-xl bg-grey-400 md:hidden">
            <div className="flex items-center px-3">
              <svg
                width="13"
                height="12"
                viewBox="0 0 15 14"
                className="mr-2 text-grey-700 dark:text-grey-600"
              >
                <path
                  className="fill-current"
                  fill-rule="evenodd"
                  d="M7.5 0C3.344 0 0 2.818 0 6.286c0 1.987 1.094 3.757 2.781 4.914l.117 2.35c.022.438.338.58.704.32l2.023-1.442c.594.144 1.219.18 1.875.18 4.156 0 7.5-2.817 7.5-6.285C15 2.854 11.656 0 7.5 0z"
                ></path>
              </svg>
              <span className="text-xs font-semibold leading-none text-grey-800">
                3
              </span>
            </div>
          </div>
        </div>
        <div className="w-full md:mb-0 lg:mt-1">
          <div className="flex flex-col justify-between h-full">
            <div className="-mt-1 md:flex md:items-start">
              <h4 className="mb-4 tracking-normal lg:clamp one-line md:pr-6 lg:mb-0">
                <a
                  href=""
                  className="text-xl font-semibold conversation-list-link link inherits-color text-text1"
                >
                  Download PDF with image using DomPDF on Laravel 8
                </a>
              </h4>
              <div className="relative hidden text-center md:ml-auto md:flex md:flex-row-reverse md:items-center">
                <Link className="block px-0 py-2 ml-5 text-sm font-medium text-center btn-chanel w-28 text-text1" to={""}>
                  Code Review
                </Link>
                <div className="flex items-center justify-center ml-4">
                  <div className="mr-1">
                    <IconChats></IconChats>
                  </div>
                  <span className="relative text-xs font-medium leading-none text-left text-text1">
                    3
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <div className="mr-1">
                    <IconEye></IconEye>
                  </div>
                  <span className="text-xs font-medium leading-none text-left text-text1">
                    2552
                  </span>
                </div>
              </div>
            </div>
            <div className="lg:clamp two-lines mb-6 break-words leading-normal text-black/90 lg:mb-0 lg:pr-8 text-[1rem]">
              I'm trying to download my data in my database with images and
              tried some tutorials I found on internet but I can't get to
              download those images together with the data. I used dd(); and
              even have a LoadView which shows the image is retrieved and being
            </div>
            <div className="font-semibold leading-none tracking-tight text-2xs text-text1">
              <a className="hover:text-blue" href="/@owentech">
                owentech
              </a>{" "}
              replied
              <a
                className="inherits-color link"
                href="https://laracasts.com/discuss/replies/891721"
              >
                <time className="font-semibold">14 minutes ago</time>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
