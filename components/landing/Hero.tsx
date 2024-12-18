"use client";
import React, { useState } from "react";
import Container from "../shared/Container";
import SearchInput from "../shared/SearchInput";
import { CiMoneyBill } from "react-icons/ci";
import CloudWifi from "../icons/CloudWifi";
import { FaLink } from "react-icons/fa6";
import { countries } from "@/utils/data";

const LandingPageHero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const FeatureList: React.FC = () => {
    return (
      <div className="flex space-x-6 items-center w-full justify-between">
        {featureItems.map((item, index) => (
          <div key={index} className="flex flex-col items-start text-left">
            {/* Icon at the top */}
            <div className="text-4xl text-blue-500">{item.icon}</div>

            {/* Title below */}
            <div className="mt-2 text-xl font-medium text-white">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Container className="bg-blackBg flex flex-col items-start justify-start !h-[85vh]">
      <div className=" w-full space-y-8 items-center justify-center flex flex-col">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
          Stay Connected Everywhere You Go
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-grey500 max-w-2xl mx-auto text-center">
          Affordable, high-speed internet access for every adventure. No SIM
          cards, no contracts—just instant connectivity wherever you travel.
        </p>

        {/* Search Input */}
        <div className="mt-6 w-full flex justify-center items-center">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a destination"
            className="w-2/3 max-w-[596px] bg-gray800 text-black"
            showSuggestions={true}
            suggestions={countries}
          />
        </div>
      </div>

      <div className="mt-32 w-full">
        <FeatureList />
      </div>
    </Container>
  );
};

export default LandingPageHero;

const featureItems = [
  {
    title: "Affordable Data Plans",
    icon: <CiMoneyBill size={34} className="text-orange300" />,
  },
  {
    title: "No Roaming. Just Connection",
    icon: <CloudWifi />,
  },
  {
    title: "Connect Anywhere. Anytime",
    icon: <FaLink size={34} className="text-orange300" />,
  },
];
