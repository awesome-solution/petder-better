const db = require('../db');

const apiController = {};

apiController.getBreedsList = async (req, res, next) => {
    const { speciesId } = req.query;
    console.log('speciesId', speciesId);

    if(!speciesId) {
        return next({
            log: 'Error in apiController.getBreedsList, speciesId is required',
            message: { err: 'Species ID is required to fetch breeds' },
            status: 400
        });
    }

    try {
        const result = await db.query('SELECT * FROM breeds WHERE species_id = $1', [speciesId]);
        console.log('RESULT: ', result);
        res.locals.breedsList = result.rows;
        return next();
    } catch(err) {
        return next({
            log: `Error in apiController.getBreedsList, unable to get breedsList from DB, ${err}`,
            message: {err:  'Error occurred in get request to /breeds'},
            status: 500
        })
    }
}
   
apiController.getSpeciesList = async (req, res, next) => {
    try {
        const result = await db.query('SELECT * from species');
        console.log('RESULT: ', result);
        res.locals.speciesList = result.rows;
        return next();
    } catch(err) {
        return next({
            log: `Error in apiController.getspeciesList, unable to get speciesList from DB, ${err}`,
            message: {err:  'Error occurred in get request to /species'},
            status: 500
        })
    }
}

apiController.getPotentialPets = async (req, res, next) => {
    const userId = req.params.user_id; 

    if (!userId) {
        return next({
            log: 'Error in apiController.getPotentialPets, userId is required',
            message: { err: 'User ID is required to fetch potential pets' },
            status: 400
        });
    }

    const query = `
        SELECT p.*
        FROM Pets p
        LEFT JOIN DislikedPets dp ON p.id = dp.pet_id AND dp.user_id = $1
        WHERE dp.pet_id IS NULL
    `;

    try {
        const result = await db.query(query, [userId]);
        res.locals.potentialPets = result.rows;
        return next();
    } catch (err) {
        return next({
            log: `Error in apiController.getPotentialPets, unable to get potential pets from DB, ${err}`,
            message: {err: 'Error occurred in get request to /potential-pets'},
            status: 500
        });
    }
};
   
module.exports = apiController;