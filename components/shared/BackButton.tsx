"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  text?: string; // Optional prop for button text
  className?: string; // Optional className for custom styles
  onBackBtnPress?: () => void; // Optional function to handle button press
}

const BackButton: React.FC<BackButtonProps> = ({
  text = "Back",
  className = "",
  onBackBtnPress,
}) => {
  const router = useRouter();

  const handleClick = () => {
    // Call onBackBtnPress if provided
    if (onBackBtnPress) {
      onBackBtnPress?.();
    } else {
      // Navigate back to the previous page
      router.back();
    }
  };

  return (
    <div
      className={`flex items-center justify-center space-x-1 mb-2 cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <ChevronLeft size={14} className="text-black" />
      <p className="text-xs font-normal text-black text-left">{text}</p>
    </div>
  );
};

export default BackButton;
