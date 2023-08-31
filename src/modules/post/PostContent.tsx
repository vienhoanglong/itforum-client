import React from "react";
import parse from "html-react-parser";
type ContentProps = {
  content: string;
};

const PostContent: React.FC<ContentProps> = ({ content }) => {
  return (
    <div className="content">
      <div className="mt-7 text-xs">
        <div className="ql-snow">
          <div className="ql-editor">{parse(content)}</div>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
