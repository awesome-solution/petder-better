const mapController = {};
const placesClient = require('../places');
require('dotenv').config();
const { uuid } = require('uuidv4');

mapController.check = async (req, res, next) => {
  try {
    res.locals.result = placesClient.apiEndpoint;
    next();
  } catch (err) {
    next({
      log: 'check Error',
      status: 400,
      message: { err: err.message },
    });
  }
};

mapController.searchPlaces = async (req, res, next) => {
  const { text, lat, lon } = req.body;

  // placesClient.autocompletePlaces({
  //   input: text,
  //   includedPrimaryTypes: ['dog_park'],
  //   origin: { lat: lat, lng: lon },
  // });

  try {
    //const JKWT = placesClient.auth.fromAPIKey(process.env.MAPS_API);
    //const creds = await placesClient.in
    //const text = '';
    const result = await placesClient.searchNearby({
      includedTypes: ['dog_park'],
      locationRestriction: {
        circle: {
          center: {
            latitude: lat,
            longitude: lon,
          },
          radius: 500.0,
        },
      }, //{ lat: lat, lng: lon },
    });

    // const result = await placesClient.autocompletePlaces({
    //   input: text,

    //   // includedPrimaryTypes: ['dog_park'],
    //   origin: { lat: lat, lng: lon },
    //   sessionToken: uuid(),
    // });

    res.locals.result = result;
    next();
  } catch (err) {
    next({
      log: 'searchPlaces Error',
      status: 400,
      message: { err: err.message },
    });
  }
};

module.exports = mapController;
