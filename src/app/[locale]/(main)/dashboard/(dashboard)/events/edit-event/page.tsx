import { editEventToDb } from "@/domains/dashboard/action";
import FormEvent from "@/domains/dashboard/components/form-event/form-event";
import { EventsServices } from "@/domains/dashboard/services/events";

import { TEventData } from "@/models/show/show";

const getData = async (id: string) => {
  const { event } = await EventsServices.getEventById(id);
  return event;
};

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) => {
  const { id } = await searchParams;
  const event = await getData(id);
  const editEvent = async ({ event }: { event: TEventData }) => {
    "use server";
    if (!event) {
      return;
    }

    await editEventToDb({ event });
  };
  return event ? (
    <FormEvent event={event} editEvent={editEvent} />
  ) : (
    <div className="text-black">Event not found</div>
  );
};

export default Page;
