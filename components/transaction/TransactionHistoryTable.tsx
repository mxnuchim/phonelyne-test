import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { formatCurrency, formatDate } from "@/utils/helpers";
import { ITransaction } from "@/types";

const StatusIndicator: React.FC<{ status: ITransaction["status"] }> = ({
  status,
}) => {
  const statusStyles = {
    successful: "bg-[#21D1111F]/20 text-[#007847]",
    pending: "bg-[#FFBF0017]/20 text-[#FFBF00]",
    failed: "bg-[#DB444624]/20 text-[#AD1519]",
  };

  return (
    <span
      className={`px-2 py-1 rounded-[7px] text-xs font-medium ${statusStyles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

interface Props {
  transactionList: Array<ITransaction>;
}

const TransactionHistoryTable: React.FC<Props> = ({ transactionList }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

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
              <th className="py-2 px-4 text-gray-800 text-sm font-medium">
                Amount
              </th>
              <th className="py-2 px-4 text-gray-800 text-sm font-medium">
                Reference
              </th>
              <th className="py-2 px-4 text-gray-800 text-sm font-medium">
                Product
              </th>
              <th className="py-2 px-4 text-gray-800 text-sm font-medium">
                SIM Name/Number
              </th>
              <th className="py-2 px-4 text-gray-800 text-sm font-medium">
                Paid On
              </th>
              <th className="py-2 px-4 text-gray-800 text-sm font-medium">
                Status
              </th>
              <th className="py-2 px-4 text-gray-800 text-sm font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {transactionList.map((transaction, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4 text-gray-700 text-sm font-medium">
                  {formatCurrency(transaction?.amount, transaction?.currency)}
                </td>
                <td className="py-2 px-4 text-gray-700 text-sm font-medium">
                  {transaction?.reference}
                </td>
                <td className="py-2 px-4 text-gray-700 text-sm font-medium">
                  {"transaction.product"}
                </td>
                <td className="py-2 px-4 text-gray-700 text-sm font-medium">
                  {"transaction.sim"}
                </td>
                <td className="py-2 px-4 text-gray-700 text-sm font-medium">
                  {formatDate(transaction?.created_at)}
                </td>
                <td className="py-2 px-4">
                  <StatusIndicator status={transaction?.status} />
                </td>

                <td className="py-2 px-4 text-center">
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

export default TransactionHistoryTable;
