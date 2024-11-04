'use client'  
import Input from '@/domains/ui/components/input/input'
import React from 'react'
import { useForm } from 'react-hook-form';
import { EventSchema } from '../../schema/event-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import SelectInput from '@/domains/ui/components/select/select';
import { useLocale, useTranslations } from 'next-intl';
import { hours } from '@/shared/constants/hours';
import { Event } from '@/shared/models/event';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface FormEventProps {
  addEvent?: ({ event, user }: { event: Event, user: any }) => Promise<number> | undefined;
  editEvent?: ({ event }: { event: Event | undefined }) => void;
  event?: Event | undefined;
}

const FormEvent = ({ addEvent, editEvent, event }: FormEventProps) => {
  const locale = useLocale(); 
  const [eventData, setEvent] = React.useState<Event | undefined>(event ?? undefined)
  const session = useSession();
  const t = useTranslations('EventPage')
  const user = session?.data?.user
  const router = useRouter()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: eventData?.id ?? '',
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

  const onEditEvent = async (data: any) => {
    if(!editEvent) return
    try{
      await editEvent({event :data})
    }catch(error) {
      console.log(error)
    }
  }

  const onCreateEvent = async (data: any) => {
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
      <form onSubmit={handleSubmit(eventData && eventData.id ? onEditEvent : onCreateEvent)} className='flex w-full pl-4 pr-4 md:pr-0 md:pl-0 md:w-2/3  flex-col overflow-scroll gap-4'>
        <Input label={`${t('Title')}*`} error={errors.title} className='w-full p-1 rounded-md' {...register('title')}  />
        {eventData && eventData.id  && <Input type='hidden' {...register('id')}   />}
        <Input label={`${t('Location')}*`} error={errors.location}  className='w-full p-1 rounded-md' {...register('location')}   />
        <div className='flex flex-col gap-2 md:flex-row w-full'>
        <SelectInput 
            optionsList={hours[0].time_slots}
            {...register('time')}
            label={`${t('Time')}*`}
            formData={event?.time}
            className=' p-1 rounded-md bg-white'
            formDataKey='time_slots' 
            locale={locale as 'jp' | 'en'}
            onChange={handleHoursChange}
            
          />        
          <Input type='date' label={`${t('Date')}*`} error={errors.date} className='w-full p-1 rounded-md' {...register('date')} placeholder="Time event" />
        </div>
        <div className='flex flex-col gap-2 md:flex-row w-full'>
          <Input label={`${t('City')}*`}  error={errors.city} className='w-full p-1 rounded-md' {...register('city')}   />
          <Input label={`${t('cityInJpn')}`} className='w-full p-1 rounded-md' {...register('cityInJpn')}   />
          <Input label={`${t('Region')}*`} error={errors.region} className='w-full p-1 rounded-md' {...register('region')}   />
        </div>
        <Input type="text" label={`${t('InfoLink')}`} error={errors.infoLink} className='w-full p-1 rounded-md' {...register('infoLink')} placeholder="Info link event"/>
        <div>*<span className='italic'>Required</span></div>
        <button type="submit" className='w-full p-2 border-black hover:bg-black hover:text-foreground border-2 rounded-md bg-primary text-black'>{t('Submit')}</button>
      </form>
    </>
  )
}

export default FormEvent