// components/DataUsageCard.tsx
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const DataUsageCard = () => {
  const [timePeriod, setTimePeriod] = useState("weekly");

  // Data with shortened day names for better fitting on small screens
  const data = [
    { day: "Mon", usage: 2.3 },
    { day: "Tue", usage: 1.8 },
    { day: "Wed", usage: 3.0 },
    { day: "Thu", usage: 2.1 },
    { day: "Fri", usage: 2.8 },
    { day: "Sat", usage: 1.5 },
    { day: "Sun", usage: 2.7 },
  ];

  const handleTimePeriodChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTimePeriod(event.target.value);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white border border-gray-200  shadow-md rounded-[10px] w-full lg:w-[450px] 2xl:w-[700px]">
      {/* Header with title and dropdown */}
      <div className="flex justify-between w-full mb-4">
        <p className="text-base font-medium text-gray-800">Data Usage</p>
        <div className="border border-gray-200 rounded-lg py-1 px-3">
          <select
            value={timePeriod}
            onChange={handleTimePeriodChange}
            className="outline-none text-black text-xs font-medium"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis
            label={{ value: "GB/day", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Bar
            dataKey="usage"
            fill="#FA5D00"
            barSize={15}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DataUsageCard;
