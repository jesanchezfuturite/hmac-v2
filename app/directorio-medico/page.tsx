"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, MapPin, Search, Stethoscope } from "lucide-react";
import DoctorCard from "@/components/shared/DoctorCard";
import { DOCTORS } from "@/lib/doctors";

/**
 * Directorio Médico — doc 16
 *
 * Herramienta práctica de búsqueda y contacto, no un repositorio de currículums.
 * Resuelve: "encontré al médico que busco, ¿dónde consulta y cómo lo contacto?".
 *
 * Filtros combinables con lógica AND. "Qué atiende" queda como criterio de
 * búsqueda de una segunda etapa, cuando la taxonomía tenga información validada.
 */
const ALL = "Todos";

function DirectorioMedicoContent() {
  const searchParams = useSearchParams();

  // Contexto de navegación: desde el landing de un hospital el directorio abre
  // con esa sede ya seleccionada, y desde el buscador del Hero con la
  // especialidad o el nombre buscado (doc 16.16)
  const initialQuery = searchParams.get("q") ?? "";
  const queryIsSpecialty = DOCTORS.some(
    (doctor) => doctor.specialty.toLowerCase() === initialQuery.toLowerCase()
  );

  const [searchTerm, setSearchTerm] = useState(queryIsSpecialty ? "" : initialQuery);
  const [selectedSpecialty, setSelectedSpecialty] = useState(
    queryIsSpecialty
      ? DOCTORS.find((d) => d.specialty.toLowerCase() === initialQuery.toLowerCase())!.specialty
      : ALL
  );
  const [selectedHospital, setSelectedHospital] = useState(
    searchParams.get("hospital") ?? ALL
  );
  const [onlyRedMac360, setOnlyRedMac360] = useState(false);

  const hospitals = useMemo(() => {
    const names = new Set(
      DOCTORS.flatMap((doctor) => doctor.hospitals.map((location) => location.hospital))
    );
    return [ALL, ...Array.from(names).sort()];
  }, []);

  // Filtros dinámicos: la especialidad solo ofrece opciones con médicos
  // publicados en la sede seleccionada, para no generar resultados vacíos
  const specialties = useMemo(() => {
    const pool =
      selectedHospital === ALL
        ? DOCTORS
        : DOCTORS.filter((doctor) =>
            doctor.hospitals.some((location) => location.hospital === selectedHospital)
          );
    return [ALL, ...Array.from(new Set(pool.map((doctor) => doctor.specialty))).sort()];
  }, [selectedHospital]);

  // Si la especialidad elegida deja de existir en la sede seleccionada, la
  // búsqueda ignora ese filtro en lugar de devolver una lista vacía
  const effectiveSpecialty = specialties.includes(selectedSpecialty)
    ? selectedSpecialty
    : ALL;

  const filteredDoctors = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return DOCTORS.filter((doctor) => {
      const matchesName = term === "" || doctor.name.toLowerCase().includes(term);
      const matchesSpecialty =
        effectiveSpecialty === ALL || doctor.specialty === effectiveSpecialty;
      const matchesHospital =
        selectedHospital === ALL ||
        doctor.hospitals.some((location) => location.hospital === selectedHospital);
      const matchesRedMac = !onlyRedMac360 || Boolean(doctor.redMac360);

      return matchesName && matchesSpecialty && matchesHospital && matchesRedMac;
    });
  }, [searchTerm, effectiveSpecialty, selectedHospital, onlyRedMac360]);

  const hasActiveFilters =
    searchTerm !== "" ||
    effectiveSpecialty !== ALL ||
    selectedHospital !== ALL ||
    onlyRedMac360;

  return (
    <div className="w-full bg-gray-50 py-10 px-4 min-h-[60vh]">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-h1 font-medium text-mac-carbon">Directorio Médico</h1>
          <p className="text-body font-normal text-gray-500 mt-2 max-w-xl">
            Encuentra al médico que buscas, consulta dónde atiende y comunícate
            directamente con su consultorio.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="flex flex-col space-y-1.5">
              <label htmlFor="searchName" className="text-caption font-medium text-gray-500 flex items-center">
                <Search className="w-3.5 h-3.5 mr-1.5 text-mac-primary" />
                Nombre o apellido
              </label>
              <input
                id="searchName"
                type="search"
                placeholder="Ej. Gómez"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-body text-mac-carbon focus:outline-none focus:border-mac-primary bg-white"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label htmlFor="selectSpecialty" className="text-caption font-medium text-gray-500 flex items-center">
                <Stethoscope className="w-3.5 h-3.5 mr-1.5 text-mac-primary" />
                Especialidad
              </label>
              <select
                id="selectSpecialty"
                value={effectiveSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-body text-mac-carbon focus:outline-none focus:border-mac-primary bg-white"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty === ALL ? "Todas las especialidades" : specialty}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label htmlFor="selectHospital" className="text-caption font-medium text-gray-500 flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1.5 text-mac-primary" />
                Hospital
              </label>
              <select
                id="selectHospital"
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-body text-mac-carbon focus:outline-none focus:border-mac-primary bg-white"
              >
                {hospitals.map((hospital) => (
                  <option key={hospital} value={hospital}>
                    {hospital === ALL ? "Todos los hospitales" : hospital}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Filtro opcional Red MAC 360°, combinable con los demás */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <label htmlFor="redmac" className="flex items-start gap-2 text-caption text-gray-600 cursor-pointer">
              <input
                id="redmac"
                type="checkbox"
                checked={onlyRedMac360}
                onChange={(e) => setOnlyRedMac360(e.target.checked)}
                className="mt-0.5 accent-mac-primary"
              />
              <span>
                <span className="font-medium text-mac-carbon">Médicos de la Red MAC 360°</span>
                {/* TODO: texto definitivo a validar con Comercial y Legal (doc 16.12) */}
                <span className="block text-gray-400">
                  Médicos participantes en el programa empresarial MAC 360°. Las
                  condiciones de atención están sujetas al convenio correspondiente.
                </span>
              </span>
            </label>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSpecialty(ALL);
                  setSelectedHospital(ALL);
                  setOnlyRedMac360(false);
                }}
                className="text-caption font-medium text-mac-primary hover:text-mac-primary-dark hover:underline flex items-center shrink-0"
              >
                <Filter className="w-3 h-3 mr-1" /> Limpiar filtros
              </button>
            )}
          </div>
        </div>

        <div className="mb-6">
          <span className="text-caption font-normal text-gray-500">
            Mostrando{" "}
            <span className="font-medium text-mac-carbon">{filteredDoctors.length}</span>{" "}
            {filteredDoctors.length === 1 ? "médico" : "médicos"}
          </span>
        </div>

        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="w-full bg-white border border-gray-200 rounded-xl p-12 text-center flex flex-col items-center justify-center">
            <span className="text-h3 font-medium text-mac-carbon mb-1">
              No se encontraron médicos
            </span>
            <p className="text-caption font-normal text-gray-400 max-w-sm">
              Cambia los términos de búsqueda o limpia los filtros activos.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default function DirectorioMedico() {
  return (
    <Suspense
      fallback={
        <div className="w-full bg-gray-50 py-20 text-center text-body text-gray-500">
          Cargando el directorio médico...
        </div>
      }
    >
      <DirectorioMedicoContent />
    </Suspense>
  );
}
