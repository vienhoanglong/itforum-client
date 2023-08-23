import { notifications, posts } from "@/constants/global";
import LayoutDefault from "@/layout/LayoutDefault";
import { Discuss } from "@/modules/home/Discuss";
import { Notification } from "@/modules/home/Notification";
import { Posts } from "@/modules/home/Posts";
import { useDiscussionStore } from "@/store/discussionStore";
import { useUserStore } from "@/store/userStore";
import React, { useMemo, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export const HomePage: React.FC = () => {
  const { listDiscussByStatus, getDiscussByStatus } = useDiscussionStore();
  const [sort, setSort] = useState<string>("desc");
  const [filter, setFilter] = useState<string>("");
  const { listUser, getListUser } = useUserStore();
  const [currentLimit, setCurrentLimit] = useState<number>(0);
  const [currentListUser, setCurrentListUser] = useState<string[]>([]);

  useMemo(() => {
    getDiscussByStatus(1, false, 0, currentLimit, sort, filter);
  }, [getDiscussByStatus, currentLimit, sort, filter]);

  useMemo(() => {
    const lisCurrentUser = listDiscussByStatus?.map((user) => user.createBy);
    lisCurrentUser && setCurrentListUser(lisCurrentUser ? lisCurrentUser : []);
  }, [listDiscussByStatus]);

  useMemo(() => {
    if (currentListUser.length > 0) {
      getListUser(currentListUser);
    }
  }, [currentListUser, getListUser]);

  const handleScroll = (curr: number) => {
    setCurrentLimit(currentLimit + curr);
  };

  const hanldeFilter = (filterOptions: { sort: string; topic: string }) => {
    setSort(filterOptions.sort);
    setFilter(filterOptions.topic);
  };

  return (
    <LayoutDefault
      checkScroll={handleScroll}
      childrenOther={<Notification notifications={notifications} />}
    >
      <Tabs>
        <TabList>
          <Tab className="relative py-2 px-4 mr-1 bg-light2 dark:bg-dark1/20 dark:text-white rounded-t-lg">
            Discuss
            <div className="absolute inset-0 bg-transparent"></div>
          </Tab>
          <Tab className="relative py-2 px-4 bg-light2 dark:bg-dark1/20 dark:text-white rounded-t-lg">
            Posts
            <div className="absolute inset-0 bg-transparent"></div>
          </Tab>
        </TabList>
        <TabPanel>
          <Discuss
            currentUser={listUser && listUser}
            discuss={listDiscussByStatus}
            hanldeFilter={hanldeFilter}
          ></Discuss>
        </TabPanel>
        <TabPanel>
          <Posts post={posts}></Posts>
        </TabPanel>
      </Tabs>
    </LayoutDefault>
  );
};

export default HomePage;
