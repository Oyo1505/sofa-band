"use server";

import { getServerSession } from "@/lib/auth";

import prisma from "@/lib/prisma";
import { SelectUser } from "@/models/user/user";
import { cache } from "react";
import { DALError } from "./errors";

export async function verifySession() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    throw new DALError("UNAUTHORIZED", "No active session");
  }

  return session;
}

export const getCurrentUser = cache(async (): Promise<SelectUser> => {
  const session = await verifySession();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
    },
  });

  if (!user) {
    throw new DALError("NOT_FOUND", "User not found in database");
  }

  return {
    id: user.id,
    email: user.email ?? undefined,
    name: user.name ?? undefined,
    image: user.image ?? undefined,
  };
});

/**
 * Verifies that the current authenticated user owns the specified resource
 *
 * @param resourceUserId - The user ID of the resource owner
 * @returns The current user if they own the resource
 * @throws {DALError} FORBIDDEN if user doesn't own the resource
 * @throws {DALError} UNAUTHORIZED if no valid session exists
 * @throws {DALError} NOT_FOUND if user not found in database
 *
 * @example
 * ```typescript
 * // In a Server Action or API route
 * const user = await verifyOwnership(event.authorId);
 * // Proceeds only if current user owns the event
 * ```
 */
export async function verifyOwnership(
  resourceUserId: string
): Promise<SelectUser> {
  const user = await getCurrentUser();

  if (user.id !== resourceUserId) {
    throw new DALError(
      "FORBIDDEN",
      `Access denied: You don't have permission to modify this resource`
    );
  }

  return user;
}

/**
 * Checks if the current user owns a resource without throwing errors
 *
 * @param resourceUserId - The user ID of the resource owner
 * @returns true if user owns the resource, false otherwise
 *
 * @example
 * ```typescript
 * const canEdit = await canModifyResource(event.authorId);
 * if (canEdit) {
 *   // Show edit button
 * }
 * ```
 */
export async function canModifyResource(
  resourceUserId: string
): Promise<boolean> {
  try {
    const user = await getCurrentUser();
    return user.id === resourceUserId;
  } catch {
    return false;
  }
}
