import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { BackgroundScene } from "@/components/BackgroundScene";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Menu } from "@/components/site/Menu";
import { Gallery } from "@/components/site/Gallery";
import { Reviews } from "@/components/site/Reviews";
import { Visit } from "@/components/site/Visit";
import { Contact } from "@/components/site/Contact";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";
import { useLenis } from "@/hooks/use-lenis";
import { getStructuredDataGraph } from "@/lib/localBusinessSchema";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hookahs Lounge Coventry | Shisha Lounge on Lower Ford Street" },
      {
        name: "description",
        content:
          "Hookahs Lounge is a shisha lounge at 120 Lower Ford Street, Coventry CV1 5PW. Open daily 12:00 midday to 2:00 am. Shisha, flavours, tea and coffee.",
      },
      { property: "og:title", content: "Hookahs Lounge Coventry" },
      {
        property: "og:description",
        content:
          "Shisha lounge at 120 Lower Ford Street, Coventry. Open daily 12:00 midday to 2:00 am. Call 07922 466215.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(getStructuredDataGraph()),
      },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();

  return (
    <BackgroundScene>
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Menu />
          <Gallery />
          <Reviews />
          <Visit />
          <Contact />
          <Faq />
        </main>
        <Footer />
      </div>
      <Toaster />
    </BackgroundScene>
  );
}
