import { getEvents } from '@/domains/dashboard/action'
import EventHeaderPage from '@/domains/dashboard/components/event-header-page/event-header-page'
import ListEvents from '@/domains/dashboard/components/list-events/list-events'
import moment from 'moment'


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
    throw error // Let the error boundary handle it
  }
}

export default Page
