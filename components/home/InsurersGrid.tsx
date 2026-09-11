"use client";

import React, { useState } from "react";
import { Building2 } from "lucide-react";
import CTAButton from "../shared/CTAButton";
import { PENDING_ROUTE } from "@/lib/site";

/**
 * Más opciones para cuidar tu salud — doc 3.9
 *
 * Concepto paraguas que comparte espacio en Home para las dos vías de acceso a
 * beneficios, sin fusionarlas:
 *   Aseguradoras → respaldo y cobertura para pacientes asegurados.
 *   Empresas     → beneficios de salud para colaboradores con convenio.
 *
 * En Home solo se muestra una selección representativa de logos; el listado
 * completo vive en el directorio de aseguradoras.
 */
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

  // Selección representativa para Home; el resto se consulta en el directorio
  const FEATURED_COUNT = 12;
  const visibleInsurers = isExpanded ? allInsurers : allInsurers.slice(0, FEATURED_COUNT);

  return (
    <section className="bg-white py-20 px-4 border-b border-gray-150">
      <div className="max-w-7xl mx-auto flex flex-col">

        <div className="mb-14 text-center">
          <h2 className="font-display text-3xl font-medium tracking-tight text-mac-carbon">
            Más opciones para cuidar tu salud
          </h2>
        </div>

        {/* Bloque 1 — Aseguradoras */}
        <div className="flex flex-col items-center">
          <div className="text-center max-w-2xl">
            <h3 className="font-display text-2xl font-medium text-mac-carbon">
              Amplia cobertura nacional e internacional
            </h3>
            <p className="text-body font-normal text-gray-500 mt-3">
              Contamos con convenios con las principales aseguradoras nacionales y
              con una amplia red de aseguradoras internacionales, facilitando el
              acceso de nuestros pacientes a la atención médica que necesitan.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-12 sm:gap-x-16 gap-y-10 max-w-6xl w-full mt-12">
            {visibleInsurers.map((insurer) => (
              <img
                key={insurer.name}
                src={insurer.src}
                alt={insurer.name}
                title={insurer.name}
                className="h-16 sm:h-20 w-auto max-w-[180px] sm:max-w-[220px] object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 select-none"
                loading="lazy"
              />
            ))}
          </div>

          {/* TODO: el CTA debe llevar al directorio funcional de aseguradoras,
              con búsqueda y consulta de dónde aplica cada convenio (doc 3.9.4).
              Mientras tanto expande el listado dentro de la Home. */}
          <div className="mt-10">
            <CTAButton
              variant="outline"
              size="md"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Mostrar menos" : "Ver todas las aseguradoras"}
            </CTAButton>
          </div>

          {/* Tener convenio no equivale a tener cobertura garantizada (doc 3.9.4) */}
          <p className="text-caption font-normal text-gray-400 text-center max-w-2xl mt-6 leading-relaxed">
            La cobertura y condiciones de atención dependen de las condiciones
            particulares de cada póliza y de la autorización correspondiente de la
            aseguradora.
          </p>
        </div>

        {/* Bloque 2 — Empresas: mismo espacio, experiencia diferenciada */}
        <div className="mt-16 pt-12 border-t border-gray-150">
          <div className="bg-[#F8FAFB] border border-gray-200 rounded-2xl p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="w-12 h-12 rounded-xl bg-mac-primary-tint text-mac-primary flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>

            <div className="flex-1">
              <h3 className="font-display text-2xl font-medium text-mac-carbon">
                Empresas
              </h3>
              <p className="text-body font-normal text-gray-500 mt-2 max-w-2xl">
                Beneficios de salud disponibles para colaboradores de empresas con
                convenio vigente con Hospitales MAC.
              </p>
            </div>

            {/* TODO: landing de beneficios para empresas, adaptable por convenio
                (doc 3.9.6) */}
            <div className="shrink-0">
              <CTAButton variant="primary" size="lg" href={PENDING_ROUTE}>
                Conoce tus beneficios
              </CTAButton>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
