import React, { useState } from "react";
import {
  HiArrowCircleLeft,
  HiCheckCircle,
  HiEye,
  HiFilter,
  HiOutlineBan,
  HiSearch,
} from "react-icons/hi";
import ReactPaginate from "react-paginate";
import { exampleData, topicColors } from "../constants/global.ts";

import LayoutSecondary from "@/layout/LayoutSecondary.tsx";

export const ManageApprove: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(selectedItemsPerPage);
    setCurrentPage(0);
  };
  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * itemsPerPage;
  const paginatedData = exampleData.slice(offset, offset + itemsPerPage);

  return (
    <LayoutSecondary>
      <a
        className="dark:text-light0 bg- rounded-full mb-4 pr-1 link inline-flex items-center text-sm font-medium !text-grey-600 bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark1"
        href="/managements"
      >
        <HiArrowCircleLeft className="w-6 h-6 mr-1" />
        Back to Managements
      </a>
      <div className=" h-auto mx-auto bg-light4 dark:bg-dark1 shadow-md p-4 rounded-3xl">
        <div className=" py-4">
          <h4 className="text-xl font-bold text-darker ">Manage Approval</h4>
        </div>
        <div className="flex flex-wrap items-center">
          <div className=" w-full md:w-1/2 mr-auto pt-2">
            <div className="grid grid-cols-1 grid-rows-2 gap-2 py-2 mr-2 ">
              <div className="w-full mr-2 relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className=" dark:bg-dark0 dark:border-dark2 dark:text-light4 border w-3/4 px-8 py-2 text-xs rounded-lg shadow-inner   "
                />
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <HiSearch className="text-darker" size={18}></HiSearch>
                </span>
              </div>
              <div className="w-2/5 relative">
                <select
                  id="filterDropdown"
                  className="text-xs w-full shadow-inner rounded-lg appearance-none px-2 py-1 dark:bg-dark0 dark:border-dark2 border  dark:text-light4"
                >
                  <option value="keyword">Filter</option>
                  <option value="time">Thời gian</option>
                  <option value="category">Thể loại</option>
                  <option value="bookmark">Đánh dấu</option>
                  <option value="author">Tác giả</option>
                </select>
                <span className="absolute inset-y-0 -translate-y-1 right-0 flex items-center pl-2 pr-2">
                  <HiFilter className="text-darker" size={15} />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="min-w-full shadow-lg  ">
            <thead className="bg-light2 dark:bg-dark2 dark:text-light0 text-xs text-center">
              <tr>
                <th className="py-2 px-4  rounded-tl-md ">SN</th>
                <th className="py-2 px-4  ">Author</th>
                <th className="py-2 px-4  ">Title</th>
                <th className="py-2 px-4  ">Topic</th>
                <th className="py-2 px-4  ">Date</th>
                <th className="py-2 px-4  ">Type</th>
                <th className="py-2 px-4  ">Publish</th>
                <th className="py-2 px-4  ">Review</th>
                <th className="py-2 px-4 rounded-tr-md ">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center">
                    Không có bài viết nào
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => (
                  <tr
                    key={item.id}
                    className=" even:bg-light3 odd:bg-light4 dark:odd:bg-dark2 dark:even:bg-dark2 dark:text-light0 text-xs cursor-pointer text-center"
                  >
                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3 ">
                      {item.id}
                    </td>
                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                      {item.author}
                    </td>
                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                      {item.title}
                    </td>
                    <td className="py-2 px-4 border-y text-left border-light0 dark:border-dark3">
                      {item.topic.map((topic) => (
                        <div
                          key={topic.id}
                          className={`inline-block border-2 px-2 py-1 rounded-full  m-[1px] 
                        ${topicColors[topic.name] || ""}`}
                        >
                          {topic.name}
                        </div>
                      ))}
                    </td>

                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                      {item.datePost}
                    </td>
                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                      Post
                    </td>
                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                      {item.publish ? "publish" : "unpublish"}
                    </td>
                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                      <div className=" flex items-center justify-center">
                        <a className="mx-1 p-1 rounded-full  hover:bg-mainColor transition-colors duration-200">
                          <HiEye size={16}></HiEye>
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3">
                      <div className="flex items-center justify-center">
                        <div className="mx-1 p-1 rounded-full text-green-400 hover:bg-mainColor transition-colors duration-200">
                          <HiCheckCircle size={16} />
                        </div>
                        <div className="mx-1 p-1 rounded-full text-red-400 hover:bg-mainColor transition-colors duration-200">
                          <HiOutlineBan size={16} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-center bg-light2 dark:bg-dark2 dark:text-light0 h-8 text-xs rounded-b-md">
          <div className="w-1/2 mr-2 pb-3 ml-1">
            <ReactPaginate
              pageCount={Math.ceil(exampleData.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName="flex justify-center items-center  mt-4 space-x-4"
              pageClassName="m-2"
              activeClassName="underline underline-offset-2"
              previousLabel="<Prev"
              nextLabel="Next>"
            />
          </div>
          <div className="w-1/2 ml-2 flex items-center justify-center">
            <label htmlFor="itemsPerPage" className="mr-2">
              Rows per page:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="text-xs border rounded text-stone-500 h-5"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
        </div>
      </div>
    </LayoutSecondary>
  );
};

export default ManageApprove;