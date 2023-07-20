import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
const NotificationDetailPage = lazy(
  () => import("./pages/NotificationDetailPage")
);
const NotificationPage = lazy(() => import("./pages/NotificationPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const PostDetailPage = lazy(() => import("./pages/PostDetailPage"));
const ManagePostsPage = lazy(() => import("./pages/ManagePostsPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ChatPage = lazy(() => import("@/pages/ChatPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const DiscussDetailPage = lazy(() => import("@/pages/DiscussDetailPage"));
function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
        <Route
          path="/notification"
          element={<NotificationPage></NotificationPage>}
        ></Route>
        <Route
          path="/notification-detail"
          element={<NotificationDetailPage></NotificationDetailPage>}
        ></Route>
        <Route
          path="/post-detail"
          element={<PostDetailPage></PostDetailPage>}
        ></Route>
        <Route
          path="/discuss-detail"
          element={<DiscussDetailPage></DiscussDetailPage>}
        ></Route>
        {/* <Route
              path="/:slug"
              element={<PostDetailsPage></PostDetailsPage>}
            ></Route> */}

        <Route
          path="/manage"
          element={<ManagePostsPage></ManagePostsPage>}
        ></Route>
        <Route path="/chat" element={<ChatPage></ChatPage>}></Route>
        <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
