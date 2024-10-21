'use client'
import React from 'react'
import ShowItem from '../show-item/show-item'

const ShowList = ({events}: {events: Event[]}) => {
  
  return (
    events.map((event, index) => (
      <ShowItem key={index} event={event} />
    ))
  )
}

export default ShowList