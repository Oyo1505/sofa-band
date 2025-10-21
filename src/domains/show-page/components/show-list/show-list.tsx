"use client";
import { BlurIn } from "@/domains/ui/components/blur-in/blur-in";
import Text from "@/domains/ui/components/text/text";
import Title from "@/domains/ui/components/title/title";
import { EventData } from "@/models/show/show";
import { useTranslations } from "next-intl";
import ShowItem from "../show-item/show-item";
import ShowTitle from "../show-title/show-title";

const ShowList = ({ events }: { events: EventData[] }) => {
  const today = new Date().toISOString();
  const t = useTranslations("ShowPage");
  const isFutureShow = events.filter((event: EventData) => event.date > today);
  const isPastShow = events
    .filter((event: EventData) => event.date < today)
    .slice(0, 3);
  return (
    <BlurIn duration={0.6} blur={7} className="w-full">
      <div className="rounded-2xl w-full flex flex-col gap-5">
        <ShowTitle />

        {isFutureShow.length > 0 ? (
          <>
            <div className="rounded-md shadow-sm bg-foreground p-5">
              {isFutureShow?.map((event: EventData, index: number) => (
                <ShowItem key={index} event={event} />
              ))}
            </div>
          </>
        ) : (
          <Text type="p">{t("noEvents")}</Text>
        )}
        {isPastShow.length > 0 ? (
          <>
            <Title
              type="h2"
              text={t("pastEvents")}
              className="text-xl text-foreground font-bold"
            />
            <div className="rounded-md shadow-sm bg-foreground p-5">
              {isPastShow?.map((event: EventData, index: number) => (
                <ShowItem key={index} event={event} />
              ))}
            </div>
          </>
        ) : (
          <Text type="p">{t("noEvents")}</Text>
        )}
      </div>
    </BlurIn>
  );
};

export default ShowList;
