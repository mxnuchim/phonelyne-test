"use client";
import { getEsimsAction } from "@/app/actions/accountActions";
import { useAppStore } from "@/app/store/store";
import Bell from "@/components/icons/Bell";
import Cart from "@/components/icons/Cart";
import Slider from "@/components/icons/Slider";
import AppHeader from "@/components/shared/AppHeader";
import Container from "@/components/shared/Container";
import Divider from "@/components/shared/Divider";
import Navbar from "@/components/shared/NavBar";
import NotificationTab from "@/components/shared/NotificationTab";
import PrimaryButton from "@/components/shared/PrimaryButton";
import SearchInput from "@/components/shared/SearchInput";
import ESIMsTable from "@/components/sims/eSim_List";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Sims = () => {
  const router = useRouter();
  const { eSIMs, setEsims } = useAppStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [filteredEsims, setFilteredEsims] = useState(eSIMs);

  useEffect(() => {
    setFilteredEsims(eSIMs);
  }, []);

  useEffect(() => {
    const getUserEsims = async () => {
      const { data, success, message } = await getEsimsAction();

      if (!success) {
        console.log("Error fetching eSIMs --> ", { data, message });
        return;
      }

      // console.log("User eSIMs --> ", JSON.stringify(data, null, 2));
      setEsims(data);
      setFilteredEsims(data);
    };

    if (!eSIMs) {
      getUserEsims();
    } else {
      setFilteredEsims(eSIMs);
    }
  }, [eSIMs]);

  useEffect(() => {
    if (searchQuery && eSIMs) {
      const filtered = eSIMs?.filter((sim) =>
        sim?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEsims(filtered);
    } else {
      setFilteredEsims(eSIMs);
    }
  }, [searchQuery, eSIMs]);

  const handleBellClick = () => {
    setNotificationVisible(true);
  };

  const handleFilterClick = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <>
      <div className="flex lg:hidden">
        <Navbar
          type="dashboard"
          className="!bg-whiteBg border-b border-transparent lg:border-b-gray-200 "
          logoType="dark-mobile"
          onNotificationClick={() => () => {}}
        />
      </div>
      <Container
        className="bg-whiteBg lg:bg-white border border-transparent lg:border-gray-200 rounded-[10px] h-screen lg:h-[96vh] pt-0 lg:pt-6 2xl:pt-8 overflow-y-scroll relative pb-24 lg:pb-10 outline-none max-w-full"
        paddingHorizontal="px-0 lg:px-6 2xl:px-8"
      >
        <div className="flex flex-col w-full h-full items-start justify-start">
          {/** HEADER AREA */}
          <div className="w-full hidden lg:flex items-start justify-between">
            <AppHeader title="My SIMs" subtitle="Welcome back, John" />

            <div className="cursor-pointer" onClick={handleBellClick}>
              <Bell />
            </div>
          </div>

          <Divider className="absolute w-full mt-[6%] left-0" />

          <div className="mt-10 flex max-w-full w-full items-center justify-between">
            <div className="flex items-center justify-start space-x-3 w-full lg:w-auto px-4 lg:px-0">
              <SearchInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by eSIM name or number"
                className=" bg-white text-black !border-[0.5px] !border-gray-300 !rounded-[10px] w-full lg:w-[440px]"
              />

              <div className="border-[0.5px] border-gray-300 flex lg:hidden w-[57px] h-12 items-center justify-center bg-white rounded-[10px]">
                <Slider />
              </div>

              <div
                className="border border-gray-200 rounded-lg px-5 hidden lg:flex items-center justify-center  h-[40px] space-x-1 cursor-pointer"
                onClick={handleFilterClick}
              >
                <p className="outline-none text-black text-xs font-medium">
                  Filter
                </p>
                <ChevronDown className="text-black" size={14} />
              </div>
            </div>

            <PrimaryButton
              className="hidden lg:flex bg-white w-[76px] lg:w-[155px] !rounded-[10px] !lg:rounded-[10px] !h-9 border-[0.5px] border-gray-300"
              onClick={() => router.push("/buy-esim")}
            >
              <Cart />
              <span className="text-black font-medium">New eSIM</span>
            </PrimaryButton>
          </div>

          <div className="w-screen lg:w-full mt-8">
            <ESIMsTable eSimsList={filteredEsims} />
          </div>
        </div>
        <NotificationTab
          isVisible={isNotificationVisible}
          onClose={() => {
            setNotificationVisible(false);
          }}
        />
      </Container>
    </>
  );
};

export default Sims;
