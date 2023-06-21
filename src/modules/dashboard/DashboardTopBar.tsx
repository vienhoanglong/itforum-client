import React from "react";
import { Button } from "components/button";
import { Link } from "react-router-dom";
import logo from "assets/logo.png";
export const DashboardTopBar: React.FC = () => {
    return (
        <div className="flex items-center justify-between mb-5 ml-3">
            <div className="flex items-center flex-1 gap-x-10">
                <Link to="/" className="inline-block">
                    <img srcSet={`${logo} 2x`} alt="forum-it" />
                </Link>
                <div className="ml-14 w-full max-w-[458px]">
                    {/* <SharedSearch></SharedSearch> */}
                </div>
            </div>
            <div className="flex items-center justify-end flex-1 gap-x-10">
                <Link to="/manage/add-post" className="inline-block">
                    <Button className="px-7" type="button" kind="secondary">
                        New post
                    </Button>
                </Link>

                <img
                    srcSet={`${logo} 2x`}
                    alt="forum-it"
                    className="rounded-full"
                />
            </div>
        </div>
    );
};

export default DashboardTopBar;
