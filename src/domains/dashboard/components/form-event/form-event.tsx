'use client'  
import Input from '@/domains/ui/components/input/input'
import React from 'react'
import { useForm } from 'react-hook-form';
import { EventSchema } from '../../schema/event-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import SelectInput from '@/domains/ui/components/select/select';
import { useLocale } from 'next-intl';
import { hours } from '@/shared/constants/hours';
import { Event } from '@/shared/models/event';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const FormEvent = ({ addEvent, event }: { addEvent?: ({ event, user }: { event: Event, user: any }) => number | undefined, event?: Event | undefined }) => {
  const locale = useLocale(); 
  const [eventData, setEvent] = React.useState<Event | undefined>(event ?? undefined)
  const session = useSession()
  const user = session?.data?.user
  const router = useRouter()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title:  eventData?.title ?? '',
      location: eventData?.location   ?? '',
       time: eventData?.time ??  0,
       city: eventData?.city ??  '',
       cityInJpn: eventData?.cityInJpn ?? '',
       date: eventData?.date ?? '',
       infoLink:eventData?.infoLink ??  '',
       region: eventData?.region ?? '',
    },
    resolver: zodResolver(EventSchema),
  });

  const onCreateEvent = async(data: any) => {
    if (!addEvent || !user) {
      return
    }
    try{
      const status = await addEvent({event :data, user})
     if(status === 200)
      router.push(`/${locale}/dashboard/events`)
  
    }catch(error) {
      console.log(error)
    }
  }
  
  const handleHoursChange = (hours: React.ChangeEvent<HTMLSelectElement>) => {
    setValue('time', Number(hours.target.value))
  }
  
  return (
    <>
      <form onSubmit={handleSubmit(onCreateEvent)} className='flex w-full pl-4 pr-4 md:pr-0 md:pl-0 md:w-2/3  flex-col overflow-scroll gap-4'>
        <Input label="Title*" error={errors.title} className='w-full p-1 rounded-md' {...register('title')}  />
        <Input label="Location*" error={errors.location}  className='w-full p-1 rounded-md' {...register('location')}   />
        <div className='flex flex-col gap-2 md:flex-row w-full'>
        <SelectInput 
            optionsList={hours[0].time_slots}
            {...register('time')}
            label='Time*'
            formData={event?.time}
            className=' p-1 rounded-md bg-white'
            formDataKey='time_slots' 
            locale={locale as 'jp' | 'en'}
            onChange={handleHoursChange}
            
          />        
          <Input type='date' label="Date*" error={errors.date} className='w-full p-1 rounded-md' {...register('date')} placeholder="Time event" />
        </div>
        <div className='flex flex-col gap-2 md:flex-row w-full'>
          <Input label="City*"  error={errors.city} className='w-full p-1 rounded-md' {...register('city')}   />
          <Input label="City in Japanese" className='w-full p-1 rounded-md' {...register('cityInJpn')}   /> 
          <Input label="Region*" error={errors.region} className='w-full p-1 rounded-md' {...register('region')}   /> 
        </div>
        <Input type="text" label="Info link" error={errors.infoLink} className='w-full p-1 rounded-md' {...register('infoLink')} placeholder="Info link event"/>
        <div>*<span className='italic'>Required</span></div>
        <button type="submit" className='w-full p-2 border-black hover:bg-black hover:text-foreground border-2 rounded-md bg-primary text-black'>Submit</button>
      </form>
    </>
  )
}

export default FormEvent