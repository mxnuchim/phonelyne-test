import LandingPageHero from "@/components/landing/Hero";
import Banner from "@/components/shared/Banner";
import Navbar from "@/components/shared/NavBar";
import React from "react";

const HomePage = () => {
  return (
    <main className="flex flex-col">
      <Banner />
      <Navbar />
      <LandingPageHero />
    </main>
  );
};

export default HomePage;
