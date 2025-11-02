import { EventData } from "@/lib/data/events";
import {
  DatabaseError,
  handleAsyncError,
  logError,
  NotFoundError,
  retryAsync,
  ValidationError,
} from "@/lib/error-utils";
import { TEventData } from "@/models/show/show";
import { User } from "better-auth";

export class EventsServices {
  static async create({
    event,
    user,
  }: {
    event: TEventData;
    user: User;
  }): Promise<{ event: TEventData | null; status: number; error?: string }> {
    if (!event.title) {
      const validationError = new ValidationError("Title is required", "title");
      logError(validationError, "addEvent");
      return { event: null, status: 400, error: validationError.message };
    }

    if (!user.id) {
      const validationError = new ValidationError(
        "User ID is required",
        "userId"
      );
      logError(validationError, "addEvent");
      return { event: null, status: 400, error: validationError.message };
    }

    const [result, error] = await handleAsyncError(async () => {
      return await EventData.create({ event, user });
    })();

    if (error) {
      logError(error, "addEvent");
      return { event: null, status: 500, error: error.message };
    }

    return { event: result?.event || null, status: result?.status || 200, error: result?.error };
  }
  static async getEvents() {
    const [result, error] = await handleAsyncError(() =>
      retryAsync(() => EventData.getEvents(), {
        maxRetries: 2,
        baseDelay: 500,
      })
    )();

    if (error) {
      logError(error, "getEvents");
      const dbError = new DatabaseError("Failed to fetch events", error);
      return { events: [], status: 500, error: dbError.message };
    }

    return { events: result?.events || [], status: result?.status || 200 };
  }

  static async getEventById(
    id: string
  ): Promise<{ event?: TEventData | null; status: number; error?: string }> {
    if (!id) {
      return { status: 400 };
    }
    const [result, error] = await handleAsyncError(() =>
      retryAsync(() => EventData.getEventsById(id), {
        maxRetries: 2,
        baseDelay: 500,
      })
    )();
    if (error) {
      logError(error, "getEventById");
      const dbError = new DatabaseError("Failed to fetch event", error);
      return { event: null, status: 500, error: dbError.message };
    }
    return { event: result?.event || null, status: result?.status || 200 };
  }

  static async upadate(
    event: TEventData
  ): Promise<{ event: TEventData | null; status: number; error?: string }> {
    if (!event.id) {
      const validationError = new ValidationError("Event ID is required", "id");
      logError(validationError, "upadate");
      return { event: null, status: 400, error: validationError.message };
    }

    const [result, error] = await handleAsyncError(() =>
      retryAsync(() => EventData.update(event), {
        maxRetries: 2,
        baseDelay: 500,
        retryCondition: (error: any) => {
          // Don't retry on validation errors (P2025 = record not found)
          if (error.code === "P2025") return false;
          return !(error instanceof ValidationError);
        },
      })
    )();

    if (error) {
      logError(error, "upadate: EventsServices");

      // Handle specific Prisma errors
      if ((error as any).code === "P2025") {
        const notFoundError = new NotFoundError("Event");
        return { event: null, status: 404, error: notFoundError.message };
      }

      const dbError = new DatabaseError("Failed to update event", error);
      return { event: null, status: 500, error: dbError.message };
    }

    return { event: result?.event || null, status: result?.status || 200 };
  }

  static async deleteEvent(id: string) {
    if (!id) return { event: null, status: 400 };
    const [, error] = await handleAsyncError(() =>
      retryAsync(() => EventData.delete(id), {
        maxRetries: 2,
        baseDelay: 500,
        retryCondition: (error: any) => {
          // Don't retry on validation errors (P2025 = record not found)
          if (error.code === "P2025") return false;
          return !(error instanceof ValidationError);
        },
      })
    )();
    if (error) {
      logError(error, "deleteEvent");

      // Handle specific Prisma errors
      if ((error as any).code === "P2025") {
        const notFoundError = new NotFoundError("Event");
        return { event: null, status: 404, error: notFoundError.message };
      }

      const dbError = new DatabaseError("Failed to update event", error);
      return { event: null, status: 500, error: dbError.message };
    }

    return { status: 200 };
  }
}
