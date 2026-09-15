import React from "react";
import Link from "next/link";
import { Instagram, Linkedin, Youtube, Phone } from "lucide-react";
import { CALL_CENTER, EXTERNAL, PENDING_ROUTE, SOCIAL } from "@/lib/site";

/** lucide no trae el logotipo de X: su icono `X` es el aspa de cerrar */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Instagram,
  LinkedIn: Linkedin,
  X: XIcon,
  YouTube: Youtube,
};

/**
 * Footer global — doc 3.11
 *
 * Última capa de navegación, servicio, conversión e información institucional.
 * Es el mismo componente en todas las páginas: no hay footers por sección.
 *
 * Cada enlace debe cumplir una función: navegar, resolver, convertir, informar o
 * cumplir una obligación legal. Facturación queda fuera mientras no exista la
 * funcionalidad real.
 */
const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Hospitales MAC",
    links: [
      { label: "Somos", href: PENDING_ROUTE },
      { label: "Hospitales", href: "/hospitales" },
      { label: "Directorio médico", href: "/directorio-medico" },
      { label: "Servicios", href: PENDING_ROUTE },
      { label: "Maternidad", href: "/maternidad" },
      { label: "Promociones", href: PENDING_ROUTE },
    ],
  },
  {
    title: "Soy paciente",
    links: [
      { label: "Pre-registro", href: EXTERNAL.preRegistro },
      { label: "Directorio médico", href: "/directorio-medico" },
      { label: "Resultados en línea", href: EXTERNAL.resultadosEnLinea },
      { label: "Referencia de pago", href: EXTERNAL.referenciaPago },
      { label: "Agenda tu estudio", href: EXTERNAL.agendaEstudios },
      { label: "Cotiza tu cirugía", href: PENDING_ROUTE },
      { label: "Aseguradoras", href: PENDING_ROUTE },
      { label: "Encuentra tu hospital", href: "/hospitales" },
    ],
  },
  {
    title: "Soy médico",
    links: [
      { label: "Portal de médicos", href: EXTERNAL.portalMedicos },
      { label: "Credencialización", href: PENDING_ROUTE },
      { label: "Consultorios", href: PENDING_ROUTE },
      { label: "Información para médicos", href: PENDING_ROUTE },
    ],
  },
  {
    title: "Empresas",
    links: [
      { label: "Beneficios para colaboradores", href: PENDING_ROUTE },
      { label: "Convenios empresariales", href: PENDING_ROUTE },
      { label: "Check-ups corporativos", href: PENDING_ROUTE },
      { label: "Medicina del trabajo", href: PENDING_ROUTE },
      { label: "Contacto empresarial", href: EXTERNAL.contactoEmpresas },
    ],
  },
];

// Los perfiles vigentes salen de lib/site.ts. El documento daba por supuestos
// Facebook y TikTok, que el sitio actual no tiene.
const INSTITUTIONAL = [
  { label: "Fundación Hospitales MAC", href: PENDING_ROUTE },
  { label: "Inversionistas", href: EXTERNAL.inversionistas },
  { label: "Código de Ética", href: PENDING_ROUTE },
  { label: "Trabaja con nosotros", href: EXTERNAL.bolsaTrabajo },
  { label: "Sala de prensa", href: PENDING_ROUTE },
];

const LEGAL = ["Aviso de privacidad", "Términos de uso", "Política de cookies"];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-mac-primary-dark to-black text-white pt-12 pb-6 px-4 border-t border-white/10">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
        {/* Identidad */}
        <div className="flex flex-col space-y-4 lg:col-span-2">
          <Link href="/" className="flex items-center">
            <img
              src="/img/hospitales-mac.svg"
              alt="Hospitales MAC Logo"
              className="h-28 w-auto brightness-0 invert"
            />
          </Link>
          <p className="text-caption font-normal text-white/90 max-w-xs leading-relaxed">
            Atención médica de alta especialidad, cerca de ti.
          </p>
          <div className="flex space-x-3 pt-2">
            {SOCIAL.map(({ label, href }) => {
              const Icon = SOCIAL_ICONS[label];
              return (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Navegación por categoría */}
        {COLUMNS.map((column) => (
          <div key={column.title} className="flex flex-col space-y-3">
            <span className="text-body font-medium text-mac-primary-light uppercase tracking-wider">
              {column.title}
            </span>
            <nav className="flex flex-col space-y-2 text-body font-normal text-white/95">
              {column.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-mac-primary-light transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* Zona de contacto: el Call Center no queda escondido dentro de una columna */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-t border-white/10">
        <div>
          <span className="text-body font-medium text-white">¿Necesitas ayuda?</span>
          <p className="text-caption font-normal text-white/70 mt-1">
            {CALL_CENTER.display} · {CALL_CENTER.label}
          </p>
        </div>
        <a
          href={`tel:${CALL_CENTER.tel}`}
          className="inline-flex items-center justify-center gap-2 bg-mac-primary hover:bg-mac-primary-dark text-white font-medium text-body px-5 py-2.5 rounded-lg transition-colors duration-200 select-none w-full sm:w-auto"
        >
          <Phone className="w-4 h-4" />
          Llamar ahora
        </a>
      </div>

      {/* Información institucional */}
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10 text-body font-normal text-white/95">
        {INSTITUTIONAL.map(({ label, href }, idx) => (
          <React.Fragment key={label}>
            {idx > 0 && <span className="text-white/30">·</span>}
            <Link href={href} className="hover:text-mac-primary-light transition-colors">
              {label}
            </Link>
          </React.Fragment>
        ))}
      </div>

      {/* Información legal */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-caption font-normal text-white/60 space-y-4 md:space-y-0">
        <span>© 2026 Hospitales MAC · Todos los derechos reservados</span>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {LEGAL.map((label) => (
            <Link key={label} href={PENDING_ROUTE} className="hover:text-white transition-colors">
              {label}
            </Link>
          ))}
        </div>
      </div>

    </footer>
  );
}
