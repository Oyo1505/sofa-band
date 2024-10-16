import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/domains/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
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
      backgroundImage: {
        // Ajoute une classe utilitaire personnalisée pour l'effet de grain
        'grain-effect': "radial-gradient(circle, rgba(255, 255, 255, 0.03) 1%, transparent 1%)",
      },
      backgroundSize: {
        'grain-size': '3px 3px', // Taille personnalisée pour le grain
      },
      filter: {
        'grain-filter': 'contrast(1.2) brightness(0.95)', // Filtre de contraste et luminosité pour accentuer l'effet
      },
      opacity: {
        'grain-opacity': '0.3', // Opacité personnalisée pour rendre l'effet plus subtil
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
