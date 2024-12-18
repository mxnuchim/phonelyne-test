"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import DataPlanList from "@/components/dashboard/DataPlanList";
import Bell from "@/components/icons/Bell";
import Container from "@/components/shared/Container";
import Divider from "@/components/shared/Divider";
import Navbar from "@/components/shared/NavBar";
import NotificationTab from "@/components/shared/NotificationTab";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { IPlan } from "@/types";
import SelectESIMPlanHeader from "@/components/sims/SelectESIMPlanHeader";
import BuyESimPlanModal from "@/components/modal/BuyESimPlanModal";
import CurrencyDropdown from "@/components/shared/CurrencyDropdown";

const SelectESIMPlan = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [buyPlanModalOpen, setBuyPlanModalOpen] = useState(false);
  const [planToPurchase, setPlanToPurchase] = useState<IPlan | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [eSimPurchaseInfo, setESimPurchaseInfo] = useState<unknown>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");

  console.log({ selectedCurrency });

  const type: "local" | "regional" =
    (searchParams.get("type") as "local" | "regional") || "local";
  const continent = searchParams.get("continent");
  const country = searchParams.get("country");
  const flag = searchParams.get("flag");
  const color = searchParams.get("color");
  //   const coverage = searchParams.get("coverage");
  //   const priceRange = searchParams.get("priceRange");

  //   console.log("Buy eSIM Parameters --> ", {
  //     type,
  //     continent,
  //     country,
  //     flag,
  //     color,
  //     coverage,
  //     priceRange,
  //   });

  const handleBellClick = () => {
    setNotificationVisible(true);
  };

  const handleCloseNotification = () => {
    setNotificationVisible(false);
  };

  const handlePayment = (plan: IPlan) => {
    // console.log({ plan });
    setPlanToPurchase(plan);
    setBuyPlanModalOpen(true);
  };

  const handleTopUpSuccess = () => {
    const routeType = "buy-esim-success";

    router.push(`/feedback/success?type=${encodeURIComponent(routeType)}`);
  };

  // const handleTopUpPending = () => {
  //   const routeType = "buy-esim-pending";

  //   router.push(`/feedback/pending?type=${encodeURIComponent(routeType)}`);
  // };

  // const handleTopUpError = () => {
  //   const routeType = "buy-esim-error";

  //   router.push(`/feedback/error?type=${encodeURIComponent(routeType)}`);
  // };

  const handleProceed = (info: unknown) => {
    // console.log({ info });
    setESimPurchaseInfo(info);
    setBuyPlanModalOpen(false);
    setPlanToPurchase(null);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleCurrencyChange = (currencyCode: string) => {
    setSelectedCurrency(currencyCode);
    console.log("Selected currency:", currencyCode);
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
        className="bg-whiteBg lg:bg-white border border-transparent lg:border-gray-200 rounded-[10px] h-screen lg:h-[96vh] pt-10 lg:pt-20  overflow-y-scroll relative outline-none"
        paddingHorizontal="px-0 lg:px-8"
      >
        <div className="w-full h-full items-start justify-start  mb-24 lg:mb-32 ">
          {/** HEADER AREA */}
          <div className="w-full hidden lg:flex items-start justify-between  ">
            <div className="w-full flex flex-col items-start justify-start">
              <div
                className=" p-1 cursor-pointer"
                onClick={() => router.back()}
              >
                <p className="font-normal text-sm text-black">Go back</p>
              </div>
              <p className="font-semibold text-xl text-black">Buy new eSIM</p>
            </div>

            <div className="cursor-pointer" onClick={handleBellClick}>
              <Bell />
            </div>
          </div>

          <Divider className="absolute w-full mt-4 left-0" />

          <SelectESIMPlanHeader
            country={country || ""}
            continent={continent || ""}
            flag={flag || ""}
            color={color || ""}
            type={type || ""}
          />

          <div className="bg-gray-50 rounded-xl flex items-center justify-between px-4 py-2 w-full my-4 relative ">
            <p className="text-base font-medium text-gray-700">
              Choose a data plan
            </p>
            <p
              className="text-sm font-light text-black underline cursor-pointer"
              onClick={toggleDropdown}
            >
              Change currency
            </p>

            {isDropdownOpen ? (
              <CurrencyDropdown
                isOpen={isDropdownOpen}
                onSelect={handleCurrencyChange}
                onClose={toggleDropdown}
              />
            ) : null}
          </div>

          <div className="w-full pb-16 px-4 lg:px-0">
            <DataPlanList
              handlePayment={handlePayment}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />

            {eSimPurchaseInfo ? (
              <div className="w-full flex items-start justify-start mb-5 mt-10">
                <PrimaryButton
                  onClick={handleTopUpSuccess}
                  className="bg-orange w-full lg:w-[202px] !rounded-[6px] lg:!rounded-[10px] !h-12"
                >
                  <span>Buy eSIM</span>
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
      <BuyESimPlanModal
        isOpen={buyPlanModalOpen}
        destination={country || continent || ""}
        dataPlan={planToPurchase}
        onClose={() => {
          setBuyPlanModalOpen(!buyPlanModalOpen);
          setPlanToPurchase(null);
        }}
        onProceed={handleProceed}
      />
    </>
  );
};

export default SelectESIMPlan;
