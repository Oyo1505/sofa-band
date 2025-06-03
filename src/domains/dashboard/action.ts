
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

export const getEventById = (id: string) => {
  if (!id) { return { status: 400 } }
  try {
    const event = prisma.event.findUnique({
      where: { id },
    })
    return { event, status: 200 }
  } catch (error) {
    return { status: 500 }
  }
}

export const addEvent = async ({ event, user }: { event: Event, user: any }): Promise<{ event: Event | null, status: number }> => {

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
    return { event: eventData, status: 200 }
  } catch (error) {
    console.log(error)
    return { event: null, status: 500 }
  }
}

export const editEventToDb = async ({ event }: { event: Event }): Promise<{ event: Event | null, status: number }> => {

  if (!event.id) {
    return { event: null, status: 400 }
  }

  try {
    const updatedEvent = await prisma.event.update({
      where: {
        id: event.id
      },
      data: {
        title: event.title,
        location: event.location,
        time: event.time,
        city: event.city,
        cityInJpn: event.cityInJpn,
        date: event.date,
        infoLink: event.infoLink,
        region: event.region,
        published: event.published,
      },
    })

    revalidatePath(`/dashboard/events/edit-event?id=${event.id}`)
    return { event: updatedEvent, status: 200 }
  } catch (error) {
    console.log(error)
    return { event: null, status: 500 }
  }
}

export const deleteEventById = async (id: string) => {
  if (!id) return { event: null, status: 400 }
  try {
    await prisma.event.delete({
      where: {
        id
      }
    })
    console.log(id)
    revalidatePath('/dashboard/events')
    return { status: 200 }
  } catch (err) {
    console.log(err)
    return { status: 500 }
  }
}
