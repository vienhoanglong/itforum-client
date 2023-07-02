import React from "react";
import ReactModal from "react-modal";
interface ModalProps {
    children: React.ReactNode;
  }
  export const Modal: React.FC<ModalProps> = ({
    children,
  }: ModalProps) => {
  const overlayClassName =
    "modal-overlay fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center";
  return (
    <ReactModal
      isOpen={true}
      overlayClassName={overlayClassName}
      className="modal-content w-full max-w-[521px] bg-white rounded-2xl outline-none p-10 relative max-h-[90vh] overflow-y-auto scroll-hidden"
    >
      <button className="absolute z-10 flex items-center justify-center cursor-pointer w-11 h-11 right-2 top-[10px] text-text1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div>
        {children}
      </div>
    </ReactModal>
  );
};

export default Modal;
