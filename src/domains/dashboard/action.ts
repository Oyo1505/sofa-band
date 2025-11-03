"use server";

import { Container } from "@/lib/di/container";
import { URL_DASHBOARD_EVENTS } from "@/lib/routes";
import { TEventData } from "@/models/show/show";
import { User } from "better-auth";
import { revalidatePath } from "next/cache";
import {
  updateWithOwnershipCheck,
  deleteWithOwnershipCheck,
} from "./services/event-ownership";
import { DALError } from "@/lib/data/dal/core/errors";

/**
 * Server Actions for Event Management
 *
 * Uses dependency injection container to get service instances.
 * All actions handle errors and revalidate Next.js cache when needed.
 */

export const addEvent = async ({
  event,
  user,
}: {
  event: TEventData;
  user: User;
}): Promise<{ event?: TEventData | null; status: number; error?: string }> => {
  try {
    const eventService = Container.getEventService();
    const result = await eventService.create(event, user);
    revalidatePath(URL_DASHBOARD_EVENTS);

    return {
      event: result.data,
      status: result.status,
      error: result.error,
    };
  } catch (error) {
    const logger = Container.getLogger();
    logger.error(
      error instanceof Error ? error : new Error(String(error)),
      "addEvent: action"
    );
    return { status: 500 };
  }
};

export const editEventToDb = async ({
  event,
}: {
  event: TEventData;
}): Promise<{ event?: TEventData | null; status: number; error?: string }> => {
  try {
    // Verify ownership before updating
    const updatedEvent = await updateWithOwnershipCheck(event);
    revalidatePath(URL_DASHBOARD_EVENTS);
    return { event: updatedEvent, status: 200 };
  } catch (error) {
    const logger = Container.getLogger();
    logger.error(
      error instanceof Error ? error : new Error(String(error)),
      "editEventToDb: action"
    );

    // Handle authorization errors with appropriate status codes
    if (error instanceof DALError) {
      return {
        status: error.toHTTPStatus(),
        error: error.message,
      };
    }

    return { status: 500, error: "Failed to update event" };
  }
};

export const deleteEventById = async (
  id: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Verify ownership before deleting
    await deleteWithOwnershipCheck(id);
    revalidatePath(URL_DASHBOARD_EVENTS);
    return { success: true };
  } catch (error) {
    const logger = Container.getLogger();
    logger.error(
      error instanceof Error ? error : new Error(String(error)),
      "deleteEventById: action"
    );

    // Provide user-friendly error messages for authorization failures
    if (error instanceof DALError) {
      return {
        success: false,
        error:
          error.type === "FORBIDDEN"
            ? "You don't have permission to delete this event"
            : error.message,
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};
