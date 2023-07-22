import IUserUpdate from "@/interface/API/IUserUpdate";
import UserModel from "@/interface/model/UserModel";
import IContactLink from "@/interface/API/IContactLinks";
import React, { useState } from "react";
import { HiPencil, HiPlus, HiTrash } from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";

interface ContactModalProps {
  userData: UserModel;
  onSave: (contact: IUserUpdate) => void;
}

const ContactModal: React.FC<ContactModalProps> = ({
  userData,
  onSave,
}: ContactModalProps) => {
  const [editedContact, setEditedContact] = useState<UserModel>(userData);
  const [newLink, setNewLink] = useState<IContactLink>({
    id: "",
    name: "",
    link: "",
  });

  const handleContactChange = (field: keyof IUserUpdate, value: string) => {
    setEditedContact({ ...editedContact, [field]: value });
  };

  const handleLinkChange = (
    index: number,
    field: keyof IContactLink,
    value: string
  ) => {
    const updatedLinks = editedContact.links.map((link, idx) => {
      if (idx === index) {
        return { ...link, [field]: value };
      }
      return link;
    });
    setEditedContact({ ...editedContact, links: updatedLinks });
  };

  const handleAddLink = () => {
    if (newLink.name && newLink.link) {
      const updatedLinks = [
        ...editedContact.links,
        { id: uuidv4(), name: newLink.name, link: newLink.link },
      ];
      setEditedContact({ ...editedContact, links: updatedLinks });
      setNewLink({ id: "", name: "", link: "" });
    }
  };
  const handleRemoveLink = (id: string) => {
    const updatedLinks = editedContact.links.filter((link) => link.id !== id);
    setEditedContact({ ...editedContact, links: updatedLinks });
  };

  const handleSave = () => {
    const updateContact: IUserUpdate = {
      email: editedContact.email,
      address: editedContact.address,
      phone: editedContact.phone,
      links: editedContact.links,
    };
    onSave(updateContact);
    console.log(updateContact);
  };

  return (
    <div className="dark:bg-dark2 dark:text-light0 bg-light3 shadow-sm rounded-lg p-4 sm:w-[350px]">
      <ul className="text-xs">
        <li>
          <div className="flex justify-between items-center">
            Email:{" "}
            <input
              type="text"
              value={editedContact.email}
              onChange={(e) => handleContactChange("email", e.target.value)}
              className="text-blue-500 rounded-lg dark:bg-dark1 p-2 w-[200px]"
            />
          </div>
        </li>
        <li>
          <div className="flex justify-between items-center mt-4 ">
            Address:{" "}
            <input
              type="text"
              value={editedContact.address}
              onChange={(e) => handleContactChange("address", e.target.value)}
              className="text-blue-500 rounded-lg dark:bg-dark1 p-2 w-[200px] "
            />
          </div>
        </li>
        <li>
          <div className="flex justify-between items-center mt-4">
            Phone:{" "}
            <input
              type="text"
              value={editedContact.phone}
              onChange={(e) => handleContactChange("phone", e.target.value)}
              className="text-blue-500 rounded-lg dark:bg-dark1 p-2 w-[200px] "
            />
          </div>
        </li>
        {editedContact.links.map((link, index) => (
          <li key={link.id}>
            <div className="flex justify-between items-center mt-4">
              {link.name}:{" "}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={link.link}
                  onChange={(e) =>
                    handleLinkChange(index, "link", e.target.value)
                  }
                  className="text-blue-500 rounded-lg dark:bg-dark1 p-2 w-[200px] "
                />
                <div className="flex items-center">
                  <button
                    className=" text-xs ml-2 text-white p-[1px] rounded-full bg-red0"
                    onClick={() => handleRemoveLink(link.id)}
                  >
                    <HiTrash size={15}></HiTrash>
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
        <li>
          <div className="flex items-center mt-4">
            <input
              type="text"
              value={newLink.name}
              onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
              placeholder="Link name"
              className="text-blue-500 rounded-lg dark:bg-dark1 p-2 w-[100px]  mr-2"
            />
            :{" "}
            <input
              type="text"
              value={newLink.link}
              onChange={(e) => setNewLink({ ...newLink, link: e.target.value })}
              placeholder="URL"
              className="text-blue-500 rounded-lg dark:bg-dark1 p-2 w-[180px]  ml-2"
            />
            <button
              className="text-xs p-[1px] ml-2 text-white rounded-full bg-mainColor"
              onClick={handleAddLink}
            >
              <HiPlus size={15}></HiPlus>
            </button>
          </div>
        </li>
      </ul>
      <div className="flex justify-end">
        <button
          className="flex space-x-1 text-xs items-center bg-mainColor hover:bg-darker mt-4 text-white px-2 py-2 rounded-full"
          onClick={handleSave}
        >
          <HiPencil />
          <span className="">Save</span>
        </button>
      </div>
    </div>
  );
};

export default ContactModal;
