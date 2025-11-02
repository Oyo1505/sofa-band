/**
 * Event type matching the Prisma schema and API types
 * This is the single source of truth for Event data structure
 *
 * @see {@link ../lib/api-types.ts} for API request/response types
 * @see {@link @prisma/client} for database model
 */
export type TEventData = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  location: string;
  time: number; // Time slot ID (not string!)
  city: string;
  cityInJpn: string;
  date: string;
  infoLink: string;
  country: string | null;
  region: string;
  published: boolean;
  authorId: string;
};

/**
 * @deprecated Use TEventData instead. This type will be removed in next version.
 * Legacy type with incorrect time field (string instead of number)
 */
export type Event = TEventData;
