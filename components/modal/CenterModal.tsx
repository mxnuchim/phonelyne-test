// components/CenterModal.tsx
import React, { useEffect } from "react";

interface CenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const CenterModal: React.FC<CenterModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    if (typeof window === "undefined") return;

    if (isOpen) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      } `}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative z-10 max-w-lg w-full bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-95"
        } ${className}`}
      >
        {/* <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button> */}
        {children}
      </div>
    </div>
  );
};

export default CenterModal;
