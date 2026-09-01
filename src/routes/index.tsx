import { createFileRoute } from "@tanstack/react-router";
import {
  Hero,
  Introduction,
  SignatureServices,
  ProductScene,
  ExperienceRail,
  ExperienceStack,
  MembershipTeaser,
  Testimonials,
  Gallery,
  ShopTeaser,
  FinalCta,
} from "@/components/site/HomeSections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LUMÉA — Luxury Salon & Spa in Chelsea, London" },
      {
        name: "description",
        content:
          "Signature massage, facials, hair and bespoke wellness rituals at LUMÉA, a luxury salon and spa in Chelsea. Book your experience.",
      },
      { property: "og:title", content: "LUMÉA — Luxury Salon & Spa" },
      {
        property: "og:description",
        content: "Indulge in timeless luxury. Where beauty, wellness and tranquility come together.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <h1 className="sr-only">LUMÉA — Luxury Salon &amp; Spa in Chelsea, London</h1>
      <Hero />
      <Introduction />
      <SignatureServices />
      <ProductScene />
      <ExperienceRail />
      <ExperienceStack />
      <MembershipTeaser />
      <Testimonials />
      <Gallery />
      <ShopTeaser />
      <FinalCta />
    </>
  );
}
