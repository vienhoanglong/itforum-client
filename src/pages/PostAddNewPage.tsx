import LayoutShared from "@/layout/LayoutDefault";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Label } from "@/components/label";
import { Button } from "@/components/button";
import { FormGroup } from "@/components/common";
import { Input } from "components/input";
import { useDropzone } from "react-dropzone";
import "react-quill/dist/quill.snow.css";
import logoUpload from "../assets/upload-image.png";
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

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];

    setUploading(true);
    setUploadProgress(0); // Reset upload progress

    const uploadInterval = setInterval(() => {
      setUploadProgress((prevProgress) => prevProgress + 10); // Increment upload progress by 10%
    }, 1000);

    setTimeout(() => {
      clearInterval(uploadInterval);
      setUploading(false);
      setUploadProgress(0); // Reset upload progress
      setShowDeleteButton(true);
      setSelectedImage(URL.createObjectURL(file)); // Set the selected image after upload completes
    }, 3000);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDelete = () => {
    setSelectedImage(null);
    setShowDeleteButton(false);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormDataPosting>({
    mode: "onSubmit",
  });

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
              <div className="flex flex-col justify-center items-center bg-gray-100 rounded-lg">
                <div className="bg-white shadow-md rounded-md p-8 w-full">
                  {selectedImage ? (
                    <div className="mb-4 flex justify-center items-center w-full h-[400px]">
                      <img
                        src={selectedImage}
                        alt="Uploaded"
                        className=" max-w-full max-h-full w-auto h-auto"
                      />
                    </div>
                  ) : (
                    <div
                      {...getRootProps()}
                      className={`flex flex-col items-center justify-center border-4 rounded-lg border-dashed py-16 px-8 mb-4 ${
                        isDragActive ? "bg-gray-200 border-blue-500" : ""
                      }`}
                    >
                      <input {...getInputProps()} accept="image/*" />
                      <img
                        srcSet={`${logoUpload}`}
                        alt="logoUpload"
                        className="mb-2 h-24"
                      />
                      {isDragActive ? (
                        <p>Drop the image here...</p>
                      ) : (
                        <p>
                          Drag and drop an image here, or{" "}
                          <a className=" underline underline-offset-2 cursor-pointer text-blue-500 hover:text-blue-700 font-bold">
                            CLICK
                          </a>{" "}
                          to select an image.
                        </p>
                      )}
                    </div>
                  )}
                  {showDeleteButton && (
                    <div className="flex justify-center">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 w-1/3 rounded"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  {uploading && (
                    <div className="bg-white shadow-md rounded-md p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-full bg-gray-200 h-2 rounded-full">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                        <p className="ml-2">{`${uploadProgress}%`}</p>
                      </div>
                      <p>Uploading...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-4 h-[600px]">
              <Label htmlFor="content" className="block font-semibold">
                Content
              </Label>
              <div className="h-full border-gray-500 rounded-lg ">
                <ReactQuill
                  className=" h-5/6 "
                  value={content}
                  onChange={handleContentChange}
                  modules={{
                    toolbar: toolbarOptions,
                  }}
                />
              </div>
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
