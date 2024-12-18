"use client";
import { useEffect, useState } from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import PrimaryButton from "../shared/PrimaryButton";
import { RotateCw } from "lucide-react";

const InternetSpeedCard = () => {
  const [downloadSpeed, setDownloadSpeed] = useState<number>(10); // Initial value for download speed
  const [isClient, setIsClient] = useState<boolean>(false); // State to check if we are on the client

  useEffect(() => {
    setIsClient(true);
    testInternetSpeed();
  }, []);

  const [loading, setLoading] = useState(false);

  const testInternetSpeed = async () => {
    setLoading(true);
    console.log(loading);

    // Define a file to download (this example uses a small image)
    const imageUrl =
      "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    const startTime = Date.now();

    try {
      const response = await fetch(imageUrl, { cache: "no-store" });
      const blob = await response.blob();
      const endTime = Date.now();

      const fileSizeInBits = blob.size * 8; // Convert bytes to bits
      const timeTakenInSeconds = (endTime - startTime) / 1000;

      // Calculate speed in Mbps
      const speedInMbps = fileSizeInBits / timeTakenInSeconds / (1024 * 1024);

      setDownloadSpeed(speedInMbps);
    } catch (error) {
      console.error("Error checking speed:", error);
    } finally {
      setLoading(false);
    }
  };

  const maxSpeed = 100;

  const data = [
    {
      name: "Download Speed",
      value: downloadSpeed?.toFixed(2),
      fill: "#FA5D00",
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center">
          {isClient && ( // Render the chart only on the client side
            <RadialBarChart
              width={240}
              height={140} // Reduced height for a more compact display
              innerRadius="70%"
              outerRadius="100%"
              startAngle={180} // Start from the top
              endAngle={0} // End at the bottom
              data={data}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, maxSpeed]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                dataKey="value"
                cornerRadius={0}
                fill="#FA5D00"
                background={{ fill: "#E0E0E0" }}
              />
            </RadialBarChart>
          )}
          {/* Center text */}
          <div className="absolute inset-0 top-12 flex items-center justify-center text-black text-lg font-bold">
            {downloadSpeed.toFixed(2)} mb/s
          </div>
        </div>
      </div>

      <PrimaryButton
        className="w-full bg-gray-100 flex items-center justify-center space-x !h-10 rounded-lg"
        onClick={testInternetSpeed}
      >
        <RotateCw size={18} className="text-black" />
        <p className="text-black font-medium text-base">Refresh</p>
      </PrimaryButton>
    </>
  );
};

export default InternetSpeedCard;
