/** Public site origin for canonical URLs and schema (override with VITE_SITE_URL). */
const siteUrlFromEnv =
  typeof import.meta !== "undefined" ? import.meta.env["VITE_SITE_URL"] : undefined;

export const SITE_URL =
  (typeof siteUrlFromEnv === "string" && siteUrlFromEnv) || "https://hookahs-lounge.netlify.app";

export const OPENING_HOURS = [
  { day: "Monday", opens: "12:00", closes: "02:00", label: "12:00 midday – 2:00 am" },
  { day: "Tuesday", opens: "12:00", closes: "02:00", label: "12:00 midday – 2:00 am" },
  { day: "Wednesday", opens: "12:00", closes: "02:00", label: "12:00 midday – 2:00 am" },
  { day: "Thursday", opens: "12:00", closes: "02:00", label: "12:00 midday – 2:00 am" },
  { day: "Friday", opens: "12:00", closes: "03:00", label: "12:00 midday – 3:00 am" },
  { day: "Saturday", opens: "12:00", closes: "03:00", label: "12:00 midday – 3:00 am" },
  { day: "Sunday", opens: "12:00", closes: "02:00", label: "12:00 midday – 2:00 am" },
] as const;

export const LOUNGE = {
  name: "HOOKAHS",
  legalName: "Hookahs Shisha Birmingham",
  alternateName: "Hookahs Shisha Birmingham",
  tagline: "Shisha bar on Moseley Road, Balsall Heath.",
  seoTitle: "HOOKAHS | Shisha Bar Birmingham | Moseley Road B12",
  seoDescription:
    "HOOKAHS is a shisha bar at 478 Moseley Road, Balsall Heath, Birmingham B12 9AN. Shisha, food and drinks. Open from 12:00 midday — Sunday to Thursday until 2:00 am, Friday and Saturday until 3:00 am. Call 0121 440 8154.",
  seoKeywords:
    "HOOKAHS, Hookahs Shisha Birmingham, shisha bar Birmingham, hookah bar Balsall Heath, shisha Moseley Road, shisha B12, Hookahs Lounge Birmingham",
  streetAddress: "478 Moseley Road",
  addressLocality: "Birmingham",
  addressNeighborhood: "Balsall Heath",
  addressRegion: "West Midlands",
  postalCode: "B12 9AN",
  addressCountry: "GB",
  addressLine: "478 Moseley Road, Balsall Heath, Birmingham B12 9AN",
  phoneDisplay: "0121 440 8154",
  phoneE164: "+441214408154",
  phoneHref: "tel:+441214408154",
  instagramUrl: "https://www.instagram.com/hookahsloungeuk/",
  instagramAltUrl: "https://www.instagram.com/hookahs_bham/",
  tiktokUrl: "https://www.tiktok.com/@hookahsbham",
  menuUrl: "https://hookahslounge.co.uk/#hookah-menu",
  hoursSummary: "Open daily from 12:00 midday · Sun–Thu to 2:00 am · Fri & Sat to 3:00 am",
  hoursPlain:
    "Sunday to Thursday, 12:00 midday – 2:00 am. Friday and Saturday, 12:00 midday – 3:00 am.",
  openingHoursSchema: ["Mo-Th 12:00-02:00", "Fr-Sa 12:00-03:00", "Su 12:00-02:00"],
  geo: {
    latitude: 52.45764,
    longitude: -1.88524,
  },
  directionsUrl:
    "https://maps.google.com/?q=HOOKAHS+478+Moseley+Road+Balsall+Heath+Birmingham+B12+9AN",
  mapEmbedUrl:
    "https://www.google.com/maps?q=478+Moseley+Road,+Balsall+Heath,+Birmingham+B12+9AN&output=embed",
  areaServed: "Birmingham",
  priceRange: "££",
  googleRating: "4.6",
  googleReviewCount: "565",
} as const;
