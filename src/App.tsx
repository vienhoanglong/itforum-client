import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const PrivateRouter = lazy(() => import("@/PrivateRoute"));
import DashBoardPage from "@/pages/DashBoardPage";
import DiscussDetailPage from "@/pages/DiscussDetailPage";
import ManageDiscussionPage from "@/pages/ManageDiscussionPage";
import NotificationDetailPage from "@/pages/NotificationDetailPage";
import PostDetailPage from "@/pages/PostDetailPage";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import ListNotificationPage from "./pages/ListNotificationPage";
import ManageApprove from "./pages/ManageApprovePage";
import ManageNotificationPage from "./pages/ManageNotificationPage";
import ManagePostsPage from "./pages/ManagePostsPage";
import ManageReportPage from "./pages/ManageReportPage";
import ManageTopicsPage from "./pages/ManageTopicsPage";
import ManageUser from "./pages/ManageUserPage";
import ManagementPage from "./pages/ManagementPage";
import NotificationPage from "./pages/NotificationPage";
import PageNotFound from "./pages/PageNotFound";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";
import TestPage from "./pages/TestPage";
import TopicPage from "./pages/TopicPage";
import UserPage from "./pages/UserPage";
import Loading from "./components/Loading/Loading";
import TopicDetail from "@/modules/topic/TopicDetail";
// import TestPage from "./pages/TestPage";
// import Loading from "./components/Loading/Loading";
// const ManageNotificationPage = lazy(
//   () => import("@/pages/ManageNotificationPage")
// );
// const ReviewPostPage = lazy(() => import("@/pages/ReviewPostPage"));
// const ManageReportPage = lazy(() => import("@/pages/ManageReportPage"));
// const ManageApprove = lazy(() => import("@/pages/ManageApprovePage"));
// const ManageTopicsPage = lazy(() => import("@/pages/ManageTopicsPage"));
// const ManageUser = lazy(() => import("@/pages/ManageUserPage"));
// const TopicPage = lazy(() => import("@/pages/TopicPage"));
// const UserPage = lazy(() => import("@/pages/UserPage"));
// const DashBoardPage = lazy(() => import("@/pages/DashBoardPage"));
// const TopicDetail = lazy(() => import("@/modules/topic/TopicDetail"));
// const ListNotificationPage = lazy(() => import("@/pages/ListNotificationPage"));
// const NotificationPage = lazy(() => import("@/pages/NotificationPage"));
// const PageNotFound = lazy(() => import("@/pages/PageNotFound"));
// const PostDetailPage = lazy(() => import("@/pages/PostDetailPage"));
// const ManagePostsPage = lazy(() => import("@/pages/ManagePostsPage"));
// const SignInPage = lazy(() => import("@/pages/SignInPage"));
// const HomePage = lazy(() => import("@/pages/HomePage"));
// const ChatPage = lazy(() => import("@/pages/ChatPage"));
// const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
// const DiscussDetailPage = lazy(() => import("@/pages/DiscussDetailPage"));
// const ManagementPage = lazy(() => import("@/pages/ManagementPage"));
// const NotificationDetailPage = lazy(
//   () => import("@/pages/NotificationDetailPage")
// );
// const ManageDiscussionPage = lazy(() => import("@/pages/ManageDiscussionPage"));
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route element={<PrivateRouter authenticated={true} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route
            path="/notifications-detail/:notificationId"
            element={<NotificationDetailPage />}
          />
          <Route path="/user/:userId" element={<UserPage />} />
          <Route path="/managements/report" element={<ManageReportPage />} />
          <Route path="/managements/approve" element={<ManageApprove />} />
          <Route path="/managements/topics" element={<ManageTopicsPage />} />
          <Route path="/managements/dashboard" element={<DashBoardPage />} />
          <Route path="/managements/user" element={<ManageUser />} />
          <Route
            path="/managements/notifications/:userId"
            element={<ManageNotificationPage />}
          />
          <Route
            path="/notification/:type"
            element={<ListNotificationPage />}
          />
          <Route path="/post/:postId" element={<PostDetailPage />} />
          <Route path="/discuss/:discussId" element={<DiscussDetailPage />} />
          <Route
            path="/managements/posts/:userId"
            element={<ManagePostsPage />}
          />
          <Route
            path="/managements/discussions/:userId"
            element={<ManageDiscussionPage />}
          />
          <Route path="/managements" element={<ManagementPage />} />
          <Route path="/topics" element={<TopicPage />} />
          <Route path="/topics/detail/:topicId" element={<TopicDetail />} />
          <Route path="/topics/:type" element={<TopicPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/:id" element={<ChatPage />} />
          <Route path="/test" element={<TestPage />} />
        </Route>
        <Route element={<PrivateRouter authenticated={false} />}>
          <Route path="/sign-in" element={<SignInPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
