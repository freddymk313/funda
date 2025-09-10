import { defineType } from "sanity"

export default defineType({
  name: "blog",
  title: "Article de blog",
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
        maxLength: 96,
      },
    },
    {
      name: "excerpt",
      title: "Résumé",
      type: "text",
      description: "Courte description qui sera affichée sur la liste des articles",
    },
    {
      name: "content",
      title: "Contenu",
      type: "array",
      of: [{ type: "block" }],
      description: "Texte principal de l’article",
    },
    {
      name: "image",
      title: "Image de couverture",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "category",
      title: "Catégorie",
      type: "string",
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "author",
      title: "Auteur",
      type: "string",
    },
    {
      name: "date",
      title: "Date de publication",
      type: "datetime",
    },
    {
      name: "readTime",
      title: "Temps de lecture",
      type: "string",
      description: "Ex: 5 min, 10 min...",
    },
  ],
})
