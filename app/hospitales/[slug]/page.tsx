"use client";

import React, { use } from "react";
import { MapPin, Phone, Compass, HeartPulse, ShieldCheck, Activity, Brain, ShieldAlert, Calendar } from "lucide-react";
import DoctorCard, { Doctor } from "@/components/shared/DoctorCard";
import CTAButton from "@/components/shared/CTAButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Mock doctors specifically for Celaya (4 doctors)
const LOCAL_DOCTORS: Doctor[] = [
  {
    id: "1",
    name: "Dr. Alejandro Gómez Estrada",
    specialty: "Ginecología",
    hospital: "Hospital MAC Celaya",
    initials: "AG",
    cedula: "GP-9831720",
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
  {
    id: "7",
    name: "Dr. Andrés Muñoz Rizo",
    specialty: "Pediatría",
    hospital: "Hospital MAC Celaya",
    initials: "AM",
    cedula: "PE-2938173",
  },
];

export default function HospitalBranch({ params }: PageProps) {
  const { slug } = use(params);

  // Capitalize slug for heading display
  const branchName = slug.charAt(0).toUpperCase() + slug.slice(1);
  const titleName = `Hospital MAC ${branchName}`;

  const address = branchName === "Celaya"
    ? "Av. Luis Donaldo Colosio 101, Col. Valle Hermoso, C.P. 38010, Celaya, Gto."
    : `Av. Universidad Nacional 820, Col. Centro, C.P. 20000, ${branchName}, México.`;

  const phone = branchName === "Celaya" ? "461 618 0800" : "800 622 0800";

  const handleBooking = (doctor: Doctor) => {
    alert(`Cita solicitada con ${doctor.name} en ${titleName}. Nos comunicaremos a la brevedad.`);
  };

  const branchServices = [
    { name: "Urgencias 24/7", desc: "Médicos urgenciólogos listos para atenderte a cualquier hora.", icon: <ShieldAlert className="w-5 h-5 text-mac-primary" /> },
    { name: "Quirófanos", desc: "Equipamiento de alta especialidad para procedimientos complejos.", icon: <HeartPulse className="w-5 h-5 text-mac-primary" /> },
    { name: "Consulta Externa", desc: "Médicos especialistas certificados en más de 20 áreas.", icon: <Activity className="w-5 h-5 text-mac-primary" /> },
    { name: "Terapia Intensiva", desc: "Unidad de cuidados intensivos para adultos y cuidados neonatales.", icon: <Brain className="w-5 h-5 text-mac-primary" /> },
  ];

  return (
    <div className="w-full bg-white flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-mac-primary-dark text-white py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3">
            <span className="inline-block px-2.5 py-0.5 text-caption font-medium text-white bg-white/10 rounded-full border border-white/10">
              Sede Hospitalaria
            </span>
            <h1 className="text-h1 font-medium text-white leading-tight">
              {titleName}
            </h1>
            <div className="flex items-start text-body font-normal text-mac-primary-light max-w-xl">
              <MapPin className="w-4 h-4 mr-2 shrink-0 mt-0.5 text-white" />
              <span>{address}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <CTAButton
              variant="outline"
              size="md"
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="text-white border-white hover:bg-white hover:text-mac-primary-dark w-full sm:w-auto"
              icon={<Phone className="w-4 h-4" />}
            >
              Llamar a Sede
            </CTAButton>
            <CTAButton
              variant="secondary"
              size="md"
              onClick={() => alert(`Abriendo mapas de navegación para la sede ${titleName}...`)}
              className="w-full sm:w-auto"
              icon={<Compass className="w-4 h-4" />}
            >
              Cómo llegar
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="bg-white py-14 px-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-left">
            <span className="text-caption font-medium tracking-wider text-gray-400 uppercase">
              Servicios Locales
            </span>
            <h2 className="text-h2 font-medium text-mac-carbon mt-1">
              Capacidad médica y especialidades en esta sede
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {branchServices.map((service, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between hover:border-mac-primary transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-mac-primary-tint flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-h3 font-medium text-mac-carbon mb-2">
                    {service.name}
                  </h3>
                  <p className="text-caption font-normal text-gray-500 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="bg-gray-50 py-14 px-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-caption font-medium tracking-wider text-gray-400 uppercase">
                Médicos en Sede
              </span>
              <h2 className="text-h2 font-medium text-mac-carbon mt-1">
                Especialistas disponibles en {branchName}
              </h2>
            </div>
            <div className="shrink-0">
              <CTAButton variant="outline" size="sm" href={`/directorio-medico?l=${slug}`}>
                Ver todos los médicos de la sede
              </CTAButton>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOCAL_DOCTORS.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onBook={handleBooking}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-white py-14 px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="mb-8">
            <span className="text-caption font-medium tracking-wider text-gray-400 uppercase">
              Ubicación
            </span>
            <h2 className="text-h2 font-medium text-mac-carbon mt-1">
              Dirección interactiva de la sede {branchName}
            </h2>
          </div>

          {/* Real Interactive Google Map */}
          <div className="w-full h-[350px] border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                titleName + " " + address
              )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={titleName}
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
