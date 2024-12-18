import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface LocalESIMCardProps {
  country: string;
  flagSrc: string;
  priceRange: string;
}

const LocalESIMCard: React.FC<LocalESIMCardProps> = ({
  country,
  flagSrc,
  priceRange,
}) => {
  const router = useRouter();

  const handleClick = () => {
    const params = new URLSearchParams({
      type: "local",
      country,
      flag: flagSrc,
      priceRange,
    });

    router.push(`/buy-esim/select-plan?${params.toString()}`);
  };
  return (
    <div
      className="bg-transparent lg:bg-gray-50 p-4 rounded-[20px] border border-gray-200 text-center shadow-sm w-[200px] cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center justify-start space-x-2 mb-2">
        <div className="w-7 h-7 bg-gray-100 border-2 border-gray-600 rounded-full overflow-hidden">
          <Image
            src={flagSrc}
            alt={`${country} flag`}
            className="object-cover w-full h-full"
            width={28}
            height={28}
            quality={90}
            objectFit="cover"
          />
        </div>
        <span className="font-medium text-gray-700 text-nowrap text-sm ">
          {country}
        </span>
      </div>
      <div className="w-full mt-2">
        <p className="text-gray-600 text-xs text-left">From {priceRange}</p>
      </div>
    </div>
  );
};

export default LocalESIMCard;
