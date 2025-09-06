import { defineType } from "sanity"

export default defineType({
  name: "event",
  title: "Événement",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
    },
    {
      name: "date",
      title: "Date",
      type: "datetime",
    },
    {
      name: "speaker",
      title: "Intervenant",
      type: "string",
    },
    {
      name: "time",
      title: "Heure",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "registrationLink",
      title: "Lien d’inscription",
      type: "url",
    },
  ],
})
