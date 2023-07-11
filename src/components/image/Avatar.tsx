import React from "react";
interface AvatarProps {
  cln?: string;
  src: string;
  alt?: string;
}
const Avatar: React.FC<AvatarProps> = ({ cln, src, alt }) => {
  return (
    <img
      src={src}
      alt={alt ? alt : `avatar`}
      className={`${cln} rounded-full`}
    />
  );
};

export default Avatar;
