# Starlink Coverage Checker

This is a web application that allows users to check if a list of addresses is covered by the Starlink satellite internet service. The application is built with React on the front-end and Express on the back-end, and it uses the Google Maps Geocoding API to convert addresses into latitude and longitude coordinates. The application then checks the coverage of each address against a coverage map provided by Starlink.

## Installation

To install and run the application locally, follow these steps:

1. Clone this repository
2. Install dependencies with `npm install`
3. Create a `.env` file in the root directory of the project with the following line: `GOOGLE_MAPS_API_KEY=<YOUR_API_KEY>`
4. Start the development server with `npm run dev`

## Usage

Once the development server is running, you can access the application at `http://localhost:3000`. To use the application, follow these steps:

1. Enter a list of addresses into the input field
2. Click "Check Coverage"
3. The application will display the coverage status for each address

Users can make a POST request to `http://localhost:3000/locations` with a JSON object in the request body containing an array of addresses. Each address should be represented as an object with an id and an address property. For example:

```json{
  "addresses": [
    {
      "id": "1",
      "address": "1600 Amphitheatre Parkway, Mountain View, CA"
    },
    {
      "id": "2",
      "address": "221B Baker St, London, UK"
    },
    {
      "id": "3",
      "address": "1600 Pennsylvania Ave NW, Washington, DC"
    }
  ]
}json```

The server will respond with a JSON object containing an array of objects representing each address, with Starlink Coverage Status, Latitude and Longitude, and the sanitized address. For example:
```json{[
    {
        "id": "1",
        "address": "Google Building 40, 1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
        "location": {
            "lat": 37.4223878,
            "lng": -122.0841877
        },
        "coverage": "Available Now"
    },
    {
        "id": "3",
        "address": "1600 Pennsylvania Avenue NW, Washington, DC 20500, USA",
        "location": {
            "lat": 38.8976633,
            "lng": -77.0365739
        },
        "coverage": "Expanding in in 2023"
    },
    {
        "id": "2",
        "address": "221B Baker St, London NW1 6XE, UK",
        "location": {
            "lat": 51.523767,
            "lng": -0.1585557
        },
        "coverage": null
    }
]}json```

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).


# starlink-loopcheck
# starlink-loopcheck
