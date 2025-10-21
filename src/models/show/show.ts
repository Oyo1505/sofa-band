export interface Event {
  title: string;
  location: string;
  time: string;
  date: string;
  city: string;
  region: string;
  country: string;
}

export type EventData = {
  time: number;
  title: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  location: string;
  city: string;
  cityInJpn: string;
  date: string;
  infoLink: string;
  country: string | null;
  region: string;
  published: boolean;
  authorId: string;
};
