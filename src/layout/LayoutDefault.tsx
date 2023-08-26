import { BottomBar, Header } from "@/components/navigation";
import SideBar from "@/components/navigation/SideBar";
import { Container } from "@/components/common";
import React, { useEffect, useState } from "react";
import "react-tabs/style/react-tabs.css";
interface LayoutDefaultProps {
  children: React.ReactNode;
  childrenOther?: React.ReactNode;
  checkScroll?: (currentLimit: number) => void;
}

export const LayoutDefault: React.FC<LayoutDefaultProps> = ({
  children,
  childrenOther,
  checkScroll,
}: LayoutDefaultProps) => {
  const [currentLimit, setCurrentLimit] = useState<number>(0);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (!reachedEnd && scrollHeight - scrollTop === clientHeight) {
      setCurrentLimit(currentLimit + 3);
      setReachedEnd(true);
      checkScroll?.(currentLimit + 3); // Truyền giá trị tăng lên 3
    }
  };

  useEffect(() => {
    setReachedEnd(false);
  }, [currentLimit]);

  return (
    <React.Fragment>
      <Header />
      <main
        onScroll={handleScroll}
        className="h-full pt-4 mb-16 text-xs sm:mb-0 overflow-y-scroll dark:bg-dark0"
      >
        <Container>
          <nav
            className="hidden mb-20 sm:flex flex-col sm:w-2/12 md:w-3/12 max-h-[700px] max-w-[230px]"
            aria-label="Primary"
          >
            <SideBar />
          </nav>
          <section
            className="z-0 w-full h-full sm:w-10/12 md:w-6/12 scrollbar-hide sm:px-5"
            role="main"
          >
            {children}
          </section>
          <section className="flex-col hidden w-3/12 space-y-5 md:flex">
            {childrenOther}
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

export default LayoutDefault;
