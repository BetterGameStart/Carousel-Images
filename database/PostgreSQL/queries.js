const { Pool } = require('pg');
const PASSWORD = require('../passwordIgnore.js');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'images',
  password: PASSWORD.PASSWORD,
  port: 5432
});

pool.connect();

function queryAll() {
  pool.query('SELECT * FROM images', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result.rows);
    }
  });
}

queryAll();