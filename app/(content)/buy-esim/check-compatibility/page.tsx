"use client";

import Bell from "@/components/icons/Bell";
import Container from "@/components/shared/Container";
import Navbar from "@/components/shared/NavBar";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import NotificationTab from "@/components/shared/NotificationTab";
import SupportedAppleDevicesList from "@/components/shared/SupportedAppleDevicesList";
import SupportedAndroidDevicesList from "@/components/shared/SupportedAndroidDevicesList";

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const CheckESIMCompatibility = () => {
  const router = useRouter();
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("iOS");

  const handleBellClick = () => {
    setNotificationVisible(true);
  };

  const handleCloseNotification = () => {
    setNotificationVisible(false);
  };

  const tabs = ["iOS", "Android"];

  const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabClick }) => {
    return (
      <>
        <div className="flex lg:hidden space-x-4 border-[0.2px] border-gray-200 rounded-[10px] lg:rounded-full w-full lg:w-fit">
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
        <div className="hidden lg:flex flex-col p-4 border-[0.5px] border-gray-200 shadow-sm bg-gray-100 rounded-[24px] w-[275px] h-[110px] transition-all duration-300 ease-in-out">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabClick(tab)}
              className={`px-4 py-2 rounded-[12px] font-medium w-full ${
                activeTab === tab ? "bg-purple300 text-white" : "text-gray-500"
              }`}
            >
              <span
                className={`text-sm lg:text-base ${
                  activeTab === tab ? "text-white" : "text-gray-400"
                }`}
              >
                {tab}
              </span>
            </button>
          ))}
        </div>
      </>
    );
  };

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
        <div className="relative w-full h-full items-start justify-start mb-24 lg:mb-32">
          <div className="w-full hidden lg:flex items-start justify-between">
            <div className="w-full flex flex-col items-start justify-start">
              <div className="p-1 cursor-pointer" onClick={() => router.back()}>
                <p className="font-normal text-sm text-black">Go back</p>
              </div>
              <p className="font-semibold text-xl text-black">
                eSIM compatibility
              </p>
            </div>
            <div className="cursor-pointer" onClick={handleBellClick}>
              <Bell />
            </div>
          </div>

          <div className="flex lg:hidden pt-6 px-4">
            <p className="font-medium text-xl text-black">eSIM Compatibility</p>
          </div>

          <div className="w-full flex flex-col lg:flex-row lg:gap-x-10 sm:gap-y-6 mt-8 px-4">
            <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />

            <div className="w-full lg:w-5/6 mt-8 lg:mt-0">
              {activeTab?.toLowerCase() === "ios" ? (
                <>
                  <SupportedAppleDevicesList />
                </>
              ) : (
                <>
                  <SupportedAndroidDevicesList />
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

export default CheckESIMCompatibility;
