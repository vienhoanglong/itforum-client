import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../../components/button";
import UploadProgress from "./UploadProgress";
import logoUpload from "/src/assets/upload-image.png";

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
    <div className="flex flex-col justify-center items-center bg-gray-100 rounded-lg">
      <div className="bg-white shadow-md rounded-md p-8 w-full">
        {selectedImage ? (
          <div className="mb-4 flex justify-center items-center w-full h-[400px]">
            <img
              src={selectedImage}
              alt="Uploaded"
              className="max-w-full max-h-full w-auto h-auto"
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
            <img srcSet={logoUpload} alt="logoUpload" className="mb-2 h-24" />
            {isDragActive ? (
              <p>Drop the image here...</p>
            ) : (
              <p>
                Drag and drop an image here, or{" "}
                <a className="underline underline-offset-2 cursor-pointer text-blue-500 hover:text-blue-700 font-bold">
                  CLICK
                </a>{" "}
                to select an image.
              </p>
            )}
          </div>
        )}
        {showDeleteButton && (
          <div className="flex justify-center">
            <Button type="submit" kind="delete" handle={handleDelete}>
              Delete
            </Button>
          </div>
        )}

        {uploading && (
          <UploadProgress uploadProgress={uploadProgress}></UploadProgress>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
