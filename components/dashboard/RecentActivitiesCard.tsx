import { formatDate } from "@/utils/helpers";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";

interface Activity {
  type: string;
  description: string;
  date: string;
  action: string;
}

const activities: Activity[] = [
  {
    type: "Low data balance",
    description: "Your eSIM has less than 10% of data remaining.",
    date: "2024-03-19T10:30:00.000Z",
    action: "Top up",
  },
  {
    type: "Plan expiry",
    description: "Your data plan expires in 3 days.",
    date: "2024-03-18T08:15:00.000Z",
    action: "Renew",
  },
  {
    type: "Recharge successful",
    description: "Your top-up of 5GB was successful.",
    date: "2024-03-17T14:20:00.000Z",
    action: "View",
  },
  {
    type: "New data plan activated",
    description: "You have successfully activated a new 10GB data plan.",
    date: "2024-03-16T09:05:00.000Z",
    action: "View",
  },
  {
    type: "Device connected",
    description: "A new device connected to your account.",
    date: "2024-03-15T11:45:00.000Z",
    action: "Manage",
  },
];

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const ActionButton: React.FC<{ action: string }> = ({ action }) => (
  <button
    className="px-4 py-1 rounded-full text-[10px] font-medium"
    style={{ backgroundColor: "#FFF9F6" }}
  >
    {action}
  </button>
);

const RecentActivitiesCard = () => {
  const [action, setAction] = useState("Sort");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleActionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAction(event.target.value);
  };

  const scrollLeft = () => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center py-6 px-4 bg-white border border-gray-200 shadow-md rounded-[10px] w-full max-w-full  2xl:max-w-full h-[350px] overflow-hidden">
      {/* Header with title and dropdown */}
      <div className="flex justify-between w-full mb-4">
        <p className="text-base font-medium text-gray-800">Recent Activities</p>
        <div className="border border-gray-200 rounded-lg py-1 px-3 w-fit">
          <select
            value={action}
            onChange={handleActionChange}
            className="outline-none text-black text-xs font-medium"
          >
            <option value="sort">Sort</option>
            <option value="filter">Filter</option>
          </select>
        </div>
      </div>

      {/* Horizontal scrollable table */}
      <div className="w-full overflow-x-auto" ref={scrollRef}>
        <table className="min-w-full text-left whitespace-nowrap rounded-[10px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 text-gray-800 text-xs font-semibold">
                Type
              </th>
              <th className="py-2 px-4 text-gray-800 text-xs font-semibold">
                Description
              </th>
              <th className="py-2 px-4 text-gray-800 text-xs font-semibold">
                Date
              </th>
              <th className="py-2 px-4 text-gray-800 text-xs font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4 text-gray-700 text-[10px] font-medium">
                  {activity.type}
                </td>
                <td
                  className="py-2 px-4 text-gray-700 text-[10px] font-medium"
                  title={activity.description} // Shows full text on hover
                >
                  {truncateText(activity.description, 30)}
                </td>
                <td className="py-2 px-4 text-gray-700 text-[10px] font-medium">
                  {formatDate(activity.date)}
                </td>
                <td className="py-2 px-4 text-gray-700 text-[10px] font-medium">
                  <ActionButton action={activity.action} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Scroll controls */}
      <div className="w-full flex items-center justify-start space-x-2 mt-2">
        <button onClick={scrollLeft} className="p-1">
          <ChevronLeft size={14} className="text-black" />
        </button>
        <button onClick={scrollRight} className="p-1">
          <ChevronRight size={14} className="text-black" />
        </button>
      </div>
    </div>
  );
};

export default RecentActivitiesCard;
