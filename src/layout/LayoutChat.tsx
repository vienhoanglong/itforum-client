import { BottomBar, Header } from "@/components/navigation";
import SideBar from "@/components/navigation/SideBar";
import { Container } from "@/components/common";
import React from "react";

interface LayoutChatProps {
    children: React.ReactNode;
}

export const LayoutChat: React.FC<LayoutChatProps> = ({
    children,
}: LayoutChatProps) => {
    return (
        <React.Fragment>
            <Header />
            <main className="h-full pt-8 mb-20 overflow-y-scroll sm:overflow-hidden sm:mb-4">
                <Container justify="justify-normal">
                    <nav
                        className="hidden sm:flex flex-col sm:w-2/12 md:w-3/12 max-h-[700px] max-w-[230px]"
                        aria-label="Primary"
                    >
                        <SideBar />
                    </nav>
                    <section
                        className="z-0 w-full sm:w-10/12 md:w-3/4 xl:w-4/5 max-xl:w-auto scrollbar-hide sm:px-5"
                        role="main"
                    >
                    {children}
                    </section>
                    {/* SHOWED ONLY ON SMALL DEVICE */}
                    <section
                        className="fixed bottom-0 left-0 right-0 z-10 w-full bg-white dark:bg-bg-dark sm:hidden"
                        role="navigation"
                        aria-label="Secondary"
                    >
                    <BottomBar />
                    </section>
                    <div className="absolute"></div>
                </Container>
            </main>
        </React.Fragment>
    );
};

export default LayoutChat;
