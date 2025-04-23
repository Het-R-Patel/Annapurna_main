const mapAdd = document.getElementById("mapAdd");
let marker;
// if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async function (position) {
//           const lat = position.coords.latitude;
//           const lon = position.coords.longitude;
const map = L.map("map").setView([23.0215374,72.5800568], 13);
// setTimeout(() => {
//       map.invalidateSize();

//     }, 2000);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

map.on("click", async function (e) {
  const { lat, lng } = e.latlng;
  mapAdd.value = "";
  const address = await reverseGeocode(lat, lng);

  mapAdd.value = address;

  if (marker) {
    map.removeLayer(marker);
  }
  marker = L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      `
                  <div class="text-sm">
                    <p><strong>Coordinates:</strong> ${lat.toFixed(
                      5
                    )}, ${lng.toFixed(5)}</p>
                    <p><strong>Address:</strong><br>${address}</p>
                  </div>
                `
    )
    .openPopup();
});


//     },
//     function (err) {
//       console.error("Error:", err.message);
//       alert("Could not get your exact location.");
//     },
//     {
//       enableHighAccuracy: true,
//       timeout: 10000,
//       maximumAge: 0
//     }

//   );
// } else {
//   alert("Geolocation is not supported by your browser.");
// }

// const map = L.map('map').setView([23.0225, 72.5714], 11);

async function reverseGeocode(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "YourAppName (your@email.com)", // optional, polite
      },
    });
    const data = await response.json();

    return data.display_name;
  } catch (err) {
    console.error(err);
    alert("Error in reverse geocoding");
  }
}

// function getMyLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       async function (position) {
//         const lat = position.coords.latitude;
//         const lon = position.coords.longitude;

//         const add= await reverseGeocode(lat, lon);
//         console.log("23.097951932394786, 72.55682387859547"+"DEvice lat -> "+lat+"device lon -> "+lon);

//         map.setView([lat, lon], 14);
//         L.marker([lat, lon]).addTo(map).bindPopup(add).openPopup();

//       },
//       function (err) {
//         console.error("Geolocation error:", err);
//         alert("Could not get your location.");
//       }
//     );
//   } else {
//     alert("Geolocation is not supported by your browser.");
//   }
// }
