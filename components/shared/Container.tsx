import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  paddingHorizontal?: string;
}

export default function Container({
  children,
  className = "",
  paddingHorizontal = "",
}: ContainerProps) {
  return (
    <div
      className={`flex items-center justify-center ${
        paddingHorizontal ? paddingHorizontal : "px-8 lg:px-[10%]"
      } w-full h-screen  ${className}`}
    >
      {children}
    </div>
  );
}
