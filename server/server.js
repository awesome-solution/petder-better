const express = require('express');
const path = require('path');
const db = require('./db');
const cors = require('cors');

const userProfileController = require('./controllers/userProfileController');
const petProfileController = require('./controllers/petProfileController');
const authController = require('./controllers/authController')
const apiController = require('./controllers/apiController')
const favController = require('./controllers/favController');

const PORT = 3000;
const app = express();

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
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


//oauth path : localhost:3000/api/oauth
// apiRouter.get ('/oauth',
//   authController.oauthCoupon, 
  
//   (req, res) => {
//     // redirect(res.locals.authCoupon)
//     console.log('exited middleware, now in server.js')
//     console.log (req)
//     return res.status(200).json(res.locals.authCoupon)
//   }
// )

//OAUTH callback route (after initial GET to GITHUB)
apiRouter.get ('/oauth/token', authController.oauthToken, authController.tokenX,
(req, res) => {
  console.log ("got out of /oauth/token middleware")
  // console.log (res.locals.token)
  
  return res.status(200).redirect('http://localhost:8080/dating');
})

//http://localhost:3000/api/signup
apiRouter.post('/login', authController.getUser, (req, res) => {
  console.log('res.locals.user: ', res.locals.user);
  return res.status(200).json(res.locals.user)
})

//http://localhost:3000/api/login
apiRouter.post('/signup', authController.createUser, (req, res) => {
  console.log('res.locals.user: ', res.locals.user);
  return res.status(200).json(res.locals.user)
})

apiRouter.get('/breeds',
  apiController.getBreedsList,
  (req, res) => {
    return res.status(200).json(res.locals.breedsList)
  }
)

apiRouter.get('/species',
  apiController.getSpeciesList,
  (req, res) => {
    return res.status(200).json(res.locals.speciesList)
  }
)

apiRouter.get('/potential-pets/:userId', apiController.getPotentialPets, (req, res) => {
  res.status(200).json(res.locals.potentialPets);
});

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

// for testing, insert a new user to database
// // http://localhost:3000/user/
// userRouter.post('/',
//   userProfileController.addUserProfile,
//   (req, res) => res.status(200).json(res.locals.addUser)
// );

// http://localhost:3000/user/"user_id"
userRouter.patch('/:user_id',
  userProfileController.updateUserProfile,
  (req, res) => {
    console.log('RESULT: ', res.locals.updateUser);
    return res.status(200).json(res.locals.updateUser)
  }
);

// http://localhost:3000/user/"user_id"
userRouter.delete('/:user_id', 
  userProfileController.deleteUserProfile,
  (req, res) => res.status(200).json(res.locals.deleteUser)
)

userRouter.post('/:user_id/picture', userProfileController.uploadUserPicture);
userRouter.patch('/:user_id/picture', userProfileController.updateUserPicture);
userRouter.delete('/:user_id/picture', userProfileController.deleteUserPicture);

// http://localhost:3000/pet/"user_id"
petRouter.get('/:user_id',
  petProfileController.getPetProfile,
  (req, res) => {
    console.log('RESULT: ', res.locals.pet);
    return res.status(200).json(res.locals.pet)
  }
)

// http://localhost:3000/pet/"user_id"
petRouter.post('/:user_id',
  petProfileController.addPetProfile,
  (req, res) => {
    console.log('RESULT: ', res.locals.petId);
    return res.status(200).json(res.locals.petId)
  }
)

// http://localhost:3000/pet/"user_id"
petRouter.patch('/:user_id',
  petProfileController.updatePetProfile,
  (req, res) => {
    console.log('RESULT: ', res.locals.pet);
    return res.status(200).json(res.locals.pet)
  }
)

// http://localhost:3000/pet/"user_id"
petRouter.delete('/:user_id',
  petProfileController.deletePetProfile,
  (req, res) => {
    console.log('RESULT: ', res.locals.petId);
    return res.status(200).json(res.locals.petId)
  }
)

petRouter.post('/:user_id/pets/:pet_id/picture', petProfileController.uploadPetPicture,
  (req, res) => {
    
  }
);

petRouter.post('/:user_id/pets/:pet_id/picture', petProfileController.updatePetPicture,
  (req, res) => {
    
  }
);

petRouter.delete('/:user_id/pets/:pet_id/picture', petProfileController.deletePetPicture,
  (req, res) => {
    
  }
);

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