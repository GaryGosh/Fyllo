let map = L.map("map").setView([20, 78], 4);

L.tileLayer(
  "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=cb86PLYy3L4j72YPOeBb",
  {
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  }
).addTo(map);

/* const marker = L.marker([12.9, 77.5]).addTo(map); */

let coordinates = [];
fetch(
  "https://api.agrihawk.in/api/devices/getMarkers?access_token=cpfUzqrE6T6mKreazZQh0EKzFQjLpGYL5OKFLXg3pbDwMQTRI4Be48wANq1Xes7U"
)
  .then((response) => response.json())
  .then((data) => {
    coordinates = data.map((item) => ({
      lat: item.location.lat,
      lng: item.location.lng,
      place: item.place,
      plotId: item.plotId,
    }));

    coordinates.forEach((item) => {
      const marker = L.marker([item.lat, item.lng]);
      marker.locationData = { lat: item.lat, lng: item.lng };

      marker.on("click", function (e) {
        marker
          .bindPopup(
            `<b>Lat: ${marker.locationData.lat}</b><br>Lng: ${marker.locationData.lng}<br>Place: ${item.place}<br>Plot ID: ${item.plotId}`
          )
          .openPopup();
      });
      marker.addTo(map);
    });
  })
  .catch((err) => {
    console.log(err);
  });
