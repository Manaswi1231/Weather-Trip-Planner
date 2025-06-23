import axios from "axios";

const PIXABAY_API_KEY = "50905431-66d44dd3098e5293a390419e6";

export const getImageForPlace = async (placeName) => {
  try {
    console.log("🔍 Fetching image for:", placeName);

    const res = await axios.get(
      `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(
        placeName
      )}&image_type=photo&per_page=3`
    );

    if (res.data.hits && res.data.hits.length > 0) {
      console.log("✅ Image found:", res.data.hits[0].webformatURL);
      return res.data.hits[0].webformatURL;
    } else {
      console.warn("⚠️ No image found for:", placeName);
      return "https://via.placeholder.com/300x200?text=No+Image";
    }
  } catch (error) {
    console.error("❌ Error fetching image from Pixabay:", error);
    return "https://via.placeholder.com/300x200?text=Error";
  }
};
