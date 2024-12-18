"use client";
import React from "react";
import CenterModal from "./CenterModal";
import ModalIcon from "../icons/ModalIcon";
import PrimaryButton from "../shared/PrimaryButton";

interface SendResetLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  handleResendEmail: () => void;
  className?: string;
}

const SendResetLinkModal: React.FC<SendResetLinkModalProps> = ({
  isOpen,
  onClose,
  className,
  onProceed,
  handleResendEmail,
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
        <h2 className="text-xl font-semibold text-black">Reset link sent</h2>
      </div>

      <div className="px-6 py-[5%] w-full flex items-center justify-start">
        <p className="text-base font-light text-black">
          We&apos;ve sent a link to your email to confirm your request for a
          password reset. Didn&apos;t receive the email? No problem, just click
          below to resend it.
        </p>
      </div>

      <div className="w-full flex items-start justify-start px-6 space-x-3 border-t border-gray-200 pt-5">
        <PrimaryButton
          onClick={() => handleResendEmail()}
          className="bg-transparent w-[100px] lg:w-[150px] !rounded-[6px] !lg:rounded-[10px] !h-9 !shadow-none"
        >
          <span className="text-black text-sm text-medium">Resend email</span>
        </PrimaryButton>
        <PrimaryButton
          onClick={() => onProceed()}
          className="bg-orange w-[100px] lg:w-[150px] !rounded-[6px] lg:!rounded-[10px] !h-9"
        >
          <span className="text-white text-sm font-medium">Done</span>
        </PrimaryButton>
      </div>
    </CenterModal>
  );
};

export default SendResetLinkModal;
