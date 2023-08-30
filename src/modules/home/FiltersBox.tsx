import Topic from "@/interface/topic";
import React, { useEffect, useState } from "react";
import { BsFilterRight, BsSearch } from "react-icons/bs";
import { HiChevronDown } from "react-icons/hi";

interface FiltersBoxProps {
  listTopic?: Topic[] | null;
  handleSearch: (value: string) => void;
  handleFilter: (filterOptions: { sort: string; topic: string }) => void;
}

export const FiltersBox: React.FC<FiltersBoxProps> = ({
  listTopic,
  handleSearch,
  handleFilter,
}) => {
  const [filterOptions, setFilterOptions] = useState({
    sort: "desc",
    topic: "",
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    handleSearch(search);
  }, [search, handleSearch]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === "topic") {
      setFilterOptions({ ...filterOptions, topic: value });
      handleFilter({ sort: filterOptions.sort, topic: value });
    } else {
      setFilterOptions({ ...filterOptions, sort: value });
      handleFilter({ sort: value, topic: filterOptions.topic });
    }
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
  };
  return (
    <div className="flex flex-row flex-wrap gap-2 justify-between">
      <div className="flex gap-2">
        <div className="relative">
          <select
            className="appearance-none flex cursor-pointer items-center rounded-lg bg-slate-100 px-4 py-3 text-xs leading-none text-dark2 dark:bg-dark1 dark:text-light0 w-full mr-5"
            onChange={handleFilterChange}
            value={filterOptions.sort}
            name="sort"
          >
            <option value="desc">Mới nhất</option>
            <option value="asc">Cũ nhất</option>
          </select>
          <HiChevronDown className="text-dark1 dark:text-light1 text-base absolute right-4 top-[10px] fill-current pointer-events-none" />
        </div>
        <div className="relative">
          <select
            className="appearance-none flex cursor-pointer items-center rounded-lg bg-slate-100 px-4 py-3 text-xs leading-none text-dark2 dark:bg-dark1 dark:text-light0 w-full mr-5"
            onChange={handleFilterChange}
            value={filterOptions.topic || ""}
            name="topic"
          >
            <option value="">All</option>
            {listTopic?.map((topic) => (
              <option key={topic._id} value={topic._id}>
                {topic.name}
              </option>
            ))}
          </select>
          <BsFilterRight className="text-dark1 dark:text-light1 text-base absolute right-4 top-[10px] fill-current pointer-events-none" />
        </div>
      </div>
      <form
        className="flex items-center mb-3 h-9 w-full rounded-lg md:mt-0 md:w-52 bg-slate-100 text-dark1 dark:bg-dark1 dark:text-light0"
        autoComplete="off"
      >
        <label htmlFor="q" className="flex w-full px-3 flex-row">
          <BsSearch className="text-dark1 dark:text-light1 text-base" />
          <input
            id="q"
            className="ml-3 h-full w-full pt-0 text-xs bg-transparent outline-none"
            placeholder="Begin your search..."
            value={search}
            onChange={handleSearchChange}
          />
        </label>
      </form>
    </div>
  );
};

export default FiltersBox;
