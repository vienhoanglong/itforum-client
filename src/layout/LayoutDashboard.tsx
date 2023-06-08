import { Overlay } from "components/common";
import DashboardSideBar from "modules/dashboard/DashboardSideBar";
import DashboardTopBar from "modules/dashboard/DashboardTopBar";
import React from "react"

interface LayoutDashboardProps {
    children: React.ReactNode;
}

export const LayoutDashboard: React.FC<LayoutDashboardProps> = ({children}: LayoutDashboardProps) => {
    return (
        <div className="min-h-screen p-2 bg-lite">
          <Overlay></Overlay>
          <DashboardTopBar></DashboardTopBar>
          <div className="flex items-start gap-x-10">
            <DashboardSideBar></DashboardSideBar>
            <div className="flex-1">{children}</div>
          </div>
        </div>
      )
};

export default LayoutDashboard;