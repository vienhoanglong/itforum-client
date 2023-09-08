import Modal from "@/components/modal/Modal";
import React, { useState } from "react";
import ContactModal from "./ContactModal";
import { HiPencil } from "react-icons/hi";
import IUserUpdate from "@/interface/API/IUserUpdate";
import IUser from "@/interface/user";
import { useTranslation } from "react-i18next";

interface ContactSectionProps {
  handleUpdateContact: (updateContact: IUserUpdate, id: string) => void;
  userData: IUser | null;
  isEdit: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  handleUpdateContact,
  userData,
  isEdit,
}) => {
  const { t } = useTranslation();
  const [isOpenModalContact, setIsOpenModalContact] = useState(false);
  const handleOpenModalContact = () => {
    setIsOpenModalContact(true);
  };
  const handleClose = () => {
    setIsOpenModalContact(false);
  };
  const hanleSaveContact = (updateContact: IUserUpdate) => {
    handleUpdateContact(
      updateContact,
      userData ? (userData._id ? userData._id : "") : ""
    );
    handleClose();
  };

  return (
    <div className="dark:bg-dark2 bg-light3 shadow-sm rounded-lg p-4 relative">
      <h2 className="text-base font-bold mb-4"> {t("contact")}</h2>
      <ul className="">
        {userData?.address && (
          <li>
            {t("address")}: {userData.address}
          </li>
        )}
        <li>
          Email:{" "}
          <a href="https://example.com" className="text-blue-500">
            {userData?.email}
          </a>
        </li>
        {userData?.phoneNumber && (
          <li>
            {t("phone")}: {userData.phoneNumber}
          </li>
        )}
        {userData?.links?.map((link) => (
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
          <span className="max-md:hidden">{t("edit")}</span>
        </button>
      ) : null}

      <Modal isOpen={isOpenModalContact} onClose={handleClose}>
        <h2 className="text-base font-bold mb-4 dark:text-light0">
          {t("contact")}
        </h2>
        <ContactModal userData={userData} onSave={hanleSaveContact} />
      </Modal>
    </div>
  );
};

export default ContactSection;
