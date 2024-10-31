export interface Event {
  id: string,
  title: string,
  location: string,
  createdAt: Date,
  updatedAt: Date,
  time: number,
  city: string,
  cityInJpn: string,
  date: string,
  infoLink: string,
  country: string | null, 
  region: string,
  published: boolean,
  authorId: string
}