import { discuss, posts } from "@/constants/global";
import LayoutDefault from "@/layout/LayoutDefault";
import { Discuss } from "@/modules/home/Discuss";
import FeaturedArticle from "@/modules/home/FeaturedArticle";
import { Posts } from "@/modules/home/Posts";
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export const HomePage: React.FC = () => {
  return (
    <LayoutDefault childrenOther={<FeaturedArticle></FeaturedArticle>}>
      <Tabs>
        <TabList>
          <Tab className="relative py-2 px-4 mr-1 bg-light2 dark:bg-dark1 dark:text-white rounded-t-lg">
            Discuss
            <div className="absolute inset-0 bg-transparent"></div>
          </Tab>
          <Tab className="relative py-2 px-4 bg-light2 dark:bg-dark1 dark:text-white rounded-t-lg">
            Posts
            <div className="absolute inset-0 bg-transparent"></div>
          </Tab>
        </TabList>
        <TabPanel>
          <Discuss discuss={discuss}></Discuss>
        </TabPanel>
        <TabPanel>
          <Posts post={posts}></Posts>
        </TabPanel>
      </Tabs>
    </LayoutDefault>
  );
};

export default HomePage;
