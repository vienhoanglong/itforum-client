import { BottomBar, Header } from "@/components/navigation";
import SideBar from "@/components/navigation/SideBar";
import { Container } from "@/components/common";
import React, { useEffect, useState } from "react";
import ListPostCard from "@/modules/post/ListPostCard";
import { posts } from "@/constants/global";

interface LayoutPostDetailProps {
  children: React.ReactNode;
}

export const LayoutPostDetail: React.FC<LayoutPostDetailProps> = ({
  children,
}: LayoutPostDetailProps) => {
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
            className="z-0 w-full flex-grow h-full sm:w-10/12 md:w-6/12 scrollbar-hide sm:px-4"
            role="main"
          >
            {children}
          </section>

          <section className="flex-col hidden w-3/12 space-y-5 lg:flex">
            {/* <div className="w-full h-full  dark:bg-dark0 rounded-lg flex pt-4 flex-col space-y-2">
              <div className=" flex justify-between items-center mb-2">
                <span className="font-bold text-sm text-darker">Related posts</span>
                <a
                  className=" dark:text-light0 px-4 rounded-full link inline-flex items-center text-sm !text-grey-600 underline font-medium bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0"
                  href="/"
                >
                  More
                </a>
              </div>


              <div className="flex hover:cursor-pointer bg-light4 dark:bg-dark1 shadow hover:shadow-lg p-2 rounded-lg transform transition-all duration-100 hover:scale-105">
                <div className="w-1/2 rounded-lg">
                  <img src='https://photo2.tinhte.vn/data/attachment-files/2023/07/6487116_CompressionExplainer-byKristinaArmitage-Lede-scaled.jpg' className="w-full rounded-xl max-w-full max-h-[300px] object-cover" ></img>
                </div>
                <div className="w-1/2 ml-2"><span className="text-sm font-medium dark:text-light0" >Việc nén dữ liệu đã thúc đẩy mạng Internet như thế nào?</span></div>
              </div>

              <div className="flex hover:cursor-pointer bg-light4 dark:bg-dark1 shadow hover:shadow-lg p-2 rounded-lg transform transition-all duration-100 hover:scale-105">
                <div className="w-1/2 rounded-lg">
                  <img src='https://photo2.tinhte.vn/data/attachment-files/2023/07/6487116_CompressionExplainer-byKristinaArmitage-Lede-scaled.jpg' className="w-full rounded-xl max-w-full max-h-[300px] object-cover" ></img>
                </div>
                <div className="w-1/2 ml-2"><span className="text-sm font-medium dark:text-light0" >Việc nén dữ liệu đã thúc đẩy mạng Internet như thế nào?</span></div>
              </div>


              <div className="flex hover:cursor-pointer bg-light4 dark:bg-dark1 shadow hover:shadow-lg p-2 rounded-lg transform transition-all duration-100 hover:scale-105">
                <div className="w-1/2 rounded-lg">
                  <img src='https://photo2.tinhte.vn/data/attachment-files/2023/07/6487116_CompressionExplainer-byKristinaArmitage-Lede-scaled.jpg' className="w-full rounded-xl max-w-full max-h-[300px] object-cover" ></img>
                </div>
                <div className="w-1/2 ml-2"><span className="text-sm font-medium dark:text-light0" >Việc nén dữ liệu đã thúc đẩy mạng Internet như thế nào?</span></div>
              </div>

              <div className="flex hover:cursor-pointer bg-light4 dark:bg-dark1 shadow hover:shadow-lg p-2 rounded-lg transform transition-all duration-100 hover:scale-105">
                <div className="w-1/2 rounded-lg">
                  <img src='https://photo2.tinhte.vn/data/attachment-files/2023/07/6487116_CompressionExplainer-byKristinaArmitage-Lede-scaled.jpg' className="w-full rounded-xl max-w-full max-h-[300px] object-cover" ></img>
                </div>
                <div className="w-1/2 ml-2"><span className="text-sm font-medium dark:text-light0" >Việc nén dữ liệu đã thúc đẩy mạng Internet như thế nào?</span></div>
              </div>

              
            </div> */}
            <ListPostCard posts={posts}></ListPostCard>
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

export default LayoutPostDetail;
