import { useAppStore } from "@/app/store/store";
import { shortenText } from "@/utils/helpers";
import Image from "next/image";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

interface UserInfoCardProps {
  className?: string;
}

const UserInfoCard = ({ className }: UserInfoCardProps) => {
  const { user } = useAppStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    router.push("/profile");
  };

  const isProfileRoute = pathname === "/profile";

  return (
    <div
      className={clsx(
        "flex items-center justify-start bg-white border mb-12 pl-5 shadow-sm rounded-[10px] w-full h-[73px] cursor-pointer",
        {
          "border-orange": isProfileRoute,
          "border-gray-100": !isProfileRoute,
        },
        className
      )}
      onClick={handleClick}
    >
      <Image
        src="https://imgv3.fotor.com/images/ai-headshot-generator/indoor-headshot-of-a-man-in-dark-blue-business-shirt-created-by-Fotor-AI-professional-LinkedIn-photo-maker.jpg"
        alt="User Avatar"
        width={40}
        height={40}
        className="rounded-full h-10 w-10 object-cover"
      />
      <div className="ml-3">
        <p className="font-medium text-gray-700 text-base lg:text-sm">
          {`${user?.first_name} ${user?.last_name}`}
        </p>
        <p className="text-gray-700 text-xs lg:text-xs">
          {shortenText(user?.email, 20)}
        </p>
      </div>
    </div>
  );
};

export default UserInfoCard;
