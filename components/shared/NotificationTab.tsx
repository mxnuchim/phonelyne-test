import { Maximize2 } from "lucide-react";
import React, { useState } from "react";
import Divider from "./Divider";

interface NotificationTabProps {
  isVisible: boolean;
  onClose: () => void;
}

const NotificationTab: React.FC<NotificationTabProps> = ({
  isVisible,
  onClose,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  if (!isVisible) return null;

  const handleMaximize = () => {
    setIsFullScreen((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black bg-opacity-50">
      <div
        className={`bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out w-full sm:w-full  h-full sm:h-full  py-4 mr-0   overflow-y-auto ${
          isFullScreen
            ? "lg:h-[100vh] w-full"
            : "lg:h-[85vh] lg:mt-10 lg:w-[600px] lg:mr-8"
        }`}
      >
        <div className="flex justify-between items-center mb-4 px-4">
          <p className="text-lg font-medium text-gray-800">Notifications</p>
          <div className="flex items-center justify-center space-x-6">
            <button className="hidden lg:flex" onClick={handleMaximize}>
              <Maximize2 size={16} className="text-black" />
            </button>
            <button onClick={onClose} className="text-black text-2xl">
              &times; {/* Close button */}
            </button>
          </div>
        </div>
        <Divider className="shadow-md" />
        {/* Your notification content goes here */}
        <div className="px-4">{/*  notification content goes here */}</div>
      </div>
    </div>
  );
};

export default NotificationTab;
