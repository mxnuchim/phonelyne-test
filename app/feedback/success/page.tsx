"use client";
import React, { useEffect, useState } from "react";
import BackButton from "@/components/shared/BackButton";
import Container from "@/components/shared/Container";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/NavBar";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { useRouter, useSearchParams } from "next/navigation";

const TopUpSuccess = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [type, setType] = useState<string | null>(null);

  useEffect(() => {
    setType(searchParams.get("type"));
  }, [searchParams]);

  const getCommonValues = (type: string | null) => {
    switch (type?.toLowerCase()) {
      case "top-up-success":
        return {
          message: "Top-up complete!",
          messageBody:
            "Your eSIM is all topped up and your data is ready to use. Check your balance in the dashboard.",
          buttonText: "Go to dashboard",
          redirectUrl: "/dashboard",
        };
      case "buy-esim-success":
        return {
          message: "Purchase Successful!",
          messageBody:
            "Your new eSIM is ready! Follow the instructions in your email to install and start using it now.",
          buttonText: "Go to dashboard",
          redirectUrl: "/dashboard",
        };
      default:
        return {
          message: "Success!",
          messageBody:
            "Go to your dashboard to manage your eSIM, track your data usage, view your history, and more.",
          buttonText: "Go to dashboard",
          redirectUrl: "/dashboard",
        };
    }
  };

  const { message, messageBody, buttonText, redirectUrl } =
    getCommonValues(type);

  const onProceed = () => {
    router.push(redirectUrl);
  };

  return (
    <>
      <Navbar type="auth" className="!bg-whiteBg" logoType="dark" />

      <Container className="bg-whiteBg flex flex-grow !items-start !justify-center min-h-screen pt-12">
        <div className="w-full max-w-full lg:max-w-[90%]">
          <div className="w-full flex justify-start items-start">
            <BackButton />
          </div>

          <div className="flex flex-col items-center justify-center text-center w-full mt-[15%] space-y-6">
            <h1 className="text-xl sm:text-2xl font-semibold text-black w-1/2">
              {message}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-gray700 mb-6 font-medium w-full lg:w-1/2">
              {messageBody}
            </p>

            {/* Login Button */}
            <PrimaryButton
              className="bg-orange !w-[279px] !h-10 !mt-8 !rounded-[10px]"
              onClick={onProceed}
            >
              <span>{buttonText}</span>
            </PrimaryButton>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default TopUpSuccess;
