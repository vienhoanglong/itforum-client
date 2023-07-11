import React from "react";

const Container: React.FC<{ children: React.ReactNode; justify?: string }> = ({
  children,
  justify,
}) => {
  return (
    <div
      className={`flex flex-row flex-nowrap w-full h-full px-5 mx-auto md:px-10 gap-2 ${
        justify ? justify : "justify-between"
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
