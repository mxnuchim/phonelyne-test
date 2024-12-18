import { IPlan } from "@/types";
import { Banknote, Calendar, Gauge, Globe } from "lucide-react";
import PlanDetailItem from "./DataPlanDetailItem";

interface DataPlanListProps {
  handlePayment: (selectedPlan: IPlan) => void;
  selectedPlan: number | null;
  setSelectedPlan: (index: number) => void;
}

const DataPlanList = ({
  handlePayment,
  selectedPlan,
  setSelectedPlan,
}: DataPlanListProps) => {
  const dataPlans: Array<IPlan> = [
    {
      size: "1GB",
      price: "$30",
      validity: "30 days",
      coverage: "USA",
      speed: "4G",
    },
    {
      size: "3GB",
      price: "$50",
      validity: "30 days",
      coverage: "USA",
      speed: "5G",
    },
    {
      size: "5GB",
      price: "$70",
      validity: "30 days",
      coverage: "USA",
      speed: "5G",
    },
    {
      size: "8GB",
      price: "$75",
      validity: "30 days",
      coverage: "USA",
      speed: "5G",
    },
    {
      size: "10GB",
      price: "$80",
      validity: "60 days",
      coverage: "USA",
      speed: "5G",
    },

    // Add more data plans as needed
  ];

  const handleSelect = (index: number) => {
    setSelectedPlan(index);
    handlePayment(dataPlans[index]); // Pass the selected plan to the parent
  };

  return (
    <div className="w-full flex flex-col lg:flex-row items-center lg:items-start flex-wrap gap-4">
      {dataPlans.map((plan, index) => (
        <div
          key={index}
          onClick={() => handleSelect(index)}
          className={`flex-shrink-0 lg:w-[255px] w-full max-w-full p-4 bg-white rounded-[10px] shadow-md border-[0.5px] ${
            selectedPlan === index ? "border-orange" : "border-gray-300"
          }`}
        >
          <div className="flex items-center space-x-2 mb-2">
            <label
              className={`relative flex items-center justify-center h-4 w-4 bg-white  border rounded-full ${
                selectedPlan === index ? "border-orange" : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="data-plan"
                checked={selectedPlan === index}
                onChange={() => handleSelect(index)}
                className="appearance-none h-3 w-3 rounded-full checked:bg-orange"
              />
              {/* {selectedPlan === index && (
                <Check size={14} className="absolute text-white" />
              )} */}
            </label>
            <p className="text-lg font-medium text-gray-800">{plan.size}</p>
          </div>

          <ul className="text-sm space-y-3 pt-2">
            <PlanDetailItem
              label="Price"
              value={plan.price}
              icon={<Banknote size={16} className="text-orange" />}
            />
            <PlanDetailItem
              label="Validity"
              value={plan.validity}
              icon={<Calendar size={16} className="text-orange" />}
            />
            <PlanDetailItem
              label="Coverage"
              value={plan.coverage}
              icon={<Globe size={16} className="text-orange" />}
            />
            <PlanDetailItem
              label="Speed"
              value={plan.speed}
              icon={<Gauge size={16} className="text-orange" />}
            />
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DataPlanList;
