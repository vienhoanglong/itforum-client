import LayoutShared from "@/layout/LayoutDefault";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import QuillEditor from "@/components/editor/QuillEditor";
import { Label } from "@/components/label";
import { Button } from "@/components/button";
import { Input } from "components/input";
import "react-quill/dist/quill.snow.css";
import UploadImage from "@/modules/uploadImage/UploadImage";

interface FormDataPosting {
  title: string;
  hastag: string;
  content: string;
}

export const PostAddNew: React.FC = () => {
  const [content, setContent] = useState<string>("");

  const onSubmit = (data: FormDataPosting) => {
    console.log(data);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormDataPosting>({
    mode: "onSubmit",
  });

  const handleImageUpload = (imageUrl: string) => {
    // handle upload image
    console.log("Image uploaded:", imageUrl);
  };

  const handleImageDelete = () => {
    // handle delete image
    console.log("Image deleted");
  };

  return (
    <LayoutShared>
      <div className="container h-full mx-auto">
        <div className="p-4 text-white bg-blue-600 rounded-lg shadow-md ">
          <h1 className="text-xl font-bold ">Add new post</h1>
        </div>
        <div className=" overflow-auto h-full">
          <form onSubmit={handleSubmit(onSubmit)} className="pb-4">
            <div className="mb-4 mt-4">
              <Label htmlFor="title" className="block font-semibold">
                Title
              </Label>

              <Input control={control} name="title"></Input>
            </div>
            <div className="mb-4">
              <Label htmlFor="hastag" className="block font-semibold">
                Hastag
              </Label>
              <Input control={control} name="hastag"></Input>
            </div>
            <div className="mb-4">
              <Label htmlFor="uploadImage" className="block font-semibold">
                Upload image
              </Label>
              <UploadImage
                onImageUpload={handleImageUpload}
                onImageDelete={handleImageDelete}
              ></UploadImage>
            </div>
            <div className="mb-4 h-[600px]">
              <Label htmlFor="content" className="block font-semibold">
                Content
              </Label>
              <QuillEditor
                value={content}
                onChange={handleContentChange}
              ></QuillEditor>
            </div>
            <Button
              className=" text-white  rounded px-4 py-2 mt-10"
              kind="primary"
              type="submit"
            >
              Add post
            </Button>
          </form>
        </div>
      </div>
    </LayoutShared>
  );
};

export default PostAddNew;
