import React from "react";

interface Props {
  title: string;
  subtitle?: string;
}

const AppHeader = ({ title, subtitle }: Props) => {
  return (
    <div className="w-full flex flex-col items-start justify-start">
      <p className="font-medium text-2xl text-black">{title}</p>
      <p className="font-normal text-base text-black">{subtitle}</p>
    </div>
  );
};

export default AppHeader;
