/** Link de busca no Google Maps (sem chave de API, sem dependência externa). */
export function mapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Link de rota até um ponto. */
export function mapsDirectionsUrl(query: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

/**
 * Embed do OpenStreetMap: não exige chave de API nem consentimento de cookies de
 * terceiros, e carrega em iframe com lazy loading.
 */
export function osmEmbedUrl(lat: number, lng: number, delta = 0.012): string {
  const bbox = [lng - delta, lat - delta / 2, lng + delta, lat + delta / 2].join('%2C');
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
}
