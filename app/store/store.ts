/* eslint-disable @typescript-eslint/no-unused-vars */

import { IESIM, IProviderCapability, IUser } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IAppStore {
  userId: string;
  setUserId: (val: string) => void;

  token: string;
  setToken: (val: string) => void;

  user: IUser;
  setUser: (user: IUser) => void;

  providerCapabilities: IProviderCapability[];
  setProviderCapabilities: (capabilities: IProviderCapability[]) => void;

  eSIMs: IESIM[]; // Array of eSIMs
  setEsims: (val: IESIM[]) => void; // Function to update eSIMs

  selectedESIM: IESIM | null; // Currently selected eSIM
  setSelectedEsim: (eSIM: IESIM | null) => void; // Function to set the selected eSIM

  resetStore: () => void;
}

export const useAppStore = create<IAppStore>()(
  persist(
    (set) => ({
      userId: "",
      setUserId: (val: string) => set((_state) => ({ userId: val })),

      user: {} as IUser,
      setUser: (user: IUser) => set((_state) => ({ user: user })),

      token: "",
      setToken: (val: string) => set((_state) => ({ token: val })),

      eSIMs: [],
      setEsims: (val: IESIM[]) => set((_state) => ({ eSIMs: val })),

      selectedESIM: null,
      setSelectedEsim: (eSIM: IESIM | null) =>
        set((_state) => ({ selectedESIM: eSIM })),

      providerCapabilities: [] as IProviderCapability[],
      setProviderCapabilities: (capabilities: IProviderCapability[]) =>
        set((_state) => ({ providerCapabilities: capabilities })),

      resetStore: () =>
        set({
          userId: "",
          user: {} as IUser,
          token: "",
          providerCapabilities: [] as IProviderCapability[],
          eSIMs: [], // Reset eSIMs array
          selectedESIM: null, // Reset selected eSIM
        }),
    }),
    { name: "phonelyne-app" }
  )
);
