const db = require('../db.js')
const bcrypt = require('bcrypt')

const saltRounds = 10

const authController = {

  getUser: async (req, res, next) => {
    const { username, password } = req.body;
    const getUser = `SELECT * FROM users WHERE username = '${username}'`
    db.query(getUser)
      .then(data => {
        if(!data.rows.length) return next({
          log: 'Error with login',
          message: { err: 'Error with username' },
        })
        else {
         bcrypt.compare(password, data.rows[0].password)
          .then((result) => {
            if(!result) {
              return next({
                log: 'Error with login',
                message: { err: 'Password is incorrect' },
              })
            }
            res.locals.user = data.rows[0]
            return next()
          })
          .catch(err => {
            return next({
              log: 'Error occured in getting user information',
              message: { err: 'An error occurred'},
            })
          })
        }
      })
      .catch(err => {
        return next(err)
      })
  },

  createUser: async (req, res, next) => {
    const { username, email, password } = req.body;
    if(!username || !password || !email || username.trim() === '' || password.trim() === '' || email.trim() === '') return next({
      log: 'Error with signup',
      message: { err: 'All feilds have to fill up' },
    })
    const getUser = `SELECT * FROM users WHERE username = '${username}'`
    const check = await db.query(getUser)
    if(check.rows.length) return next({
      log: 'Error with signup',
      message: { err: 'username exists' },
    })
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const createUser = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${hashedPassword}')`
    db.query(createUser)
      .then(data => {
        console.log(data)
        res.locals.user = data
        //In the frontend, they are looking for response after signup. But in data.rows, it will not return anything. So I put the whole data in return 
        return next()
      })
      .catch(err => {
        return next(err)
      })
  },
}

module.exports = authController;