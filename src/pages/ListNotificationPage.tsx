import INotification from "@/interface/notification";
import LayoutDefault from "@/layout/LayoutDefault";
import LayoutSecondary from "@/layout/LayoutSecondary";
import { useNotificationStore } from "@/store/notificationStore";
import React, { useEffect, useMemo, useState } from "react";
import { BsFilterRight, BsSearch } from "react-icons/bs";
import { HiArrowCircleLeft, HiChevronDown } from "react-icons/hi";
import ReactPaginate from "react-paginate";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import convertDateTime from "@/utils/helper";
import { useUserStore } from "@/store/userStore";

export const ListNotificationPage: React.FC = () => {
  const { type } = useParams<string>();
  const navigate = useNavigate();
  const { getListUserNotifi, listUserNotifi } = useUserStore();
  const {
    listNotificationType,
    listNotificationSearch,
    getListNotificationSearch,
    getListNotificationType,
    getListNotification,
    listNotification,
  } = useNotificationStore();
  const [resetType, setResetType] = useState("");

  const [sortDirection, setSortDirection] = useState<string>("desc");
  const [filter, setFilter] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const formatDate = "MM-DD-YYYY";
  const [listNotificationDefault, setListNotificationDefault] = useState<
    INotification[] | null
  >([]);
  const [currentItems, setCurrentItems] = useState<INotification[] | null>([]);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (type && type !== "" && type.toLowerCase() === "all") {
      getListNotification(0, 0, "desc");
    } else if (type && type !== "") {
      getListNotificationType(type);
    }
  }, [getListNotification, getListNotificationType, type]);

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  useMemo(() => {
    if (type && type.toLowerCase() === "all") {
      listNotification && setListNotificationDefault(listNotification);
    } else if (type && type !== "" && type !== "all") {
      listNotificationType && setListNotificationDefault(listNotificationType);
    }
    if (type && type.toLowerCase() === "all") {
      listNotification &&
        setCurrentItems(listNotification.slice(0, itemsPerPage));
    } else if (type && type !== "" && type !== "all") {
      type &&
        listNotificationType &&
        setCurrentItems(listNotificationType.slice(0, itemsPerPage));
    }
  }, [itemsPerPage, listNotification, listNotificationType, type]);

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSortDirection(value);
  };
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setFilter(value);
    setItemOffset(0);
    setCurrentPage(0);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
  };
  const handleButtonClick = () => {
    if (search != "") {
      getListNotificationSearch(search);
      setItemOffset(0);
      setCurrentPage(0);
      setResetType("");
    }
  };

  const handleShowAllClick = () => {
    type && setResetType(type);
    setSearch("");
    setItemOffset(0);
    setCurrentPage(0);
  };

  const sortedData = useMemo(() => {
    if (search && search != "") {
      if (!listNotificationSearch) return [];
      else if (type && type !== "all") {
        return [...listNotificationSearch]
          .filter((e) => e.typeNotice === type)
          .sort((a, b) => {
            if (sortDirection === "asc") {
              return (
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
              );
            } else {
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            }
          });
      }
      return [...listNotificationSearch].sort((a, b) => {
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
    } else {
      if (!listNotificationDefault) return [];

      return [...listNotificationDefault].sort((a, b) => {
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
    }
  }, [listNotificationSearch, type, sortDirection, listNotificationDefault]);

  // Hàm chuyển trang
  const handlePageClick = (selectedPage: { selected: number }) => {
    const newOffset = selectedPage.selected * itemsPerPage;
    setItemOffset(newOffset);
    setCurrentPage(selectedPage.selected);
  };

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

    // const searchData =   listNotificationSearch && listNotificationSearch.length > 0 && type !== "all"
    // ? listNotificationSearch.filter((item: INotification) => item.typeNotice === type)
    // : listNotificationSearch || sortedData;

    // const searchData = search !== "" && listNotificationSearch && type && type != "all"
    // ? listNotificationSearch.filter((item: INotification) => item.typeNotice === type)
    // : sortedData;

    const filteredData = filter
      ? sortedData?.filter((item) => item.level === filter)
      : sortedData;
    const newCurrentItems = filteredData?.slice(itemOffset, endOffset);
    const newPageCount = Math.ceil((filteredData?.length ?? 0) / itemsPerPage);
    setTimeout(() => {
      newCurrentItems && setCurrentItems(newCurrentItems);
      newPageCount && setPageCount(newPageCount);
    }, 0);
  }, [
    sortedData,
    filter,
    search,
    type,
    listNotificationSearch,
    itemOffset,
    itemsPerPage,
  ]);

  useEffect(() => {
    if (currentItems && currentItems.length > 0) {
      const userIDs = currentItems.map((user) => user.createdBy);
      if (userIDs.length > 0) {
        getListUserNotifi(userIDs);
      }
    }
  }, [currentItems, getListUserNotifi]);

  if (
    type != "all" &&
    type !== "recruitment" &&
    type !== "subject" &&
    type !== "event" &&
    type !== "other"
  ) {
    return (
      <LayoutSecondary>
        <div className="w-full h-full text-center flex flex-col text-lg font-bold p-10 gap-4">
          <span>Type notification not found!</span>
          <div>
            <button
              className="dark:text-light0 rounded-full mb-4 pr-1 link inline-flex items-center text-sm font-medium !text-grey-600 bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark1"
              onClick={handleBackButtonClick}
            >
              <HiArrowCircleLeft className="w-6 h-6 mr-1" />
              Back
            </button>
          </div>
        </div>
      </LayoutSecondary>
    );
  }
  return (
    <LayoutDefault
    // childrenOther={< Notification />}
    >
      <button
        className="dark:text-light0 bg- rounded-full mb-4 pr-1 link inline-flex items-center text-sm font-medium !text-grey-600 bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark1"
        onClick={handleBackButtonClick}
      >
        <HiArrowCircleLeft className="w-6 h-6 mr-1" />
        Back
      </button>
      <div className=" py-4">
        <h4 className="text-xl font-bold text-darker ">Notifications</h4>
      </div>

      <div className="flex flex-row flex-wrap gap-2 justify-between">
        <div className="flex justify-center items-center gap-2">
          <div className="relative">
            <select
              className="appearance-none flex cursor-pointer items-center rounded-lg bg-slate-100 px-4 py-3 text-xs leading-none text-dark2 dark:bg-dark1 dark:text-light0 w-full mr-5"
              onChange={handleSort}
              value={sortDirection}
              name="sort"
            >
              <option value="desc">Mới nhất</option>
              <option value="asc">Cũ nhất</option>
            </select>
            <HiChevronDown className="text-dark1 dark:text-light1 text-base absolute right-4 top-[10px] fill-current pointer-events-none" />
          </div>
          <div className="relative">
            <select
              className="appearance-none flex cursor-pointer items-center rounded-lg bg-slate-100 px-4 py-3 text-xs leading-none text-dark2 dark:bg-dark1 dark:text-light0 w-full mr-5"
              onChange={handleFilterChange}
              value={filter || ""}
              name="level"
            >
              <option value="">All</option>
              <option value="important">Important</option>
              <option value="normal">Normal</option>
            </select>
            <BsFilterRight className="text-dark1 dark:text-light1 text-base absolute right-4 top-[10px] fill-current pointer-events-none" />
          </div>
          <div>
            <button
              className="bg-mainColor h-auto w-full dark:text-white p-2 rounded-lg
    "
              onClick={handleShowAllClick}
            >
              Clear search
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center max-md:mb-3 h-9 w-full rounded-lg md:mt-0 md:w-64 bg-slate-100 text-dark1 dark:bg-dark1 dark:text-light0">
          <label htmlFor="q" className="flex w-full px-3 flex-row">
            <BsSearch className="text-dark1 dark:text-light1 text-base" />
            <input
              id="q"
              className="ml-3 h-full w-full pt-0 text-xs bg-transparent outline-none"
              placeholder="Begin your search..."
              value={search}
              onChange={handleSearchChange}
            />
          </label>
          <button
            onClick={handleButtonClick}
            className=" bg-mainColor p-2 rounded-lg"
          >
            Search
          </button>
        </div>
      </div>
      {currentItems === undefined || currentItems?.length === 0 ? (
        <div className="text-center dark:text-white">
          Không có thông báo nào
        </div>
      ) : (
        currentItems?.map((notifi, index) =>
          listUserNotifi
            ?.filter((e) => e._id === notifi.createdBy)
            .map((user) => (
              <div
                key={index}
                className="flex  w-full space-x-2 cursor-pointer bg-light4 shadow-sm dark:bg-dark1 rounded-lg py-2 px-4 my-3"
              >
                <div className="w-full h-full dark:text-white flex flex-col">
                  <Link
                    to={`/notifications-detail/${notifi._id}`}
                    className="w-full break-words leading-normal  p-1 text-sm font-semibold line-clamp-3 hover:text-mainColor"
                  >
                    {notifi.titleNotice}
                  </Link>

                  <div className=" break-words line-clamp-3 text-black/90 dark:text-light0 lg:mb-0 lg:pr-8 text-xs">
                    {notifi && notifi.descNotice && (
                      <div className=" pl-2 break-words line-clamp-2">
                        {parse(notifi.descNotice)}
                      </div>
                    )}
                  </div>
                  <div className="flex pl-2 flex-wrap justify-start space-x-2 mt-1">
                    <Link
                      to={`/user/${user._id}`}
                      className="block hover:underline text-mainColor font-thin"
                    >
                      {user.fullName ?? user.username}
                    </Link>
                    <span className="mx-2 dark:text-light0">-</span>
                    <span className="font-thin block dark:text-light0">
                      {notifi?.createdAt &&
                        convertDateTime(
                          notifi.createdAt.toString(),
                          formatDate
                        )}
                    </span>
                  </div>
                </div>
              </div>
            ))
        )
      )}
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
            Item:
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
    </LayoutDefault>
  );
};

export default ListNotificationPage;
