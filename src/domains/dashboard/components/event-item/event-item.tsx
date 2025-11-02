"use client";
import { Link } from "@/i18n/routing";

import { TEventData } from "@/models/show/show";
import { hours } from "@/shared/constants/hours";
import { useLocale, useTranslations } from "next-intl";
import { useFormState, useFormStatus } from "react-dom";
import { deleteEventById } from "../../action";

const DeleteButton = () => {
  const { pending } = useFormStatus();
  const t = useTranslations("EventPage");

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-red-500 text-white text-center rounded-md px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? t("Deleting") || "Deleting..." : t("Delete")}
    </button>
  );
};

const EventItem = ({
  event,
  index
}: {
  event: TEventData;
  index: number;
}) => {
  const time = hours[0].time_slots.filter((h) => h.id === event.time)[0];
  const locale = useLocale() as "ja" | "en";
  const t = useTranslations("EventPage");

  const deleteWithId = deleteEventById.bind(null, event.id);
  const [state, formAction] = useFormState(deleteWithId, { success: true });

  return (
    <div className="grid grid-cols-8 border-b border-background border-opacity-20 gap-1 p-4 last:border-b-0">
      <div className="truncate font-bold">
        {index + 1}. {event.title}
      </div>
      <div className="truncate">{event.location}</div>

      <div className="">{time[locale]}</div>
      <div className="truncate">{event.date}</div>
      <div className="truncate">
        {locale === "ja" && event.cityInJpn ? event.cityInJpn : event.city}
      </div>
      <div className="">{event.region}</div>
      <Link
        className="bg-black text-foreground text-center rounded-md px-2 py-1"
        href={{
          pathname: "/dashboard/events/edit-event",
          query: { id: event.id },
        }}
      >
        {t("Edit")}
      </Link>
      <form action={formAction}>
        <DeleteButton />
        {state?.error && (
          <span className="text-red-500 text-xs mt-1" title={state.error}>
            ✕
          </span>
        )}
      </form>
    </div>
  );
};

export default EventItem;
