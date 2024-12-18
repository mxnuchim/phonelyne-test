import Image from "next/image";
import React from "react";

// URL flags for currencies
const flags = {
  EUR: "https://flagcdn.com/w20/eu.png",
  NGN: "https://flagcdn.com/w20/ng.png",
  USD: "https://flagcdn.com/w20/us.png",
};

interface CurrencyDropdownProps {
  onSelect: (currencyCode: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  onSelect,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null; // If the dropdown is not open, don't render

  return (
    <div className="absolute right-0 mt-2 w-40 h-[135px] bg-white border rounded-[10px] shadow-lg z-1 top-full py-3 px-1">
      {Object.entries(flags).map(([code, url]) => (
        <button
          key={code}
          className="flex items-center w-full px-4 py-2 text-left rounded-[10px] text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => {
            onSelect(code);
            onClose();
          }}
        >
          <Image
            src={url}
            alt={`${code} flag`}
            height={20}
            width={20}
            className="w-5 h-5 rounded-full mr-3"
          />
          {code === "EUR" ? "Euro" : code === "NGN" ? "Naira" : "USD"}
        </button>
      ))}
    </div>
  );
};

export default CurrencyDropdown;
