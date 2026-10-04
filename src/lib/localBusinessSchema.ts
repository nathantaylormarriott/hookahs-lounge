import { loungeFaqs } from "@/data/faq";
import { getAllMenuSections, parsePriceGbp } from "@/data/menu";
import { LOUNGE, OPENING_HOURS, SITE_URL } from "@/lib/lounge";
import { galleryImages, loungeLogo } from "@/lib/site-images";

function absoluteUrl(path: string) {
  const base = SITE_URL.replace(/\/$/, "");
  return path.startsWith("http") ? path : `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

const businessId = `${absoluteUrl("/")}#hookahs-lounge`;

export function getLocalBusinessJsonLd() {
  const url = absoluteUrl("/");
  const images = [
    absoluteUrl(loungeLogo),
    absoluteUrl(galleryImages.natali),
    absoluteUrl(galleryImages.leon),
  ];

  return {
    "@type": "LocalBusiness",
    "@id": businessId,
    additionalType: "https://en.wikipedia.org/wiki/Hookah_lounge",
    name: LOUNGE.name,
    alternateName: LOUNGE.alternateName,
    description: LOUNGE.seoDescription,
    url,
    telephone: LOUNGE.phoneE164,
    image: images,
    logo: absoluteUrl(loungeLogo),
    priceRange: LOUNGE.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: LOUNGE.streetAddress,
      addressLocality: LOUNGE.addressLocality,
      addressRegion: LOUNGE.addressRegion,
      postalCode: LOUNGE.postalCode,
      addressCountry: LOUNGE.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: LOUNGE.geo.latitude,
      longitude: LOUNGE.geo.longitude,
    },
    openingHours: LOUNGE.openingHoursSchema,
    openingHoursSpecification: OPENING_HOURS.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${slot.day}`,
      opens: slot.opens,
      closes: slot.closes,
    })),
    sameAs: [LOUNGE.instagramUrl, LOUNGE.instagramAltUrl, LOUNGE.tiktokUrl, LOUNGE.menuUrl],
    areaServed: {
      "@type": "City",
      name: LOUNGE.areaServed,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: LOUNGE.addressRegion,
      },
    },
    hasMap: LOUNGE.directionsUrl,
    knowsAbout: [
      "Shisha",
      "Hookah",
      "Shisha lounge",
      "Flavoured tobacco",
      "Late-night lounge",
    ],
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}#contact`,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      name: "Book a table",
    },
  };
}

export function getWebSiteJsonLd() {
  const url = absoluteUrl("/");
  return {
    "@type": "WebSite",
    "@id": `${url}#website`,
    url,
    name: LOUNGE.name,
    description: LOUNGE.seoDescription,
    publisher: { "@id": businessId },
    inLanguage: "en-GB",
  };
}

export function getMenuJsonLd() {
  const url = absoluteUrl("/#menu");
  const sections = getAllMenuSections().map((section) => ({
    "@type": "MenuSection",
    name: section.title,
    hasMenuItem: section.groups.flatMap((group) =>
      group.items.map((item) => {
        const price = parsePriceGbp(item.price);
        return {
          "@type": "MenuItem",
          name: item.name,
          ...(price !== undefined
            ? {
                offers: {
                  "@type": "Offer",
                  price,
                  priceCurrency: "GBP",
                },
              }
            : {}),
        };
      }),
    ),
  }));

  return {
    "@type": "Menu",
    "@id": `${absoluteUrl("/")}#menu`,
    name: `${LOUNGE.name} menu`,
    url,
    inLanguage: "en-GB",
    hasMenuSection: sections,
    provider: { "@id": businessId },
  };
}

export function getFaqJsonLd() {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl("/")}#faq`,
    mainEntity: loungeFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getStructuredDataGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      getLocalBusinessJsonLd(),
      getWebSiteJsonLd(),
      getMenuJsonLd(),
      getFaqJsonLd(),
    ],
  };
}
