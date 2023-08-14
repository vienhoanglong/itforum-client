import { Button } from "@/components/button";
import { Label } from "@/components/label";

import React, { useState } from "react";

type CreateUserFormProps = {
  onSubmit: () => void;
};
const AddNewUser: React.FC<CreateUserFormProps> = ({ onSubmit }) => {
  return (
    <>
      <div className="flex justify-start mb-8">
        <span className="dark:text-light0 font-semibold">Create User</span>
      </div>
      <form className="text-xs dark:text-light0 max-sm:h-[530px] ">
        <div className="mb-4">
          <div className="mb-4">
            <Label htmlFor="title" className="block mb-1 text-xs font-semibold">
              Email
            </Label>
            <input
              name="title"
              placeholder="Email..."
              className=" dark:bg-dark0 border rounded-lg w-[300px] p-2 h-[30px] block dark:border-dark2 border-gray-500 text-xs shadow-inner "
            ></input>
          </div>
          <Label htmlFor="title" className="block mb-1 text-xs font-semibold">
            Username
          </Label>
          <input
            name="title"
            placeholder="Username..."
            className=" dark:bg-dark0 border rounded-lg w-[300px] p-2 h-[30px] block dark:border-dark2 border-gray-500 text-xs shadow-inner "
          ></input>
        </div>
        <div className="mb-4">
          <Label htmlFor="title" className="block mb-1 text-xs font-semibold">
            Password
          </Label>
          <input
            name="title"
            placeholder="Password..."
            className=" dark:bg-dark0 border rounded-lg w-[300px] p-2 h-[30px] block dark:border-dark2 border-gray-500 text-xs shadow-inner "
          ></input>
        </div>
        <div className="mb-4">
          <Label htmlFor="title" className="block mb-1 text-xs font-semibold">
            Confirm Password
          </Label>
          <input
            name="title"
            placeholder="Confirm Password..."
            className=" dark:bg-dark0 border rounded-lg w-[300px] p-2 h-[30px] block dark:border-dark2 border-gray-500 text-xs shadow-inner "
          ></input>
        </div>

        <div className="flex justify-end">
          <Button
            size="small"
            className="p-1 flex space-x-1 mt-10"
            type="button"
            kind="secondary"
            handle={onSubmit}
          >
            <span className="text-[12px]">Create</span>
          </Button>
        </div>
      </form>
    </>
  );
};
export default AddNewUser;
