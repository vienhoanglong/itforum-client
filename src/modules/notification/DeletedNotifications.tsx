import React, { useMemo, useState } from "react";
import { HiArrowCircleUp, HiFilter, HiTrash } from "react-icons/hi";
import ReactPaginate from "react-paginate";
import Modal from "@/components/modal/Modal.tsx";
import { useManagementStore } from "@/store/managementStore.ts";
import { useUserStore } from "@/store/userStore.ts";
import INotification from "@/interface/notification.ts";
import convertDateTime from "@/utils/helper.ts";
import { Link } from "react-router-dom";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import {
  deleteNotification,
  moveTrashOrRestoreNotification,
} from "@/services/notificationService.ts";
import { toast } from "react-toastify";
import ConfirmDialog from "@/components/confirm/ConfirmDialog";

export const DeletedNotifications: React.FC = () => {
  const { listNotification, getListNotification } = useManagementStore();
  const { user } = useUserStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const formatDate = "MM-DD-YYYY";
  const [listNotificationDefault, setListNotificationDefault] = useState<
    INotification[] | null
  >([]);
  const [currentItems, setCurrentItems] = useState<INotification[] | null>([]);
  const [isModalOpenDialog, setIsModalOpenDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [confirmMessage, setConfirmMessage] = useState("");

  useMemo(() => {
    getListNotification(0, 0, "desc");
  }, [getListNotification]);

  useMemo(() => {
    setListNotificationDefault(
      listNotification &&
        listNotification?.filter(
          (notification) =>
            notification.createdBy === user?._id &&
            notification.isDeleted == true
        )
    );
    setCurrentItems(
      listNotification &&
        listNotification
          ?.filter(
            (notification) =>
              notification.createdBy === user?._id &&
              notification.isDeleted == true
          )
          .slice(0, itemsPerPage)
    );
  }, [itemsPerPage, listNotification, user?._id]);

  console.log(currentItems);

  const sortedData =
    listNotificationDefault &&
    [...listNotificationDefault].sort((a, b) => {
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

  useMemo(() => {
    const endOffset = itemOffset + itemsPerPage;
    const filteredData = filterType
      ? sortedData?.filter((item) => item.typeNotice === filterType)
      : sortedData;

    const filteredByLevel = filterStatus
      ? filteredData?.filter((item) => item.level === filterStatus)
      : filteredData;

    const newCurrentItems = filteredByLevel?.slice(itemOffset, endOffset);
    const newPageCount = Math.ceil(
      (filteredByLevel?.length ?? 0) / itemsPerPage
    );

    setTimeout(() => {
      newCurrentItems && setCurrentItems(newCurrentItems);
      setPageCount(newPageCount);
    }, 0);
  }, [filterType, filterStatus, sortedData, itemOffset, itemsPerPage]);

  const handleSort = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(selectedItemsPerPage);
  };

  const handleLevelFilter = (status: string | null) => {
    setFilterStatus(status);
    setItemOffset(0);
    setCurrentPage(0);
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

  const handleCloseModal = () => {
    setIsModalOpenDialog(false);
  };

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

  const handleRestore = async (id: string) => {
    handleConfirm(async () => {
      try {
        await moveTrashOrRestoreNotification(id);
        getListNotification(0, 0, "desc");
        setIsModalOpenDialog(false);
        toast.success(" Restore notification successfully! ", {
          position: "top-center",
          autoClose: 3000,
        });
      } catch (err) {
        console.log("error restore notification");
      }
    }, "Bạn có chắc muốn khôi phục không?");
  };

  const handleDelete = async (id: string) => {
    handleConfirm(async () => {
      try {
        await deleteNotification(id);
        getListNotification(0, 0, "desc");
        setIsModalOpenDialog(false);
        toast.success(" Deleted notification successfully! ", {
          position: "top-center",
          autoClose: 3000,
        });
      } catch (err) {
        console.log("error deleted notification");
      }
    }, "Bạn có chắc muốn xoá không?");
  };

  return (
    <div className="container h-[80vh] w-[80vw] mx-auto bg-light4 dark:bg-dark1  p-4 rounded-3xl">
      <div className=" py-4">
        <h4 className="text-xl font-bold text-darker ">
          Deleted notifications
        </h4>
      </div>
      <div className="flex flex-wrap items-center">
        <div className=" w-full md:w-1/2 mr-auto pt-2">
          <div className="grid grid-cols-1 grid-rows-2 gap-2 py-2 mr-2 ">
            <div className="w-1/2 relative flex flex-wrap">
              <div className="w-1/4 flex justify-center  dark:text-white items-center">
                <span>Type:</span>
              </div>
              <div className="w-3/4">
                <select
                  id="filterDropdown"
                  className="text-xs w-full shadow-inner rounded-lg appearance-none px-2 py-1 dark:bg-dark0 dark:border-dark2 border  dark:text-light4"
                  value={filterType || ""}
                  onChange={(e) => handleFilter(e.target.value || null)}
                >
                  <option value="">All</option>
                  <option value="subject">Subject</option>
                  <option value="event">Event</option>
                  <option value="recruitment">Recruitment</option>
                  <option value="other">Other</option>
                </select>
                <span className="absolute top-2 bottom-0 -translate-y-1 right-0 flex items-center pl-2 pr-2">
                  <HiFilter className="text-darker" size={15} />
                </span>
              </div>
            </div>
            <div className="w-1/2 relative flex flex-wrap">
              <div className="w-1/4 flex justify-center  dark:text-white items-center">
                <span>Level:</span>
              </div>
              <div className="w-3/4">
                <select
                  id="statusFilterDropdown"
                  className="text-xs w-full shadow-inner rounded-lg appearance-none px-2 py-1 dark:bg-dark0 dark:border-dark2 border  dark:text-light4"
                  value={filterStatus || ""}
                  onChange={(e) => handleLevelFilter(e.target.value || null)}
                >
                  <option value="">All</option>
                  <option value="important">Important</option>
                  <option value="normal">Normal</option>
                </select>
                <span className="absolute top-2 bottom-0 -translate-y-1 right-0 flex items-center pl-2 pr-2">
                  <HiFilter className="text-darker" size={15} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpenDialog && (
        <Modal isOpen={isModalOpenDialog} onClose={handleCloseModal}>
          <ConfirmDialog
            message={confirmMessage}
            onConfirm={handleConfirmAction}
            onCancel={handleCloseModal}
          />
        </Modal>
      )}

      <div className="w-full overflow-x-auto">
        <table className="min-w-full shadow-lg  ">
          <thead className="bg-light2 dark:bg-dark2 dark:text-light0 text-xs text-center">
            <tr>
              <th className="py-2 px-4  rounded-tl-md ">SN</th>
              <th className="py-2 px-4  ">Author</th>
              <th className="py-2 px-4  ">Title</th>
              <th className="py-2 px-4  ">Type</th>
              <th className="py-2 px-4  ">Level</th>
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
                  Không có thông báo nào
                </td>
              </tr>
            ) : (
              currentItems?.map((item, index) => (
                <tr
                  key={index}
                  className=" even:bg-light3 odd:bg-light4 dark:odd:bg-dark2 dark:even:bg-dark2 dark:text-light0 text-xs cursor-pointer text-center"
                >
                  <td className="py-2 px-4 border-y border-light0 dark:border-dark3 ">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                    {user?.fullName ?? user?.username}
                  </td>
                  <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                    <div className=" flex items-start justify-start">
                      <h6 className="tracking-normal text-xs md:pr-6 lg:mb-0 dark:text-light0">
                        <Link
                          to={`/notifications-detail/${item._id}`}
                          className=" text-xs break-words text-left line-clamp-2 hover:text-mainColor"
                        >
                          {item.titleNotice}
                        </Link>
                      </h6>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-y border-light0 dark:border-dark3">
                    {item.typeNotice}
                  </td>
                  <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                    {item.level === "normal" ? (
                      <div className=" bg-cyan-500 text-[10px] px-[2px] text-white rounded-md">
                        normal
                      </div>
                    ) : (
                      <div className=" bg-rose-400 text-[10px] px-[2px] text-white rounded-md">
                        important
                      </div>
                    )}
                  </td>
                  <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                    {convertDateTime(item.createdAt.toString(), formatDate)}
                  </td>
                  <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                    <div className=" bg-red-500 text-[10px] px-[2px] text-white rounded-md">
                      deleted
                    </div>
                  </td>
                  <td className="py-2 px-4 border-y border-light0 dark:border-dark3">
                    <div className="flex items-center">
                      <div
                        onClick={() => handleRestore(item._id)}
                        className="mx-1 p-1 rounded-full  hover:bg-mainColor transition-colors duration-200"
                      >
                        <HiArrowCircleUp size={16} />
                      </div>
                      <div
                        onClick={() => handleDelete(item._id)}
                        className="mx-1 p-1 rounded-full hover:bg-mainColor transition-colors duration-200"
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
        <div className="w-auto mx-2 flex items-center justify-end">
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

export default DeletedNotifications;
