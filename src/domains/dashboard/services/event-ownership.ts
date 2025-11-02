"use server";

import { verifyOwnership, canModifyResource } from "@/lib/data/dal/core/auth";
import { EventData } from "@/lib/data/events";
import { logError, ValidationError } from "@/lib/error-utils";
import { TEventData } from "@/models/show/show";

/**
 * Event Ownership Service
 *
 * Provides secure event operations with built-in ownership verification.
 * All modification operations verify that the current user owns the event.
 */

/**
 * Verifies the current user owns an event
 *
 * @param eventId - Event ID to check ownership for
 * @returns Event data if user owns it
 * @throws {DALError} FORBIDDEN if user doesn't own the event
 * @throws {DALError} NOT_FOUND if event doesn't exist
 */
export async function verifyEventOwnership(
  eventId: string
): Promise<{ event: TEventData; canModify: true }> {
  if (!eventId) {
    throw new ValidationError("Event ID is required", "eventId");
  }

  // Fetch the event
  const result = await EventData.getEventsById(eventId);

  if (!result.event) {
    throw new ValidationError("Event not found", "eventId");
  }

  // Verify ownership
  await verifyOwnership(result.event.authorId);

  return {
    event: result.event,
    canModify: true,
  };
}

/**
 * Checks if current user can modify an event (non-throwing)
 *
 * @param eventId - Event ID to check
 * @returns true if user can modify, false otherwise
 */
export async function canModifyEvent(eventId: string): Promise<boolean> {
  try {
    const result = await EventData.getEventsById(eventId);
    if (!result.event) return false;
    return await canModifyResource(result.event.authorId);
  } catch (error) {
    logError(
      error instanceof Error ? error : new Error(String(error)),
      "canModifyEvent"
    );
    return false;
  }
}

/**
 * Updates an event with ownership verification
 *
 * @param event - Event data to update (must include id)
 * @returns Updated event data
 * @throws {DALError} FORBIDDEN if user doesn't own the event
 */
export async function updateWithOwnershipCheck(
  event: TEventData
): Promise<TEventData> {
  // Verify ownership before updating
  await verifyEventOwnership(event.id);

  // Proceed with update
  const result = await EventData.update(event);

  if (!result.event) {
    throw new ValidationError("Failed to update event", "event");
  }

  return result.event;
}

/**
 * Deletes an event with ownership verification
 *
 * @param eventId - Event ID to delete
 * @throws {DALError} FORBIDDEN if user doesn't own the event
 */
export async function deleteWithOwnershipCheck(eventId: string): Promise<void> {
  // Verify ownership before deleting
  await verifyEventOwnership(eventId);

  // Proceed with deletion
  await EventData.delete(eventId);
}
