"use client";
import React, { useState } from "react";
import CenterModal from "./CenterModal";
import PrimaryButton from "../shared/PrimaryButton";
import { IPlan } from "@/types";
import { Banknote, Calendar } from "lucide-react";
import PlanDetailItem from "../dashboard/DataPlanDetailItem";
import Counter from "../shared/CustomCounter";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: (info: unknown) => void;
  destination: string;
  dataPlan: IPlan | null;
  className?: string;
}

const BuyESimPlanModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  className,
  onProceed,
  destination,
  dataPlan,
}) => {
  const [amount, setAmount] = useState(1);

  const handleAmountChange = (amount: number) => {
    setAmount(amount);
  };

  return (
    <CenterModal
      isOpen={isOpen}
      onClose={onClose}
      className={`w-[530px] h-[465px] !rounded-[20px] !p-0 overflow-hidden  border border-gray-200 ${className}`}
    >
      <div className="w-full h-full flex flex-1 flex-col">
        <div className=" w-full h-16 flex items-center justify-start px-6 space-x-3 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-black">
            Buy new {destination} eSIM
          </h2>
        </div>

        <div className="px-6 py-[3%] w-full flex items-center justify-start">
          <p className="text-sm font-medium text-black">
            You&apos;ve selected the data plan {dataPlan?.size}
          </p>
        </div>

        <div className="w-full mb-2 flex items-center justify-center px-4">
          <ul className="w-full text-sm space-y-3 py-4 bg-gray-100 rounded-[20px] px-4">
            <span className="text-black text-xl font-medium mb-4">
              {dataPlan?.size}
            </span>
            <PlanDetailItem
              label="Price"
              value={dataPlan ? dataPlan.price : ""}
              icon={<Banknote size={16} className="text-orange" />}
            />
            <PlanDetailItem
              label="Validity"
              value={dataPlan ? dataPlan.validity : ""}
              icon={<Calendar size={16} className="text-orange" />}
            />
          </ul>
        </div>

        <div className="px-6 py-[5%] w-full flex flex-col items-start justify-start">
          <p className="text-sm mb-2 font-medium text-black">
            How many eSIMs would you like to purchase?
          </p>

          <div className="w-full flex items-center justify-between">
            <Counter initialCount={amount} onCountChange={handleAmountChange} />

            <div className="flex flex-col space-y-2 items-center">
              <span className="text-sm font-light text-black">Price</span>
              <span className="text-black text-lg font-medium">
                {dataPlan
                  ? `$${+dataPlan.price.replace("$", "") * +amount}`
                  : 0}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full mt-auto py-5 flex items-start justify-start px-6 space-x-3 border-t border-gray-200">
          <PrimaryButton
            onClick={onClose}
            className="bg-transparent w-[100px] lg:w-[150px] !rounded-[6px] !lg:rounded-[10px] !h-9 !shadow-none"
          >
            <span className="text-black text-sm text-medium">Cancel</span>
          </PrimaryButton>
          <PrimaryButton
            onClick={() =>
              onProceed({
                numberOfESIMs: amount,
                dataPlan,
                totalPrice: dataPlan
                  ? +dataPlan.price.replace("$", "") * +amount
                  : 0,
              })
            }
            className="bg-orange w-[100px] lg:w-[150px] !rounded-[6px] lg:!rounded-[10px] !h-9"
          >
            <span className="text-white text-sm font-medium">Buy</span>
          </PrimaryButton>
        </div>
      </div>{" "}
    </CenterModal>
  );
};

export default BuyESimPlanModal;
