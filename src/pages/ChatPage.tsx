import LayoutChat from "@/layout/LayoutChat";
import React from "react";
import { HiInformationCircle, HiMenu, HiOutlineSearch } from "react-icons/hi";
import { BsEmojiSmile, BsFillSendFill } from "react-icons/bs";
import { AvatarImage } from "@/components/image";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import ChatBox from "@/components/input/Chatbox";
export const ChatPage: React.FC = () => {
    const [showEmoji,setShowEmoji] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>("");
    // Add emoji
    const addEmoji = (e: { unified: string }): void => {
        const sym: string[] = e.unified.split("_");
        const codeArray: number[] = [];
        sym.forEach((el: string) => codeArray.push(parseInt('0x' + el, 16)));
        const emoji: string = String.fromCodePoint(...codeArray);
        setMessage(message + emoji);
    };
    const users = [
        { id: 1, username: 'Viên Hoàng Long' },
        { id: 2, username: 'ChatGPT' }
      ];
    return (
        <LayoutChat>
            <div className="container bg-white p-0 rounded-lg lg:max-w-960 md:max-w-720 sm:max-w-540">
                <div className="mx-0 flex flex-wrap h-[80vh]">
                    {/* Chatbox */}
                    <div className="px-0 border-solid md:w-1/3 border-[#dee2e6] border relative w-full overflow-hidden">
                        <div className="bg-[#fafafa] p-[10px_15px] rounded-md flex justify-between items-center">
                            <AvatarImage name={"vien"} size={0} cln={"w-[50px] h-[50px] rounded-[40px] border-none align-middle"}/>
                            <HiMenu className="mt-2 text-xl text-gray-500"/>
                        </div>
                        <div className="bg-[#fafafa] p-[10px_13px]">
                            <div className="flex rounded-[40px] justify-start items-center gap-2 px-2 py-1">
                                <HiOutlineSearch/>
                                <input placeholder="Search here..." type="text" className="w-full"></input>
                            </div>
                        </div>
                        {/* Chat List */}
                        <div>
                            <div className="p-[10px_15px] flex align-middle transition-all duration-300 ease">
                                <AvatarImage name={"tranhoanglong"} size={0} cln={"w-[50px] h-[50px] rounded-[40px] border-none align-middle"}/>
                                <div className="ml-3 w-[70%] max-w-xs">
                                    <h6 className="mt-1">Tran Hoang Long</h6>
                                    <p className="m-0 text-text1 text-xs break-words truncate">Cho Tran Hoang Long may dung la con cho ma hehehehehehehe heheheheheheheheheehheheheheeheheheheheheheheeh</p>
                                </div>
                                <span className="text-text2 text-sm font-normal">11:00</span>
                            </div>
                            <div className="p-[10px_15px] flex align-middle transition-all duration-300 ease">
                                <AvatarImage name={"tranhoanglong"} size={0} cln={"w-[50px] h-[50px] rounded-[40px] border-none align-middle"}/>
                                <div className="ml-3 w-[70%] max-w-xs">
                                    <h6 className="mt-1">Tran Hoang Long</h6>
                                    <p className="m-0 text-text1 text-xs break-words truncate">Cho Tran Hoang Long may dung la con cho ma hehehehehehehe heheheheheheheheheehheheheheeheheheheheheheheeh</p>
                                </div>
                                <span className="text-text2 text-sm font-normal">11:00</span>
                            </div>
                        </div>
                    </div>
                    {/* Chatcontent */}
                    <div className="px-0 relative w-full md:w-2/3 border-solid border-[#dee2e6] border flex flex-col">
                        <div className="bg-[#fafafa] p-[10px_15px] rounded-md flex justify-between items-center">
                            <div className="p-0 flex align-middle transition-all duration-300 ease mx-0 overflow-hidden">
                                <AvatarImage name={"tranhoanglong"} size={0} cln={"w-[50px] h-[50px] rounded-[40px] border-none align-middle"}/>
                                <div className="ml-3 w-[70%] max-w-xs">
                                    <h6 className="mt-1">Tran Hoang Long</h6>
                                    <p className="m-0 text-text1 text-xs break-words truncate">Cho Tran Hoang Long may dung la con cho ma hehehehehehehe heheheheheheheheheehheheheheeheheheheheheheheeh</p>
                                </div>
                            </div>
                            <HiInformationCircle className="text-2xl"/>
                        </div>
                        <div className="pt-4 flex-grow">
                            <div className="flex flex-wrap">
                                <div className="mr-auto p-2 mx-8 md:p-2 bg-gray-200 rounded-lg animate-fadeIn">Hello nè</div>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="ml-auto p-2 mx-8 md:p-2 bg-gray-200 rounded-lg animate-fadeIn">Hello nè</div>
                            </div>
                        </div>
                        <div className="sticky bottom-0">
                            <div className="w-full">
                                <form className="bg-[#fafafa] flex items-center p-[10px_15px] mt-5 gap-3">
                                    {/* <input type="text" className="p-[4px_10px] border rounded-[30px] overflow-visible w-full border-[#dee2e6]" value={message} onChange={(e)=> setMessage(e.target.value)}/> */}
                                    <ChatBox users={users}></ChatBox>
                                    <span className="text-xl text-primary cursor-pointer" onClick={()=> setShowEmoji(!showEmoji)}>
                                        <BsEmojiSmile/>
                                    </span>
                                    <BsFillSendFill className="text-xl text-primary cursor-pointer"/>
                                    {showEmoji && <div className="absolute bottom-[100%] right-2 ">
                                        <Picker data={data} emojiSize={20} emojiButtonSize={28} maxFrequentRows={0} onEmojiSelect={addEmoji}/>
                                    </div>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutChat>
    );
};

export default ChatPage;