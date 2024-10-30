
import prisma from "@/lib/db";
import { Event } from "@/shared/models/event";
import { revalidatePath } from "next/cache";

export const getEvents = async () => {
  try {
    const events = await prisma.event.findMany()
    return { events, status: 200 }
  } catch (error) {
    console.log(error)
    return { events: [], status: 500 }
  }
}

export const addEvent = async ({event, user}: {event: Event, user: any}) => {

  if (!event.title) {
    return { event: null, status: 400 }
  }
  try {
    const eventData = await prisma.event.create({
      data: {
        title: event.title,
        location: event.location,
        time: event.time,
        city: event.city,
        cityInJpn: event.cityInJpn,
        date: event.date,
        infoLink: event.infoLink,
        region: event.region,
        country: event.country ?? '',
        published: event.published,
        authorId: user.id,
      },
    })
    revalidatePath('/dashboard/events')
    return { eventData, status: 200 }
  } catch (error) {
    console.log(error)
    return { event: null, status: 500 }
  }
}