"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Stethoscope, MapPin, Search, Filter } from "lucide-react";
import DoctorCard, { Doctor } from "@/components/shared/DoctorCard";

// Mock Doctors Data
const MOCK_DOCTORS: Doctor[] = [
  {
    id: "1",
    name: "Dr. Alejandro Gómez Estrada",
    specialty: "Ginecología",
    hospital: "Hospital MAC Celaya",
    initials: "AG",
    cedula: "GP-9831720",
  },
  {
    id: "2",
    name: "Dra. Sofía Ramírez Nieto",
    specialty: "Pediatría",
    hospital: "Hospital MAC CDMX",
    initials: "SR",
    cedula: "PE-8712390",
  },
  {
    id: "3",
    name: "Dr. Carlos Mendoza Santos",
    specialty: "Cardiología",
    hospital: "Hospital MAC Guadalajara",
    initials: "CM",
    cedula: "CA-7832611",
  },
  {
    id: "4",
    name: "Dra. Laura Herrera Lozano",
    specialty: "Imagenología",
    hospital: "Hospital MAC Aguascalientes",
    initials: "LH",
    cedula: "IM-6251439",
  },
  {
    id: "5",
    name: "Dr. Javier Peralta Torres",
    specialty: "Ginecología",
    hospital: "Hospital MAC Celaya",
    initials: "JP",
    cedula: "GP-5421764",
  },
  {
    id: "6",
    name: "Dra. Elena Ruiz Valadéz",
    specialty: "Cardiología",
    hospital: "Hospital MAC Celaya",
    initials: "ER",
    cedula: "CA-9182374",
  },
];

function DirectorioMedicoContent() {
  const searchParams = useSearchParams();
  
  // State for Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("Todos");
  const [selectedHospital, setSelectedHospital] = useState("Todos");

  // Read URL search params (e.g. from HeroSearch redirects)
  useEffect(() => {
    const q = searchParams.get("q");
    const l = searchParams.get("l");
    if (q) {
      // If the query matches a specialty, set it. Otherwise, set the search term.
      const matchSpecialty = MOCK_DOCTORS.some(
        (doc) => doc.specialty.toLowerCase() === q.toLowerCase()
      );
      if (matchSpecialty) {
        setSelectedSpecialty(q);
      } else {
        setSearchTerm(q);
      }
    }
    if (l) {
      // Find hospital matching location
      const matchHospital = MOCK_DOCTORS.find((doc) =>
        doc.hospital.toLowerCase().includes(l.toLowerCase())
      );
      if (matchHospital) {
        setSelectedHospital(matchHospital.hospital);
      }
    }
  }, [searchParams]);

  // Extract unique specialties and hospitals for dropdown lists
  const specialties = useMemo(() => {
    const set = new Set(MOCK_DOCTORS.map((d) => d.specialty));
    return ["Todos", ...Array.from(set)];
  }, []);

  const hospitals = useMemo(() => {
    const set = new Set(MOCK_DOCTORS.map((d) => d.hospital));
    return ["Todos", ...Array.from(set)];
  }, []);

  // Filtered doctors
  const filteredDoctors = useMemo(() => {
    return MOCK_DOCTORS.filter((doc) => {
      const matchName = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchSpecialty =
        selectedSpecialty === "Todos" ||
        doc.specialty.toLowerCase() === selectedSpecialty.toLowerCase();
      const matchHospital =
        selectedHospital === "Todos" || doc.hospital === selectedHospital;
      return matchName && matchSpecialty && matchHospital;
    });
  }, [searchTerm, selectedSpecialty, selectedHospital]);

  const handleBooking = (doctor: Doctor) => {
    alert(`Cita solicitada con ${doctor.name} (${doctor.specialty}) en ${doctor.hospital}. Nos comunicaremos contigo a la brevedad.`);
  };

  return (
    <div className="w-full bg-gray-50 py-10 px-4 min-h-[60vh]">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-8">
          <span className="text-caption font-medium tracking-wider text-gray-400 uppercase">
            Encuentra tu médico
          </span>
          <h1 className="text-h1 font-medium text-mac-carbon mt-1">
            Directorio Médico MAC
          </h1>
          <p className="text-body font-normal text-gray-500 mt-2 max-w-xl">
            Busca y filtra entre nuestros especialistas certificados de alta especialidad para agendar tu consulta médica.
          </p>
        </div>

        {/* Filter Panel (White card, rounded-xl, 1px border) */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Filter 1: Name Input */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="searchName" className="text-caption font-medium text-gray-500 flex items-center">
                <Search className="w-3.5 h-3.5 mr-1.5 text-mac-primary" />
                Nombre del médico
              </label>
              <input
                id="searchName"
                type="text"
                placeholder="Ej. Alejandro Gómez..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-body text-mac-carbon focus:outline-none focus:border-mac-primary bg-white"
              />
            </div>

            {/* Filter 2: Specialty Select */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="selectSpecialty" className="text-caption font-medium text-gray-500 flex items-center">
                <Stethoscope className="w-3.5 h-3.5 mr-1.5 text-mac-primary" />
                Especialidad
              </label>
              <select
                id="selectSpecialty"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-body text-mac-carbon focus:outline-none focus:border-mac-primary bg-white"
              >
                {specialties.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter 3: Hospital Select */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="selectHospital" className="text-caption font-medium text-gray-500 flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1.5 text-mac-primary" />
                Sede o Hospital
              </label>
              <select
                id="selectHospital"
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-body text-mac-carbon focus:outline-none focus:border-mac-primary bg-white"
              >
                {hospitals.map((hosp) => (
                  <option key={hosp} value={hosp}>
                    {hosp === "Todos" ? "Todos los hospitales" : hosp}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Reset Filters button if changes were made */}
          {(searchTerm !== "" || selectedSpecialty !== "Todos" || selectedHospital !== "Todos") && (
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSpecialty("Todos");
                  setSelectedHospital("Todos");
                }}
                className="text-caption font-medium text-mac-primary hover:text-mac-primary-dark hover:underline flex items-center"
              >
                <Filter className="w-3 h-3 mr-1" /> Limpiar filtros
              </button>
            </div>
          )}
        </div>

        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center">
          <span className="text-caption font-normal text-gray-500">
            Mostrando <span className="font-medium text-mac-carbon">{filteredDoctors.length}</span> médicos especialista(s)
          </span>
        </div>

        {/* Doctors Grid (1 column on mobile, 2 on tablet, 3 on desktop) */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onBook={handleBooking}
              />
            ))}
          </div>
        ) : (
          <div className="w-full bg-white border border-gray-200 rounded-xl p-12 text-center flex flex-col items-center justify-center">
            <span className="text-h3 font-medium text-mac-carbon mb-1">
              No se encontraron médicos
            </span>
            <p className="text-caption font-normal text-gray-400 max-w-sm">
              Intenta cambiar los términos de búsqueda o limpiar los filtros activos para encontrar más especialistas.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default function DirectorioMedico() {
  return (
    <Suspense fallback={
      <div className="w-full bg-gray-50 py-20 text-center text-body text-gray-500">
        Cargando directorio de especialistas...
      </div>
    }>
      <DirectorioMedicoContent />
    </Suspense>
  );
}
