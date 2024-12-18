import React, { useState } from "react";
import Divider from "./Divider";

const SupportedAndroidDevicesList: React.FC = () => {
  const [selectedMake, setSelectedMake] = useState<string>("Google");

  const supportedDevicesByMake: { [key: string]: string[] } = {
    Google: [
      "Pixel 3",
      "Pixel 3 XL",
      "Pixel 4",
      "Pixel 4 XL",
      "Pixel 5",
      "Pixel 5a",
      "Pixel 6",
      "Pixel 6 Pro",
    ],
    Motorola: [
      "Moto G Power (2021)",
      "Moto G Stylus (2021)",
      "Moto Edge (2020)",
      "Moto One 5G",
      "Moto G100",
    ],
    Nokia: [
      "Nokia 8.3 5G",
      "Nokia 7.2",
      "Nokia 6.2",
      "Nokia 5.4",
      "Nokia XR20",
    ],
    Huawei: [
      "Huawei P30",
      "Huawei P30 Pro",
      "Huawei Mate 20",
      "Huawei Mate 20 Pro",
      "Huawei P40",
    ],
    Xiaomi: [
      "Xiaomi Mi 10",
      "Xiaomi Mi 10 Pro",
      "Xiaomi Mi 11",
      "Xiaomi Redmi Note 10",
      "Xiaomi Redmi Note 9",
    ],
    Sony: [
      "Sony Xperia 1 II",
      "Sony Xperia 5 II",
      "Sony Xperia 10 II",
      "Sony Xperia XZ3",
      "Sony Xperia XZ2",
    ],
    Oppo: [
      "Oppo Find X2",
      "Oppo Reno 4 Pro",
      "Oppo A93",
      "Oppo A74",
      "Oppo Find X3",
    ],
  };

  const manufacturers = Object.keys(supportedDevicesByMake);

  return (
    <div className="p-5 text-black w-[92vw] lg:w-full min-h-[80vh] rounded-[16px] bg-white lg:bg-gray-100 border-[0.5px] border-gray-200 flex flex-col">
      {/* Tabs for selecting manufacturer */}
      <div className="flex gap-4 max-w-full overflow-x-scroll lg:overflow-auto">
        {manufacturers.map((make) => (
          <button
            key={make}
            onClick={() => setSelectedMake(make)}
            className={`px-3 py-1 rounded ${
              selectedMake === make
                ? " text-black font-medium"
                : " text-gray-400"
            }`}
          >
            {make}
          </button>
        ))}
      </div>

      <Divider className=" w-full my-2 top-0 !border-gray-200" />

      <span className="text-base lg:text-lg font-medium text-left capitalize mt-4">
        {selectedMake}
      </span>

      {/* Display list of supported devices based on selected make */}
      <ul className="mt-6 w-full flex flex-col items-start justify-start gap-y-4">
        {supportedDevicesByMake[selectedMake].map((device, index) => (
          <li key={index}>{`\u2022 ${device}`}</li>
        ))}
      </ul>

      <div className="w-full bg-red-100 rounded-lg flex items-start justify-start p-2 mt-auto">
        <p className="text-xs lg:text-sm text-black font-light">
          Recommended Android version:{" "}
          <span className="font-medium">Android 10 or later</span>
        </p>
      </div>
    </div>
  );
};

export default SupportedAndroidDevicesList;
