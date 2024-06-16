require('dotenv').config();
const pg = require('pg');

const { Pool } = pg;

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

pool.connect();

pool.on('connect', (pc) => {
<<<<<<< HEAD
  console.log('PG CONNECTED', pc);
=======
  console.log('PG CONNECTED');
>>>>>>> b90369d2fe9d3a3375bb5a287b306b473d430ae1
});

// module.exports = pool;
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
