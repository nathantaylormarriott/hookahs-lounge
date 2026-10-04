import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { CurtainScene } from "@/components/CurtainScene";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { InstagramFeed } from "@/components/site/InstagramFeed";
import { Menu } from "@/components/site/Menu";
import { SectionRail } from "@/components/site/SectionRail";
import { Gallery } from "@/components/site/Gallery";
import { Reviews } from "@/components/site/Reviews";
import { Visit } from "@/components/site/Visit";
import { Contact } from "@/components/site/Contact";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";
import { useLenis } from "@/hooks/use-lenis";
import { getStructuredDataGraph } from "@/lib/localBusinessSchema";
import { LOUNGE } from "@/lib/lounge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: LOUNGE.seoTitle },
      {
        name: "description",
        content: LOUNGE.seoDescription,
      },
      { name: "keywords", content: LOUNGE.seoKeywords },
      { property: "og:title", content: LOUNGE.seoTitle },
      {
        property: "og:description",
        content: LOUNGE.seoDescription,
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
    <CurtainScene footer={<Footer />}>
      <Navbar />
      <SectionRail />
      <main>
        <Hero />
        <InstagramFeed />
        <Menu />
        <Gallery />
        <Reviews />
        <Visit />
        <Contact />
        <Faq />
      </main>
      <Toaster />
    </CurtainScene>
  );
}
