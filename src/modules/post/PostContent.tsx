import React from "react";

type ContentProps = {
  content: string;
};

const PostContent: React.FC<ContentProps> = ({ content }) => {
  return (
    <div className="content">
      <div className="mt-7 text-xs">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default PostContent;
