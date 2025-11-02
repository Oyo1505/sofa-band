import { Session } from "better-auth";

export type SelectUser = {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  accounts?: unknown;
  sessions?: Session;
};
