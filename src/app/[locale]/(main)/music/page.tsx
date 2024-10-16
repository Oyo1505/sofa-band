import React from 'react'
import lalalie from '../../../../public/image/lalalie.webp'
import ifyou from '../../../../public/image/if.png'
import AlbumItem from '@/domains/album-item/album-item'
export default function Page({params: {locale}} : {params:{locale:string}}) {

  return (
    <div className='pt-20'>
      <AlbumItem image={ifyou} title='If You' />
      <AlbumItem image={lalalie} title='La la la lie' />
    </div>
  )
}