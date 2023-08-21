import ChatInformation from "@/modules/chat/ChatInformation";
import classNames from "@/utils/classNames";
import React from "react";
import { BiSmile } from "react-icons/bi";

export const TestPage: React.FC = () => {
  // const [showEmotion, setShowEmotion] = React.useState<string>("hidden");
  // const positionEmotion = "-left-24";
  return (
    // <div className="w-full m-auto mt-40">
    //   <div
    //     className={classNames(
    //       "message-hover",
    //       "flex w-full items-end mt-2 relative "
    //     )}
    //   >
    //     <div
    //       className={classNames(
    //         "max-w-[24.5rem] ml-1 pr-1 pl-1   rounded-xl  "
    //       )}
    //     >
    //       Nội dung nè hover đi
    //     </div>
    //     <div className={`more-hover h-full hidden self-center flexRowReverse`}>
    //       <button
    //         type="button"
    //         className={`p-0 m-0 mr-2 ml-2 text-2xl relative text-slate-400 hover:text-lcn-blue-4 hover:bg-slate-100`}
    //         onClick={() => {
    //           if (showEmotion === "hidden") {
    //             setShowEmotion("flex");
    //           } else setShowEmotion("hidden");
    //         }}
    //         // onFocus={() => setShowEmotion('flex')}
    //       >
    //         <div
    //           className={classNames(
    //             "w-[17rem] h-12 bg-white bg-opacity-80 backdrop-blur-md absolute z-[2] -top-11  rounded-full drop-shadow-md ",
    //             showEmotion,
    //             positionEmotion,
    //             "justify-around items-center border border-gray-100 pr-2 pl-2"
    //           )}
    //           onBlur={() => setShowEmotion("hidden")}
    //         >
    //           <div className="p-0 pt-2 m-0 ">
    //             <div className="relative -z-10">
    //               <span>👍</span>
    //             </div>
    //           </div>
    //           <div className="p-0 pt-2 m-0 ">
    //             <div className="relative -z-10">
    //               <span>❤</span>
    //             </div>
    //           </div>
    //           <div className="p-0 pt-2 m-0 ">
    //             <div className="relative -z-10">
    //               <span>😆</span>
    //             </div>
    //           </div>
    //           <div className="p-0 pt-2 m-0 ">
    //             <div className="relative -z-10">
    //               <span>😮</span>
    //             </div>
    //           </div>
    //           <div className="p-0 pt-2 m-0">
    //             <div className="relative -z-10">
    //               <span>😢</span>
    //             </div>
    //           </div>
    //           <div className="p-0 pt-2 m-0 ">
    //             <div className="relative -z-10">
    //               <span>😡</span>
    //             </div>
    //           </div>
    //         </div>
    //         <BiSmile />
    //       </button>
    //       <button
    //         type="button"
    //         className={classNames(
    //           "p-0 m-0 text-2xl mr-2 ml-2 text-slate-400 hover:text-lcn-blue-4 hover:bg-slate-100"
    //         )}
    //       ></button>

    //       {/* <Dropdown render={handleLoadMenu} visible={showMenu} hidden={handleHiddenMenu}>
    //                     <div>
    //                         <Button
    //                             type="button"
    //                             className={cx(
    //                                 'p-0 m-0 text-xl mr-2 ml-2 text-slate-400 hover:text-lcn-blue-4 hover:bg-slate-100',
    //                             )}
    //                             onClick={handleShowMenu}
    //                         >
    //                             <FiMoreVertical />
    //                         </Button>
    //                     </div>
    //                 </Dropdown> */}
    //     </div>
    //   </div>
    // </div>
    <ChatInformation></ChatInformation>
  );
};

export default TestPage;
