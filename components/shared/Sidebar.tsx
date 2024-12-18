"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // usePathname for tracking current route
import { CircleHelp, House } from "lucide-react";
import LogoDark from "../icons/logo/LogoDark";
import SimCard from "../icons/SimCard";
import CreditCard from "../icons/CreditCard";
import Settings from "../icons/Settings";
import UserInfoCard from "../dashboard/UserInfoCard";

// Define sidebar items array
export const sidebarItems = [
  { name: "Dashboard", path: "/dashboard", icon: <House size={20} /> },
  { name: "SIMs", path: "/sims", icon: <SimCard /> },
  {
    name: "Transaction History",
    path: "/transactions",
    icon: <CreditCard />,
  },
  { name: "Help", path: "/help", icon: <CircleHelp size={20} /> },
  { name: "Settings", path: "/settings", icon: <Settings /> },
];

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  // State to track the selected item
  const [selectedItem, setSelectedItem] = useState<string>("");

  // Update selected item based on current pathname
  useEffect(() => {
    const currentItem = sidebarItems.find((item) => item.path === pathname);
    if (currentItem) {
      setSelectedItem(currentItem.name);
    }
  }, [pathname]);

  // Handle navigation and selection
  const handleNavigation = (name: string, path: string) => {
    console.log({ path });
    setSelectedItem(name); // Set selected item when clicked
    router.push(path); // Navigate to the selected route
  };

  return (
    <div className="hidden lg:flex flex-col min-h-screen bg-whiteBg w-72 shadow-lg pt-12 px-6">
      {/* Logo at the top */}
      <div className="flex w-full items-start justify-start pl-4">
        <LogoDark />
      </div>

      {/* Sidebar Items */}
      <div className="flex-grow p-4 space-y-3 mt-[10%] transition-all ease-in-out duration-300">
        {sidebarItems.map((item) => (
          <div
            key={item.name}
            className={`w-full flex items-center justify-center gap-x-3 p-2 px-5 rounded-[10px] hover:shadow-sm cursor-pointer text-gray-600 hover:text-orange 
              ${
                selectedItem === item.name
                  ? "bg-white border border-gray-100 text-orange"
                  : "hover:bg-white hover:shadow-sm"
              }`}
            onClick={() => handleNavigation(item.name, item.path)}
          >
            {item.icon}
            <p className="text-base lg:text-sm flex-grow font-medium text-nowrap">
              {item.name}
            </p>
          </div>
        ))}
      </div>

      {/* User Card at the bottom */}
      <UserInfoCard />
    </div>
  );
};

export default Sidebar;
