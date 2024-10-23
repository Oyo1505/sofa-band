import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/domains/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily : {
      shippori: ['Shippori Antique B1', 'sans-serif'],
      rock : ['RocknRoll One', 'sans-serif'],
    },
    container: {
      center: true,
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1400px',
        // => @media (min-width: 1536px) { ... }
      }
    },
    extend: {
      keyframes: {
        patate: {
          '0%': { borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }, 
          '33%': { borderRadius: '40% 60% 60% 40% / 50% 50% 60% 60%' },
          '66%': { borderRadius: '60% 40% 40% 60% / 60% 40% 40% 60%' },
          '100%': { borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' },
        },
        patateInverse: {
          '0%': { borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%' },
          '33%': { borderRadius: '60% 40% 40% 60% / 50% 50% 50% 50%' },
          '66%': { borderRadius: '40% 60% 60% 40% / 60% 60% 40% 40%' },
          '100%': { borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%' },
        },
      },
      animation: {
        patate: 'patate 4s ease-in-out infinite',
        patateInverse: 'patateInverse 3s ease-in-out infinite',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
