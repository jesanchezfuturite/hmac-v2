import React from "react";
import HeroSearch from "@/components/home/HeroSearch";
import ServiceGrid from "@/components/home/ServiceGrid";
import CommercialCTASection from "@/components/home/CommercialCTASection";
import HospitalMap from "@/components/home/HospitalMap";
import PromotionsSlider from "@/components/home/PromotionsSlider";
import GoogleReviewsSection from "@/components/home/GoogleReviewsSection";
import InsurersGrid from "@/components/home/InsurersGrid";
import CertsBadges from "@/components/home/CertsBadges";

/**
 * Home — recorrido definido en el documento de arquitectura (19-08-2026):
 *
 * ¿Qué necesitas? → Esto es lo que MAC puede ofrecerte → Cómo podemos ayudarte
 * → Dónde puedes recibir atención → Beneficios vigentes → Experiencias reales
 * → Opciones que facilitan el acceso → Respaldo de calidad.
 */
export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSearch />
      <ServiceGrid />
      <CommercialCTASection />
      <HospitalMap />
      <PromotionsSlider />
      <GoogleReviewsSection />
      <InsurersGrid />
      <CertsBadges />
    </div>
  );
}
