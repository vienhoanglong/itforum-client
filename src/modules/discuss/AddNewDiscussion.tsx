import { Button } from "@/components/button";
import { customStyles } from "@/constants/styleReactSelect";
import Select from "react-select";
import React, { useState } from "react";
import { exampleDataTopic } from "@/constants/global";

interface TagOption {
  label: string;
  value: string;
  color: string;
}
export const AddNewDiscussion: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);

  const tagOptions = exampleDataTopic.map((topic) => ({
    label: topic.name,
    value: topic.name.toLowerCase().replace(/\s+/g, "-"),
    color: topic.color,
  }));
  const isDarkMode = true;
  return (
    <div>
      <div className="flex justify-center mb-3">
        <span className=" dark:text-light0 text-lg  font-bold">
          New discussion
        </span>
      </div>
      <form>
        <div className="mb-3">
          <input
            className="w-full h-full bg-light2/80 text-sm dark:text-light0 px-4 py-2 rounded-2xl dark:bg-dark0/80"
            placeholder="Adding your title"
          />
        </div>
        <Select
          isMulti
          options={tagOptions}
          value={selectedTags}
          placeholder="Choose topics..."
          onChange={(selectedOptions) =>
            setSelectedTags(selectedOptions as TagOption[])
          }
          styles={customStyles(isDarkMode)}
          className=" rounded-[12px] text-xs dark:bg-dark0 shadow-inner"
        />

        <textarea
          placeholder="Typing your content here..."
          className=" w-[290px] h-[300px] md:w-[500px] md:h-[300px] text-dark0 dark:bg-dark0/80 bg-light2/80 dark:text-light0 text-xs p-4 rounded-md mt-2"
        ></textarea>

        <Button
          size="small"
          className="w-full mt-2"
          type="submit"
          kind="primary"
        >
          Posting
        </Button>
      </form>
    </div>
  );
};
export default AddNewDiscussion;
