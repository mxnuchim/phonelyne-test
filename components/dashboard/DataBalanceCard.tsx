"use client";
import React from "react";
import Globe from "../icons/Globe";
import { TriangleAlert } from "lucide-react";

const DataBalanceCard = () => {
  return (
    <div className="bg-black rounded-[10px] max-h-[162px] w-full lg:w-[320px] 2xl:w-[400px] p-4 flex flex-col items-start justify-start">
      <div className="bg-[#434343]/40 rounded-[10px] flex items-center justify-center space-x-2 px-3 py-2 ">
        <Globe />
        <p className="font-medium text-xs text-white capitalize">
          Data balance
        </p>
      </div>
      <div className="flex items-center justify-between w-full mt-3">
        <p className="font-light text-sm text-gray-300 uppercase">5gb</p>
        <p className="font-medium text-sm text-white uppercase">10gb</p>
      </div>

      <div className="w-full flex mt-3">
        {/* <ProgressBar
          completed={68}
          customLabel=""
          bgColor={"#FA5D00"}
          baseBgColor={"#B4B4B438"}
          height="10px"
          isLabelVisible={false}
          className={"w-full "}
          barContainerClassName={""}
          completedClassName={""}
          labelClassName={""}
        /> */}
      </div>
      <div className="w-full flex items-center justify-center space-x-2 mt-3">
        <TriangleAlert size={14} className="text-red-600" />
        <p className="text-white font-light text-xs lg:text-[10px]">
          Your data balance is below 10%.{" "}
          <span className="font-medium">Top-up now!</span>
        </p>
      </div>
    </div>
  );
};

export default DataBalanceCard;
