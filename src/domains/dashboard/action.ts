
import prisma from "@/lib/db";
import { EventData } from "@/models/show/show";

import { revalidatePath } from "next/cache";
import { handleAsyncError, ValidationError, NotFoundError, logError } from "@/lib/error-utils";

export const getEvents = async () => {
  const [events, error] = await handleAsyncError(async () => {
    return await prisma.event.findMany()
  })()

  if (error) {
    logError(error, 'getEvents')
    return { events: [], status: 500, error: error.message }
  }

  return { events, status: 200 }
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

export const addEvent = async ({ event, user }: { event: EventData, user: any }): Promise<{ event: EventData | null, status: number, error?: string }> => {
  if (!event.title) {
    const validationError = new ValidationError('Title is required', 'title')
    logError(validationError, 'addEvent')
    return { event: null, status: 400, error: validationError.message }
  }

  const [eventData, error] = await handleAsyncError(async () => {
    return await prisma.event.create({
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
  })()

  if (error) {
    logError(error, 'addEvent')
    return { event: null, status: 500, error: error.message }
  }

  return { event: eventData, status: 200 }
}

export const editEventToDb = async ({ event }: { event: EventData }): Promise<{ event: EventData | null, status: number }> => {

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
 
    revalidatePath('/dashboard/events')
    return { status: 200 }
  } catch (err) {
    console.log(err)
    return { status: 500 }
  }
}
