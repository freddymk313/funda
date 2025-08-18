"use client";

import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import OurMission from "@/components/home/OurMission";
import UpcomingEvent from "@/components/home/UpcomingEvent";
import WhatsAppCTA from "@/components/home/WhatsAppCTA";
import Newsletter from "@/components/home/Newsletter";
import InspiringSection from "@/components/home/InspiringSection";
import ArticlesGrid from "@/components/home/ArticlesGrid";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <Hero />

      <OurMission />

      <UpcomingEvent />
      <WhatsAppCTA />
      <Newsletter />

      <InspiringSection />
      <ArticlesGrid />
    </div>
  );
}
