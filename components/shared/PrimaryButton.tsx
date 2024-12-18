import { ReactNode } from "react";

interface PrimaryButtonProps {
  onClick?: () => void;
  backgroundColor?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  children: ReactNode;
  width?: string;
  className?: string;
}

const PrimaryButton = ({
  onClick,
  backgroundColor,
  disabled = false,
  type = "button",
  children,
  width = "w-full ",
  className,
}: PrimaryButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${width}
        ${disabled ? "bg-gray-400" : backgroundColor ?? "bg-primary"}
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
        ${disabled ? "" : "hover:shadow-md"}
        text-white font-semibold py-4 rounded-full focus:outline-none flex items-center justify-center h-fit gap-3 md:text-sm text-xs ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
