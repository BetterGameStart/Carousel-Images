const { Pool } = require('pg');
const PASSWORD = require('../passwordIgnore.js');
const path = require('path');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'images',
  password: PASSWORD.PASSWORD,
  port: 5432
});

pool.connect();

setTimeout(() => {
  pool.query(`COPY images(image) FROM '${__dirname.slice(0, 130)}data.csv' CSV HEADER`, (err, results) => {
    if (err) {
      console.log('This is not working.', err);
    } else {
      console.log('It worked!')
    }
  });
}, 5000);