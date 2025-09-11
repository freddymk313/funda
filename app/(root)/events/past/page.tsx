import { client } from "@/sanity/lib/client"
// import { pastEventsQuery } from "@/sanity/queries/pastEvents"
import PastEventsPageClient from "@/components/events/PastEventsPageClient"

export const pastEventsQuery = `
  *[_type == "pastEvent"] | order(date desc) {
    _id,
    title,
    description,
    date,
    time,
    speaker,
    category,
    platform,
    replayUrl,
    slidesUrl,
    resources,
    image {
      asset->{
        url
      }
    }
  }
`
export default async function PastEventsPage() { 
  const events = await client.fetch(pastEventsQuery)

  return <PastEventsPageClient events={events} />
}
