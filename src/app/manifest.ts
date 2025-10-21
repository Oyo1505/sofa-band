import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  return {
    name: "Sofa Rockers - Official Website",
    short_name: "Sofa Rockers",
    description:
      "Official website of Sofa Rockers - Listen to our music, discover upcoming shows, and stay connected with the band.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#1a1a1a",
    orientation: "portrait-primary",
    scope: "/",
    categories: ["music", "entertainment"],
    lang: "en",
    dir: "ltr",
    icons: [
      {
        src: "/icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Listen to Music",
        short_name: "Music",
        description: "Access our latest tracks and albums",
        url: "/music",
        icons: [{ src: "/icons/music-shortcut.png", sizes: "96x96" }],
      },
      {
        name: "Upcoming Shows",
        short_name: "Shows",
        description: "Check out our upcoming concerts and events",
        url: "/shows",
        icons: [{ src: "/icons/shows-shortcut.png", sizes: "96x96" }],
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  };
}
