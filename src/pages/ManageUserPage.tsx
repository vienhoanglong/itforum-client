import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import React, { useEffect, useMemo, useState } from "react";
import { BsSearch } from "react-icons/bs";
import {
  HiArrowCircleLeft,
  HiCheckCircle,
  HiOutlineBan,
  HiPlusCircle,
  HiRefresh,
} from "react-icons/hi";
import ReactPaginate from "react-paginate";
import { Button } from "@/components/button";
import LayoutSecondary from "@/layout/LayoutSecondary";
import { useUserStore } from "@/store/userStore";
import IUser from "@/interface/user";
import Modal from "@/components/modal/Modal";
import ConfirmDialog from "@/components/confirm/ConfirmDialog";
import {
  UpdateDataUser,
  createUser,
  resetPassword,
} from "@/services/userService";
import IUserUpdate from "@/interface/API/IUserUpdate";
import { toast } from "react-toastify";
import AddNewUser from "@/modules/user/AddNewUser";
import IUserCreate from "@/interface/API/IUserCreate";
import convertDateTime from "@/utils/helper";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const ManageUser: React.FC = () => {
  const { allUser, getListAllUser, listUserBySearch, getListUserBySearch } =
    useUserStore();
  const [resetType, setResetType] = useState("");
  const { t } = useTranslation();
  const [sortDirection, setSortDirection] = useState<string>("desc");
  const [search, setSearch] = useState("");
  const [searchClick, setSearchClick] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const formatDate = "MM-DD-YYYY";
  const [listPostDefault, setListPostDefault] = useState<IUser[] | null>([]);
  const [currentItems, setCurrentItems] = useState<IUser[] | null>([]);
  const [isModalOpenDialog, setIsModalOpenDialog] = useState(false);
  const [isModalOpenAddUser, setIsModalOpenAddUser] = useState(false);

  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getListAllUser();
  }, [getListAllUser]);

  useMemo(() => {
    allUser && setListPostDefault(allUser);
  }, [itemsPerPage, allUser]);

  const handleSort = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
  };
  const handleButtonClick = () => {
    if (search != "") {
      getListUserBySearch(search);
      setItemOffset(0);
      setCurrentPage(0);
      setResetType("");
      setSearchClick(true);
    }
  };

  const handleShowAllClick = () => {
    setResetType("reset");
    setSearch("");
    setItemOffset(0);
    setCurrentPage(0);
    setSearchClick(false);
  };

  const sortedData = useMemo(() => {
    if (search && search != "") {
      if (!listUserBySearch) return [];

      return [...listUserBySearch].sort((a, b) => {
        const usernameA = a.username ?? ""; // Gán giá trị mặc định nếu a.username là null hoặc undefined
        const usernameB = b.username ?? ""; // Gán giá trị mặc định nếu b.username là null hoặc undefined

        if (sortDirection === "asc") {
          return usernameA.localeCompare(usernameB); // Sắp xếp theo tên bảng chữ cái
        } else {
          return usernameB.localeCompare(usernameA); // Sắp xếp theo tên ngược bảng chữ cái
        }
      });
    } else {
      if (!listPostDefault) return [];
      return [...listPostDefault].sort((a, b) => {
        const usernameA = a.username ?? ""; // Gán giá trị mặc định nếu a.username là null hoặc undefined
        const usernameB = b.username ?? ""; // Gán giá trị mặc định nếu b.username là null hoặc undefined

        if (sortDirection === "asc") {
          return usernameA.localeCompare(usernameB); // Sắp xếp theo tên bảng chữ cái
        } else {
          return usernameB.localeCompare(usernameA); // Sắp xếp theo tên ngược bảng chữ cái
        }
      });
    }
  }, [resetType, listUserBySearch, sortDirection, listPostDefault]);

  // Hàm chuyển trang
  const handlePageClick = (selectedPage: { selected: number }) => {
    const newOffset = selectedPage.selected * itemsPerPage;
    setItemOffset(newOffset);
    setCurrentPage(selectedPage.selected);
  };
  console.log(listUserBySearch);
  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(selectedItemsPerPage);
    setItemOffset(0);
    setCurrentPage(0);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    // const filteredData = filter
    //   ? sortedData?.filter((item) => item.hashtag.includes(filter))
    //   : sortedData;
    const newCurrentItems = sortedData?.slice(itemOffset, endOffset);
    const newPageCount = Math.ceil((sortedData?.length ?? 0) / itemsPerPage);
    setTimeout(() => {
      newCurrentItems && setCurrentItems(newCurrentItems);
      newPageCount && setPageCount(newPageCount);
    }, 0);
  }, [sortedData, search, listUserBySearch, itemOffset, itemsPerPage]);
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
  const handleAddNewUser = () => {
    setIsModalOpenAddUser(true);
  };
  const handleCloseModal = () => {
    setIsModalOpenDialog(false);
    setIsModalOpenAddUser(false);
  };
  const handleBan = async (id: string) => {
    handleConfirm(async () => {
      try {
        const updateBan: IUserUpdate = {
          ban: true,
        };
        await UpdateDataUser(updateBan, id);

        getListAllUser();
        toast.success(`${t("banSucess")}`, {
          position: "bottom-right",
          autoClose: 3000,
        });
      } catch (err) {
        console.log("error restore discussion");
      }
    }, `${t("confirmBan")}`);
  };
  const handleUnBan = async (id: string) => {
    handleConfirm(async () => {
      try {
        const updateBan: IUserUpdate = {
          ban: false,
        };
        await UpdateDataUser(updateBan, id);

        getListAllUser();
        toast.success(`${t("unbanSucess")}`, {
          position: "bottom-right",
          autoClose: 3000,
        });
      } catch (err) {
        console.log("error restore discussion");
      }
    }, `${t("confirmUnban")}`);
  };
  const handleResetPass = async (id: string) => {
    handleConfirm(async () => {
      try {
        await resetPassword(id);

        getListAllUser();
        toast.success(`${t("resetSucess")}`, {
          position: "bottom-right",
          autoClose: 3000,
        });
      } catch (err) {
        console.log("error restore discussion");
      }
    }, `${t("confirmRestore")}`);
  };
  const handleFormSubmit = async (data: IUserCreate) => {
    try {
      if (data) {
        const newUser: IUserCreate = {
          ...data,
          role: 3,
        };
        await createUser(newUser);
        getListAllUser();
        setIsModalOpenAddUser(false);
        toast.success(`${t("createSucess")}`, {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.log("error create discussion");
    }
  };

  return (
    <LayoutSecondary>
      <Link
        className="dark:text-light0 bg- rounded-full mb-4 pr-1 link inline-flex items-center text-sm font-medium !text-grey-600 bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark1"
        to="/managements"
      >
        <HiArrowCircleLeft className="w-6 h-6 mr-1" />
        {t("back")}
      </Link>
      <div className=" h-auto mx-auto bg-light4 dark:bg-dark1 shadow-md p-4 rounded-3xl">
        <div className=" py-4">
          <h4 className="text-xl font-bold text-darker ">
            {" "}
            {t("userManagement")}
          </h4>
        </div>
        <div className="flex flex-wrap items-center">
          <div className=" w-full md:w-1/2 mr-auto pt-2">
            <div className="grid grid-cols-1 grid-rows-2 gap-2 py-2 mr-2 ">
              <div className=" flex justify-center gap-2 items-center">
                <div className="flex justify-center items-center max-md:mb-3 h-9 w-full rounded-lg md:mt-0  bg-slate-100 text-dark1 dark:bg-dark0 dark:text-light0">
                  <label htmlFor="q" className="flex w-full px-3 flex-row">
                    <BsSearch className="text-dark1 dark:text-light1 text-base" />
                    <input
                      id="q"
                      className="ml-3 h-ful w-full pt-0 text-xs bg-transparent outline-none"
                      placeholder="Begin your search..."
                      value={search}
                      onChange={handleSearchChange}
                    />
                  </label>
                  <button
                    onClick={handleButtonClick}
                    className=" bg-mainColor w-[100px] text-white p-2 rounded-lg"
                  >
                    {t("search")}
                  </button>
                </div>
                <div>
                  {searchClick === true ? (
                    <button
                      className="bg-mainColor text-white h-full w-full dark:text-white p-2 rounded-lg
     "
                      onClick={handleShowAllClick}
                    >
                      {t("clearSearch")}
                    </button>
                  ) : (
                    <button
                      className=" bg-dark3 h-full w-full text-white p-2 rounded-lg
    "
                      disabled
                      onClick={handleShowAllClick}
                    >
                      {t("clearSearch")}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto grid grid-cols-2 gap-2 justify-end py-4 ">
            <Button
              className=" w-full text-white text-xs bg-lighter hover:bg-darker  rounded px-4 shadow-md py-2"
              kind="primary"
              type="submit"
              handle={handleAddNewUser}
            >
              {" "}
              {t("new")}{" "}
              <span className="pl-1">
                <HiPlusCircle size={20} />
              </span>
            </Button>
          </div>
        </div>

        <Modal isOpen={isModalOpenAddUser} onClose={handleCloseModal}>
          <AddNewUser onSubmit={handleFormSubmit}></AddNewUser>
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
                <th className="py-2 px-4  rounded-tl-md "> {t("sn")}</th>
                <th className="py-2 px-4 cursor-pointer" onClick={handleSort}>
                  <div className="flex justify-center items-center gap-2">
                    <span>{t("name")}</span>
                    {sortDirection === "asc" ? (
                      <BsFillArrowUpSquareFill size={14} />
                    ) : (
                      <BsFillArrowDownSquareFill size={14} />
                    )}
                  </div>
                </th>

                <th className="py-2 px-4  ">{t("username")}</th>
                <th className="py-2 px-4  ">Email</th>
                <th className="py-2 px-4  ">{t("gender")}</th>
                <th className="py-2 px-4  ">{t("birthday")}</th>
                <th className="py-2 px-4  ">{t("role")}</th>
                <th className="py-2 px-4  ">{t("status")}</th>
                <th className="py-2 px-4 rounded-tr-md ">{t("action")}</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center">
                    {t("noUsers")}
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
                      {item.fullName}
                    </td>
                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                      {item.username}
                    </td>
                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                      {item.email}
                    </td>
                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                      {item.gender}
                    </td>
                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                      {item.birthDay &&
                        convertDateTime(item.birthDay.toString(), formatDate)}
                    </td>
                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3">
                      {item.role}
                    </td>

                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                      {item.ban ? (
                        <div className=" bg-red-400 text-white rounded-md">
                          ban
                        </div>
                      ) : (
                        <div className=" bg-green-400 text-white rounded-md">
                          active
                        </div>
                      )}
                    </td>
                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3">
                      <div className="flex items-center justify-center">
                        {item.ban === true ? (
                          <div
                            className="mx-1 p-1 rounded-full hover:bg-mainColor transition-colors duration-200"
                            onClick={() => item._id && handleUnBan(item._id)}
                          >
                            <HiCheckCircle size={16} />
                          </div>
                        ) : (
                          <div
                            className="mx-1 p-1 rounded-full hover:bg-mainColor transition-colors duration-200"
                            onClick={() => item._id && handleBan(item._id)}
                          >
                            <HiOutlineBan size={16} />
                          </div>
                        )}

                        {item.role === 3 && (
                          <div
                            className="mx-1 p-1 rounded-full hover:bg-mainColor transition-colors duration-200"
                            onClick={() =>
                              item._id && handleResetPass(item._id)
                            }
                          >
                            <HiRefresh size={16} />
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
        {/* {isModalOpenDialog && (
          <Modal isOpen={isModalOpenDialog} onClose={handleCancelAction}>
            <ConfirmDialog
              message={confirmMessage}
              onConfirm={handleConfirmAction}
              onCancel={handleCancelAction}
            />
          </Modal>
        )} */}
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
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      </div>
    </LayoutSecondary>
  );
};

export default ManageUser;
