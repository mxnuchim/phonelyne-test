"use client";
import React, { useState } from "react";
import CenterModal from "./CenterModal";
import { X } from "lucide-react";
import SearchInput from "../shared/SearchInput";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  className?: string;
}

const countries = [
  { name: "USA", flag: "https://flagcdn.com/w20/us.png", network: "5G" },
  { name: "Canada", flag: "https://flagcdn.com/w20/ca.png", network: "4G" },
  { name: "Germany", flag: "https://flagcdn.com/w20/de.png", network: "5G" },
  { name: "France", flag: "https://flagcdn.com/w20/fr.png", network: "4G" },
  { name: "UK", flag: "https://flagcdn.com/w20/gb.png", network: "5G" },
  { name: "Australia", flag: "https://flagcdn.com/w20/au.png", network: "4G" },
  { name: "India", flag: "https://flagcdn.com/w20/in.png", network: "5G" },
  { name: "Japan", flag: "https://flagcdn.com/w20/jp.png", network: "4G" },
  {
    name: "South Korea",
    flag: "https://flagcdn.com/w20/kr.png",
    network: "5G",
  },
  { name: "Brazil", flag: "https://flagcdn.com/w20/br.png", network: "4G" },
  { name: "Mexico", flag: "https://flagcdn.com/w20/mx.png", network: "5G" },
  { name: "Italy", flag: "https://flagcdn.com/w20/it.png", network: "4G" },
  { name: "Spain", flag: "https://flagcdn.com/w20/es.png", network: "5G" },
  { name: "Russia", flag: "https://flagcdn.com/w20/ru.png", network: "4G" },
  { name: "China", flag: "https://flagcdn.com/w20/cn.png", network: "5G" },
  {
    name: "South Africa",
    flag: "https://flagcdn.com/w20/za.png",
    network: "4G",
  },
  { name: "Argentina", flag: "https://flagcdn.com/w20/ar.png", network: "5G" },
  { name: "Nigeria", flag: "https://flagcdn.com/w20/ng.png", network: "4G" },
  { name: "Egypt", flag: "https://flagcdn.com/w20/eg.png", network: "5G" },
  {
    name: "Saudi Arabia",
    flag: "https://flagcdn.com/w20/sa.png",
    network: "4G",
  },
  { name: "Turkey", flag: "https://flagcdn.com/w20/tr.png", network: "5G" },
  { name: "Thailand", flag: "https://flagcdn.com/w20/th.png", network: "4G" },
  { name: "Sweden", flag: "https://flagcdn.com/w20/se.png", network: "5G" },
  { name: "Norway", flag: "https://flagcdn.com/w20/no.png", network: "4G" },
  { name: "Finland", flag: "https://flagcdn.com/w20/fi.png", network: "5G" },
  { name: "Denmark", flag: "https://flagcdn.com/w20/dk.png", network: "4G" },
  {
    name: "Switzerland",
    flag: "https://flagcdn.com/w20/ch.png",
    network: "5G",
  },
  {
    name: "Netherlands",
    flag: "https://flagcdn.com/w20/nl.png",
    network: "4G",
  },
  { name: "Belgium", flag: "https://flagcdn.com/w20/be.png", network: "5G" },
  { name: "Austria", flag: "https://flagcdn.com/w20/at.png", network: "4G" },
  { name: "Poland", flag: "https://flagcdn.com/w20/pl.png", network: "5G" },
];

const CountryListModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  className,
  onProceed,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <CenterModal
      isOpen={isOpen}
      onClose={onClose}
      className={`w-[95%] lg:w-[530px] h-[70vh] lg:h-[665px] !rounded-[20px] !p-0 overflow-hidden border border-gray-200  ${className}`}
    >
      <div className="w-full h-full flex flex-1 flex-col ">
        <div className="w-full min-h-16 flex items-center justify-between px-6 space-x-3 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-black">Country List</h3>

          <X
            color="#000"
            size={16}
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>

        <div className="px-6 py-[3%] w-full flex flex-col items-center justify-start  overflow-y-scroll">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a country"
            className="bg-white text-black !border-[0.5px] !border-gray-300 !rounded-[10px] w-full lg:w-[440px]"
          />

          <div className="w-full grid grid-cols-2 gap-4 mt-6 lg:grid-cols-2">
            {countries
              .filter((country) =>
                country.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map(({ name, flag, network }, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-[10px] bg-gray-100 border border-gray-200"
                  onClick={onProceed}
                >
                  <div className="flex flex-col lg:flex-row w-full items-start lg:items-center justify-start lg:justify-between gap-y-2 lg:gap-y-0">
                    <div className="flex items-center">
                      <Image
                        src={flag}
                        alt={`${name} flag`}
                        height={24}
                        width={24}
                        className="w-6 h-6 rounded-full mr-2 object-cover"
                      />
                      <div className="text-sm text-center text-black">
                        {name}
                      </div>
                    </div>
                    <div className="rounded-md bg-blackBg2 px-2 py-1">
                      <p className="text-xs text-white font-medium">
                        {network}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </CenterModal>
  );
};

export default CountryListModal;
