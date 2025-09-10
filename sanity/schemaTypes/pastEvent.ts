import { defineType } from "sanity"

export default defineType({
  name: "pastEvent",
  title: "Événement passé",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "image",
      title: "Image (affiche)",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "date",
      title: "Date",
      type: "string", // tu affiches "15 Décembre 2024", donc string au lieu de datetime
    },
    {
      name: "time",
      title: "Heure",
      type: "string",
    },
    {
      name: "speaker",
      title: "Intervenant",
      type: "string",
    },
    {
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Webinaire", value: "Webinaire" },
          { title: "Conférence", value: "Conférence" },
          { title: "Formation", value: "Formation" },
        ],
      },
    },
    {
      name: "platform",
      title: "Plateforme",
      type: "string",
      options: {
        list: [
          { title: "Facebook", value: "facebook" },
          { title: "YouTube", value: "youtube" },
        ],
        layout: "radio",
      },
    },
    {
      name: "replayUrl",
      title: "Lien du replay",
      type: "url",
    },
    {
      name: "slidesUrl",
      title: "Lien des slides (optionnel)",
      type: "url",
    },
    {
      name: "resources",
      title: "Ressources complémentaires",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
})
