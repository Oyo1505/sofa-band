"use client";
import Loading from "@/app/[locale]/(main)/loading";
import { BlurIn } from "@/domains/ui/components/blur-in/blur-in";
import Title from "@/domains/ui/components/title/title";
import {
  getQueryErrorMessage,
  useYouTubeChannel,
  useYouTubePlaylist,
} from "@/lib/queries";
import { Live } from "@/models/lives/live";
import { useLocale, useTranslations } from "next-intl";
import LiveItem from "../live-item/live-item";

export const revalidate = 60;
const channelId = "UC8xzsABKxgXbJYLhxTn8GpQ";

const LiveList = () => {
  const t = useTranslations("LivePage");
  const locale = useLocale();

  // Get channel data with retry and error handling
  const {
    data: channelData,
    error: channelError,
    isLoading: channelLoading,
  } = useYouTubeChannel(channelId);

  // Get playlist videos with dependency on channel data
  const {
    data: videos = [],
    error: playlistError,
    isLoading: playlistLoading,
  } = useYouTubePlaylist(channelData?.playlistId || null);

  // Show loading state for either channel or playlist
  if (channelLoading || playlistLoading) {
    return <Loading />;
  }

  // Show channel error
  if (channelError) {
    return (
      <div className="flex flex-col gap-5 w-full">
        <Title type="h2" text={t("title")} className="text-3xl font-bold" />
        <div className="text-red-500 p-4 bg-red-50 rounded-lg">
          <p className="font-semibold">
            {t("error", { defaultValue: "Erreur" })}
          </p>
          <p>{getQueryErrorMessage(channelError, locale)}</p>
        </div>
      </div>
    );
  }

  // Show playlist error
  if (playlistError) {
    return (
      <div className="flex flex-col gap-5 w-full">
        <Title type="h2" text={t("title")} className="text-3xl font-bold" />
        <div className="text-yellow-600 p-4 bg-yellow-50 rounded-lg">
          <p className="font-semibold">
            {t("warning", { defaultValue: "Attention" })}
          </p>
          <p>{getQueryErrorMessage(playlistError, locale)}</p>
        </div>
      </div>
    );
  }

  // Transform and sort videos
  const livesSorted: Live[] =
    (videos as any[])?.map((video) => ({
      ...video,
      resourceId: video.resourceId || { videoId: video.videoId },
    })) || [];

  const livesSortedAndSliced =
    livesSorted?.length > 3 ? livesSorted.slice(0, 2) : livesSorted;

  const container = {
    visible: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <BlurIn duration={0.7} blur={5} className="w-full">
      <div className="flex flex-col gap-5 w-full">
        <Title type="h2" text={t("title")} className="text-3xl font-bold" />

        <div className="grid grid-cols-1 w-full gap-4">
          {livesSortedAndSliced && livesSortedAndSliced.length > 0 ? (
            livesSortedAndSliced.map((item, index) => (
              <LiveItem
                key={`${item.resourceId?.videoId || item.videoId || index}`}
                title={item.title || "Untitled"}
                date={
                  item.publishedAt ? new Date(item.publishedAt) : new Date()
                }
                videoId={item.resourceId?.videoId || item.videoId || ""}
              />
            ))
          ) : (
            <p className="text-gray-500">{t("NoVideo")}</p>
          )}
        </div>
      </div>
    </BlurIn>
  );
};

export default LiveList;
