import type { Geo } from "./hospitals";

/**
 * Distancia y orden por cercanía — doc 3.6.2
 *
 * La ubicación del usuario funciona como recomendación inicial, nunca como
 * restricción: siempre debe poder consultar y elegir cualquier otra sede.
 *
 * La misma lógica se reutiliza en el localizador de la Home, en el directorio de
 * hospitales y en Urgencias 24/7, para no desarrollar experiencias paralelas.
 */
export interface Coords {
  lat: number;
  lng: number;
}

const EARTH_RADIUS_KM = 6371;

const toRad = (degrees: number) => (degrees * Math.PI) / 180;

/** Haversine. La Tierra no es una esfera perfecta, pero para ordenar sedes por
 *  cercanía el error es irrelevante frente al de las propias coordenadas. */
export function distanceKm(from: Coords, to: Coords): number {
  const dLat = toRad(to.lat - from.lat);
  const dLng = toRad(to.lng - from.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(from.lat)) * Math.cos(toRad(to.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}

/**
 * Las distancias se presentan como aproximadas a propósito: 16 de las 25 sedes
 * tienen coordenada de calle o de municipio, así que dar decimales finos sería
 * aparentar una precisión que el dato no tiene.
 */
export function formatDistance(km: number): string {
  if (km < 1) return "menos de 1 km";
  if (km < 10) return `${km.toFixed(1)} km`;
  return `${Math.round(km)} km`;
}

export function withDistance<T extends { geo?: Geo }>(
  items: T[],
  from: Coords | null
): (T & { distanceKm?: number })[] {
  if (!from) return items;
  return items
    .map((item) => ({
      ...item,
      distanceKm: item.geo ? distanceKm(from, item.geo) : undefined,
    }))
    .sort((a, b) => {
      // Una sede sin coordenada no debe colarse al principio de la lista
      if (a.distanceKm === undefined) return 1;
      if (b.distanceKm === undefined) return -1;
      return a.distanceKm - b.distanceKm;
    });
}
