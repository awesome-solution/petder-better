const db = require('../db');

const petProfileController = {};

petProfileController.getPetProfile = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        console.log('petProfileController.getPet req.params', user_id);
        const params = [ user_id ];
        const petQuery = `
        SELECT * FROM pets p
        JOIN userpets up ON up.pet_id = p.id
        WHERE up.user_id = $1
        `;
        const petData = await db.query(petQuery, params);
        console.log('petData', petData);
        res.locals.pet = petData.rows[0];
        return next();
    } catch(err) {
        return next({
            log: `Error in petProfileController.getPetProfile, unable to get a pet from DB, ${err}`,
            message: {err: 'Error ocurred in your get request to /:username'},
            status: 500
        });
    }
}

petProfileController.addPetProfile = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        console.log('addPetProfile req.params', user_id);
        console.log('addPetProfile Body', req.body);
        const { name, color, size, species_id, breed_id, gender, neutering, medical_records, picture, description } = req.body;

        const attributes = [name, color, size, species_id, breed_id, gender, neutering, medical_records, picture, description];

        const addPetQuery = `
        INSERT INTO pets (name, color, size, species_id, breed_id, gender, neutering, medical_records, picture, description)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id;
        `;

        const addPetData = await db.query(addPetQuery, attributes);
        console.log('addPetData', addPetData);
        
        if (addPetData.rowCount > 0) {
            const insertedPetId = addPetData.rows[0].id;
            console.log('insertedPetId', insertedPetId);

            const addUserPetsAttributes = [user_id, insertedPetId];

            const addUserPetsQuery = `
            INSERT INTO userPets (user_id, pet_id)
            VALUES($1, $2)
            `;
            const addUserPetsData = await db.query(addUserPetsQuery, addUserPetsAttributes);
            
            console.log('addUserPetsData', addUserPetsData);
    
            res.locals.petId = insertedPetId;
            return next();
        } else {
            return next({
                log: 'Error in petProfileController.addPetProfile, no pet ID returned',
                message: {err: 'Error occurred in your post request to /:username'},
                status: 404
            });
        }
    } catch(err) {
        console.error(err);
        return next({
            log: `Error in petProfileController.addPetProfile, unable to add a pet into DB, ${err}`,
            message: {err: 'Error occurred in your post request to /:username'},
            status: 500
        });
    }
};

petProfileController.deletePetProfile = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        console.log('petProfileController.deletePetProfile req.params', user_id);
        const params = [ user_id ];
       
        const getPetIdQuery = `
        SELECT pet_id FROM userpets 
        WHERE user_id = $1
        `;
        const petData = await db.query(getPetIdQuery, params);
        console.log('getPetIdQuery.pet_id', petData.rows[0].pet_id);
        const pet_id = petData.rows[0].pet_id
        
        const attributes = [ pet_id ];

        const deleteFromPetPictures = `
        DELETE FROM PetPictures 
        WHERE pet_id = $1
        `;
        const deleteFromDislikedPets = `
        DELETE FROM DislikedPets 
        WHERE pet_id = $1
        `;
        const deleteFromFavoritePets = `
        DELETE FROM DislikedPets 
        WHERE pet_id = $1
        `;
        const deleteFromUserPets = `
        DELETE FROM UserPets 
        WHERE pet_id = $1
        `;
        const deletePet = `
        DELETE FROM pets 
        WHERE id = $1
        `;

        const deleteFromPetPicturesData = await db.query(deleteFromPetPictures, attributes);
        console.log('deleteFromPetPicturesData', deleteFromPetPicturesData);
        const deleteFromDislikedPetsData = await db.query(deleteFromDislikedPets, attributes);
        console.log('deleteFromDislikedPetsData', deleteFromDislikedPetsData);
        const deleteFromFavoritePetsData = await db.query(deleteFromFavoritePets, attributes);
        console.log('deleteFromFavoritePetsData', deleteFromFavoritePetsData);
        const deleteFromUserPetsData = await db.query(deleteFromUserPets, attributes);
        console.log('deleteFromUserPetsData', deleteFromUserPetsData);
        const deletePetData = await db.query(deletePet, attributes);
        res.locals.petId = pet_id;
        return next();
    } catch(err) {
        return next({
            log: `Error in petProfileController.deletePetProfile, unable to delete a pet into DB, ${err}`,
            message: {err: 'Error ocurred in your delete request to /:id'},
            status: 500
        });
    }
}

petProfileController.updatePetProfile = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        console.log('petProfileController.updatePetProfile req.params', user_id);
        const {name, color, size, species_id, breed_id, gender, neutering, medical_records, picture, description} = req.body;
        const attributes = [name, color, size, species_id, breed_id, gender, neutering, medical_records, picture, description, user_id];
        const updatePetQuery = `
        UPDATE pets p
            SET name = $1,
                color = $2,
                size = $3,
                species_id = $4,
                breed_id = $5,
                gender = $6,
                neutering = $7,
                medical_records = $8,
                picture = $9,
                description = $10
            FROM userpets up
            WHERE up.pet_id = p.id
                AND up.user_id = $11
            RETURNING p.id;
        `;
        const updatePetData = await db.query(updatePetQuery, attributes);
        console.log('updatePetData', updatePetData);
        if(updatePetData.rows.length > 0) {
            const updatedPetId = updatePetData.rows[0].id;
            console.log('Update Pet ID:', updatedPetId);
            res.locals.pet = updatedPetId;
            return next();
        } else {
            return next({
                log: 'Error in petProfileController.updatePetProfile, no rows returned',
                message: {err: 'No pet was updated. Please check the user ID and pet ownership.'},
                status: 404 
            });
        }
    } catch(err) {
        return next({
            log: `Error in petProfileController.updatePetProfile, unable to update a pet into DB, ${err}`,
            message: {err: 'Error ocurred in your update request to /:user_id'},
            status: 500
        });
    }
}

petProfileController.uploadPetPicture = async (req, res, next) => {
    try {

    } catch(err) {

    }
}

petProfileController.updatePetPicture = async (req, res, next) => {
    try {

    } catch(err) {

    }
}

petProfileController.deletePetPicture = async (req, res, next) => {
    try {

    } catch(err) {
        
    }
}

module.exports = petProfileController;