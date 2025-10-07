
import prisma from "@/lib/db";
import { DatabaseError, handleAsyncError, logError, NotFoundError, retryAsync, ValidationError } from "@/lib/error-utils";
import { EventData } from "@/models/show/show";
import { User } from "better-auth";
import { revalidatePath } from "next/cache";

export const getEvents = async () => {
  const [events, error] = await handleAsyncError(
    () => retryAsync(
      () => prisma.event.findMany(),
      {
        maxRetries: 2,
        baseDelay: 500,
        retryCondition: (error) => !(error instanceof ValidationError)
      }
    )
  )()

  if (error) {
    logError(error, 'getEvents')
    const dbError = new DatabaseError('Failed to fetch events', error)
    return { events: [], status: 500, error: dbError.message }
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

export const addEvent = async ({ event, user }: { event: EventData, user: User }): Promise<{ event: EventData | null, status: number, error?: string }> => {
  if (!event.title) {
    const validationError = new ValidationError('Title is required', 'title')
    logError(validationError, 'addEvent')
    return { event: null, status: 400, error: validationError.message }
  }

  if (!user.id) {
    const validationError = new ValidationError('User ID is required', 'userId')
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
        authorId: user.id!,
      },
    })
  })()
  
  if (error) {
    logError(error, 'addEvent')
    return { event: null, status: 500, error: error.message }
  }

  return { event: eventData, status: 200 }
}

export const editEventToDb = async ({ event }: { event: EventData }): Promise<{ event: EventData | null, status: number, error?: string }> => {
  if (!event.id) {
    const validationError = new ValidationError('Event ID is required', 'id')
    logError(validationError, 'editEventToDb')
    return { event: null, status: 400, error: validationError.message }
  }

  const [updatedEvent, error] = await handleAsyncError(
    () => retryAsync(
      () => prisma.event.update({
        where: { id: event.id },
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
      }),
      {
        maxRetries: 2,
        baseDelay: 500,
        retryCondition: (error: any) => {
          // Don't retry on validation errors (P2025 = record not found)
          if (error.code === 'P2025') return false;
          return !(error instanceof ValidationError);
        }
      }
    )
  )()

  if (error) {
    logError(error, 'editEventToDb')
    
    // Handle specific Prisma errors
    if ((error as any).code === 'P2025') {
      const notFoundError = new NotFoundError('Event')
      return { event: null, status: 404, error: notFoundError.message }
    }
    
    const dbError = new DatabaseError('Failed to update event', error)
    return { event: null, status: 500, error: dbError.message }
  }

  revalidatePath(`/dashboard/events/edit-event?id=${event.id}`)
  return { event: updatedEvent, status: 200 }
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
    logError(err instanceof Error ? err : new Error(String(err)), 'deleteEventById')
    return { status: 500 }
  }
}
