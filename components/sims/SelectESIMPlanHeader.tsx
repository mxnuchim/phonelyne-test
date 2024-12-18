import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SelectESIMPlanVector from "../vectors/selectPlanVector";
import SelectPlanVectorDesktop from "../vectors/selectPlanVectorDesktop";
import { ChevronRight, Smartphone } from "lucide-react";
import PrimaryButton from "../shared/PrimaryButton";
import CountryListModal from "../modal/CountryListModal";

interface HeaderSectionProps {
  country?: string;
  continent?: string;
  flag?: string;
  color?: string;
  type?: string;
}

const SelectESIMPlanHeader: React.FC<HeaderSectionProps> = ({
  country,
  continent,
  flag,
  color,
  type,
}) => {
  const router = useRouter();
  const [countryListModalOpen, setCountryListModalOpen] = useState(false);

  const toggleCountryListModal = () => {
    setCountryListModalOpen(!countryListModalOpen);
  };

  return (
    <div className="mt-6 h-[304px] lg:h-[250px] bg-blackBg2 rounded-none lg:rounded-[30px] relative overflow-hidden flex items-center justify-center">
      <div className="absolute flex lg:hidden bottom-0 right-0 opacity-10">
        <SelectESIMPlanVector />
      </div>
      <div className="hidden lg:flex absolute bottom-0 right-0 opacity-10">
        <SelectPlanVectorDesktop />
      </div>
      <div className="w-full flex justify-between relative z-10 text-white pt-7 lg:pt-0 px-4 lg:px-8">
        <div className="flex flex-col w-full lg:w-[70%]">
          <div className="flex w-full items-center justify-start flex-nowrap space-x-2">
            <h3 className="text-white font-medium text-[15px]">
              Destination plans
            </h3>
            <ChevronRight size={16} color="#fff" />
            <h3 className="text-white font-semibold text-[15px]">
              {country || continent} plans
            </h3>
          </div>

          <div className="flex w-full items-center justify-start flex-nowrap space-x-2 mt-2">
            {country ? (
              <Image
                src={flag || ""}
                alt={`${country} flag`}
                className="object-cover w-6 h-6 lg:w-8 lg:h-8 rounded-full"
                width={28}
                height={28}
                quality={90}
                objectFit="cover"
              />
            ) : continent ? (
              <div
                className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full`}
                style={{ backgroundColor: color || "#FFE0D2" }}
              />
            ) : null}

            <h3 className="text-white font-medium text-[20px]">
              {country || continent || "Destination"}
            </h3>
          </div>

          <div className="mt-4 w-full max-w-[590px] flex flex-wrap">
            <p className="text-white font-normal text-sm lg:text-base">
              Explore {country || continent || "this destination"} with
              flexibility using our eSIM data plans. Whether you&apos;re
              visiting for a short stay or an extended trip, our plans keep you
              connected without the hassle.
            </p>
          </div>
          {type === "regional" && (
            <div
              className="mt-4 w-full flex flex-nowrap cursor-pointer"
              onClick={toggleCountryListModal}
            >
              <p className="text-white font-light text-sm lg:text-base underline">
                Country list
              </p>
            </div>
          )}

          <div className="mt-4 w-full flex lg:hidden">
            <PrimaryButton
              onClick={() => router.push("/buy-esim/check-compatibility")}
              className="bg-white !w-[180px] lg:w-[170px] !rounded-[6px] !lg:rounded-[10px] !h-9"
            >
              <Smartphone size={18} className="flex text-black" />
              <span className="text-black font-medium text-sm">
                Check compatibility
              </span>
            </PrimaryButton>
          </div>
        </div>

        <div className="mt-4 w-[30%] hidden lg:flex items-center justify-end">
          <PrimaryButton
            onClick={() => router.push("/buy-esim/check-compatibility")}
            className="bg-white !w-[210px] !rounded-full !h-9"
          >
            <Smartphone size={18} className="flex text-black" />
            <span className="text-black font-medium text-sm">
              Check compatibility
            </span>
          </PrimaryButton>
        </div>
      </div>

      <CountryListModal
        isOpen={countryListModalOpen}
        onClose={toggleCountryListModal}
        onProceed={() => {}}
      />
    </div>
  );
};

export default SelectESIMPlanHeader;
