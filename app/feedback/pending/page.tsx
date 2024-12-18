"use client";
import React, { useEffect, useState } from "react";
import BackButton from "@/components/shared/BackButton";
import Container from "@/components/shared/Container";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/NavBar";
import PrimaryButton from "@/components/shared/PrimaryButton";

import { useRouter, useSearchParams } from "next/navigation";

const TopUpPending = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [type, setType] = useState<string | null>(null);

  useEffect(() => {
    setType(searchParams.get("type"));
  }, [searchParams]);

  const getCommonValues = (type: string | null) => {
    switch (type?.toLowerCase()) {
      case "top-up-pending":
        return {
          message: "Hang tight!",
          messageBody:
            "We're processing your top-up. Just a little more patience, and you'll be good to go!",
          button1Text: "Go to dashboard",
          button2Text: "Refresh status",
          redirectUrl: "/dashboard",
        };
      default:
        return {
          message: "Your transaction is pending!",
          messageBody:
            "Go to your dashboard to manage your eSIM, track your data usage, view your history, and more.",
          button1Text: "Go to dashboard",
          button2Text: "Go to dashboard",
          redirectUrl: "/dashboard",
        };
    }
  };

  const { message, messageBody, button1Text, button2Text, redirectUrl } =
    getCommonValues(type);

  const handleButton2Press = () => {
    router.push(redirectUrl);
  };

  const onProceed = () => {
    router.push(redirectUrl);
  };

  return (
    <>
      <Navbar type="auth" className="!bg-whiteBg" logoType="dark" />

      <Container className="bg-whiteBg flex flex-grow !items-start !justify-center min-h-screen pt-12">
        <div className=" w-full max-w-full lg:max-w-[90%]">
          <div className="w-full flex justify-start items-start">
            <BackButton />
          </div>

          <div className="flex flex-col items-center justify-center text-center w-full mt-[15%] space-y-6">
            <h1 className="text-xl sm:text-2xl font-semibold text-black w-1/2">
              {message || "Success!"}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-gray700 mb-6 font-medium w-full lg:w-1/2">
              {messageBody ||
                "Go to your dashboard to manage your eSIM, track your data usage, view your history, and more."}
            </p>

            <div className="flex flex-col lg:flex-row w-full items-center justify-center space-x-5 space-y-5">
              <PrimaryButton
                className="bg-white !w-[279px] !h-10 !mt-8 !rounded-[10px]"
                onClick={onProceed}
              >
                <span className="text-black font-medium">
                  {button1Text || "Go to dashboard"}
                </span>
              </PrimaryButton>
              <PrimaryButton
                className="bg-orange !w-[279px] !h-10 !mt-8 !rounded-[10px]"
                onClick={handleButton2Press}
              >
                <span>{button2Text || "Refresh status"}</span>
              </PrimaryButton>
            </div>
            {/* <p className="text-xs text-gray700 mb-6 font-medium w-1/2">
              If you have any questions, feel free to{" "}
              <span className="text-purple300 font-medium">contact us.</span>
            </p> */}
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default TopUpPending;
