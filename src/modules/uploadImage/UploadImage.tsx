import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../../components/button";
import UploadProgress from "./UploadProgress";
import logoUpload from "/src/assets/upload-image.png";
import { HiTrash } from "react-icons/hi";

interface UploadImageProps {
  onImageUpload: (imageUrl: string) => void;
  onImageDelete: () => void;
  initialImageUrl?: string;
}

const UploadImage: React.FC<UploadImageProps> = ({
  onImageUpload,
  onImageDelete,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previousImageUrl, setPreviousImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (selectedImage !== previousImageUrl) {
      if (previousImageUrl) {
        URL.revokeObjectURL(previousImageUrl);
      }
      setPreviousImageUrl(selectedImage);
    }
  }, [selectedImage, previousImageUrl]);

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
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl); // Set the selected image after upload completes
      onImageUpload(imageUrl);
    }, 3000);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDelete = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }
    setSelectedImage(null);
    setShowDeleteButton(false);
    onImageDelete();
  };

  return (
    <div className="flex flex-col justify-center h-full w-auto items-center rounded-lg">
      <div className="bg-white dark:bg-dark2 rounded-md p-2 w-full h-[180px]">
        {selectedImage ? (
          <div className="mb-4 flex justify-center items-center w-auto h-full relative">
            <img
              src={selectedImage}
              alt="Uploaded"
              className="max-w-full max-h-full w-auto h-auto"
            />
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              onClick={handleDelete}
            >
              <HiTrash size={15}></HiTrash>
            </button>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={`flex flex-col h-full w-full items-center justify-center border-2 dark:border-dark1 rounded-lg border-dashed py-16 px-8 mb-4 ${
              isDragActive
                ? "bg-gray-200 border-blue-500 dark:bg-dark0 dark:border-dark3 w-full h-full"
                : ""
            }`}
          >
            <input {...getInputProps()} accept="image/*" />
            <img srcSet={logoUpload} alt="logoUpload" className="mb-2 h-14" />
            {isDragActive ? (
              <p className="text-xs">Drop the image here...</p>
            ) : (
              <p className="text-xs">
                Drag and drop an image here, or{" "}
                <a className="underline underline-offset-2 cursor-pointer text-blue-500 hover:text-blue-700 font-bold">
                  CLICK
                </a>{" "}
                to select an image.
              </p>
            )}
          </div>
        )}
      </div>

      {uploading && (
        <UploadProgress uploadProgress={uploadProgress}></UploadProgress>
      )}
    </div>
  );
};

export default UploadImage;
