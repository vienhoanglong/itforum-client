import { posts } from "@/constants/global";
import IDiscussion from "@/interface/discussion";
import LayoutDefault from "@/layout/LayoutDefault";
import { Discuss } from "@/modules/home/Discuss";
import { Notification } from "@/modules/home/Notification";
import NotificationRecruit from "@/modules/home/NotificationRecruit";
import Posts from "@/modules/home/Posts";
import { getDiscussionByStatus } from "@/services/discussionService";
import { useUserStore } from "@/store/userStore";
import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export const HomePage: React.FC = () => {
  const [sort, setSort] = useState<string>("desc");
  const [filter, setFilter] = useState<string>("");
  const { listUser, getListUser } = useUserStore();
  const [currentLimit, setCurrentLimit] = useState<number>(3);
  const [listDiscuss, setListDiscuss] = useState<IDiscussion[]>([]);
  const { user } = useUserStore();
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await getDiscussionByStatus(
        1,
        false,
        0,
        currentLimit,
        sort,
        filter
      );
      if (response) {
        const listUserIdDiscus = response.map(
          (user: IDiscussion) => user.createBy
        );
        getListUser(listUserIdDiscus);
        setListDiscuss(response);
      }
    };

    fetchData();
  }, [currentLimit, filter, getListUser, sort]);

  const handleScroll = (curr: number) => {
    setCurrentLimit(currentLimit + curr);
  };

  const handleFilter = (filterOptions: { sort: string; topic: string }) => {
    setSort(filterOptions.sort);
    setFilter(filterOptions.topic);
  };

  return (
    <LayoutDefault
      checkScroll={handleScroll}
      childrenOther={
        user?.role !== 3 ? (
          <Notification />
        ) : (
          <NotificationRecruit></NotificationRecruit>
        )
      }
    >
      <Tabs>
        <TabList>
          <Tab className=" hover:cursor-pointer relative py-2 px-4 mr-1 bg-light2 dark:bg-dark1/20 dark:text-white rounded-t-lg">
            Discuss
            <div className="absolute inset-0 bg-transparent"></div>
          </Tab>
          <Tab className="hover:cursor-pointer relative py-2 px-4 bg-light2 dark:bg-dark1/20 dark:text-white rounded-t-lg">
            Posts
            <div className="absolute inset-0 bg-transparent"></div>
          </Tab>
        </TabList>
        <TabPanel>
          <Discuss
            currentLimit={currentLimit && currentLimit}
            currentUser={listUser && listUser}
            discuss={listDiscuss}
            handleFilter={handleFilter}
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
