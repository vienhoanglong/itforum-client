import LayoutSecondary from "@/layout/LayoutSecondary";
import StackedBarChart from "@/lib/chart/StackedBarChart";
import PieChart from "@/lib/chart/PieChart";
import React from "react";
const DashBoardPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<string>("dashboard");
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <LayoutSecondary>
      <div className="mx-auto -mt-4">
        <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
          <ul className="flex flex-wrap gap-2 -mb-px" role="tablist">
            <li className="" role="presentation">
              <button
                className={`inline-block text-dark2 hover:text-darker hover:scale-105 hover:border-darker rounded-t-lg py-4 px-4 text-sm font-medium text-center border-b-2 dark:text-light0 dark:hover:text-light0 ${
                  activeTab === "dashboard" ? "border-darker text-darker" : ""
                }`}
                type="button"
                role="tab"
                onClick={() => handleTabClick("dashboard")}
              >
                Dashboard
              </button>
            </li>
            <li className="" role="presentation">
              <button
                className={`inline-block text-dark2 hover:text-darker hover:scale-105 hover:border-darker rounded-t-lg py-4 px-4 text-sm font-medium text-center border-b-2 dark:text-light0 dark:hover:text-light0 ${
                  activeTab === "users" ? "border-darker text-darker" : ""
                }`}
                type="button"
                role="tab"
                onClick={() => handleTabClick("users")}
              >
                Users
              </button>
            </li>
            <li className="" role="presentation">
              <button
                className={`inline-block text-dark2 hover:text-darker hover:scale-105 hover:border-darker rounded-t-lg py-4 px-4 text-sm font-medium text-center border-b-2 dark:text-light0 dark:hover:text-light0 ${
                  activeTab === "posts" ? "border-darker text-darker" : ""
                }`}
                type="button"
                role="tab"
                onClick={() => handleTabClick("posts")}
              >
                Posts
              </button>
            </li>
            <li className="" role="presentation">
              <button
                className={`inline-block text-dark2 hover:text-darker hover:scale-105 hover:border-darker rounded-t-lg py-4 px-4 text-sm font-medium text-center border-b-2 dark:text-light0 dark:hover:text-light0 ${
                  activeTab === "discussion" ? "border-darker text-darker" : ""
                }`}
                type="button"
                role="tab"
                onClick={() => handleTabClick("discussion")}
              >
                Discussion
              </button>
            </li>
            <li className="" role="presentation">
              <button
                className={`inline-block text-dark2 hover:text-darker hover:scale-105 hover:border-darker rounded-t-lg py-4 px-4 text-sm font-medium text-center border-b-2 dark:text-light0 dark:hover:text-light0 ${
                  activeTab === "topics" ? "border-darker text-darker" : ""
                }`}
                type="button"
                role="tab"
                onClick={() => handleTabClick("topics")}
              >
                Topics
              </button>
            </li>
            <li className="" role="presentation">
              <button
                className={`inline-block text-dark2 hover:text-darker hover:scale-105 hover:border-darker rounded-t-lg py-4 px-4 text-sm font-medium text-center border-b-2 dark:text-light0 dark:hover:text-light0 ${
                  activeTab === "reports" ? "border-darker text-darker" : ""
                }`}
                type="button"
                role="tab"
                onClick={() => handleTabClick("reports")}
              >
                Reports
              </button>
            </li>
          </ul>
        </div>
        <div> 
          {activeTab === "dashboard" && 
            <div
              className="bg-gray-50 rounded-lg dark:bg-gray-800"
              role="tabpanel"
            >  
              <div className="flex flex-row justify-start gap-3 mb-4 w-full lg:w-1/3">
                <div className="flex-1 rounded-lg text-center p-3 bg-gradient-to-bl text-light1 from-blue-400 to-emerald-400">
                  <span className="text-sm">Bài viết</span>
                  <p>100</p>
                </div>
                <div className="flex-1 rounded-lg text-center p-3 text-light1 bg-gradient-to-bl from-orange-300 to-rose-300">
                  <span className="text-sm">Người dùng</span>
                  <p>10213</p>
                </div>
                <div className="flex-1 rounded-lg text-center p-3 text-light1 bg-gradient-to-bl from-pink-300 via-purple-300 to-indigo-400">
                  <span className="text-sm">Thảo luận</span>
                  <p>10213</p>
                </div>
              </div>
              <div className="flex flex-row gap-4">
                  <div className="w-1/3 bg-slate-100  h-80">
                      <PieChart/>
                  </div>
                  <div className="w-full h-80 bg-slate-100">
                      <StackedBarChart/>
                  </div>
              </div>
            </div>}
        </div>
      </div>
    </LayoutSecondary>
  );
};

export default DashBoardPage;
