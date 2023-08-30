const express = require("express");
const geolib = require("geolib");
const axios = require("axios");

const app = express();

// Your geofence coordinates
const geofence = [
  { latitude: 39.0997, longitude: -94.5786 },
  // Add other coordinates
];

app.use(express.json());

// Middleware to check geofence
// app.use((req, res, next) => {
//   // Mock user coordinates, you'll get these dynamically
//   const userLocation = { latitude: 39.0997, longitude: -94.5786 };

//   const isInGeofence = geolib.isPointInPolygon(userLocation, geofence);
//   console.log(isInGeofence);
//   if (isInGeofence) {
//     next();
//   } else {
//     res.status(403).send("You're outside the geofence");
//   }
// });
//
// app.get("/", (req, res) => {
//   res.send("You're inside the geofence!");
// });

app.post("/geocode", (req, res) => {
  const { address } = req.body;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=API_KEY`;
  axios
    .get(url)
    .then((response) => {
      const { lat, lng } = response.data.results[0].geometry.location;
      res.json({ lat, lng });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
