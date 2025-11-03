import { LandingPage } from "@/components/landing/LandingPage";

const features = [
  {
    title: "Interactive Canvas",
    description:
      "Drag, resize, and transform objects with intuitive controls",
  },
  {
    title: "Rich Customization",
    description:
      "Add images, text, gradients, and custom backgrounds",
  },
  {
    title: "Export Options",
    description:
      "Download your designs in PNG or JPG at full resolution",
  },
];

export default function Home() {
  return (
    <LandingPage
      heroTitle="Create stunning visual designs"
      heroSubtitle="with Stage"
      heroDescription="A modern canvas editor that brings your ideas to life. Add images, text, backgrounds, and export your creations in high quality. Built for designers and creators."
      ctaLabel="Get Started"
      ctaHref="/home"
      features={features}
    />
  );
}
