/**
 * Fotografías de la web (Unsplash, licencia libre). Para usar fotos propias, súbelas a public/images y
 * cambia aquí la URL, por ejemplo '/images/hero.webp'.
 */
const unsplash = (id: string, width: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

export const IMAGES = {
  hero: unsplash('1500375592092-40eb2168fd21', 2200),
  tech: unsplash('1516321318423-f06f85e504b3', 1200),
  experiences: unsplash('1500530855697-b586d89ba3ee', 1200),
  transfers: unsplash('1518837695005-2083093ee35b', 1200),
  manifesto: unsplash('1518837695005-2083093ee35b', 1800),
};
