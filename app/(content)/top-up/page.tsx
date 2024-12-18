"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DashboardInfoCard from "@/components/dashboard/DashboardInfoCard";
import DataPlanList from "@/components/dashboard/DataPlanList";
import Bell from "@/components/icons/Bell";
import Container from "@/components/shared/Container";
import Divider from "@/components/shared/Divider";
import Navbar from "@/components/shared/NavBar";
import NotificationTab from "@/components/shared/NotificationTab";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { IPlan } from "@/types";
import { TriangleAlert } from "lucide-react";

const TopUpScreen = () => {
  const router = useRouter();
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [planToPurchase, setPlanToPurchase] = useState<IPlan | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const handleBellClick = () => {
    setNotificationVisible(true);
  };

  const handleCloseNotification = () => {
    setNotificationVisible(false);
  };

  const handlePayment = (plan: IPlan) => {
    console.log({ plan });
    setPlanToPurchase(plan);
  };

  const handleTopUpSuccess = () => {
    const routeType = "top-up-success";

    router.push(`/feedback/success?type=${encodeURIComponent(routeType)}`);
  };

  // const handleTopUpPending = () => {
  //   const routeType = "top-up-pending";

  //   router.push(`/feedback/pending?type=${encodeURIComponent(routeType)}`);
  // };

  // const handleTopUpError = () => {
  //   const routeType = "top-up-error";

  //   router.push(`/feedback/error?type=${encodeURIComponent(routeType)}`);
  // };

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
        className="bg-whiteBg lg:bg-white border border-transparent lg:border-gray-200 rounded-[10px] h-screen lg:h-[96vh] pt-10 lg:pt-20  overflow-y-scroll relative outline-none"
        paddingHorizontal="px-0 lg:px-8"
      >
        <div className="w-full h-full items-start justify-start  mb-24 lg:mb-32 ">
          {/** HEADER AREA */}
          <div className="w-full hidden lg:flex items-start justify-between ">
            <div className="w-full flex flex-col items-start justify-start">
              <div
                className=" p-1 cursor-pointer"
                onClick={() => router.back()}
              >
                <p className="font-normal text-sm text-black">Back home</p>
              </div>
              <p className="font-semibold text-xl text-black">
                Top-up your eSim
              </p>
            </div>

            <div className="cursor-pointer" onClick={handleBellClick}>
              <Bell />
            </div>
          </div>

          <Divider className="absolute w-full mt-4 left-0" />

          <div className="mt-6  ">
            <div className="flex flex-col lg:hidden my-3 px-4">
              <p className="font-medium text-xl text-black">Top up your eSIM</p>

              <div className="w-full flex items-center justify-start space-x-2 mt-3">
                <TriangleAlert size={14} className="text-red-600" />
                <p className="text-black font-light text-[12px]">
                  Your data balance is below 10%.{" "}
                  <span className="font-medium">Top-up now!</span>
                </p>
              </div>
            </div>{" "}
            <DashboardInfoCard
              hideButtons
              showDataBalanceAlert
              className="rounded-none lg:rounded-[10px] lg:w-full self-center"
            />
          </div>

          <div className="bg-gray-50 rounded-xl flex items-center justify-between px-4 py-2 w-full my-4">
            <p className="text-base font-medium text-gray-700">
              Choose a data plan
            </p>
            <p className="text-sm font-light text-black underline">
              Change currency
            </p>
          </div>

          <div className="w-full pb-16 px-4 lg:px-0">
            <DataPlanList
              handlePayment={handlePayment}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />

            {planToPurchase ? (
              <div className="w-full flex items-start justify-start mb-5 mt-10">
                <PrimaryButton
                  onClick={handleTopUpSuccess}
                  className="bg-orange w-full lg:w-[322px] !rounded-[6px] lg:!rounded-[10px] !h-12"
                >
                  <span>Pay now</span>
                </PrimaryButton>
              </div>
            ) : null}
          </div>
        </div>
      </Container>{" "}
      <NotificationTab
        isVisible={isNotificationVisible}
        onClose={handleCloseNotification}
      />
    </>
  );
};

export default TopUpScreen;
