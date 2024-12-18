// PlanInfoCard.tsx
"use client";
import React, { useEffect, useState } from "react";
import Globe from "../icons/Globe";
import { getSubscriptionPlanAction } from "@/app/actions/accountActions";
import { useAppStore } from "@/app/store/store";

interface Props {
  className?: string;
}

const PlanInfoCard = ({ className }: Props) => {
  const { selectedESIM: selectedEsimGlobal } = useAppStore();
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = expirationDate.getTime() - now.getTime();

      // console.log({ difference });

      if (difference <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return; // Stop the countdown if the time is up
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    calculateTimeRemaining();

    const timer = setInterval(calculateTimeRemaining, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup on unmount
  }, [expirationDate]); // Removed expirationDate from the dependency array

  useEffect(() => {
    if (!selectedEsimGlobal) return;
    getPlanForESim();
  }, [selectedEsimGlobal]);

  const getPlanForESim = async () => {
    try {
      const { success, data } = await getSubscriptionPlanAction(
        selectedEsimGlobal?.id || undefined
      );

      if (success && data && data[0]?.expiry_date) {
        console.log("Fetched Plan:", JSON.stringify(data[0], null, 2));
        setExpirationDate(new Date(data[0]?.expiry_date));
      } else {
        console.warn("Failed to fetch or invalid plan data");
      }
    } catch (error) {
      console.error("Error fetching plan data:", error);
    }
  };

  return (
    <div
      className={`bg-lightPurple rounded-[10px] max-h-full lg:max-h-[162px] w-full lg:w-[400px] p-4 flex flex-col lg:flex-row items-start justify-start ${className}`}
    >
      <div className="bg-gray-200 rounded-[10px] flex items-center justify-center space-x-2 lg:space-x-1 px-3 py-2 lg:px-2 lg:py-1">
        <Globe type="dark" />
        <p className="font-medium text-xs lg:text-[10px] text-black capitalize flex-nowrap text-nowrap">
          Plan duration
        </p>
      </div>

      <div className="w-full flex items-center justify-center space-x-3 mt-3">
        <Countdown label="day" value={timeRemaining.days} />
        <Countdown label="hr" value={timeRemaining.hours} />
        <Countdown label="min" value={timeRemaining.minutes} />
        {/* <Countdown label="sec" value={timeRemaining.seconds} /> */}
      </div>
    </div>
  );
};

export default PlanInfoCard;

interface CountdownProps {
  label: string;
  value: number;
}

const Countdown: React.FC<CountdownProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-[3px] w-20 lg:w-16 max-h-[103px]">
      <div className="w-full flex items-center justify-center uppercase bg-black text-white rounded-[3px] border border-[#D2D2D24D]/40 h-12">
        {label}
      </div>
      <div className="w-full flex items-center justify-center uppercase bg-transparent text-white rounded-b-[3px] border border-[#D2D2D24D]/40 h-16">
        {value}
      </div>
    </div>
  );
};
