"use client";

import React, { useState } from "react";
import CTAButton from "../shared/CTAButton";

export default function InsurersGrid() {
  const [isExpanded, setIsExpanded] = useState(false);

  // List of all 62 insurance companies in a premium sequence, starting with the most common ones
  const allInsurers = [
    { name: "GNP Seguros", src: "/img/logos_aseguradoras/gnp_seguros.png" },
    { name: "AXA Seguros", src: "/img/logos_aseguradoras/axxa.png" },
    { name: "Metlife", src: "/img/logos_aseguradoras/metlife.png" },
    { name: "Seguros Monterrey", src: "/img/logos_aseguradoras/seguros_monterrey.png" },
    { name: "Mapfre", src: "/img/logos_aseguradoras/Mapfre.png" },
    { name: "Allianz", src: "/img/logos_aseguradoras/allianz.png" },
    { name: "Bupa México", src: "/img/logos_aseguradoras/bupa_mexico.png" },
    { name: "Zurich", src: "/img/logos_aseguradoras/zurich.png" },
    { name: "Inbursa", src: "/img/logos_aseguradoras/inbursa.png" },
    { name: "Banorte Seguros", src: "/img/logos_aseguradoras/banorte_seguros.png" },
    { name: "BBVA Seguros", src: "/img/logos_aseguradoras/bbva_seguros.png" },
    { name: "HDI Seguros", src: "/img/logos_aseguradoras/hdi_seguros.png" },
    { name: "Seguros Atlas", src: "/img/logos_aseguradoras/seguros_atlas.png" },
    { name: "Chubb", src: "/img/logos_aseguradoras/chubb.png" },
    { name: "Qualitas", src: "/img/logos_aseguradoras/qualitas.png" },
    { name: "Sura", src: "/img/logos_aseguradoras/sura.png" },
    { name: "Sofia", src: "/img/logos_aseguradoras/sofia.png" },
    { name: "Mediaccess", src: "/img/logos_aseguradoras/Mediaccess.png" },
    
    // Remaining partners (shown on expansion)
    { name: "Blue Cross Blue Shield", src: "/img/logos_aseguradoras/BCBS_Global_Solutions_CROSS-SHIELD_rgb.png" },
    { name: "Afirme Seguros", src: "/img/logos_aseguradoras/afirme_seguros.png" },
    { name: "AIG", src: "/img/logos_aseguradoras/aig_seguros.png" },
    { name: "All Medical Plus", src: "/img/logos_aseguradoras/all_medical_plus.png" },
    { name: "Ana Seguros", src: "/img/logos_aseguradoras/ana_seguros.png" },
    { name: "Anzen Broker", src: "/img/logos_aseguradoras/anzen_broker.png" },
    { name: "Asiss", src: "/img/logos_aseguradoras/asiss.png" },
    { name: "Seguros Banamex", src: "/img/logos_aseguradoras/banamex_seguros.png" },
    { name: "Best Doctors", src: "/img/logos_aseguradoras/best_doctors.png" },
    { name: "BX+", src: "/img/logos_aseguradoras/bxmas_seguros.png" },
    { name: "Choicenet International", src: "/img/logos_aseguradoras/choicenet_international.png" },
    { name: "Cigna", src: "/img/logos_aseguradoras/cigna.png" },
    { name: "Continas", src: "/img/logos_aseguradoras/continas.png" },
    { name: "Continental Assist", src: "/img/logos_aseguradoras/continental_assist.png" },
    { name: "El Águila", src: "/img/logos_aseguradoras/el_aguila.png" },
    { name: "Emergency Assistance Japan", src: "/img/logos_aseguradoras/emergency_assistance_japan.png" },
    { name: "General de Salud", src: "/img/logos_aseguradoras/general_de_salud.png" },
    { name: "General de Seguros", src: "/img/logos_aseguradoras/general_de_seguros.png" },
    { name: "Global Excel", src: "/img/logos_aseguradoras/global_excel.png" },
    { name: "GP Mutual", src: "/img/logos_aseguradoras/gp_mutual.png" },
    { name: "HIR Seguros", src: "/img/logos_aseguradoras/hir_seguros.png" },
    { name: "La Latino Seguros", src: "/img/logos_aseguradoras/la_latino_seguros.png" },
    { name: "Lakeside Medical Group", src: "/img/logos_aseguradoras/lakeside_medical_group.png" },
    { name: "Medicost", src: "/img/logos_aseguradoras/Medicost.png" },
    { name: "Medisalud", src: "/img/logos_aseguradoras/Medisalud.png" },
    { name: "Mexhealth", src: "/img/logos_aseguradoras/mexhealth.png" },
    { name: "Panamerican Mexico", src: "/img/logos_aseguradoras/panamerican_mexico.png" },
    { name: "Passage Health", src: "/img/logos_aseguradoras/passage_health_international.png" },
    { name: "Pen Health", src: "/img/logos_aseguradoras/pen_health.png" },
    { name: "Plan Seguro", src: "/img/logos_aseguradoras/plan_seguro.png" },
    { name: "Prestige International", src: "/img/logos_aseguradoras/prestige_international.png" },
    { name: "Prevem Seguros", src: "/img/logos_aseguradoras/prevem_seguros.png" },
    { name: "Primero Seguros", src: "/img/logos_aseguradoras/primero_seguros.png" },
    { name: "Proseso", src: "/img/logos_aseguradoras/proseso.png" },
    { name: "Red Médica", src: "/img/logos_aseguradoras/red_medica.png" },
    { name: "Redbridge", src: "/img/logos_aseguradoras/redbridge.png" },
    { name: "Royal & SunAlliance", src: "/img/logos_aseguradoras/royal_sunalliance_seguros.png" },
    { name: "Seguros El Potosí", src: "/img/logos_aseguradoras/seguros_el_potosi.png" },
    { name: "Sinergia Médica", src: "/img/logos_aseguradoras/sinergia_medica.png" },
    { name: "Tactical Troop", src: "/img/logos_aseguradoras/tactical_troop.png" },
    { name: "Thona Seguros", src: "/img/logos_aseguradoras/thona_seguros.png" },
    { name: "Vumi", src: "/img/logos_aseguradoras/vumi_3ndqqb8r7x6oo.png" },
    { name: "Wellbe", src: "/img/logos_aseguradoras/wellbe.png" },
    { name: "World Travel Assist", src: "/img/logos_aseguradoras/world_travel_assist.png" },
  ];

  // Show first 18 logos initially
  const visibleInsurers = isExpanded ? allInsurers : allInsurers.slice(0, 18);

  return (
    <section className="bg-white py-20 px-4 border-b border-gray-150 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="mb-10 text-center">
          <span className="inline-flex bg-[#95c124] px-3 py-1 rounded-full text-[10px] font-medium tracking-widest text-white uppercase select-none mb-3 w-fit mx-auto">
            Aseguradoras en Convenio
          </span>
          <h2 className="font-display text-3xl font-medium tracking-tight text-mac-carbon mt-1">
            Amplia cobertura nacional e internacional
          </h2>
          <p className="text-caption font-normal text-gray-500 mt-2 max-w-lg mx-auto">
            Trabajamos con las principales instituciones financieras y fondos de asistencia médica para darte el mejor servicio.
          </p>
        </div>

        {/* Modern Clean Logo Grid - No card boxes, no borders, just raw logos with generous spacing */}
        <div className="flex flex-wrap items-center justify-center gap-x-12 sm:gap-x-20 gap-y-10 sm:gap-y-16 max-w-6xl w-full mt-12 transition-all duration-500">
          {visibleInsurers.map((insurer, idx) => (
            <img
              key={idx}
              src={insurer.src}
              alt={insurer.name}
              title={insurer.name}
              className="h-20 sm:h-28 w-auto max-w-[200px] sm:max-w-[300px] object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer select-none"
              loading="lazy"
            />
          ))}
        </div>

        {/* Expand / Collapse Button */}
        <div className="mt-10 shrink-0">
          <CTAButton
            variant="secondary"
            size="md"
            onClick={() => setIsExpanded(!isExpanded)}
            className="shadow-sm border border-mac-primary/10"
          >
            {isExpanded ? "Mostrar menos" : "Ver más"}
          </CTAButton>
        </div>

      </div>
    </section>
  );
}
