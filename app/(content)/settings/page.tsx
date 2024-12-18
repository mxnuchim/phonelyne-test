"use client";
import Bell from "@/components/icons/Bell";
import NotificationSettings from "@/components/settings/NotificationSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import AppHeader from "@/components/shared/AppHeader";
import Container from "@/components/shared/Container";
import Divider from "@/components/shared/Divider";
import Navbar from "@/components/shared/NavBar";
import NotificationTab from "@/components/shared/NotificationTab";
import React, { useState } from "react";

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const Settings = () => {
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Password & Security");

  const handleBellClick = () => {
    setNotificationVisible(true);
  };

  const handleCloseNotification = () => {
    setNotificationVisible(false);
  };

  const tabs = ["Password & Security", "Notifications"];

  const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabClick }) => {
    return (
      <>
        <div className="flex lg:hidden space-x-4 border-[0.2px] border-gray-200 rounded-[10px] lg:rounded-full w-full lg:w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabClick(tab)}
              className={`px-7 py-1 rounded-[10px] lg:rounded-full font-medium w-full lg:w-auto ${
                activeTab === tab ? "bg-purple300 text-white" : "text-gray-500"
              }`}
            >
              <span
                className={`text-xs ${
                  activeTab === tab ? "text-white" : "text-gray-500"
                }`}
              >
                {tab}
              </span>
            </button>
          ))}
        </div>
        <div className="hidden lg:flex flex-col p-4 border-[0.5px] border-gray-200 shadow-sm bg-gray-100 rounded-[24px] w-[275px] h-[100px] transition-all duration-300 ease-in-out">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabClick(tab)}
              className={`px-7 py-1 rounded-[12px] font-medium w-full ${
                activeTab === tab ? "bg-purple300 text-white" : "text-gray-500"
              }`}
            >
              <span
                className={`text-xs ${
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
          className="!bg-whiteBg border-b border-transparent lg:border-b-gray-200 "
          logoType="dark-mobile"
          onNotificationClick={() =>
            setNotificationVisible(!isNotificationVisible)
          }
        />
      </div>
      <Container
        className="bg-whiteBg lg:bg-white border border-transparent lg:border-gray-200 rounded-[10px] h-screen lg:h-[96vh] pt-0 lg:pt-8 overflow-y-scroll relative pb-24 lg:pb-10 outline-none"
        paddingHorizontal="px-0 lg:px-8"
      >
        <div className="w-full h-full items-start justify-start ">
          {/** HEADER AREA */}
          <div className="w-full hidden lg:flex items-start justify-between ">
            <AppHeader
              title="Settings"
              subtitle={`View, manage, and download receipts of your past purchases and top-ups.`}
            />

            <div className="cursor-pointer" onClick={handleBellClick}>
              <Bell />
            </div>
          </div>

          <Divider className="absolute w-full mt-4 left-0" />

          <div className="w-full flex flex-col lg:flex-row lg:gap-x-10 sm:gap-y-6 mt-8 px-4">
            <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />

            <div className="w-full lg:w-5/6 mt-8 lg:mt-0">
              {activeTab?.toLowerCase() === "password & security" ? (
                <>
                  <SecuritySettings />
                </>
              ) : (
                <>
                  <NotificationSettings />
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

export default Settings;
