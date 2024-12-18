"use client";
import { animations } from "@/public/assets";
import Lottie from "lottie-react";
import React from "react";

interface LoaderProps {
  visible?: boolean;
}

const Loader: React.FC<LoaderProps> = ({}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center !z-[9999]">
      <Lottie
        animationData={animations.loader}
        loop
        autoplay
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
      />
    </div>
  );
};

export default Loader;
