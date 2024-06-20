const db = require('../db.js');
const bcrypt = require('bcrypt');
const axios = require('axios');

const saltRounds = 10;

const authController = {
  getUser: async (req, res, next) => {
    const { username, password } = req.body;
    const getUser = `SELECT * FROM users WHERE username = '${username}'`;
    db.query(getUser)
      .then((data) => {
        console.log('data', data);
        if (!data.rows.length)
          return next({
            log: 'Error with login',
            message: { err: 'Error with username' },
          });
        else {
          bcrypt
            .compare(password, data.rows[0].password)
            .then((result) => {
              console.log('result', result);
              if (!result) {
                return next({
                  log: 'Error with login',
                  message: { err: 'Password is incorrect' },
                });
              }
              res.locals.user = {
                success: true,
                message: 'login successfully',
                data: {
                  userId: data.rows[0].id,
                  username: data.rows[0].username,
                  profile_picture: data.rows[0].profile_picture,
                },
              };

              return next();
            })
            .catch((err) => {
              return next({
                log: 'Error occured in getting user information',
                message: { err: 'An error occurred' },
              });
            });
        }
      })
      .catch((err) => {
        return next(err);
      });
  },

  createUser: async (req, res, next) => {
    const { username, email, password } = req.body;
    if (
      !username ||
      !password ||
      !email ||
      username.trim() === '' ||
      password.trim() === '' ||
      email.trim() === ''
    )
      return next({
        log: 'Error with signup',
        message: { err: 'All fields have to fill up' },
      });
    const getUser = `SELECT * FROM users WHERE username = '${username}'`;
    const check = await db.query(getUser);
    if (check.rows.length)
      return next({
        log: 'Error with signup',
        message: { err: 'username exists' },
      });
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const createUser = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${hashedPassword}') RETURNING id, username, profile_picture`;
    db.query(createUser)
      .then((data) => {
        console.log(data);
        res.locals.user = {
          success: true,
          message: 'signup successfully',
          data: {
            userId: data.rows[0].id,
            username: data.rows[0].username,
            profile_picture: data.rows[0].profile_picture,
          },
        };
        //In the frontend, they are looking for response after signup. But in data.rows, it will not return anything. So I put the whole data in return
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  },

  //oauth middleware
  oauthCoupon: async (req, res, next) => {
    axios
      .get('https://github.com/login/oauth/authorize', {
        params: {
          client_id: '0v23li7PMcw4dGNJZtDW',
          redirect_uri: 'http://localhost:3000/api/oauth/token',
          state: '1234567891234567',
        },
      })
      .then((data) => {
        //  console.log (req.query)

        // console.log(data.redirected)
        // res.locals.authCoupon = data.url.

        return next();
      })
      .catch((err) => {
        return next(err);
      });
  },

  // try{
  // console.log('clicking oAuth')
  // const client_id = 'Ov23li7PMcw4dGNJZtDW'
  // const callbackUrl = 'http://localhost:8080/dating'

  //   const state = crypto.randomBytes(16).toString("hex");
  //   localStorage.setItem("latestCSRFToken", state);

  //   const oAuthLink = `https://github.com/login/oauth/authorize?client_id=${client_id}&response_type=code&scope=repo&redirect_uri=${callbackUrl}/integrations/github/oauth2/callback&state=${state}`;
  //  window.location.assing(oAuthLink)
  //await fetch(oAuthLink, {method: 'GET'})
  // .then((response) => {
  //   console.log(response)
  // redirect(response.json)
  //   }
  // }
  // catch {
  //   console.error(error)
  // }
  // }

  //redeem authcoupn for token
  // oauthToken: async (req, res, next) => {

  //   const client_id = '0v23li7PMcw4dGNJZtDW'
  //   const redirect_uri = 'http://localhost:3000/api/oauth/token';
  //   const state = '1234567891234567';

  //   const code = req.query.code
  //   console.log ('code secured', code)
  //   axios.post ('https://github.com/login/oauth/access_token',
  //       {
  //         client_id: client_id,
  //         client_secret: '5fa735bb874d774ccb7b403739a96032f4ef5664',
  //         code: code,
  //         redirect_uri: 'http://localhost:3000/api/oauth/token',
  //         state: '1234567891234567'
  //       }
  //     )
  //     .then ((data) => {
  //       const token = data.data.access_token
  //       console.log (token)
  //       return next()
  //     })
  //     .catch (next(err))
  //   }

  // Redeem auth coupon for token
  oauthToken: async (req, res, next) => {
    const client_id = '0v23li7PMcw4dGNJZtDW';
    const client_secret = '5fa735bb874d774ccb7b403739a96032f4ef5664';
    const code = req.query.code;

    console.log('code secured', code);

    // if (!code) {
    //   console.log ("No code in Github Res.")
    //   return res.status(400).send ('Code not found')
    // }
    const params =
      '?client_id=' +
      client_id +
      '&client_secret=' +
      client_secret +
      '&code=' +
      req.query.code;

    await fetch('https://github.com/login/oauth/access_token' + params, {
      method: 'POST',
      header: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        console.log('inside post request');
        res.locals.token = response;
        // console.log('token', res.locals.token)
        return next();
      })
      .catch((err) => {
        console.log('error in oAuthToken');
        return next(err);
      });
  },

  tokenX: async (req, res, next) => {
    req.get('Authorization');
    await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        Authorization: req.get('Authorization'),
      },
    })
      .then((response) => {
        console.log('in tokenX');
        res.locals.token = response;
        return next();
      })
      .catch((err) => {
        console.log('error in token X');
        return next(err);
      });
  },
};

module.exports = authController;
