import {
  carousel1,
  carousel2,
  carousel3,
  carousel4,
  carousel5,
  carousel6,
  carousel7,
  carousel8,
  carousel9,
  carousel10,
  carousel11,
  carousel12,
  carousel13,
  carousel14,
  carousel15,
} from "@/data/assets";


const galleryImages = [
  carousel1,
  carousel2,
  carousel3,
  carousel4,
  carousel5,
  carousel6,
  carousel7,
  carousel8,
  carousel9,
  carousel10,
  carousel11,
  carousel12,
  carousel13,
  carousel14,
  carousel15
];

/**
 * Plain URLs, derived once at module scope.
 *
 * CrtGallery and ImageLightbox take `string[]` because they preload with
 * `new Image()` and index into the array — and both key effects on the array's
 * identity, so mapping inline in JSX would hand them a new array every render
 * and thrash the preloader. Deriving it here keeps the reference stable.
 */
export const gallerySrcs: string[] = galleryImages.map((img) => img.src);

export default galleryImages;