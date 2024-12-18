"use client";
import BackButton from "@/components/shared/BackButton";
import Container from "@/components/shared/Container";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/NavBar";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { useRouter } from "next/navigation";
import React from "react";

const RegisterSuccess = () => {
  const router = useRouter();

  const onProceed = () => {
    router.push("/dashboard");
  };
  return (
    <>
      <Navbar type="auth" className="!bg-whiteBg" logoType="dark" />

      <Container className="bg-whiteBg flex flex-grow !items-start !justify-center min-h-screen pt-12">
        <div className=" w-full max-w-full lg:max-w-[90%]">
          <div className="w-full flex justify-start items-start">
            <BackButton />
          </div>

          <div className="flex flex-col items-center justify-center text-center w-full mt-[5%] space-y-6">
            <h1 className="text-xl sm:text-2xl font-semibold text-black w-1/2">
              Welcome to Phonelyne
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-gray700 mb-6 font-medium w-full lg:w-1/2">
              Your Phonelyne account has been successfully created. Go to your
              dashboard to manage your eSIM, track your data usage, view your
              transaction history, and more.
            </p>

            {/* Login Button */}
            <PrimaryButton
              className="bg-orange !w-[129px] !h-10 !mt-8"
              onClick={onProceed}
            >
              <span>Proceed</span>
            </PrimaryButton>
            <p className="text-xs text-gray700 mb-6 font-medium w-1/2">
              If you have any questions, feel free to{" "}
              <span className="text-purple300 font-medium">contact us.</span>
            </p>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default RegisterSuccess;
