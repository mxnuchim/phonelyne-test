"use client";
import { getTransactionHistoryAction } from "@/app/actions/accountActions";
import Bell from "@/components/icons/Bell";
import Slider from "@/components/icons/Slider";
import AppHeader from "@/components/shared/AppHeader";
import Container from "@/components/shared/Container";
import Divider from "@/components/shared/Divider";
import Loader from "@/components/shared/Loader";
import Navbar from "@/components/shared/NavBar";
import NotificationTab from "@/components/shared/NotificationTab";
import SearchInput from "@/components/shared/SearchInput";
import TransactionHistoryTable from "@/components/transaction/TransactionHistoryTable";
import { ITransaction } from "@/types";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";

const Transactions = () => {
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [transactionHistory, setTransactionHistory] =
    useState<ITransaction[]>();
  const [filteredTransactionHistory, setFilteredTransactionHistory] = useState<
    ITransaction[] | undefined
  >(transactionHistory);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleFilterClick = () => {
    setFilterOpen(!filterOpen);
  };

  const handleBellClick = () => {
    setNotificationVisible(true);
  };

  const fetchTransactions = async () => {
    setLoading(true);

    const { data, success, message } = await getTransactionHistoryAction();

    console.log("Transaction History Response --> ", data, success, message);

    if (!success) {
      console.log("Error fetching history --> ", data, message);
      setLoading(false);
      return;
    }

    setTransactionHistory(data);
    setFilteredTransactionHistory(data);

    setLoading(false);
  };

  return (
    <>
      {loading ? <Loader /> : null}
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
        paddingHorizontal="px-0 lg:px-5 2xl:px-8"
      >
        <div className="flex flex-col w-full h-full items-start justify-start">
          {/** HEADER AREA */}
          <div className="w-full hidden lg:flex items-start justify-between">
            <AppHeader
              title="Transaction History"
              subtitle="View, manage, and download receipts of your past purchases and top-ups."
            />

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
                placeholder="Search by eSim name or number"
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

            <div></div>
          </div>

          <div className="w-screen lg:w-full mt-8">
            <TransactionHistoryTable
              transactionList={filteredTransactionHistory || []}
            />
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

export default Transactions;
