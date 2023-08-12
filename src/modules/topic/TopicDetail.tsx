import {
  colorThumnailTopic,
  colorTopic,
  discuss,
  exampleDataDocument,
  posts,
  sampleTopics,
} from "@/constants/global";
import LayoutSecondary from "@/layout/LayoutSecondary";
import React, { useEffect, useState } from "react";
import { HiArrowCircleLeft, HiArrowDown } from "react-icons/hi";
import { useParams, useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ListPostCard from "../post/ListPostCard";
import ListDiscussCard from "../discuss/ListDiscussCard";
import ReactPaginate from "react-paginate";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import doc from "../../assets/IconDocumentTopic/doc.png";
import zip from "../../assets/IconDocumentTopic/zip.png";

const TopicDetail: React.FC = () => {
  const { topicName } = useParams<{ topicName: string }>();
  const navigate = useNavigate();
  const topic = sampleTopics.find(
    (t) => t.name.toLowerCase().replace(/\s+/g, "-") === topicName
  );
  const handleBackTopic = () => {
    navigate("/topics");
  };
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState(
    exampleDataDocument.slice(0, itemsPerPage)
  );
  const [currentPage, setCurrentPage] = useState(0);

  const sortedData = [...exampleDataDocument].sort((a, b) => {
    if (sortDirection === "asc") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });
  const filteredData = filterType
    ? sortedData.filter((item) => item.type === filterType)
    : sortedData;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredData]);

  const handleBackButtonClick = () => {
    navigate(-1);
  };
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

  if (!topic || topic.hide) {
    return (
      <LayoutSecondary>
        <div className="w-full h-full text-center flex flex-col text-lg font-bold p-10 gap-4">
          <span>Topic not found!</span>
          <div>
            <button
              className="dark:text-light0 rounded-full mb-4 pr-1 link inline-flex items-center text-sm font-medium !text-grey-600 bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark1"
              onClick={handleBackTopic}
            >
              <HiArrowCircleLeft className="w-6 h-6 mr-1" />
              Back to Topics
            </button>
          </div>
        </div>
      </LayoutSecondary>
    );
  }

  return (
    <LayoutSecondary>
      <button
        className="dark:text-light0 bg- rounded-full mb-4 pr-1 link inline-flex items-center text-sm font-medium !text-grey-600 bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark1"
        onClick={handleBackButtonClick}
      >
        <HiArrowCircleLeft className="w-6 h-6 mr-1" />
        Back to Topics
      </button>

      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 dark:text-white h-auto">
        <div
          className={`${
            colorThumnailTopic[topic.color as keyof typeof colorTopic] ||
            "bg-light4 dark:bg-dark1/80"
          } shadow-sm lg:col-span-2 lg:row-span-1 py-4 rounded-lg pr-8 flex h-auto `}
        >
          <div className=" max-sm:hidden shrink-0 w-[170px] h-full flex items-center justify-center">
            <img
              loading="lazy"
              className="block lazy lazyloaded rounded-lg"
              src={topic.img}
              width={110}
              height={110}
            />
          </div>

          <div className="py-2 max-sm:ml-4  flex flex-col justify-center items-start ">
            <div className=" text-lg font-semibold">{topic.name}</div>
            <div>
              So you've mastered the basics of building an SPA with Laravel and
              Inertia? Nice work, but of course there's always more to learn. In
              this series, we'll review a variety of useful tips and techniques
              to simplify and clean up your single page applications. So you've
              mastered the basics of building an SPA with Laravel and Inertia?
              Nice work, but of course there's always more to learn. In this
              series, we'll review a variety of useful tips and techniques to
              simplify and clean up your single page applications.{" "}
            </div>
          </div>
        </div>

        <div className=" dark:bg-dark0 lg:row-span-4 rounded-lg h-auto">
          <Tabs>
            <TabList>
              <Tab className=" cursor-pointer relative py-2 px-4 mr-1 bg-light2 dark:bg-dark1/20 dark:text-white rounded-t-lg">
                Discuss
                <div className="absolute inset-0 bg-transparent"></div>
              </Tab>
              <Tab className=" cursor-pointer relative py-2 px-4 bg-light2 dark:bg-dark1/20 dark:text-white rounded-t-lg">
                Posts
                <div className="absolute inset-0 bg-transparent"></div>
              </Tab>
            </TabList>
            <TabPanel>
              <ListDiscussCard
                topicName={topicName ? topicName : ""}
                numTopicsToShow={4}
                discuss={discuss}
              ></ListDiscussCard>
            </TabPanel>
            <TabPanel>
              <ListPostCard
                topicName={topicName ? topicName : ""}
                numTopicsToShow={4}
                posts={posts}
              ></ListPostCard>
            </TabPanel>
          </Tabs>
        </div>

        <div className="bg-light4 shadow-sm dark:bg-dark1/80 lg:col-span-2 lg:row-auto rounded-lg p-4">
          <div className=" text-lg font-semibold mb-4">Document</div>
          <div className="mb-2">
            <select
              className="bg-light1 dark:bg-dark2 rounded-md py-1 px-2"
              value={filterType || ""}
              onChange={(e) => handleFilter(e.target.value || null)}
            >
              <option value="">All Types</option>
              <option value="zip">ZIP</option>
              <option value="doc">DOC</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full shadow-md  ">
              <thead className="bg-light2 dark:bg-dark2 dark:text-light0 text-xs text-center">
                <tr>
                  <th className="py-2 px-4 rounded-tl-md  ">Files</th>
                  <th className="py-2 px-4 rounded-tl-md  ">Name</th>
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
                  <th className="py-2 px-4  ">Author</th>
                  <th className="py-2 px-4  ">Status</th>
                  <th className="py-2 px-4 rounded-tr-md ">Download</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center">
                      Không có file nào
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item, index) => (
                    <tr
                      key={index}
                      className=" even:bg-light3 odd:bg-light4 dark:odd:bg-dark2 dark:even:bg-dark2 dark:text-light0 text-xs cursor-pointer text-center"
                    >
                      <td className="py-2 px-4 border-y border-light0 dark:border-dark3 ">
                        <div className="flex justify-center items-center">
                          {item.type === "doc" ? (
                            <img width={20} height={20} src={doc}></img>
                          ) : (
                            <img width={20} height={20} src={zip}></img>
                          )}
                        </div>
                      </td>
                      <td className="py-2 px-4 border-y border-light0 dark:border-dark3 ">
                        {item.name}
                      </td>
                      <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                        <div className=" bg-light1 dark:bg-dark1 rounded-md">
                          {item.type}
                        </div>
                      </td>
                      <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                        {item.date}
                      </td>
                      <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                        {item.author}
                      </td>
                      <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                        <div>
                          {item.status ? (
                            <div className=" bg-green-400 text-white rounded-md">
                              Publish
                            </div>
                          ) : (
                            <div className=" bg-red-400 text-white rounded-md">
                              Unpublish
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-2 px-4 border-y border-light0 dark:border-dark3">
                        <div className="flex items-center justify-center">
                          <div className="mx-1 hover:text-white p-1 rounded-full  hover:bg-mainColor transition-colors duration-200">
                            <HiArrowDown size={16} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap h-auto pb-2 items-center justify-between bg-light2 dark:bg-dark2 dark:text-light0 text-xs rounded-b-md">
            <div className="w-auto mr-2 pb-3 ml-1">
              {/* <ReactPaginate
                      pageCount={Math.ceil(filteredData.length / itemsPerPage)}
                      marginPagesDisplayed={2}
                      initialPage={0}
                      breakLabel="..."
                      onPageChange={handlePageChange}
                      containerClassName="flex justify-center items-center  mt-4 space-x-4"
                      pageClassName="m-2"
                      activeClassName="underline underline-offset-2"
                      previousLabel="<Prev"
                      nextLabel="Next>"
                      pageRangeDisplayed={Math.min(5, Math.ceil(filteredData.length / itemsPerPage))}
                      renderOnZeroPageCount={null}
                    /> */}
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
      </div>
    </LayoutSecondary>
  );
};

export default TopicDetail;
