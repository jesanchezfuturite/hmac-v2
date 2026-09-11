"use client";

import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { HospitalFacility, HospitalService } from "@/lib/hospitals";
import type { Doctor } from "@/components/shared/DoctorCard";

/**
 * Buscador contextual del hospital — doc 5.1.4
 *
 * Se muestra cuando la sede no tiene habilitada ninguna herramienta
 * transaccional. Debe ser una funcionalidad real: busca dentro de la información
 * publicada de ESTA sede (servicios, facilidades y médicos), no un botón que
 * redirige a una página genérica.
 */
interface HospitalContextSearchProps {
  hospitalName: string;
  services: HospitalService[];
  facilities: HospitalFacility[];
  doctors: Doctor[];
}

type Result = { key: string; type: string; title: string; detail: string; anchor: string };

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function HospitalContextSearch({
  hospitalName,
  services,
  facilities,
  doctors,
}: HospitalContextSearchProps) {
  const [query, setQuery] = useState("");

  const index: Result[] = useMemo(() => {
    const entries: Result[] = [];

    services.forEach((service) =>
      entries.push({
        key: `servicio-${service.name}`,
        type: "Servicio",
        title: service.name,
        detail: service.desc,
        anchor: "#servicios",
      })
    );

    facilities.forEach((facility) =>
      entries.push({
        key: `facilidad-${facility.name}`,
        type: "Facilidad",
        title: facility.name,
        detail: facility.desc,
        anchor: "#facilidades",
      })
    );

    doctors.forEach((doctor) =>
      entries.push({
        key: `medico-${doctor.id}`,
        type: "Médico",
        title: doctor.name,
        detail: [doctor.specialty, doctor.subspecialty, ...(doctor.attends ?? [])]
          .filter(Boolean)
          .join(" · "),
        anchor: "#medicos",
      })
    );

    return entries;
  }, [services, facilities, doctors]);

  const results = useMemo(() => {
    const term = normalize(query.trim());
    if (term.length < 2) return [];
    return index.filter((entry) =>
      normalize(`${entry.title} ${entry.detail} ${entry.type}`).includes(term)
    );
  }, [index, query]);

  const hasQuery = query.trim().length >= 2;

  return (
    <section id="buscar" className="bg-white py-10 px-4 border-b border-gray-100 scroll-mt-24">
      <div className="max-w-3xl mx-auto">
        <label
          htmlFor="hospital-search"
          className="block text-h3 font-medium text-mac-carbon mb-3"
        >
          Buscar en {hospitalName}
        </label>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            id="hospital-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Servicios, facilidades o médicos de esta sede"
            className="w-full border border-gray-200 rounded-lg pl-11 pr-4 py-3 text-body text-mac-carbon bg-white focus:outline-none focus:border-mac-primary"
          />
        </div>

        {hasQuery && (
          <div className="mt-4" aria-live="polite">
            {results.length > 0 ? (
              <ul className="divide-y divide-gray-100 border border-gray-200 rounded-lg overflow-hidden">
                {results.map((result) => (
                  <li key={result.key}>
                    <a
                      href={result.anchor}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <span className="mt-0.5 px-2 py-0.5 text-[10px] font-medium text-mac-primary bg-mac-primary-tint rounded-full shrink-0">
                        {result.type}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-body font-medium text-mac-carbon">
                          {result.title}
                        </span>
                        <span className="block text-caption font-normal text-gray-500">
                          {result.detail}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-caption font-normal text-gray-500 px-1">
                No encontramos resultados en esta sede para “{query}”.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
