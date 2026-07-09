"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface HospitalGalleryProps {
  hospitalName: string;
  images: GalleryImage[];
}

export default function HospitalGallery({ hospitalName, images }: HospitalGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
    }
  };

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  };

  return (
    <section className="bg-white py-14 px-4 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="mb-10">
          <span className="text-caption font-medium tracking-wider text-gray-400 uppercase">
            Galería
          </span>
          <h2 className="text-h2 font-medium text-mac-carbon mt-1">
            Conoce nuestras instalaciones
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImageIndex(idx)}
              className="relative h-[200px] rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <p className="text-caption font-normal text-white">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImageIndex !== null && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImageIndex(null)}
          >
            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Image */}
              <img
                src={images[selectedImageIndex].src}
                alt={images[selectedImageIndex].alt}
                className="w-full rounded-lg"
              />

              {/* Caption */}
              {images[selectedImageIndex].caption && (
                <p className="text-center text-white text-body mt-4">
                  {images[selectedImageIndex].caption}
                </p>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={handlePrev}
                  className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <span className="text-white text-caption font-medium">
                  {selectedImageIndex + 1} / {images.length}
                </span>

                <button
                  onClick={handleNext}
                  className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
