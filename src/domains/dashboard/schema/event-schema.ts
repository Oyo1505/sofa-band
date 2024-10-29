import { z } from 'zod'

export const EventSchema = z.object({
  title : z.string().min(1),
  location  : z.string().min(1),
  time  : z.string().min(1),
  city: z.string().min(1),
  cityInJpn: z.string().min(1),
  date: z.date(),
  infoLink: z.string(),
  country: z.string(),   
  region: z.string().min(1),
})