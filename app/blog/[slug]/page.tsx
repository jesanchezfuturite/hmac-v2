import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import CTAButton from "@/components/shared/CTAButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Mock data — en producción vendría de una base de datos/CMS
const blogPosts: Record<string, any> = {
  "apertura-nuevo-quirofano-celaya": {
    title: "Inauguramos nuevo quirófano de última generación en Celaya",
    date: "2026-07-08",
    category: "Comunicado",
    image: "/img/cirugia.webp",
    content: `
      <p>Hospital MAC Celaya se enorgullece en anunciar la inauguración de su nuevo quirófano de última generación, que refuerza nuestra capacidad de ofrecer procedimientos quirúrgicos complejos con los más altos estándares de seguridad.</p>

      <h3>Equipamiento de Punta</h3>
      <p>El nuevo quirófano está equipado con tecnología quirúrgica robótica de última generación, sistemas de vigilancia integrados y mobiliario especializado que permite a nuestro equipo médico realizar procedimientos con precisión milimétrica.</p>

      <h3>Beneficios para Nuestros Pacientes</h3>
      <ul>
        <li>Procedimientos menos invasivos con recuperación más rápida</li>
        <li>Mayor precisión en intervenciones quirúrgicas complejas</li>
        <li>Reducción de tiempos quirúrgicos</li>
        <li>Menor riesgo de complicaciones postoperatorias</li>
      </ul>

      <p>Agradecemos la confianza de nuestros pacientes y el compromiso de nuestro equipo médico y administrativo que hace posible esta mejora en la calidad de nuestros servicios.</p>
    `,
  },
  "campana-prevencion-cardiovascular": {
    title: "Campaña de prevención cardiovascular: chequeos gratis este mes",
    date: "2026-07-01",
    category: "Evento",
    image: "/img/cardiologia.webp",
    content: `
      <p>Durante el mes de julio, Hospitales MAC invita a la comunidad a participar en nuestra campaña de prevención cardiovascular con evaluaciones completamente gratuitas.</p>

      <h3>¿Qué Incluye el Chequeo?</h3>
      <ul>
        <li>Consulta con cardiólogo especialista</li>
        <li>Electrocardiograma (ECG)</li>
        <li>Medición de presión arterial</li>
        <li>Análisis de riesgo cardiovascular personalizado</li>
      </ul>

      <h3>Fechas y Ubicaciones</h3>
      <p>Los chequeos estarán disponibles en todas nuestras 25 sedes hospitalarias a nivel nacional. Se recomienda cita previa llamando al 800 MAC 0800.</p>

      <p>La prevención es el mejor tratamiento. Cuidemos juntos la salud de nuestro corazón.</p>
    `,
  },
  "nuevo-programa-maternidad-humanizada": {
    title: "Nuevo programa de maternidad humanizada en todas nuestras sedes",
    date: "2026-06-25",
    category: "Noticia",
    image: "/img/maternidad.jpeg",
    content: `
      <p>Hospitales MAC expande su modelo de atención humanizada al parto en todos los 25 hospitales de la red nacional, reafirmando nuestro compromiso con la salud materna e infantil.</p>

      <h3>¿Qué es la Maternidad Humanizada?</h3>
      <p>Es un enfoque que respeta los derechos de la madre y el bebé, permitiendo que el proceso de parto sea más natural, seguro y emocionalmente satisfactorio para toda la familia.</p>

      <h3>Características del Programa</h3>
      <ul>
        <li>Salas LDR (Labor, Delivery, Recovery) cómodas y seguras</li>
        <li>Presencia de acompañante durante todo el proceso</li>
        <li>Opción de parto vertical o en posiciones elegidas por la madre</li>
        <li>Contacto piel a piel inmediato después del parto</li>
        <li>Equipo médico especializado en obstetricia humanizada</li>
      </ul>

      <p>Queremos que el nacimiento sea una experiencia memorable y segura para todas nuestras familias.</p>
    `,
  },
  "acreditacion-internacional-isqua": {
    title: "Hospitales MAC obtiene renovación de acreditación internacional ISQua",
    date: "2026-06-15",
    category: "Comunicado",
    image: "/img/certificacion/isqua.png",
    content: `
      <p>Nos complace comunicar que Hospitales MAC ha renovado exitosamente su acreditación internacional de la ISQua (International Society for Quality in Healthcare), reafirmando nuestro compromiso con los más altos estándares de calidad y seguridad.</p>

      <h3>¿Qué Significa Esta Acreditación?</h3>
      <p>La acreditación ISQua es un reconocimiento internacional que valida que nuestros procesos, procedimientos y protocolos médicos cumplen con los estándares más exigentes de calidad a nivel mundial.</p>

      <h3>Áreas de Evaluación</h3>
      <ul>
        <li>Seguridad del paciente</li>
        <li>Calidad de la atención médica</li>
        <li>Gestión de recursos y procesos</li>
        <li>Satisfacción del paciente</li>
        <li>Mejora continua</li>
      </ul>

      <p>Este reconocimiento es resultado del trabajo dedicado de todos nuestros colaboradores y ratifica que somos un destino confiable para la atención médica de calidad.</p>
    `,
  },
};

export default function BlogPostPage({ params }: PageProps) {
  const { slug } = use(params);
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="w-full bg-white min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-h1 font-medium text-mac-carbon mb-3">
            Comunicado no encontrado
          </h1>
          <p className="text-body font-normal text-gray-500 mb-6">
            El comunicado que buscas no existe o ha sido removido.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-mac-primary hover:text-mac-primary-dark font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white flex flex-col min-h-screen">

      {/* Hero Section with Image */}
      <div className="relative h-[400px] overflow-hidden bg-gray-100">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-6 left-4 z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-mac-carbon font-medium px-4 py-2 rounded-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Link>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <div className="max-w-4xl mx-auto">
            <span className={`inline-block px-3 py-1 rounded-full text-caption font-medium mb-4 ${
              post.category === "Comunicado"
                ? "bg-blue-100 text-blue-800"
                : post.category === "Evento"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-green-100 text-green-800"
            }`}>
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-medium text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-14 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2 text-body text-gray-500">
              <Calendar className="w-5 h-5" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <button className="flex items-center gap-2 text-body text-gray-500 hover:text-mac-primary transition-colors">
              <Share2 className="w-5 h-5" />
              Compartir
            </button>
          </div>

          {/* Body Content */}
          <div
            className="prose prose-sm max-w-none mb-12"
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/<p>/g, '<p className="text-body font-normal text-gray-700 leading-relaxed mb-4">')
                .replace(/<h3>/g, '<h3 className="text-h2 font-medium text-mac-carbon mt-8 mb-4">')
                .replace(/<ul>/g, '<ul className="list-disc list-inside space-y-2 mb-4 text-body text-gray-700">')
                .replace(/<li>/g, '<li className="ml-4">')
                .replace(/<\/li>/g, '</li>')
                .replace(/<\/ul>/g, '</ul>'),
            }}
          />

          {/* CTA Section */}
          <div className="bg-mac-primary-tint border border-mac-primary/20 rounded-2xl p-8 text-center">
            <h3 className="text-h2 font-medium text-mac-carbon mb-2">
              ¿Tienes preguntas?
            </h3>
            <p className="text-body font-normal text-gray-600 mb-6 max-w-md mx-auto">
              Contáctanos para más información sobre este tema o cualquier otro servicio que ofrezcamos.
            </p>
            <CTAButton
              variant="primary"
              size="lg"
              href="tel:8006220800"
            >
              Llamar al Call Center
            </CTAButton>
          </div>

        </div>
      </article>

      {/* Related Posts (opcional) */}
      <section className="bg-gray-50 py-14 px-4 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-h2 font-medium text-mac-carbon mb-2">
            Más comunicados
          </h3>
          <p className="text-body font-normal text-gray-500 mb-6">
            Mantente informado con nuestras últimas noticias y eventos.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-mac-primary hover:text-mac-primary-dark font-medium"
          >
            Ver todos los comunicados
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </section>

    </div>
  );
}
