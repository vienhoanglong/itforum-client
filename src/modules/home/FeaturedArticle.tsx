import React from "react";

export const FeaturedArticle: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center mb-2 px-3">
        <h4 className="text-sm font-semibold dark:text-light0">Xem nhanh</h4>
        <a className="text-xs text-mainColor cursor-pointer hover:scale-105">
          Xem tất cả
        </a>
      </div>
      <div className="flex flex-col cursor-pointer border-solid border-mainColor border-[1px] border-t-0 border-r-0 rounded-bl-3xl p-3 pt-0">
        <div className="flex gap-1 relative mb-2 before:content-[''] before:w-2 before:h-2 before:rounded-full before:-left-4 before:top-[10px] before:absolute before:block before:bg-mainColor">
          <span className="break-words leading-normal text-black/90 dark:text-light0 p-1 text-xs lg:text-sm line-clamp-3 w-4/5 hover:text-mainColor">
            Sử dụng macbook để lập trình sẽ như thế nào? Lợi ích của sử dụng
            macbook
          </span>
          <img
            src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
            alt=""
            className="rounded-lg w-20 h-14 lg:w-36 lg:h-20 object-cover"
          />
        </div>
        <div className="flex gap-1 relative mb-2 before:content-[''] before:w-2 before:h-2 before:rounded-full before:-left-4 before:top-[10px] before:absolute before:block before:bg-mainColor">
          <span className="break-words leading-normal text-black/90 dark:text-light0 p-1 text-xs lg:text-sm line-clamp-3 w-4/5 hover:text-mainColor">
            Cùng nhau setup góc làm việc tại nhà cực đơn giản
          </span>
          <img
            src="https://images.unsplash.com/photo-1616400619175-5beda3a17896?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1hY2Jvb2t8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
            className="rounded-lg w-20 h-14 lg:w-36 lg:h-20 object-cover"
          />
        </div>
        <div className="flex gap-1 relative mb-2 before:content-[''] before:w-2 before:h-2 before:rounded-full before:-left-4 before:top-[10px] before:absolute before:block before:bg-mainColor">
          <span className="break-words leading-normal text-black/90 dark:text-light0 p-1 text-xs lg:text-sm line-clamp-3 w-4/5 hover:text-mainColor">
            ChatGPT và tầm nhìn của trong tương lai lập trình viên với AI
          </span>
          <img
            src="https://images.unsplash.com/photo-1677696797025-e6a40f6c714d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
            alt=""
            className="rounded-lg w-20 h-14 lg:w-36 lg:h-20 object-cover"
          />
        </div>
        <div className="flex gap-1 relative mb-2 before:content-[''] before:w-2 before:h-2 before:rounded-full before:-left-4 before:top-[10px] before:absolute before:block before:bg-mainColor">
          <span className="break-words leading-normal text-black/90 dark:text-light0 p-1 text-xs lg:text-sm line-clamp-3 w-4/5 hover:text-mainColor">
            Sử dụng macbook để lập trình sẽ như thế nào? Lợi ích của sử dụng
            macbook
          </span>
          <img
            src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
            alt=""
            className="rounded-lg w-20 h-14 lg:w-36 lg:h-20 object-cover"
          />
        </div>
        <div className="flex gap-1 relative mb-2 before:content-[''] before:w-2 before:h-2 before:rounded-full before:-left-4 before:top-[10px] before:absolute before:block before:bg-mainColor">
          <span className="break-words leading-normal text-black/90 dark:text-light0 p-1 text-xs lg:text-sm line-clamp-3 w-4/5 hover:text-mainColor">
            Sử dụng macbook để lập trình sẽ như thế nào? Lợi ích của sử dụng
            macbook
          </span>
          <img
            src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
            alt=""
            className="rounded-lg w-20 h-14 lg:w-36 lg:h-20 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;
