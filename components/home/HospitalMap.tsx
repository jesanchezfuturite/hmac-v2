"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Building2, Crosshair, Navigation, ArrowRight } from "lucide-react";
import CTAButton from "../shared/CTAButton";
import { ACTIVE_HOSPITALS, directionsUrl } from "@/lib/hospitals";
import { formatDistance, withDistance } from "@/lib/geo";
import { useUserLocation } from "@/lib/useUserLocation";

/**
 * Encuentra tu Hospital MAC más cercano — doc 3.6
 *
 * La estructura (listado + mapa) se conserva. Lo pendiente es la funcionalidad:
 * ordenar por proximidad usando la ubicación del usuario como recomendación
 * inicial, no como restricción, y reutilizar esa misma lógica en Urgencias 24/7.
 */
export default function HospitalMap() {
  const { status, coords, request } = useUserLocation();

  // Solo sedes operativas: una próxima apertura no debe ofrecer "Cómo llegar"
  // ni "Ver hospital" como si ya recibiera pacientes (doc 4.1.6)
  // Con ubicación autorizada, la lista se ordena por cercanía
  const branches = withDistance(ACTIVE_HOSPITALS, coords);

  // Sin selección explícita, la sede activa es la primera de la lista: la más
  // cercana cuando hay ubicación, la primera alfabéticamente cuando no
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const activeBranch = branches.find((b) => b.slug === activeSlug) ?? branches[0];

  return (
    <section id="hospitales" className="bg-white py-16 px-4 border-b border-gray-150 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-medium tracking-tight text-mac-carbon">
              Encuentra tu Hospital MAC más cercano
            </h2>

            {/* La ubicación es una recomendación inicial, no una restricción */}
            {status !== "granted" && (
              <button
                type="button"
                onClick={request}
                disabled={status === "requesting"}
                className="inline-flex items-center gap-2 text-caption font-medium text-mac-primary hover:text-mac-primary-dark transition-colors mt-2 disabled:opacity-60"
              >
                <Crosshair className="w-3.5 h-3.5" />
                {status === "requesting"
                  ? "Buscando tu ubicación…"
                  : status === "denied"
                    ? "No pudimos acceder a tu ubicación. Intentar de nuevo"
                    : "Ordenar por cercanía a mi ubicación"}
              </button>
            )}
          </div>
          <div className="shrink-0">
            <CTAButton variant="outline" size="sm" href="/hospitales">
              Ver todos los hospitales
            </CTAButton>
          </div>
        </div>

        {/* Dashboard: Cards list on Left, Map on Right */}
        <div className="grid grid-cols-12 gap-8 items-stretch">
          
          {/* Column Left (45%): Scrollable cards list */}
          <div className="col-span-12 lg:col-span-5 flex flex-col space-y-4 max-h-[520px] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-gray-200">
            {branches.map((branch) => {
              const isActive = branch.slug === activeSlug;
              return (
                <div
                  key={branch.slug}
                  onClick={() => setActiveSlug(branch.slug)}
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
                      {branch.distanceKm !== undefined && (
                        <p className="text-caption font-medium text-mac-primary mt-0.5">
                          A {formatDistance(branch.distanceKm)}
                        </p>
                      )}
                      <p className="text-caption font-normal text-gray-500 mt-1 leading-snug">
                        {branch.address}
                      </p>
                    </div>

                    {/* CTAs base */}
                    <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100 w-full text-caption">
                      <a
                        href={directionsUrl(branch)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center text-gray-500 hover:text-mac-primary font-medium transition-colors cursor-pointer"
                      >
                        <Navigation className="w-3 h-3 mr-1" />
                        Cómo llegar
                      </a>
                      
                      <Link
                        href={`/hospitales/${branch.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center text-mac-primary hover:text-mac-primary-dark font-medium transition-colors"
                      >
                        Ver hospital
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
              key={activeBranch.slug}
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
