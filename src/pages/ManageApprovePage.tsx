import React, { useMemo, useState } from "react";
import { HiCheckCircle, HiEye, HiFilter, HiOutlineBan } from "react-icons/hi";
import ReactPaginate from "react-paginate";
import { colorTopic } from "../constants/global.ts";
import Modal from "@/components/modal/Modal.tsx";
import LayoutSecondary from "@/layout/LayoutSecondary.tsx";
import { Link } from "react-router-dom";
import { useTopicStore } from "@/store/topicStore.ts";
import { useUserStore } from "@/store/userStore.ts";
import { toast } from "react-toastify";
import convertDateTime from "@/utils/helper.ts";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import ConfirmDialog from "@/components/confirm/ConfirmDialog.tsx";
import Navigation from "@/components/navigation/Navigation.tsx";
import { usePostStore } from "@/store/postStore.ts";
import IPost from "@/interface/post.ts";
import IPostCreate from "@/interface/API/IPostCreate.ts";
import { UpdatePost, changeStatusPost } from "@/services/postService.ts";
import ReviewPostPage from "./ReviewPostPage.tsx";
import { useTranslation } from "react-i18next";

export const ManageApprove: React.FC = React.memo(() => {
  const { listAllTopic, getTopic } = useTopicStore();
  const { change, getListPost, listAllPost } = usePostStore();
  const { t } = useTranslation();
  const { setUser, user } = useUserStore();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const formatDate = "MM-DD-YYYY";
  const [listPostDefault, setListPostDefault] = useState<IPost[] | null>([]);
  const [currentItems, setCurrentItems] = useState<IPost[] | null>([]);
  const [isModalOpenDialog, setIsModalOpenDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<
    ((rs?: string) => void) | null
  >(null);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isReject, setisReject] = useState(false);
  const PUBLISH = 1;
  const REJECT = 2;
  useMemo(() => {
    getListPost(0, 0, "desc");
    getTopic();
    setUser();
  }, [getListPost, getTopic, setUser, change]);

  useMemo(() => {
    setListPostDefault(
      listAllPost &&
        listAllPost?.filter(
          (post) => post.status === 0 && post.isDraft === false
        )
    );
    setCurrentItems(
      listAllPost &&
        listAllPost
          ?.filter((post) => post.status === 0 && post.isDraft === false)
          .slice(0, itemsPerPage)
    );
  }, [itemsPerPage, listAllPost, user?._id]);

  const [isModalReview, setIsModalReview] = useState(false);
  const [idReview, setidReview] = useState("");

  const handleReview = (id: string) => {
    setIsModalReview(true);
    setidReview(id);
  };

  const handleCloseModal = () => {
    setIsModalOpenDialog(false);
    setIsModalReview(false);
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
      ? sortedData?.filter((item) => item.hashtag.includes(filterType))
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

  const handleApproved = async (id: string) => {
    handleConfirm(
      async () => {
        try {
          await changeStatusPost(id, PUBLISH);
          getListPost(0, 0, "desc");
          toast.success(`${t("approveSucess")}`, {
            position: "bottom-right",
            autoClose: 3000,
          });
        } catch (err) {
          console.log("error approved post");
        }
      },
      `${t("confirmApprove")}`,
      false
    );
  };

  const handleReject = async (id: string) => {
    handleConfirm(
      async (rs?: string) => {
        try {
          await changeStatusPost(id, REJECT);
          console.log(rs);
          if (rs && rs !== "") {
            const updateReason: IPostCreate = {
              reasonBan: rs,
            };
            await UpdatePost(updateReason, id);
          }
          getListPost(0, 0, "desc");
          toast.success(`${t("rejectSucess")}`, {
            position: "bottom-right",
            autoClose: 3000,
          });
        } catch (err) {
          console.log("error reject post");
        }
      },
      `${t("confirmReject")}`,
      true
    );
  };

  return (
    <LayoutSecondary>
      <Navigation></Navigation>
      <div className=" h-auto mx-auto bg-light4 dark:bg-dark1 shadow-md p-4 rounded-3xl">
        <div className=" py-4">
          <h4 className="text-xl font-bold text-darker ">{t("approve")}</h4>
        </div>
        <div className="flex flex-wrap items-center">
          <div className=" w-full md:w-1/2 mr-auto pt-2">
            <div className="grid grid-cols-1 grid-rows-2 gap-2 py-2 mr-2 ">
              <div className="w-1/2 relative flex flex-wrap">
                <div className="w-1/2 flex justify-center  dark:text-white items-center">
                  <span> {t("topics")}:</span>
                </div>
                <div className="w-1/2">
                  <select
                    id="filterDropdown"
                    className="text-xs w-full shadow-inner rounded-lg appearance-none px-2 py-1 dark:bg-dark0 dark:border-dark2 border  dark:text-light4"
                    value={filterType || ""}
                    onChange={(e) => handleFilter(e.target.value || null)}
                  >
                    <option value=""> {t("all")}</option>
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
        </div>

        <Modal isOpen={isModalReview} onClose={handleCloseModal}>
          <ReviewPostPage postId={idReview} />
        </Modal>
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
                <th className="py-2 px-4  rounded-tl-md "> {t("sn")}</th>
                <th className="py-2 px-4  "> {t("title")}</th>
                <th className="py-2 px-4  "> {t("topics")}</th>
                <th className="py-2 px-4 cursor-pointer" onClick={handleSort}>
                  <div className="flex justify-center items-center gap-2">
                    <span> {t("date")}</span>
                    {sortDirection === "asc" ? (
                      <BsFillArrowUpSquareFill size={14} />
                    ) : (
                      <BsFillArrowDownSquareFill size={14} />
                    )}
                  </div>
                </th>
                <th className="py-2 px-4  "> {t("status")}</th>
                <th className="py-2 px-4  "> {t("review")}</th>
                <th className="py-2 px-4 rounded-tr-md "> {t("action")}</th>
              </tr>
            </thead>
            <tbody>
              {currentItems === undefined || currentItems?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center dark:text-white">
                    {t("noPosts")}
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
                    <td className="py-2  px-4 border-y border-light0 dark:border-dark3  ">
                      <div className=" flex items-start justify-start">
                        <h6 className="tracking-normal text-xs md:pr-6 lg:mb-0 dark:text-light0">
                          <Link
                            to={`/post/${item._id}`}
                            className=" text-xs break-words text-left line-clamp-2 hover:text-mainColor"
                          >
                            {item.title}
                          </Link>
                        </h6>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-y text-left border-light0 dark:border-dark3">
                      {item.hashtag.map((topicId, index) => {
                        const topic = listAllTopic?.find(
                          (topic) => topic._id === topicId
                        );
                        if (topic) {
                          return (
                            <div
                              key={index}
                              className={`inline-block w-max border-2 px-2 py-[2px] rounded-full m-[1px] text-[10px] ${
                                colorTopic[
                                  topic.color as keyof typeof colorTopic
                                ] || ""
                              }`}
                            >
                              <h6 className="tracking-normal">
                                <Link
                                  className=""
                                  key={topic._id}
                                  to={`/topics/detail/${topic._id}`}
                                >
                                  {topic.name}
                                </Link>
                              </h6>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </td>

                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                      {convertDateTime(item.createdAt.toString(), formatDate)}
                    </td>
                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                      {(() => {
                        switch (item.status) {
                          case 0:
                            return (
                              <div className=" bg-amber-500 text-[10px] px-[2px] text-white rounded-md">
                                Pending
                              </div>
                            );
                          case 1:
                            return (
                              <div className="bg-green-400 text-white text-[10px] px-[2px] rounded-md">
                                Publish
                              </div>
                            );
                          case 2:
                            return (
                              <div className="bg-red-400 text-white text-[10px] px-[2px] rounded-md">
                                Rejected
                              </div>
                            );
                          case 3:
                            return (
                              <div className="bg-cyan-400 text-white text-[10px] px-[2px] rounded-md">
                                Hidden
                              </div>
                            );
                          default:
                            return null;
                        }
                      })()}
                    </td>
                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3">
                      <div className="flex items-center justify-center">
                        <div
                          onClick={() => handleReview(item._id)}
                          className="mx-1 p-1 rounded-full hover:bg-mainColor transition-colors duration-200"
                        >
                          <HiEye size={16} />
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3">
                      <div className="flex items-center justify-center">
                        <div
                          onClick={() => handleApproved(item._id)}
                          className="mx-1 p-1 rounded-full hover:bg-mainColor transition-colors duration-200"
                        >
                          <HiCheckCircle size={16} />
                        </div>
                        <div
                          onClick={() => handleReject(item._id)}
                          className="mx-1 p-1 rounded-full hover:bg-mainColor transition-colors duration-200"
                        >
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
    </LayoutSecondary>
  );
});
export default ManageApprove;
