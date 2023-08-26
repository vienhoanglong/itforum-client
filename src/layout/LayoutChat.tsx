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
      <main className="h-full text-xs pt-4 dark:bg-dark0">
        <Container justify="justify-between">
          <nav
            className="hidden mb-20 sm:flex flex-col sm:w-2/12 md:w-3/12 max-h-[700px] max-w-[200px]"
            aria-label="Primary"
          >
            <SideBar />
          </nav>
          <section
            className="z-0 flex-grow w-full xl:w-4/5 scrollbar-hide sm:px-5 rounded-lg"
            role="main"
          >
            {children}
          </section>
          {/* SHOWED ONLY ON SMALL DEVICE */}
          <section
            className="fixed bottom-0 left-0 right-0 z-10 w-full bg-white dark:bg-dark0 sm:hidden"
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
