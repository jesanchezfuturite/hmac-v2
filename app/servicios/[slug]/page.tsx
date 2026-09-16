"use client";

import React, { Suspense, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, ChevronLeft, MapPin } from "lucide-react";
import CTAButton from "@/components/shared/CTAButton";
import { getHospital, getService, hospitalsWithService } from "@/lib/hospitals";

/**
 * Página nacional de un servicio — doc 5.2.3
 *
 * Contiene el contenido general y reutilizable del servicio. Lo que cambia por
 * sede —horarios, estudios, equipamiento, requisitos— pertenece a la relación
 * Servicio ↔ Hospital y se administrará desde CMS: aquí no se duplica.
 *
 * Cuando el usuario llega desde un hospital, la página conserva el contexto de
 * esa sede en lugar de mandarlo a una página nacional genérica (doc 5.2.10).
 */
function ServicioContent({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const service = getService(slug);

  if (!service) notFound();

  const sedes = hospitalsWithService(slug);
  const contextSlug = searchParams.get("hospital");
  const contextHospital = contextSlug ? getHospital(contextSlug) : undefined;
  // El contexto solo vale si el servicio existe en esa sede
  const inContext =
    contextHospital && sedes.some((sede) => sede.slug === contextHospital.slug)
      ? contextHospital
      : undefined;

  return (
    <div className="w-full bg-[#F8FAFB] min-h-screen">

      <section className="bg-white border-b border-gray-200 px-4 py-12">
        <div className="max-w-4xl mx-auto">

          {inContext ? (
            <Link
              href={`/hospitales/${inContext.slug}`}
              className="inline-flex items-center gap-1.5 text-caption font-medium text-mac-primary hover:text-mac-primary-dark transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              {inContext.name}
            </Link>
          ) : (
            <Link
              href="/servicios"
              className="inline-flex items-center gap-1.5 text-caption font-medium text-mac-primary hover:text-mac-primary-dark transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Servicios
            </Link>
          )}

          <span className="block text-caption font-medium tracking-wider text-gray-400 uppercase mt-4">
            {service.category}
          </span>
          <h1 className="text-h1 font-medium text-mac-carbon mt-1">{service.name}</h1>
          <p className="text-body font-normal text-gray-500 mt-3 max-w-2xl">
            {service.summary}
          </p>

          <div className="mt-8">
            <CTAButton variant="primary" size="lg" href={service.cta.href}>
              {service.cta.label}
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Contexto de la sede desde la que llegó el usuario */}
      {inContext && (
        <section className="px-4 pt-10">
          <div className="max-w-4xl mx-auto bg-mac-primary-tint border border-mac-primary/20 rounded-2xl p-6">
            <h2 className="text-h3 font-medium text-mac-carbon">
              {service.name} en {inContext.name}
            </h2>
            <p className="flex items-start text-caption font-normal text-gray-600 mt-2">
              <MapPin className="w-3.5 h-3.5 mr-1.5 shrink-0 text-mac-primary mt-0.5" />
              {inContext.address}
            </p>
            {/* TODO: información local del servicio —horario, estudios disponibles,
                equipamiento, requisitos— desde la relación Servicio ↔ Hospital (doc 5.2.8) */}
            <div className="flex flex-wrap gap-3 mt-4">
              <CTAButton variant="outline" size="sm" href={`/hospitales/${inContext.slug}`}>
                Ver el hospital
              </CTAButton>
              <CTAButton
                variant="outline"
                size="sm"
                href={`tel:${inContext.phone.replace(/\s+/g, "")}`}
              >
                Llamar a la sede
              </CTAButton>
            </div>
          </div>
        </section>
      )}

      {service.includes.length > 0 && (
        <section className="px-4 py-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-medium text-mac-carbon mb-5">
              Qué incluye
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 bg-white border border-gray-200 rounded-xl px-4 py-3 text-body font-normal text-mac-carbon"
                >
                  <Check className="w-4 h-4 text-mac-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            {/* TODO: la descripción de cada estudio o procedimiento vive hoy en el
                sitio actual; se migra con el contenido (lote G) */}
          </div>
        </section>
      )}

      {/* La disponibilidad responde a las capacidades reales de cada sede */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-h2 font-medium text-mac-carbon mb-2">
            Encuentra {service.name} en Hospitales MAC
          </h2>
          <p className="text-caption font-normal text-gray-500 mb-6">
            Disponible en {sedes.length} de nuestras sedes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sedes.map((sede) => (
              <Link
                key={sede.slug}
                href={`/hospitales/${sede.slug}`}
                className={`group flex flex-col bg-white border rounded-xl p-5 transition-all ${
                  inContext?.slug === sede.slug
                    ? "border-mac-primary shadow-[0_4px_16px_rgba(26,107,60,0.08)]"
                    : "border-gray-200 hover:border-mac-primary/40"
                }`}
              >
                <h3 className="text-h3 font-medium text-mac-carbon leading-tight">
                  {sede.name}
                </h3>
                <p className="text-caption font-normal text-gray-500 mt-1">
                  {sede.city === sede.state ? sede.city : `${sede.city}, ${sede.state}`}
                </p>
                <span className="inline-flex items-center gap-1.5 text-caption font-medium text-mac-primary mt-4 group-hover:gap-2.5 transition-all">
                  Ver hospital
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ServicioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return (
    <Suspense
      fallback={
        <div className="w-full py-20 text-center text-body text-gray-500">
          Cargando el servicio…
        </div>
      }
    >
      <ServicioContent slug={slug} />
    </Suspense>
  );
}
