import Image from 'next/image';
import Picture1 from '@/public/image/front_band.jpg';

const Slide = (props:any) => {
  return (
    <div style={{left: props.left}} className="relative flex whitespace-nowrap">
      <Phrase src={props.src}/>
      <Phrase src={props.src}/>
      <Phrase src={props.src}/>
    </div>
  )
}
  
const Phrase = ({src}:{src:string}) => {
  return (
    <div className={'px-5 flex gap-5 items-center'}>
    <p className='text-[7.5vw]'>Front End Developer</p>
    <span className="relative h-[7.5vw] aspect-[4/2] rounded-full overflow-hidden">
        <Image style={{objectFit: "cover"}} src={src} alt="image" fill/>
    </span>
    </div>
  )
}
const ParallaxBackground = () => {

  const textsParallax = ['Sofa', 'Band', 'Rockers', 'Party']
  return (
    <div className='absolute inset-0 -z-1 overflow-hidden h-[100vh]'>
      <Phrase src={Picture1.src} />
      <Slide src={Picture1} left={"-25%"}/>
      <Slide src={Picture1} left={"-75%"}/>
    </div>
  );
};

export default ParallaxBackground;