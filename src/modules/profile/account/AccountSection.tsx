import { Button } from "@/components/button";
import { Label } from "@/components/label";
import React from "react";

const AccountSection: React.FC = () => {
  return (
    <div className="mb-4 dark:bg-dark2 bg-light3 shadow-sm w-auto rounded-lg p-4 relative">
      <h2 className="text-base font-bold mb-4">Account</h2>
      <div className="flex flex-wrap max-[920px]:flex-col space-y-4 ">
        <div className="w-1/2 max-[920px]:w-full flex flex-col justify-start  mt-4 space-y-4 min-w-[120px] mb-4 ">
          <Label htmlFor="accountInfo" className="text-xs font-semibold mr-2">
            Account infomation:
          </Label>
          <div className="mb-4 flex flex-col  justify-start">
            <label htmlFor="username" className="text-xs">
              Username:
            </label>
            <input
              type="text"
              id="username"
              readOnly
              className="border w-[170px] border-gray-300 dark:bg-dark0 rounded-md px-2 py-1 text-xs"
            />
          </div>
          <div className="mb-4 flex flex-col justify-start">
            <label htmlFor="password" className="text-xs ">
              Password:
            </label>
            <input
              type="text"
              id="password"
              readOnly
              className="border w-[170px] border-gray-300 dark:bg-dark0 rounded-md px-2 py-1 text-xs"
            />
          </div>
        </div>
        <div className="w-1/2 max-[920px]:w-full flex flex-col space-y-4 min-w-[120px] min-[920px]:pl-5 min-[920px]:pr-10 mb-4 min-[920px]:border-l-2 dark:border-dark1 md:pr-10 max-[920px]:border-t-2 max-[920px]:pt-4">
          <div className=" flex justify-start">
            <Label
              htmlFor="changePass"
              className="block text-xs font-semibold mr-2"
            >
              Change password:
            </Label>
          </div>
          <div className="w-full mb-4 flex justify-between items-center">
            <label htmlFor="major" className="block text-xs  mr-2 ">
              Current password:
            </label>
            <input
              type="text"
              id="major"
              className="border w-40 border-gray-300 dark:bg-dark0 rounded-md px-2 py-1 text-xs"
            />
          </div>
          <div className="mb-4 flex justify-between items-center">
            <label htmlFor="major" className="block text-xs  mr-2 ">
              New password:
            </label>
            <input
              type="text"
              id="major"
              className="border w-40 border-gray-300 dark:bg-dark0 rounded-md px-2 py-1 text-xs"
            />
          </div>
          <div className="mb-4 flex justify-between items-center">
            <label htmlFor="major" className="block text-xs  mr-2 ">
              Confirm password:
            </label>
            <input
              type="text"
              id="major"
              className="border  w-40 border-gray-300 dark:bg-dark0 rounded-md px-2 py-1 text-xs"
            />
          </div>
          <div className="mb-4 flex justify-between items-center">
            <label htmlFor="major" className="block text-xs  mr-2 ">
              CODE:
            </label>
            <div className="flex justify-end items-center space-x-2 ml-8">
              <input
                type="text"
                id="major"
                className="block border w-28 border-gray-300 dark:bg-dark0 rounded-md px-2 py-1 text-xs"
              />
              <button
                type="submit"
                className="text-xs ml-2 bg-teal0 rounded-lg p-2"
              >
                Get
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              kind="primary"
              type="submit"
              size="small"
              className="text-xs ml-2 bg-mainColor rounded-lg p-2"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSection;
