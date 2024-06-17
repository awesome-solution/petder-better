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
        RETURNING id, username, profile_picture
        `;
        const updateUserData = await db.query(updateUserQuery, attributes);
        res.locals.updateUser = {
            userId: updateUserData.rows[0].id,
            username: updateUserData.rows[0].username,
            profile_picture: updateUserData.rows[0].profile_picture
        }

        return next();
    } catch(err) {
        return next({
            log: `Error in userProfileController.updateUserProfile, unable to update user data, ${err}`,
            message: {err: 'Error occurred in your patch request to /:user_id'},
            status: 500
        });
    }
}

// Delet user profile is to reset contact, location and description to empty string
userProfileController.deleteUserProfile = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        console.log('userProfileController.deleteUserProfile req.params', user_id);
        const params = [ user_id ];
       
        const deleteUserProfileInfo = `
        UPDATE users
        SET contact = '',
        location = '', 
        description = ''
        WHERE id = $1
        RETURNING id
        `;

        const deleteUserProfileInfoData = await db.query(deleteUserProfileInfo, params);
        console.log('deleteUserProfileInfoData', deleteUserProfileInfoData.rows[0].id);

        res.locals.deleteUser = deleteUserProfileInfoData.rows[0].id;
        return next();
    } catch(err) {
        return next({
            log: `Error in userProfileController.deleteUserProfile, unable to reset contact, location and description to empty string in the DB, ${err}`,
            message: {err: 'Error ocurred in your delete request to /:user_id'},
            status: 500
        });
    }
}

userProfileController.uploadUserPicture = async (req, res, next) => {

}

userProfileController.updateUserPicture = async (req, res, next) => {

}

userProfileController.deleteUserPicture = async (req, res, next) => {

}

module.exports = userProfileController