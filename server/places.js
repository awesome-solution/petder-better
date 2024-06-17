const { PlacesClient } = require('@googlemaps/places').v1;

// Instantiates a client
const placesClient = new PlacesClient();

placesClient
  .initialize()
  .then((auth) => {
    console.log('PLACES INITIALIZED');
  })
  .catch((err) => {
    console.log(err.message);
  });

module.exports = placesClient;
