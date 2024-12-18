import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CirclePlus,
} from "lucide-react";
import { useRef } from "react";
import { formatDate } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { IESIM } from "@/types";

const StatusIndicator: React.FC<{
  status: "active" | "inactive" | "assigned";
}> = ({ status }) => (
  <span
    className={`px-2 py-1 rounded-full text-xs font-medium ${
      status === "active" || status === "assigned"
        ? "bg-[#4791FF] text-white"
        : "bg-gray-200 text-gray-500"
    }`}
  >
    {status === "assigned" ? "Active" : "Inactive"}
  </span>
);

interface IEsimListProps {
  eSimsList: Array<IESIM>;
}

const ESIMsTable: React.FC<IEsimListProps> = ({ eSimsList }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollLeft = () => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
  };

  return (
    <div className="border border-gray-200 rounded-[10px]">
      <div className="w-full overflow-x-auto scrollbar-hide" ref={scrollRef}>
        <table className="min-w-full text-left whitespace-nowrap">
          <thead className="h-10">
            <tr className="bg-gray-50 px-2">
              <th className="py-2 px-4 text-gray-800 text-sm md:text-sm font-medium">
                Country
              </th>
              <th className="py-2 px-4 text-gray-800 text-sm md:text-sm font-medium">
                eSIM Name/Number
              </th>
              <th className="py-2 px-4 text-gray-800 text-sm md:text-sm font-medium">
                Current Plan
              </th>
              <th className="py-2 px-4 text-gray-800 text-sm md:text-sm font-medium">
                Date Created
              </th>
              <th className="py-2 px-4 text-gray-800 text-sm md:text-sm font-medium">
                Last Active
              </th>
              <th className="py-2 px-4 text-gray-800 text-sm md:text-sm font-medium">
                Status
              </th>
              <th className="py-2 px-4 text-gray-800 text-sm md:text-sm font-medium">
                Primary Action
              </th>
              <th className="py-2 px-4 text-gray-800 text-sm md:text-sm font-medium ">
                {" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {eSimsList?.map((item, index) => (
              <tr key={index} className="border-b px-2">
                <td className="py-2 px-3 text-gray-700 text-sm font-medium flex items-center">
                  <div className="w-6 lg:w-8 h-6 lg:h-8 rounded-full overflow-hidden mr-4 lg:mr-6 2xl:mr-16">
                    <img
                      src={`https://flagcdn.com/48x36/${"US".toLowerCase()}.png`}
                      alt={"US"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="py-2 px-3 text-gray-700 text-xs lg:text-xs 2xl:text-sm font-medium">
                  {item.name || "-"}
                </td>
                <td className="py-2 px-3 text-gray-700 text-xs lg:text-sm font-medium">
                  {"-"}
                </td>
                <td className="py-2 px-3 text-gray-700 text-xs lg:text-sm font-medium">
                  {new Date(item?.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="py-2 px-3 text-gray-700 text-xs lg:text-sm font-medium">
                  {formatDate(item?.updated_at)}
                </td>
                <td className="py-2 px-4">
                  <StatusIndicator status={item?.status} />
                </td>
                <td className="py-2 px-3 0 cursor-pointer">
                  {item?.provider?.name?.toLowerCase() === "sochitel" ? (
                    <span className="text-black">{"-"}</span>
                  ) : (
                    <button
                      className="bg-orange flex items-center justify-center space-x-1 lg:space-x-2 w-[80px] lg:w-[100px] !rounded-[8px] !lg:rounded-[10px] !h-6 lg:!h-8 px-3"
                      onClick={() => router.push("/top-up")}
                    >
                      <CirclePlus size={12} className="text-white " />
                      <span className="text-[10px] lg:text-xs text-white font-medium">
                        Top up
                      </span>
                    </button>
                  )}
                </td>
                <td className="py-2 cursor-pointer">
                  <div className="bg-white border border-gray-200 rounded-lg flex items-center justify-center space-x-1 lg:space-x-1 w-[80px] lg:w-[70px]  !lg:rounded-[10px] !h-6 lg:!h-8 px-3">
                    {" "}
                    <p className="outline-none text-black text-xs font-medium">
                      More
                    </p>
                    <ChevronDown className="text-black" size={14} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full flex items-center justify-start space-x-2 mt-3 py-2">
        <button onClick={scrollLeft} className="p-1">
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        <button onClick={scrollRight} className="p-1">
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ESIMsTable;
