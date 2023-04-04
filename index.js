import express, {json} from 'express';
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import {Client} from '@googlemaps/google-maps-services-js';
import dotenv from 'dotenv';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express ();
const port = 3000;
dotenv.config();
app.use (json ());
app.use(cors());
app.use(express.static(path.join(__dirname, './starlink-check-client/build')));

// Direct to the Front End
app.get('/*', async function (req, res) {
    const homePath = path.join(__dirname,"./starlink-check-client/build/index.html");
    res.sendFile(homePath);
});

//Back for Front
app.post ('/locations', async (req, res) => {
  const geocoder = new Client ({});

  //Get the coverage map from Starlink
  const fetchCoverageData = async () => {
    const coverage = 'https://api.starlink.com/public-files/coverage.json';
    const response = await fetch (coverage);
    const data = await response.json ();
    return data;
  };

  //See if the address is covered
  const checkCoverage = (lat, lon, coverageData) => {
    let coverageStatus = null;
    coverageData.features.forEach (feature => {
      const multiPolygons = feature.geometry.coordinates;
      multiPolygons.forEach (polygon => {
        const coordinates = polygon[0];
        let insidePolygon = false;
        let x = lon;
        let y = lat;
        let i, j;

        for (
          (i = 0), (j = coordinates.length - 1);
          i < coordinates.length;
          j = i++
        ) {
          const xi = coordinates[i][0], yi = coordinates[i][1];
          const xj = coordinates[j][0], yj = coordinates[j][1];

          const intersect =
            yi > y != yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
          if (intersect) insidePolygon = !insidePolygon;
        }

        if (insidePolygon) {
          coverageStatus = feature.properties.tooltip;
        }
      });
    });
    return coverageStatus;
  };

  //Send the address response
  async function codeAddress(addy, i, coverageData, id) {
    return geocoder
      .geocode({
        params: {
          address: addy,
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      })
      .then((r) => {
        const lat = r.data.results[0].geometry.location.lat;
        const lng = r.data.results[0].geometry.location.lng;
        const coverage = checkCoverage(lat, lng, coverageData);
        locations.push({
          id,
          address: r.data.results[0].formatted_address,
          location: r.data.results[0].geometry.location,
          coverage,
        });
      })
      .catch((e) => {
        throw e;
      });
  }
  

  let locations = [];
  const coverageData = await fetchCoverageData ();

  try {
    await Promise.all(
        req.body.addresses.map(({ address, id }, i) =>
          codeAddress(address, i, coverageData, id)
        )
      );
    res.status (200).json (locations);
  } catch (e) {
    res.status (400).send (e);
  }
});

app.listen (port, () => {
  console.log (`App listening on port ${port}`);
});
