const db = require('../db');

const apiController = {};

apiController.getBreedsList = async (req, res, next) => {
  try {
    const result = await db.query('SELECT * from breeds');
    console.log('RESULT: ', result);
    res.locals.breedsList = result.rows;
    return next();
  } catch (err) {
    return next({
      log: `Error in apiController.getBreedsList, unable to get breedsList from DB, ${err}`,
      message: { err: 'Error occurred in get request to /breeds' },
      status: 500,
    });
  }
};

apiController.getSpeciesList = async (req, res, next) => {
  try {
    const result = await db.query('SELECT * from species');
    console.log('RESULT: ', result);
    res.locals.speciesList = result.rows;
    return next();
  } catch (err) {
    return next({
      log: `Error in apiController.getspeciesList, unable to get speciesList from DB, ${err}`,
      message: { err: 'Error occurred in get request to /species' },
      status: 500,
    });
  }
};

apiController.getPotentialPets = async (req, res, next) => {
  try {
  } catch (err) {}
};

module.exports = apiController;
