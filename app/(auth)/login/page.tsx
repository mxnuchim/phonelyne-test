"use client";
import { useRouter } from "next/navigation";
import Container from "@/components/shared/Container";
import PrimaryButton from "@/components/shared/PrimaryButton";
import TextInput from "@/components/shared/Input";
import Image from "next/image";
import React, { useState } from "react";
import LogoDark from "@/components/icons/logo/LogoDark";
import { LoginUserParams } from "@/types";
import { loginUser } from "@/app/actions/authActions";
import Loader from "@/components/shared/Loader";
import { useAppStore } from "@/app/store/store";
import { loginImg } from "@/public/assets/svgs";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const { setUser, setUserId, setToken } = useAppStore();

  const handleLogin = async () => {
    setLoading(true);
    const params: LoginUserParams = { email: email, password: password };

    const loginUserResponse = await loginUser(params);

    setTimeout(() => {}, 100);

    if (!loginUserResponse.success) {
      console.log("Error logging in user");

      setLoginError(loginUserResponse.message || "An unexpected error occured");
      setLoading(false);
      return;
    }

    console.log(
      "Login response-->",
      JSON.stringify(loginUserResponse, null, 2)
    );

    setUser(loginUserResponse?.data?.user);
    setUserId(loginUserResponse?.data?.user?.id);
    setToken(loginUserResponse?.data?.accessToken);

    setLoading(false);

    router.push("/dashboard");
  };

  const handleForgotPassword = () => {
    router?.push("/forgot-password");
  };

  return (
    <Container className="bg-whiteBg">
      {loading ? <Loader /> : null}
      <div className="flex flex-col lg:flex-row w-full h-full">
        {/* Left Container with Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-start items-start px-0 md:px-8 py-8">
          {/* Logo */}
          <div className="">
            <LogoDark />
          </div>

          {/* Form Content */}
          <div className="w-full h-full flex flex-col items-start justify-center mt-6 lg:mt-0">
            {/* Welcome Title */}
            <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-black">
              Welcome
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-gray700 mb-6 font-medium">
              Log in to manage your eSIM, track your data usage, and stay
              connected anywhere you travel.
            </p>

            {/* Email Input */}
            <TextInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Handle input change
              className="mb-4"
              required
            />

            {/* Password Input */}
            <TextInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Handle input change
              className="mb-4"
              required
            />

            {loginError ? (
              <div className="w-full my-4 flex items-start justify-start">
                <p className="text-sm font-regular text-red-500">
                  {loginError}
                </p>
              </div>
            ) : null}

            {/* Forgot Password */}
            <button
              className="mb-7 mt-4 sm:mt-10"
              onClick={handleForgotPassword}
            >
              <p className="text-gray700 text-sm sm:text-base font-medium">
                Forgot password?
              </p>
            </button>

            {/* Login Button */}
            <PrimaryButton
              className="bg-orange !w-[129px] !h-10"
              onClick={handleLogin}
            >
              <span>Login</span>
            </PrimaryButton>
          </div>
        </div>

        {/* Right Container with Image */}
        <div className="w-full hidden lg:flex lg:w-1/2 h-64 lg:h-full relative mt-8 lg:mt-0">
          <Image
            src={loginImg}
            alt="Login Image"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
      </div>
    </Container>
  );
};

export default Login;
