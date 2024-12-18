import React from "react";
import SettingToggle from "./SettingToggle";

const NotificationSettings = () => {
  return (
    <div className="w-full min-h-72 rounded-[10px] bg-[#F9F9F980]/50 flex flex-col items-start justify-start p-2 lg:p-4">
      <div className="w-full flex items-start justify-between">
        <p className="hidden lg:block text-sm text-gray-800 font-medium">
          Manage notifications
        </p>
        <div className="w-full lg:w-1/2 flex flex-col space-y-4 lg:space-y-6">
          <SettingToggle
            label="Low data Alerts"
            subtitle="Receive low data Alerts"
            enabled={false}
          />
          <SettingToggle
            label="Plan expiration  alerts"
            subtitle="Receive plan expiration alerts"
            enabled={false}
          />
          <SettingToggle
            label="Promotions"
            subtitle="Receive promotional offers"
            enabled={false}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
