import LayoutShared from "@/layout/LayoutDefault";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

export const PostAddNew: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const [content, setContent] = useState("");
  const onSubmit = (data: any) => {
    console.log(data);
  };
  const handleContentChange = (value: any) => {
    setContent(value);
  };
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
    ["clean"],
  ];

  return (
    <LayoutShared>
      <div className="container h-auto mx-auto">
        <div className="top-0 z-10 p-4 text-white bg-blue-600 rounded-lg shadow-md ">
          <h1 className="text-2xl font-bold ">Add new post</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4 mb-4">
              <label
                htmlFor="title"
                className="block mb-1 text-base font-semibold"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                {...register("title")}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="hastag"
                className="block mb-1 text-base font-semibold"
              >
                Hastag
              </label>
              <input
                type="text"
                id="hastag"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                {...register("hastag")}
              />
            </div>
            <div className=" h-80">
              <label
                htmlFor="content"
                className="block mb-1 text-base font-semibold"
              >
                Content
              </label>
              <div className="overflow-auto">
                <ReactQuill
                  className="w-full mb-4 border-gray-300"
                  value={content}
                  onChange={handleContentChange}
                  modules={{
                    toolbar: toolbarOptions,
                  }}
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded"
              >
                Add post
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutShared>
  );
};

export default PostAddNew;
