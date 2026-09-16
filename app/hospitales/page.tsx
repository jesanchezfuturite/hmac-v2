"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Building2, Crosshair, MapPin, Navigation, Phone, Search } from "lucide-react";
import {
  ACTIVE_HOSPITALS,
  COVERAGE,
  UPCOMING_HOSPITALS,
  directionsUrl,
  matchesLocation,
  type Hospital,
} from "@/lib/hospitals";
import { formatDistance, withDistance } from "@/lib/geo";
import { useUserLocation } from "@/lib/useUserLocation";

/**
 * Directorio de Hospitales — doc 4.1
 *
 * Cumple tres funciones a la vez: encontrar, explorar y conocer la red. Por eso
 * las sedes se muestran completas sin obligar a usar el buscador, y el buscador
 * resuelve solo ubicación: código postal, ciudad o estado.
 *
 * Las próximas aperturas conviven en la misma página, claramente identificadas y
 * sin acciones que impliquen que ya reciben pacientes.
 */

/** Varias sedes están en una ciudad homónima de su estado: no se repite */
function locationLabel(hospital: Hospital) {
  return hospital.city === hospital.state
    ? hospital.city
    : `${hospital.city}, ${hospital.state}`;
}

/** Marcador neutro mientras no haya fotografía real de la sede. El documento
 *  prohíbe usar stock o fotos de otras unidades para representar un hospital. */
function HospitalImage({ hospital }: { hospital: Hospital }) {
  if (hospital.image) {
    return (
      <img
        src={hospital.image}
        alt={hospital.name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    );
  }
  return (
    <div className="w-full h-full bg-gradient-to-br from-mac-primary-tint to-[#F8FAFB] flex items-center justify-center">
      <Building2 className="w-8 h-8 text-mac-primary/40" />
    </div>
  );
}

function HospitalCard({
  hospital,
  isActive,
  onSelect,
}: {
  hospital: Hospital & { distanceKm?: number };
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`flex flex-col bg-white border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isActive
          ? "border-mac-primary shadow-[0_8px_24px_rgba(26,107,60,0.10)]"
          : "border-gray-200 hover:border-mac-primary/40 hover:shadow-md"
      }`}
    >
      <div className="h-32 shrink-0">
        <HospitalImage hospital={hospital} />
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-h3 font-medium text-mac-carbon leading-tight">
          {hospital.name}
        </h3>
        <p className="text-caption font-medium text-mac-primary mt-1">
          {locationLabel(hospital)}
          {hospital.distanceKm !== undefined && (
            <span className="text-gray-400">
              {" "}· a {formatDistance(hospital.distanceKm)}
            </span>
          )}
        </p>

        <p className="text-caption font-normal text-gray-500 leading-relaxed mt-3">
          {hospital.address}
        </p>

        {/* Servicios destacados: varían según las capacidades reales de la sede */}
        {hospital.highlights.length > 0 && (
          <p className="text-caption font-normal text-gray-600 mt-3">
            {hospital.highlights.join(" · ")}
          </p>
        )}

        <a
          href={`tel:${hospital.phone.replace(/\s+/g, "")}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 text-caption font-medium text-mac-carbon hover:text-mac-primary transition-colors mt-3"
        >
          <Phone className="w-3.5 h-3.5 text-mac-primary" />
          {hospital.phone}
        </a>

        <div className="flex items-center gap-3 mt-auto pt-5">
          <Link
            href={`/hospitales/${hospital.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 inline-flex items-center justify-center bg-mac-primary hover:bg-mac-primary-dark text-white font-medium text-caption px-4 py-2.5 rounded-lg transition-colors select-none"
          >
            Ver hospital
          </Link>
          <a
            href={directionsUrl(hospital)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center gap-1.5 border border-mac-primary text-mac-primary hover:bg-mac-primary-tint font-medium text-caption px-4 py-2.5 rounded-lg transition-colors select-none"
          >
            <Navigation className="w-3.5 h-3.5" />
            Cómo llegar
          </a>
        </div>
      </div>
    </div>
  );
}

export default function DirectorioHospitales() {
  const [query, setQuery] = useState("");
  // Sin selección explícita, la sede activa es la primera del resultado
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const { status, coords, request } = useUserLocation();

  // Con ubicación autorizada el listado se ordena por cercanía; sin ella
  // conserva el orden alfabético (doc 4.1.4)
  const results = useMemo(
    () =>
      withDistance(
        ACTIVE_HOSPITALS.filter((hospital) => matchesLocation(hospital, query)),
        coords
      ),
    [query, coords]
  );

  // El mapa acompaña a la búsqueda: si la sede activa deja de estar entre los
  // resultados, se muestra la primera coincidencia
  const activeHospital =
    results.find((hospital) => hospital.slug === activeSlug) ?? results[0];

  return (
    <div className="w-full bg-[#F8FAFB] min-h-screen">

      <section className="bg-white border-b border-gray-200 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-h1 font-medium text-mac-carbon">
            Encuentra tu Hospital MAC
          </h1>
          {/* TODO: el documento pide "25 hospitales en 18 ciudades"; la cifra se
              deriva de las sedes cargadas hasta que el cliente la valide */}
          <p className="text-body font-normal text-gray-500 mt-2 max-w-2xl">
            {COVERAGE.hospitals} hospitales en {COVERAGE.states} estados para acercarte
            la atención médica que necesitas.
          </p>

          {/* Buscador de ubicación: no mezcla servicios, especialidades ni médicos */}
          <div className="relative mt-8 max-w-xl">
            <label htmlFor="buscador-sedes" className="sr-only">
              Busca por código postal, ciudad o estado
            </label>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              id="buscador-sedes"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Busca por código postal, ciudad o estado"
              className="w-full border border-gray-200 rounded-lg pl-11 pr-4 py-3 text-body text-mac-carbon bg-white focus:outline-none focus:border-mac-primary"
            />
          </div>

          {status !== "granted" && (
            <button
              type="button"
              onClick={request}
              disabled={status === "requesting"}
              className="inline-flex items-center gap-2 text-caption font-medium text-mac-primary hover:text-mac-primary-dark transition-colors mt-4 disabled:opacity-60"
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
      </section>

      <section className="px-4 py-10">
        <div className="max-w-7xl mx-auto">

          <div className="mb-6">
            <span className="text-caption font-normal text-gray-500">
              Mostrando{" "}
              <span className="font-medium text-mac-carbon">{results.length}</span>{" "}
              {results.length === 1 ? "hospital" : "hospitales"}
              {query.trim() && " para tu búsqueda"}
              {status === "granted" && ", ordenados por cercanía"}
            </span>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-12 gap-8 items-start">
              {/* Las sedes se muestran completas: el usuario no está obligado a
                  buscar para conocer la red (doc 4.1.3) */}
              <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((hospital) => (
                  <HospitalCard
                    key={hospital.slug}
                    hospital={hospital}
                    isActive={activeHospital?.slug === hospital.slug}
                    onSelect={() => setActiveSlug(hospital.slug)}
                  />
                ))}
              </div>

              {/* Mapa complementario, sincronizado con la búsqueda */}
              <div className="hidden lg:block col-span-4 sticky top-28">
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                  <div className="h-[420px]">
                    {activeHospital && (
                      <iframe
                        key={activeHospital.slug}
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(
                          `${activeHospital.name} ${activeHospital.address}`
                        )}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={activeHospital.name}
                        className="w-full h-full"
                      />
                    )}
                  </div>
                  {activeHospital && (
                    <div className="p-5 border-t border-gray-100">
                      <h2 className="text-h3 font-medium text-mac-carbon leading-tight">
                        {activeHospital.name}
                      </h2>
                      <p className="flex items-start text-caption font-normal text-gray-500 mt-2">
                        <MapPin className="w-3.5 h-3.5 mr-1.5 shrink-0 text-mac-primary mt-0.5" />
                        {activeHospital.address}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
              <span className="text-h3 font-medium text-mac-carbon block mb-1">
                No encontramos hospitales en esa ubicación
              </span>
              <p className="text-caption font-normal text-gray-400 max-w-sm mx-auto">
                Prueba con otra ciudad, estado o código postal.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* Próximas aperturas: conviven en el directorio, claramente identificadas y
          sin acciones que impliquen que la sede ya recibe pacientes (doc 4.1.6) */}
      {UPCOMING_HOSPITALS.length > 0 && (
        <section className="px-4 pb-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-h2 font-medium text-mac-carbon mb-6">
              Próximas aperturas
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {UPCOMING_HOSPITALS.map((hospital) => (
                <div
                  key={hospital.slug}
                  className="flex flex-col bg-white border border-dashed border-gray-300 rounded-2xl overflow-hidden"
                >
                  <div className="h-32 shrink-0 relative">
                    <HospitalImage hospital={hospital} />
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-medium tracking-widest uppercase text-white bg-mac-carbon/80 rounded-full">
                      Próximamente
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-h3 font-medium text-mac-carbon leading-tight">
                      {hospital.name}
                    </h3>
                    <p className="text-caption font-medium text-mac-primary mt-1">
                      {locationLabel(hospital)}
                    </p>
                    <p className="text-caption font-normal text-gray-500 leading-relaxed mt-3">
                      {hospital.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
