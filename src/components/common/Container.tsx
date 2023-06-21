import React from 'react';

const Container: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="flex flex-row flex-wrap justify-between w-full h-full px-5 mx-auto md:px-10">{children}</div>;
};

export default Container;
