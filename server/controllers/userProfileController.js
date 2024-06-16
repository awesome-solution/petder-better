const db = require('../db');

const userProfileController = {}

userProfileController.getUserProfile = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        console.log('userProfileController.getUser req.params', user_id);
        const params = [ user_id ];
        const userQuery = `
        SELECT * FROM users
        WHERE id = $1
        `;
        const userData = await db.query(userQuery, params);
        console.log('userData', userData);
        res.locals.user = userData.rows[0];
        console.log('userData0000!!!', userData.rows[0]);
        return next();
    } catch(err) {
        return next({
            log: `Error in userProfileController.getUser, unable to get a user from DB, ${err}`,
            message: {err: 'Error occurred in your get request to /:user_id'},
            status: 500
        });
    }
}
   
userProfileController.addUserProfile = async (req, res, next) => {
    try {
        console.log('Body', req.body);
        const {username, contact, email, location, profile_picture, description, password} = req.body;

        const attributes = [username, contact, email, location, profile_picture, description, password];

        const addUserQuery = `
        INSERT INTO users (username, contact, email, location, profile_picture, description, password)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        `;

        const addUserData = await db.query(addUserQuery, attributes);
        console.log('addUserData', addUserData);

        res.locals.addUser = addUserData;
        return next();

        // {
        //     "username": "test1", 
        //     "contact": "12345678", 
        //     "email": "test1@test1.com", 
        //     "location": "LA", 
        //     "profile_picture": "", 
        //     "description": "",
        //     "password": "test1"
        // }

        // {
        //     "id": 3,
        //     "username": "test2",
        //     "contact": "22345678",
        //     "email": "test2@test2.com",
        //     "location": "NY",
        //     "profile_picture": "",
        //     "description": "",
        //     "password": "test2"
        // }
    } catch(err) {
        return next({
            log: `Error in userProfileController.addPet, unable to add a user into DB, ${err}`,
            message: {err: 'Error ocurred in your post request to /'},
            status: 500
        })
    }
}

userProfileController.updateUserProfile = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        console.log('userProfileController.getUser req.params', user_id);
        const {contact, email, location, profile_picture, description} = req.body;
        const attributes = [contact, email, location, profile_picture, description, user_id];
        const updateUserQuery = `
        UPDATE users
        SET contact = $1,
        email = $2, 
        location = $3, 
        profile_picture = $4, 
        description = $5
        WHERE id = $6
        `;
        const updateUserData = await db.query(updateUserQuery, attributes);
        // console.log('updateUserData', updateUserData);
        res.locals.updateUser = updateUserData.rowCount;
        // console.log('updateUser0000!!!', updateUserData.rowCount);
        return next();
    } catch(err) {
        return next({
            log: `Error in userProfileController.updateUserProfile, unable to update user data, ${err}`,
            message: {err: 'Error occurred in your patch request to /:user_id'},
            status: 500
        });
    }
}

// userProfileController.deleteUserProfile = async (req, res, next) => {
//     try {
//         const { user_id } = req.params;
//         console.log('userProfileController.deleteUserProfile req.params', user_id);
//         const params = [ user_id ];
//         const deleteFromMessagesFromUserId = `
//         DELETE FROM Messages 
//         WHERE from_user_id = $1
//         `;
//         const deleteFromMessagesToUserId = `
//         DELETE FROM Messages 
//         WHERE to_user_id = $1
//         `;
//         const deleteFromDislikedPets = `
//         DELETE FROM DislikedPets 
//         WHERE user_id = $1
//         `;
//         const deleteFromFavoritePets = `
//         DELETE FROM DislikedPets 
//         WHERE user_id = $1
//         `;
//         const deleteFromUserPets = `
//         DELETE FROM UserPets 
//         WHERE user_id = $1
//         `;
//         const deleteUser = `
//         DELETE FROM users 
//         WHERE id = $1
//         `;

//         const deleteFromMessagesFromUserIdData = await db.query(deleteFromMessagesFromUserId, params);
//         console.log('deleteFromMessagesFromUserIdData', deleteFromMessagesFromUserIdData);
//         const deleteFromMessagesToUserIdData = await db.query(deleteFromMessagesToUserId, params);
//         console.log('deleteFromMessagesToUserIdData', deleteFromMessagesToUserIdData);
//         const deleteFromDislikedPetsData = await db.query(deleteFromDislikedPets, params);
//         console.log('deleteFromDislikedPetsData', deleteFromDislikedPetsData);
//         const deleteFromFavoritePetsData = await db.query(deleteFromFavoritePets, params);
//         console.log('deleteFromFavoritePetsData', deleteFromFavoritePetsData);
//         const deleteFromUserPetsData = await db.query(deleteFromUserPets, params);
//         console.log('deleteFromUserPetsData', deleteFromUserPetsData);
//         const deleteUserData = await db.query(deleteUser, params);
//         console.log('deleteUserData', deleteUserData);

//         res.locals.deleteUser = deleteUserData;
//         return next();
//     } catch(err) {
//         return next({
//             log: `Error in userProfileController.deleteUserProfile, unable to delete a user into DB, ${err}`,
//             message: {err: 'Error ocurred in your delete request to /:user_id'},
//             status: 500
//         });
//     }
// }


module.exports = userProfileController