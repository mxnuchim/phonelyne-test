import React, { useState, useEffect } from "react";

interface ToggleProps {
  label: string;
  enabled: boolean;
  subtitle?: string;
}

const SettingToggle: React.FC<ToggleProps> = ({ label, enabled, subtitle }) => {
  // State to manage the toggle's internal state
  const [isEnabled, setIsEnabled] = useState<boolean>(enabled);

  // Sync the internal state with the external `enabled` prop if it changes
  useEffect(() => {
    setIsEnabled(enabled);
  }, [enabled]);

  // Handle toggle click event
  const handleToggle = () => {
    setIsEnabled((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col gap-y-4">
      {/* Label and Toggle */}
      <div className="w-full flex items-center justify-between gap-x-4">
        <div className="flex flex-col w-full space-y-2">
          <span className="text-black text-sm font-medium">{label}</span>
          {subtitle ? (
            <span className="text-black text-sm font-normal">{subtitle}</span>
          ) : null}
        </div>

        {/* Toggle Button */}
        <div
          onClick={handleToggle}
          className={`relative inline-flex items-center cursor-pointer shadow-lg
            ${isEnabled ? "bg-blue-500" : "bg-gray-300"} 
            rounded-full w-10 h-5 transition-colors duration-200`}
        >
          <span
            className={`absolute left-[1px] top-[1.5px] w-[17px] h-[17px] bg-white rounded-full 
              transition-transform duration-200 transform 
              ${isEnabled ? "translate-x-4" : ""}`}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingToggle;
