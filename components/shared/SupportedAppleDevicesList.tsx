import React from "react";

const SupportedAppleDevicesList: React.FC = () => {
  const supportedDevices = [
    "iPhone SE (1st generation)",
    "iPhone 6s",
    "iPhone 6s Plus",
    "iPhone 7",
    "iPhone 7 Plus",
    "iPhone 8",
    "iPhone 8 Plus",
    "iPhone X",
    "iPhone XR",
    "iPhone XS",
    "iPhone XS Max",
    "iPhone 11",
    "iPhone 11 Pro",
    "iPhone 11 Pro Max",
    "iPhone SE (2nd generation)",
    "iPhone 12",
    "iPhone 12 mini",
    "iPhone 12 Pro",
    "iPhone 12 Pro Max",
  ];

  return (
    <div className="p-5 text-black w-full rounded-[16px] bg-white lg:bg-gray-100 border-[0.5px] border-gray-200">
      <span className="text-base lg:text-lg font-medium text-left text-nowrap">
        Apple
      </span>
      <ul className="mt-3 w-full flex flex-col items-start justify-start gap-y-4">
        {supportedDevices.map((device, index) => (
          <li key={index}>{`\u2022 ${device}`}</li>
        ))}
      </ul>

      <div className="w-full bg-red100 rounded-lg flex items-start justify-start p-2 mt-7">
        <p className="text-xs lg:text-sm text-black font-light">
          Recommended iOS version:{" "}
          <span className="font-medium">iOS 13.3 or later</span>
        </p>
      </div>
    </div>
  );
};

export default SupportedAppleDevicesList;
