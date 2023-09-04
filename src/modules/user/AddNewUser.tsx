import { Button } from "@/components/button";
import { Label } from "@/components/label";
import IUserCreate from "@/interface/API/IUserCreate";

import React, { useState } from "react";

type CreateUserFormProps = {
  onSubmit: (data: IUserCreate) => void;
};
const AddNewUser: React.FC<CreateUserFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<IUserCreate>({
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    email: string | null;
    username: string | null;
    password: string | null;
  }>({
    email: null,
    username: null,
    password: null,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: null });
  };
  const handleSubmit = () => {
    const { email, username, password } = formData;
    if (!email) {
      setErrors({ ...errors, email: "Email không được để trống" });
      return;
    }

    if (!username) {
      setErrors({ ...errors, username: "Username không được để trống" });
      return;
    }

    if (!password) {
      setErrors({ ...errors, password: "Password không được để trống" });
      return;
    }
    console.log(formData);
    onSubmit(formData);
  };
  return (
    <>
      <div className="flex justify-start mb-8">
        <span className="dark:text-light0 font-semibold">Create User</span>
      </div>
      <form className="text-xs dark:text-light0 max-sm:h-[530px] ">
        <div className="mb-4">
          <div className="mb-4">
            <Label htmlFor="email" className="block mb-1 text-xs font-semibold">
              Email
            </Label>
            <input
              onChange={handleChange}
              name="email"
              placeholder="Email..."
              className=" dark:bg-dark0 border rounded-lg w-[300px] p-2 h-[30px] block dark:border-dark2 border-gray-500 text-xs shadow-inner "
            ></input>
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
          </div>
          <Label
            htmlFor="username"
            className="block mb-1 text-xs font-semibold"
          >
            Username
          </Label>
          <input
            onChange={handleChange}
            name="username"
            placeholder="Username..."
            className=" dark:bg-dark0 border rounded-lg w-[300px] p-2 h-[30px] block dark:border-dark2 border-gray-500 text-xs shadow-inner "
          ></input>
          {errors.username && (
            <span className="text-red-500">{errors.username}</span>
          )}
        </div>
        <div className="mb-4">
          <Label
            htmlFor="password"
            className="block mb-1 text-xs font-semibold"
          >
            Password
          </Label>
          <input
            onChange={handleChange}
            name="password"
            placeholder="Password..."
            className=" dark:bg-dark0 border rounded-lg w-[300px] p-2 h-[30px] block dark:border-dark2 border-gray-500 text-xs shadow-inner "
          ></input>
          {errors.password && (
            <span className="text-red-500">{errors.password}</span>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            size="small"
            className="p-1 flex space-x-1 mt-10"
            type="button"
            kind="secondary"
            handle={handleSubmit}
          >
            <span className="text-[12px]">Create</span>
          </Button>
        </div>
      </form>
    </>
  );
};
export default AddNewUser;
