import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { galleryImages } from "@/lib/site-images";

const photos = [
  {
    src: galleryImages.natali,
    alt: "Shisha pipe with smoke on a table",
    caption: "The table",
    className: "sm:col-span-7 sm:row-span-2 min-h-[420px] sm:min-h-[640px]",
  },
  {
    src: galleryImages.cachimberos,
    alt: "Ceramic shisha bowls packed with tobacco",
    caption: "The bowl",
    className: "sm:col-span-5 min-h-[280px]",
  },
  {
    src: galleryImages.leon,
    alt: "Glowing coals on a heat management device",
    caption: "The coals",
    className: "sm:col-span-5 min-h-[280px]",
  },
  {
    src: galleryImages.alena,
    alt: "Packing a shisha bowl by hand",
    caption: "Packed by hand",
    className: "sm:col-span-12 min-h-[320px] sm:min-h-[420px]",
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="relative scroll-mt-28 px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading label="Gallery" title="Inside the lounge" />
        </Reveal>

        <div className="mt-14 grid gap-3 sm:grid-cols-12 sm:gap-4">
          {photos.map((photo, i) => (
            <Reveal key={photo.src} delay={i * 80} className={`h-full ${photo.className}`}>
              <figure className="group relative h-full overflow-hidden rounded-[1.25rem]">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 via-black/20 to-transparent px-5 pt-16 pb-4">
                  <span className="font-display text-sm tracking-[0.18em] text-white uppercase">{photo.caption}</span>
                  <span className="text-[11px] tracking-[0.22em] text-white/70 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
