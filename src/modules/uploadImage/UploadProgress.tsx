import React from "react";

interface UploadProgressProps {
  uploadProgress: number;
}

const UploadProgress: React.FC<UploadProgressProps> = ({ uploadProgress }) => {
  return (
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
  );
};

export default UploadProgress;
