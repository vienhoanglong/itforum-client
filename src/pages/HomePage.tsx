import LayoutDefault from "@/layout/LayoutDefault";
import { Discuss } from "@/modules/home/Discuss";
import FeaturedArticle from "@/modules/home/FeaturedArticle";
import FiltersBox from "@/modules/home/FiltersBox";
import React from "react";

export const HomePage: React.FC = () => {
  return (
    <LayoutDefault childrenOther={<FeaturedArticle></FeaturedArticle>}>
      <FiltersBox></FiltersBox>
      <Discuss></Discuss>
      <Discuss></Discuss>
      <Discuss></Discuss>
      <Discuss></Discuss>
    </LayoutDefault>
  );
};

export default HomePage;
