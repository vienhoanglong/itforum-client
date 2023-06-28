import React from "react";
interface AvatarImageProps {
  name: string;
  size: number;
  cln?: string;
}
const AvatarImage: React.FC<AvatarImageProps> = ({ name, size, cln }) => {
  return (
    <img
      src={`https://ui-avatars.com/api/?name=${name}&background=random&color=fff&size=${size}`}
      alt="avatar"
      width={"fit-content"}
      className={`${cln} rounded-full`}
    />
  );
};

export default AvatarImage;
