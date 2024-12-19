"use server";

import { appConfig } from "@/config/config";
import { CreateUserParams, IResponse, LoginUserParams } from "@/types";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

const { BASE_URL, authTokenKey } = appConfig;

export const verifyLink = async (token: string): Promise<IResponse> => {
  try {
    // Construct the URL with URLSearchParams
    const url = new URL(`${BASE_URL}/auth/verify-link`);
    const params = new URLSearchParams();
    params.append("token", token);
    url.search = params.toString(); // Set the search parameters

    // console.log("Hitting endpoint -->", url);

    const response = await axios.get(url.toString());

    // console.log(response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error verifying link:", error);
    return {
      success: false,
      message: "An unexpected error occurred.",
      data: undefined,
    };
  }
};

export const createUser = async (
  params: CreateUserParams
): Promise<IResponse> => {
  try {
    // Construct the URL with URLSearchParams
    const url = `${BASE_URL}/auth/signup`;

    console.log("Hitting endpoint -->", url);

    console.log(JSON.stringify(params, null, 2));

    const response = await axios.post(url, params, {});

    console.log(response.data);

    const cookiesStore = cookies();
    (await cookiesStore).set(authTokenKey, response?.data?.accessToken, {
      httpOnly: true,
      secure: true,
      expires: new Date("Fri, 31 Dec 9999 23:59:59 GMT"),
    });
    await new Promise((resolve) => setTimeout(resolve, 100));

    return { success: true, data: response.data };
  } catch (error: unknown) {
    console.log("Error creating user:", error);
    // Type narrowing to access properties safely
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message || "An unexpected error occurred.",
        data: error instanceof AxiosError ? error.response?.data : null, // if using axios
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred.",
      data: null,
    };
  }
};

export const loginUser = async (
  params: LoginUserParams
): Promise<IResponse> => {
  try {
    // Construct the URL with URLSearchParams
    const url = `${BASE_URL}/auth/login`;

    console.log(JSON.stringify(params, null, 2));

    const response = await axios.post(url, params, {});

    console.log("Setting cookie to --> ", response?.data?.accessToken);
    const cookiesStore = cookies();
    (await cookiesStore).set(authTokenKey, response?.data?.accessToken, {
      httpOnly: true,
      secure: true,
      expires: new Date("Fri, 31 Dec 9999 23:59:59 GMT"),
    });
    await new Promise((resolve) => setTimeout(resolve, 100));

    console.log("Login response-->", JSON.stringify(response.data, null, 2));

    return { success: true, data: response.data };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log("Error logging in:", error?.response?.data);

      return {
        success: false,
        message:
          error.response?.data?.message || "An unexpected error occurred.",
        data: error.response?.data,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred.",
      data: null,
    };
  }
};

export const sendResetPasswordLink = async (
  email: string
): Promise<IResponse> => {
  try {
    const url = `${BASE_URL}/auth/send-link?reason=reset`;

    // console.log("Hitting endpoint -->", url);

    const response = await axios.post(
      url,
      { email },
      {
        headers: {},
      }
    );

    console.log("Send reset password link response --> ", response.data);
    return {
      success: true,
      message: "Sent reset password link successfully",
      data: response.data,
    };
  } catch (error) {
    console.error("Error verifying link:", error);
    return {
      success: false,
      message: "An unexpected error occurred.",
      data: undefined,
    };
  }
};

export const resetUserPassword = async (
  email: string,
  newPassword: string
): Promise<IResponse> => {
  try {
    const url = `${BASE_URL}/auth/reset-password`;

    // console.log("Hitting endpoint -->", url);

    const response = await axios.post(
      url,
      { email, newPassword },
      {
        headers: {},
      }
    );

    console.log("Reset password response --> ", response.data);
    return {
      success: true,
      message: "Password Reset successfully",
      data: response.data,
    };
  } catch (error) {
    console.error("Error resetting password:", error);
    return {
      success: false,
      message: "An unexpected error occurred.",
      data: undefined,
    };
  }
};
