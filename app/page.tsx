"use client";

import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <Hero />

      {/* ===== ABOUT ===== */}
      <section className="container mx-auto grid md:grid-cols-2 gap-10 items-center px-6 py-20">
        {/* Texte */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Donner du pouvoir à la prochaine génération des leaders technologiques
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Chez Funda, nous pensons que tout le monde mérite d’avoir accès à une
            formation de qualité. Notre mission est d’accompagner les jeunes,
            étudiants et passionnés dans leur apprentissage de l’informatique.
          </p>
        </div>

        {/* Image (placeholder pour l’instant) */}
        <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">[Image / Illustration]</span>
        </div>
      </section>
    </div>
  );
}
