'use server'

import prisma from "@/lib/db";

export const getAuthorizedEmails = async () => {
  try {
    const userauthorizedEmails = await prisma.authorizedEmail.findMany()
    if (!userauthorizedEmails) {
      return { status: 400 };
    }
   
    return { mails: userauthorizedEmails, status: 200 }
  } catch (error) {
    console.log(error)
    return {
      status: 500
    }
  }
}