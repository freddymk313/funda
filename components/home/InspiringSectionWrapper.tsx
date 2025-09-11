import { client } from "@/sanity/lib/client"
import InspiringSection from "./InspiringSection"

const lastPastEventsQuery = `
  *[_type == "pastEvent"] | order(date desc)[0...6]{
    _id,
    title,
    replayUrl,
    platform,
    image,
  }
`

export default async function InspiringSectionWrapper() {
  const pastEvents = await client.fetch(lastPastEventsQuery)
  return <InspiringSection events={pastEvents} />
}
