import React from "react";

interface UploadProgressProps {
  uploadProgress: number;
}

const UploadProgress: React.FC<UploadProgressProps> = ({ uploadProgress }) => {
  return (
    <div className="z-10 h-auto w-full  rounded-md text-xs p-2">
      <div className="flex items-center mb-2">
        <div className="w-full  h-1 rounded-full">
          <div
            className="bg-teal0 h-1 rounded-full"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
        <p className="ml-2">{`${uploadProgress}%`}</p>
      </div>
      <p>Uploading...</p>
    </div>
  );
};

export default UploadProgress;
