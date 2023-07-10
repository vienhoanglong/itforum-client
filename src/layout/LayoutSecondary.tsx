import { BottomBar, Header } from "@/components/navigation";
import SideBar from "@/components/navigation/SideBar";
import { Container } from "@/components/common";
import React from "react";

interface LayoutSecondaryProps {
  children: React.ReactNode;
}

export const LayoutSecondary: React.FC<LayoutSecondaryProps> = ({
  children,
}: LayoutSecondaryProps) => {
  return (
    <React.Fragment>
      <Header />
      <main className="h-full mb-16 text-xs sm:mb-0 pt-4 overflow-y-scroll dark:bg-dark0">
        <Container justify="justify-between">
          <nav
            className="hidden mb-20 sm:flex flex-col sm:w-2/12 md:w-3/12 max-h-[700px] max-w-[180px]"
            aria-label="Primary"
          >
            <SideBar />
          </nav>
          <section
            className="z-0 flex-grow w-full sm:w-10/12 md:w-9/12 xl:w-4/5 scrollbar-hide sm:px-5"
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

export default LayoutSecondary;
