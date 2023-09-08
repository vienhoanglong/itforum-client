import React, { useMemo, useState } from "react";
import { HiArrowCircleUp, HiFilter, HiTrash } from "react-icons/hi";
import ReactPaginate from "react-paginate";
import Modal from "@/components/modal/Modal.tsx";
import { useManagementStore } from "@/store/managementStore.ts";
import convertDateTime from "@/utils/helper.ts";
import { Link } from "react-router-dom";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import { toast } from "react-toastify";
import ConfirmDialog from "@/components/confirm/ConfirmDialog";
import Topic from "@/interface/topic";
import { colorTopic } from "@/constants/global";
import { deleteTopic, moveTrashOrRestoreTopic } from "@/services/topicService";
import { useTranslation } from "react-i18next";

export const DeletedTopic: React.FC = () => {
  const { t } = useTranslation();
  const { getListTopicFromTrash, listTopicFromTrash, getListTopic } =
    useManagementStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const formatDate = "MM-DD-YYYY";
  const [listTopicDefault, setListTopicDefault] = useState<Topic[] | null>([]);
  const [currentItems, setCurrentItems] = useState<Topic[] | null>([]);
  const [isModalOpenDialog, setIsModalOpenDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [confirmMessage, setConfirmMessage] = useState("");

  useMemo(() => {
    getListTopicFromTrash();
  }, [getListTopicFromTrash]);

  useMemo(() => {
    setListTopicDefault(listTopicFromTrash && listTopicFromTrash.reverse());
    setCurrentItems(
      listTopicFromTrash && listTopicFromTrash?.reverse().slice(0, itemsPerPage)
    );
  }, [itemsPerPage, listTopicFromTrash]);

  const sortedData =
    listTopicDefault &&
    [...listTopicDefault].sort((a, b) => {
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
      ? sortedData?.filter(
          (item) => item.type.toLowerCase() === filterType.toLowerCase()
        )
      : sortedData;

    const newCurrentItems = filteredData?.slice(itemOffset, endOffset);
    const newPageCount = Math.ceil((filteredData?.length ?? 0) / itemsPerPage);

    setTimeout(() => {
      newCurrentItems && setCurrentItems(newCurrentItems);
      setPageCount(newPageCount);
    }, 0);
  }, [filterType, sortedData, itemOffset, itemsPerPage]);

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
        await moveTrashOrRestoreTopic(id);
        getListTopicFromTrash();
        getListTopic();
        setIsModalOpenDialog(false);
        toast.success(`${t("restoreSucess")}`, {
          position: "top-center",
          autoClose: 3000,
        });
      } catch (err) {
        console.log("error Restore topic");
      }
    }, `${t("confirmRestore")}`);
  };
  const hanldeDeleted = async (id: string) => {
    handleConfirm(async () => {
      try {
        await deleteTopic(id);
        getListTopicFromTrash();
        setIsModalOpenDialog(false);
        toast.success(`${t("deleteSucess")}`, {
          position: "top-center",
          autoClose: 3000,
        });
      } catch (err) {
        console.log("error Deleted topic");
      }
    }, `${t("confirmDelete")}`);
  };

  return (
    <div className="container text-xs h-[80vh] w-[80vw] mx-auto bg-light4 dark:bg-dark1  p-4 rounded-3xl">
      <div className=" py-4">
        <h4 className="text-xl font-bold text-darker ">{t("deletedTopic")}</h4>
      </div>
      <div className="flex flex-wrap items-center">
        <div className=" w-full md:w-1/2 mr-auto pt-2">
          <div className="grid grid-cols-1 grid-rows-2 gap-2 py-2 mr-2 ">
            <div className="w-1/2 relative flex flex-wrap">
              <div className="w-1/4 flex text-xs justify-center  dark:text-white items-center">
                <span>{t("type")}:</span>
              </div>
              <div className="w-3/4">
                <select
                  id="filterDropdown"
                  className="text-xs w-full shadow-inner rounded-lg appearance-none px-2 py-1 dark:bg-dark0 dark:border-dark2 border  dark:text-light4"
                  value={filterType || ""}
                  onChange={(e) => handleFilter(e.target.value || null)}
                >
                  <option value="">{t("all")}</option>
                  <option value="devOps">DevOps</option>
                  <option value="frameworks">Framework</option>
                  <option value="languages">Language</option>
                  <option value="subject">Subject</option>
                  <option value="tooling">Tooling</option>
                  <option value="testing">Testing</option>
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
              <th className="py-2 px-4  rounded-tl-md ">{t("sn")}</th>
              <th className="py-2 px-4  ">{t("name")}</th>
              <th className="py-2 px-4  ">{t("type")}</th>
              <th className="py-2 px-4  ">{t("desc")}</th>
              <th className="py-2 px-4 cursor-pointer" onClick={handleSort}>
                <div className="flex justify-center items-center gap-2">
                  <span>{t("date")}</span>
                  {sortDirection === "asc" ? (
                    <BsFillArrowUpSquareFill size={14} />
                  ) : (
                    <BsFillArrowDownSquareFill size={14} />
                  )}
                </div>
              </th>
              <th className="py-2 px-4  ">{t("status")}</th>
              <th className="py-2 px-4 rounded-tr-md ">{t("action")}</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center dark:text-white">
                  {t("noTopics")}
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
                    <div
                      key={index}
                      className={`inline-block w-max border-2 px-2 py-[2px] rounded-full m-[1px] text-[10px] ${
                        colorTopic[item.color as keyof typeof colorTopic] || ""
                      }`}
                    >
                      <h6 className="tracking-normal">
                        <Link
                          className=""
                          key={item._id}
                          to={`/topics/detail/${item._id}`}
                        >
                          {item.name}
                        </Link>
                      </h6>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                    <div className=" flex items-start justify-start">
                      <h6 className="tracking-normal text-xs md:pr-6 lg:mb-0 dark:text-light0">
                        <Link
                          to={`/topics/${item.type.toLowerCase()}`}
                          className=" text-xs break-words text-left line-clamp-2 hover:text-mainColor"
                        >
                          {item.type}
                        </Link>
                      </h6>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-y border-light0 dark:border-dark3">
                    <div className=" flex items-start justify-start">
                      <h6 className="tracking-normal break-words line-clamp-2 text-xs md:pr-6 lg:mb-0 dark:text-light0">
                        {item.desc}
                      </h6>
                    </div>
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
                        onClick={() => hanldeDeleted(item._id)}
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
            {t("rowPerPage")}:
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

export default DeletedTopic;
