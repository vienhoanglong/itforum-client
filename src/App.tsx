import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const ManagePostsPage = lazy(() => import("./pages/ManagePostsPage"));
const PostAddNewPage = lazy(() => import("./pages/PostAddNewPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ChatPage = lazy(() => import("@/pages/ChatPage"));
function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route
          path="/manage/add-post"
          element={<PostAddNewPage></PostAddNewPage>}
        ></Route>
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
