import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface Props {
  image: StaticImageData
  title:string
  left:boolean
};

const AlbumItem = ({image, title, left=true}:Props) => {
  return (
    <div>
      <Image src={image} quality={90} priority alt={title} width={200} height={200} />
    </div>
  )
}

export default AlbumItem