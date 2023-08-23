import React, { useMemo, useState } from "react";
import { HiArrowCircleUp, HiFilter, HiTrash } from "react-icons/hi";
import ReactPaginate from "react-paginate";
import ConfirmDialog from "@/components/confirm/ConfirmDialog.tsx";
import Modal from "@/components/modal/Modal.tsx";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import { useTopicStore } from "@/store/topicStore";
import { useManagementStore } from "@/store/managementStore";
import IDiscussion from "@/interface/discussion";
import { useUserStore } from "@/store/userStore";
import { Link } from "react-router-dom";
import { colorTopic } from "@/constants/global";
import convertDateTime from "@/utils/helper";
import {
  deleteDiscussion,
  moveTrashOrRestore,
} from "@/services/discussionService";
import { ToastContainer, toast } from "react-toastify";

export const DeletedDiscussions: React.FC = () => {
  const formatDate = "MM-DD-YYYY";
  const { user } = useUserStore();
  const { listAllTopic } = useTopicStore();
  const { getDiscussFromTrash, discussTrash, getListDiscussion } =
    useManagementStore();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [listDiscussDefault, setListDiscussDefault] = useState<
    IDiscussion[] | null
  >([]);
  const [currentItems, setCurrentItems] = useState<IDiscussion[] | null>([]);
  const [isModalOpenDialog, setIsModalOpenDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  // Fetch data from the trash on component mount
  useMemo(() => {
    getDiscussFromTrash();
  }, [getDiscussFromTrash]);

  // Update discussions based on selected user and items per page
  useMemo(() => {
    if (discussTrash && user?._id) {
      const filteredDiscussions = discussTrash.filter(
        (discuss) => discuss.createBy === user?._id
      );
      setListDiscussDefault(filteredDiscussions);
      setCurrentItems(filteredDiscussions.slice(0, itemsPerPage));
    }
  }, [discussTrash, itemsPerPage, user?._id]);
  // Update discussions based on sorting, filtering, pagination
  useMemo(() => {
    const sortedData =
      listDiscussDefault &&
      [...listDiscussDefault].sort((a, b) => {
        if (sortDirection === "asc") {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        } else {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
      });

    const endOffset = itemOffset + itemsPerPage;

    const filteredData = filterType
      ? sortedData?.filter((item) => item.topic.includes(filterType))
      : sortedData;

    const newCurrentItems = filteredData?.slice(itemOffset, endOffset);
    const newPageCount = Math.ceil((filteredData?.length ?? 0) / itemsPerPage);

    newCurrentItems && setCurrentItems(newCurrentItems);
    setPageCount(newPageCount);
  }, [filterType, itemOffset, itemsPerPage, listDiscussDefault, sortDirection]);

  // Handlers for sorting, items per page change, filtering, and pagination
  const handleSort = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(selectedItemsPerPage);
  };

  const handleFilter = (type: string | null) => {
    setFilterType(type);
    setItemOffset(0);
    setCurrentPage(0);
  };

  const handlePageClick = (selectedPage: { selected: number }) => {
    const newOffset = selectedPage.selected * itemsPerPage;
    setItemOffset(newOffset);
    setCurrentPage(selectedPage.selected);
  };

  // Handlers for confirmation dialog actions
  const handleConfirm = (action: () => void, message: string) => {
    setConfirmAction(() => action);
    setConfirmMessage(message);
    setIsModalOpenDialog(true);
  };

  const handleConfirmAction = () => {
    if (confirmAction) {
      confirmAction();
    }
    setIsModalOpenDialog(false);
  };

  const handleCancelAction = () => {
    setIsModalOpenDialog(false);
  };

  // Handlers for restore and delete actions with confirmation
  const handleRestore = async (id: string) => {
    handleConfirm(async () => {
      try {
        await moveTrashOrRestore(id);
        getDiscussFromTrash();
        getListDiscussion(0, 0, "desc");
        setIsModalOpenDialog(false);
        toast.success(" Restore discuss successfully! ", {
          position: "top-center",
          autoClose: 3000,
        });
      } catch (err) {
        console.log("error restore discussion");
      }
    }, "Bạn có chắc muốn khôi phục không?");
  };

  const handleDelete = async (id: string) => {
    handleConfirm(async () => {
      try {
        await deleteDiscussion(id);
        getDiscussFromTrash();
        getListDiscussion(0, 0, "desc");
        setIsModalOpenDialog(false);
        toast.success(" Delete discuss successfully! ", {
          position: "top-center",
          autoClose: 3000,
        });
      } catch (err) {
        console.log("error deleted discussion");
      }
    }, "Bạn có chắc muốn xoá không?");
  };

  return (
    <div className="container h-[80vh] w-[80vw] mx-auto bg-light4 dark:bg-dark1  p-4 rounded-3xl">
      <div className=" py-4">
        <h4 className="text-xl font-bold text-darker ">Deleted Discussion</h4>
      </div>
      <div className="flex flex-wrap items-center">
        <div className=" w-full md:w-1/2 mr-auto pt-2">
          <div className="grid grid-cols-1 grid-rows-2 gap-2 py-2 mr-2 ">
            <div className="w-2/5 relative">
              <select
                id="filterDropdown"
                className="text-xs w-full shadow-inner rounded-lg appearance-none px-2 py-1 dark:bg-dark0 dark:border-dark2 border  dark:text-light4"
                value={filterType || ""}
                onChange={(e) => handleFilter(e.target.value || null)}
              >
                <option value="">All</option>
                {listAllTopic?.map((topic) => (
                  <option key={topic._id} value={topic._id}>
                    {topic.name}
                  </option>
                ))}
              </select>
              <span className="absolute top-2 bottom-0 -translate-y-1 right-0 flex items-center pl-2 pr-2">
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
              <th className="py-2 px-4  ">Title</th>
              <th className="py-2 px-4  ">Topic</th>
              <th className="py-2 px-4  ">View</th>
              <th className="py-2 px-4 cursor-pointer" onClick={handleSort}>
                <div className="flex justify-center items-center gap-2">
                  <span>Date</span>
                  {sortDirection === "asc" ? (
                    <BsFillArrowUpSquareFill size={14} />
                  ) : (
                    <BsFillArrowDownSquareFill size={14} />
                  )}
                </div>
              </th>
              <th className="py-2 px-4  ">Status</th>
              <th className="py-2 px-4 rounded-tr-md ">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center">
                  Không có bài viết nào
                </td>
              </tr>
            ) : (
              currentItems?.map((item, index) => (
                <tr
                  key={item._id}
                  className=" even:bg-light3 odd:bg-light4 dark:odd:bg-dark2 dark:even:bg-dark2 dark:text-light0 text-xs cursor-pointer text-center"
                >
                  <td className="py-2 px-4 border-y border-light0 dark:border-dark3 ">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                    <div className=" flex items-start justify-start">
                      <Link to={`/discuss/${item._id}`}>{item.title}</Link>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-y text-left border-light0 dark:border-dark3">
                    {item.topic.map((topicId, index) => {
                      const topic = listAllTopic?.find(
                        (topic) => topic._id === topicId
                      );
                      if (topic) {
                        return (
                          <div
                            key={index}
                            className={`inline-block border-2 px-2 py-[2px] rounded-full m-[1px] text-[10px] ${
                              colorTopic[
                                topic.color as keyof typeof colorTopic
                              ] || ""
                            }`}
                          >
                            {" "}
                            <Link
                              key={topic._id}
                              to={`/topics/detail/${topic._id}`}
                            >
                              {topic.name}
                            </Link>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </td>
                  <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                    {item.totalView}
                  </td>
                  <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                    {convertDateTime(item.createdAt.toString(), formatDate)}
                  </td>
                  <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                    <div className=" bg-red-400 text-[10px] px-[2px] text-white rounded-md">
                      deleted
                    </div>
                  </td>
                  <td className="py-2 px-4 border-y border-light0 dark:border-dark3">
                    <div className="flex items-center w-full">
                      <div
                        className="mx-1 p-1 rounded-full w-1/2 flex justify-center hover:bg-mainColor transition-colors duration-200"
                        onClick={() => handleRestore(item._id)}
                      >
                        <HiArrowCircleUp size={16} />
                      </div>
                      <div
                        className="mx-1 p-1 rounded-full w-1/2 flex justify-center  hover:bg-mainColor transition-colors duration-200"
                        onClick={() => handleDelete(item._id)}
                      >
                        <HiTrash size={16} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isModalOpenDialog && (
        <Modal isOpen={isModalOpenDialog} onClose={handleCancelAction}>
          <ConfirmDialog
            message={confirmMessage}
            onConfirm={handleConfirmAction}
            onCancel={handleCancelAction}
          />
        </Modal>
      )}
      <ToastContainer></ToastContainer>
      <div className="flex items-center justify-center bg-light2 dark:bg-dark2 dark:text-light0 h-8 text-xs rounded-b-md">
        <div className="w-1/2 mr-2 pb-3 ml-1">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< prev"
            renderOnZeroPageCount={null}
            containerClassName="flex justify-center items-center  mt-4 space-x-4"
            pageClassName="m-2"
            activeClassName="underline underline-offset-2"
            forcePage={currentPage}
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
  );
};

export default DeletedDiscussions;
