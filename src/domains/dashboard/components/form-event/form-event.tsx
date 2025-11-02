"use client";
import Input from "@/domains/ui/components/input/input";
import SelectInput from "@/domains/ui/components/select/select";
import { useSession } from "@/lib/auth-client";
import { logError } from "@/lib/error-utils";
import { URL_DASHBOARD_EVENTS } from "@/lib/routes";
import { TEventData } from "@/models/show/show";
import { hours } from "@/shared/constants/hours";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "better-auth";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { EventSchema } from "../../schema/event-schema";

type EventFormData = Omit<
  TEventData,
  "createdAt" | "updatedAt" | "country" | "published" | "authorId"
>;

interface FormEventProps {
  addEvent?: ({
    event,
    user,
  }: {
    event: TEventData;
    user: User;
  }) => Promise<{ event?: TEventData | null; status: number; error?: string }>;
  editEvent?: ({ event }: { event: TEventData }) => Promise<void>;
  event?: TEventData | undefined;
}

const FormEvent = ({ addEvent, editEvent, event }: FormEventProps) => {
  const locale = useLocale();
  const [eventData, setEvent] = React.useState<TEventData | undefined>(
    event ?? undefined
  );
  const session = useSession();
  const t = useTranslations("EventPage");
  const user = session?.data?.user;
  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: eventData?.id ?? "",
      title: eventData?.title ?? "",
      location: eventData?.location ?? "",
      time: eventData?.time ?? 0,
      city: eventData?.city ?? "",
      cityInJpn: eventData?.cityInJpn ?? "",
      date: eventData?.date ?? "",
      infoLink: eventData?.infoLink ?? "",
      region: eventData?.region ?? "",
    },
    resolver: zodResolver(EventSchema),
  });

  const onEditEvent: SubmitHandler<EventFormData> = async (data) => {
    if (!editEvent || !eventData) return;

    try {
      const completeEventData: TEventData = {
        ...eventData,
        ...data,
      };
      await editEvent({ event: completeEventData });
    } catch (error) {
      logError(
        error instanceof Error ? error : new Error(String(error)),
        "onEditEvent"
      );
    }
  };

  const onCreateEvent: SubmitHandler<EventFormData> = async (data) => {
    if (!addEvent || !user || !user.id) {
      return;
    }

    try {
      const completeEventData: TEventData = {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
        country: "",
        published: false,
        authorId: user.id,
      };

      const result = await addEvent({ event: completeEventData, user });
      if (result.status === 200) router.push(URL_DASHBOARD_EVENTS);
    } catch (error) {
      logError(
        error instanceof Error ? error : new Error(String(error)),
        "onCreateEvent"
      );
    }
  };

  const handleHoursChange = (hours: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("time", Number(hours.target.value));
  };

  return (
    <>
      <form
        name="form-event"
        onSubmit={handleSubmit(
          eventData && eventData.id ? onEditEvent : onCreateEvent
        )}
        className="flex w-full pl-4 pr-4 md:pr-0 md:pl-0 md:w-2/3 flex-col overflow-scroll gap-4"
      >
        <Input
          label={`${t("Title")}*`}
          error={errors.title}
          className="w-full p-1 rounded-md bg-foreground text-black"
          {...register("title")}
        />
        {eventData && eventData.id && (
          <Input type="hidden" {...register("id")} />
        )}
        <Input
          label={`${t("Location")}*`}
          error={errors.location}
          className="w-full p-1 rounded-md bg-foreground text-black"
          {...register("location")}
        />
        <div className="flex flex-col gap-2 md:flex-row w-full">
          <SelectInput
            optionsList={hours[0].time_slots}
            {...register("time")}
            label={`${t("Time")}*`}
            formData={event?.time}
            className=" p-1 rounded-md bg-foreground text-black"
            formDataKey="time_slots"
            locale={locale as "ja" | "en"}
            onChange={handleHoursChange}
          />
          <Input
            type="date"
            label={`${t("Date")}*`}
            error={errors.date}
            className="w-full p-1 rounded-md bg-foreground text-black"
            {...register("date")}
            placeholder="Time event"
          />
        </div>
        <div className="flex flex-col gap-2 md:flex-row w-full">
          <Input
            label={`${t("City")}*`}
            error={errors.city}
            className="w-full p-1 rounded-md bg-foreground text-black "
            {...register("city")}
          />
          <Input
            label={`${t("cityInJpn")}`}
            className="w-full p-1 rounded-md bg-foreground text-black"
            {...register("cityInJpn")}
          />
          <Input
            label={`${t("Region")}*`}
            error={errors.region}
            className="w-full p-1 rounded-md bg-foreground text-black"
            {...register("region")}
          />
        </div>
        <Input
          type="text"
          label={`${t("InfoLink")}`}
          error={errors.infoLink}
          className="w-full p-1 rounded-md bg-foreground text-black"
          {...register("infoLink")}
          placeholder="Info link event"
        />
        <div>
          *<span className="italic">Required</span>
        </div>
        <button
          type="submit"
          className="w-full p-2 border-foreground hover:bg-foreground hover:text-black border-2 rounded-md bg-primary text-foreground"
        >
          {t("Submit")}
        </button>
      </form>
    </>
  );
};

export default FormEvent;
