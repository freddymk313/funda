"use client";

import Navbar from "@/components/home/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 bg-gray-50">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Apprenez l’informatique <br /> et transformez votre avenir !
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Bienvenue sur Funda, votre plateforme d’apprentissage.
        </p>

        {/* Boutons CTA */}
        <div className="mt-8 flex gap-4">
          <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition">
            Découvrir les formations
          </button>
          <button className="border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/10 transition">
            Voir les événements
          </button>
        </div>
      </section>

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
