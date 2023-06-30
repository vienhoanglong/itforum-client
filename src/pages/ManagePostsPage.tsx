import { Button } from "@/components/button";
import LayoutDefault from "@/layout/LayoutDefault";
import React, { useState } from "react";
import { HiPlusCircle, HiTrash } from "react-icons/hi";
import ReactPaginate from "react-paginate";
import { exampleData } from "../constants/global.ts";

export const ManagePosts: React.FC = () => {
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
    <LayoutDefault>
      <div className="container h-full mx-auto">
        <div className=" p-4 text-white bg-blue-600 rounded-lg shadow-md ">
          <h1 className="text-xl font-bold ">Manage posts</h1>
        </div>

        <div className=" overflow-x-hidden overflow-y-auto h-full">
          <div className="flex flex-wrap items-center">
            <div className=" w-1/2 mr-auto pt-2">
              <div className="grid grid-cols-1 grid-rows-2 gap-2 py-2 mr-2 ">
                <div className="w-full mr-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-1 rounded-lg border-2 border-darkStroke"
                  />
                </div>
                <div className="w-1/2">
                  <select
                    id="filterDropdown"
                    className="w-full rounded-lg border-2 border-darkStroke"
                  >
                    <option value="keyword">Filter</option>
                    <option value="time">Thời gian</option>
                    <option value="category">Thể loại</option>
                    <option value="bookmark">Đánh dấu</option>
                    <option value="author">Tác giả</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 justify-end py-4 ">
              <Button
                className=" w-full text-white  rounded px-4 py-2"
                kind="primary"
                type="submit"
                href="/manage/add-post"
              >
                {" "}
                New post{" "}
                <span className="pl-1">
                  <HiPlusCircle size={20} />
                </span>
              </Button>
              <Button
                className=" w-full text-white   rounded px-4 py-2"
                kind="delete"
                type="submit"
              >
                {" "}
                Delete{" "}
                <span className="pl-1">
                  <HiTrash size={20} />
                </span>
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto overflow-y-hidden w-full">
            <table className="min-w-full relative   ">
              <thead className=" sticky top-0 z-1 bg-stone-500 text-white">
                <tr>
                  <th className="py-2 px-4 rounded-tl-lg text-left">SN</th>
                  <th className="py-2 px-4  text-left">Author</th>
                  <th className="py-2 px-4  text-left">Title</th>
                  <th className="py-2 px-4  text-left">Topic</th>
                  <th className="py-2 px-4  text-left">Views</th>
                  <th className="py-2 px-4 rounded-tr-lg text-left">Publish</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item: any) => (
                  <tr
                    key={item.id}
                    className="even:bg-gray-100 odd:bg-white cursor-pointer"
                  >
                    <td className="py-2 px-4 border-b border-gray-200 text-left">
                      {item.id}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-left">
                      {item.author}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-left">
                      {item.title}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-left">
                      {item.topic}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-left">
                      {item.views}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-left">
                      {item.publish ? "publish" : "unpublish"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center bg-stone-500 text-white rounded-b-lg">
            <div className="w-1/2 mr-2 pb-3 ml-1">
              <ReactPaginate
                pageCount={Math.ceil(exampleData.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName="flex justify-center items-center  mt-4"
                pageClassName="m-2"
                activeClassName="underline underline-offset-2"
                previousLabel="<Prev"
                nextLabel="Next>"
              />
            </div>
            <div className="w-1/2 ml-2">
              <label htmlFor="itemsPerPage" className="mr-2">
                Rows per page:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="px-2 py-1 border rounded text-stone-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
};

export default ManagePosts;
