'use client'  
import Input from '@/domains/ui/components/input/input'
import React, { use } from 'react'
import { useForm } from 'react-hook-form';
import { EventSchema } from '../../schema/event-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormStatus } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import SelectInput from '@/domains/ui/components/select/select';
import { useLocale } from 'next-intl';
import { hours } from '@/shared/constants/hours';
import { Event } from '@/shared/models/event';
import { useSession } from 'next-auth/react';


const FormEvent = ({addEvent}:{addEvent: any}) => {
  const { pending, data } = useFormStatus();
  const searchParams = useSearchParams();
  const locale = useLocale(); 
  const idEvent = searchParams.get('idEvent')
  const [event, setEvent] = React.useState<Event>()
  const session = useSession()
  const user = session?.data?.user
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title:  event?.title ?? '',
      location: event?.location   ?? '',
       time: event?.time ??  '',
       city: event?.city ??  '',
       cityInJpn: event?.cityInJpn ?? '',
       date: event?.date ?? '',
       infoLink:event?.infoLink ??  '',
       region: event?.region ?? '',
    },
    resolver: zodResolver(EventSchema),
  });

  const onCreateEvent = async(data: any) => {await addEvent({event :data, user})}
  
  const handleHoursChange = (hours: React.ChangeEvent<HTMLSelectElement>) => {
    setValue('time', hours.target.value)
  }
  return (
    <>
      <form onSubmit={handleSubmit(onCreateEvent)} className='flex w-2/3  flex-col overflow-scroll gap-4'>
        <Input label="Title" error={errors.title} className='w-full p-1 rounded-md' {...register('title')}  />
        <Input label="Location" error={errors.location}  className='w-full p-1 rounded-md' {...register('location')}   />
        <Input label="City"  error={errors.city} className='w-full p-1 rounded-md' {...register('city')}   />
        <Input label="City in Japanese" className='w-full p-1 rounded-md' {...register('cityInJpn')}   /> 
        <Input label="Region" error={errors.region} className='w-full p-1 rounded-md' {...register('region')}   /> 
        <SelectInput 
            optionsList={hours[0].time_slots}
            {...register('time')}
            label='Time'
            formData={{}}
            className='w-full p-1 rounded-md bg-white'
            formDataKey='time_slots' 
            locale={locale} 
            onChange={handleHoursChange}
            
          />        
        <Input type="text" label="Info link" error={errors.infoLink} className='w-full p-1 rounded-md' {...register('infoLink')} placeholder="Info link event"/>
        <Input type='date' label="Time" error={errors.date} className='w-full p-1 rounded-md' {...register('date')} placeholder="Time event" />
        <button type="submit" className='w-full p-2 border-black hover:bg-black hover:text-foreground border-2 rounded-md bg-primary text-black'>Submit</button>
      </form>
    </>
  )
}

export default FormEvent