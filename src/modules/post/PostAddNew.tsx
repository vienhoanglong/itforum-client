import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import QuillEditor from "@/components/editor/QuillEditor";
import { Label } from "@/components/label";
import { Button } from "@/components/button";
import { Input } from "components/input";
import "react-quill/dist/quill.snow.css";
import UploadImage from "@/components/uploadImage/UploadImage";
import Select from "react-select";
import { colorSelectTopic, colorTopic, sampleTopics } from "@/constants/global";
import { customStyles } from "@/constants/styleReactSelect";

interface FormDataPosting {
  title: string;
  hastag: string;
  content: string;
}
interface TagOption {
  label: string;
  value: string;
  color: string;
}
interface PostAddNewPageProps {
  onCancel?: () => void;
}

export const PostAddNewPage: React.FC<PostAddNewPageProps> = ({ onCancel }) => {
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  console.log(uploadComplete);
  const isDarkMode = true;
  const [content, setContent] = useState<string>("");

  const handleDeleteImg = () => {
    setUploadComplete(false);
  };
  const onSubmit = (data: FormDataPosting) => {
    console.log(data);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const { handleSubmit, control } = useForm<FormDataPosting>({
    mode: "onSubmit",
  });

  const handleImageUpload = (imageUrl: string) => {
    // handle upload image
    setUploadComplete(true);
    console.log("Image uploaded:", imageUrl);
  };

  const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);
  const tagOptions = sampleTopics.map((topic) => ({
    label: topic.name,
    value: topic.name.toLowerCase().replace(/\s+/g, "-"),
    color: `${colorSelectTopic[topic.color as keyof typeof colorTopic]}`,
  }));

  return (
    <div className=" h-full dark:text-light0 w-full overflow-auto rounded-lg mx-auto flex flex-col ">
      <div className=" pb-4 h-auto w-full">
        <h4 className="text-xl font-bold text-darker ">Add new post</h4>
      </div>
      <div className="h-auto w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col md:flex-row overflow-y-auto overflow-x-hidden h-auto"
        >
          <div className="w-full h-full md:w-1/3">
            <div className="mb-4">
              <Label htmlFor="title" className="block text-xs font-semibold">
                Title
              </Label>
              <Input
                control={control}
                name="title"
                placeholder="Title for post..."
                className=" dark:bg-dark0 border dark:border-dark2 border-gray-500 text-xs shadow-inner "
              ></Input>
            </div>
            <div className="mb-4">
              <Label htmlFor="hastag" className="block text-xs font-semibold">
                Hastag
              </Label>
              <div>
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
              </div>
            </div>
            <div className="mb-4">
              <Label
                htmlFor="uploadImage"
                className="block text-xs font-semibold"
              >
                Upload image
              </Label>
              <UploadImage
                onImageUpload={handleImageUpload}
                onDeleteImage={handleDeleteImg}
              ></UploadImage>
            </div>
          </div>

          <div className=" px-2 pb-2 w-full h-full md:w-2/3 md:h-[340px]">
            <Label htmlFor="content" className="block text-xs font-semibold">
              Content
            </Label>
            <QuillEditor
              value={content}
              onChange={handleContentChange}
            ></QuillEditor>
          </div>
        </form>
      </div>

      <div className="w-full h-auto flex flex-wrap justify-end">
        <Button
          className=" text-light0 text-xs mx-2 bg-lighter hover:bg-darker  rounded px-4 py-2 mt-2 "
          kind="primary"
          type="submit"
        >
          Add post
        </Button>
        <Button
          className=" text-light0 text-xs mx-2 rounded px-4 py-2 mt-2 bg-red3 hover:bg-red2"
          kind="custom"
          type="submit"
          handle={onCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default PostAddNewPage;
