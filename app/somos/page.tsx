import React from "react";
import { COVERAGE } from "@/lib/hospitals";

/**
 * Somos — contenido entregado por el cliente el 17-11-2026
 * (adjunto "Revisión web 17:11:26.docx", vía Verónica Picón).
 *
 * El texto es institucional y se transcribe tal cual, salvo la cifra de
 * cobertura: ver la nota en la semblanza.
 */
export const metadata = {
  title: "Somos · Hospitales MAC",
  description:
    "Propósito, misión, visión y comportamientos de Hospitales MAC.",
};

const COMPORTAMIENTOS = [
  {
    title: "Empatía que genera confianza",
    lead: "Nos ponemos en el lugar del otro.",
    desc: "Escuchamos con atención e intención de comprender a los demás. Ofrecemos apoyo generando confianza y cercanía en cada oportunidad.",
  },
  {
    title: "Todos somos MAC",
    lead: "En Hospitales MAC somos un solo equipo.",
    desc: "Preguntamos cómo apoyar y colaboramos más allá de nuestro rol para que nadie se quede solo. Nos cuidamos y respaldamos mutuamente, asumiendo responsabilidad compartida por los resultados colectivos. Reconocemos que nuestras acciones individuales impactan en el bienestar del equipo y que juntos alcanzamos más.",
  },
  {
    title: "Sencillez que inspira",
    lead: "Estamos aquí para servir y aprender.",
    desc: "Nos acercamos con humildad hacia nuestros compañeros y clientes, escuchamos y valoramos a todos. Aprendemos unos de otros y todos somos responsables de generar experiencias.",
  },
  {
    title: "Enfoque a resultados",
    lead: "No esperamos, actuamos.",
    desc: "Buscamos soluciones anticipadas a los problemas, aportamos ideas para avanzar y priorizamos lo urgente. Garantizamos la mejora continua y logramos resultados tangibles. Somos hábiles en identificar aquellas situaciones que requieren nuestro enfoque.",
  },
  {
    title: "Mentalidad de crecimiento",
    lead: "Somos curiosos, no nos conformamos, buscamos mejorar y crecer continuamente.",
    desc: "Nos preguntamos cómo hacer más y mejor con lo que tenemos. Proponemos ideas, retamos lo establecido y nos motiva crecer como equipo y organización.",
  },
  {
    title: "Mentalidad de Fundador MAC",
    lead: "Cuidamos lo que es de todos.",
    desc: "Nos desempeñamos con un enfoque de productividad y eficiencia, cumpliendo acuerdos. Cuidamos cada recurso del Hospital y la compañía como si fueran propios.",
  },
  {
    title: "Compromiso por cuidar tu salud",
    lead: "La vida de nuestros pacientes y sus familias es nuestra mayor responsabilidad.",
    desc: "Cuidamos la vida de cada paciente y sus familias con excelencia, seguridad y calidez. Nuestras acciones están guiadas por el compromiso de generar bienestar y confianza en cada interacción. Entendemos que la salud y la vida son nuestra razón de ser, y trabajamos con responsabilidad y humanidad para honrar este compromiso.",
  },
];

export default function Somos() {
  return (
    <div className="w-full bg-[#F8FAFB] min-h-screen">

      <section className="bg-mac-primary-dark text-white px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <span className="text-caption font-medium tracking-wider text-mac-primary-light uppercase">
            Nuestro propósito
          </span>
          <h1 className="font-display text-[34px] sm:text-[42px] font-medium leading-[1.1] tracking-[-0.02em] mt-3">
            Cuidamos la salud de las personas.
          </h1>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-7">
            <h2 className="text-h2 font-medium text-mac-carbon">Misión</h2>
            <p className="text-body font-normal text-gray-600 leading-relaxed mt-3">
              Brindar servicios de salud accesibles con calidad, calidez y
              profesionalismo, apoyados en personal calificado.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-7">
            <h2 className="text-h2 font-medium text-mac-carbon">Visión</h2>
            <p className="text-body font-normal text-gray-600 leading-relaxed mt-3">
              Ser en la República Mexicana una institución hospitalaria líder e
              innovadora, reconocida por la excelencia de sus servicios y su
              compromiso social.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-gray-200 px-4 py-14">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-h2 font-medium text-mac-carbon mb-8">
            Comportamientos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMPORTAMIENTOS.map((item) => (
              <div
                key={item.title}
                className="border-l-2 border-mac-primary pl-5 py-1"
              >
                <h3 className="text-h3 font-medium text-mac-carbon">
                  {item.title}
                </h3>
                <p className="text-body font-medium text-mac-primary mt-1">
                  {item.lead}
                </p>
                <p className="text-caption font-normal text-gray-600 leading-relaxed mt-2">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="max-w-4xl mx-auto">
          <span className="text-caption font-medium tracking-wider text-gray-400 uppercase">
            Fundador y Presidente
          </span>
          <h2 className="text-h2 font-medium text-mac-carbon mt-1 mb-6">
            Miguel Khoury
          </h2>

          <div className="space-y-4 text-body font-normal text-gray-600 leading-relaxed">
            <p>
              Miguel Khoury es Fundador y Presidente de Hospitales MAC (Médica
              Avanzada Contigo), el grupo hospitalario con mayor presencia
              geográfica en México.
            </p>
            <p>
              En el principio de su carrera profesional se desarrolló exitosamente
              como empresario textil y en la industria de la construcción.
            </p>
            {/* El documento del cliente dice "25 hospitales operando en 21
                ciudades". La cifra se deriva de las sedes cargadas para no
                contradecir al resto del sitio: Santa Fe aún no abre y los
                municipios no cuadran con 21. Pendiente de aclarar (ver
                SEDES-BORRADOR.md). */}
            <p>
              En 2008 inició su camino como empresario en el ámbito de la salud,
              edificando una exitosa cadena de hospitales modernos, con tecnología
              de vanguardia, alta profesionalización y atención de 5 estrellas a
              precios accesibles. Actualmente, el Grupo Hospitales MAC cuenta con{" "}
              {COVERAGE.hospitals} hospitales operando en {COVERAGE.states} estados
              de la República Mexicana y ha sido reconocido como uno de los mejores
              según el Ranking de Hospitales Privados de Grupo Expansión.
            </p>
            <p>
              Bajo su liderazgo se han realizado alianzas con grandes fondos de
              inversión como Actinver, PineBridge y General Atlantic, lo que ha
              permitido impulsar con éxito el plan de crecimiento y expansión de
              Hospitales MAC.
            </p>
            <p>
              También dirige y preside el Consejo de Administración del Grupo y
              actualmente trabaja para que, en 2030, haya un Hospital MAC en cada
              ciudad de México con una población mayor a 500,000 habitantes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
