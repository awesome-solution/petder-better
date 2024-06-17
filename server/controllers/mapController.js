const mapController = {};
const placesClient = require('../places');
require('dotenv').config();

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

  placesClient.autocompletePlaces({ input: text, includedPrimaryTypes: ['dog_park'], 
    origin: {lat: lat, lng: lon}});

  try {
    const JKWT = placesClient.auth.fromAPIKey(process.env.MAPS_API);
    const creds = await placesClient.in
    
    res.locals.result = [result, result2];
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
