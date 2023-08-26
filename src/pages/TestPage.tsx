import React from "react";
import avt from 'assets/avt1.jpg'
import file from 'assets/IconDocumentTopic/doc.png'
export const TestPage: React.FC = () => {
  return (
    <><div className={`text-xs flex gap-2 ml-auto p-2 md:p-2 colorBackground animate-fadeIn max-w-[60%] `}>
      <img src={avt} alt="" className="max-w-[200px] max-h-[200px] rounded-xl object-cover brightness-95" />
    </div><div className={`text-xs flex gap-2 ml-auto p-2 md:p-2 colorBackground animate-fadeIn max-w-[60%] `}>
        <a className="flex flex-row items-center gap-1 cursor-pointer hover:bg-blue-300 p-2 rounded-xl" target="_black" download={avt} href="https://www.gravatar.com/avatar/281c2df7dbce9284dca6059db944f8df?s=48&d=identicon&r=PG">
          <img src={file} alt="" className="w-6 h-auto object-cover"/>
          <span>Huongdansudung.docx</span>
        </a>
      </div></>
  );
};

export default TestPage;
