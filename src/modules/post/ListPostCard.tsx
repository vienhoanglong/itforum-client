import React from "react";

interface PostCard {
  title: string;
  img: string;
}
interface ListPostCardProps {
  posts: PostCard[];
}

const ListPostCard: React.FC<ListPostCardProps> = ({ posts }) => {
  return (
    <div className="w-full h-full  dark:bg-dark0 rounded-lg flex pt-4 flex-col space-y-2">
      <div className=" flex justify-between items-center mb-2">
        <span className="font-bold text-sm text-darker">Related posts</span>
        <a
          className=" dark:text-light0 px-4 rounded-full link inline-flex items-center text-sm !text-grey-600 underline font-medium bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark0"
          href="/"
        >
          More
        </a>
      </div>
      {posts.map((post, index) => (
        <div
          key={index}
          className="flex hover:cursor-pointer hover:text-darker bg-light4 dark:bg-dark1 shadow hover:shadow-md p-2 rounded-lg transform transition-all duration-100 "
        >
          <div className="w-1/2 rounded-lg">
            <img
              src={post.img}
              className="w-full rounded-xl max-w-full max-h-[300px] object-cover"
            ></img>
          </div>
          <div className="w-1/2 ml-2">
            <span className="text-sm font-medium dark:text-light0">
              {post.title}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListPostCard;
