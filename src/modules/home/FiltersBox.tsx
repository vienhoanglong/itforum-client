import React from "react";
import { BsFilterRight, BsSearch } from "react-icons/bs";
import { HiChevronDown } from "react-icons/hi";

export const FiltersBox: React.FC = () => {
  return (
    <div className="flex flex-row flex-wrap gap-2 justify-between">
      <div className="flex gap-2">
        <div className="relative">
          <select className="appearance-none flex cursor-pointer items-center rounded-lg bg-slate-100 px-4 py-3 text-xs leading-none text-dark2 dark:bg-dark1 dark:text-light0 w-full mr-5">
            <option value="">Mới nhất</option>
            <option value="">Nhiều lượt xem nhất</option>
            <option value="">Nhiều lượt bình luận nhất</option>
          </select>
          <HiChevronDown className="text-dark1 dark:text-light1 text-base absolute right-4 top-[10px] fill-current pointer-events-none" />
        </div>
        <div className="relative">
          <select className="appearance-none flex cursor-pointer items-center rounded-lg bg-slate-100 px-4 py-3 text-xs leading-none text-dark2 dark:bg-dark1 dark:text-light0 w-full mr-5">
            <option value="">Filters</option>
            <option value="">C#</option>
            <option value="">Hồ sơ môn học</option>
          </select>
          <BsFilterRight className="text-dark1 dark:text-light1 text-base absolute right-4 top-[10px] fill-current pointer-events-none" />
        </div>
      </div>
      <form
        className="flex items-center mb-3 h-9 w-full rounded-lg md:mt-0 md:w-52 bg-slate-100 text-dark1 dark:bg-dark1 dark:text-light0"
        autoComplete="off"
      >
        <label htmlFor="q" className="flex px-3 flex-row">
          <BsSearch className="text-dark1 dark:text-light1 text-base" />
          <input
            id="q"
            className="ml-3 h-full w-full pt-0 text-xs bg-transparent outline-none"
            placeholder="Begin your search..."
          />
        </label>
      </form>
    </div>
  );
};

export default FiltersBox;