const db = require('../db.js')
const authController = {

  getUser: (req, res, next) => {
    const { email, password } = req.body;
    const getUser = `SELECT * FROM Users WHERE email = '${email}' AND password = '${password}'`
    db.query(getUser)
      .then(data => {
        if(!data.rows.length) return next({
          log: 'Error with login',
          message: { err: 'Error with username or password' },
        })
        return next()
      })
      .catch(err => {
        return next(err)
      })
  },

  createUser: async (req, res, next) => {
    const { username, password } = req.body;
    if(!username || !password || username.trim() === '' || password.trim() === '') return next({
      log: 'Error with signup',
      message: { err: 'username or password cannot be empty' },
    })
    const createUser = `INSERT INTO bu (un, pw) VALUES ('${username}', '${password}')`
    const getUser = `SELECT * FROM bu WHERE un = '${username}'`
    const check = await db.query(getUser)
    if(check.rows.length) return next({
      log: 'Error with signup',
      message: { err: 'username exists' },
    })
    db.query(createUser)
      .then(data => {
        console.log(data.rows)
        // if(!data.rows.length) return next({
        //   log: 'Error with signup',
        //   message: { err: 'Error with username or password' },
        // })
        return next()
      })
      .catch(err => {
        return next(err)
      })
  },

}


module.exports = authController;