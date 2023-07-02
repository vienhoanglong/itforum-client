import React from "react";
import { NavLink } from "react-router-dom";
import { IconChat, IconHome, IconLogout, IconProfile } from "components/icons";

interface SidebarLink {
    icon: JSX.Element;
    title: string;
    url: string;
    text: string;
    onClick?: () => void;
}

const sidebarLinks: SidebarLink[] = [
    {
        icon: <IconHome />,
        title: "Home",
        url: "/",
        text: "Home",
    },
    {
        icon: <IconProfile />,
        title: "Profile",
        url: "/profile",
        text: "Profile",
    },
    {
        icon: <IconChat />,
        title: "Chat",
        url: "/chat",
        text: "Chat",
    },
    {
        icon: <IconLogout />,
        title: "Logout",
        url: "/logout",
        text: "Logout",
    },
];

const DashboardSideBar: React.FC = () => {
    const navlinkClass =
        "flex items-center gap-x-5 md:w-12 md:h-12 md:justify-center md:rounded-lg md:mb-8 last:mt-auto last:bg-white last:shadow-sdprimary sidebar-icon group";

    return (
        <div className="w-full md:w-[76px] rounded-3xl bg-white shadow-[10px_10px_20px_rgba(218,_213,_213,_0.15)] px-[14px] py-10 flex flex-col flex-shrink-0">
            {sidebarLinks.map((link) => (
                <NavLink
                    to={link.url}
                    key={link.title}
                    className={({ isActive }) =>
                        isActive
                            ? `${navlinkClass} text-primary bg-primary bg-opacity-20`
                            : `${navlinkClass} text-icon-color`
                    }
                >
                    <span>{link.icon}</span>
                    <span className="sidebar-tooltip group-hover:scale-100">
                        {link.text}
                    </span>
                </NavLink>
            ))}
        </div>
    );
};

export default DashboardSideBar;
