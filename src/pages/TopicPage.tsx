import Topic from "@/interface/topic";
import LayoutSecondary from "@/layout/LayoutSecondary";
import { useTopicStore } from "@/store/topicStore";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export const TopicPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [activeTag, setActiveTag] = useState<string | null>(type || "All");
  const { listAllTopic, listTopicByType, getByTypeTopic, getTopic } =
    useTopicStore();
  const [filteredTopics, setFilteredTopics] = useState<Topic[] | null>(
    listAllTopic || null
  );

  const navigate = useNavigate();

  useEffect(() => {
    getTopic();
    if (activeTag === "all" && !type) {
      navigate("/topics/all");
    }
    if (activeTag !== "all" && !filteredTopics?.length) {
      navigate("/404");
    }
  }, [type, navigate]);

  const handleTagClick = async (tagName: string) => {
    setActiveTag(tagName);

    if (tagName === "All") {
      await getTopic();
    } else {
      await getByTypeTopic(tagName);
    }

    // Dù có giá trị trả về hay không, bạn vẫn cập nhật filteredTopics
    setFilteredTopics(listAllTopic || listTopicByType || []);

    navigate(`/topics/${tagName.toLowerCase().replace(/\s+/g, "-")}`);
  };

  const getTagClassName = (tagName: string) => {
    return `taxonomy-nav-link rounded-full px-4 py-2 font-medium hover:text-white transition-colors duration-300 hover:bg-blue-400 md:text-sm p-4 font-semibold ${
      activeTag === tagName
        ? "bg-blue-500 text-white"
        : " text-dark3 bg-light2 dark:bg-dark1 md:bg-transparent"
    }`;
  };
  return (
    <LayoutSecondary>
      <div className=" bg-transparent rounded-lg px-2 md:p-8">
        <div className="w-full relative mb-4">
          <ul
            className="  py-4 pb-2hide-scrollbar mr-[-20px] flex min-h-[40px] items-center gap-x-4 overflow-x-auto overflow-y-hidden no-scrollbar  text-center leading-loose  md:mx-auto md:min-h-0 md:justify-center md:gap-x-8 md:overflow-x-visible md:overflow-y-visible md:pr-0 lg:gap-x-12 after:absolute after:bottom-[0px] after:hidden after:h-[2px] after:w-full after:flex-shrink-0 after:bg-gradient-to-r after:md:block from-transparent via-[rgba(50,138,241,0.15)] to-transparent pr-[20px]"
            style={{ maxWidth: "800px" }}
          >
            <li className="relative inline-block flex-shrink-0">
              <a
                className={getTagClassName("all")}
                href="/topics/all"
                onClick={() => handleTagClick("All")}
              >
                All Topics
              </a>
            </li>
            <li className="relative inline-block flex-shrink-0">
              <a
                className={getTagClassName("devops")}
                href="/topics/devops"
                onClick={() => handleTagClick("DevOps")}
              >
                DevOps
              </a>
            </li>
            <li className="relative inline-block flex-shrink-0">
              <a
                className={getTagClassName("frameworks")}
                href="/topics/frameworks"
                onClick={() => handleTagClick("Frameworks")}
              >
                Frameworks
              </a>
            </li>
            <li className="relative inline-block flex-shrink-0">
              <a
                className={getTagClassName("languages")}
                href="/topics/languages"
                onClick={() => handleTagClick("Languages")}
              >
                Languages
              </a>
            </li>
            <li className="relative inline-block flex-shrink-0">
              <a
                className={getTagClassName("subject")}
                href="/topics/subject"
                onClick={() => handleTagClick("Subject")}
              >
                Subject
              </a>
            </li>
            <li className="relative inline-block flex-shrink-0">
              <a
                className={getTagClassName("testing")}
                href="/topics/testing"
                onClick={() => handleTagClick("Testing")}
              >
                Testing
              </a>
            </li>
            <li className="relative inline-block flex-shrink-0">
              <a
                className={getTagClassName("tooling")}
                href="/topics/tooling"
                onClick={() => handleTagClick("Tooling")}
              >
                Tooling
              </a>
            </li>
          </ul>
        </div>
        <div
          className="mt-4 w-full gap-4 pb-2 items-center max-h-[700px] md:max-h-none container mx-auto mb-4 flex flex-wrap no-scrollbar justify-center gap-x-5 gap-y-6 overflow-auto md:mt-8"
          style={{ maxWidth: "1350px" }}
        >
          {filteredTopics?.map(
            (topic) =>
              topic.hide === false && (
                <div
                  key={topic._id}
                  className=" cursor-pointer flex flex-1 justify-center text-center md:max-w-[225px] "
                >
                  <a
                    className=" shadow-sm bg-light4 dark:bg-dark1/50 panel relative transition-colors duration-300 dark:hover:bg-dark2 hover:bg-light2 flex h-full w-full flex-shrink-0 flex-col justify-between rounded-2xl px-3 py-1 "
                    style={{ height: "70px", minWidth: "180px" }}
                    href={`/topics/detail/${topic?.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    <div
                      className="flex flex-1 items-center"
                      style={{ height: "-4px" }}
                    >
                      {topic.img ? (
                        <div className="mr-4 flex flex-shrink-0 justify-center">
                          <img
                            width={35}
                            height={35}
                            className="h-full"
                            src={topic.img}
                          />
                        </div>
                      ) : null}
                      <div className="w-full lg:w-auto flex justify-between sm:block">
                        <h3 className="text-left dark:text-white text-xs font-semibold leading-tight sm:mb-2">
                          {" "}
                          {topic.name}
                        </h3>
                        <div className="hidden text-left sm:block text-[10px] dark:text-white font-normal">
                          8 Post{" "}
                          <span
                            className="relative inline-block px-1 text-xs"
                            style={{ top: "1px" }}
                          >
                            {" "}
                            •{" "}
                          </span>{" "}
                          70 Discuss{" "}
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              )
          )}
        </div>
      </div>
    </LayoutSecondary>
  );
};

export default TopicPage;
