"use client";

import React, { use } from "react";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import DoctorCard from "@/components/shared/DoctorCard";
import CTAButton from "@/components/shared/CTAButton";
import HospitalGallery from "@/components/hospital/HospitalGallery";
import HospitalFacilities from "@/components/hospital/HospitalFacilities";
import HospitalTour360 from "@/components/hospital/HospitalTour360";
import HospitalContextSearch from "@/components/hospital/HospitalContextSearch";
import { directionsUrl, getHospital, type Hospital } from "@/lib/hospitals";
import { doctorsByHospital } from "@/lib/doctors";
import { PENDING_ROUTE } from "@/lib/site";

/**
 * Landing individual de hospital — doc 5
 *
 * Recorrido: aquí estás → esto puedes hacer aquí → así es el hospital → esto
 * encontrarás durante tu estancia → estos son los médicos → aquí estamos.
 *
 * Es una plantilla dinámica, no una página por sede: todo el contenido debe
 * venir del CMS asociado al hospital.
 */
interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Sede sin ficha cargada: se muestra la plantilla con lo mínimo verificable */
function fallbackHospital(slug: string): Hospital {
  const name = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    slug,
    name: `Hospital MAC ${name}`,
    city: name,
    state: "",
    address: "",
    phone: "",
    status: "activo",
    features: { quote: false, studyScheduling: false },
    highlights: [],
    services: [],
    facilities: [],
  };
}

/**
 * CTAs del header según las funcionalidades realmente habilitadas en la sede.
 * Prioridad: conversión → información contextual → exploración (doc 5.1.5).
 */
function headerCtas(hospital: Hospital) {
  const { quote, studyScheduling } = hospital.features;

  // TODO: conectar "Cotiza tu cirugía" con el CRM y "Agenda tus estudios" con la
  // herramienta de Imagenología cuando estén activas por sede (doc 5.1.6)
  if (quote && studyScheduling) {
    return [
      { label: "Cotiza tu cirugía", href: PENDING_ROUTE, primary: true },
      { label: "Agenda tus estudios", href: PENDING_ROUTE, primary: false },
    ];
  }
  if (quote) {
    return [
      { label: "Cotiza tu cirugía", href: PENDING_ROUTE, primary: true },
      { label: "Ver servicios", href: "#servicios", primary: false },
    ];
  }
  if (studyScheduling) {
    return [
      { label: "Agenda tus estudios", href: PENDING_ROUTE, primary: true },
      { label: "Ver servicios", href: "#servicios", primary: false },
    ];
  }
  return [{ label: "Buscar en este hospital", href: "#buscar", primary: true }];
}

export default function HospitalBranch({ params }: PageProps) {
  const { slug } = use(params);

  const hospital = getHospital(slug) ?? fallbackHospital(slug);
  const doctors = doctorsByHospital(slug);
  const ctas = headerCtas(hospital);
  const showContextSearch = !hospital.features.quote && !hospital.features.studyScheduling;

  // TODO: galería administrable por sede, con fotografías reales y actuales de
  // ese hospital (doc 15.6). Los títulos describen el espacio sin sobreprometer.
  const galleryImages = [
    { src: "/img/maternidad.jpeg", alt: "Habitaciones", caption: "Habitaciones privadas" },
    { src: "/img/cardiologia.webp", alt: "Área de cardiología", caption: "Área de cardiología" },
    { src: "/img/pediatria.webp", alt: "Área de pediatría", caption: "Área de pediatría" },
    { src: "/img/cirugia.webp", alt: "Quirófanos", caption: "Quirófanos" },
  ];

  return (
    <div className="w-full bg-white flex flex-col min-h-screen">

      {/* Header: aquí estás → esto puedes hacer aquí → aquí puedes llegar */}
      <section className="bg-mac-primary-dark text-white py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3">
            <h1 className="text-h1 font-medium text-white leading-tight">
              {hospital.name}
            </h1>

            {/* La dirección es el acceso a "Cómo llegar": no hace falta un botón
                independiente (doc 5.1.2) */}
            {hospital.address && (
              <a
                href={directionsUrl(hospital)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start text-body font-normal text-mac-primary-light max-w-xl hover:text-white transition-colors"
              >
                <MapPin className="w-4 h-4 mr-2 shrink-0 mt-0.5 text-white" />
                <span className="underline underline-offset-4 decoration-white/30">
                  {hospital.address}
                </span>
              </a>
            )}
          </div>

          {/* CTAs de alta intención, sin repetir accesos globales como el Call Center */}
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            {ctas.map((cta) => (
              <CTAButton
                key={cta.label}
                variant={cta.primary ? "secondary" : "outline"}
                size="md"
                href={cta.href}
                className={
                  cta.primary
                    ? "w-full sm:w-auto"
                    : "text-white border-white hover:bg-white hover:text-mac-primary-dark w-full sm:w-auto"
                }
              >
                {cta.label}
              </CTAButton>
            ))}
          </div>
        </div>
      </section>

      {/* Buscador contextual cuando la sede no tiene herramientas transaccionales */}
      {showContextSearch && (
        <HospitalContextSearch
          hospitalName={hospital.name}
          services={hospital.services}
          facilities={hospital.facilities}
          doctors={doctors}
        />
      )}

      {/* Servicios disponibles en esta sede — resumen local y accionable */}
      {hospital.services.length > 0 && (
        <section id="servicios" className="bg-white py-14 px-4 border-b border-gray-100 scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <h2 className="text-h2 font-medium text-mac-carbon">
                Servicios disponibles en este hospital
              </h2>
              <p className="text-body font-normal text-gray-500 mt-2 max-w-xl">
                Qué puedes utilizar específicamente en esta sede.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {hospital.services.map((service) => (
                <div
                  key={service.name}
                  className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col justify-between hover:border-mac-primary transition-colors"
                >
                  <div>
                    <h3 className="text-h3 font-medium text-mac-carbon mb-2">
                      {service.name}
                    </h3>
                    <p className="text-caption font-normal text-gray-500 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  {/* Conserva el contexto de la sede al abrir el servicio */}
                  <Link
                    href={`/servicios/${service.slug}?hospital=${hospital.slug}`}
                    className="inline-block mt-4 text-caption font-medium text-mac-primary hover:text-mac-primary-dark transition-colors"
                  >
                    Conocer servicio
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <HospitalGallery hospitalName={hospital.name} images={galleryImages} />

      {/* Solo en las sedes que tienen recorrido disponible */}
      {hospital.tour360Url && <HospitalTour360 tourUrl={hospital.tour360Url} />}

      <div id="facilidades" className="scroll-mt-24">
        <HospitalFacilities facilities={hospital.facilities} />
      </div>

      {/* La sección no se muestra si la sede no tiene médicos publicables */}
      {doctors.length > 0 && (
        <section id="medicos" className="bg-gray-50 py-14 px-4 border-b border-gray-100 scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <h2 className="text-h2 font-medium text-mac-carbon">
                Médicos en {hospital.name}
              </h2>
              <div className="shrink-0">
                {/* Abre el Directorio Médico con esta sede ya filtrada */}
                <CTAButton
                  variant="outline"
                  size="sm"
                  href={`/directorio-medico?hospital=${encodeURIComponent(hospital.name)}`}
                >
                  Ver médicos de este hospital
                </CTAButton>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {doctors.slice(0, 4).map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ubicación: confirmación y contexto geográfico al final del recorrido */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-4xl mx-auto flex flex-col">
          <div className="mb-8">
            <h2 className="text-h2 font-medium text-mac-carbon">Ubicación</h2>
            {hospital.address && (
              <p className="text-body font-normal text-gray-500 mt-2">
                {hospital.address}
              </p>
            )}
            {hospital.phone && (
              <a
                href={`tel:${hospital.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 text-body font-medium text-mac-primary hover:text-mac-primary-dark transition-colors mt-2"
              >
                <Phone className="w-4 h-4" />
                {hospital.phone}
              </a>
            )}
          </div>

          <div className="w-full h-[350px] border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                `${hospital.name} ${hospital.address}`
              )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={hospital.name}
              className="w-full h-full"
            />
          </div>

          <div className="mt-6">
            <CTAButton variant="outline" size="md" href={directionsUrl(hospital)}>
              Cómo llegar
            </CTAButton>
          </div>
        </div>
      </section>

    </div>
  );
}
