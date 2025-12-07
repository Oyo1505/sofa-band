import { IEventRepository } from "@/domains/dashboard/interfaces/event-repository.interface";
import { TEventData } from "@/models/show/show";
import type { PrismaClient } from "@prisma/generated";

/**
 * Prisma Event Repository
 *
 * Concrete implementation of IEventRepository using Prisma ORM.
 * Handles all database operations for events.
 */
export class PrismaEventRepository implements IEventRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(
    event: Omit<TEventData, "id" | "createdAt" | "updatedAt">,
    userId: string
  ): Promise<TEventData> {
    const createdEvent = await this.prisma.event.create({
      data: {
        title: event.title,
        location: event.location,
        time: event.time,
        city: event.city,
        cityInJpn: event.cityInJpn,
        date: event.date,
        infoLink: event.infoLink,
        region: event.region,
        country: event.country ?? "",
        published: event.published,
        authorId: userId,
      },
    });

    return createdEvent as TEventData;
  }

  async update(event: TEventData): Promise<TEventData> {
    const updatedEvent = await this.prisma.event.update({
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
    });

    return updatedEvent as TEventData;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.event.delete({
      where: { id },
    });
  }

  async findById(id: string): Promise<TEventData | null> {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    return event ? (event as TEventData) : null;
  }

  async findAll(): Promise<TEventData[]> {
    const events = await this.prisma.event.findMany();
    return events as TEventData[];
  }
}
