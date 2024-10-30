import moment from 'moment'
import { z } from 'zod'
const today = moment().format('YYYY-MM-DD');
export const EventSchema = z.object({
  title : z.string().min(1),
  location  : z.string().min(1),
   time  : z.number().min(1),
   city: z.string().min(1),
   cityInJpn: z.string(),
   date: z.string().refine((date) => date >= today, { message: "Date is too old" }),
   infoLink: z.string(),  
   region: z.string().min(1),
})