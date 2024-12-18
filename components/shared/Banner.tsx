import React from "react";

const Banner = () => {
  return (
    <div className="w-full items-center justify-center flex h-7 lg:h-10 bg-pink">
      <span className="uppercase text-base text-black font-medium">
        Your First e-SIM Plan Comes With Free Data – Don’t Miss Out!{" "}
        <span className="font-bold">Check data plans now!</span>
      </span>
    </div>
  );
};

export default Banner;
