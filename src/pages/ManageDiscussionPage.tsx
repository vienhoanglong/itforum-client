import { Button } from "@/components/button";
import React, { useMemo, useState } from "react";
import {
  HiEye,
  HiEyeOff,
  HiFilter,
  HiPencil,
  HiPlusCircle,
  HiTrash,
} from "react-icons/hi";
import ReactPaginate from "react-paginate";
import { colorTopic } from "../constants/global.ts";
import Modal from "@/components/modal/Modal.tsx";
import LayoutSecondary from "@/layout/LayoutSecondary.tsx";
import AddNewDiscussion from "@/modules/discuss/AddNewDiscussion.tsx";
import DeletedDiscussions from "@/modules/discuss/DeletedDiscussions.tsx";
import { Link } from "react-router-dom";
import { useTopicStore } from "@/store/topicStore.ts";
import { useUserStore } from "@/store/userStore.ts";
import IDiscussionCreate from "@/interface/API/IDiscussionCreate.ts";
import {
  CreateNewDiscussion,
  UpdatedDiscussion,
  moveTrashOrRestore,
  updateStatusDiscussion,
} from "@/services/discussionService.ts";
import { toast } from "react-toastify";
import convertDateTime from "@/utils/helper.ts";
import { useManagementStore } from "@/store/managementStore.ts";
import IDiscussion from "@/interface/discussion.ts";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import UpdateDiscussion from "@/modules/discuss/UpdateDiscussion.tsx";
import ConfirmDialog from "@/components/confirm/ConfirmDialog.tsx";
import Navigation from "@/components/navigation/Navigation.tsx";

export const ManageDiscussionPage: React.FC = React.memo(() => {
  const { listAllTopic, getTopic } = useTopicStore();
  const { getListDiscussion, listDiscuss, getDiscussFromTrash } =
    useManagementStore();

  const { setUser, user } = useUserStore();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const formatDate = "MM-DD-YYYY";
  const [listDiscussDefault, setListDiscussDefault] = useState<
    IDiscussion[] | null
  >([]);
  const [discussionUpdate, setDiscussionUpdate] = useState<string>("");
  const [currentItems, setCurrentItems] = useState<IDiscussion[] | null>([]);
  const [isModalOpenDialog, setIsModalOpenDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [confirmMessage, setConfirmMessage] = useState("");
  const HIDDEN = 3;
  const PUBLISH = 1;
  useMemo(() => {
    getListDiscussion(0, 0, "desc");
    getTopic();
    setUser();
  }, [getListDiscussion, getTopic, setUser]);

  useMemo(() => {
    setListDiscussDefault(
      listDiscuss &&
        listDiscuss?.filter((disucuss) => disucuss.createBy === user?._id)
    );
    setCurrentItems(
      listDiscuss &&
        listDiscuss
          ?.filter((disucuss) => disucuss.createBy === user?._id)
          .slice(0, itemsPerPage)
    );
  }, [itemsPerPage, listDiscuss, user?._id]);

  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [isModalOpenTrash, setIsModalOpenTrash] = useState(false);

  const handleAddNew = () => {
    setIsModalOpenAdd(true);
  };

  const handleDeleted = () => {
    setIsModalOpenTrash(true);
  };
  const handleDiscussionUpdate = (id: string) => {
    setDiscussionUpdate(id);

    setIsModalOpenUpdate(true);
  };
  const handleCloseModal = () => {
    setIsModalOpenAdd(false);
    setIsModalOpenTrash(false);
    setIsModalOpenUpdate(false);
    setIsModalOpenDialog(false);
  };

  const handleCreate = async (data: IDiscussionCreate) => {
    try {
      await CreateNewDiscussion(data);
      getListDiscussion(0, 0, "desc");
      toast.success(" Post discuss successfully! ", {
        position: "bottom-right",
        autoClose: 3000,
      });
      setIsModalOpenAdd(false);
    } catch (err) {
      setIsModalOpenAdd(false);
      throw new Error(" Error creating discussion");
    }
  };

  const [currentPage, setCurrentPage] = useState(0);

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
  useMemo(() => {
    const endOffset = itemOffset + itemsPerPage;
    const filteredData = filterType
      ? sortedData?.filter((item) => item.topic.includes(filterType))
      : sortedData;

    const filteredByStatus = filterStatus
      ? filteredData?.filter(
          (item) => item.statusDiscuss.toString() === filterStatus
        )
      : filteredData;

    const newCurrentItems = filteredByStatus?.slice(itemOffset, endOffset);
    const newPageCount = Math.ceil(
      (filteredByStatus?.length ?? 0) / itemsPerPage
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

  const handleStatusFilter = (status: string | null) => {
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
  const handleUpdate = async (discussion: IDiscussionCreate, id: string) => {
    try {
      await UpdatedDiscussion(discussion, id);
      getListDiscussion(0, 0, "desc");
      toast.success(" Update discuss successfully! ", {
        position: "bottom-right",
        autoClose: 3000,
      });
      setIsModalOpenUpdate(false);
    } catch (err) {
      throw new Error("fail to update");
    }
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
  const handleDelete = async (id: string) => {
    handleConfirm(async () => {
      try {
        await moveTrashOrRestore(id);
        getDiscussFromTrash();
        getListDiscussion(0, 0, "desc");
        toast.success(" Deleted discuss successfully! ", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } catch (err) {
        console.log("error restore discussion");
      }
    }, "Bạn có chắc muốn xoá không?");
  };
  const handleHidden = async (id: string) => {
    handleConfirm(async () => {
      try {
        await updateStatusDiscussion(id, HIDDEN);
        getListDiscussion(0, 0, "desc");
        toast.success(" Discussion is hidden! ", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } catch (err) {
        console.log("error hidden discussion");
      }
    }, "Bạn có chắc muốn ẩn không?");
  };
  const handlePublish = async (id: string) => {
    handleConfirm(async () => {
      try {
        await updateStatusDiscussion(id, PUBLISH);
        getListDiscussion(0, 0, "desc");
        toast.success(" Discussion is publish! ", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } catch (err) {
        console.log("error publish discussion");
      }
    }, "Bạn có chắc muốn công khai không?");
  };

  return (
    <LayoutSecondary>
      <Navigation></Navigation>
      <div className=" h-auto mx-auto bg-light4 dark:bg-dark1 shadow-md p-4 rounded-3xl">
        <div className=" py-4">
          <h4 className="text-xl font-bold text-darker ">Manage discussions</h4>
        </div>
        <div className="flex flex-wrap items-center">
          <div className=" w-full md:w-1/2 mr-auto pt-2">
            <div className="grid grid-cols-1 grid-rows-2 gap-2 py-2 mr-2 ">
              <div className="w-1/2 relative flex flex-wrap">
                <div className="w-1/4 flex justify-center  dark:text-white items-center">
                  <span>Topic:</span>
                </div>
                <div className="w-3/4">
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
              <div className="w-1/2 relative flex flex-wrap">
                <div className="w-1/4 flex justify-center  dark:text-white items-center">
                  <span>Status:</span>
                </div>
                <div className="w-3/4">
                  <select
                    id="statusFilterDropdown"
                    className="text-xs w-full shadow-inner rounded-lg appearance-none px-2 py-1 dark:bg-dark0 dark:border-dark2 border  dark:text-light4"
                    value={filterStatus || ""}
                    onChange={(e) => handleStatusFilter(e.target.value || null)}
                  >
                    <option value="">All</option>
                    <option value="1">Publish</option>
                    <option value="3">Hidden</option>
                    <option value="2">Reject</option>
                  </select>
                  <span className="absolute top-2 bottom-0 -translate-y-1 right-0 flex items-center pl-2 pr-2">
                    <HiFilter className="text-darker" size={15} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto grid grid-cols-2 gap-2 justify-end py-4 ">
            <Button
              className=" w-full text-white text-xs bg-lighter hover:bg-darker  rounded px-4 shadow-md py-2"
              kind="primary"
              type="submit"
              handle={handleAddNew}
            >
              {" "}
              New{" "}
              <span className="pl-1">
                <HiPlusCircle size={20} />
              </span>
            </Button>
            <Button
              className=" w-full text-white bg-red3 hover:bg-red2  text-xs rounded shadow-md px-4 py-2"
              kind="custom"
              type="submit"
              handle={() => handleDeleted()}
            >
              {" "}
              Trash{" "}
              <span className="pl-1">
                <HiTrash size={20} />
              </span>
            </Button>
          </div>
        </div>

        <Modal isOpen={isModalOpenAdd} onClose={handleCloseModal}>
          <AddNewDiscussion onSaveChanges={handleCreate} />
        </Modal>
        <Modal isOpen={isModalOpenUpdate} onClose={handleCloseModal}>
          <UpdateDiscussion
            listTopic={listAllTopic}
            discussionId={discussionUpdate}
            onSaveChanges={handleUpdate}
          />
        </Modal>
        <Modal isOpen={isModalOpenTrash} onClose={handleCloseModal}>
          <DeletedDiscussions />
        </Modal>
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
              {currentItems === undefined || currentItems?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center dark:text-white">
                    Không có bài thảo luận nào
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
                            to={`/discuss/${item._id}`}
                            className=" text-xs break-words text-left line-clamp-2 hover:text-mainColor"
                          >
                            {item.title}
                          </Link>
                        </h6>
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
                      {item.totalView}
                    </td>
                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                      {convertDateTime(item.createdAt.toString(), formatDate)}
                    </td>
                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                      {(() => {
                        switch (item.statusDiscuss) {
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
                      <div className="flex items-center">
                        {item.statusDiscuss !== 0 && (
                          <div
                            onClick={() => handleDiscussionUpdate(item._id)}
                            className="mx-1 p-1 rounded-full  hover:bg-mainColor transition-colors duration-200"
                          >
                            <HiPencil size={16} />
                          </div>
                        )}
                        {item.statusDiscuss !== 2 &&
                          item.statusDiscuss !== 0 &&
                          (item.statusDiscuss === 1 ? (
                            <div
                              onClick={() => handleHidden(item._id)}
                              className="mx-1 p-1 rounded-full hover:bg-mainColor transition-colors duration-200"
                            >
                              <HiEyeOff size={16} />
                            </div>
                          ) : (
                            <div
                              onClick={() => handlePublish(item._id)}
                              className="mx-1 p-1 rounded-full hover:bg-mainColor transition-colors duration-200"
                            >
                              <HiEye size={16} />
                            </div>
                          ))}
                        {item.statusDiscuss !== 0 && (
                          <div
                            onClick={() => handleDelete(item._id)}
                            className="mx-1 p-1 rounded-full hover:bg-mainColor transition-colors duration-200"
                          >
                            <HiTrash size={16} />
                          </div>
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
export default ManageDiscussionPage;
