const map = L.map('map').setView([23.0225, 72.5714], 11);

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
    const res = await fetch(`/geocode?address=${encodeURIComponent(address)}`);
    const data = await res.json();

    if (data.latitude && data.longitude) {
      if (marker) map.removeLayer(marker); // remove previous

      marker = L.marker([data.latitude, data.longitude]).addTo(map)
        .bindPopup(address).openPopup();

      map.setView([data.latitude, data.longitude], 14);
    } else {
      alert("Location not found");
    }
  } catch (err) {
    console.error(err);
    alert("Error fetching coordinates");
  }
});