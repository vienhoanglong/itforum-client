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
import Modal from "@/components/modal/Modal.tsx";
import LayoutSecondary from "@/layout/LayoutSecondary.tsx";
import DeletedNotifications from "@/modules/notification/DeletedNotifications.tsx";
import { AddNewNotifications } from "@/modules/notification/AddNewNotifications.tsx";
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
  CreateNewNotification,
  UpdateNotification,
  changeStatusNotification,
  moveTrashOrRestoreNotification,
} from "@/services/notificationService.ts";
import INotificationCreate from "@/interface/API/INotificationCreate.ts";
import { toast } from "react-toastify";
import { UpdateNotifications } from "@/modules/notification/UpdateNotification.tsx";
import ConfirmDialog from "@/components/confirm/ConfirmDialog";
import Navigation from "@/components/navigation/Navigation";
import { useTranslation } from "react-i18next";

export const ManageNotificationPage: React.FC = () => {
  const { t } = useTranslation();
  const { listNotification, getListNotification } = useManagementStore();
  const { user } = useUserStore();
  const [notificationUpdate, setNotificationUpdate] = useState<string>("");
  const [isModalOpenAddNotifi, setIsModalOpenAddNotifi] = useState(false); // config modal add
  const [isModalOpenTrash, setIsModalOpenTrash] = useState(false); // config modal trash
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
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
            notification.isDeleted === false
        )
    );
    setCurrentItems(
      listNotification &&
        listNotification
          ?.filter(
            (notification) =>
              notification.createdBy === user?._id &&
              notification.isDeleted == false
          )
          .slice(0, itemsPerPage)
    );
  }, [itemsPerPage, listNotification, user?._id]);

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

  const handleAddNew = () => {
    setIsModalOpenAddNotifi(true);
  };

  const handleNotificationUpdate = (id: string) => {
    setNotificationUpdate(id);

    setIsModalOpenUpdate(true);
  };
  const handleDeleted = () => {
    setIsModalOpenTrash(true);
  };

  const handleCloseModal = () => {
    setIsModalOpenAddNotifi(false);
    setIsModalOpenTrash(false);
    setIsModalOpenUpdate(false);
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
  const handleMoveToTrash = async (id: string) => {
    handleConfirm(async () => {
      try {
        await moveTrashOrRestoreNotification(id);
        getListNotification(0, 0, "desc");
        setIsModalOpenDialog(false);
        toast.success(`${t("deleteSucess")}`, {
          position: "top-center",
          autoClose: 3000,
        });
      } catch (err) {
        console.log("error deleted notification");
      }
    }, `${t("confirmDelete")}`);
  };
  const changeStatusPublish = async (id: string) => {
    handleConfirm(async () => {
      try {
        await changeStatusNotification(id);
        getListNotification(0, 0, "desc");
        setIsModalOpenDialog(false);
        toast.success(`${t("publishSucess")}`, {
          position: "top-center",
          autoClose: 3000,
        });
      } catch (err) {
        console.log("error change Status notification");
      }
    }, `${t("confirmPublish")}`);
  };
  const changeStatusHidden = async (id: string) => {
    handleConfirm(async () => {
      try {
        await changeStatusNotification(id);
        getListNotification(0, 0, "desc");
        setIsModalOpenDialog(false);
        toast.success(`${t("hiddenSucess")}`, {
          position: "top-center",
          autoClose: 3000,
        });
      } catch (err) {
        console.log("error change Status notification");
      }
    }, `${t("confirmHidden")}`);
  };
  const handleFormSubmit = async (notice: INotificationCreate, file?: File) => {
    try {
      if (file) {
        await CreateNewNotification(notice, file);
      } else {
        await CreateNewNotification(notice);
      }
      getListNotification(0, 0, "desc");
      setIsModalOpenAddNotifi(false);
      toast.success(`${t("createSucess")}`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (err) {
      if (err) {
        toast.error(" Create notification failed! ", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    }
  };
  const handleUpdate = async (
    notification: INotificationCreate,
    id: string,
    file?: File
  ) => {
    try {
      if (file) {
        await UpdateNotification(notification, id, file);
      } else {
        await UpdateNotification(notification, id);
      }
      getListNotification(0, 0, "desc");
      toast.success(`${t("updateSucess")}`, {
        position: "bottom-right",
        autoClose: 3000,
      });
      setIsModalOpenUpdate(false);
    } catch (err) {
      throw new Error("fail to update");
    }
  };
  return (
    <LayoutSecondary>
      <Navigation></Navigation>
      <div className=" h-auto mx-auto bg-light4 dark:bg-dark1 shadow-md p-4 rounded-3xl">
        <div className=" py-4">
          <h4 className="text-xl font-bold text-darker ">
            {t("notifiManage")}
          </h4>
        </div>
        <div className="flex flex-wrap items-center">
          <div className=" w-full md:w-1/2 mr-auto pt-2">
            <div className="grid grid-cols-1 grid-rows-2 gap-2 py-2 mr-2 ">
              <div className="w-1/2 relative flex flex-wrap">
                <div className="w-1/2 flex justify-center  dark:text-white items-center">
                  <span>{t("type")}:</span>
                </div>
                <div className="w-1/2">
                  <select
                    id="filterDropdown"
                    className="text-xs w-full shadow-inner rounded-lg appearance-none px-2 py-1 dark:bg-dark0 dark:border-dark2 border  dark:text-light4"
                    value={filterType || ""}
                    onChange={(e) => handleFilter(e.target.value || null)}
                  >
                    <option value="">{t("all")}</option>
                    <option value="subject">{t("subject")}</option>
                    <option value="event">{t("event")}</option>
                    <option value="recruitment">{t("recruitment")}</option>
                    <option value="other">{t("Other")}</option>
                  </select>
                  <span className="absolute top-2 bottom-0 -translate-y-1 right-0 flex items-center pl-2 pr-2">
                    <HiFilter className="text-darker" size={15} />
                  </span>
                </div>
              </div>
              <div className="w-1/2 relative flex flex-wrap">
                <div className="w-1/2 flex justify-center  dark:text-white items-center">
                  <span>{t("level")}:</span>
                </div>
                <div className="w-1/2">
                  <select
                    id="statusFilterDropdown"
                    className="text-xs w-full shadow-inner rounded-lg appearance-none px-2 py-1 dark:bg-dark0 dark:border-dark2 border  dark:text-light4"
                    value={filterStatus || ""}
                    onChange={(e) => handleLevelFilter(e.target.value || null)}
                  >
                    <option value="">{t("all")}</option>
                    <option value="important">{t("important")}</option>
                    <option value="normal">{t("normal")}</option>
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
              {t("new")}{" "}
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
              {t("trash")}{" "}
              <span className="pl-1">
                <HiTrash size={20} />
              </span>
            </Button>
          </div>
        </div>

        <Modal isOpen={isModalOpenAddNotifi} onClose={handleCloseModal}>
          <AddNewNotifications
            onSubmit={handleFormSubmit}
          ></AddNewNotifications>
        </Modal>
        <Modal isOpen={isModalOpenUpdate} onClose={handleCloseModal}>
          <UpdateNotifications
            notificationId={notificationUpdate}
            onSubmit={handleUpdate}
          />
        </Modal>
        <Modal isOpen={isModalOpenTrash} onClose={handleCloseModal}>
          <DeletedNotifications></DeletedNotifications>
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
                <th className="py-2 px-4  rounded-tl-md ">{t("sn")}</th>
                <th className="py-2 px-4  ">{t("author")}</th>
                <th className="py-2 px-4  ">{t("title")}</th>
                <th className="py-2 px-4  ">{t("type")}</th>
                <th className="py-2 px-4  ">{t("level")}</th>
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
                  <td colSpan={7} className="text-center">
                    {t("noNotification")}
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
                      {item.isPublished ? (
                        <div className=" bg-green-500 text-[10px] px-[2px] text-white rounded-md">
                          Published
                        </div>
                      ) : (
                        <div className=" bg-amber-500 text-[10px] px-[2px] text-white rounded-md">
                          Hidden
                        </div>
                      )}
                    </td>
                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3">
                      <div className="flex items-center">
                        <div
                          onClick={() => handleNotificationUpdate(item._id)}
                          className="mx-1 p-1 rounded-full  hover:bg-mainColor transition-colors duration-200"
                        >
                          <HiPencil size={16} />
                        </div>
                        {item.isPublished === true ? (
                          <div
                            onClick={() => changeStatusHidden(item._id)}
                            className="mx-1 p-1 rounded-full hover:bg-mainColor transition-colors duration-200"
                          >
                            <HiEyeOff size={16} />
                          </div>
                        ) : (
                          <div
                            onClick={() => changeStatusPublish(item._id)}
                            className="mx-1 p-1 rounded-full hover:bg-mainColor transition-colors duration-200"
                          >
                            <HiEye size={16} />
                          </div>
                        )}
                        <div
                          onClick={() => handleMoveToTrash(item._id)}
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
    </LayoutSecondary>
  );
};

export default ManageNotificationPage;
