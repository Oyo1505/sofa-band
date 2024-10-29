'use client'  
import Input from '@/domains/ui/components/input/input'
import React from 'react'
import { set, useForm } from 'react-hook-form';
import { EventSchema } from '../../schema/event-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Event } from '@/shared/models/event';
import { useFormStatus } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import SelectInput from '@/domains/ui/components/select/select';
import { useLocale } from 'next-intl';
import { hours } from '@/shared/constants/hours';

const FormEvent = ({event}: {event?: Event}) => {
  const { pending, data } = useFormStatus();
  const searchParams = useSearchParams();
  const locale = useLocale(); 

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: event?.title ?? '',
      location: event?.location ?? '',
      time: event?.time ?? '',
      city: '',
      cityInJpn: '',
      date: new Date(),
      infoLink: '',
      country: '',
      region: '',
    },
    resolver: zodResolver(EventSchema),
  });
  console.log(errors)
  const onClickSubmit = (data: any) => {
    console.log('dlasdsal')
  }
  const handleHoursChange = (hours: React.ChangeEvent<HTMLSelectElement>) => {
    setValue('time', hours.target.value)
  }
  return (
    <>
      <form onSubmit={handleSubmit(onClickSubmit)} className='flex flex-col overflow-scroll gap-4'>
        <Input type="text" label="Title" error={errors.title} className='w-2/3 p-1 rounded-md' {...register('title')}  />
        <Input type="text" label="Location" error={errors.location}  className='w-2/3 p-1 rounded-md' {...register('location')}   />
        <Input type="text" label="City"  error={errors.city} className='w-2/3 p-1 rounded-md' {...register('city')}   />
        <Input type="text" label="City in Japanese" className='w-2/3 p-1 rounded-md' {...register('cityInJpn')}   />
        <Input type="text" label="Region" error={errors.region} className='w-2/3 p-1 rounded-md' {...register('region')}   />
        <SelectInput 
            optionsList={hours[0].time_slots}
            {...register('time')}
            label='Time'
            formData={{}}
            className='w-2/3 p-1 rounded-md bg-white'
            formDataKey='time_slots' 
            locale={locale} 
            onChange={handleHoursChange}
            
          />        
        <Input type="text" label="Info link" className='w-2/3 p-1 rounded-md' {...register('infoLink')} placeholder="Info link event"/>
        <Input type='date' label="Time" className='w-2/3 p-1 rounded-md' {...register('time')} placeholder="Time event" />
        <button type="submit" className='w-full p-2 rounded-md bg-primary text-white'>Submit</button>
      </form>
    </>
  )
}

export default FormEvent