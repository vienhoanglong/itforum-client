import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import PrivateRouter from "./PrivateRoute";
const ManageNotificationPage = lazy(
  () => import("@/pages/ManageNotificationPage")
);
const ManageReportPage = lazy(() => import("@/pages/ManageReportPage"));
const ManageApprove = lazy(() => import("@/pages/ManageApprovePage"));
const ManageTopicsPage = lazy(() => import("@/pages/ManageTopicsPage"));
const ManageUser = lazy(() => import("@/pages/ManageUserPage"));
const TopicPage = lazy(() => import("@/pages/TopicPage"));
const UserPage = lazy(() => import("@/pages/UserPage"));
const DashBoardPage = lazy(() => import("@/pages/DashBoardPage"));
const TopicDetail = lazy(() => import("@/modules/topic/TopicDetail"));
const ListNotificationPage = lazy(() => import("@/pages/ListNotificationPage"));
const NotificationPage = lazy(() => import("@/pages/NotificationPage"));
const PageNotFound = lazy(() => import("@/pages/PageNotFound"));
const PostDetailPage = lazy(() => import("@/pages/PostDetailPage"));
const ManagePostsPage = lazy(() => import("@/pages/ManagePostsPage"));
const SignInPage = lazy(() => import("@/pages/SignInPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const ChatPage = lazy(() => import("@/pages/ChatPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const DiscussDetailPage = lazy(() => import("@/pages/DiscussDetailPage"));
const ManagementPage = lazy(() => import("@/pages/ManagementPage"));
const NotificationDetailPage = lazy(
  () => import("@/pages/NotificationDetailPage")
);
const ManageDiscussionPage = lazy(() => import("@/pages/ManageDiscussionPage"));
function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="*" element={<PageNotFound />}></Route>

        <Route element={<PrivateRouter authenticated={true} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/notifications" element={<NotificationPage />}></Route>
          <Route
            path="/notifications-detail"
            element={<NotificationDetailPage />}
          ></Route>
          <Route path="/user/:id" element={<UserPage />}></Route>
          <Route
            path="/managements/report"
            element={<ManageReportPage />}
          ></Route>
          <Route
            path="/managements/approve"
            element={<ManageApprove />}
          ></Route>
          <Route
            path="/managements/topics"
            element={<ManageTopicsPage />}
          ></Route>
          <Route
            path="/managements/dashboard"
            element={<DashBoardPage />}
          ></Route>
          <Route path="/managements/user" element={<ManageUser />}></Route>
          <Route
            path="/managements/notifications"
            element={<ManageNotificationPage />}
          ></Route>
          <Route
            path="/notification-list"
            element={<ListNotificationPage />}
          ></Route>
          <Route path="/post-detail" element={<PostDetailPage />}></Route>
          <Route path="/discuss-detail" element={<DiscussDetailPage />}></Route>
          <Route
            path="/managements/posts"
            element={<ManagePostsPage />}
          ></Route>
          <Route
            path="/managements/discussions"
            element={<ManageDiscussionPage />}
          ></Route>
          <Route path="/managements" element={<ManagementPage />}></Route>
          <Route path="/topics" element={<TopicPage />}></Route>
          <Route path="/topics/detail/:topicName" element={<TopicDetail />} />
          <Route path="/topics/:type" element={<TopicPage />}></Route>
          <Route path="/chat" element={<ChatPage />}></Route>
        </Route>
        <Route element={<PrivateRouter authenticated={false} />}>
          <Route path="/sign-in" element={<SignInPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
