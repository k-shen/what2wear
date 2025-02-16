import { OPENCAGE_API_KEY } from "../components/constants";

export const getDefaultLocation = async () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject("Failed to retrieve location: " + error.message);
        }
      );
    } else {
      reject("Geolocation not supported.");
    }
  });
};

export const getInputLocation = async (location) => {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?key=${OPENCAGE_API_KEY}&q=${encodeURIComponent(
        location
      )}`
    );

    const data = await response.json();
    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      return [lat, lng];
    } else {
      console.error("Location not found");
      return [-1, -1];
    }
  } catch (error) {
    console.error("Error fetching location");
    return [0, 0];
  }
};

export const getCityFromCoordinate = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${OPENCAGE_API_KEY}`
    );
    const data = await response.json();
    const city =
      data.results[0]?.components?.city ||
      data.results[0]?.components?.town ||
      "Unknown Location";
    return city;
  } catch (error) {
    console.error("Error finding the City");
    return "Unknown Location";
  }
};
