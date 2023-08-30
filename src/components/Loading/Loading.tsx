import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-8 h-8 border-2 border-slate-300 rounded-full animate-spin border-t-transparent"></div>
      <span className="animate-bounce text-slate-300 leading-3 font-light">
        Loading...
      </span>
    </div>
  );
};

export default Loading;
