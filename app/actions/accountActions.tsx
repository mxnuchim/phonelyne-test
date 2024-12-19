"use server";

import { appConfig } from "@/config/config";
import { IResponse } from "@/types";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

const { BASE_URL, authTokenKey } = appConfig;

export const getEsimsAction = async (): Promise<IResponse> => {
  const cookiesStore = cookies();
  const authToken = (await cookiesStore).get(authTokenKey)?.value;

  try {
    const url = `${BASE_URL}/esim`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log("Get eSIMs response -->", response.data);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    console.error("Error fetching eSIMs:", error);

    if (error instanceof AxiosError) {
      console.log("Error fetching eSIMs --> ", error?.response?.data);

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

export const getProviderCapabilitiesAction = async (
  provider: string
): Promise<IResponse> => {
  const cookiesStore = cookies();
  const authToken = (await cookiesStore).get(authTokenKey)?.value;

  try {
    const url = `${BASE_URL}/capability?provider=${provider || "bics"}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log("Get Provider capabilities response --> ", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching esims:", error);
    return {
      success: false,
      message: "An unexpected error occurred.",
      data: undefined,
    };
  }
};

export const getTransactionHistoryAction = async (): Promise<IResponse> => {
  const cookiesStore = cookies();
  const authToken = (await cookiesStore).get(authTokenKey)?.value;
  try {
    const url = `${BASE_URL}/transaction`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log("Get Transaction History response --> ", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.log("Error fetching transactions:", error);
    return {
      success: false,
      message: "An unexpected error occurred.",
      data: undefined,
    };
  }
};

export const getSubscriptionPlanAction = async (
  simId?: string
): Promise<IResponse> => {
  const cookiesStore = cookies();
  const authToken = (await cookiesStore).get(authTokenKey)?.value;
  try {
    const url = new URL(`${BASE_URL}/subscription`);

    // Append simId as a query parameter if provided
    if (simId) {
      url.searchParams.append("simId", simId);
    }

    const response = await axios.get(url.toString(), {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log("Get Subscription Plan response --> ", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.log("Error fetching plans:", error);
    return {
      success: false,
      message: "An unexpected error occurred.",
      data: undefined,
    };
  }
};
