import { getAuthorizedEmails } from "@/domains/auth/auth.action";
import { APIError, betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "./db";

const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  session: {
    expiresIn: 604800, // 7 days
    updateAge: 86400, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 1800, // 30 minutes
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      accessType: "offline",
    },
  },
  trustedOrigins: [process.env.NEXTAUTH_URL as string],
  plugins: [nextCookies()],
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (!user.email) {
            throw new APIError("BAD_REQUEST", {
              message: "Email is required",
            });
          }

          try {
            const { mails, status } = await getAuthorizedEmails();
            if (status !== 200 || !mails) {
              throw new APIError("INTERNAL_SERVER_ERROR", {
                message: "Authorization check failed",
              });
            }

            const isAuthorized = mails.some(
              (item) => item.email === user.email,
            );
            if (!isAuthorized) {
              console.warn(`Unauthorized sign-in attempt: ${user.email}`);
              throw new APIError("UNAUTHORIZED", {
                message:
                  "Your email is not authorized to access this application. Please contact an administrator.",
              });
            }

            return { data: user };
          } catch (error) {
            throw new APIError("INTERNAL_SERVER_ERROR", {
              message: "Authorization check failed",
            });
          }
        },
      },
    },
  },
});
type Session = typeof auth.$Infer.Session;
/**
 * Helper function for server components to get session
 * Compatible with Better Auth - replaces NextAuth's auth() function
 */

export async function getServerSession() {
  const { headers } = await import("next/headers");

  return auth.api.getSession({
    headers: await headers(),
  });
}

export { auth };
export type { Session };
