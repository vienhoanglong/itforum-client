import { Button } from "@/components/button";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { colorSelectTopic } from "@/constants/global";
import { useUserStore } from "@/store/userStore";
import { useTopicStore } from "@/store/topicStore";
import IDiscussionCreate from "@/interface/API/IDiscussionCreate";
import "react-toastify/dist/ReactToastify.css";
import Topic from "@/interface/topic";
interface AddNewDiscussionProps {
  onSaveChanges: (dataDiscuss: IDiscussionCreate) => void;
}
export const AddNewDiscussion: React.FC<AddNewDiscussionProps> = ({
  onSaveChanges,
}) => {
  const [dataDisussion, setDataDiscussion] = useState<IDiscussionCreate | null>(
    null
  );
  const { user } = useUserStore();
  const { listAllTopic, getTopic } = useTopicStore();
  const [isTopicistEmpty, setIsTopicistEmpty] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState<string | null>(null);
  const [topicError, setTopicError] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);

  useEffect(() => {
    getTopic();
  }, [getTopic]);
  const validateFields = () => {
    let isValid = true;

    if (!title) {
      setTitleError("Title cannot be empty");
      isValid = false;
    } else {
      setTitleError(null);
    }

    if (!dataDisussion || dataDisussion.topic?.length === 0) {
      setTopicError("Please select at least one topic");
      isValid = false;
    } else {
      setTopicError(null);
    }

    if (!content) {
      setContentError("Content cannot be empty");
      isValid = false;
    } else {
      setContentError(null);
    }

    return isValid;
  };
  const getSkillLabelById = (topicId: string) => {
    const topic = listAllTopic?.find((topic: Topic) => topic._id === topicId);
    return topic ? topic.name : "";
  };
  const handleTopicChange = (selectedOptions: any) => {
    const newTopic =
      selectedOptions && selectedOptions.map((option: any) => option.value);
    const updateTopic = newTopic;

    const createDiscusstion: IDiscussionCreate = {
      topic: updateTopic,
    };

    setDataDiscussion(createDiscusstion);
    setIsTopicistEmpty(updateTopic.length === 0);
  };
  const handleSaveChanges = () => {
    if (validateFields()) {
      onSaveChanges({
        topic: dataDisussion?.topic,
        createBy: user?._id,
        content: content,
        title: title,
      });
    }
  };

  const selectOptions = listAllTopic
    ?.filter((e) => e.hide === false && e.isDraft === false)
    .map((skill: Topic) => ({
      value: skill._id,
      label: skill.name,
      color: `${
        colorSelectTopic[skill.color as keyof typeof colorSelectTopic]
      }`,
    }));

  return (
    <div>
      <div className="flex justify-center mb-3">
        <span className=" dark:text-light0 text-lg  font-bold">
          New discussion
        </span>
      </div>
      <div className="sm:w-[400px] w-[200px] ">
        <div className="mb-3">
          <input
            className="w-full h-full bg-light2/80 text-sm dark:text-light0 px-4 py-2 rounded-2xl dark:bg-dark0/80"
            placeholder="Adding your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {titleError && (
          <div className="text-red-500 text-xs mt-1">{titleError}</div>
        )}

        <Select
          isMulti
          isSearchable
          placeholder="Choose topic..."
          options={selectOptions}
          value={dataDisussion?.topic?.map((skill) => ({
            value: skill,
            label: getSkillLabelById(skill),
          }))}
          onChange={handleTopicChange}
          className=" rounded-[12px] text-xs dark:bg-dark0 shadow-inner"
          noOptionsMessage={() => "No topic found..."}
          styles={{
            menu: (provided) => ({
              ...provided,
              height: "300px",
              overflowY: "auto",
            }),
          }}
        />
        {topicError && (
          <div className="text-red-500 text-xs mt-1">{topicError}</div>
        )}
        <textarea
          placeholder="Typing your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className=" w-full h-[300px]  md:h-[300px] text-dark0 dark:bg-dark0/80 bg-light2/80 dark:text-light0 text-xs p-4 rounded-md mt-2"
        ></textarea>
        {contentError && (
          <div className="text-red-500 text-xs mt-1">{contentError}</div>
        )}
        {isTopicistEmpty === true ? (
          <Button
            size="small"
            className="w-full mt-2 dark:bg-dark3 bg-dark3 text-xs text-white px-3 py-2 rounded-md"
            type="submit"
            kind="primary"
            disable
          >
            Posting
          </Button>
        ) : (
          <Button
            size="small"
            className="w-full mt-2"
            type="submit"
            kind="primary"
            handle={handleSaveChanges}
          >
            Posting
          </Button>
        )}
      </div>
    </div>
  );
};
export default AddNewDiscussion;
