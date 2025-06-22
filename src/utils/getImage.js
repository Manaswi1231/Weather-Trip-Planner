import axios from "axios";

const PIXABAY_API_KEY = "50905431-66d44dd3098e5293a390419e6"; // 🔁 Replace with your actual key

export const getImageForPlace = async (placeName) => {
  try {
    console.log("Fetching image for:", placeName); // 👈 logging input

    const res = await axios.get(
      `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(
        placeName
      )}&image_type=photo&per_page=3`
    );

    if (res.data.hits && res.data.hits.length > 0) {
      console.log("Image found:", res.data.hits[0].webformatURL); // 👈 success log
      return res.data.hits[0].webformatURL;
    } else {
      console.log("No image found for:", placeName); // 👈 fallback log
      return null;
    }
  } catch (error) {
    console.error("Error fetching image from Pixabay:", error); // 👈 error log
    return null;
  }
};
