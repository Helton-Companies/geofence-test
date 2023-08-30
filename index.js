const express = require("express");
const geolib = require("geolib");

const app = express();

// Middleware to check if user is in geofence
app.use(async (req, res, next) => {
  const center = { latitude: 0, longitude: 0 }; // Replace with real address coordinates
  const userLocation = { latitude: 0, longitude: 0 }; // Replace with real user coordinates
  const distance = geolib.getDistance(center, userLocation);

  // 200 feet in meters (since geolib uses meters)
  const allowedDistance = 200 * 0.3048;

  if (distance <= allowedDistance) {
    next();
  } else {
    res.status(403).send("Outside geofence");
  }
});

app.get("/", (req, res) => {
  res.send("Within 200 feet of the address");
});

app.listen(3000, () => {
  console.log("Server running");
});
