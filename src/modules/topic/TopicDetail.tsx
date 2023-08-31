import { colorThumnailTopic, colorTopic, posts } from "@/constants/global";
import LayoutSecondary from "@/layout/LayoutSecondary";
import React, { useMemo, useState } from "react";
import { HiArrowCircleLeft, HiArrowDown, HiTrash } from "react-icons/hi";
import { useParams, useNavigate, Link } from "react-router-dom";
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
import ppt from "../../assets/IconDocumentTopic/ppt.png";
import jpg from "../../assets/IconDocumentTopic/jpg.png";
import pdf from "../../assets/IconDocumentTopic/pdf.png";
import xls from "../../assets/IconDocumentTopic/xls.png";
import txt from "../../assets/IconDocumentTopic/txt.png";
import rar from "../../assets/IconDocumentTopic/rar.png";
import xml from "../../assets/IconDocumentTopic/xml.png";
import { useTopicStore } from "@/store/topicStore";
import Navigation from "@/components/navigation/Navigation";
import IDocument from "@/interface/document";
import { useDocumentStore } from "@/store/documentStore";
import convertDateTime from "@/utils/helper";
import { useUserStore } from "@/store/userStore";
import ConfirmDialog from "@/components/confirm/ConfirmDialog";
import Modal from "@/components/modal/Modal";
import { CreateNewDocument, deleteDocument } from "@/services/documentService";
import { toast } from "react-toastify";
import { AddNewDocument } from "./AddNewDocument";

const TopicDetail: React.FC = () => {
  const { topic, getById } = useTopicStore();
  const { user } = useUserStore();
  const navigate = useNavigate();

  const { topicId } = useParams<{ topicId: string }>();
  useMemo(() => {
    topicId && getById(topicId);
  }, [topicId]);

  const handleBackTopic = () => {
    navigate(-1);
  };
  const { getListDocument, listAllDocument } = useDocumentStore();
  const formatDate = "MM-DD-YYYY";
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [listDocumentDefault, setListDocumentDefault] = useState<
    IDocument[] | null
  >([]);
  const [currentItems, setCurrentItems] = useState<IDocument[] | null>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpenDialog, setIsModalOpenDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isModalOpenAddTopic, setIsModalOpenAddDocument] = useState(false);
  const [uniqueTypes, setUniqueTypes] = useState<string[] | null>(null);

  useMemo(() => {
    topicId && getListDocument(topicId, 0, 0, "desc");
  }, [getListDocument]);

  useMemo(() => {
    const uniqueTypesArray = listAllDocument && [
      ...new Set(listAllDocument.map((item) => item.type)),
    ];
    setUniqueTypes(uniqueTypesArray);
    setListDocumentDefault(listAllDocument && listAllDocument);
    setCurrentItems(listAllDocument && listAllDocument.slice(0, itemsPerPage));
  }, [itemsPerPage, listAllDocument]);

  const sortedData =
    listDocumentDefault &&
    [...listDocumentDefault].sort((a, b) => {
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
  const handleAddNew = () => {
    setIsModalOpenAddDocument(true);
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
    setIsModalOpenAddDocument(false);
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
  const hanldeDeleted = async (id: string) => {
    handleConfirm(async () => {
      try {
        await deleteDocument(id);
        topicId && getListDocument(topicId, 0, 0, "desc");
        setIsModalOpenDialog(false);
        toast.success(" Deleted document successfully! ", {
          position: "top-center",
          autoClose: 3000,
        });
      } catch (err) {
        console.log("error Deleted document");
      }
    }, "Bạn có chắc muốn xoá không?");
  };
  const handleFormSubmit = async (file: File) => {
    try {
      user?._id &&
        topicId &&
        (await CreateNewDocument(user?._id, topicId, 1, file));
      topicId && getListDocument(topicId, 0, 0, "desc");
      setIsModalOpenAddDocument(false);
      toast.success(" Create topic successfully! ", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (err) {
      if (err) {
        toast.error(" Create topic failed! ", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    }
  };
  if (!topic || topic.hide === true) {
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
              Back
            </button>
          </div>
        </div>
      </LayoutSecondary>
    );
  }

  return (
    <LayoutSecondary>
      <Navigation></Navigation>

      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 dark:text-white h-auto">
        <div
          className={`${
            colorThumnailTopic[topic.color as keyof typeof colorTopic] ||
            "bg-light4 dark:bg-dark1/80"
          } shadow-sm lg:col-span-2 lg:row-span-1 py-4 rounded-lg pr-8 flex justify-center items-center h-auto `}
        >
          {topic.img ? (
            <div className="max-sm:hidden shrink-0 w-[130px] h-full flex items-center justify-center">
              <div className="flex flex-col items-center justify-center h-full">
                <img
                  loading="lazy"
                  className="block lazy lazyloaded rounded-lg"
                  src={topic.img}
                  width={100}
                  height={100}
                  alt="Topic Thumbnail"
                />
              </div>
            </div>
          ) : null}

          <div className="py-2 ml-4  flex flex-col justify-center items-start ">
            <div className=" text-lg font-semibold">{topic.name}</div>
            <div>{topic.desc}</div>
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
                listTopic={topic._id}
                numTopicsToShow={4}
              ></ListDiscussCard>
            </TabPanel>
            <TabPanel>
              <ListPostCard
                listTopic={topic._id}
                numTopicsToShow={4}
              ></ListPostCard>
            </TabPanel>
          </Tabs>
        </div>
        <Modal isOpen={isModalOpenAddTopic} onClose={handleCloseModal}>
          <AddNewDocument onSubmit={handleFormSubmit}></AddNewDocument>
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
        <div className="bg-light4 shadow-sm dark:bg-dark1/80 lg:col-span-2 lg:row-auto rounded-lg p-4">
          <div className=" text-lg font-semibold mb-4">Document</div>
          <div className=" flex justify-between items-center">
            <div className="mb-2 ">
              <select
                className="bg-light1 cursor-pointer dark:bg-dark2 rounded-md py-1 px-2"
                value={filterType || ""}
                onChange={(e) => handleFilter(e.target.value || null)}
              >
                <option value="">All Types</option>
                {uniqueTypes?.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            {user?.role === 0 && (
              <div className=" flex justify-center items-center">
                <button
                  onClick={handleAddNew}
                  className=" text-white bg-mainColor mb-2 p-2 rounded-lg"
                >
                  Add document
                </button>
              </div>
            )}
          </div>
          <div className="overflow-x-auto ">
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
                  <th className="py-2 px-4  ">Status</th>
                  <th className="py-2 px-4 rounded-tr-md ">Download</th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center">
                      Không có file nào
                    </td>
                  </tr>
                ) : (
                  currentItems?.map((item, index) => (
                    <tr
                      key={index}
                      className=" even:bg-light3 odd:bg-light4 dark:odd:bg-dark2 dark:even:bg-dark2 dark:text-light0 text-xs text-center"
                    >
                      <td className="py-2 px-4 border-y border-light0 dark:border-dark3 ">
                        <div className="flex justify-center items-center">
                          {(() => {
                            switch (item.type) {
                              case "doc":
                              case "docx":
                              case "dotx":
                                return (
                                  <img
                                    width={30}
                                    height={30}
                                    src={doc}
                                    alt="doc Icon"
                                  />
                                );
                              case "zip":
                                return (
                                  <img
                                    width={30}
                                    height={30}
                                    src={zip}
                                    alt="zip Icon"
                                  />
                                );
                              case "xml":
                                return (
                                  <img
                                    width={30}
                                    height={30}
                                    src={xml}
                                    alt="xml Icon"
                                  />
                                );
                              case "jpg":
                                return (
                                  <img
                                    width={30}
                                    height={30}
                                    src={jpg}
                                    alt="jpg Icon"
                                  />
                                );
                              case "rar":
                                return (
                                  <img
                                    width={30}
                                    height={30}
                                    src={rar}
                                    alt="rar Icon"
                                  />
                                );
                              case "pdf":
                                return (
                                  <img
                                    width={30}
                                    height={30}
                                    src={pdf}
                                    alt="pdf Icon"
                                  />
                                );
                              case "ppt":
                                return (
                                  <img
                                    width={30}
                                    height={30}
                                    src={ppt}
                                    alt="ppt Icon"
                                  />
                                );
                              case "txt":
                                return (
                                  <img
                                    width={30}
                                    height={30}
                                    src={txt}
                                    alt="txt Icon"
                                  />
                                );
                              case "xls":
                              case "xlsx":
                              case "xlsm":
                              case "xlsb":
                                return (
                                  <img
                                    width={30}
                                    height={30}
                                    src={xls}
                                    alt="xls Icon"
                                  />
                                );
                              default:
                                return null;
                            }
                          })()}
                        </div>
                      </td>
                      <td className="py-2 px-4 border-y max-w-[150px] border-light0 dark:border-dark3 ">
                        <div className=" flex items-start justify-start">
                          <h6
                            title={item.name}
                            className="tracking-normal text-left break-words line-clamp-2 text-xs md:pr-6 lg:mb-0 dark:text-light0"
                          >
                            {item.name}
                          </h6>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                        <div className=" bg-light1 dark:bg-dark1 rounded-md">
                          {item.type}
                        </div>
                      </td>
                      <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                        {convertDateTime(item.createdAt.toString(), formatDate)}
                      </td>

                      <td className="py-2 px-4 border-y border-light0 dark:border-dark3  ">
                        <div className=" bg-green-400 text-white rounded-md">
                          Publish
                        </div>
                      </td>
                      <td className="py-2 px-4 border-y border-light0 dark:border-dark3">
                        <div className="flex items-center justify-center">
                          <Link
                            to={item.file}
                            target="_blank"
                            className="mx-1 hover:text-white p-1 rounded-full  hover:bg-mainColor transition-colors duration-200"
                          >
                            <HiArrowDown size={16} />
                          </Link>
                          {user?.role === 0 && (
                            <div
                              onClick={() => hanldeDeleted(item._id)}
                              className="mx-1 p-1 rounded-full hover:bg-red-400 transition-colors duration-200"
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
          <div className="flex flex-wrap h-auto pb-2 items-center justify-between bg-light2 dark:bg-dark2 dark:text-light0 text-xs rounded-b-md">
            <div className="w-auto mr-2 pb-3 ml-1">
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
