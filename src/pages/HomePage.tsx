import LayoutDefault from "@/layout/LayoutDefault";
import Post from "@/modules/home/Post";
import React from "react";

export const HomePage: React.FC = () => {
  return (
    <LayoutDefault>
      <Post></Post>
    </LayoutDefault>
  );
};

export default HomePage;
