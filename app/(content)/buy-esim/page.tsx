"use client";

import Bell from "@/components/icons/Bell";
import Container from "@/components/shared/Container";
import Divider from "@/components/shared/Divider";
import Navbar from "@/components/shared/NavBar";
import SearchInput from "@/components/shared/SearchInput";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LocalESIMCard from "@/components/sims/LocalESIMCard";
import RegionalESIMCard from "@/components/sims/RegionalESIMCard";
import { localESIMs, regionalESIMs } from "@/utils/data";
import { ILocalEsim, IRegionalEsim } from "@/types";
import NotificationTab from "@/components/shared/NotificationTab";

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const PurchaseNewESIM = () => {
  const router = useRouter();
  const [regionalSearchQuery, setRegionalSearchQuery] = useState("");
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Local eSIMs");

  const handleBellClick = () => {
    setNotificationVisible(true);
  };

  const handleCloseNotification = () => {
    setNotificationVisible(false);
  };

  const tabs = ["Local eSIMs", "Regional eSIMs"];

  const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabClick }) => {
    return (
      <div className="flex space-x-4 border-[0.2px] border-gray-200 rounded-[10px] lg:rounded-full w-full lg:w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabClick(tab)}
            className={`px-4 py-2 rounded-[10px] lg:rounded-full font-medium w-full lg:w-auto ${
              activeTab === tab ? "bg-purple300 text-white" : "text-gray-500"
            }`}
          >
            <span
              className={`text-sm lg:text-base ${
                activeTab === tab ? "text-white" : "text-gray-500"
              }`}
            >
              {tab}
            </span>
          </button>
        ))}
      </div>
    );
  };

  // Filter local eSIMs based on the localSearchQuery
  const filteredLocalESIMs = localESIMs.filter((item: ILocalEsim) =>
    item.name.toLowerCase().includes(localSearchQuery.toLowerCase())
  );

  // Filter regional eSIMs based on the regionalSearchQuery
  const filteredRegionalESIMs = regionalESIMs.filter((item: IRegionalEsim) =>
    item.name.toLowerCase().includes(regionalSearchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex lg:hidden">
        <Navbar
          type="dashboard"
          className="!bg-whiteBg border-b border-transparent lg:border-b-gray-200"
          logoType="dark-mobile"
          onNotificationClick={() =>
            setNotificationVisible(!isNotificationVisible)
          }
        />
      </div>
      <Container
        className="bg-whiteBg lg:bg-white border border-transparent lg:border-gray-200 rounded-[10px] h-screen lg:h-[96vh] pt-10 lg:pt-20 overflow-y-scroll relative outline-none"
        paddingHorizontal="px-0 lg:px-8"
      >
        <div className="w-full h-full items-start justify-start mb-24 lg:mb-32">
          <div className="w-full hidden lg:flex items-start justify-between">
            <div className="w-full flex flex-col items-start justify-start">
              <div className="p-1 cursor-pointer" onClick={() => router.back()}>
                <p className="font-normal text-sm text-black">Back home</p>
              </div>
              <p className="font-semibold text-xl text-black">Buy New eSIM</p>
            </div>
            <div className="cursor-pointer" onClick={handleBellClick}>
              <Bell />
            </div>
          </div>

          <div className="flex lg:hidden pt-6 px-4">
            <p className="font-medium text-xl text-black">Buy eSIM</p>
          </div>

          <Divider className="absolute w-full mt-4 left-0" />

          <div className="w-full mt-8 px-4">
            <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />

            <div className="mt-6 pb-8">
              {activeTab === "Local eSIMs" ? (
                <>
                  <SearchInput
                    value={localSearchQuery}
                    onChange={(e) => setLocalSearchQuery(e.target.value)}
                    placeholder="Search for a destination"
                    className="bg-white text-black !border-[0.5px] !border-gray-300 !rounded-full"
                    containerClassName="w-full lg:!w-[540px] mb-6"
                  />

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {filteredLocalESIMs.map((item: ILocalEsim) => (
                      <LocalESIMCard
                        key={item.name}
                        country={item.name}
                        flagSrc={item.flagUrl}
                        priceRange={item.priceRange}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <SearchInput
                    value={regionalSearchQuery}
                    onChange={(e) => setRegionalSearchQuery(e.target.value)}
                    placeholder="Search for a destination"
                    className="bg-white text-black !border-[0.5px] !border-gray-300 !rounded-full"
                    containerClassName="w-full lg:!w-[540px] mb-6"
                  />

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {filteredRegionalESIMs.map((item: IRegionalEsim) => (
                      <RegionalESIMCard
                        key={item.name}
                        continent={item.name}
                        color={item.backgroundColor}
                        coverage={item.coverage}
                        priceRange={item.priceRange}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
      <NotificationTab
        isVisible={isNotificationVisible}
        onClose={handleCloseNotification}
      />
    </>
  );
};

export default PurchaseNewESIM;
