import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function ModalLogFile({
  isOpen,
  onClose,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="w-[90%] xs:w-[80%] sm:w-[548px] bg-white px-6 xs:px-8 sm:px-10 py-4 xs:py-5 sm:py-6 rounded-xl shadow-lg z-10">
        <div>{children}</div>
        <div className="flex flex-row justify-center items-center w-full mt-3 xs:mt-4 sm:mt-5">
          <button
            onClick={onClose}
            className="w-[84px] xs:w-[90px] sm:w-[96px] h-[34px] xs:h-[36px] sm:h-[39px] text-[14px] xs:text-[15px] sm:text-[16px] text-white font-semibold bg-[#0F172A] rounded-md"
          >
            선택
          </button>
        </div>
      </div>
    </div>
  );
}
