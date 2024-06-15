const favController = {};
const db = require('../db');

favController.favoritePet = async (req, res, next) => {
  const { userID, petID } = req.body;

  const text = `
  INSERT INTO favoritepets (user_id, pet_id)
  VALUES ($1, $2)`;
  const values = [userID, petID];

  try {
    const result = await db.query(text, values);
    res.locals.result = result;
    next();
  } catch (err) {
    next({
      log: 'favoritePet Error',
      status: 400,
      message: { err: err.message },
    });
  }
};

favController.dislikePet = async (req, res, next) => {
  const { userID, petID } = req.body;

  const text = `
  INSERT INTO dislikedpets (user_id, pet_id)
  VALUES ($1, $2)`;
  const values = [userID, petID];

  try {
    const result = await db.query(text, values);
    res.locals.result = result;
    next();
  } catch (err) {
    next({
      log: 'dislikePet Error',
      status: 400,
      message: { err: err.message },
    });
  }
};

favController.getFavoritePets = async (req, res, next) => {
  const { userID } = req.body;

  const text = `
  Select JSON_AGG(up.user_id, p.*, br.*, sp.*) 
  FROM favoritepets f
  LEFT JOIN userpets up ON f.pet_id = up.pet_id
  LEFT JOIN pets p ON f.pets_id = p.id
  LEFT JOIN breeds br ON p.breed_id = br.id
  LEFT JOIN species sp ON br.species_id = sp.id
  WHERE f.user_id = $1`;
  const values = [userID];

  try {
    const result = await db.query(text, values);
    res.locals.result = result;
    next();
  } catch (err) {
    next({
      log: 'Get Favorite Pet Error',
      status: 400,
      message: { err: err.message },
    });
  }
};

favController.getDislikedPets = async (req, res, next) => {
  const { userID } = req.body;

  const text = `
  Select JSON_AGG(up.user_id, p.*, br.*, sp.*) 
  FROM dislikedpets f
  LEFT JOIN userpets up ON f.pet_id = up.pet_id
  LEFT JOIN pets p ON f.pets_id = p.id
  LEFT JOIN breeds br ON p.breed_id = br.id
  LEFT JOIN species sp ON br.species_id = sp.id
  WHERE f.user_id = $1`;
  const values = [userID];

  try {
    const result = await db.query(text, values);
    res.locals.result = result;
    next();
  } catch (err) {
    next({
      log: 'Get Disliked Pet Error',
      status: 400,
      message: { err: err.message },
    });
  }
};

favController.deleteFavoritePet = async (req, res, next) => {
  const { userID, petID } = req.body;

  const text = `
  DELETE FROM favoritepets
  WHERE user_id = $1 AND pet_id = $2
  RETURNING JSON_AGG(*)`;
  const values = [userID, petID];

  try {
    const result = await db.query(text, values);
    res.locals.result = result;
    next();
  } catch (err) {
    next({
      log: 'Delete Favorite Pet Error',
      status: 400,
      message: { err: err.message },
    });
  }
};

favController.deleteDislikedPet = async (req, res, next) => {
  const { userID, petID } = req.body;

  const text = `
  DELETE FROM dislikedpets
  WHERE user_id = $1 AND pet_id = $2
  RETURNING JSON_AGG(*)`;
  const values = [userID, petID];

  try {
    const result = await db.query(text, values);
    res.locals.result = result;
    next();
  } catch (err) {
    next({
      log: 'Delete Favorite Pet Error',
      status: 400,
      message: { err: err.message },
    });
  }
};

module.exports = favController;
