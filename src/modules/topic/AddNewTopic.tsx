import { Button } from "@/components/button";
import { Label } from "@/components/label";

import React from "react";

const colors = [
  { color: "bg-yellow-500", value: "Value 1" },
  { color: "bg-blue-500", value: "Value 2" },
  { color: "bg-orange-500", value: "Value 3" },
  { color: "bg-red-500", value: "Value 3" },
  { color: "bg-green-500", value: "Value 3" },
  { color: "bg-violet-500", value: "Value 3" },
  { color: "bg-purple-500", value: "Value 1" },
  { color: "bg-cyan-500", value: "Value 2" },
  { color: "bg-emerald-500", value: "Value 3" },
  { color: "bg-lime-500", value: "Value 3" },
  { color: "bg-teal-500", value: "Value 3" },
  { color: "bg-amber-500", value: "Value 3" },
  { color: "bg-sky-500", value: "Value 3" },
];

type CreateUserFormProps = {
  onSubmit: () => void;
};
const AddNewTopic: React.FC<CreateUserFormProps> = ({ onSubmit }) => {
  const handleColorClick = (value: string) => {
    alert(`You selected: ${value}`);
  };
  return (
    <>
      <div className="flex justify-start mb-8">
        <span className="dark:text-light0 font-semibold">Create Topic</span>
      </div>
      <form className="text-xs dark:text-light0 max-sm:h-[530px] ">
        <div className="mb-4">
          <div className="mb-4">
            <Label htmlFor="title" className="block mb-1 text-xs font-semibold">
              Name
            </Label>
            <input
              name="title"
              placeholder="Name..."
              className=" dark:bg-dark0 border rounded-lg w-[300px] p-2 h-[30px] block dark:border-dark2 border-gray-500 text-xs shadow-inner "
            ></input>
          </div>
          <div className="mb-4">
            <Label htmlFor="title" className="block mb-1 text-xs font-semibold">
              Description
            </Label>
            <input
              name="title"
              placeholder="Description..."
              className=" dark:bg-dark0 border rounded-lg w-[300px] p-2 h-[30px] block dark:border-dark2 border-gray-500 text-xs shadow-inner "
            ></input>
          </div>
          <div className="mb-4">
            <Label htmlFor="title" className="block mb-1 text-xs font-semibold">
              Image
            </Label>
            <input
              name="title"
              placeholder="Image..."
              className=" dark:bg-dark0 border rounded-lg w-[300px] p-2 h-[30px] block dark:border-dark2 border-gray-500 text-xs shadow-inner "
            ></input>
          </div>
          <div className=" mb-4">
            <Label htmlFor="title" className="block mb-1 text-xs font-semibold">
              Type
            </Label>
            <div>
              <select className="bg-light1 dark:bg-dark2 rounded-md py-1 px-2">
                <option value="">Choose</option>
                <option value="subject">Subject</option>
                <option value="zip">Framework</option>
                <option value="doc">Language</option>
              </select>
            </div>
          </div>
          <div>
            <Label htmlFor="title" className="block mb-1 text-xs font-semibold">
              Choose color
            </Label>
            <div className=" flex flex-wrap max-w-[300px] gap-1 w-auto cursor-pointer ">
              {colors.map((colorInfo, index) => (
                <div
                  key={index}
                  className={`w-[30px] h-[30px] rounded-lg  ${colorInfo.color}`}
                  onClick={() => handleColorClick(colorInfo.value)}
                />
              ))}
            </div>
          </div>
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
export default AddNewTopic;
