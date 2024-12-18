import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation"; // For navigation
import { X } from "lucide-react"; // Icon for closing the sidebar
import { sidebarItems } from "./Sidebar"; // Assuming sidebarItems are exported
import LogoDarkMobile from "../icons/logo/LogoDarkMobile";
import UserInfoCard from "../dashboard/UserInfoCard";

interface MobileSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isOpen,
  toggleSidebar,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  // State to track the selected item
  const [selectedItem, setSelectedItem] = useState<string>("");

  // Update selected item based on current pathname
  useEffect(() => {
    const currentItem = sidebarItems.find((item) => item.path === pathname);
    if (currentItem) {
      setSelectedItem(currentItem.name);
    }
  }, [pathname]);

  // Handle navigation and close sidebar
  const handleNavigation = (name: string, path: string) => {
    setSelectedItem(name); // Set selected item when clicked
    router.push(path); // Navigate to the selected route
    toggleSidebar(); // Close the sidebar after navigation
  };

  return (
    <div
      className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out bg-black bg-opacity-50 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      onClick={toggleSidebar}
    >
      <div className="relative bg-white w-full h-full shadow-lg flex flex-col pt-6 ">
        {/* Close Button */}
        <div className="flex justify-between items-center bg-white px-6 h-16 border-b border-b-gray-200 shadow-sm">
          <LogoDarkMobile />
          <button onClick={toggleSidebar}>
            <X size={24} className="text-black" />
          </button>
        </div>

        {/* Sidebar Items */}
        <div className="flex-grow bg-whiteBg px-3 pt-6 space-y-2">
          {sidebarItems.map((item) => (
            <div
              key={item.name}
              className={`flex items-center px-6 py-4 rounded-lg cursor-pointer transition-all duration-300
              ${
                selectedItem === item.name
                  ? "text-orange bg-white shadow-sm" // Orange text for selected item
                  : "text-gray-800"
              }`}
              onClick={() => handleNavigation(item.name, item.path)}
            >
              <span
                className={`mr-3 ${
                  selectedItem === item.name ? "text-orange" : "text-gray-800"
                }`}
              >
                {item.icon}
              </span>
              <span
                className={`text-base font-medium ${
                  selectedItem === item.name ? "text-orange" : "text-gray-800"
                }`}
              >
                {item.name}
              </span>
            </div>
          ))}
          <div className="px-3">
            <UserInfoCard className="bg-whiteBg mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
