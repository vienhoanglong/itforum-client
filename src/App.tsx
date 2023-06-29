import PostAddNewPage from "@/pages/PostAddNewPage";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ManagePostsPage from "./pages/ManagePostsPage";
const SignInPage = lazy(() => import("./pages/SignInPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route
          path="/manage/add-post"
          element={<PostAddNewPage></PostAddNewPage>}
        ></Route>
        <Route
          path="/manage"
          element={<ManagePostsPage></ManagePostsPage>}
        ></Route>
        <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
