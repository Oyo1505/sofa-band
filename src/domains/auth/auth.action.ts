'use server'

import prisma from "@/lib/db";
import { logError } from "@/lib/error-utils";

export const getAuthorizedEmails = async () => {
  try {
    const userauthorizedEmails = await prisma.authorizedEmail.findMany()
    if (!userauthorizedEmails) {
      return { status: 400 };
    }
   
    return { mails: userauthorizedEmails, status: 200 }
  } catch (error) {
    logError(error instanceof Error ? error : new Error(String(error)), 'getAuthorizedEmails')
    return {
      status: 500
    }
  }
}