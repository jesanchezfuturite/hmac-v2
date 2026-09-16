"use client";

import React, { useMemo, useState } from "react";
import { ChevronDown, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { ACTIVE_HOSPITALS, directionsUrl, type Hospital } from "@/lib/hospitals";
import { formatDistance, withDistance } from "@/lib/geo";
import { useUserLocation } from "@/lib/useUserLocation";

/**
 * Urgencias 24/7 — doc 3.2.3
 *
 * Experiencia orientada a la acción, no una página informativa. La ubicación se
 * pide al entrar para reducir los pasos al mínimo: el usuario no debe elegir
 * estado, ciudad ni hospital antes de poder llamar o salir hacia la sede.
 *
 * La recomendación por cercanía no limita la decisión: siempre puede consultar y
 * elegir cualquier otra sede con servicio de urgencias.
 */
type HospitalWithDistance = Hospital & { distanceKm?: number };

/** Solo sedes operativas que realmente tienen el servicio */
const EMERGENCY_HOSPITALS = ACTIVE_HOSPITALS.filter((hospital) =>
  hospital.services.some((service) => service.name === "Urgencias 24/7")
);

function EmergencyActions({
  hospital,
  size = "md",
}: {
  hospital: Hospital;
  size?: "md" | "lg";
}) {
  const padding = size === "lg" ? "px-6 py-4 text-body" : "px-4 py-2.5 text-caption";

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href={`tel:${hospital.phone.replace(/\s+/g, "")}`}
        className={`flex-1 inline-flex items-center justify-center gap-2 bg-mac-danger hover:opacity-90 active:scale-[0.99] text-white font-medium rounded-lg transition-all select-none ${padding}`}
      >
        <Phone className={size === "lg" ? "w-5 h-5" : "w-4 h-4"} />
        Llamar
      </a>
      <a
        href={directionsUrl(hospital)}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex-1 inline-flex items-center justify-center gap-2 border border-mac-primary text-mac-primary hover:bg-mac-primary-tint font-medium rounded-lg transition-colors select-none ${padding}`}
      >
        <Navigation className={size === "lg" ? "w-5 h-5" : "w-4 h-4"} />
        Cómo llegar
      </a>
    </div>
  );
}

export default function Urgencias() {
  const { status, coords, request } = useUserLocation({ auto: true });
  const [showOthers, setShowOthers] = useState(false);

  const hospitals = useMemo(
    () => withDistance(EMERGENCY_HOSPITALS, coords) as HospitalWithDistance[],
    [coords]
  );

  const locating = status === "requesting";
  const located = status === "granted" && coords !== null;
  const nearest = located ? hospitals[0] : null;
  const others = located ? hospitals.slice(1) : hospitals;

  return (
    <div className="w-full bg-[#F8FAFB] min-h-screen">

      <section className="bg-mac-danger text-white px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-h1 font-medium leading-tight">Urgencias 24/7</h1>
          <p className="text-body font-normal text-white/90 mt-2">
            Atención de urgencias las 24 horas en las sedes con este servicio.
          </p>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="max-w-3xl mx-auto">

          {locating && (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
              <p className="text-body font-medium text-mac-carbon">
                Buscando el Hospital MAC más cercano…
              </p>
              <p className="text-caption font-normal text-gray-500 mt-2">
                Autoriza el acceso a tu ubicación para verlo de inmediato.
              </p>
            </div>
          )}

          {/* Hospital recomendado por cercanía */}
          {nearest && (
            <div className="bg-white border-2 border-mac-danger rounded-2xl p-6 sm:p-8">
              <span className="text-caption font-medium tracking-wider text-mac-danger uppercase">
                Hospital MAC más cercano
              </span>

              <h2 className="text-h1 font-medium text-mac-carbon mt-2 leading-tight">
                {nearest.name}
              </h2>

              {nearest.distanceKm !== undefined && (
                <p className="text-body font-medium text-mac-carbon mt-2">
                  A {formatDistance(nearest.distanceKm)} de distancia aproximada
                </p>
              )}

              <p className="flex items-start text-body font-normal text-gray-600 mt-3">
                <MapPin className="w-4 h-4 mr-2 shrink-0 text-mac-primary mt-1" />
                {nearest.address}
              </p>

              <p className="inline-flex items-center gap-2 text-caption font-medium text-mac-primary bg-mac-primary-tint rounded-full px-3 py-1 mt-4">
                <Clock className="w-3.5 h-3.5" />
                Urgencias 24/7
              </p>

              <div className="mt-6">
                <EmergencyActions hospital={nearest} size="lg" />
              </div>
            </div>
          )}

          {/* Sin ubicación la pantalla sigue siendo útil: nunca se bloquea */}
          {(status === "denied" || status === "unavailable") && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
              <p className="text-body font-medium text-mac-carbon">
                {status === "denied"
                  ? "No pudimos acceder a tu ubicación"
                  : "Tu navegador no permite compartir la ubicación"}
              </p>
              <p className="text-caption font-normal text-gray-500 mt-2">
                Estas son todas las sedes con servicio de urgencias. Puedes llamar o
                pedir indicaciones a cualquiera de ellas.
              </p>
              {status === "denied" && (
                <button
                  type="button"
                  onClick={request}
                  className="mt-4 inline-flex items-center justify-center border border-mac-primary text-mac-primary hover:bg-mac-primary-tint font-medium text-caption px-4 py-2.5 rounded-lg transition-colors"
                >
                  Intentar de nuevo
                </button>
              )}
            </div>
          )}

          {/* La recomendación no limita la decisión del paciente */}
          {others.length > 0 && (
            <div className="mt-8">
              {located ? (
                <button
                  type="button"
                  onClick={() => setShowOthers(!showOthers)}
                  className="inline-flex items-center gap-2 text-body font-medium text-mac-primary hover:text-mac-primary-dark transition-colors"
                >
                  ¿Prefieres otro hospital?
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${showOthers ? "rotate-180" : ""}`}
                  />
                </button>
              ) : (
                <h2 className="text-h2 font-medium text-mac-carbon">
                  Sedes con urgencias
                </h2>
              )}

              {(showOthers || !located) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                  {others.map((hospital) => (
                    <div
                      key={hospital.slug}
                      className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col"
                    >
                      <h3 className="text-h3 font-medium text-mac-carbon leading-tight">
                        {hospital.name}
                      </h3>
                      {hospital.distanceKm !== undefined && (
                        <p className="text-caption font-medium text-mac-primary mt-1">
                          A {formatDistance(hospital.distanceKm)}
                        </p>
                      )}
                      <p className="text-caption font-normal text-gray-500 leading-relaxed mt-2">
                        {hospital.address}
                      </p>
                      <div className="mt-auto pt-4">
                        <EmergencyActions hospital={hospital} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {located && (
            <p className="text-caption font-normal text-gray-400 mt-8">
              Las distancias son aproximadas y se calculan en línea recta.
            </p>
          )}

        </div>
      </section>
    </div>
  );
}
