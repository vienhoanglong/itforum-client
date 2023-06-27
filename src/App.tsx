import PostAddNew from "pages/PostAddNew";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
const SignInPage = lazy(() => import("@/pages/SignInPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const ChatPage = lazy(() => import("@/pages/ChatPage") )
function App() {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<HomePage></HomePage>}></Route>
                <Route path="/chat" element={<ChatPage></ChatPage>}></Route>
                <Route
                    path="/manage/add-post"
                    element={<PostAddNew></PostAddNew>}
                ></Route>
                <Route
                    path="/sign-in"
                    element={<SignInPage></SignInPage>}
                ></Route>
            </Routes>
        </Suspense>
    );
}

export default App;
