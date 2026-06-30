import React from "react";
import HeroSearch from "@/components/home/HeroSearch";
import ServiceGrid from "@/components/home/ServiceGrid";
import HospitalMap from "@/components/home/HospitalMap";
import PromotionsSlider from "@/components/home/PromotionsSlider";
import InsurersGrid from "@/components/home/InsurersGrid";
import CertsBadges from "@/components/home/CertsBadges";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSearch />
      <ServiceGrid />
      <HospitalMap />
      <PromotionsSlider />
      <InsurersGrid />
      <CertsBadges />
    </div>
  );
}
