import React, { useMemo, useState } from "react";
import { HiCheckCircle, HiFilter, HiOutlineBan } from "react-icons/hi";
import ReactPaginate from "react-paginate";
import Modal from "@/components/modal/Modal.tsx";
import LayoutSecondary from "@/layout/LayoutSecondary.tsx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import convertDateTime from "@/utils/helper.ts";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import ConfirmDialog from "@/components/confirm/ConfirmDialog.tsx";
import Navigation from "@/components/navigation/Navigation.tsx";
import { useReportStore } from "@/store/reportStore.ts";
import { IReport } from "@/interface/report.ts";
import { ApproveReport, RejectReport } from "@/services/reportService.ts";
import IReportApprove from "@/interface/API/IReportApprove.ts";

export const ManageReportPage: React.FC = React.memo(() => {
  const { listAllReport, getListReport } = useReportStore();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterBelong, setFilterBelong] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const formatDate = "MM-DD-YYYY";
  const [listPostDefault, setListPostDefault] = useState<IReport[] | null>([]);
  const [currentItems, setCurrentItems] = useState<IReport[] | null>([]);
  const [isModalOpenDialog, setIsModalOpenDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<
    ((rs?: string) => void) | null
  >(null);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isReject, setisReject] = useState(false);
  useMemo(() => {
    getListReport(0, 0, "desc");
  }, [getListReport]);

  useMemo(() => {
    setListPostDefault(listAllReport && listAllReport);
    setCurrentItems(listAllReport && listAllReport);
  }, [itemsPerPage, listAllReport]);

  const handleCloseModal = () => {
    setIsModalOpenDialog(false);
  };

  const [currentPage, setCurrentPage] = useState(0);

  const sortedData =
    listPostDefault &&
    [...listPostDefault].sort((a, b) => {
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
      ? sortedData?.filter((item) => item.typeReport.includes(filterType))
      : sortedData;

    const filteredByBelong = filterBelong
      ? filteredData?.filter((item) => item.reportBelong === filterBelong)
      : filteredData;

    const filteredByStatus = filterStatus
      ? filteredData?.filter((item) => item.status === filterStatus)
      : filteredData;
    const newCurrentItems = filteredByStatus?.slice(itemOffset, endOffset);
    const newPageCount = Math.ceil(
      (filteredByStatus?.length ?? 0) / itemsPerPage
    );

    setTimeout(() => {
      newCurrentItems && setCurrentItems(newCurrentItems);
      setPageCount(newPageCount);
    }, 0);
  }, [
    filterType,
    sortedData,
    filterBelong,
    filterStatus,
    itemOffset,
    itemsPerPage,
  ]);

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
  const handleFilterBelong = (type: string | null) => {
    setFilterBelong(type);
    setItemOffset(0);
    setCurrentPage(0);
  };
  const handleFilterStatus = (type: string | null) => {
    setFilterStatus(type);
    setItemOffset(0);
    setCurrentPage(0);
  };
  const handlePageClick = (selectedPage: { selected: number }) => {
    const newOffset = selectedPage.selected * itemsPerPage;
    setItemOffset(newOffset);
    setCurrentPage(selectedPage.selected);
  };

  const handleConfirm = (
    action: (rs?: string) => void,
    message: string,
    isReject: boolean
  ) => {
    setConfirmAction(() => action);
    setConfirmMessage(message);
    setIsModalOpenDialog(true);
    setisReject(isReject);
  };
  const handleConfirmAction = (rs?: string) => {
    if (confirmAction) {
      if (rs) {
        confirmAction(rs);
      } else {
        confirmAction();
      }
    }
    setIsModalOpenDialog(false);
  };

  const handleRejectReport = async (id: string) => {
    handleConfirm(
      async () => {
        try {
          await RejectReport(id);
          getListReport(0, 0, "desc");
          toast.success(" Report is rejected! ", {
            position: "bottom-right",
            autoClose: 3000,
          });
        } catch (err) {
          console.log("error rejected report");
        }
      },
      "Bạn có chắc từ chối không?",
      false
    );
  };

  const handleApproved = async (id: string) => {
    handleConfirm(
      async (rs?: string) => {
        try {
          if (rs) {
            const dataApprove: IReportApprove = {
              reportId: id,
              reason: rs,
            };
            await ApproveReport(dataApprove);
          }
          getListReport(0, 0, "desc");
          toast.success("  Report is approved! ", {
            position: "bottom-right",
            autoClose: 3000,
          });
        } catch (err) {
          console.log("error approved report");
        }
      },
      "Bạn có chắc muốn duyệt không?",
      true
    );
  };

  return (
    <LayoutSecondary>
      <Navigation></Navigation>
      <div className=" h-auto mx-auto bg-light4 dark:bg-dark1 shadow-md p-4 rounded-3xl">
        <div className=" py-4">
          <h4 className="text-xl font-bold text-darker ">
            Approval management
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
                    <option value="Spam">Spam</option>
                    <option value="Other">Other</option>
                    <option value="Violence">Violence</option>
                    <option value="Misinformation">Misinformation</option>
                    <option value="Copyright infringement">
                      Copyright infringement
                    </option>
                  </select>
                  <span className="absolute top-2 bottom-0 -translate-y-1 right-0 flex items-center pl-2 pr-2">
                    <HiFilter className="text-darker" size={15} />
                  </span>
                </div>
              </div>
              <div className="w-1/2 relative flex flex-wrap">
                <div className="w-1/4 flex justify-center  dark:text-white items-center">
                  <span>Belong:</span>
                </div>
                <div className="w-3/4">
                  <select
                    id="filterDropdown"
                    className="text-xs w-full shadow-inner rounded-lg appearance-none px-2 py-1 dark:bg-dark0 dark:border-dark2 border  dark:text-light4"
                    value={filterBelong || ""}
                    onChange={(e) => handleFilterBelong(e.target.value || null)}
                  >
                    <option value="">All</option>
                    <option value="Discuss">Discuss</option>
                    <option value="Posts">Posts</option>
                  </select>
                  <span className="absolute top-2 bottom-0 -translate-y-1 right-0 flex items-center pl-2 pr-2">
                    <HiFilter className="text-darker" size={15} />
                  </span>
                </div>
              </div>
              <div className="w-1/2 relative flex flex-wrap">
                <div className="w-1/4 flex justify-center  dark:text-white items-center">
                  <span>Status:</span>
                </div>
                <div className="w-3/4">
                  <select
                    id="filterDropdown"
                    className="text-xs w-full shadow-inner rounded-lg appearance-none px-2 py-1 dark:bg-dark0 dark:border-dark2 border  dark:text-light4"
                    value={filterStatus || ""}
                    onChange={(e) => handleFilterStatus(e.target.value || null)}
                  >
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
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
              isReject={isReject}
            />
          </Modal>
        )}

        <div className="w-full overflow-x-auto">
          <table className="min-w-full shadow-lg  ">
            <thead className="bg-light2 dark:bg-dark2 dark:text-light0 text-xs text-center">
              <tr>
                <th className="py-2 px-4  rounded-tl-md ">SN</th>
                <th className="py-2 px-4  ">Belong</th>
                <th className="py-2 px-4  ">Link</th>
                <th className="py-2 px-4  ">Type</th>
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
              {currentItems === undefined || currentItems?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center dark:text-white">
                    There are no report
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
                      {item.reportBelong}
                    </td>
                    <td className="py-2  px-4 border-y border-light0 dark:border-dark3  ">
                      <div className=" flex items-start w-full justify-start">
                        <h6 className="tracking-normal w-full text-xs md:pr-6 lg:mb-0 dark:text-light0">
                          <Link
                            to={item.link}
                            className=" text-xs break-words text-left line-clamp-1 hover:text-mainColor"
                          >
                            {item.link}
                          </Link>
                        </h6>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-y text-left border-light0 dark:border-dark3">
                      <div className=" flex justify-start items-center flex-wrap gap-1">
                        {item.typeReport.map((type, index) => {
                          let component;

                          switch (type) {
                            case "Spam":
                              component = (
                                <div
                                  key={index}
                                  className="bg-amber-500 text-[10px] px-[2px] text-white rounded-md"
                                >
                                  Spam
                                </div>
                              );
                              break;
                            case "Other":
                              component = (
                                <div
                                  key={index}
                                  className="bg-green-400 text-white text-[10px] px-[2px] rounded-md"
                                >
                                  Other
                                </div>
                              );
                              break;
                            case "Violence":
                              component = (
                                <div
                                  key={index}
                                  className="bg-red-400 text-white text-[10px] px-[2px] rounded-md"
                                >
                                  Violence
                                </div>
                              );
                              break;
                            case "Copyright infringement":
                              component = (
                                <div
                                  key={index}
                                  className="bg-cyan-400 text-white text-[10px] px-[2px] rounded-md"
                                >
                                  Copyright infringement
                                </div>
                              );
                              break;
                            case "Misinformation":
                              component = (
                                <div
                                  key={index}
                                  className="bg-purple-400 text-white text-[10px] px-[2px] rounded-md"
                                >
                                  Misinformation
                                </div>
                              );
                              break;
                            default:
                              component = null;
                          }

                          return component;
                        })}
                      </div>
                    </td>

                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                      {convertDateTime(item.createdAt.toString(), formatDate)}
                    </td>
                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                      {item.status === "Pending" ? (
                        <div className="bg-amber-500 text-[10px] px-[2px] text-white rounded-md">
                          {item.status}
                        </div>
                      ) : item.status === "Approved" ? (
                        <div className="bg-green-500 text-[10px] px-[2px] text-white rounded-md">
                          {item.status}
                        </div>
                      ) : (
                        <div className="bg-red-500 text-[10px] px-[2px] text-white rounded-md">
                          {item.status}
                        </div>
                      )}
                    </td>

                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3">
                      <div className="flex items-center justify-center">
                        {item.status !== "Approved" &&
                          item.status !== "Rejected" && (
                            <>
                              <div
                                onClick={() => handleApproved(item._id)}
                                className="mx-1 p-1 rounded-full hover:bg-mainColor transition-colors duration-200"
                              >
                                <HiCheckCircle size={16} />
                              </div>
                              <div
                                onClick={() => handleRejectReport(item._id)}
                                className="mx-1 p-1 rounded-full hover:bg-mainColor transition-colors duration-200"
                              >
                                <HiOutlineBan size={16} />
                              </div>
                            </>
                          )}
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
    </LayoutSecondary>
  );
});
export default ManageReportPage;
