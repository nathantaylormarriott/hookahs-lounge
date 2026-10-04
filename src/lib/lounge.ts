/** Public site origin for canonical URLs and schema (override with VITE_SITE_URL). */
export const SITE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL) ||
  "https://hookahs-lounge.netlify.app";

export const LOUNGE = {
  name: "Hookahs Lounge",
  legalName: "Hookahs Lounge Coventry",
  alternateName: "Hookahs lounge Coventry",
  tagline: "Shisha lounge on Lower Ford Street, Coventry.",
  seoTitle: "Hookahs Lounge | Shisha Lounge Coventry | Hookah Bar CV1",
  seoDescription:
    "Hookahs Lounge is a shisha lounge and hookah bar in Coventry city centre at 120 Lower Ford Street, CV1 5PW. Premium shisha flavours, drinks and late-night lounge vibes. Open daily 12:00 midday – 2:00 am. Call 07922 466215.",
  seoKeywords:
    "shisha lounge Coventry, hookah bar Coventry, shisha Coventry, hookahs lounge, shisha bar Coventry, late night lounge Coventry, Lower Ford Street shisha, CV1 shisha, best shisha Coventry",
  streetAddress: "120 Lower Ford Street",
  addressLocality: "Coventry",
  addressRegion: "West Midlands",
  postalCode: "CV1 5PW",
  addressCountry: "GB",
  addressLine: "120 Lower Ford Street, Coventry CV1 5PW",
  phoneDisplay: "07922 466215",
  phoneE164: "+447922466215",
  phoneHref: "tel:+447922466215",
  email: "info@hookahs-lounge.co.uk",
  facebookUrl: "https://www.facebook.com/",
  hoursSummary: "Open daily · 12:00 midday – 2:00 am",
  hoursPlain: "Monday to Sunday, 12:00 midday – 2:00 am",
  openingHoursSchema: "Mo-Su 12:00-02:00",
  opens: "12:00",
  closes: "02:00",
  geo: {
    latitude: 52.4084,
    longitude: -1.5066,
  },
  directionsUrl:
    "https://maps.google.com/?q=Hookahs+Lounge+120+Lower+Ford+Street+Coventry+CV1+5PW",
  areaServed: "Coventry",
  priceRange: "£",
} as const;

export const OPENING_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const OPENING_HOURS_LABEL = "12:00 midday – 2:00 am";
