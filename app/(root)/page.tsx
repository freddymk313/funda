import Hero from "@/components/home/Hero";
import OurMission from "@/components/home/OurMission";
import UpcomingEvent from "@/components/home/UpcomingEvent";
import Newsletter from "@/components/home/Newsletter";
import InspiringSection from "@/components/home/InspiringSection";
import ArticlesGrid from "@/components/home/ArticlesGrid";
// Make sure the following file exists: <projectRoot>/sanity/client.ts
import { client } from "../../sanity/lib/client";

export default async function Home() {
  const event = await client.fetch(
    `*[_type == "event"] | order(date asc)[0]`
  )

  const query = `*[_type == "blog"] | order(date desc) {
  _id,
  title,
  slug,
  excerpt,
  content,
  image,
  category,
  tags,
  author,
  date,
  readTime
}`

const articles = await client.fetch(query)

  return (
    <div className="min-h-screen flex flex-col">
      <Hero />

      <OurMission />

      <UpcomingEvent event={event} />

      <InspiringSection events={articles} />
      <ArticlesGrid articles={articles} />
      <Newsletter />
    </div>
  );
}
