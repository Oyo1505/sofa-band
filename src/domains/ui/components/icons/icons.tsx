export function GrainyEffect(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 250 250"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
    <filter id='noiseFilter'>
        <feTurbulence 
          type='fractalNoise' 
          baseFrequency='0.65' 
          numOctaves='3' 
          stitchTiles='stitch'/>
      </filter>
        <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
    </svg>
  );
}
