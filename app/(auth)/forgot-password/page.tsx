"use client";
import Container from "@/components/shared/Container";
import React, { useState } from "react";
import TextInput from "@/components/shared/Input"; // Assuming TextInput is a custom input component
import PrimaryButton from "@/components/shared/PrimaryButton"; // Assuming PrimaryButton is your custom button
import LogoDark from "@/components/icons/logo/LogoDark";
import SendResetLinkModal from "@/components/modal/SendResetLinkModal";
import { sendResetPasswordLink } from "@/app/actions/authActions";
import Loader from "@/components/shared/Loader";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [apiError, setApiError] = useState<string | undefined>("");
  const [inputError, setInputError] = useState<string | undefined>("");
  const [isResetLinkModalOpen, setIsResetLinkModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResendEmail = () => {
    setIsResetLinkModalOpen(false);
    handleSendResetPasswordLink();
  };

  const onProceed = () => {
    setEmail("");
    setIsResetLinkModalOpen(false);
    // router.push("/reset-password");
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendResetPasswordLink = async () => {
    if (!email) {
      setInputError("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      setInputError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setApiError("");
    setInputError(""); // Clear input error if email is valid

    try {
      const sendResetPasswordLinkResponse = await sendResetPasswordLink(email);
      console.log({ sendResetPasswordLinkResponse });
      if (sendResetPasswordLinkResponse.success) {
        setIsResetLinkModalOpen(true);
      } else {
        setApiError(sendResetPasswordLinkResponse?.message);
      }
    } catch (error) {
      setApiError("An error occurred. Please try again later.");
      console.log("Error --> ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="bg-whiteBg pt-28 lg:pt-0">
      {loading ? <Loader /> : null}
      <div className="flex flex-col items-center justify-start lg:justify-center w-full max-w-xl h-full mb-0 lg:mb-[15%] px-0 lg:px-8">
        {/* Logo on the top left */}
        <div className="absolute top-6 sm:top-10 left-6 sm:left-10">
          <LogoDark />
        </div>

        {/* Title and Subtitle */}
        <div className="text-left lg:text-center w-full">
          <h1 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-10 text-black">
            Forgot Password?
          </h1>
          <p className="text-sm sm:text-base text-gray700 mb-4 sm:mb-6 font-medium">
            No worries! Enter your email below, and we&apos;ll help you reset
            it. Check your inbox for further instructions, and you&apos;ll be
            back online in no time.
          </p>
        </div>

        {/* Email Input */}
        <div className="w-full mt-6 sm:mt-8">
          <TextInput
            label="Email address"
            type="email"
            placeholder="Enter your email"
            value={email}
            error={inputError || apiError}
            onChange={(e) => {
              setEmail(e.target.value);
              setInputError(""); // Clear input error on change
            }}
            className="mb-4"
            required
          />
        </div>

        {/* Continue Button */}
        <div className="mt-6 flex items-start w-full">
          <PrimaryButton
            className="bg-orange w-[188px] lg:w-[129px] h-10"
            onClick={handleSendResetPasswordLink}
          >
            <span>Continue</span>
          </PrimaryButton>
        </div>
      </div>

      <SendResetLinkModal
        isOpen={isResetLinkModalOpen}
        onClose={() => setIsResetLinkModalOpen(!isResetLinkModalOpen)}
        handleResendEmail={handleResendEmail}
        onProceed={onProceed}
      />
    </Container>
  );
};

export default ForgotPassword;
