import { colorTopic } from "@/constants/global";
import { BsEyeFill, BsFillChatFill } from "react-icons/bs";
import React, { useEffect, useMemo, useState } from "react";
import { BsFilterRight, BsSearch } from "react-icons/bs";
import { HiChevronDown } from "react-icons/hi";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import convertDateTime from "@/utils/helper";
import { usePostStore } from "@/store/postStore";
import { useTopicStore } from "@/store/topicStore";
import IPost from "@/interface/post";
import { useTranslation } from "react-i18next";

export const Posts: React.FC = () => {
  const { t } = useTranslation();
  const {
    listUserPosts,
    getListUserPost,
    getListPost,
    listAllPost,
    getListPostBySearch,
    listPostFromSearch,
  } = usePostStore();
  const { listAllTopic } = useTopicStore();
  const [resetType, setResetType] = useState("");

  const [sortDirection, setSortDirection] = useState<string>("desc");
  const [filter, setFilter] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [searchClick, setSearchClick] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const formatDate = "MM-DD-YYYY";
  const [listPostDefault, setListPostDefault] = useState<IPost[] | null>([]);
  const [currentItems, setCurrentItems] = useState<IPost[] | null>([]);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getListPost(0, 0, "desc");
  }, [getListPost]);

  useMemo(() => {
    listAllPost &&
      setListPostDefault(
        listAllPost.filter((e) => e.status === 1 && e.isDraft === false)
      );
  }, [itemsPerPage, listAllPost]);

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
      getListPostBySearch(search);
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
      if (!listPostFromSearch) return [];

      return [...listPostFromSearch]
        .filter((e) => e.status === 1 && e.isDraft === false)
        .sort((a, b) => {
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
      if (!listPostDefault) return [];
      return [...listPostDefault]
        .filter((e) => e.status === 1 && e.isDraft === false)
        .sort((a, b) => {
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
  }, [resetType, listPostFromSearch, sortDirection, listPostDefault]);

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
    const filteredData = filter
      ? sortedData?.filter((item) => item.hashtag.includes(filter))
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
    listPostFromSearch,
    itemOffset,
    itemsPerPage,
  ]);

  useEffect(() => {
    if (currentItems && currentItems.length > 0) {
      const userIDs = currentItems.map((user) => user.createdBy);
      if (userIDs.length > 0) {
        getListUserPost(userIDs);
      }
    }
  }, [currentItems, getListUserPost]);

  return (
    <>
      <div className="flex flex-row flex-wrap gap-2 mt-2 justify-between">
        <div className="flex justify-center items-center gap-2">
          <div className="relative">
            <select
              className="appearance-none flex cursor-pointer items-center rounded-lg bg-slate-100 px-4 py-3 text-xs leading-none text-dark2 dark:bg-dark1 dark:text-light0 w-full mr-5"
              onChange={handleSort}
              value={sortDirection}
              name="sort"
            >
              <option value="desc">{t("newest")}</option>
              <option value="asc">{t("oldest")}</option>
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
              <option value="">{t("all")}</option>
              {listAllTopic?.map((topic) => (
                <option key={topic._id} value={topic._id}>
                  {topic.name}
                </option>
              ))}
            </select>
            <BsFilterRight className="text-dark1 dark:text-light1 text-base absolute right-4 top-[10px] fill-current pointer-events-none" />
          </div>
          <div>
            {searchClick === true ? (
              <button
                className="bg-mainColor text-white h-auto w-full dark:text-white p-2 rounded-lg
     "
                onClick={handleShowAllClick}
              >
                {t("clearSearch")}
              </button>
            ) : (
              <button
                className=" bg-dark3 h-auto w-full text-white p-2 rounded-lg
    "
                disabled
                onClick={handleShowAllClick}
              >
                {t("clearSearch")}
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center max-md:mb-3 h-9 w-full rounded-lg md:mt-0 lg:w-64 bg-slate-100 text-dark1 dark:bg-dark1 dark:text-light0">
          <label htmlFor="q" className="flex w-full px-3 flex-row">
            <BsSearch className="text-dark1 dark:text-light1 text-base" />
            <input
              id="q"
              className="ml-3 h-full w-full pt-0 text-xs bg-transparent outline-none"
              placeholder={t("beginYourSearch")}
              value={search}
              onChange={handleSearchChange}
            />
          </label>
          <button
            onClick={handleButtonClick}
            className=" bg-mainColor text-white p-2 w-[100px] rounded-lg"
          >
            {t("search")}
          </button>
        </div>
      </div>
      {currentItems === undefined || currentItems?.length === 0 ? (
        <div className="text-center p-4 dark:text-white">{t("noPosts")}</div>
      ) : (
        currentItems?.map((post, index) =>
          listUserPosts
            ?.filter((e) => e._id === post.createdBy)
            .map((user) => (
              <div
                key={index}
                className="flex w-full  space-x-2 cursor-pointer bg-light4 shadow-sm dark:bg-dark1 rounded-lg p-2 my-2"
              >
                <div className="w-2/5">
                  <img
                    src={post.thumbnail}
                    alt="thumbnail"
                    className="rounded-lg w-auto h-auto  object-cover"
                  />
                </div>
                <div className="w-full h-full flex flex-col">
                  <div className="flex">
                    <h3 className="hover:text-mainColor">
                      <Link
                        to={`/post/${post._id}`}
                        className="hover:text-mainColor break-words leading-normal text-black/90 dark:text-light0 p-1 text-sm font-semibold line-clamp-3 w-4/5 "
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <div className="flex justify-center items-baseline  dark:text-light0 py-2 ml-auto rounded-xl bg-grey-400 ">
                      <div className="flex items-center  px-3">
                        <div className="mr-1">
                          <BsFillChatFill size={12} />
                        </div>
                        <span className="text-xs font-semibold leading-none text-grey-800">
                          3
                        </span>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="mr-1">
                          <BsEyeFill size={12} />
                        </div>
                        <span className="text-xs font-medium leading-none text-left text-text1">
                          {post.totalView}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-start space-x-2">
                    <span className="block text-mainColor font-thin">
                      <Link
                        to={`/user/${user?._id}`}
                        className=" hover:text-mainColor cursor-pointer"
                      >
                        {user.fullName ?? user.username}
                      </Link>
                    </span>
                    <span className="font-thin block dark:text-light0">
                      {post?.createdAt &&
                        convertDateTime(post.createdAt.toString(), formatDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <div className="mt-2">
                      {post.hashtag.map((topicId) => {
                        const topic = listAllTopic?.find(
                          (topic) => topic._id === topicId
                        );
                        if (topic) {
                          return (
                            <Link
                              key={topic._id}
                              to={`/topics/detail/${topic._id}`}
                            >
                              <div
                                className={`inline-block border-2 px-2 py-[2px] rounded-full m-[1px] text-[10px] ${
                                  colorTopic[
                                    topic.color as keyof typeof colorTopic
                                  ] || ""
                                }`}
                              >
                                {topic.name}
                              </div>
                            </Link>
                          );
                        }
                        return null;
                      })}
                    </div>
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
    </>
  );
};

export default Posts;
