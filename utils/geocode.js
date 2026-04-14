const axios = require("axios");

async function getCoordinatesFromAddress(address) {
  if (!address || typeof address !== "string") {
    throw new Error("Invalid address provided.");
  }
  const encodedAddress = encodeURIComponent(address);

  const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`;

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Annapurna-FoodTracker/1.0 (het@example.com)' // Nominatim requires this
      }
    });

    const data = response.data;

    if (data.length === 0) {
      throw new Error('No coordinates found for this address.');
    }

    const { lat, lon } = data[0];

    return {
      latitude: parseFloat(lat),
      longitude: parseFloat(lon)
    };
  } catch (error) {
    console.error("Nominatim Error:", error.message);
    throw new Error('Failed to fetch coordinates from Nominatim.');
  }
}

module.exports = getCoordinatesFromAddress;
