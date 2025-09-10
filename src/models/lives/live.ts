export interface Live {
  location?: string;
  city?: string;
  cityJp?: string;
  date?: Date;
  video?: string;
  // YouTube API properties
  title?: string;
  publishedAt?: string;
  videoId?: string;
  resourceId?: {
    videoId: string;
  };
}

export interface Lives {
  lives: Live[];
}
