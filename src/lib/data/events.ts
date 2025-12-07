import prisma from "@/lib/prisma";
import { TEventData } from "@/models/show/show";
import type { Event } from "@prisma/generated";
import { User } from "better-auth";
import { cache } from "react";

import { logError } from "../error-utils";

export class EventData {
  static async create({
    event,
    user,
  }: {
    event: TEventData;
    user: User;
  }): Promise<{ event?: TEventData | null; status: number; error?: string }> {
    try {
      const eventCreated = await prisma.event.create({
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
          authorId: user.id!,
        },
      });
      if (eventCreated) return { event: eventCreated, status: 200 };
      return { event: null, status: 200 };
    } catch (error) {
      logError(
        error instanceof Error ? error : new Error(String(error)),
        "create: EventData"
      );
      return { status: 500 };
    }
  }
  static async update(
    event: TEventData
  ): Promise<{ event?: TEventData; status: number }> {
    try {
      const updatedEvent = await prisma.event.update({
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
      if (updatedEvent) {
        return { event: updatedEvent, status: 200 };
      }
      return { event: undefined, status: 200 };
    } catch (error) {
      return { status: 500 };
    }
  }
  static async delete(id: string) {
    try {
      await prisma.event.delete({
        where: {
          id,
        },
      });
      return { status: 200 };
    } catch (error) {
      return { status: 500 };
    }
  }
  static getEvents = cache(
    async (): Promise<{
      events?: Event[];
      status: number;
    }> => {
      try {
        const events = await prisma.event.findMany();
        if (events) {
          return { events, status: 200 };
        }
        return { events: undefined, status: 200 };
      } catch (error) {
        logError(
          error instanceof Error ? error : new Error(String(error)),
          "getEvents: EventData"
        );
        return { events: undefined, status: 500 };
      }
    }
  );
  static getEventsById = cache(
    async (
      id: string
    ): Promise<{
      event?: Event;
      status: number;
    }> => {
      if (!id) {
        return { status: 400 };
      }
      try {
        const event = await prisma.event.findUnique({
          where: { id },
        });
        if (event) {
          return { event, status: 200 };
        }
        return { event: undefined, status: 200 };
      } catch (error) {
        return { status: 500 };
      }
    }
  );
}
