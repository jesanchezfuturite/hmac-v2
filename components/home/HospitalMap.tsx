"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Building2, MapPin, Navigation, ArrowRight, Phone } from "lucide-react";
import CTAButton from "../shared/CTAButton";

export default function HospitalMap() {
  const branches = [
    {
      id: 1,
      name: "Hospital MAC Aguascalientes Norte",
      city: "Aguascalientes",
      address: "Av. Universidad 1001, Col. San José del Arenal, Aguascalientes, Ags.",
      phone: "449 123 4567",
      slug: "aguascalientes-norte",
      pinPosition: { top: "35%", left: "30%" },
    },
    {
      id: 2,
      name: "Hospital MAC Celaya",
      city: "Guanajuato",
      address: "Av. Luis Donaldo Colosio 101, Col. Valle Hermoso, Celaya, Gto.",
      phone: "461 618 0800",
      slug: "celaya",
      pinPosition: { top: "48%", left: "45%" },
    },
    {
      id: 3,
      name: "Hospital MAC Irapuato",
      city: "Guanajuato",
      address: "Av. Reforma 3102, Col. Militar, Irapuato, Gto.",
      phone: "462 123 8900",
      slug: "irapuato",
      pinPosition: { top: "45%", left: "38%" },
    },
    {
      id: 4,
      name: "Hospital MAC Puebla",
      city: "Puebla",
      address: "Periférico Ecológico 3507, San Andrés Cholula, Pue.",
      phone: "222 123 7700",
      slug: "puebla",
      pinPosition: { top: "62%", left: "65%" },
    },
    {
      id: 5,
      name: "Hospital MAC León",
      city: "Guanajuato",
      address: "Blvd. Aeropuerto 1002, Col. Predio Santa Julia, León, Gto.",
      phone: "477 123 1100",
      slug: "leon",
      pinPosition: { top: "41%", left: "40%" },
    },
    {
      id: 6,
      name: "Hospital MAC Querétaro",
      city: "Querétaro",
      address: "Blvd. Bernardo Quintana 2901, Col. Centro Sur, Querétaro, Qro.",
      phone: "442 123 2200",
      slug: "queretaro",
      pinPosition: { top: "49%", left: "50%" },
    },
  ];

  const [activeBranchId, setActiveBranchId] = useState(2); // Celaya as default active
  const activeBranch = branches.find(b => b.id === activeBranchId) || branches[1];

  return (
    <section id="hospitales" className="bg-white py-16 px-4 border-b border-gray-150 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-caption font-medium tracking-wider text-gray-400 uppercase">
              Red nacional
            </span>
            <h2 className="text-3xl font-medium tracking-tight text-mac-carbon mt-1">
              Encuentra tu hospital MAC más cercano
            </h2>
          </div>
          <div className="shrink-0">
            <CTAButton variant="outline" size="sm" href="/hospitales/celaya">
              Ver todos los hospitales
            </CTAButton>
          </div>
        </div>

        {/* Dashboard: Cards list on Left, Map on Right */}
        <div className="grid grid-cols-12 gap-8 items-stretch">
          
          {/* Column Left (45%): Scrollable cards list */}
          <div className="col-span-12 lg:col-span-5 flex flex-col space-y-4 max-h-[520px] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-gray-200">
            {branches.map((branch) => {
              const isActive = branch.id === activeBranchId;
              return (
                <div
                  key={branch.id}
                  onClick={() => setActiveBranchId(branch.id)}
                  className={`flex gap-4 p-4 border rounded-xl bg-white hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer ${
                    isActive
                      ? "border-mac-primary shadow-[0_4px_12px_rgba(26,107,60,0.06)]"
                      : "border-gray-200/80"
                  }`}
                >
                  {/* Facade Thumbnail Mock */}
                  <div className={`w-18 h-18 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                    isActive
                      ? "bg-mac-primary-tint text-mac-primary border-mac-primary/20"
                      : "bg-gray-50 text-gray-400 border-gray-200"
                  }`}>
                    <Building2 className="w-7 h-7" />
                  </div>

                  {/* Details and CTAs */}
                  <div className="flex flex-col justify-between flex-grow min-w-0">
                    <div>
                      <h4 className="text-body font-medium text-mac-carbon leading-tight truncate">
                        {branch.name}
                      </h4>
                      <p className="text-caption font-normal text-gray-500 mt-1 leading-snug">
                        {branch.address}
                      </p>
                    </div>

                    {/* CTAs base */}
                    <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100 w-full text-caption">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Cómo llegar a ${branch.name}: Abriendo coordenadas...`);
                        }}
                        className="inline-flex items-center text-gray-500 hover:text-mac-primary font-medium transition-colors cursor-pointer"
                      >
                        <Navigation className="w-3 h-3 mr-1" />
                        Cómo llegar
                      </button>
                      
                      <Link
                        href={`/hospitales/${branch.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center text-mac-primary hover:text-mac-primary-dark font-medium transition-colors"
                      >
                        Ver detalles
                        <ArrowRight className="w-3 h-3 ml-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Column Right (55%): Real Interactive Google Map */}
          <div className="col-span-12 lg:col-span-7 bg-[#F4F8F0] border border-mac-primary/10 rounded-xl overflow-hidden h-[520px]">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                activeBranch.name + " " + activeBranch.address
              )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={activeBranch.name}
              className="w-full h-full"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
