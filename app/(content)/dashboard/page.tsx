"use client";
import { useAppStore } from "@/app/store/store";
import DashboardInfoCard from "@/components/dashboard/DashboardInfoCard";
import DataBalanceCard from "@/components/dashboard/DataBalanceCard";
import DataUsageCard from "@/components/dashboard/DataUsageCard";
import InternetSpeedCard from "@/components/dashboard/InternetSpeedCard";
import PlanInfoCard from "@/components/dashboard/PlanInfoCard";
import RecentActivitiesCard from "@/components/dashboard/RecentActivitiesCard";
import Bell from "@/components/icons/Bell";
import AppHeader from "@/components/shared/AppHeader";
import Container from "@/components/shared/Container";
import Divider from "@/components/shared/Divider";
import Navbar from "@/components/shared/NavBar";
import NotificationTab from "@/components/shared/NotificationTab";
import React, { useState } from "react";

const Dashboard = () => {
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const { user, providerCapabilities } = useAppStore();

  // console.log("Provider Capabilities Data frontend --> ", providerCapabilities);

  const handleBellClick = () => {
    setNotificationVisible(true);
  };

  const handleCloseNotification = () => {
    setNotificationVisible(false);
  };

  const hasCapability = (capabilityName: string) =>
    providerCapabilities?.some(
      (capability) =>
        capability?.capability?.name?.toLowerCase() ===
        capabilityName?.toLowerCase()
    );

  // const hasBuyEsimCapability = hasCapability("Buy eSIM");
  // const hasTopUpEsimCapability = hasCapability("Top-up eSim");
  // const hasGetPlanExpirationCapability = hasCapability("Get Plan Expiration");
  const hasDataBalanceCapability = hasCapability("Check Data Balance");
  const hasDataUsageCapability = hasCapability("Check Data Usage");

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
              title="Overview"
              subtitle={`Welcome back, ${user?.first_name}`}
            />

            <div className="cursor-pointer" onClick={handleBellClick}>
              <Bell />
            </div>
          </div>

          <Divider className="absolute w-full mt-4 left-0" />

          <div className="mt-6">
            <DashboardInfoCard className="rounded-none lg:rounded-[10px] w-full" />
          </div>

          <div className="mt-6 mx-2 flex flex-col lg:flex-row space-x-0 lg:space-x-3 space-y-3 lg:space-y-0">
            <div className="border border-gray-200 w-full lg:w-[65%] rounded-[10px] flex flex-col items-start justify-start p-5 lg:p-3 bg-white shadow-md">
              <p className="text-base text-nowrap lg:text-lg sm:text-base font-medium text-black mb-2">
                Active Data Plan
              </p>

              <div className="w-full flex flex-col lg:flex-row items-center lg:!items-start justify-center lg:justify-start space-x-0 lg:space-x-3">
                {hasDataBalanceCapability ? <DataBalanceCard /> : null}

                <PlanInfoCard
                  className={`mt-3 lg:mt-0 ${
                    !hasDataBalanceCapability ? "!w-full" : ""
                  }`}
                />
              </div>
            </div>

            <div className="border border-gray-200 rounded-[10px] flex flex-grow items-center justify-center p-5 shadow-md">
              <div className="w-full flex flex-col items-center justify-center">
                <div className="w-full flex justify-start items-start">
                  <p className="text-base text-left text-nowrap lg:text-lg sm:text-base font-medium text-black mb-2">
                    Connection
                  </p>
                </div>

                <InternetSpeedCard />
              </div>
            </div>
          </div>

          <div className="mt-6 mx-2 flex flex-col lg:flex-row space-x-0 lg:space-x-3 space-y-3 lg:space-y-0 max-w-full h-auto pb-10">
            {hasDataUsageCapability ? <DataUsageCard /> : null}

            <div
              className={`mx-auto w-[97vw] max-w-full lg:w-[600px] 2xl:w-full h-[350px] ${
                !hasDataUsageCapability ? "w-full lg:!w-full " : ""
              }`}
            >
              <RecentActivitiesCard />
            </div>
          </div>
        </div>
        <NotificationTab
          isVisible={isNotificationVisible}
          onClose={handleCloseNotification}
        />
      </Container>
    </>
  );
};

export default Dashboard;
