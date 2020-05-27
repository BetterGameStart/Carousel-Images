const { Pool } = require('pg');
const pgtools = require('pgtools');
const PASSWORD = require('../passwordIgnore.js');

const config = {
  user: 'postgres',
  host: 'localhost',
  password: PASSWORD.PASSWORD,
  port: 5432,
}

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'images',
  password: PASSWORD.PASSWORD,
  port: 5432
});

setTimeout(() => {
    pgtools.dropdb(config, 'images', (err, res) => {
      if (err) {
        console.log('Nothing to drop.');
      } else {
        console.log('Database dropped.');
      }
    });
  }, 1000
);

setTimeout( async () => {
    await pgtools.createdb(config, 'images', (err, response) => {
      if (err) {
        console.log(err);
      } else {
        pool.connect()
        .then(() => console.log('Connected to pool.'));
        console.log('Created database!');
        createTable()
      }
    });
  }, 2000
  );

  const createTable = () => {
    pool.query('CREATE TABLE images (id serial, image varchar(200))',  (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log('created table');
      }
      process.exit();
  });
}

module.exports = pool;