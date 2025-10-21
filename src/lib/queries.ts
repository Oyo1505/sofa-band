import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { apiClient } from "./api-client";
import { Event, EventCreateData, EventUpdateData } from "./api-types";
import { formatErrorMessage, isRetryableError } from "./error-utils";

// Query configuration defaults
const defaultQueryConfig = {
  retry: (failureCount: number, error: unknown) => {
    // Don't retry on client errors (4xx)
    if (
      error &&
      typeof error === "object" &&
      "status" in error &&
      typeof (error as { status: number }).status === "number"
    ) {
      if (
        (error as { status: number }).status >= 400 &&
        (error as { status: number }).status < 500
      ) {
        return false;
      }
    }

    // Retry up to 3 times for network/server errors
    return (
      failureCount < 3 && error instanceof Error && isRetryableError(error)
    );
  },
  retryDelay: (attemptIndex: number) =>
    Math.min(1000 * 2 ** attemptIndex, 30000),
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  refetchOnWindowFocus: false,
  refetchOnReconnect: true,
};

// YouTube API hooks
export const useYouTubeChannel = (channelId: string) => {
  const locale = useLocale();

  return useQuery({
    ...defaultQueryConfig,
    queryKey: ["youtube-channel", channelId],
    queryFn: async () => {
      const result = await apiClient.get("/api/youtube/videos?action=channel");

      if (!result.data) {
        throw new Error(
          formatErrorMessage(
            new Error(result.error),
            locale,
            "Failed to fetch channel data",
          ),
        );
      }

      // Our API returns { data: { playlistId: "..." }, status, timestamp }
      // But apiClient.get returns the whole JSON, so result.data contains the full response
      return (
        (result.data as { data?: { playlistId: string } })?.data || {
          playlistId: "",
        }
      );
    },
    enabled: !!channelId,
  });
};

export const useYouTubePlaylist = (playlistId: string | null) => {
  const locale = useLocale();

  return useQuery({
    ...defaultQueryConfig,
    queryKey: ["youtube-playlist", playlistId],
    queryFn: async () => {
      if (!playlistId) throw new Error("Playlist ID is required");

      const result = await apiClient.get(
        `/api/youtube/videos?action=playlist&playlistId=${playlistId}`,
      );

      if (!result.data) {
        throw new Error(
          formatErrorMessage(
            new Error(result.error),
            locale,
            "Failed to fetch playlist data",
          ),
        );
      }

      // Our API returns { data: { videos: [...] }, status, timestamp }
      // But apiClient.get returns the whole JSON, so result.data contains the full response
      return (
        (result.data as { data?: { videos?: unknown[] } })?.data?.videos || []
      );
    },
    enabled: !!playlistId,

    staleTime: 30 * 60 * 1000,
  });
};

// Events API hooks
export const useEvents = () => {
  const locale = useLocale();

  return useQuery({
    ...defaultQueryConfig,
    queryKey: ["events"],
    queryFn: async () => {
      const result = await apiClient.get<Event[]>("/api/events");

      if (!result.data) {
        throw new Error(
          formatErrorMessage(
            new Error(result.error),
            locale,
            "Failed to fetch events",
          ),
        );
      }

      return result.data;
    },
  });
};

export const useEvent = (id: string | null) => {
  const locale = useLocale();

  return useQuery({
    ...defaultQueryConfig,
    queryKey: ["event", id],
    queryFn: async () => {
      if (!id) throw new Error("Event ID is required");

      const result = await apiClient.get(`/api/events/${id}`);

      if (!result.data) {
        throw new Error(
          formatErrorMessage(
            new Error(result.error),
            locale,
            "Failed to fetch event",
          ),
        );
      }

      return result.data;
    },
    enabled: !!id,
  });
};

// Event mutations
export const useCreateEvent = () => {
  const locale = useLocale();

  return useMutation({
    mutationFn: async (eventData: EventCreateData) => {
      const result = await apiClient.post<Event>(
        "/api/events",
        eventData as unknown as Record<string, unknown>,
      );

      if (!result.data) {
        throw new Error(
          formatErrorMessage(
            new Error(result.error),
            locale,
            "Failed to create event",
          ),
        );
      }

      return result.data;
    },
    retry: (failureCount, error) => {
      // Don't retry on validation errors
      if (
        error &&
        typeof error === "object" &&
        "status" in error &&
        (error as { status: number }).status === 400
      ) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

export const useUpdateEvent = () => {
  const locale = useLocale();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: EventUpdateData }) => {
      const result = await apiClient.put<Event>(
        `/api/events/${id}`,
        data as unknown as Record<string, unknown>,
      );

      if (!result.data) {
        throw new Error(
          formatErrorMessage(
            new Error(result.error),
            locale,
            "Failed to update event",
          ),
        );
      }

      return result.data;
    },
    retry: (failureCount, error) => {
      if (
        error &&
        typeof error === "object" &&
        "status" in error &&
        (error as { status: number }).status === 400
      ) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

export const useDeleteEvent = () => {
  const locale = useLocale();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await apiClient.delete(`/api/events/${id}`);

      if (result.status !== 200) {
        throw new Error(
          formatErrorMessage(
            new Error(result.error),
            locale,
            "Failed to delete event",
          ),
        );
      }

      return true;
    },
    retry: false, // Don't retry delete operations
  });
};

// Generic API hook with error handling
export const useApiQuery = <TData = unknown, TError = Error>(
  queryKey: (string | number | boolean)[],
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) => {
  return useQuery({
    ...defaultQueryConfig,
    ...options,
    queryKey,
    queryFn,
  });
};

export const useApiMutation = <
  TData = unknown,
  TError = Error,
  TVariables = void,
>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, TError, TVariables>,
) => {
  return useMutation({
    ...options,
    mutationFn,
  });
};

// Error boundary helpers for components
export const getQueryErrorMessage = (
  error: unknown,
  locale: string = "en",
): string => {
  return formatErrorMessage(error, locale);
};

// Prefetch helpers
export const prefetchEvents = async (queryClient: {
  prefetchQuery: (options: any) => Promise<void>;
}) => {
  await queryClient.prefetchQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const result = await apiClient.get("/api/events");
      return result.data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const prefetchYouTubeData = async (
  queryClient: {
    fetchQuery: (options: any) => Promise<any>;
    prefetchQuery: (options: any) => Promise<void>;
  },
  channelId: string,
) => {
  // Prefetch channel data first
  const channelResult = await queryClient.fetchQuery({
    queryKey: ["youtube-channel", channelId],
    queryFn: async () => {
      const result = await apiClient.get("/api/youtube/videos?action=channel");
      return result.data;
    },
    staleTime: 30 * 60 * 1000,
  });

  // Then prefetch playlist data if we have the playlist ID
  if (channelResult?.playlistId) {
    await queryClient.prefetchQuery({
      queryKey: ["youtube-playlist", channelResult.playlistId],
      queryFn: async () => {
        const result = await apiClient.get(
          `/api/youtube/videos?action=playlist&playlistId=${channelResult.playlistId}`,
        );
        return (
          (result.data as { data?: { videos?: unknown[] } })?.data?.videos || []
        );
      },
      staleTime: 30 * 60 * 1000,
    });
  }
};
