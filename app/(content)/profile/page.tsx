"use client";
import Bell from "@/components/icons/Bell";
import Cart from "@/components/icons/Cart";
import AppHeader from "@/components/shared/AppHeader";
import Container from "@/components/shared/Container";
import Divider from "@/components/shared/Divider";
import Navbar from "@/components/shared/NavBar";
import NotificationTab from "@/components/shared/NotificationTab";
import PrimaryButton from "@/components/shared/PrimaryButton";
import TextInput from "@/components/shared/Input"; // Assuming this is your reusable input component
import { Upload } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { useAppStore } from "@/app/store/store";
import { getCountryName } from "@/utils/helpers";

const ProfileScreen = () => {
  const { user } = useAppStore();
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    setUserData(user);
  }, []);

  const handleBellClick = () => {
    setNotificationVisible(true);
  };

  const handleCloseNotification = () => {
    setNotificationVisible(false);
  };

  const toggleIsEditing = () => setIsEditing(!isEditing);

  console.log(JSON.stringify(user, null, 2));

  return (
    <>
      <div className="flex lg:hidden">
        <Navbar
          type="dashboard"
          className="!bg-whiteBg border-b border-transparent lg:border-b-gray-200 "
          logoType="dark-mobile"
          onNotificationClick={() =>
            setNotificationVisible(!isNotificationVisible)
          }
        />
      </div>
      <Container
        className="bg-whiteBg lg:bg-white border border-transparent lg:border-gray-200 rounded-[10px] h-screen lg:h-[96vh] pt-0 lg:pt-8 overflow-y-scroll relative pb-24 lg:pb-10 outline-none"
        paddingHorizontal="px-0 lg:px-8"
      >
        <div className="w-full h-full items-start justify-start ">
          {/** HEADER AREA */}
          <div className="w-full hidden lg:flex items-start justify-between ">
            <AppHeader
              title="Profile"
              subtitle={`View, manage, and download receipts of your past purchases and top-ups.`}
            />

            <div className="flex items-center space-x-6">
              <div
                className="cursor-pointer rounded-full p-2 bg-gray-50"
                onClick={handleBellClick}
              >
                <Cart />
              </div>
              <div className="cursor-pointer" onClick={handleBellClick}>
                <Bell />
              </div>
            </div>
          </div>
          <Divider className="absolute w-full mt-4 left-0" />
          <div className="w-full flex flex-col mt-10">
            <div className="w-full flex items-center justify-start space-x-5 px-4 lg:px-0">
              <Image
                src="https://imgv3.fotor.com/images/ai-headshot-generator/indoor-headshot-of-a-man-in-dark-blue-business-shirt-created-by-Fotor-AI-professional-LinkedIn-photo-maker.jpg"
                alt="User Avatar"
                width={50}
                height={50}
                className="rounded-full h-14 w-14 object-cover"
              />

              <PrimaryButton
                className="bg-white border border-orange w-[110px] lg:w-[109px] !h-8 lg:!h-10 !rounded-[10px]"
                onClick={() => {}}
              >
                <Upload size={16} className=" text-orange" />
                <span className="text-orange font-normal text-sm">Upload</span>
              </PrimaryButton>
            </div>

            <div className="w-full lg:w-5/6 mt-8 bg-transparent lg:bg-gray-50 lg:border-[0.5px] border-none border-gray-200 rounded-[24px] p-4">
              {/** GRID VIEW */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TextInput
                  label="First Name"
                  type="text"
                  placeholder="Enter your first name"
                  value={userData?.first_name}
                  onChange={() => {}}
                />
                <TextInput
                  label="Last Name"
                  type="text"
                  placeholder="Enter your last name"
                  value={userData?.last_name}
                  onChange={() => {}}
                />
                <TextInput
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={userData?.email}
                  onChange={() => {}}
                />
                <TextInput
                  label="Phone"
                  type="text"
                  placeholder="Enter your phone number"
                  value={userData?.phone}
                  onChange={() => {}}
                />
                <TextInput
                  label="Country"
                  type="text"
                  placeholder="Enter your country"
                  value={getCountryName(userData?.country || "") || ""}
                  onChange={() => {}}
                />
              </div>

              {/** EDIT BUTTON */}
              <div className="mt-6 flex justify-center w-fit">
                {isEditing ? (
                  <PrimaryButton
                    className="!w-[153px] !h-10 text-white bg-orange !rounded-[12px] text-sm font-medium"
                    onClick={toggleIsEditing}
                  >
                    Save Changes
                  </PrimaryButton>
                ) : (
                  <PrimaryButton
                    className="bg-white text-white !w-[108px] !h-10 !rounded-[10px] shadow-sm border border-gray-200"
                    onClick={toggleIsEditing}
                  >
                    <BiEditAlt size={16} className="text-gray700" />
                    <span className="text-gray-800 font-normal">Edit</span>
                  </PrimaryButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <NotificationTab
        isVisible={isNotificationVisible}
        onClose={handleCloseNotification}
      />
    </>
  );
};

export default ProfileScreen;
