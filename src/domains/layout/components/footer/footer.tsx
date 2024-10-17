import HomePageBlock from '@/domains/home-page/components/home-page_bloc/home-page_bloc'
import { DiscogsIcon, EarthIcon, InstagramIcon, Spotify } from '@/domains/ui/components/icons/icons'
import React from 'react'

const Footer = () => {
  return (
    <div className="w-full  bottom-0 grid grid-flow-col">
    <HomePageBlock className="flex justify-center items-center h-16"><a target="_blank" href="https://www.instagram.com/sofa_rockers_posse/"><InstagramIcon /></a></HomePageBlock>
    <HomePageBlock className="flex justify-center items-center h-16"><a target="_blank" href="https://www.discogs.com/fr/artist/14308751-Sofa-Rockers"><DiscogsIcon /></a></HomePageBlock>
    <HomePageBlock className="flex justify-center items-center h-16"><a target="_blank" href="http://cornerstone.shop-pro.jp/?pid=176992470"><Spotify /></a></HomePageBlock>
  </div>
  )
}

export default Footer