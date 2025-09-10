import { getEvents } from '@/domains/dashboard/action';
import moment from 'moment';
import dynamic from 'next/dynamic';
const ListEvents = dynamic(() => import('@/domains/dashboard/components/list-events/list-events'), {
    loading: () => <div className="h-16 bg-gray-100 animate-pulse rounded" />
  });
const EventHeaderPage = dynamic(() => import('@/domains/dashboard/components/event-header-page/event-header-page'), {
    loading: () => <div className="h-16 bg-gray-100 animate-pulse rounded" />
  });

const getData = async () => {
  const result = await getEvents()
  
  if (result.status !== 200) {
    throw new Error(result.error || 'Failed to fetch events')
  }
  
  return result.events
}

const Page = async () => {
  try {
    const data = await getData();
    const sortedData = data.sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)))

    return (
      <>
        <EventHeaderPage />
        {sortedData && sortedData.length > 0 ? <ListEvents events={sortedData} /> : <div className='text-white'>No events</div>}
      </>
    )
  } catch (error) {
    throw error 
  }
}

export default Page
