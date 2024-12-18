"use client";
import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  CirclePlus,
  Search,
  TriangleAlert,
  X,
} from "lucide-react"; // For dropdown arrow icon
import PrimaryButton from "../shared/PrimaryButton";
import USFlag from "../icons/USFlag";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/app/store/store";
import {
  getEsimsAction,
  getProviderCapabilitiesAction,
} from "@/app/actions/accountActions";
import { IESIM, IProviderCapability } from "@/types";
import Loader from "../shared/Loader";

interface DashboardInfoCardProps {
  className?: string;
  hideButtons?: boolean;
  showDataBalanceAlert?: boolean;
}

const DashboardInfoCard: React.FC<DashboardInfoCardProps> = ({
  className,
  hideButtons = false,
  showDataBalanceAlert = false,
}) => {
  const router = useRouter();
  const { eSIMs, setEsims } = useAppStore();
  const [selectedEsim, setSelectedEsim] = useState<IESIM | undefined>(eSIMs[0]);
  const [loading, setLoading] = useState(false);
  const [providerCapabilitiesLocal, setProviderCapabilitiesLocal] = useState<
    IProviderCapability[] | undefined
  >();
  const {
    user,
    setProviderCapabilities,

    setSelectedEsim: setSelectedEsimGlobal,
  } = useAppStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getUserEsims = async () => {
      const { data, success, message } = await getEsimsAction();

      if (!success) {
        console.log("Error fetching eSIMs --> ", { data, message });
        return;
      }

      console.log("User eSIMs --> ", JSON.stringify(data, null, 2));
      setEsims(data);
      setSelectedEsim(data?.[0]);
      setSelectedEsimGlobal(data?.[0]);
    };

    getUserEsims();
  }, []);

  useEffect(() => {
    if (!selectedEsim) {
      // console.log("No Selected eSIM");
      return;
    }

    const fetchProviderCapabilitiesForEsim = async () => {
      setLoading(true);
      const { success, data } = await getProviderCapabilitiesAction(
        selectedEsim?.provider?.name
      );

      // console.log(
      //   "Provider Capabilities for Selected eSIM --> ",
      //   JSON.stringify(data, null, 2)
      // );

      if (!success) {
        // console.log("Error fetching provider capabilities --> ", data);
        // toast.error("Error fetching provider capabilities");
        return;
      }

      // toast.success("Fetched Provider Capabilities");

      setProviderCapabilities(data);
      setProviderCapabilitiesLocal(data);
      setLoading(false);
    };

    fetchProviderCapabilitiesForEsim();
  }, [selectedEsim]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const hasCapability = (capabilityName: string) =>
    providerCapabilitiesLocal?.some(
      (capability) =>
        capability?.capability?.name?.toLowerCase() ===
        capabilityName?.toLowerCase()
    );

  const hasBuyEsimCapability = hasCapability("Buy eSIM");
  const hasTopUpEsimCapability = hasCapability("Top-up eSim");
  // const hasGetPlanExpirationCapability = hasCapability("Get Plan Expiration");
  const hasDeactivateEsimCapability = hasCapability("Deactivate eSIM");

  // console.log("User eSIMs --> ", JSON.stringify(eSIMs, null, 2));

  return (
    <>
      {loading ? <Loader /> : null}
      <div
        className={`bg-black shadow-md rounded-[10px] p-4 sm:p-6 w-full flex flex-col lg:flex-row items-center justify-between ${className}`}
      >
        <div className="w-full flex flex-row lg:flex-col items-center lg:items-start justify-between lg:justify-start">
          <div className="flex relative items-center space-x-2 mb-0 lg:mb-3">
            <div className="h-5 lg:h-8 w-5 lg:w-8 rounded-full overflow-hidden">
              <USFlag />
            </div>

            <p
              onClick={toggleDropdown}
              className="text-base text-nowrap lg:text-2xl sm:text-xl font-medium cursor-pointer"
            >
              {selectedEsim?.name
                ? selectedEsim?.name
                : user?.first_name
                ? `${user?.first_name + "'s eSIM"}`
                : ""}
            </p>

            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-1 text-sm sm:text-base"
            >
              <ChevronDown size={16} />
            </button>

            {isDropdownOpen ? (
              <div className="absolute top-full mt-2 w-[290px] bg-white border border-gray-200 rounded-[16px] shadow-lg p-5">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-lg font-medium text-black">
                    My eSIMs
                  </span>
                  <button
                    onClick={() => {
                      toggleDropdown();
                      setSearchQuery("");
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="relative mb-4">
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type="text"
                    placeholder="Search for a SIM"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-1 border rounded-[8px] outline-none border-gray-200 text-sm text-black"
                  />
                </div>

                {eSIMs && eSIMs.length > 0 ? (
                  eSIMs?.map((device, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-2 hover:bg-[#FFA06C29]/20 rounded-xl cursor-pointer"
                      onClick={() => {
                        setSelectedEsim(device);
                        setSelectedEsimGlobal(device);
                        toggleDropdown();
                        setSearchQuery("");
                      }}
                    >
                      <div className="h-5 lg:h-7 w-5 lg:w-7 border-2 border-black rounded-full overflow-hidden">
                        <USFlag />
                      </div>
                      <p className="text-base lg:text-base font-medium text-black">
                        {device?.name ||
                          `${user?.first_name || ""}'s eSIM ${index + 1}`}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="p-2 text-gray-500">No devices found</p>
                )}
              </div>
            ) : null}
          </div>
          <div className="flex items-center justify-center gap-x-3">
            <div className="flex rounded-[10px] items-center justify-center bg-white px-3 py-1 max-w-[83px] lg:max-w-[132px]">
              <p className="text-black text-xs lg:text-sm  font-medium flex-nowrap text-nowrap">
                123-456-789
              </p>
            </div>
            <div className="flex rounded-[10px] items-center justify-center bg-[#FFE0D2] px-3 py-1 max-w-[48px] lg:max-w-[86px]">
              <p className="text-black text-xs lg:text-sm  font-medium flex-nowrap text-nowrap">
                Active
              </p>
            </div>
          </div>
        </div>

        {hideButtons ? null : (
          <div className="mt-5 lg:mt-0 flex w-full items-start lg:items-end justify-center lg:justify-end space-x-4">
            {hasTopUpEsimCapability ? (
              <PrimaryButton
                onClick={() => router.push("/top-up")}
                className="bg-orange w-[76px] lg:w-[135px] !rounded-[6px] !lg:rounded-[10px] !h-9"
              >
                <CirclePlus size={20} className="hidden lg:flex" />
                <span>Top up</span>
              </PrimaryButton>
            ) : null}
            {hasBuyEsimCapability ? (
              <PrimaryButton
                className="bg-orange border border-gray-700 w-[122px] lg:w-[180px] !rounded-[6px] !lg:rounded-[10px] !h-9"
                onClick={() => router.push("/buy-esim")}
              >
                <CirclePlus size={20} className="hidden lg:flex" />
                <span>Buy new eSIM</span>
              </PrimaryButton>
            ) : null}
            {hasDeactivateEsimCapability ? (
              <PrimaryButton className="bg-gray-900 border border-gray-700 w-[136px] lg:w-[202px] !rounded-[6px] !lg:rounded-[10px] !h-9">
                <CirclePlus size={20} className="hidden lg:flex" />
                <span>Deactivate eSIM</span>
              </PrimaryButton>
            ) : null}
          </div>
        )}

        {showDataBalanceAlert ? (
          <div className="mt-5 lg:mt-0 hidden lg:flex w-full items-start lg:items-end justify-center lg:justify-end space-x-4">
            <div className="w-full flex items-end justify-end space-x-2 mt-3">
              <TriangleAlert size={14} className="text-red-600" />
              <p className="text-white font-light text-xs lg:text-[12px]">
                Your data balance is below 10%.{" "}
                <span className="font-medium">Top-up now!</span>
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DashboardInfoCard;
