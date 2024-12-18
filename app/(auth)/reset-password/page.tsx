"use client";

import Container from "@/components/shared/Container";
import React, { useEffect, useState } from "react";
import TextInput from "@/components/shared/Input"; // Assuming TextInput is a custom input component
import PrimaryButton from "@/components/shared/PrimaryButton"; // Assuming PrimaryButton is your custom button
import LogoDark from "@/components/icons/logo/LogoDark";
import { useRouter, useSearchParams } from "next/navigation";
import PasswordResetSuccessModal from "@/components/modal/PasswordResetSuccessModal";
import { resetUserPassword, verifyLink } from "@/app/actions/authActions";
import { IUser } from "@/types";
import Loader from "@/components/shared/Loader";

const ResetPassword: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>(""); // Typed as string
  const [error, setError] = useState<string | null>("");
  const [resetPasswordSuccessModalOpen, setResetPasswordSuccessModalOpen] =
    useState(false);
  const [tokenValidated, setTokenValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<IUser | null>(null);

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    console.log({ tokenFromUrl });

    async function verifyToken() {
      setLoading(true);
      const response = await verifyLink(tokenFromUrl || "");
      console.log({ response });

      if (!response || !response?.success) {
        console.log("Token Invalid --> ", { Error: response.message });
        setTokenValidated(false);
        return;
      }

      setTokenValidated(true);
      setUserData(response.data);
      setLoading(false);
    }

    verifyToken();
  }, []);

  // Handle form submission and validation
  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
    } else if (!tokenValidated) {
      setError("This token is invalid");
    } else {
      setError(null); // Clear error if valid

      setLoading(true);

      const response = await resetUserPassword(
        userData ? userData.email : "",
        password
      );
      console.log("Reset password response --> ", { response });

      if (!response || !response?.success) {
        console.log("Error resetting password --> ", {
          Error: response.message,
        });
        setError(response.message || "Something went wrong");
        setLoading(false);
        return;
      }

      setLoading(false);

      setResetPasswordSuccessModalOpen(!resetPasswordSuccessModalOpen);
    }
  };

  const onProceed = () => {
    router.push("/login");
  };

  console.log({ tokenValidated, userData });

  return (
    <Container className="bg-whiteBg pt-28 lg:pt-14">
      {loading ? <Loader /> : null}
      <div className="flex flex-col items-center justify-start lg:justify-center w-full max-w-xl h-full mb-0 lg:mb-[15%] px-0 lg:px-8">
        {/* Logo on the top left */}
        <div className="absolute top-6 sm:top-10 left-6 sm:left-10">
          <LogoDark />
        </div>

        {/* Title and Subtitle */}
        <div className="text-left lg:text-center w-full">
          <h1 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-10 text-black">
            Create new password
          </h1>
          <p className="text-sm sm:text-base text-gray700 mb-4 sm:mb-6 font-medium">
            Fill your details to continue your account process
          </p>
        </div>

        {/* Passwords Input */}
        <div className="w-full mt-6 sm:mt-8">
          {/* Password Input */}
          <TextInput
            label="Password"
            type="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className="mb-4"
            required
          />

          {/* Confirm Password Input */}
          <TextInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
            required
          />
        </div>

        {/* Validation Error Message */}
        {error && (
          <div className="w-full">
            <p className="text-red-500 mt-4 text-left">{error}</p>
          </div>
        )}

        {/* Continue Button */}
        <div className="mt-6 lg:mt-10 flex items-start w-full">
          <PrimaryButton
            className="bg-orange w-[188px] lg:w-[188px] h-10"
            onClick={handleResetPassword}
          >
            <span>Reset password</span>
          </PrimaryButton>
        </div>
      </div>

      <PasswordResetSuccessModal
        isOpen={resetPasswordSuccessModalOpen}
        onClose={() =>
          setResetPasswordSuccessModalOpen(!resetPasswordSuccessModalOpen)
        }
        onProceed={onProceed}
      />
    </Container>
  );
};

export default ResetPassword;
