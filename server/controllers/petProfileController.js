const db = require('../db');

const petProfileController = {};

// petProfileController.getPetProfile = async (req, res, next) => {
//     try {
//         const { id } = req.query;
//         console.log('petProfileController.getPet req.params', id);
//         const params = [ id ];
//         const petQuery = `
//         SELECT * FROM pets
//         WHERE id = $1
//         `;
//         const petData = await db.query(petQuery, params);
//         res.locals.pet = petData.row[0];
//         return next();
//     } catch(err) {
//         return next({
//             log: `Error in petProfileController.getPetProfile, unable to get a pet from DB, ${err}`,
//             message: {err: 'Error ocurred in your get request to /:username'},
//             status: 500
//         });
//     }
// }

// petProfileController.addPetProfile = async (req, res, next) => {
//     try {
//         console.log('Body', req.body);
//         const {name, color, size, species_id, breed_id, gender, neutering, medical_records, picture, description} = req.body;

//         const attributes = [name, color, size, species_id, breed_id, gender, neutering, medical_records, picture, description];

//         const addPetQuery = `
//         INSERT INTO pets (name, color, size, species_id, breed_id, gender, neutering, medical_records, picture, description)
//         VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
//         `;

//         const addPetData = await db.query(addPetQuery, attributes);
//         console.log('addPetData', addPetData);

//         res.locals.addPet = addPetData;
//         return next();
//     } catch(err) {
//         return next({
//             log: `Error in petProfileController.addPetProfile, unable to add a pet into DB, ${err}`,
//             message: {err: 'Error ocurred in your post request to /:username'},
//             status: 500
//         });
//     }
// }

// petProfileController.deletePetProfile = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         console.log('petProfileController.deletePetProfile req.params', id);
//         const params = [ id ];
//         const deleteFromPetPictures = `
//         DELETE FROM PetPictures 
//         WHERE pet_id = $1
//         `;
//         const deleteFromDislikedPets = `
//         DELETE FROM DislikedPets 
//         WHERE pet_id = $1
//         `;
//         const deleteFromFavoritePets = `
//         DELETE FROM DislikedPets 
//         WHERE pet_id = $1
//         `;
//         const deleteFromUserPets = `
//         DELETE FROM UserPets 
//         WHERE pet_id = $1
//         `;
//         const deletePet = `
//         DELETE FROM pets 
//         WHERE id = $1
//         `;

//         const deleteFromPetPicturesData = await db.query(deleteFromPetPictures, params);
//         console.log('deleteFromPetPicturesData', deleteFromPetPicturesData);
//         const deleteFromDislikedPetsData = await db.query(deleteFromDislikedPets, params);
//         console.log('deleteFromDislikedPetsData', deleteFromDislikedPetsData);
//         const deleteFromFavoritePetsData = await db.query(deleteFromFavoritePets, params);
//         console.log('deleteFromFavoritePetsData', deleteFromFavoritePetsData);
//         const deleteFromUserPetsData = await db.query(deleteFromUserPets, params);
//         console.log('deleteFromUserPetsData', deleteFromUserPetsData);
//         const deletePetData = await db.query(deletePet, params);
//         console.log('deletePetData', deletePetData);

//         res.locals.deletePet = deletePetData;
//         return next();
//     } catch(err) {
//         return next({
//             log: `Error in petProfileController.deletePetProfile, unable to delete a pet into DB, ${err}`,
//             message: {err: 'Error ocurred in your delete request to /:id'},
//             status: 500
//         });
//     }
// }

// petProfileController.updatePetProfile = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         console.log('petProfileController.updatePetProfile req.params', id);
//         const {name, color, size, species_id, breed_id, gender, neutering, medical_records, picture, description} = req.body;
//         const attributes = [name, color, size, species_id, breed_id, gender, neutering, medical_records, picture, description, id];
//         const updatePetQuery = `
//         UPDATE pets
//         SET name = $1, 
//         color = $2, 
//         size = $3, 
//         species_id = $4, 
//         breed_id = $5, 
//         gender = $6, 
//         neutering = $7,
//         medical_records = $8, 
//         picture = $9, 
//         description = $10
//         WHERE id = $11
//         `;
//         const updatePetData = await db.query(updatePetQuery, attributes);
//         res.locals.pet = updatePetData;
//         return next();
//     } catch(err) {
//         return next({
//             log: `Error in petProfileController.updatePetProfile, unable to update a pet into DB, ${err}`,
//             message: {err: 'Error ocurred in your update request to /:id'},
//             status: 500
//         });
//     }
// }

// petProfileController.addPetPicture = async (req, res, next) => {
//     try {

//     } catch(err) {

//     }
// }

// petProfileController.addPetPicture = async (req, res, next) => {
//     try {

//     } catch(err) {
        
//     }
// }

module.exports = petProfileController;