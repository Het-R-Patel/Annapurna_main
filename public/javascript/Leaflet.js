const map = L.map('map').setView([23.0225, 72.5714], 11);

setTimeout(() => {
  map.invalidateSize();
}, 2000);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let marker; // store last marker

document.getElementById('selectDonation').addEventListener('change', async function () {
  const selected = this.options[this.selectedIndex];
  const address = selected.dataset.address;

  

  if (!address) return;

  try {
    // Client-side request to OpenStreetMap's Nominatim
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
    const data = await res.json();

    if (data.length === 0) {
      alert("Location not found");
      return;
    }

    const { lat, lon, display_name } = data[0];

    if (marker) map.removeLayer(marker); 

    marker = L.marker([lat, lon]).addTo(map)
      .bindPopup(display_name).openPopup();

    map.setView([lat, lon], 14);
  } catch (err) {
    console.error(err);
    alert("Error fetching coordinates");
  }
});

async function reverseGeocode(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'YourAppName (your@email.com)' // optional, polite
      }
    });
    const data = await response.json();
    return data.display_name
 
  } catch (err) {
    console.error(err);
    alert("Error in reverse geocoding");
  }
}


function getMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
 
        const add= await reverseGeocode(lat, lon);
        console.log("23.097951932394786, 72.55682387859547"+"DEvice lat -> "+lat+"device lon -> "+lon);
        
        map.setView([lat, lon], 14);
        L.marker([lat, lon]).addTo(map).bindPopup(add).openPopup();
    
       
      },
      function (err) {
        console.error("Geolocation error:", err);
        alert("Could not get your location.");
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}