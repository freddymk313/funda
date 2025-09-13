import { client } from "@/sanity/lib/client"
import InspiringSection from "./InspiringSection"

const lastPastEventsQuery = `
  *[_type == "pastEvent"] | order(date desc)[0...6]{
    _id,
    title,
    replayUrl,
    platform,
    "imageUrl": image.asset->url
  }
`

// const lastPastEventsQuery = `
//   *[_type == "pastEvent"] | order(date desc){
//     _id,
//     title,
//     description,
//     date,
//     time,
//     speaker,
//     category,
//     platform,
//     replayUrl,
//     slidesUrl,
//     resources,
//     "imageUrl": image.asset->url
//   }
// `

export default async function InspiringSectionWrapper() {
  const pastEvents = await client.fetch(lastPastEventsQuery)
  console.log("Events fech:", pastEvents)
  return <InspiringSection events={pastEvents} />
}
