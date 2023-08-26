import { Button } from "@/components/button";
import Avatar from "@/components/image/Avatar";
import { useDebounce } from "@/hooks/useDebounce";
import { IConversation } from "@/interface/conversation";
import IUser from "@/interface/user";
import { createConversation } from "@/services/conversationService";
import { searchUserByUsername } from "@/services/userService";
import { setColorBackgroundUser } from "@/utils/helper";
import { Fragment, useCallback, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { HiTrash, HiUserAdd } from "react-icons/hi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface CreateNewConversationProps {
  onCloseModal: () => void;
  userId: string;
  onSuccess: (conversationNew: IConversation) => void;
}
const CreateNewConversation: React.FC<CreateNewConversationProps> = ({onCloseModal, userId, onSuccess}) => {
  const [conversationMembers, setConversationMembers] = useState<IUser[]>([]);
  const [conversationMemberSave, setConversationMemberSave] = useState<IUser[]>(
    []
  );
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 1000);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const getMembers = useCallback(async (username: string) => {
    const response = await searchUserByUsername(username);
    if (response) {
      setConversationMembers(response);
    }
  }, []);
  useEffect(() => {
    if (debouncedValue) {
      getMembers(debouncedValue);
    } else {
      setConversationMembers([]);
    }
  }, [debouncedValue, getMembers]);
  const handleAddMember = (member: IUser) => {
    const isMemberAdded = conversationMemberSave.some(
      (existingMember) => existingMember._id === member._id
    );

    if (!isMemberAdded) {
      setConversationMemberSave([...conversationMemberSave, member]);
    }
  };

  const handleRemoveConversation = (index: number) => {
    const newMembers = [...conversationMemberSave];
    newMembers.splice(index, 1);
    setConversationMemberSave(newMembers);
  };

  const handleCreateConversation = async (users: IUser[]) => {
    const members: string[] = []
    users.forEach(user => {
      return user._id && members.push(user._id)
    });
    const payload = {
      members: [...members, userId],
      createBy: userId,
    };
    const response = await createConversation(payload);
    if(response){
      onSuccess(response);
      onCloseModal();
      return toast.success("Tạo cuộc hội thoại thành công!", {position: 'bottom-right'});
    }
  }
  return (
    <div className="h-auto m-auto p-4 sm:w-[350px]">
      <div className="text-base text-dark1 text-center font-medium mb-4 dark:text-light0">
        Tạo group chat mới
      </div>
      <div className="rounded-full border-[1px] border-solid mb-4">
        <div className="flex items-center p-3 h-10 rounded-full text-dark1 dark:bg-dark1 dark:text-white">
          <div className="flex items-center">
            <label htmlFor="q" className="">
              <BsSearch className="text-dark1 dark:text-light1 text-sm" />
            </label>
            <input
              id="q"
              className="ml-4 h-full pt-0 text-sm bg-transparent outline-none w-auto"
              placeholder="Tìm kiếm người dùng..."
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
        {(conversationMembers &&
          conversationMembers.length > 0) ?
          conversationMembers.map((member) => (
            <Fragment key={member?._id}>
              <div
                key={member?._id}
                className="p-3 w-full flex align-middle transition-all duration-300 ease dark:text-light0 rounded-md hover:bg-blue-400 hover:outline-mainColor dark:focus:bg-darker"
              >
                <Avatar
                  src={member?.avatar?? ""}
                  cln={
                    `w-[40px] h-[40px] object-cover border-none align-middle cursor-pointer ${setColorBackgroundUser(member.color ?? "")}`
                  }
                />
                <div className="flex w-full justify-between items-center">
                  <div className="ml-3 max-w-xs text-darker flex flex-col">
                    <span className="text-sm dark:text-light0">
                      {member?.fullName ?? member.username}
                    </span>
                    <span className="text-[10px] dark:text-light0">
                      @{member?.username}
                    </span>
                  </div>
                  <div className="p-2 rounded-full shadow-inner hover:bg-subtle">
                    <HiUserAdd
                      className="text-xl text-mainColor"
                      onClick={() => {
                        handleAddMember(member);
                      }}
                    />
                  </div>
                </div>
              </div>
            </Fragment>
          )): (<div className="text-xs text-center">Không tìm thấy người dùng nào</div>)}
        {conversationMemberSave && conversationMemberSave.length > 0 && (
          <>
            <div className="text-sm mt-5">Người đã thêm</div>
            <div className="border-t-[1px] text-sm mb-1"></div>
          </>
        )}
        {conversationMemberSave &&
          conversationMemberSave.length > 0 &&
          conversationMemberSave.map((member, index) => (
            <Fragment key={member?._id} >
              <div className="p-3 w-full flex align-middle transition-all duration-300 ease dark:text-light0 rounded-md hover:bg-blue-400 hover:outline-mainColor dark:focus:bg-darker">
                    <Avatar
                  src={member?.avatar?? ""}
                  cln={
                    `w-[40px] h-[40px] object-cover border-none align-middle cursor-pointer ${setColorBackgroundUser(member.color ?? "")}`
                  }
                />
                <div className="flex w-full justify-between items-center">
                  <div className="ml-3 max-w-xs text-darker flex flex-col">
                    <span className="text-sm dark:text-light0">
                      {member?.fullName ?? member.username}
                    </span>
                    <span className="text-[10px] dark:text-light0">
                      @{member?.username}
                    </span>
                  </div>
                  <div className="p-2 rounded-full shadow-inner hover:bg-red-100">
                    <HiTrash
                      className="text-xl text-red1"
                      onClick={() => handleRemoveConversation(index)}
                    />
                  </div>
                </div>
              </div>
            </Fragment>
          ))}

        <div className="flex space-x-4 justify-end mt-10">
          {conversationMemberSave && conversationMemberSave.length > 0 &&(
          <Button
            size="small"
            className="text-xs w-fit bg-teal-400 hover:bg-teal-500"
            handle={()=> handleCreateConversation(conversationMemberSave)}
          >
            Tạo nhóm chat
          </Button>
          )}
        </div>
      </div>
  );
};
export default CreateNewConversation;
