"use client";
import React from "react";
import CenterModal from "./CenterModal";
import ModalIcon from "../icons/ModalIcon";
import PrimaryButton from "../shared/PrimaryButton";

interface PasswordResetSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  className?: string;
}

const PasswordResetSuccessModal: React.FC<PasswordResetSuccessModalProps> = ({
  isOpen,
  onClose,
  className,
  onProceed,
}) => {
  return (
    <CenterModal
      isOpen={isOpen}
      onClose={onClose}
      className={`w-[530px] h-[260px] !rounded-[20px] !p-0 overflow-hidden  border border-gray-200 ${className}`}
    >
      <div className="w-full bg-gray-100 h-16 flex items-center justify-start px-6 space-x-3 border-b border-gray-200">
        <div className="w-[33px] h-[33px] rounded-full bg-gray-300 flex items-center justify-center">
          <ModalIcon />
        </div>
        <h2 className="text-xl font-semibold text-black">
          Password Reset Successful
        </h2>
      </div>

      <div className="px-6 py-[5%] w-full flex items-center justify-start">
        <p className="text-base font-light text-black">
          Your password has been updated! You can now log in with your new
          credentials and continue exploring Phonelyne&apos;s services.
        </p>
      </div>

      <div className="w-full flex items-start justify-start px-6 space-x-3 border-t border-gray-200 pt-5">
        <PrimaryButton
          onClick={() => onProceed()}
          className="bg-orange w-[100px] lg:w-[150px] !rounded-[6px] lg:!rounded-[10px] !h-9"
        >
          <span className="text-white text-sm font-medium">Back to login</span>
        </PrimaryButton>
      </div>
    </CenterModal>
  );
};

export default PasswordResetSuccessModal;
