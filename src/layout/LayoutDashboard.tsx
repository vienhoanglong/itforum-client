import { Header } from "@/components/navigation";
import SideBar from "@/components/navigation/SideBar";
import { Container } from "components/common";
// import DashboardSideBar from "modules/dashboard/DashboardSideBar";
import React from "react";

interface LayoutDashboardProps {
    children: React.ReactNode;
}

export const LayoutDashboard: React.FC<LayoutDashboardProps> = ({
    children,
}: LayoutDashboardProps) => {
    return (
        <React.Fragment>
            <Header />
            <main className="h-full py-8">
                <Container>
                    <nav
                        className="hidden sm:flex flex-col sm:w-2/12 md:w-3/12 h-[705px] max-w-[230px]"
                        aria-label="Primary"
                    >
                        <SideBar />
                    </nav>
                    <section
                        className="w-full  sm:w-10/12 md:w-6/12 overflow-y-scroll scrollbar-hide z-0 sm:px-5"
                        role="main"
                    >
                        {children}
                    </section>
                    <section className="flex-col hidden w-3/12 space-y-5 md:flex"></section>

                    {/* SHOWED ONLY ON SMALL DEVICE */}
                    <section
                        className="fixed bottom-0 left-0 right-0 z-10 w-full bg-white dark:bg-bg-dark sm:hidden"
                        role="navigation"
                        aria-label="Secondary"
                    ></section>
                    <div className="absolute"></div>
                </Container>
            </main>
        </React.Fragment>
    );
};

export default LayoutDashboard;
