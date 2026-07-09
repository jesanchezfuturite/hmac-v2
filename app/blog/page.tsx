import React from "react";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: "Comunicado" | "Noticia" | "Evento";
  image: string;
}

export default function BlogPage() {
  // Datos de ejemplo — estos se reemplazarían con datos de una base de datos/CMS
  const posts: BlogPost[] = [
    {
      id: "1",
      slug: "apertura-nuevo-quirofano-celaya",
      title: "Inauguramos nuevo quirófano de última generación en Celaya",
      excerpt: "Hospital MAC Celaya amplía su capacidad quirúrgica con un nuevo quirófano equipado con tecnología robótica de punta.",
      date: "2026-07-08",
      category: "Comunicado",
      image: "/img/cirugia.webp",
    },
    {
      id: "2",
      slug: "campana-prevencion-cardiovascular",
      title: "Campaña de prevención cardiovascular: chequeos gratis este mes",
      excerpt: "En julio, ofrecemos evaluaciones cardiovasculares sin costo para concientizar sobre la salud del corazón.",
      date: "2026-07-01",
      category: "Evento",
      image: "/img/cardiologia.webp",
    },
    {
      id: "3",
      slug: "nuevo-programa-maternidad-humanizada",
      title: "Nuevo programa de maternidad humanizada en todas nuestras sedes",
      excerpt: "Hospitales MAC expande su modelo de atención humanizada al parto en los 25 hospitales de la red nacional.",
      date: "2026-06-25",
      category: "Noticia",
      image: "/img/maternidad.jpeg",
    },
    {
      id: "4",
      slug: "acreditacion-internacional-isqua",
      title: "Hospitales MAC obtiene renovación de acreditación internacional ISQua",
      excerpt: "Renovamos nuestra acreditación internacional en estándares de calidad y seguridad en la atención médica.",
      date: "2026-06-15",
      category: "Comunicado",
      image: "/img/certificacion/isqua.png",
    },
  ];

  const categoryColor = (category: string) => {
    switch (category) {
      case "Comunicado":
        return "bg-blue-100 text-blue-800";
      case "Noticia":
        return "bg-green-100 text-green-800";
      case "Evento":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full bg-white flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="bg-mac-primary-dark text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center space-y-4">
          <h1 className="text-h1 font-medium text-white leading-tight">
            Blog y Prensa
          </h1>
          <p className="text-body font-normal text-mac-primary-light max-w-lg leading-relaxed">
            Mantente informado sobre las noticias, eventos y comunicados de Hospitales MAC. Tu salud es nuestra prioridad.
          </p>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col group"
              >
                {/* Featured Image */}
                <div className="relative h-[240px] overflow-hidden bg-gray-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-caption font-medium ${categoryColor(
                        post.category
                      )}`}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-caption text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("es-MX", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>

                  {/* Title */}
                  <h3 className="text-h3 font-medium text-mac-carbon mb-2 leading-tight line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-body font-normal text-gray-500 mb-4 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-caption font-medium text-mac-primary hover:text-mac-primary-dark group/link"
                  >
                    Leer más
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State (if no posts) */}
          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-body font-normal text-gray-500">
                No hay comunicados disponibles en este momento.
              </p>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
