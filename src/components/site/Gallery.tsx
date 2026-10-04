import { Reveal } from "@/components/Reveal";
import { galleryImages } from "@/lib/site-images";

const photos = [
  { src: galleryImages.natali, alt: "Shisha pipe with smoke on a table", span: "lg:row-span-2" },
  { src: galleryImages.cachimberos, alt: "Ceramic shisha bowls packed with tobacco", span: "" },
  { src: galleryImages.leon, alt: "Glowing coals on a heat management device", span: "" },
  { src: galleryImages.alena, alt: "Packing a shisha bowl by hand", span: "lg:col-span-2" },
];

export function Gallery() {
  return (
    <section id="gallery" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="eyebrow">Gallery</span>
          <h2 className="section-title-shadow mt-4 text-3xl sm:text-5xl">Inside the lounge</h2>
        </Reveal>

        <div className="mt-14 grid auto-rows-[260px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, i) => (
            <Reveal key={photo.src} delay={i * 120} className={photo.span}>
              <div className="group shadow-soft h-full overflow-hidden rounded-2xl border border-border">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
