"use client";
import { BlurIn } from "@/domains/ui/components/blur-in/blur-in";
import Text from "@/domains/ui/components/text/text";
import Title from "@/domains/ui/components/title/title";
import { TEventData } from "@/models/show/show";
import { useTranslations } from "next-intl";
import ShowItem from "../show-item/show-item";
import ShowTitle from "../show-title/show-title";

const ShowList = ({ events }: { events: TEventData[] | undefined }) => {
  const today = new Date().toISOString();
  const t = useTranslations("ShowPage");
  const isFutureShow =
    events && events.filter((event: TEventData) => event.date > today);
  const isPastShow =
    events &&
    events.filter((event: TEventData) => event.date < today).slice(0, 3);
  return (
    <BlurIn duration={0.6} blur={7} className="w-full">
      <div className="rounded-2xl w-full flex flex-col gap-5">
        <ShowTitle />

        {isFutureShow && isFutureShow.length > 0 ? (
          <>
            <div className="rounded-md shadow-sm bg-foreground p-5">
              {isFutureShow?.map((event: TEventData, index: number) => (
                <ShowItem key={index} event={event} />
              ))}
            </div>
          </>
        ) : (
          <Text type="p">{t("noEvents")}</Text>
        )}
        {isPastShow && isPastShow.length > 0 ? (
          <>
            <Title
              type="h2"
              text={t("pastEvents")}
              className="text-xl text-foreground font-bold"
            />
            <div className="rounded-md shadow-sm bg-foreground p-5">
              {isPastShow?.map((event: TEventData, index: number) => (
                <ShowItem key={index} event={event} />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </BlurIn>
  );
};

export default ShowList;
