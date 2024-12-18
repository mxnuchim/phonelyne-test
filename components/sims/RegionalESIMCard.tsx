import { useRouter } from "next/navigation";

interface RegionalESIMCardProps {
  continent: string;
  color: string;
  coverage: string;
  priceRange: string;
}

const RegionalESIMCard: React.FC<RegionalESIMCardProps> = ({
  continent,
  color,
  coverage,
  priceRange,
}) => {
  const router = useRouter();

  const handleClick = () => {
    const params = new URLSearchParams({
      type: "regional",
      continent,
      color,
      coverage,
      priceRange,
    });

    router.push(`/buy-esim/select-plan?${params.toString()}`);
  };

  return (
    <div
      className="bg-transparent lg:bg-gray-100 p-4 rounded-[20px] border-[0.5px] border-gray-300 text-center shadow-sm w-full lg:w-[250px] cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center space-x-2 mb-2">
        <div
          className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full`}
          style={{ backgroundColor: color }}
        />
        <span className="font-medium text-xs lg:text-sm text-black">
          {continent}
        </span>
      </div>
      <p className="text-gray-600 text-xs lg:text-sm text-left text-nowrap mb-4">
        {priceRange}
      </p>
      <div className="px-3 py-2 bg-white rounded-full w-fit">
        <p className="text-gray-600 text-[10px] lg:text-xs text-left font-medium">
          {coverage}
        </p>
      </div>
    </div>
  );
};

export default RegionalESIMCard;
