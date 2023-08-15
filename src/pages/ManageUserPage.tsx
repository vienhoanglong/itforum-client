import { Button } from "@/components/button";
import React, { useState } from "react";
import {
  HiArrowCircleLeft,
  HiFilter,
  HiOutlineBan,
  HiPencil,
  HiPlusCircle,
  HiSearch,
  HiTrash,
} from "react-icons/hi";
import ReactPaginate from "react-paginate";
import {
  exampleDataListUsers,
  exampleDataNotifi,
} from "../constants/global.ts";
import Modal from "@/components/modal/Modal.tsx";
import LayoutSecondary from "@/layout/LayoutSecondary.tsx";
import AddNewUser from "@/modules/user/AddNewUser.tsx";
import DeletedUser from "@/modules/user/DeletedUser.tsx";
import ConfirmDialog from "@/components/confirm/ConfirmDialog.tsx";

export const ManageUser: React.FC = () => {
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
  const [isModalOpenDialog, setIsModalOpenDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [confirmMessage, setConfirmMessage] = useState("");

  const handleConfirm = (action: () => void, message: string) => {
    setIsModalOpenDialog(true);
    setConfirmAction(() => action);
    setConfirmMessage(message);
  };
  const offset = currentPage * itemsPerPage;
  const paginatedData = exampleDataListUsers.slice(
    offset,
    offset + itemsPerPage
  );

  const [isModalOpenAddUser, setIsModalOpenAddUser] = useState(false); // config modal add
  const [isModalOpenTrash, setIsModalOpenTrash] = useState(false); // config modal trash
  const handleAddNewUser = () => {
    setIsModalOpenAddUser(true);
  };

  const handleCloseModalAdd = () => {
    setIsModalOpenAddUser(false);
  };
  const handleDeletedUser = () => {
    setIsModalOpenTrash(true);
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

  const handleUpdate = () => {
    handleConfirm(() => {
      // Xử lý khôi phục
      // ...
    }, "Bạn có chắc muốn chỉnh sửa không?");
  };

  const handleDelete = () => {
    handleConfirm(() => {
      // Xử lý xoá
      // ...
    }, "Bạn có chắc muốn xoá không?");
  };
  const handleCloseModalBan = () => {
    setIsModalOpenTrash(false);
  };
  const handleFormSubmit = () => {
    console.log("Form submitted!");
  };
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
          <h4 className="text-xl font-bold text-darker ">Management User</h4>
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

          <div className="w-full md:w-auto grid grid-cols-2 gap-2 justify-end py-4 ">
            <Button
              className=" w-full text-white text-xs bg-lighter hover:bg-darker  rounded px-4 shadow-md py-2"
              kind="primary"
              type="submit"
              handle={handleAddNewUser}
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
              handle={handleDeletedUser}
            >
              {" "}
              Deleted{" "}
              <span className="pl-1">
                <HiTrash size={20} />
              </span>
            </Button>
          </div>
        </div>

        <Modal isOpen={isModalOpenAddUser} onClose={handleCloseModalAdd}>
          <AddNewUser onSubmit={handleFormSubmit}></AddNewUser>
        </Modal>
        <Modal isOpen={isModalOpenTrash} onClose={handleCloseModalBan}>
          <DeletedUser></DeletedUser>
        </Modal>

        <div className="w-full overflow-x-auto">
          <table className="min-w-full shadow-lg  ">
            <thead className="bg-light2 dark:bg-dark2 dark:text-light0 text-xs text-center">
              <tr>
                <th className="py-2 px-4  rounded-tl-md ">SN</th>
                <th className="py-2 px-4  ">Name</th>
                <th className="py-2 px-4  ">Email</th>
                <th className="py-2 px-4  ">Gender</th>
                <th className="py-2 px-4  ">Role</th>
                <th className="py-2 px-4  ">Status</th>
                <th className="py-2 px-4 rounded-tr-md ">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center">
                    Không có dữ liệu người dùng
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
                      {item.name}
                    </td>
                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                      {item.email}
                    </td>
                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                      {item.gender}
                    </td>
                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3">
                      {item.role}
                    </td>

                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                      {item.status ? (
                        <div className=" bg-green-400 text-white rounded-md">
                          active
                        </div>
                      ) : (
                        <div className=" bg-red-400 text-white rounded-md">
                          deleted
                        </div>
                      )}
                    </td>
                    <td className="py-2 px-4 border-y border-light0 dark:border-dark3">
                      <div className="flex items-center justify-center">
                        <div
                          className="mx-1 p-1 rounded-full  hover:bg-mainColor transition-colors duration-200"
                          onClick={handleUpdate}
                        >
                          <HiPencil size={16} />
                        </div>
                        <div
                          className="mx-1 p-1 rounded-full hover:bg-mainColor transition-colors duration-200"
                          onClick={handleDelete}
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
        {isModalOpenDialog && (
          <Modal isOpen={isModalOpenDialog} onClose={handleCancelAction}>
            <ConfirmDialog
              message={confirmMessage}
              onConfirm={handleConfirmAction}
              onCancel={handleCancelAction}
            />
          </Modal>
        )}
        <div className="flex items-center justify-center bg-light2 dark:bg-dark2 dark:text-light0 h-8 text-xs rounded-b-md">
          <div className="w-1/2 mr-2 pb-3 ml-1">
            <ReactPaginate
              pageCount={Math.ceil(exampleDataNotifi.length / itemsPerPage)}
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

export default ManageUser;
