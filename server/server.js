const express = require('express');
const path = require('path');
const db = require('./db');

const userProfileController = require('./controllers/userProfileController');
const petProfileController = require('./controllers/petProfileController');
const authController = require('./controllers/authController')
const favController = require('./controllers/favController');

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = express.Router();
const petRouter = express.Router();
const apiRouter = express.Router();

app.use('/user', userRouter);
app.use('/pet', petRouter);
app.use('/api', apiRouter);


app.use('/client', express.static(path.join(__dirname, '../client')));

//trying to connect the frontend html but doesn't work yet
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/src/index.html'));
})

//apiRouter? frontend using http://localhost:3000/api/signup
app.post('/login', authController.getUser, (req, res) => {
  return res.status(200).json(res.locals.user)
})

//apiRouter? frontend using http://localhost:3000/api/login
app.post('/signup', authController.createUser, (req, res) => {
  return res.status(200).json(res.locals.user)
})


// http://localhost:3000/users/
app.get('/users', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    console.log('RESULT: ', result);
    return res.status(200).json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// http://localhost:3000/user/"user_id"
userRouter.get('/:user_id',
  userProfileController.getUserProfile,
  (req, res) => res.status(200).json(res.locals.user)
);

// for testing, insert new user to database
// // http://localhost:3000/user/
// userRouter.post('/',
//   userProfileController.addUserProfile,
//   (req, res) => res.status(200).json(res.locals.addUser)
// );

// http://localhost:3000/user/"user_id"
userRouter.patch('/:user_id',
  userProfileController.updateUserProfile,
  (req, res) => res.status(200).json(res.locals.updateUser)
);

// http://localhost:3000/user/"user_id"
// petRouter.delete('/:user_id', 
//   petProfileController.deleteUserProfile,
//   (req, res) => res.status(200).json(res.locals.deleteUser)
// )

// http://localhost:3000/pet/"user_id"
// petRouter.get('/:user_id', 
//   petProfileController.getPetProfile,
//   (req, res) => res.status(200).json(res.locals.pet)
// )

app.post('/favorite', favController.favoritePet, (req, res) => {
  console.log('RESULT: ', res.locals.result);
  return res.status(200).send(res.locals.result);
});

app.post('/dislike', favController.dislikePet, (req, res) => {
  console.log('RESULT: ', res.locals.result);
  return res.status(200).send(res.locals.result);
});

app.get('/favorite', favController.getFavoritePets, (req, res) => {
  console.log('RESULT: ', res.locals.result);
  return res.status(200).send(res.locals.result);
});

app.get('/dislike', favController.getDislikedPets, (req, res) => {
  console.log('RESULT: ', res.locals.result);
  return res.status(200).send(res.locals.result);
});

app.delete('/favorite', favController.deleteFavoritePet, (req, res) => {
  console.log('RESULT: ', res.locals.result);
  return res.status(200).send(res.locals.result);
});

app.delete('/dislike', favController.deleteDislikedPet, (req, res) => {
  console.log('RESULT: ', res.locals.result);
  return res.status(200).send(res.locals.result);
});

app.use((req, res) => res.status(404).send('Page Not Found'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
