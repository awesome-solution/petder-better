const express = require('express');
const path = require('path');
const db = require('./db');

<<<<<<< HEAD
=======
const favController = require('./controllers/favController');

>>>>>>> b90369d2fe9d3a3375bb5a287b306b473d430ae1
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  return res.status(200).json({});
});

app.get('/users', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    console.log('RESULT: ', result);
    return res.status(200).json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

<<<<<<< HEAD
=======
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

>>>>>>> b90369d2fe9d3a3375bb5a287b306b473d430ae1
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
