import { BottomBar, Header } from "@/components/navigation";
import SideBar from "@/components/navigation/SideBar";
import { Container } from "@/components/common";
import React from "react";
import ListPostCard from "@/modules/post/ListPostCard";
import { posts } from "@/constants/global";

interface LayoutDetailProps {
  children: React.ReactNode;
  otherChildren?: React.ReactNode;
}

export const LayoutDetail: React.FC<LayoutDetailProps> = ({
  children,
  otherChildren,
}: LayoutDetailProps) => {
  return (
    <React.Fragment>
      <Header />
      <main className="h-full mb-16 text-xs sm:mb-0 pt-4 overflow-y-scroll dark:bg-dark0">
        <Container>
          <nav
            className=" hidden mb-20 sm:flex flex-col sm:w-2/12 md:w-3/12 max-h-[700px] max-w-[180px]"
            aria-label="Primary"
          >
            <SideBar />
          </nav>

          <section
            className="z-10 w-full flex-grow h-full sm:w-10/12 md:w-6/12 scrollbar-hide sm:px-4"
            role="main"
          >
            {children}
          </section>

          <section className="flex-col hidden w-3/12 space-y-5 lg:flex">
            {otherChildren}
          </section>

          {/* SHOWED ONLY ON SMALL DEVICE */}
          <section
            className="fixed bottom-0 left-0 right-0 z-10 w-full bg-white dark:bg-bg-dark sm:hidden"
            role="navigation"
            aria-label="Secondary"
          >
            <BottomBar />
          </section>
        </Container>
      </main>
    </React.Fragment>
  );
};

export default LayoutDetail;
