const { Pool } = require('pg');
const PASSWORD = require('../passwordIgnore.js');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'images',
  password: PASSWORD.PASSWORD,
  port: 5432
});

pool.connect()
  .then(() => {
    pool.query('EXPLAIN ANALYZE SELECT * FROM images WHERE id = 9999999')
    .then((data) => {
      console.log(data.rows);
    });
  });
