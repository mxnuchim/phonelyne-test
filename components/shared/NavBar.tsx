"use client";
import { useState } from "react";
import Link from "next/link";
import PrimaryButton from "./PrimaryButton";
import LogoLight from "../icons/logo/LogoLight";
import { FaAngleDown } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import LogoDark from "../icons/logo/LogoDark";
import LogoDarkMobile from "../icons/logo/LogoDarkMobile";
import { Bell, Menu } from "lucide-react";
import MobileSidebar from "./MobileSidebar";

interface NavbarProps {
  type?: string;
  className?: string;
  logoType?: "light" | "dark" | "light-mobile" | "dark-mobile";
  onNotificationClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onNotificationClick,
  type,
  className,
  logoType,
}) => {
  const router = useRouter();
  const [isHelpDropdownOpen, setHelpDropdownOpen] = useState(false);
  // State to control the sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigateToLogin = () => {
    router.push("/login");
  };

  const getLogo = () => {
    switch (logoType) {
      case "dark":
        return <LogoDark />;
      case "light":
        return <LogoLight />;
      case "dark-mobile":
        return <LogoDarkMobile />;
      case "light-mobile":
        return <LogoLight />;
      default:
        return <LogoLight />;
    }
  };

  return (
    <>
      {type === "auth" ? (
        <nav className={`bg-blackBg w-full ${className}`}>
          <div className=" px-[10%] flex justify-between items-center py-4">
            {/* Logo */}
            <div className="text-2xl font-bold text-gray-200 ">{getLogo()}</div>

            <div></div>
          </div>
        </nav>
      ) : type === "dashboard" ? (
        <nav className={`w-full ${className}`}>
          <div className=" px-[5%] flex justify-between items-center pb-4 pt-8 ">
            {/* Logo */}
            <div className="text-2xl font-bold text-gray-200 ">{getLogo()}</div>

            <div className="flex items-center justify-end space-x-4">
              <div
                className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center"
                onClick={onNotificationClick}
              >
                <Bell size={18} className="text-black" />
              </div>

              <div onClick={toggleSidebar}>
                <Menu size={24} className="text-black cursor-pointer" />
              </div>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="bg-blackBg w-full">
          <div className=" px-[10%] flex justify-between items-center py-4">
            {/* Logo */}
            <div className="text-2xl font-bold text-gray-200 ">{getLogo()}</div>

            {/* Navigation Links */}
            <div className="flex justify-end items-center space-x-6 w-[45%]">
              <Link href="/destination-plans">
                <p className="text-white hover:text-gray-200 text-base text-nowrap">
                  Destination Plans
                </p>
              </Link>

              <Link href="/cart">
                <p className="text-white hover:text-gray-200 text-base">Cart</p>
              </Link>

              {/* Help Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setHelpDropdownOpen(!isHelpDropdownOpen)}
                  className="text-white hover:text-gray-200 flex items-center gap-2 text-base"
                >
                  Help
                  <FaAngleDown size={18} />
                </button>

                {/* Dropdown Menu */}
                {isHelpDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-[10px] overflow-hidden">
                    <Link href="/">
                      <p className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm font-medium">
                        Help Center{" "}
                      </p>
                    </Link>
                    <Link href="/">
                      <p className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm font-medium">
                        Contact
                      </p>
                    </Link>
                    <Link href="/">
                      <p className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm font-medium">
                        eSim Devices
                      </p>
                    </Link>
                  </div>
                )}
              </div>

              {/* Login Button */}
              <PrimaryButton
                className="bg-orange !w-[129px] !h-10"
                onClick={navigateToLogin}
              >
                <span>Login</span>
              </PrimaryButton>
            </div>
          </div>
        </nav>
      )}

      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Navbar;
