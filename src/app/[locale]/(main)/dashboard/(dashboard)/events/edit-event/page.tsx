import { editEventToDb, getEventById } from "@/domains/dashboard/action";
import FormEvent from "@/domains/dashboard/components/form-event/form-event";
import { EventData } from "@/models/show/show";

const getData = async (id: string) => {
  const { event } = await getEventById(id);
  return event;
};

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) => {
  const { id } = await searchParams;
  const event = await getData(id);
  const editEvent = async ({ event }: { event: EventData }) => {
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
