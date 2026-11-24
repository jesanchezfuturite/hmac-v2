import React from "react";
import { ArrowRight, Check, ShieldCheck, Stethoscope, TrendingDown } from "lucide-react";
import CTAButton from "@/components/shared/CTAButton";
import { EXTERNAL } from "@/lib/site";

/**
 * Empresas — beneficios de salud para colaboradores
 *
 * Contenido entregado por el cliente el 17-11-2026 (adjunto
 * "Revisión web 17:11:26.docx", vía Verónica Picón), transcrito tal cual.
 *
 * El CTA del documento es "Agendar reunión de 30 minutos". Como no existe una
 * herramienta de agenda comercial, resuelve al correo de empresas: la regla del
 * documento de arquitectura es no publicar CTAs sin funcionalidad real.
 *
 * TODO: las cifras del caso de estudio y los claims de calidad vienen del
 * cliente. Confirmar por escrito quién los respalda antes de publicar.
 */
export const metadata = {
  title: "Empresas · Hospitales MAC",
  description:
    "Beneficios de salud para los colaboradores de tu empresa, con el respaldo de Hospitales MAC.",
};

const PROBLEMAS = [
  {
    title: "Tus colaboradores esperan o pagan",
    desc: "Dependen de la seguridad social —tiempos de espera y acceso restringido a especialistas—, y la espera es cara, o pagan atención médica privada de su bolsillo justo cuando el gasto es urgente.",
  },
  {
    title: "El SGMM completo está fuera de alcance",
    desc: "No tienes forma de dar un beneficio de salud real sin comprometer un Gasto Médico Mayor completo: inversión fuera de alcance para la mayoría de las PyME y empresas medianas.",
  },
  {
    title: "El beneficio no diferencia",
    desc: "Cuando existe, no diferencia a tu empresa frente al talento que quieres atraer: casi ninguna empresa como la tuya lo ofrece todavía, y quien lo ofrece no lo comunica como ventaja.",
  },
];

const COMPARATIVO = [
  {
    concepto: "Sobrecosto IMSS por aumento de prima",
    sin: "$245,024 MXN",
    sinDetalle: "Riesgo por cada +1% de incremento en la Prima de Riesgo de Trabajo.",
    con: "$0 MXN",
    conDetalle: "Mitigado por atención oportuna y prevención.",
  },
  {
    concepto: "Costo por ausentismo menor",
    sin: "$67,130 MXN",
    sinDetalle: "Promedio de 100 días laborales perdidos al año.",
    con: "$20,139 MXN",
    conDetalle: "Reducción del 70% en tiempos de espera y diagnóstico.",
  },
  {
    concepto: "Siniestralidad de la póliza de GMM",
    sin: "Alza en la renovación",
    sinDetalle: "Por llevar micro-gastos al seguro.",
    con: "Apoyo en la administración y dictamen",
    conDetalle: "",
  },
];

const ANTES_DESPUES = [
  {
    antes: "Tus colaboradores dependen del IMSS o pagan atención privada de su bolsillo cuando el gasto es urgente — y la espera sale cara.",
    despues: "Atención inmediata que evita que una urgencia se vuelva una complicación más costosa, para tus colaboradores y para tu empresa.",
  },
  {
    antes: "No tienes forma de dar un beneficio de salud real sin comprometer un SGMM completo.",
    despues: "Calidad hospitalaria certificada con el respaldo de uno de los grupos hospitalarios con mayor presencia en México.",
  },
  {
    antes: "El beneficio, si existe, no diferencia a tu empresa frente al talento que quieres atraer.",
    despues: "El beneficio escala con tu empresa con productos personalizables.",
  },
];

const RAZONES = [
  {
    icon: <TrendingDown className="w-6 h-6" />,
    title: "Atención inmediata, menos costo después",
    desc: "Cada urgencia que espera se vuelve más cara. El acceso inmediato reduce la siniestralidad frente a esperar a la seguridad social: menos complicaciones, menos ausentismo, menos gasto de bolsillo no planeado para tus colaboradores.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Calidad certificada",
    desc: "Calidad hospitalaria certificada, más de 50 especialidades e infraestructura de segundo y tercer nivel: UCI, resonancia magnética, tomografía PET CT. Tus colaboradores entran a un hospital real, no a una red de consultorios genérica.",
  },
  {
    icon: <Stethoscope className="w-6 h-6" />,
    title: "El respaldo de Grupo MAC",
    desc: "Infraestructura que ya existe y sigue creciendo, con convenios activos con aseguradoras nacionales e internacionales. No confías tu convenio a un proveedor pequeño ni a una startup de beneficios.",
  },
];

function AgendarCTA({ size = "lg" }: { size?: "md" | "lg" }) {
  return (
    <CTAButton variant="primary" size={size} href={EXTERNAL.reunionEmpresas}>
      Agendar reunión de 30 minutos
    </CTAButton>
  );
}

export default function Empresas() {
  return (
    <div className="w-full bg-[#F8FAFB] min-h-screen">

      <section className="bg-mac-primary-dark text-white px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-[30px] sm:text-[38px] font-medium leading-[1.15] tracking-[-0.02em] max-w-3xl">
            Cuando tu personal necesita atención médica, no puede esperar. Con
            Hospitales MAC no tiene que hacerlo.
          </h1>
          <p className="text-body sm:text-base font-normal text-mac-primary-light leading-relaxed mt-5 max-w-2xl">
            Atención inmediata que evita complicaciones más costosas, calidad
            hospitalaria certificada y el respaldo de uno de los grupos
            hospitalarios con mayor presencia en México.
          </p>
          <div className="mt-8">
            <AgendarCTA />
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-h2 font-medium text-mac-carbon max-w-2xl">
            Cuando tu personal se enferma, la pregunta es ¿quién y dónde los
            atiende?
          </h2>
          <p className="text-body font-normal text-gray-500 mt-3">
            Hay tres cosas que hoy pasan en tu empresa:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {PROBLEMAS.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-gray-200 rounded-2xl p-6"
              >
                <h3 className="text-h3 font-medium text-mac-carbon leading-tight">
                  {item.title}
                </h3>
                <p className="text-caption font-normal text-gray-600 leading-relaxed mt-3">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-gray-200 px-4 py-14">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-h2 font-medium text-mac-carbon">
            El impacto financiero oculto en tu nómina
          </h2>
          <p className="text-body font-normal text-gray-600 leading-relaxed mt-3 max-w-3xl">
            <span className="font-medium text-mac-carbon">Caso de estudio:</span>{" "}
            empresa con una plantilla de 100 colaboradores. Cuando un colaborador
            sufre un percance menor y acude al sistema público, el formato de
            incapacidad (ST-7) impacta directamente la fórmula legal de tu Prima de
            Riesgo de Trabajo para el año siguiente.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-[#F8FAFB] border border-gray-200 rounded-2xl p-6">
              <span className="text-caption font-medium text-gray-500">
                Masa salarial anual estimada
              </span>
              <p className="font-display text-3xl font-medium text-mac-carbon mt-2">
                $24,502,450 MXN
              </p>
              <p className="text-caption font-normal text-gray-500 mt-2">
                Para 100 colaboradores con el salario base de cotización promedio
                IMSS de $671.30 diarios.
              </p>
            </div>
            <div className="bg-[#F8FAFB] border border-gray-200 rounded-2xl p-6">
              <span className="text-caption font-medium text-gray-500">
                Aumento de 1% en la prima de riesgo
              </span>
              <p className="font-display text-3xl font-medium text-mac-danger mt-2">
                +$245,024 MXN
              </p>
              <p className="text-caption font-normal text-gray-500 mt-2">
                Anuales en sobrecuotas patronales del IMSS, cada año que la prima
                quede elevada.
              </p>
            </div>
          </div>

          <p className="text-body font-normal text-mac-carbon bg-mac-primary-tint border border-mac-primary/20 rounded-xl px-5 py-4 mt-6">
            Un solo accidente laboral mal administrado que lleve tu prima al tope
            máximo anual (+1%) le cuesta a tu empresa{" "}
            <span className="font-medium">$245,024 pesos extra</span> de cuotas el
            próximo año.
          </p>

          {/* Comparativo sin alianza / con alianza */}
          <div className="overflow-x-auto mt-10">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="text-caption font-medium text-gray-500">
                  <th className="py-3 pr-4 w-1/3">Concepto</th>
                  <th className="py-3 px-4">Sin alianza</th>
                  <th className="py-3 pl-4">En alianza con Hospitales MAC</th>
                </tr>
              </thead>
              <tbody>
                {COMPARATIVO.map((row) => (
                  <tr key={row.concepto} className="border-t border-gray-150 align-top">
                    <td className="py-4 pr-4 text-body font-medium text-mac-carbon">
                      {row.concepto}
                    </td>
                    <td className="py-4 px-4">
                      <span className="block text-body font-medium text-mac-carbon">
                        {row.sin}
                      </span>
                      <span className="block text-caption font-normal text-gray-500 mt-1">
                        {row.sinDetalle}
                      </span>
                    </td>
                    <td className="py-4 pl-4">
                      <span className="block text-body font-medium text-mac-primary">
                        {row.con}
                      </span>
                      {row.conDetalle && (
                        <span className="block text-caption font-normal text-gray-500 mt-1">
                          {row.conDetalle}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-mac-carbon/20 align-top bg-[#F8FAFB]">
                  <td className="py-4 pr-4 text-body font-medium text-mac-carbon">
                    Pérdida total estimada
                  </td>
                  <td className="py-4 px-4">
                    <span className="block text-h2 font-medium text-mac-danger">
                      $312,154 MXN
                    </span>
                    <span className="block text-caption font-normal text-gray-500 mt-1">
                      Más el alza de la póliza de GMM.
                    </span>
                  </td>
                  <td className="py-4 pl-4">
                    <span className="block text-h2 font-medium text-mac-primary">
                      $20,139 MXN
                    </span>
                    <span className="block text-caption font-normal text-gray-500 mt-1">
                      Ahorro estimado del 93%.
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-h2 font-medium text-mac-carbon">
            Antes y con Hospitales MAC
          </h2>
          <p className="text-body font-normal text-gray-500 mt-3 max-w-2xl">
            Esto es lo que realmente cambia para tu empresa cuando genera una
            alianza estratégica con Hospitales MAC:
          </p>

          <div className="space-y-4 mt-8">
            {ANTES_DESPUES.map((row) => (
              <div
                key={row.antes}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border border-gray-200 rounded-2xl p-6"
              >
                <div>
                  <span className="text-caption font-medium tracking-wider text-gray-400 uppercase">
                    Antes
                  </span>
                  <p className="text-body font-normal text-gray-600 leading-relaxed mt-2">
                    {row.antes}
                  </p>
                </div>
                <div className="md:border-l md:border-gray-150 md:pl-6">
                  <span className="text-caption font-medium tracking-wider text-mac-primary uppercase">
                    Con Hospitales MAC
                  </span>
                  <p className="text-body font-normal text-mac-carbon leading-relaxed mt-2">
                    {row.despues}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-gray-200 px-4 py-14">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-h2 font-medium text-mac-carbon mb-8">
            Tres razones para elegirnos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RAZONES.map((razon) => (
              <div key={razon.title}>
                <div className="w-12 h-12 rounded-xl bg-mac-primary-tint text-mac-primary flex items-center justify-center">
                  {razon.icon}
                </div>
                <h3 className="text-h3 font-medium text-mac-carbon mt-4 leading-tight">
                  {razon.title}
                </h3>
                <p className="text-caption font-normal text-gray-600 leading-relaxed mt-2">
                  {razon.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3 bg-mac-primary-tint border border-mac-primary/20 rounded-2xl p-6 mt-10">
            <Check className="w-5 h-5 text-mac-primary shrink-0 mt-0.5" />
            <p className="text-body font-normal text-mac-carbon leading-relaxed">
              Una alianza estratégica con Hospitales MAC no compite con tu Gasto
              Médico Mayor: cubre el hueco.{" "}
              <span className="font-medium">
                El GMM resuelve el evento catastrófico, Hospitales MAC resuelve lo
                cotidiano.
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-[26px] sm:text-3xl font-medium text-mac-carbon leading-tight">
            Démosle a tus colaboradores un beneficio de salud real — esta semana,
            no el próximo trimestre.
          </h2>
          <div className="mt-8 flex justify-center">
            <AgendarCTA />
          </div>
          <p className="inline-flex items-center gap-1.5 text-caption font-normal text-gray-500 mt-5">
            Escríbenos a empresas@hospitalesmac.com
            <ArrowRight className="w-3.5 h-3.5" />
          </p>
        </div>
      </section>
    </div>
  );
}
