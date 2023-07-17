import Modal from "@/components/modal/Modal";
import React, { useState } from "react";
import ContactModal from "./ContactModal";
import { HiPencil } from "react-icons/hi";
import UserModel from "@/interface/model/UserModel";
import IUserUpdate from "@/interface/API/IUserUpdate";

interface ContactSectionProps {
  handleUpdateContact: (updateContact: IUserUpdate) => void;
  userData: UserModel;
  isEdit: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  handleUpdateContact,
  userData,
  isEdit,
}) => {
  const [isOpenModalContact, setIsOpenModalContact] = useState(false);
  const handleOpenModalContact = () => {
    setIsOpenModalContact(true);
  };
  const handleClose = () => {
    setIsOpenModalContact(false);
  };
  const hanleSaveContact = (updateContact: IUserUpdate) => {
    handleUpdateContact(updateContact);
    handleClose();
  };

  return (
    <div className="dark:bg-dark2 bg-light3 shadow-sm rounded-lg p-4 relative">
      <h2 className="text-base font-bold mb-4">Contact</h2>
      <ul className="">
        <li>
          Email:{" "}
          <a href="https://example.com" className="text-blue-500">
            {userData.email}
          </a>
        </li>
        <li>Address: {userData.address}</li>
        <li>Phone: {userData.phone}</li>
        {userData.links.map((link) => (
          <li key={link.id}>
            {link.name}: {""}
            <a href={link.link} className="text-blue-500">
              {link.link}
            </a>
          </li>
        ))}
      </ul>
      {isEdit ? (
        <button
          onClick={handleOpenModalContact}
          className="flex space-x-1 items-center absolute top-2 right-2 bg-mainColor hover:bg-darker text-white px-2 py-2 rounded-full"
        >
          <HiPencil></HiPencil>
          <span className="max-md:hidden">Edit</span>
        </button>
      ) : null}

      <Modal isOpen={isOpenModalContact} onClose={handleClose}>
        <h2 className="text-base font-bold mb-4 dark:text-light0">Contact</h2>
        <ContactModal userData={userData} onSave={hanleSaveContact} />
      </Modal>
    </div>
  );
};

export default ContactSection;
