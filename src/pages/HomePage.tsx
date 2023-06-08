import LayoutShared from "layout/LayoutDashboard";
import Post from "modules/home/Post";
import React from "react"



export const HomePage: React.FC = () => {
    return (
        <LayoutShared>
            <Post></Post>
        </LayoutShared>
    );
};

export default HomePage;