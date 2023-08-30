import React from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
}: ModalProps) => {
  const overlayClassName =
    "modal-overlay fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center";
  return (
    <ReactModal
      onRequestClose={()=>onClose()}
      isOpen={isOpen}
      overlayClassName={overlayClassName}
      className="modal-content max-w-[90vw] bg-light4 dark:bg-dark1 rounded-lg outline-none p-6 relative max-h-[90vh] overflow-y-auto scroll-hidden"
    >
      <button
        className="absolute z-10 flex items-center justify-center cursor-pointer w-11 h-11 right-2 top-[10px] text-dark0 dark:text-light0"
        onClick={onClose}
      >
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
      <div>{children}</div>
    </ReactModal>
  );
};

export default Modal;
