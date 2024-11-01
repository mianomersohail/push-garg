const videoUrl = "https://www.youtube.com/watch?v=oTNRYy0VOfY&t=70s"; // Your video URL
const videoId = new URL(videoUrl).searchParams.get("v"); // Extract videoId from the URL

const Data = [
  {
    url: videoUrl, // Keep the original URL if you need it later
    videoId: videoId, // Use the extracted video ID
    title: "JAVASCRIPT",
    formattedPrice: "Lec No 1",
    rating: 4,
    reviewCount: 120
  },
  {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Example video URL
    videoId: new URL("https://www.youtube.com/watch?v=dQw4w9WgXcQ").searchParams.get("v"),
    title: "JAVASCRIPT",
    formattedPrice: " Lec No 2",
    rating: 4,
    reviewCount: 120
  },
  {
    url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ", // Another example video URL
    videoId: new URL("https://www.youtube.com/watch?v=3JZ_D3ELwOQ").searchParams.get("v"),
    title: "Beautiful Property 3",
    beds: 3,
    baths: 2,
    formattedPrice: "$1500",
    rating: 4,
    reviewCount: 120
  },
  {
    url: "https://www.youtube.com/watch?v=9bZkp7q19f0", // Another example video URL
    videoId: new URL("https://www.youtube.com/watch?v=9bZkp7q19f0").searchParams.get("v"),
    title: "Beautiful Property 4",
    beds: 3,
    baths: 2,
    formattedPrice: "$1500",
    rating: 4,
    reviewCount: 120
  },
  {
    url: "https://www.youtube.com/watch?v=kffacxfA7G4", // Another example video URL
    videoId: new URL("https://www.youtube.com/watch?v=kffacxfA7G4").searchParams.get("v"),
    title: "Beautiful Property 5",
    beds: 3,
    baths: 2,
    formattedPrice: "$1500",
    rating: 4,
    reviewCount: 120
  },
];

export default Data;
