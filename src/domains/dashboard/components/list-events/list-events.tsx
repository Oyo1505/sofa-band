"use server";
import { TEventData } from "@/models/show/show";
import dynamic from "next/dynamic";

const EventItem = dynamic(() => import("../event-item/event-item"));

const ListEvents = ({ events }: { events: TEventData[] }) => {
  return (
    <div>
      {events.map((event, index) => (
        <EventItem key={index} index={index} event={event} />
      ))}
    </div>
  );
};

export default ListEvents;
