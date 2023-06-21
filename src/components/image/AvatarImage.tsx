import React from 'react';
interface AvatarImageProps{
    name: string; 
    size: number
}
const AvatarImage: React.FC<AvatarImageProps> = ({
  name,
  size,
}) => {
  return (
    <img
      src={`https://ui-avatars.com/api/?name=${name}&background=random&color=fff&size=${size}`}
      alt="avatar"
      width={'fit-content'}
      className={`rounded-full`}
    />
  );
};

export default AvatarImage;
